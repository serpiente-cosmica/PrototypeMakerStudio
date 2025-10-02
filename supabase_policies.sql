-- Políticas SQL para ADVANTA-BUCKET
-- Ejecuta estos comandos en tu dashboard de Supabase > SQL Editor

-- 1. Política para permitir subir archivos (INSERT)
CREATE POLICY "Allow public uploads to ADVANTA-BUCKET" 
ON storage.objects
FOR INSERT 
WITH CHECK (bucket_id = 'ADVANTA-BUCKET');

-- 2. Política para permitir leer archivos (SELECT)
CREATE POLICY "Allow public access to ADVANTA-BUCKET" 
ON storage.objects
FOR SELECT 
USING (bucket_id = 'ADVANTA-BUCKET');

-- 3. Política para permitir actualizar archivos (UPDATE)
CREATE POLICY "Allow public updates to ADVANTA-BUCKET" 
ON storage.objects
FOR UPDATE 
USING (bucket_id = 'ADVANTA-BUCKET');

-- 4. Política para permitir eliminar archivos (DELETE)
CREATE POLICY "Allow public deletes to ADVANTA-BUCKET" 
ON storage.objects
FOR DELETE 
USING (bucket_id = 'ADVANTA-BUCKET');

-- Verificar que las políticas se crearon correctamente
SELECT * FROM pg_policies WHERE tablename = 'objects' AND policyname LIKE '%ADVANTA%';
