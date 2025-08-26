import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq, and, desc, asc, like, count, sql } from 'drizzle-orm';
import * as schema from '../shared/schema';
import type {
  User, InsertUser, Partner, InsertPartner, Project, InsertProject,
  Payment, InsertPayment, Ticket, InsertTicket, BlogPost, InsertBlogPost,
  SiteSetting, MercadoPagoConfig, InsertMercadoPagoConfig, Analytics,
  Commission, TicketMessage, Notification
} from '../shared/schema';

// Database connection
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);
const db = drizzle(client, { schema });

export interface IStorage {
  // User operations
  createUser(user: InsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: string): Promise<User | null>;
  updateUser(id: string, updates: Partial<User>): Promise<User | null>;
  deleteUser(id: string): Promise<boolean>;
  getAllUsers(limit?: number, offset?: number): Promise<{ users: User[], total: number }>;

  // Partner operations
  createPartner(partner: InsertPartner): Promise<Partner>;
  getPartnerByUserId(userId: string): Promise<Partner | null>;
  getPartnerByReferralCode(code: string): Promise<Partner | null>;
  updatePartner(id: string, updates: Partial<Partner>): Promise<Partner | null>;
  getAllPartners(limit?: number, offset?: number): Promise<{ partners: Partner[], total: number }>;

  // Project operations
  createProject(project: InsertProject): Promise<Project>;
  getProjectById(id: string): Promise<Project | null>;
  getProjectsByUserId(userId: string): Promise<Project[]>;
  updateProject(id: string, updates: Partial<Project>): Promise<Project | null>;
  deleteProject(id: string): Promise<boolean>;
  getAllProjects(limit?: number, offset?: number): Promise<{ projects: Project[], total: number }>;
  getTemplateProjects(): Promise<Project[]>;

  // Payment operations
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPaymentById(id: string): Promise<Payment | null>;
  getPaymentsByUserId(userId: string): Promise<Payment[]>;
  updatePayment(id: string, updates: Partial<Payment>): Promise<Payment | null>;
  getPaymentByMercadoPagoId(mpId: string): Promise<Payment | null>;

  // Commission operations
  createCommission(commission: Omit<Commission, 'id' | 'createdAt'>): Promise<Commission>;
  getCommissionsByPartnerId(partnerId: string): Promise<Commission[]>;
  updateCommissionStatus(id: string, status: string): Promise<Commission | null>;

  // Ticket operations
  createTicket(ticket: InsertTicket): Promise<Ticket>;
  getTicketById(id: string): Promise<Ticket | null>;
  getTicketsByUserId(userId: string): Promise<Ticket[]>;
  updateTicket(id: string, updates: Partial<Ticket>): Promise<Ticket | null>;
  getAllTickets(limit?: number, offset?: number): Promise<{ tickets: Ticket[], total: number }>;

  // Ticket message operations
  createTicketMessage(message: Omit<TicketMessage, 'id' | 'createdAt'>): Promise<TicketMessage>;
  getTicketMessages(ticketId: string): Promise<TicketMessage[]>;

  // Notification operations
  createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification>;
  getUserNotifications(userId: string): Promise<Notification[]>;
  markNotificationAsRead(id: string): Promise<Notification | null>;

  // Blog operations
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  getBlogPostById(id: string): Promise<BlogPost | null>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | null>;
  getAllBlogPosts(published?: boolean, limit?: number, offset?: number): Promise<{ posts: BlogPost[], total: number }>;
  updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null>;
  deleteBlogPost(id: string): Promise<boolean>;

  // Site settings operations
  getSetting(key: string): Promise<SiteSetting | null>;
  setSetting(key: string, value: any, category?: string, updatedBy?: string): Promise<SiteSetting>;
  getSettingsByCategory(category: string): Promise<SiteSetting[]>;

  // Mercado Pago configuration operations
  getMercadoPagoConfig(): Promise<MercadoPagoConfig | null>;
  updateMercadoPagoConfig(config: InsertMercadoPagoConfig): Promise<MercadoPagoConfig>;
  testMercadoPagoConnection(configId: string, testResult: any): Promise<MercadoPagoConfig | null>;

  // Analytics operations
  createAnalyticsEvent(event: Omit<Analytics, 'id' | 'createdAt'>): Promise<Analytics>;
  getAnalytics(startDate?: Date, endDate?: Date): Promise<Analytics[]>;

