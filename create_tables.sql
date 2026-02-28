-- ============================
--  필요한 테이블 생성 SQL
-- ============================

-- 기존 테이블이 있으면 삭제 (주의: 데이터가 모두 삭제됩니다!)
-- drop table if exists public.chat_sessions cascade;
-- drop table if exists public.chat_messages cascade;
-- drop table if exists public.orders cascade;
-- drop table if exists public.customers cascade;

-- 1. customers 테이블 (고객 정보)
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  name text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. orders 테이블 (주문 정보)
-- 기존 테이블이 있으면 컬럼 추가 시도
do $$
begin
  -- orders 테이블이 없으면 생성
  if not exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'orders') then
    create table public.orders (
      id uuid primary key default gen_random_uuid(),
      customer_name text not null,
      customer_email text not null,
      product_id text not null,
      product_name text not null,
      quantity integer not null,
      total_price numeric not null,
      status text not null default 'pending',
      created_at timestamptz default now(),
      updated_at timestamptz default now()
    );
  else
    -- orders 테이블이 있으면 필요한 컬럼 추가
    if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'orders' and column_name = 'customer_email') then
      alter table public.orders add column customer_email text;
    end if;
    if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'orders' and column_name = 'customer_name') then
      alter table public.orders add column customer_name text;
    end if;
    if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'orders' and column_name = 'product_id') then
      alter table public.orders add column product_id text;
    end if;
    if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'orders' and column_name = 'product_name') then
      alter table public.orders add column product_name text;
    end if;
    if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'orders' and column_name = 'quantity') then
      alter table public.orders add column quantity integer;
    end if;
    if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'orders' and column_name = 'total_price') then
      alter table public.orders add column total_price numeric;
    end if;
    if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'orders' and column_name = 'status') then
      alter table public.orders add column status text default 'pending';
    end if;
    if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'orders' and column_name = 'created_at') then
      alter table public.orders add column created_at timestamptz default now();
    end if;
    if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'orders' and column_name = 'updated_at') then
      alter table public.orders add column updated_at timestamptz default now();
    end if;
  end if;
end $$;

-- 3. chat_messages 테이블 (채팅 내역 저장)
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_email text,
  session_id text not null,
  role text not null, -- 'user' or 'assistant'
  content text not null,
  created_at timestamptz default now()
);

-- chat_messages에 검색/추천 결과 카드 복원용 컬럼 추가 (기존 DB 호환)
do $$
begin
  if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'chat_messages' and column_name = 'search_results') then
    alter table public.chat_messages add column search_results jsonb;
  end if;
  if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'chat_messages' and column_name = 'recommendation_title') then
    alter table public.chat_messages add column recommendation_title text;
  end if;
end $$;

-- 4. chat_sessions 테이블 (채팅 세션 관리)
create table if not exists public.chat_sessions (
  id uuid primary key default gen_random_uuid(),
  user_email text,
  session_id text not null unique,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================
--  인덱스 생성 (성능 향상)
-- ============================

-- customers 테이블 인덱스
create index if not exists idx_customers_email on public.customers(email);

-- orders 테이블 인덱스 (컬럼이 존재할 때만 생성)
do $$
begin
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'orders' and column_name = 'customer_email') then
    create index if not exists idx_orders_customer_email on public.orders(customer_email);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'orders' and column_name = 'created_at') then
    create index if not exists idx_orders_created_at on public.orders(created_at);
  end if;
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'orders' and column_name = 'status') then
    create index if not exists idx_orders_status on public.orders(status);
  end if;
end $$;

-- chat_messages 테이블 인덱스
create index if not exists idx_chat_messages_session_id on public.chat_messages(session_id);
create index if not exists idx_chat_messages_user_email on public.chat_messages(user_email);
create index if not exists idx_chat_messages_created_at on public.chat_messages(created_at);

-- chat_sessions 테이블 인덱스
create index if not exists idx_chat_sessions_user_email on public.chat_sessions(user_email);
create index if not exists idx_chat_sessions_session_id on public.chat_sessions(session_id);

