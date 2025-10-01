# REGLA DE ARQUITECTURA: PROYECTO DEMO CUSTOMIZER (NEXT.JS + TAILWIND)

**Este documento es la fuente de verdad y el contexto de arquitectura para todas las solicitudes de código futuro. Debes aplicar estas directrices en cada componente o archivo que generes.**

## OBJETIVO PRINCIPAL

Crear una plataforma "Demo Customizer" (Web App) que sirve demos de Figma con configuración "white label" dinámica.

## STACK TECNOLÓGICO

1. **Framework:** Next.js (Usa JavaScript con notación moderna ES6)
2. **Estilos:** Tailwind CSS (Mobile-First)
3. **Backend (Lógica):** Simulación de Supabase (la lógica de API se encapsulará en un Hook)

## ARQUITECTURA Y CONVENCIONES

### 1. MODULARIDAD

Todo el código debe estar estrictamente separado en:

- `components/` - Componentes reutilizables
- `layouts/` - Layouts y estructuras de página
- `hooks/` - Custom hooks para lógica de negocio
- `pages/` - Páginas de la aplicación

### 2. CONFIGURACIÓN WHITE LABEL

- La configuración de "white label" (logo, appName, colores, etc.) se cargará a través del Hook `useAppConfig.js`
- Se inyectará en los componentes mediante props o un Contexto de React
- Configuración incluye: logo, nombre de app, paleta de colores, approach seleccionado

### 3. RUTAS (ROUTING)

- `/portal` - Página de inicio para que el cliente seleccione el "Approach"
- `/demo/[clientId]` - Ruta principal de la Demo (Visualización)
- `/demo/[clientId]/admin` - Ruta para el Modo Administración (Edición inline)

### 4. APPROACHES (DISEÑOS)

El proyecto debe manejar el renderizado condicional de dos diseños principales:

- **'Foodbox'** - Diseño para aplicaciones de delivery/comida
- **'PlanetPay'** - Diseño para aplicaciones de pagos/fintech

### 5. MODO ADMIN

Cuando se detecte la ruta `/admin`:

- Los componentes del diseño deben mostrar elementos de edición inline
- Botones o campos de formulario sobre los textos y las imágenes configurables
- Interfaz de edición superpuesta sobre el contenido

## CONVENCIONES DE CÓDIGO

### Estructura de Archivos

```
/
├── components/
│   ├── ui/           # Componentes base reutilizables
│   ├── forms/        # Componentes de formularios
│   └── layouts/      # Componentes de layout específicos
├── hooks/
│   ├── useAppConfig.js    # Hook principal de configuración
│   └── useClientData.js   # Hook para datos del cliente
├── layouts/
│   ├── PortalLayout.js    # Layout para /portal
│   ├── DemoLayout.js      # Layout para /demo/[clientId]
│   └── AdminLayout.js     # Layout para modo admin
├── pages/
│   ├── portal.js          # Página de selección de approach
│   └── demo/
│       └── [clientId]/
│           ├── index.js   # Demo principal
│           └── admin.js   # Modo administración
└── styles/
    └── globals.css        # Estilos globales con Tailwind
```

### Convenciones de Nomenclatura

- **Componentes:** PascalCase (ej: `FoodboxHeader.js`)
- **Hooks:** camelCase con prefijo "use" (ej: `useAppConfig.js`)
- **Archivos de página:** camelCase (ej: `portal.js`)
- **Variables y funciones:** camelCase
- **Constantes:** UPPER_SNAKE_CASE

### Configuración de Cliente

```javascript
// Estructura esperada en useAppConfig
const clientConfig = {
  clientId: "string",
  appName: "string",
  logo: "string", // URL o path
  primaryColor: "string", // Hex color
  secondaryColor: "string", // Hex color
  approach: "Foodbox" | "PlanetPay",
  features: {
    // Configuraciones específicas por approach
  },
};
```

## REGLAS DE IMPLEMENTACIÓN

1. **Siempre usar Tailwind CSS** para estilos con enfoque Mobile-First
2. **Encapsular lógica de API** en hooks personalizados
3. **Renderizado condicional** basado en el approach del cliente
4. **Modo admin** debe ser detectable por ruta y mostrar controles inline
5. **Configuración dinámica** debe aplicarse a todos los componentes
6. **Separación estricta** de responsabilidades por carpetas
7. **JavaScript moderno ES6+** en todo el código

## APLICAR ESTAS REGLAS SIEMPRE

**Este documento debe ser consultado y aplicado en cada solicitud de código futuro.**
