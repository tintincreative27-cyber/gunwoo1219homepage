-- ============================
--  products 테이블만 RLS 비활성화
-- ============================

-- products 테이블 RLS 비활성화 (간단한 버전)
alter table public.products disable row level security;

