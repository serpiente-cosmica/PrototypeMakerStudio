# Demo Customizer - Guía de Desarrollo

## 📋 Descripción del Proyecto

**Demo Customizer** es una plataforma de "white label" que permite crear demos personalizados de aplicaciones móviles. Los usuarios pueden configurar logos, colores, y contenido específico para cada cliente, generando demos únicos que se pueden compartir.

**Estado Actual**: El proyecto está en desarrollo activo con un enfoque principal (ActiveFit+) y capacidad para agregar más enfoques en el futuro.

## 🚀 Tecnologías Utilizadas

- **Frontend**: Next.js 14.2.33
- **Styling**: Tailwind CSS
- **Base de Datos**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Lenguaje**: JavaScript puro (ES6+) / React
- **Deployment**: Local Development
- **Estado**: Sin TypeScript (JavaScript vanilla)

## 📁 Estructura del Proyecto

```
CustomPrototypes/
├── 📄 ARCHITECTURE_RULES.md          # Reglas de arquitectura del proyecto
├── 📄 DEVELOPMENT_GUIDE.md           # Esta guía de desarrollo
├── 📄 README.md                      # Documentación básica
├── 📄 package.json                   # Dependencias y scripts
├── 📄 next.config.js                 # Configuración de Next.js
├── 📄 tailwind.config.js             # Configuración de Tailwind CSS
├── 📄 postcss.config.js              # Configuración de PostCSS
├── 📄 SUPABASE_SETUP.md              # Guía de configuración de Supabase
├── 📄 supabase_policies.sql          # Políticas de seguridad de Supabase
├── 📄 database_policies.sql          # Políticas adicionales de BD
│
├── 📁 pages/                         # Páginas de Next.js (Routing)
│   ├── 📄 index.js                   # Página principal (redirige a /portal)
│   ├── 📄 _app.js                    # App component global
│   ├── 📄 _document.js               # Document component
│   ├── 📄 portal.js                  # Portal principal de gestión
│   │
│   ├── 📁 demo/                      # Páginas de demo
│   │   └── 📁 [clientId]/
│   │       ├── 📄 index.js           # Demo principal del cliente
│   │       └── 📄 admin.js           # Admin (redirige a configure)
│   │
│   └── 📁 portal/                    # Páginas de administración
│       ├── 📁 client/
│       │   └── 📁 [clientId]/
│       │       └── 📄 configure.js  # Configuración de pantallas
│       │
│       └── 📁 new-client/            # Creación de nuevos clientes
│
├── 📁 components/                    # Componentes React
│   ├── 📁 common/                    # Componentes reutilizables
│   │   ├── 📄 Header.js              # Header genérico
│   │   ├── 📄 Modal.js               # Modal de notificaciones
│   │   └── 📄 ImageTest.js           # Componente de prueba de imágenes
│   │
│   ├── 📁 screens/                   # Componentes de pantallas específicas
│   │   ├── 📄 LoginLogoScreen.js     # Pantalla de login con logo
│   │   ├── 📄 HomeDashboardScreen.js # Pantalla de dashboard
│   │   └── 📄 ProfileSettingsScreen.js # Pantalla de perfil
│   │
│   ├── 📄 ClientCreationForm.js      # Formulario de creación de cliente
│   └── 📄 ScreenPreview.js           # Preview de pantallas móviles
│
├── 📁 hooks/                         # Custom React Hooks
│   ├── 📄 useAppConfig.js            # Configuración de cliente
│   ├── 📄 useAppApproaches.js        # Gestión de enfoques
│   ├── 📄 useApproachScreens.js      # Pantallas por enfoque
│   ├── 📄 useCreateClient.js         # Creación de clientes
│   ├── 📄 useFileUpload.js            # Subida de archivos
│   ├── 📄 useModal.js                # Gestión de modales
│   ├── 📄 useSaveScreenSettings.js   # Guardado de configuraciones
│   ├── 📄 useLoadScreenSettings.js   # Carga de configuraciones
│   └── 📄 useUpdateClientConfig.js   # Actualización de cliente
│
├── 📁 layouts/                       # Layouts específicos
│   ├── 📄 FoodboxLayout.js           # Layout para ActiveFit+ (Approach 1)
│   └── 📄 PlanetPayLayout.js         # Layout para futuros enfoques (no usado actualmente)
│
├── 📁 utils/                         # Utilidades
│   ├── 📄 supabaseClient.js          # Cliente de Supabase
│   └── 📄 screenMapper.js             # Mapeo de pantallas
│
├── 📁 styles/                        # Estilos globales
│   └── 📄 globals.css                # CSS global con Tailwind
│
└── 📁 public/                        # Archivos estáticos
    └── 📄 favicon.svg                 # Favicon del sitio
```