  // Dashboard statistics
  getDashboardStats(): Promise<{
    totalUsers: number;
    totalPartners: number;
    totalProjects: number;
    totalPayments: number;
    totalRevenue: string;
    recentActivity: any[];
  }>;
}

export class PostgresStorage implements IStorage {
  // User operations
  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(schema.users).values(user).returning();
    return newUser;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.email, email));
    return user || null;
  }

  async getUserById(id: string): Promise<User | null> {
    const [user] = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return user || null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const [user] = await db.update(schema.users)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(schema.users.id, id))
      .returning();
    return user || null;
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await db.delete(schema.users).where(eq(schema.users.id, id));
    return result.length > 0;
  }

  async getAllUsers(limit = 50, offset = 0): Promise<{ users: User[], total: number }> {
    const users = await db.select().from(schema.users)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(schema.users.createdAt));

    const [{ count: total }] = await db.select({ count: count() }).from(schema.users);
    return { users, total };
  }

  // Partner operations
  async createPartner(partner: InsertPartner): Promise<Partner> {
    const [newPartner] = await db.insert(schema.partners).values(partner).returning();
    return newPartner;
  }

  async getPartnerByUserId(userId: string): Promise<Partner | null> {
    const [partner] = await db.select().from(schema.partners).where(eq(schema.partners.userId, userId));
    return partner || null;
  }

  async getPartnerByReferralCode(code: string): Promise<Partner | null> {
    const [partner] = await db.select().from(schema.partners).where(eq(schema.partners.referralCode, code));
    return partner || null;
  }

  async updatePartner(id: string, updates: Partial<Partner>): Promise<Partner | null> {
    const [partner] = await db.update(schema.partners)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(schema.partners.id, id))
      .returning();
    return partner || null;
  }

  async getAllPartners(limit = 50, offset = 0): Promise<{ partners: Partner[], total: number }> {
    const partners = await db.select().from(schema.partners)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(schema.partners.createdAt));

    const [{ count: total }] = await db.select({ count: count() }).from(schema.partners);
    return { partners, total };
  }

  // Project operations
  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(schema.projects).values(project).returning();
    return newProject;
  }

  async getProjectById(id: string): Promise<Project | null> {
    const [project] = await db.select().from(schema.projects).where(eq(schema.projects.id, id));
    return project || null;
  }

  async getProjectsByUserId(userId: string): Promise<Project[]> {
    return await db.select().from(schema.projects)
      .where(eq(schema.projects.clientId, userId))
      .orderBy(desc(schema.projects.createdAt));
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project | null> {
    const [project] = await db.update(schema.projects)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(schema.projects.id, id))
      .returning();
    return project || null;
  }

  async deleteProject(id: string): Promise<boolean> {
    const result = await db.delete(schema.projects).where(eq(schema.projects.id, id));
    return result.length > 0;
  }

  async getAllProjects(limit = 50, offset = 0): Promise<{ projects: Project[], total: number }> {
    const projects = await db.select().from(schema.projects)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(schema.projects.createdAt));

    const [{ count: total }] = await db.select({ count: count() }).from(schema.projects);
    return { projects, total };
  }

  async getTemplateProjects(): Promise<Project[]> {
    return await db.select().from(schema.projects)
      .where(eq(schema.projects.isTemplate, true))
      .orderBy(asc(schema.projects.name));
  }

  // Payment operations
  async createPayment(payment: InsertPayment): Promise<Payment> {
    const [newPayment] = await db.insert(schema.payments).values(payment).returning();
    return newPayment;
  }

  async getPaymentById(id: string): Promise<Payment | null> {
    const [payment] = await db.select().from(schema.payments).where(eq(schema.payments.id, id));
    return payment || null;
  }

  async getPaymentsByUserId(userId: string): Promise<Payment[]> {
    return await db.select().from(schema.payments)
      .where(eq(schema.payments.userId, userId))
      .orderBy(desc(schema.payments.createdAt));
  }

  async updatePayment(id: string, updates: Partial<Payment>): Promise<Payment | null> {
    const [payment] = await db.update(schema.payments)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(schema.payments.id, id))
      .returning();
    return payment || null;
  }

  async getPaymentByMercadoPagoId(mpId: string): Promise<Payment | null> {
    const [payment] = await db.select().from(schema.payments)
      .where(eq(schema.payments.mercadoPagoId, mpId));
    return payment || null;
  }

  // Commission operations
  async createCommission(commission: Omit<Commission, 'id' | 'createdAt'>): Promise<Commission> {
    const [newCommission] = await db.insert(schema.commissions).values(commission).returning();
    return newCommission;
  }

  async getCommissionsByPartnerId(partnerId: string): Promise<Commission[]> {
    return await db.select().from(schema.commissions)
      .where(eq(schema.commissions.partnerId, partnerId))
      .orderBy(desc(schema.commissions.createdAt));
  }

  async updateCommissionStatus(id: string, status: string): Promise<Commission | null> {
    const [commission] = await db.update(schema.commissions)
      .set({ status: status as any })
      .where(eq(schema.commissions.id, id))
      .returning();
    return commission || null;
  }

  // Ticket operations
  async createTicket(ticket: InsertTicket): Promise<Ticket> {
    const [newTicket] = await db.insert(schema.tickets).values(ticket).returning();
    return newTicket;
  }

  async getTicketById(id: string): Promise<Ticket | null> {
    const [ticket] = await db.select().from(schema.tickets).where(eq(schema.tickets.id, id));
    return ticket || null;
  }

  async getTicketsByUserId(userId: string): Promise<Ticket[]> {
    return await db.select().from(schema.tickets)
      .where(eq(schema.tickets.userId, userId))
      .orderBy(desc(schema.tickets.createdAt));
  }

  async updateTicket(id: string, updates: Partial<Ticket>): Promise<Ticket | null> {
    const [ticket] = await db.update(schema.tickets)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(schema.tickets.id, id))
      .returning();
    return ticket || null;
  }

  async getAllTickets(limit = 50, offset = 0): Promise<{ tickets: Ticket[], total: number }> {
    const tickets = await db.select().from(schema.tickets)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(schema.tickets.createdAt));

    const [{ count: total }] = await db.select({ count: count() }).from(schema.tickets);
    return { tickets, total };
  }

  // Ticket message operations
  async createTicketMessage(message: Omit<TicketMessage, 'id' | 'createdAt'>): Promise<TicketMessage> {
    const [newMessage] = await db.insert(schema.ticketMessages).values(message).returning();
    return newMessage;
  }

  async getTicketMessages(ticketId: string): Promise<TicketMessage[]> {
    return await db.select().from(schema.ticketMessages)
      .where(eq(schema.ticketMessages.ticketId, ticketId))
      .orderBy(asc(schema.ticketMessages.createdAt));
  }

  // Notification operations
  async createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<Notification> {
    const [newNotification] = await db.insert(schema.notifications).values(notification).returning();
    return newNotification;
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    return await db.select().from(schema.notifications)
      .where(eq(schema.notifications.userId, userId))
      .orderBy(desc(schema.notifications.createdAt))
      .limit(50);
  }

  async markNotificationAsRead(id: string): Promise<Notification | null> {
    const [notification] = await db.update(schema.notifications)
      .set({ isRead: true })
      .where(eq(schema.notifications.id, id))
      .returning();
    return notification || null;
  }

  // Blog operations
  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const [newPost] = await db.insert(schema.blogPosts).values(post).returning();
    return newPost;
  }

  async getBlogPostById(id: string): Promise<BlogPost | null> {
    const [post] = await db.select().from(schema.blogPosts).where(eq(schema.blogPosts.id, id));
    return post || null;
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const [post] = await db.select().from(schema.blogPosts).where(eq(schema.blogPosts.slug, slug));
    return post || null;
  }

  async getAllBlogPosts(published?: boolean, limit = 10, offset = 0): Promise<{ posts: BlogPost[], total: number }> {
    let posts: BlogPost[];
    
    if (published !== undefined) {
      posts = await db.select().from(schema.blogPosts)
        .where(eq(schema.blogPosts.isPublished, published))
        .limit(limit)
        .offset(offset)
        .orderBy(desc(schema.blogPosts.createdAt));
    } else {
      posts = await db.select().from(schema.blogPosts)
        .limit(limit)
        .offset(offset)
        .orderBy(desc(schema.blogPosts.createdAt));
    }

    const [{ count: total }] = await db.select({ count: count() }).from(schema.blogPosts);
    return { posts, total };
  }

  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    const [post] = await db.update(schema.blogPosts)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(schema.blogPosts.id, id))
      .returning();
    return post || null;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.delete(schema.blogPosts).where(eq(schema.blogPosts.id, id));
    return result.length > 0;
  }

  // Site settings operations
  async getSetting(key: string): Promise<SiteSetting | null> {
    const [setting] = await db.select().from(schema.siteSettings).where(eq(schema.siteSettings.key, key));
    return setting || null;
  }

  async setSetting(key: string, value: any, category = 'general', updatedBy?: string): Promise<SiteSetting> {
    const [setting] = await db.insert(schema.siteSettings)
      .values({ key, value, category, updatedBy })
      .onConflictDoUpdate({
        target: schema.siteSettings.key,
        set: { value, category, updatedBy, updatedAt: new Date() }
      })
      .returning();
    return setting;
  }

  async getSettingsByCategory(category: string): Promise<SiteSetting[]> {
    return await db.select().from(schema.siteSettings)
      .where(eq(schema.siteSettings.category, category));
  }

  // Mercado Pago configuration operations
  async getMercadoPagoConfig(): Promise<MercadoPagoConfig | null> {
    const [config] = await db.select().from(schema.mercadoPagoConfig)
      .where(eq(schema.mercadoPagoConfig.isActive, true))
      .orderBy(desc(schema.mercadoPagoConfig.updatedAt));
    return config || null;
  }

  async updateMercadoPagoConfig(config: InsertMercadoPagoConfig): Promise<MercadoPagoConfig> {
    // Deactivate existing configs
    await db.update(schema.mercadoPagoConfig)
      .set({ isActive: false })
      .where(eq(schema.mercadoPagoConfig.isActive, true));

    // Create new active config
    const [newConfig] = await db.insert(schema.mercadoPagoConfig)
      .values({ ...config, isActive: true })
      .returning();
    return newConfig;
  }

  async testMercadoPagoConnection(configId: string, testResult: any): Promise<MercadoPagoConfig | null> {
    const [config] = await db.update(schema.mercadoPagoConfig)
      .set({ 
        lastTestedAt: new Date(),
        testResult,
        updatedAt: new Date()
      })
      .where(eq(schema.mercadoPagoConfig.id, configId))
      .returning();
    return config || null;
  }

  // Analytics operations
  async createAnalyticsEvent(event: Omit<Analytics, 'id' | 'createdAt'>): Promise<Analytics> {
    const [newEvent] = await db.insert(schema.analytics).values(event).returning();
    return newEvent;
  }

  async getAnalytics(startDate?: Date, endDate?: Date): Promise<Analytics[]> {
    if (startDate && endDate) {
      return await db.select().from(schema.analytics)
        .where(
          and(
            sql`${schema.analytics.createdAt} >= ${startDate}`,
            sql`${schema.analytics.createdAt} <= ${endDate}`
          )
        )
        .orderBy(desc(schema.analytics.createdAt));
    }

    return await db.select().from(schema.analytics)
      .orderBy(desc(schema.analytics.createdAt));
  }

  // Dashboard statistics
  async getDashboardStats(): Promise<{
    totalUsers: number;
    totalPartners: number;
    totalProjects: number;
    totalPayments: number;
    totalRevenue: string;
    recentActivity: any[];
  }> {
    const [usersCount] = await db.select({ count: count() }).from(schema.users);
    const [partnersCount] = await db.select({ count: count() }).from(schema.partners);
    const [projectsCount] = await db.select({ count: count() }).from(schema.projects);
    const [paymentsCount] = await db.select({ count: count() }).from(schema.payments);
    
    const [revenueSum] = await db.select({ 
      sum: sql<string>`COALESCE(SUM(${schema.payments.amount}), 0)` 
    }).from(schema.payments).where(eq(schema.payments.status, 'completed'));

    // Recent activity from various tables
    const recentActivity: any[] = [];

    return {
      totalUsers: usersCount.count,
      totalPartners: partnersCount.count,
      totalProjects: projectsCount.count,
      totalPayments: paymentsCount.count,
      totalRevenue: revenueSum.sum || '0',
      recentActivity
    };
  }
}

export const storage = new PostgresStorage();