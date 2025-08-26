import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';
import { storage } from './storage';
import { 
  insertUserSchema, insertPartnerSchema, insertProjectSchema, 
  insertPaymentSchema, insertTicketSchema, insertBlogPostSchema,
  insertMercadoPagoConfigSchema 
} from '../shared/schema';
import { authenticateToken, requireRole, AuthenticatedRequest } from './middleware/auth';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Auth routes
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const registerSchema = insertUserSchema.extend({
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"]
});

router.post('/api/auth/register', async (req: AuthenticatedRequest, res) => {
  try {
    const data = registerSchema.parse(req.body);
    
    // Check if user already exists
    const existingUser = await storage.getUserByEmail(data.email);
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);
    
    // Create user
    const user = await storage.createUser({
      ...data,
      password: hashedPassword,
      emailVerificationToken: uuidv4()
    });

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      token,
      user: { ...user, password: undefined }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Datos inválidos', details: error.errors });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.post('/api/auth/login', async (req: AuthenticatedRequest, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    
    // Find user
    const user = await storage.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Update last login
    await storage.updateUser(user.id, { lastLogin: new Date() });

    // Generate JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Inicio de sesión exitoso',
      token,
      user: { ...user, password: undefined }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Datos inválidos', details: error.errors });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// User routes
router.get('/api/users/profile', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const user = await storage.getUserById(req.user!.userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ ...user, password: undefined });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.patch('/api/users/profile', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const updateData = z.object({
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      phone: z.string().optional(),
      avatar: z.string().optional(),
    }).parse(req.body);

    const user = await storage.updateUser(req.user!.userId, updateData);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({ ...user, password: undefined });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Partner routes
router.post('/api/partners/register', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const partnerData = insertPartnerSchema.parse({
      ...req.body,
      userId: req.user!.userId,
      referralCode: uuidv4().substr(0, 8).toUpperCase()
    });

    const partner = await storage.createPartner(partnerData);
    res.status(201).json(partner);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Datos inválidos', details: error.errors });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/api/partners/dashboard', authenticateToken, requireRole('partner'), async (req: AuthenticatedRequest, res) => {
  try {
    const partner = await storage.getPartnerByUserId(req.user!.userId);
    if (!partner) {
      return res.status(404).json({ error: 'Partner no encontrado' });
    }

    const commissions = await storage.getCommissionsByPartnerId(partner.id);
    const payments = await storage.getPaymentsByUserId(req.user!.userId);

    res.json({
      partner,
      commissions,
      payments,
      stats: {
        totalEarnings: partner.totalEarnings,
        totalSales: partner.totalSales,
        commissionRate: partner.commissionRate
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Project routes
router.get('/api/projects', async (req: AuthenticatedRequest, res) => {
  try {
    const { limit = 50, offset = 0, template } = req.query;
    
    let projects;
    if (template === 'true') {
      projects = { projects: await storage.getTemplateProjects(), total: 0 };
    } else {
      projects = await storage.getAllProjects(Number(limit), Number(offset));
    }
    
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.post('/api/projects', authenticateToken, requireRole('admin'), async (req: AuthenticatedRequest, res) => {
  try {
    const projectData = insertProjectSchema.parse(req.body);
    const project = await storage.createProject(projectData);
    res.status(201).json(project);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Datos inválidos', details: error.errors });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/api/projects/:id', async (req: AuthenticatedRequest, res) => {
  try {
    const project = await storage.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Payment routes
router.post('/api/payments/create', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { projectId, partnerId, amount, description } = req.body;
    
    // Get Mercado Pago configuration
    const mpConfig = await storage.getMercadoPagoConfig();
    if (!mpConfig) {
      return res.status(400).json({ error: 'Configuración de Mercado Pago no encontrada' });
    }

    // Initialize MercadoPago client
    const client = new MercadoPagoConfig({
      accessToken: mpConfig.accessToken,
      options: {
        timeout: 5000,
        idempotencyKey: uuidv4()
      }
    });

    // Create preference
    const preference = new Preference(client);
    const preferenceData = {
      items: [{
        title: description || 'Servicio de Software',
        unit_price: parseFloat(amount),
        quantity: 1,
      }],
      payer: {
        email: req.user!.email
      },
      back_urls: {
        success: `${process.env.FRONTEND_URL}/payment/success`,
        failure: `${process.env.FRONTEND_URL}/payment/failure`,
        pending: `${process.env.FRONTEND_URL}/payment/pending`
      },
      auto_return: 'approved',
      external_reference: uuidv4()
    };

    const response = await preference.create({ body: preferenceData });

    // Create payment record
    const payment = await storage.createPayment({
      userId: req.user!.userId,
      projectId,
      partnerId,
      amount,
      description,
      mercadoPagoId: response.id,
      status: 'pending'
    });

    res.json({
      paymentId: payment.id,
      preferenceId: response.id,
      initPoint: response.init_point
    });
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ error: 'Error al crear el pago' });
  }
});

// Webhook for Mercado Pago
router.post('/api/webhooks/mercadopago', async (req: AuthenticatedRequest, res) => {
  try {
    const { type, data } = req.body;
    
    if (type === 'payment') {
      const paymentId = data.id;
      
      // Get Mercado Pago configuration
      const mpConfig = await storage.getMercadoPagoConfig();
      if (!mpConfig) {
        return res.status(400).json({ error: 'Configuración de Mercado Pago no encontrada' });
      }

      // Initialize MercadoPago client
      const client = new MercadoPagoConfig({
        accessToken: mpConfig.accessToken
      });

      const paymentApi = new Payment(client);
      const paymentInfo = await paymentApi.get({ id: paymentId });

      // Find our payment record
      const payment = await storage.getPaymentByMercadoPagoId(paymentInfo.external_reference);
      if (payment) {
        // Update payment status
        await storage.updatePayment(payment.id, {
          mercadoPagoStatus: paymentInfo.status,
          status: paymentInfo.status === 'approved' ? 'completed' : 'failed'
        });

        // If payment is completed and there's a partner, create commission
        if (paymentInfo.status === 'approved' && payment.partnerId) {
          const partner = await storage.getPartnerByUserId(payment.partnerId);
          if (partner) {
            const commissionAmount = parseFloat(payment.amount) * (parseFloat(partner.commissionRate) / 100);
            
            await storage.createCommission({
              partnerId: partner.id,
              paymentId: payment.id,
              amount: commissionAmount.toString(),
              rate: partner.commissionRate,
              status: 'completed'
            });

            // Update partner stats
            await storage.updatePartner(partner.id, {
              totalEarnings: (parseFloat(partner.totalEarnings) + commissionAmount).toString(),
              totalSales: partner.totalSales + 1
            });
          }
        }
      }
    }
    
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Error en webhook' });
  }
});

// Ticket routes
router.get('/api/tickets', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    let tickets;
    
    if (req.user!.role === 'admin') {
      tickets = await storage.getAllTickets();
    } else {
      tickets = { tickets: await storage.getTicketsByUserId(req.user!.userId), total: 0 };
    }
    
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.post('/api/tickets', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const ticketData = insertTicketSchema.parse({
      ...req.body,
      userId: req.user!.userId
    });

    const ticket = await storage.createTicket(ticketData);
    res.status(201).json(ticket);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Datos inválidos', details: error.errors });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/api/tickets/:id/messages', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const messages = await storage.getTicketMessages(req.params.id);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.post('/api/tickets/:id/messages', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { message } = req.body;
    
    const ticketMessage = await storage.createTicketMessage({
      ticketId: req.params.id,
      userId: req.user!.userId,
      message,
      isInternal: req.user!.role === 'admin'
    });

    res.status(201).json(ticketMessage);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Blog routes
router.get('/api/blog', async (req: AuthenticatedRequest, res) => {
  try {
    const { published = 'true', limit = 10, offset = 0 } = req.query;
    const posts = await storage.getAllBlogPosts(
      published === 'true', 
      Number(limit), 
      Number(offset)
    );
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/api/blog/:slug', async (req: AuthenticatedRequest, res) => {
  try {
    const post = await storage.getBlogPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.post('/api/blog', authenticateToken, requireRole('admin'), async (req: AuthenticatedRequest, res) => {
  try {
    const postData = insertBlogPostSchema.parse({
      ...req.body,
      authorId: req.user!.userId
    });

    const post = await storage.createBlogPost(postData);
    res.status(201).json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Datos inválidos', details: error.errors });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Admin routes
router.get('/api/admin/dashboard', authenticateToken, requireRole('admin'), async (req: AuthenticatedRequest, res) => {
  try {
    const stats = await storage.getDashboardStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.get('/api/admin/users', authenticateToken, requireRole('admin'), async (req: AuthenticatedRequest, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    const users = await storage.getAllUsers(Number(limit), Number(offset));
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Mercado Pago configuration routes
router.get('/api/admin/mercadopago-config', authenticateToken, requireRole('admin'), async (req: AuthenticatedRequest, res) => {
  try {
    const config = await storage.getMercadoPagoConfig();
    
    // Don't expose sensitive tokens in full
    if (config) {
      res.json({
        ...config,
        accessToken: config.accessToken ? `${config.accessToken.substring(0, 10)}...` : null,
        clientSecret: config.clientSecret ? `${config.clientSecret.substring(0, 10)}...` : null
      });
    } else {
      res.json(null);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.post('/api/admin/mercadopago-config', authenticateToken, requireRole('admin'), async (req: AuthenticatedRequest, res) => {
  try {
    const configData = insertMercadoPagoConfigSchema.parse({
      ...req.body,
      updatedBy: req.user!.userId
    });

    const config = await storage.updateMercadoPagoConfig(configData);
    res.json(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Datos inválidos', details: error.errors });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.post('/api/admin/mercadopago-config/test', authenticateToken, requireRole('admin'), async (req: AuthenticatedRequest, res) => {
  try {
    const config = await storage.getMercadoPagoConfig();
    if (!config) {
      return res.status(400).json({ error: 'Configuración no encontrada' });
    }

    // Test connection to Mercado Pago
    try {
      const client = new MercadoPagoConfig({
        accessToken: config.accessToken,
        options: { timeout: 5000 }
      });

      const preference = new Preference(client);
      const testPreference = {
        items: [{
          title: 'Test Connection',
          unit_price: 1,
          quantity: 1,
        }]
      };

      const response = await preference.create({ body: testPreference });
      
      const testResult = {
        success: true,
        message: 'Conexión exitosa con Mercado Pago',
        preferenceId: response.id,
        testedAt: new Date().toISOString()
      };

      await storage.testMercadoPagoConnection(config.id, testResult);
      res.json(testResult);
    } catch (mpError) {
      const testResult = {
        success: false,
        message: 'Error al conectar con Mercado Pago',
        error: mpError instanceof Error ? mpError.message : 'Error desconocido',
        testedAt: new Date().toISOString()
      };

      await storage.testMercadoPagoConnection(config.id, testResult);
      res.status(400).json(testResult);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Notifications routes
router.get('/api/notifications', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const notifications = await storage.getUserNotifications(req.user!.userId);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.patch('/api/notifications/:id/read', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const notification = await storage.markNotificationAsRead(req.params.id);
    if (!notification) {
      return res.status(404).json({ error: 'Notificación no encontrada' });
    }
    res.json(notification);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Analytics route
router.post('/api/analytics', async (req: AuthenticatedRequest, res) => {
  try {
    const { eventType, data, sessionId } = req.body;
    
    const event = await storage.createAnalyticsEvent({
      eventType,
      userId: req.user?.userId,
      sessionId,
      data,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;