## 🎯 Estado Actual del Proyecto

### Enfoques Disponibles

- **ActiveFit+** (Approach 1) - ✅ Activo y funcional
- **Futuros enfoques** - 🔄 En desarrollo

### Pantallas Implementadas

- **LoginLogoScreen** (`login_generic_logo`) - ✅ Pantalla de login con logo centrado
- **HomeDashboardScreen** (`home_dashboard`) - 🔄 En desarrollo
- **ProfileSettingsScreen** (`profile_settings`) - 🔄 En desarrollo

### Funcionalidades Completadas

- ✅ Creación de clientes
- ✅ Configuración de logos y colores
- ✅ Subida de archivos a Supabase Storage
- ✅ Preview en tiempo real
- ✅ Sistema de modales
- ✅ Gestión de configuraciones

### Funcionalidades Pendientes

- 🔄 Más pantallas específicas
- 🔄 Nuevos enfoques (Approach 2, 3, etc.)
- 🔄 Sistema de navegación entre pantallas
- 🔄 Configuraciones avanzadas por pantalla

## 🗂️ Descripción de Páginas

### Páginas Principales

| Ruta                                  | Archivo                                       | Descripción                               |
| ------------------------------------- | --------------------------------------------- | ----------------------------------------- |
| `/`                                   | `pages/index.js`                              | Página principal que redirige a `/portal` |
| `/portal`                             | `pages/portal.js`                             | Portal principal para gestionar clientes  |
| `/demo/[clientId]`                    | `pages/demo/[clientId]/index.js`              | Demo público del cliente                  |
| `/demo/[clientId]/admin`              | `pages/demo/[clientId]/admin.js`              | Admin (redirige a configure)              |
| `/portal/client/[clientId]/configure` | `pages/portal/client/[clientId]/configure.js` | Configuración de pantallas                |

### Flujo de Navegación

```
1. Usuario accede a "/" → Redirige a "/portal"
2. En "/portal" puede:
   - Ver lista de clientes existentes
   - Crear nuevo cliente
   - Acceder a demo o admin de cada cliente
3. Demo público: "/demo/[clientId]" (solo lectura)
4. Configuración: "/portal/client/[clientId]/configure" (edición)
```

## 🛠️ Configuración del Entorno Local

### Prerrequisitos

- Node.js 16+
- npm o yarn
- Cuenta de Supabase

### 1. Clonar el Proyecto

```bash
git clone <repository-url>
cd CustomPrototypes
```

### 2. Instalar Dependencias

```bash
npm install
# o
yarn install
```

### 3. Configurar Variables de Entorno

Crear archivo `.env.local` en la raíz del proyecto:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Configurar Supabase

