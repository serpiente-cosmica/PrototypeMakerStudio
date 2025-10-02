# 🏗️ **Guía de Desarrollo de Pantallas - Sistema Aislado**

## 📋 **Resumen**

Este sistema permite que múltiples desarrolladores trabajen en paralelo creando pantallas sin afectarse entre sí. Cada pantalla es completamente independiente y se registra automáticamente en el sistema.

## 🎯 **Principios del Sistema**

### **1. Aislamiento Completo**

- ✅ Cada pantalla tiene su propia carpeta
- ✅ Configuración independiente por pantalla
- ✅ No hay dependencias entre pantallas (excepto navegación)
- ✅ Cada desarrollador puede trabajar sin afectar a otros

### **2. Registro Automático**

- ✅ Las pantallas se registran automáticamente al importar
- ✅ No necesitas modificar archivos centrales
- ✅ El sistema detecta nuevas pantallas automáticamente

### **3. Escalabilidad**

- ✅ Fácil agregar nuevas pantallas
- ✅ Sistema de dependencias opcional
- ✅ Metadatos para organización

## 📁 **Estructura de Carpetas**

```
components/screens/
├── login_generic_logo/          # Pantalla existente
│   ├── LoginLogoScreen.js       # Componente de la pantalla
│   ├── LoginLogoConfig.js       # Componente de configuración
│   └── index.js                 # Registro de la pantalla
├── login_generic_form/          # Pantalla existente
│   ├── LoginFormScreen.js       # Componente de la pantalla
│   ├── LoginFormConfig.js       # Componente de configuración
│   └── index.js                 # Registro de la pantalla
├── home_dashboard/              # Nueva pantalla (ejemplo)
│   ├── HomeDashboardScreen.js   # Componente de la pantalla
│   ├── HomeDashboardConfig.js   # Componente de configuración
│   └── index.js                 # Registro de la pantalla
└── profile_settings/            # Nueva pantalla (ejemplo)
    ├── ProfileSettingsScreen.js # Componente de la pantalla
    ├── ProfileSettingsConfig.js # Componente de configuración
    └── index.js                 # Registro de la pantalla
```

## 🚀 **Cómo Crear una Nueva Pantalla**

### **Paso 1: Crear la Carpeta**

```bash
mkdir components/screens/mi_nueva_pantalla
cd components/screens/mi_nueva_pantalla
```

### **Paso 2: Crear el Componente de Pantalla**

```javascript
// MiNuevaPantallaScreen.js
import React from "react";

const MiNuevaPantallaScreen = ({
  screenSettings = {},
  clientId,
  config,
  screenId,
  onNavigate,
  ...props
}) => {
  if (!config) {
    return (
      <div className="h-full flex items-center justify-center bg-white">
        <div className="text-center text-gray-600">
          <p>Loading configuration...</p>
        </div>
      </div>
    );
  }

  // Tu lógica de pantalla aquí
  return (
    <div className="h-full w-full bg-white">
      <h1>Mi Nueva Pantalla</h1>
      {/* Tu contenido aquí */}
    </div>
  );
};

export default MiNuevaPantallaScreen;
```

### **Paso 3: Crear el Componente de Configuración**

```javascript
// MiNuevaPantallaConfig.js
import React, { useState, useEffect } from "react";

const MiNuevaPantallaConfig = ({
  screenId,
  screenConfig,
  onConfigChange,
  onSave,
  onReset,
  isLoading = false,
}) => {
  const [localConfig, setLocalConfig] = useState(screenConfig);

  useEffect(() => {
    setLocalConfig(screenConfig);
  }, [screenConfig]);

  const handleFieldChange = (field, value) => {
    const newConfig = { ...localConfig, [field]: value };
    setLocalConfig(newConfig);
    onConfigChange(newConfig);
  };

  const handleReset = () => {
    onReset();
  };

  return (
    <div className="space-y-4">
      {/* Tus campos de configuración aquí */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mi Campo Personalizado
        </label>
        <input
          type="text"
          value={localConfig.mi_campo || ""}
          onChange={(e) => handleFieldChange("mi_campo", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Valor por defecto"
        />
      </div>

      {/* Botones de acción */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          onClick={handleReset}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Reset
        </button>
        <div className="text-sm text-gray-500 flex items-center">
          💾 Changes are saved automatically when navigating
        </div>
      </div>
    </div>
  );
};

export default MiNuevaPantallaConfig;
```

