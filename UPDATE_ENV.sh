#!/bin/bash
# Update .env.local with correct Supabase credentials

cat > "/Users/cosmicmacbookpro/Documents/Prototype Maker+/AdvantaCustomPrototypes/.env.local" << 'EOF'
# Supabase Configuration - CORRECT PROJECT

NEXT_PUBLIC_SUPABASE_URL=https://zpybskouzotcqfzjofx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpweWJza291em90Y3FmempvZmp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk5NzAyOTIsImV4cCI6MjA3NTU0NjI5Mn0.Mr5PMvsdN3tSzc7UMCMavdVO89J3zRxK7e8ssc8zcls
EOF

echo ".env.local updated successfully!"

