# Configuración de Supabase para Subida de Archivos

## Pasos para configurar Supabase Storage:

### 1. Crear archivo .env.local

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Obtener credenciales de Supabase

1. Ve a tu proyecto en Supabase Dashboard
2. Ve a Settings > API
3. Copia la "Project URL" y "anon public" key
4. Pega los valores en el archivo .env.local

### 3. Crear bucket en Supabase Storage

1. Ve a Storage en tu dashboard de Supabase
2. Crea un nuevo bucket llamado "ADVANTA-BUCKET" (ya configurado)
3. Configura las políticas de acceso:
   - Para subir archivos: `authenticated` o `public`
   - Para leer archivos: `public`

### 4. Políticas de Storage (opcional)

Si quieres que sea público, puedes usar estas políticas:

```sql
-- Política para permitir subir archivos
CREATE POLICY "Allow public uploads" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'ADVANTA-BUCKET');

-- Política para permitir leer archivos
CREATE POLICY "Allow public access" ON storage.objects
FOR SELECT USING (bucket_id = 'ADVANTA-BUCKET');
```

## Estructura de Carpetas

El sistema organiza automáticamente los archivos por cliente:

```
ADVANTA-BUCKET/
├── cliente-1/
│   └── logos/
│       ├── 1234567890-abc123.png
│       └── 1234567891-def456.jpg
├── cliente-2/
│   └── logos/
│       └── 1234567892-ghi789.png
└── temp/
    └── logos/
        └── archivos-temporales.png
```

- **Cada cliente** tiene su propia carpeta con su `client_id`
- **Dentro de cada cliente** hay subcarpetas por tipo (`logos/`, `images/`, etc.)
- **Archivos temporales** se guardan en `temp/` hasta que se confirme el cliente

## Solución Temporal

Mientras configuras Supabase, el sistema usará URLs temporales para las imágenes subidas.