### **Paso 4: Registrar la Pantalla**

**📍 UBICACIÓN:** `components/screens/mi_nueva_pantalla/index.js`

Este es el archivo más importante. Aquí es donde se registra la pantalla en el sistema:

```javascript
// components/screens/mi_nueva_pantalla/index.js
import MiNuevaPantallaScreen from "./MiNuevaPantallaScreen";
import MiNuevaPantallaConfig from "./MiNuevaPantallaConfig";
import { registerScreen } from "../../../utils/screenRegistry";

// Configuración por defecto específica de esta pantalla
const defaultConfig = {
  mi_campo: "valor por defecto",
  otro_campo: "otro valor",
};

// Metadatos de la pantalla
const metadata = {
  name: "Mi Nueva Pantalla",
  description: "Descripción de lo que hace esta pantalla",
  version: "1.0.0",
  author: "Tu Nombre",
  category: "Categoría",
};

// 🎯 ¡AQUÍ ES DONDE SE REGISTRA LA PANTALLA!
registerScreen("mi_nueva_pantalla", {
  component: MiNuevaPantallaScreen, // Componente de la pantalla
  configComponent: MiNuevaPantallaConfig, // Componente de configuración
  defaultConfig, // Configuración por defecto
  dependencies: [], // Pantallas de las que depende (opcional)
  metadata, // Metadatos
});

// Exportar componentes para uso directo si es necesario
export { MiNuevaPantallaScreen, MiNuevaPantallaConfig };
export default MiNuevaPantallaScreen;
```

**🔍 ¿Qué hace `registerScreen()`?**

- Guarda la pantalla en el sistema de registro
- La hace disponible para ser usada en la aplicación
- Muestra un mensaje de confirmación: `✅ Screen mi_nueva_pantalla registered successfully`

### **Paso 5: Importar en screenMapper.js**

**📍 UBICACIÓN:** `utils/screenMapper.js`

Este archivo es el "directorio central" de todas las pantallas. Su función es importar todas las pantallas para que se registren automáticamente cuando Next.js inicie.

**🔍 ¿Qué es `screenMapper.js`?**

- Es el archivo que conecta todas las pantallas con el sistema
- Importa todas las carpetas de pantallas para que se ejecute el código de registro
- No necesitas modificar nada más que agregar una línea de import

**📝 Cómo agregar tu pantalla:**

```javascript
// utils/screenMapper.js
import {
  getScreenComponent as getRegisteredScreenComponent,
  getAllScreens,
} from "./screenRegistry";

// Importar todas las pantallas para que se registren automáticamente
import "../components/screens/login_generic_logo";
import "../components/screens/login_generic_form";
import "../components/screens/mi_nueva_pantalla"; // ← AGREGAR ESTA LÍNEA

// ... resto del código ...
```

**🎯 ¿Por qué es necesario?**

- Next.js necesita "saber" que tu pantalla existe
- Al importar la carpeta, se ejecuta el código de `index.js`
- El código de `registerScreen()` se ejecuta automáticamente
- Tu pantalla queda disponible en toda la aplicación

**✅ Resultado:**
Cuando Next.js inicie, verás en la consola:

```
✅ Screen login_generic_logo registered successfully
✅ Screen login_generic_form registered successfully
✅ Screen mi_nueva_pantalla registered successfully
```

## 🔄 **Flujo Completo de Registro de Pantallas**

### **📋 Resumen del Proceso:**

1. **Crear archivos** → `MiPantallaScreen.js`, `MiPantallaConfig.js`, `index.js`
2. **Registrar en `index.js`** → `registerScreen("mi_pantalla", {...})`
3. **Importar en `screenMapper.js`** → `import "../components/screens/mi_pantalla"`
4. **Next.js inicia** → Ejecuta todos los imports automáticamente
5. **Pantalla registrada** → Disponible en toda la aplicación

### **🎯 Archivos Clave:**

