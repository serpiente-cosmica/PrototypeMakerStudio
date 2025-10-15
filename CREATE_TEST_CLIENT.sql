-- CREATE A TEST CLIENT
-- Run this in Supabase to create a working test client

-- Insert test client
INSERT INTO client_configs (client_id, app_name, approach_id, logo_url, colors_json)
VALUES (
  'test-client-001',
  'Test Healthcare App',
  '550e8400-e29b-41d4-a716-446655440001'::uuid,
  'https://via.placeholder.com/150',
  '{"primary": "#1e5a8e", "secondary": "#4a90e2", "background": "#ffffff"}'::jsonb
)
ON CONFLICT (client_id) DO UPDATE
SET 
  app_name = EXCLUDED.app_name,
  approach_id = EXCLUDED.approach_id,
  updated_at = NOW();

-- Verify it was created
SELECT 
  client_id,
  app_name,
  approach_id,
  'Client created successfully!' as status
FROM client_configs
WHERE client_id = 'test-client-001';

