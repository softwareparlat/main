# SoftwarePar - Plataforma Profesional de Desarrollo de Software

## Descripción del Proyecto
Plataforma web profesional para SoftwarePar con sistema de partnership, pagos reales con Mercado Pago y gestión empresarial completa.

**Dominio**: SoftwarePar.Lat  
**Especialidad**: Desarrollo de software y aplicaciones a medida

## Stack Tecnológico
- **Frontend**: React.js con Wouter routing
- **Backend**: Node.js con Express.js
- **Base de datos**: PostgreSQL con Drizzle ORM
- **Styling**: Tailwind CSS + shadcn/ui components
- **Pagos**: Mercado Pago SDK (integración real con webhooks)
- **Email**: Nodemailer
- **Deployment**: Optimizado para Replit

## Modelo de Negocio
1. **Compra Completa**: Cliente paga precio total y recibe código fuente completo
2. **Partnership**: Cliente paga precio reducido, se convierte en partner y puede revender licencias con comisiones automáticas

## Arquitectura del Proyecto
```
/
├── client/                 # Frontend React
├── server/                 # Backend Express API
├── shared/                 # Tipos TypeScript compartidos
└── docs/                   # Documentación
```

## Funcionalidades Principales

### 1. Sitio Web Público
- Landing page moderna con animaciones
- Header responsive con logo SoftwarePar
- Hero section impactante
- Sección "Sobre SoftwarePar"
- Servicios con cards modernas
- Comparación de modalidades (Compra vs Partnership)
- Tabla de precios interactiva
- Testimonios con carousel
- Formulario de contacto
- Blog/noticias con CMS
- SEO optimizado y mobile-first

### 2. Sistema de Autenticación
- Registro con validación de email
- Login seguro con JWT
- Recuperación de contraseñas
- Perfiles diferenciados (Cliente, Partner, Admin)
- Rate limiting avanzado
- 2FA opcional

### 3. Dashboard para Partners
- Gráficos con Recharts
- Gestión de licencias
- Calculadora de ganancias en tiempo real
- Historial de ventas con filtros
- Enlaces de referidos únicos (softwarepar.lat/ref/[codigo])
- Estadísticas con visualizaciones
- Reportes PDF descargables con jsPDF
- Notificaciones en tiempo real

### 4. Panel de Administración
- Dashboard administrativo completo
- Gestión de usuarios con búsqueda
- Administración de proyectos con kanban
- Control de pagos con Mercado Pago
- Analytics avanzados
- Gestión de contenido del sitio
- Sistema de tickets/soporte con chat
- **Configuración de Mercado Pago**:
  - Access Token, Public Key, Client ID, Client Secret editables
  - Modo sandbox/producción configurable
  - Webhooks URL configurable
  - Test de conexión con Mercado Pago

### 5. Características Técnicas
- API REST con documentación Swagger
- Integración completa Mercado Pago con webhooks
- Sistema de emails automáticos
- WebSockets para notificaciones tiempo real
- Caching optimizado
- File uploads
- Logging estructurado con Winston
- PWA capabilities
- Dark/Light mode
- Internacionalización preparada

### 6. Funcionalidades Adicionales
- Sistema de tickets/soporte con chat en vivo
- Calculadora de ganancias interactiva
- Reportes PDF con membrete SoftwarePar
- Sistema de notificaciones push
- Integración con redes sociales
- Micro-interacciones
- Accesibilidad completa (WCAG 2.1)

## Seguridad
- HTTPS obligatorio
- CORS configurado
- Sanitización de inputs
- Rate limiting por IP y usuario
- Validación con Zod
- Encriptación de datos sensibles
- Logs de auditoría
- Protección CSRF

## Preferencias del Usuario
- Integración REAL de Mercado Pago (no mock)
- Webhooks automáticos para confirmación de pagos
- Configuración de Mercado Pago desde panel admin
- Stack específico: React + Node.js + PostgreSQL + Tailwind CSS

## Estado del Proyecto
**Fecha de inicio**: 26 de agosto, 2025
**Estado actual**: Inicializando proyecto y configurando base de datos

## Cambios Recientes
- 26/08/2025: Instalación de Node.js y creación de base de datos PostgreSQL
- 26/08/2025: Definición de stack tecnológico y arquitectura
- 26/08/2025: Instalación de dependencias del proyecto