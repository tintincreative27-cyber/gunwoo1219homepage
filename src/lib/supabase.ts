import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wwprsxslvwmzqjoctsom.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3cHJzeHNsdndtenFqb2N0c29tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwMDQyNjAsImV4cCI6MjA4MzU4MDI2MH0.-pIpQ02rBwxYdrAs-EU0OKg5N9jl9sAFJKqZZ3HMnow';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// 연결 테스트 (개발용)
if (import.meta.env.DEV) {
  supabase
    .from('products')
    .select('id')
    .limit(1)
    .then(({ data, error }) => {
      if (error) {
        console.error('❌ Supabase 연결 실패:', error);
        console.error('URL:', supabaseUrl);
        console.error('에러 코드:', error.code);
        console.error('에러 메시지:', error.message);
      } else {
        console.log('✅ Supabase 연결 성공');
      }
    });
}

