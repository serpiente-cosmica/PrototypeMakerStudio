-- Database Schema for Demo Customizer
-- Execute this script in your Supabase Dashboard > SQL Editor
-- This will create all necessary tables for the application

-- 1. Create app_approaches table
CREATE TABLE IF NOT EXISTS public.app_approaches (
  approach_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  screen_list_json JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create app_screens table
CREATE TABLE IF NOT EXISTS public.app_screens (
  screen_id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create approach_screens junction table
CREATE TABLE IF NOT EXISTS public.approach_screens (
  approach_id UUID NOT NULL REFERENCES public.app_approaches(approach_id) ON DELETE CASCADE,
  screen_id VARCHAR(255) NOT NULL REFERENCES public.app_screens(screen_id) ON DELETE CASCADE,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (approach_id, screen_id)
);

-- 4. Create client_configs table
CREATE TABLE IF NOT EXISTS public.client_configs (
  client_id VARCHAR(255) PRIMARY KEY,
  app_name VARCHAR(255) NOT NULL,
  approach_id UUID REFERENCES public.app_approaches(approach_id) ON DELETE SET NULL,
  logo_url TEXT,
  colors_json JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Create client_screen_configs table
CREATE TABLE IF NOT EXISTS public.client_screen_configs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id VARCHAR(255) NOT NULL REFERENCES public.client_configs(client_id) ON DELETE CASCADE,
  screen_id VARCHAR(255) NOT NULL REFERENCES public.app_screens(screen_id) ON DELETE CASCADE,
  settings_json JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(client_id, screen_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_approach_screens_approach_id ON public.approach_screens(approach_id);
CREATE INDEX IF NOT EXISTS idx_approach_screens_screen_id ON public.approach_screens(screen_id);
CREATE INDEX IF NOT EXISTS idx_client_configs_approach_id ON public.client_configs(approach_id);
CREATE INDEX IF NOT EXISTS idx_client_screen_configs_client_id ON public.client_screen_configs(client_id);
CREATE INDEX IF NOT EXISTS idx_client_screen_configs_screen_id ON public.client_screen_configs(screen_id);

-- Add comments to tables for documentation
COMMENT ON TABLE public.app_approaches IS 'Stores different app approaches/templates (e.g., ActiveFit+, Foodbox, PlanetPay)';
COMMENT ON TABLE public.app_screens IS 'Stores available screen types that can be used in approaches';
COMMENT ON TABLE public.approach_screens IS 'Junction table linking approaches to their screens with ordering';
COMMENT ON TABLE public.client_configs IS 'Stores client-specific configurations including branding and colors';
COMMENT ON TABLE public.client_screen_configs IS 'Stores screen-specific settings for each client';

-- Verify tables were created
SELECT 
  table_name,
  table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('app_approaches', 'app_screens', 'approach_screens', 'client_configs', 'client_screen_configs')
ORDER BY table_name;


