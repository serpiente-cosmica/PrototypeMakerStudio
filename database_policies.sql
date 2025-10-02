-- Políticas RLS para las tablas de la aplicación Demo Customizer
-- Ejecuta estos comandos en tu dashboard de Supabase > SQL Editor

-- 1. Habilitar RLS en todas las tablas
ALTER TABLE public.client_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_screen_configs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_approaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_screens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approach_screens ENABLE ROW LEVEL SECURITY;

-- 2. Políticas para client_configs
DROP POLICY IF EXISTS "Enable read access for all users" ON public.client_configs;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.client_configs;
DROP POLICY IF EXISTS "Enable update for all users" ON public.client_configs;

CREATE POLICY "Enable read access for all users" ON public.client_configs FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON public.client_configs FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.client_configs FOR UPDATE USING (true);

-- 3. Políticas para client_screen_configs
DROP POLICY IF EXISTS "Enable read access for all users" ON public.client_screen_configs;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.client_screen_configs;
DROP POLICY IF EXISTS "Enable update for all users" ON public.client_screen_configs;

CREATE POLICY "Enable read access for all users" ON public.client_screen_configs FOR SELECT USING (true);
CREATE POLICY "Enable insert for all users" ON public.client_screen_configs FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable update for all users" ON public.client_screen_configs FOR UPDATE USING (true);

-- 4. Políticas para app_approaches
DROP POLICY IF EXISTS "Enable read access for all users" ON public.app_approaches;
CREATE POLICY "Enable read access for all users" ON public.app_approaches FOR SELECT USING (true);

-- 5. Políticas para app_screens
DROP POLICY IF EXISTS "Enable read access for all users" ON public.app_screens;
CREATE POLICY "Enable read access for all users" ON public.app_screens FOR SELECT USING (true);

-- 6. Políticas para approach_screens
DROP POLICY IF EXISTS "Enable read access for all users" ON public.approach_screens;
CREATE POLICY "Enable read access for all users" ON public.approach_screens FOR SELECT USING (true);

-- Verificar que las políticas se crearon correctamente
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('client_configs', 'client_screen_configs', 'app_approaches', 'app_screens', 'approach_screens')
ORDER BY tablename, policyname;