-- ============================
--  RLS(행 수준 보안) 설정
-- ============================

-- 개발용: RLS를 비활성화하거나 정책을 매우 관대하게 설정
-- products 테이블이 있으면 RLS 활성화 (없으면 무시)
do $$
begin
  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'products') then
    -- RLS 활성화
    alter table public.products enable row level security;
    -- 또는 개발용으로 RLS 비활성화 (아래 주석 해제)
    -- alter table public.products disable row level security;
  end if;
end $$;

-- 개발용: RLS를 완전히 비활성화하려면 아래 주석을 해제하고 위의 enable을 주석 처리
-- alter table public.customers disable row level security;
-- alter table public.orders disable row level security;
-- alter table public.chat_messages disable row level security;
-- alter table public.chat_sessions disable row level security;

-- RLS 활성화
alter table public.customers enable row level security;
alter table public.orders enable row level security;
alter table public.chat_messages enable row level security;
alter table public.chat_sessions enable row level security;

-- ============================
--  개발용 접근 정책 (원하면 사용)
--  실제 운영 시에는 권한을 더 제한해야 합니다.
-- ============================

-- products 테이블 정책 (테이블이 존재할 때만)
do $$
begin
  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'products') then
    -- 기존 정책 모두 삭제
    drop policy if exists "Allow anon read products" on public.products;
    drop policy if exists "Allow anon insert products" on public.products;
    drop policy if exists "Allow anon update products" on public.products;
    drop policy if exists "Allow anon all products" on public.products;
    
    -- 모든 작업 허용 (개발용)
    execute 'create policy "Allow anon all products" on public.products for all to anon using (true) with check (true)';
  end if;
end $$;

-- customers 테이블 정책
-- 기존 정책이 있으면 삭제 후 재생성
drop policy if exists "Allow anon read customers" on public.customers;
drop policy if exists "Allow anon insert customers" on public.customers;
drop policy if exists "Allow anon update customers" on public.customers;

create policy "Allow anon read customers"
  on public.customers
  for select
  to anon
  using (true);

create policy "Allow anon insert customers"
  on public.customers
  for insert
  to anon
  with check (true);

create policy "Allow anon update customers"
  on public.customers
  for update
  to anon
  using (true)
  with check (true);

-- orders 테이블 정책
-- 기존 정책이 있으면 삭제 후 재생성
drop policy if exists "Allow anon read orders" on public.orders;
drop policy if exists "Allow anon insert orders" on public.orders;
drop policy if exists "Allow anon update orders" on public.orders;

create policy "Allow anon read orders"
  on public.orders
  for select
  to anon
  using (true);

create policy "Allow anon insert orders"
  on public.orders
  for insert
  to anon
  with check (true);

create policy "Allow anon update orders"
  on public.orders
  for update
  to anon
  using (true)
  with check (true);

-- chat_messages 테이블 정책
-- 기존 정책이 있으면 삭제 후 재생성
drop policy if exists "Allow anon read chat_messages" on public.chat_messages;
drop policy if exists "Allow anon insert chat_messages" on public.chat_messages;
drop policy if exists "Allow anon update chat_messages" on public.chat_messages;
drop policy if exists "Allow anon all chat_messages" on public.chat_messages;

-- 모든 작업 허용 (개발용)
create policy "Allow anon all chat_messages"
  on public.chat_messages
  for all
  to anon
  using (true)
  with check (true);

-- chat_sessions 테이블 정책
-- 기존 정책이 있으면 삭제 후 재생성
drop policy if exists "Allow anon read chat_sessions" on public.chat_sessions;
drop policy if exists "Allow anon insert chat_sessions" on public.chat_sessions;
drop policy if exists "Allow anon update chat_sessions" on public.chat_sessions;
drop policy if exists "Allow anon upsert chat_sessions" on public.chat_sessions;
drop policy if exists "Allow anon all chat_sessions" on public.chat_sessions;

-- 모든 작업 허용 (개발용)
create policy "Allow anon all chat_sessions"
  on public.chat_sessions
  for all
  to anon
  using (true)
  with check (true);

