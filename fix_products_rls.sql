-- ============================
--  products 테이블 RLS 정책 수정 (간단한 버전)
-- ============================

-- 기존 정책 모두 삭제
drop policy if exists "Allow anon read products" on public.products;
drop policy if exists "Allow anon insert products" on public.products;
drop policy if exists "Allow anon update products" on public.products;
drop policy if exists "Allow anon all products" on public.products;

-- RLS 활성화 확인
alter table public.products enable row level security;

-- 모든 작업 허용 (개발용)
create policy "Allow anon all products" on public.products for all to anon using (true) with check (true);