| Archivo             | Ubicación                                 | Función                                               |
| ------------------- | ----------------------------------------- | ----------------------------------------------------- |
| `index.js`          | `components/screens/mi_pantalla/index.js` | **Registra la pantalla** con `registerScreen()`       |
| `screenMapper.js`   | `utils/screenMapper.js`                   | **Importa todas las pantallas** para que se registren |
| `screenRegistry.js` | `utils/screenRegistry.js`                 | **Almacena el registro** en memoria                   |

### **🔍 ¿Cuándo se ejecuta el registro?**

El registro se ejecuta **automáticamente** cuando:

- Next.js inicia la aplicación
- Se ejecuta `npm run dev`
- Se carga cualquier página que use pantallas

**No necesitas hacer nada más** después de seguir los 5 pasos.

## 🔧 **Configuración de Base de Datos**

### **Para Pantallas con Configuración Específica:**

- **Tabla**: `client_screen_configs`
- **Campo**: `settings_json`
- **Contenido**: Solo propiedades específicas de la pantalla

### **Para Configuración de Cliente:**

- **Tabla**: `client_configs`
- **Campos**: `logo_url`, `colors_json`
- **Uso**: Logo principal y colores base

## 📊 **Tipos de Configuración**

### **1. Configuración de Cliente (`client_configs`)**

```json
{
  "logo_url": "https://...",
  "colors_json": {
    "primary": "#3b82f6",
    "secondary": "#64748b",
    "background": "#ffffff",
    "accent": "#f59e0b"
  }
}
```

### **2. Configuración de Pantalla (`client_screen_configs`)**

```json
{
  "mi_campo": "valor personalizado",
  "otro_campo": "otro valor",
  "logo_size": "150px",
  "logo_position": "center"
}
```

## 🎨 **Acceso a Configuración en Componentes**

### **En el Componente de Pantalla:**

```javascript
const MiPantallaScreen = ({ screenSettings, config, ...props }) => {
  // Configuración específica de la pantalla
  const miCampo = screenSettings?.mi_campo || "valor por defecto";

  // Configuración del cliente
  const logoUrl = config?.logoUrl || "";
  const primaryColor = config?.colors_json?.primary || "#3b82f6";

  return (
    <div style={{ backgroundColor: primaryColor }}>
      <img src={logoUrl} alt="Logo" />
      <p>{miCampo}</p>
    </div>
  );
};
```

## 🔄 **Flujo de Datos**

1. **Carga**: `useScreenConfig` carga configuración de `client_screen_configs`
2. **Combinación**: Se combina con configuración de `client_configs`
3. **Renderizado**: Se pasa a `ScreenWrapper` → `MiPantallaScreen`
4. **Configuración**: Se pasa a `ConfigWrapper` → `MiPantallaConfig`
5. **Guardado**: Cambios se guardan automáticamente en Next/Back

## 🚨 **Reglas Importantes**

### **✅ HACER:**

- Crear carpeta independiente para cada pantalla
- Usar `registerScreen()` para registrar la pantalla
- Mantener configuración específica separada de configuración de cliente
- Usar `screenSettings` para configuración específica
- Usar `config` para configuración de cliente

### **❌ NO HACER:**

- Modificar archivos de otras pantallas
- Crear dependencias directas entre pantallas
- Usar imports directos entre pantallas
- Modificar `screenMapper.js` manualmente (solo agregar imports)

## 🐛 **Debugging**

### **Verificar Registro de Pantallas:**

```javascript
import { getRegistryDebugInfo } from "../utils/screenRegistry";
console.log(getRegistryDebugInfo());
```

### **Verificar Configuración:**

```javascript
import { getScreenDefaultConfig } from "../utils/screenRegistry";
console.log(getScreenDefaultConfig("mi_pantalla"));
```

## 📝 **Ejemplos Prácticos**

### **🔍 Pantallas Existentes (para referencia):**

- `components/screens/login_generic_logo/` - Pantalla de logo
- `components/screens/login_generic_form/` - Pantalla de formulario

### **📋 Ejemplo Real: Crear pantalla "Dashboard"**

**Paso 1:** Crear carpeta

```bash
mkdir components/screens/dashboard
```

**Paso 2:** Crear `DashboardScreen.js`

