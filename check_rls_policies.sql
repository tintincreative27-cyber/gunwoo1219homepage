-- ============================
--  products 테이블 RLS 정책 확인
-- ============================

-- 1. products 테이블 RLS 활성화 여부 확인
SELECT 
  schemaname,
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE schemaname = 'public' AND tablename = 'products';

-- 2. products 테이블의 모든 RLS 정책 확인
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'products';

-- 3. products 테이블 데이터 개수 (RLS 무시하고 직접 조회)
SET LOCAL row_security = off;
SELECT COUNT(*) as total_count FROM public.products;
RESET row_security;

-- 4. products 테이블의 모든 데이터 (RLS 무시하고 직접 조회)
SET LOCAL row_security = off;
SELECT id, name, category FROM public.products LIMIT 10;
RESET row_security;