1. Crear proyecto en [Supabase](https://supabase.com)
2. Ejecutar el script SQL de `supabase_policies.sql`
3. Crear bucket "ADVANTA-BUCKET" en Storage
4. Configurar políticas RLS

### 5. Ejecutar el Proyecto

```bash
npm run dev
# o
yarn dev
```

El proyecto estará disponible en `http://localhost:3000` (o el puerto siguiente disponible).

## 🗄️ Estructura de Base de Datos

### Tablas Principales

#### `app_approaches`

- `approach_id` (UUID, PK)
- `name` (VARCHAR) - Actualmente: "ActiveFit+"
- `description` (TEXT)
- `created_at` (TIMESTAMP)

#### `app_screens`

- `screen_id` (VARCHAR, PK)
- `name` (VARCHAR)
- `description` (TEXT)

#### `approach_screens`

- `approach_id` (UUID, FK)
- `screen_id` (VARCHAR, FK)
- `order_index` (INTEGER)

#### `client_configs`

- `client_id` (VARCHAR, PK)
- `app_name` (VARCHAR)
- `approach_id` (UUID, FK)
- `logo_url` (TEXT)
- `colors_json` (JSONB)
- `created_at` (TIMESTAMP)

#### `client_screen_configs`

- `id` (UUID, PK)
- `client_id` (VARCHAR, FK)
- `screen_id` (VARCHAR, FK)
- `settings_json` (JSONB)
- `created_at` (TIMESTAMP)

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye para producción
npm run start        # Inicia servidor de producción

# Linting
npm run lint         # Ejecuta ESLint
```

## 🎨 Sistema de Diseño

### Colores Personalizados (Tailwind)

```javascript
// tailwind.config.js
colors: {
  primary: {
    50: '#eff6ff',
    500: '#3b82f6',
    600: '#2563eb',
    // ... más variantes
  },
  secondary: {
    50: '#f8fafc',
    500: '#64748b',
    600: '#475569',
    // ... más variantes
  }
}
```

### Componentes Reutilizables

- **Modal**: Sistema de notificaciones
- **Header**: Header genérico con configuración dinámica
- **ImageTest**: Componente para testing de imágenes
- **ScreenPreview**: Preview de pantallas móviles

## 🔄 Flujo de Datos

### 1. Carga de Configuración

```
useAppConfig(clientId) → Supabase → client_configs + app_approaches
```

### 2. Gestión de Pantallas

```
useApproachScreens(approach_id) → Supabase → approach_screens + app_screens
```

### 3. Subida de Archivos

```
useFileUpload() → Supabase Storage → ADVANTA-BUCKET/clientId/
```

### 4. Guardado de Configuraciones

```
useUpdateClientConfig() → Supabase → client_configs
useSaveScreenSettings() → Supabase → client_screen_configs
```

## 🧩 Custom Hooks

### `useAppConfig(clientId)`

- Carga configuración completa del cliente
- Incluye fallback con datos mock
- Retorna: `{ config, isLoading, error, refetch }`

### `useFileUpload()`

- Maneja subida de archivos a Supabase Storage
- Crea estructura de carpetas por cliente
- Retorna: `{ uploadFile, isLoading, error }`

### `useModal()`

- Sistema de modales para notificaciones
- Tipos: success, error, warning
- Retorna: `{ showSuccess, showError, showWarning, ... }`

## 🎯 Convenciones de Desarrollo

### Naming Conventions

- **Componentes**: PascalCase (`LoginLogoScreen`)
- **Hooks**: camelCase con prefijo `use` (`useAppConfig`)
- **Archivos**: PascalCase para componentes, camelCase para hooks
- **Variables**: camelCase (`clientId`, `screenSettings`)
- **Constantes**: UPPER_SNAKE_CASE (`MOCK_CLIENT_CONFIGS`)

### Estructura de Componentes (JavaScript Puro)

```javascript
// 1. Imports
import { useState, useEffect } from "react";
import { useAppConfig } from "../hooks/useAppConfig";

// 2. Component definition
const MyComponent = ({ prop1, prop2 }) => {
  // 3. Props destructuring
  const { clientId } = router.query;

  // 4. State y hooks
  const [state, setState] = useState(null);
  const { config, isLoading } = useAppConfig(clientId);

  // 5. Event handlers
  const handleClick = () => {
    // logic
  };

  // 6. Effects
  useEffect(() => {
    // side effects
  }, [dependency]);

  // 7. Render
  return <div>{/* JSX */}</div>;
};

// 8. Export
export default MyComponent;
```

### Manejo de Errores

- Siempre usar try/catch en operaciones async
- Mostrar errores con `useModal` hooks
- Incluir fallbacks para datos de Supabase

## 🚀 Deployment

### Variables de Entorno de Producción

```env
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
```

### Build para Producción

```bash
npm run build
npm run start
```

## 🔍 Debugging

### Logs Útiles

- `useAppConfig`: Logs de carga de configuración
- `useFileUpload`: Logs de subida de archivos
- `useModal`: Logs de notificaciones

### Herramientas de Desarrollo

- React Developer Tools
- Supabase Dashboard
- Browser DevTools

## 📚 Recursos Adicionales

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [React Hooks Documentation](https://reactjs.org/docs/hooks-intro.html)

## 🤝 Contribución

1. Seguir las convenciones de naming
2. Documentar nuevos hooks y componentes
3. Incluir fallbacks para Supabase
4. Mantener JavaScript puro (sin TypeScript por ahora)
5. Mantener la estructura de carpetas
6. Agregar comentarios JSDoc para funciones complejas

---

**Última actualización**: Diciembre 2024
**Versión**: 1.0.0
