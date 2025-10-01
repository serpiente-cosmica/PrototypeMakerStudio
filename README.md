# Demo Customizer

Plataforma "Demo Customizer" que sirve demos de Figma con configuración "white label" dinámica.

## 🚀 Características

- **Framework:** Next.js con JavaScript ES6+
- **Estilos:** Tailwind CSS (Mobile-First)
- **Arquitectura:** Modular con separación estricta de responsabilidades
- **White Label:** Configuración dinámica por cliente
- **Approaches:** Foodbox (delivery) y PlanetPay (fintech)

## 📁 Estructura del Proyecto

```
/
├── components/
│   └── common/          # Componentes reutilizables
├── hooks/
│   └── useAppConfig.js  # Hook principal de configuración
├── layouts/
│   ├── FoodboxLayout.js # Layout para delivery/comida
│   └── PlanetPayLayout.js # Layout para pagos/fintech
├── pages/
│   ├── index.js         # Redirección a /portal
│   ├── portal.js        # Selección de approach
│   └── demo/
│       └── [clientId].js # Demo principal con renderizado condicional
├── styles/
│   └── globals.css      # Estilos globales con Tailwind
└── ARCHITECTURE_RULES.md # Reglas de arquitectura
```

## 🛠️ Instalación

1. **Instalar dependencias:**

   ```bash
   npm install
   ```

2. **Ejecutar en desarrollo:**

   ```bash
   npm run dev
   ```

3. **Abrir en el navegador:**
   ```
   http://localhost:3000
   ```

## 🎯 Rutas Disponibles

- `/` - Redirige automáticamente a `/portal`
- `/portal` - Portal de selección de approach
- `/demo/[clientId]` - Demo principal con configuración específica

### Clientes de Demo Disponibles

- `foodbox-demo` - Demo de aplicación de delivery
- `planetpay-demo` - Demo de plataforma de pagos
- `default-client` - Cliente por defecto

## 🔧 Configuración White Label

La configuración se maneja a través del hook `useAppConfig.js`:

```javascript
const clientConfig = {
  clientId: "string",
  appName: "string",
  logoUrl: "string",
  primaryColor: "string",
  secondaryColor: "string",
  approach: "Foodbox" | "PlanetPay",
  features: {
    // Configuraciones específicas por approach
  },
};
```

## 🎨 Approaches Soportados

### Foodbox (Delivery/Comida)

- Diseño orientado a aplicaciones de delivery
- Colores naranjas/rojos
- Funcionalidades: pedidos, restaurantes, tracking

### PlanetPay (Pagos/Fintech)

- Diseño orientado a aplicaciones financieras
- Colores azules/índigo
- Funcionalidades: transferencias, inversiones, seguridad

## 📱 Características Técnicas

- **Mobile-First:** Diseño responsive con Tailwind CSS
- **Modular:** Separación estricta de componentes, layouts y hooks
- **Configuración Dinámica:** Colores, logos y contenido por cliente
- **Renderizado Condicional:** Layouts diferentes según el approach
- **Simulación de API:** Datos hardcodeados para desarrollo

## 🚀 Próximos Pasos

1. Implementar modo admin (`/demo/[clientId]/admin`)
2. Conectar con API real (Supabase)
3. Añadir más approaches
4. Implementar edición inline
5. Añadir autenticación

## 📄 Arquitectura

Ver `ARCHITECTURE_RULES.md` para las reglas completas de arquitectura y convenciones de código.

---

**Desarrollado por Advanta** - Demo Customizer Platform
