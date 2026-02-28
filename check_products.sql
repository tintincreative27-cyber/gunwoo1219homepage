-- ============================
--  products 테이블 데이터 확인
-- ============================

-- products 테이블의 모든 데이터 조회
SELECT 
  id, 
  name, 
  category, 
  price,
  code
FROM public.products
ORDER BY category, id;

-- 카테고리별 상품 개수
SELECT 
  category,
  COUNT(*) as count
FROM public.products
GROUP BY category
ORDER BY category;

-- 전체 상품 개수
SELECT COUNT(*) as total_count FROM public.products;

