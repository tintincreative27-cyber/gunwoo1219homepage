-- ============================
--  products 테이블에 stock 컬럼 추가
-- ============================

-- products 테이블이 있고 stock 컬럼이 없으면 추가
do $$
begin
  if exists (select 1 from information_schema.tables where table_schema = 'public' and table_name = 'products') then
    if not exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'products' and column_name = 'stock') then
      alter table public.products add column stock integer default 100;
      raise notice 'stock 컬럼이 추가되었습니다.';
    else
      raise notice 'stock 컬럼이 이미 존재합니다.';
    end if;
  else
    raise notice 'products 테이블이 존재하지 않습니다.';
  end if;
end $$;