```javascript
// components/screens/dashboard/DashboardScreen.js
import React from "react";

const DashboardScreen = ({ screenSettings, config, ...props }) => {
  const welcomeText = screenSettings?.welcome_text || "Welcome to Dashboard";

  return (
    <div className="h-full w-full bg-white p-6">
      <h1 className="text-2xl font-bold">{welcomeText}</h1>
      <p>Dashboard content here...</p>
    </div>
  );
};

export default DashboardScreen;
```

**Paso 3:** Crear `DashboardConfig.js`

```javascript
// components/screens/dashboard/DashboardConfig.js
import React, { useState, useEffect } from "react";

const DashboardConfig = ({ screenConfig, onConfigChange, onReset }) => {
  const [localConfig, setLocalConfig] = useState(screenConfig);

  useEffect(() => {
    setLocalConfig(screenConfig);
  }, [screenConfig]);

  const handleFieldChange = (field, value) => {
    const newConfig = { ...localConfig, [field]: value };
    setLocalConfig(newConfig);
    onConfigChange(newConfig);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Welcome Text
        </label>
        <input
          type="text"
          value={localConfig.welcome_text || "Welcome to Dashboard"}
          onChange={(e) => handleFieldChange("welcome_text", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          onClick={onReset}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          Reset
        </button>
        <div className="text-sm text-gray-500 flex items-center">
          💾 Changes are saved automatically when navigating
        </div>
      </div>
    </div>
  );
};

export default DashboardConfig;
```

**Paso 4:** Crear `index.js` (¡EL MÁS IMPORTANTE!)

```javascript
// components/screens/dashboard/index.js
import DashboardScreen from "./DashboardScreen";
import DashboardConfig from "./DashboardConfig";
import { registerScreen } from "../../../utils/screenRegistry";

// Configuración por defecto
const defaultConfig = {
  welcome_text: "Welcome to Dashboard",
};

// Metadatos
const metadata = {
  name: "Dashboard Screen",
  description: "Pantalla principal del dashboard",
  version: "1.0.0",
  author: "Tu Nombre",
  category: "Dashboard",
};

// 🎯 ¡REGISTRAR LA PANTALLA!
registerScreen("dashboard", {
  component: DashboardScreen,
  configComponent: DashboardConfig,
  defaultConfig,
  dependencies: [],
  metadata,
});

export { DashboardScreen, DashboardConfig };
export default DashboardScreen;
```

**Paso 5:** Agregar a `screenMapper.js`

```javascript
// utils/screenMapper.js
import {
  getScreenComponent as getRegisteredScreenComponent,
  getAllScreens,
} from "./screenRegistry";

// Importar todas las pantallas para que se registren automáticamente
import "../components/screens/login_generic_logo";
import "../components/screens/login_generic_form";
import "../components/screens/dashboard"; // ← AGREGAR ESTA LÍNEA

// ... resto del código ...
```

**✅ ¡Listo!** Tu pantalla "dashboard" está registrada y funcionando.

## 🎯 **Resumen: ¿Dónde se Registra la Pantalla?**

### **📍 Archivo Principal de Registro:**

**`components/screens/mi_pantalla/index.js`**

Este archivo contiene la función `registerScreen()` que registra tu pantalla en el sistema.

### **📍 Archivo de Conexión:**

**`utils/screenMapper.js`**

Este archivo importa todas las pantallas para que se ejecute el código de registro cuando Next.js inicie.

### **📍 Archivo de Almacenamiento:**

**`utils/screenRegistry.js`**

Este archivo contiene el sistema de registro que almacena todas las pantallas en memoria.

### **🔄 Flujo Simple:**

1. **Crear** → `mi_pantalla/index.js` con `registerScreen()`
2. **Importar** → Agregar línea en `screenMapper.js`
3. **¡Listo!** → Next.js registra automáticamente

## 🎉 **¡Listo!**

Con este sistema puedes:

- ✅ Trabajar en paralelo con otros desarrolladores
- ✅ Crear pantallas sin afectar otras
- ✅ Mantener configuración aislada
- ✅ Escalar fácilmente el sistema
- ✅ Debuggear problemas de forma independiente

**¡Cada pantalla es completamente independiente!** 🚀
