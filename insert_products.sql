-- ============================
--  홈페이지 상품 정보를 products 테이블에 INSERT
--  (한국어, 영어만 포함)
-- ============================

-- 기존 데이터 삭제 (선택사항 - 필요시 주석 해제)
-- DELETE FROM public.products;

-- 상품 1: L-02 Integrated C-UAS Vehicle System
INSERT INTO public.products (
  id, code, name, category, description, full_description, price, image_url, specs, options, translations
) VALUES (
  '1',
  'L-02',
  'Integrated C-UAS Vehicle System',
  'Land',
  'Counter-drone system with jamming and hard-kill capabilities (laser/net) for base protection.',
  'The L-02 Integrated Counter-Unmanned Aircraft System (C-UAS) represents the pinnacle of mobile base defense technology. This vehicle-mounted platform combines advanced radar detection, RF jamming capabilities, and kinetic interceptors to neutralize hostile drone threats at ranges up to 10km. The system features real-time threat assessment AI, automatic target tracking, and seamless integration with existing base defense networks.',
  4850000,
  '/src/assets/products/l-02-cuas.jpg',
  ARRAY['Detection Range: 15km', 'Engagement Range: 10km', 'Simultaneous Tracks: 200+', 'Reaction Time: <2 seconds', '360° Coverage'],
  '[
    {"id": "l02-opt1", "nameKo": "EO/IR 고해상도 카메라", "nameEn": "EO/IR High-Resolution Camera", "price": 580000},
    {"id": "l02-opt2", "nameKo": "안티-드론 전용 기관포", "nameEn": "Anti-Drone Dedicated Machine Gun", "price": 720000},
    {"id": "l02-opt3", "nameKo": "GNSS 스푸핑", "nameEn": "GNSS Spoofing", "price": 350000},
    {"id": "l02-opt4", "nameKo": "차량용 원격 무장 스테이션", "nameEn": "Vehicle Remote Weapon Station", "price": 680000},
    {"id": "l02-opt5", "nameKo": "고효율 액체 냉각 유닛", "nameEn": "High-Efficiency Liquid Cooling Unit", "price": 220000},
    {"id": "l02-opt6", "nameKo": "다중 대역 레이더 소프트웨어 업데이트", "nameEn": "Multi-Band Radar Software Update", "price": 480000},
    {"id": "l02-opt7", "nameKo": "제빙 히팅 엘리먼트", "nameEn": "De-Icing Heating Element", "price": 150000}
  ]'::jsonb,
  '{
    "name": {"en": "Integrated C-UAS Vehicle System", "ko": "통합 대드론 차량 시스템"},
    "description": {"en": "Counter-drone system with jamming and hard-kill capabilities (laser/net) for base protection.", "ko": "기지 방어를 위한 전파 교란 및 하드킬 능력(레이저/그물)을 갖춘 대드론 시스템."},
    "fullDescription": {"en": "The L-02 Integrated Counter-Unmanned Aircraft System (C-UAS) represents the pinnacle of mobile base defense technology. This vehicle-mounted platform combines advanced radar detection, RF jamming capabilities, and kinetic interceptors to neutralize hostile drone threats at ranges up to 10km. The system features real-time threat assessment AI, automatic target tracking, and seamless integration with existing base defense networks.", "ko": "L-02 통합 대무인항공기 시스템(C-UAS)은 이동식 기지 방어 기술의 정점을 나타냅니다. 이 차량 탑재 플랫폼은 고급 레이더 탐지, RF 전파 교란 능력, 운동 에너지 요격기를 결합하여 최대 10km 범위에서 적대적인 드론 위협을 무력화합니다. 이 시스템은 실시간 위협 평가 AI, 자동 표적 추적, 기존 기지 방어 네트워크와의 원활한 통합을 특징으로 합니다."}
  }'::jsonb
);

-- 상품 2: L-04 Tactical AI C2 Platform
INSERT INTO public.products (
  id, code, name, category, description, full_description, price, image_url, specs, options, translations
) VALUES (
  '2',
  'L-04',
  'Tactical AI C2 Platform',
  'Land',
  'Real-time battlefield analysis software with tactical data link integration for optimal deployment.',
  'The L-04 Tactical AI Command & Control Platform revolutionizes battlefield decision-making through advanced machine learning algorithms and multi-domain data fusion. This software suite processes intelligence from ground sensors, aerial assets, and satellite feeds to provide commanders with actionable insights in real-time. Features include predictive threat modeling, automated resource allocation, and secure coalition data sharing.',
  12500000,
  '/src/assets/products/l-04-c2.jpg',
  ARRAY['Processing: 10M data points/sec', 'AI Decision Latency: <50ms', 'Data Links: Link-16, JREAP, VMF', 'Classification: TS/SCI Compatible', 'Coalition Interoperability'],
  '[
    {"id": "l04-opt1", "nameKo": "Edge AI 하드웨어 가속기", "nameEn": "Edge AI Hardware Accelerator", "price": 1850000},
    {"id": "l04-opt2", "nameKo": "OSINT 통합 엔진", "nameEn": "OSINT Integration Engine", "price": 980000},
    {"id": "l04-opt3", "nameKo": "디지털 트윈 시뮬레이터", "nameEn": "Digital Twin Simulator", "price": 1250000},
    {"id": "l04-opt4", "nameKo": "고효율 액체 냉각 유닛", "nameEn": "High-Efficiency Liquid Cooling Unit", "price": 320000},
    {"id": "l04-opt5", "nameKo": "모바일 메쉬 네트워크 노드", "nameEn": "Mobile Mesh Network Node", "price": 750000}
  ]'::jsonb,
  '{
    "name": {"en": "Tactical AI C2 Platform", "ko": "전술 AI 지휘통제 플랫폼"},
    "description": {"en": "Real-time battlefield analysis software with tactical data link integration for optimal deployment.", "ko": "최적 배치를 위한 전술 데이터 링크 통합이 가능한 실시간 전장 분석 소프트웨어."},
    "fullDescription": {"en": "The L-04 Tactical AI Command & Control Platform revolutionizes battlefield decision-making through advanced machine learning algorithms and multi-domain data fusion. This software suite processes intelligence from ground sensors, aerial assets, and satellite feeds to provide commanders with actionable insights in real-time. Features include predictive threat modeling, automated resource allocation, and secure coalition data sharing.", "ko": "L-04 전술 AI 지휘통제 플랫폼은 고급 머신러닝 알고리즘과 다영역 데이터 융합을 통해 전장 의사결정을 혁신합니다. 이 소프트웨어 제품군은 지상 센서, 공중 자산, 위성 피드의 정보를 처리하여 지휘관에게 실시간으로 실행 가능한 통찰력을 제공합니다. 예측 위협 모델링, 자동화된 자원 할당, 안전한 연합 데이터 공유 기능을 포함합니다."}
  }'::jsonb
);

-- 상품 3: N-01 Long-Range Naval Air Search Radar
INSERT INTO public.products (
  id, code, name, category, description, full_description, price, image_url, specs, options, translations
) VALUES (
  '3',
  'N-01',
  'Long-Range Naval Air Search Radar',
  'Sea',
  'S-Band/X-Band integrated radar to supplement Aegis-class destroyers for fleet air defense.',
  'The N-01 Long-Range Naval Air Search Radar system delivers unprecedented situational awareness for surface combatants. This dual-band (S/X) phased array radar integrates seamlessly with Aegis Combat System architecture, extending detection ranges against low-observable threats and hypersonic missiles. Advanced ECCM capabilities ensure reliable tracking in contested electromagnetic environments.',
  78000000,
  '/src/assets/products/n-01-radar.jpg',
  ARRAY['Detection Range: 400+ km', 'Track Capacity: 1000+ targets', 'Bands: S-Band + X-Band', 'ECCM: Advanced Suite', 'Aegis Integration Ready'],
  '[
    {"id": "n01-opt1", "nameKo": "PCL 센서", "nameEn": "PCL Sensor", "price": 8500000},
    {"id": "n01-opt2", "nameKo": "극초음속 표적 추적 알고리즘", "nameEn": "Hypersonic Target Tracking Algorithm", "price": 12800000},
    {"id": "n01-opt3", "nameKo": "CBM+상태 기반 정비 시스템", "nameEn": "CBM+ Condition-Based Maintenance System", "price": 4200000},
    {"id": "n01-opt4", "nameKo": "부식 방지 특수 코팅", "nameEn": "Anti-Corrosion Special Coating", "price": 2800000},
    {"id": "n01-opt5", "nameKo": "제빙 히팅 엘리먼트", "nameEn": "De-Icing Heating Element", "price": 950000}
  ]'::jsonb,
  '{
    "name": {"en": "Long-Range Naval Air Search Radar", "ko": "장거리 해군 대공 탐색 레이더"},
    "description": {"en": "S-Band/X-Band integrated radar to supplement Aegis-class destroyers for fleet air defense.", "ko": "함대 대공 방어를 위한 이지스급 구축함 보완용 S밴드/X밴드 통합 레이더."},
    "fullDescription": {"en": "The N-01 Long-Range Naval Air Search Radar system delivers unprecedented situational awareness for surface combatants. This dual-band (S/X) phased array radar integrates seamlessly with Aegis Combat System architecture, extending detection ranges against low-observable threats and hypersonic missiles. Advanced ECCM capabilities ensure reliable tracking in contested electromagnetic environments.", "ko": "N-01 장거리 해군 대공 탐색 레이더 시스템은 수상 전투함에 전례 없는 상황 인식을 제공합니다. 이 이중 대역(S/X) 위상 배열 레이더는 이지스 전투 시스템 아키텍처와 원활하게 통합되어 저피탐 위협과 극초음속 미사일에 대한 탐지 범위를 확장합니다. 고급 ECCM 기능은 경쟁이 치열한 전자기 환경에서 안정적인 추적을 보장합니다."}
  }'::jsonb
);

-- 상품 4: A-01 5th Gen AESA Radar Module
INSERT INTO public.products (
  id, code, name, category, description, full_description, price, image_url, specs, options, translations
) VALUES (
  '4',
  'A-01',
  '5th Gen AESA Radar Module',
  'Air',
  'Active Electronically Scanned Array transceiver module to upgrade detection ranges of fighters like F-16.',
  'The A-01 5th Generation AESA Radar Module delivers transformational air-to-air and air-to-ground sensing capabilities for legacy 4th generation fighter platforms. This drop-in upgrade features 1,200+ T/R modules with GaN technology, providing 40% greater detection range and simultaneous multi-function operation. Fully compatible with F-16, F-15, and F/A-18 aircraft.',
  8750000,
  '/src/assets/products/a-01-aesa.jpg',
  ARRAY['T/R Modules: 1,200+', 'Technology: GaN', 'Range Improvement: +40%', 'Modes: SAR, GMTI, A2A, A2G', 'Weight: 165 kg'],
  '[
    {"id": "a01-opt1", "nameKo": "EA 소프트웨어 패키지", "nameEn": "EA Software Package", "price": 780000},
    {"id": "a01-opt2", "nameKo": "LPI 모드 강화", "nameEn": "LPI Mode Enhancement", "price": 920000},
    {"id": "a01-opt3", "nameKo": "초고해상도 SAR 이미지 생성기", "nameEn": "Ultra-High Resolution SAR Image Generator", "price": 1350000},
    {"id": "a01-opt4", "nameKo": "먼지 흡입 방지 필터 및 강화 실링", "nameEn": "Dust Ingestion Prevention Filter & Enhanced Sealing", "price": 180000},
    {"id": "a01-opt5", "nameKo": "GMTI 강화 모드", "nameEn": "GMTI Enhancement Mode", "price": 680000}
  ]'::jsonb,
  '{
    "name": {"en": "5th Gen AESA Radar Module", "ko": "5세대 AESA 레이더 모듈"},
    "description": {"en": "Active Electronically Scanned Array transceiver module to upgrade detection ranges of fighters like F-16.", "ko": "F-16과 같은 전투기의 탐지 범위를 업그레이드하기 위한 능동 전자 주사 배열 송수신 모듈."},
    "fullDescription": {"en": "The A-01 5th Generation AESA Radar Module delivers transformational air-to-air and air-to-ground sensing capabilities for legacy 4th generation fighter platforms. This drop-in upgrade features 1,200+ T/R modules with GaN technology, providing 40% greater detection range and simultaneous multi-function operation. Fully compatible with F-16, F-15, and F/A-18 aircraft.", "ko": "A-01 5세대 AESA 레이더 모듈은 기존 4세대 전투기 플랫폼에 혁신적인 공대공 및 공대지 감지 능력을 제공합니다. 이 드롭인 업그레이드는 GaN 기술을 사용한 1,200개 이상의 T/R 모듈을 갖추고 있으며, 40% 더 큰 탐지 범위와 동시 다기능 작동을 제공합니다. F-16, F-15, F/A-18 항공기와 완전히 호환됩니다."}
  }'::jsonb
);

-- 상품 5: A-03 Advanced Integrated EW Pod
INSERT INTO public.products (
  id, code, name, category, description, full_description, price, image_url, specs, options, translations
) VALUES (
  '5',
  'A-03',
  'Advanced Integrated EW Pod',
  'Air',
  'Electronic Warfare pod to neutralize enemy radar/comms and ensure aircraft survivability.',
  'The A-03 Advanced Integrated Electronic Warfare Pod represents next-generation aircraft self-protection technology. Combining wide-band digital receivers, cognitive jamming algorithms, and fiber-optic towed decoys, this system provides comprehensive protection against modern integrated air defense systems. The AI-driven threat response system automatically selects optimal countermeasure techniques.',
  6200000,
  '/src/assets/products/a-03-ew.jpg',
  ARRAY['Frequency Coverage: 0.5-40 GHz', 'Jamming Modes: 16 simultaneous', 'AI Threat Response: <10ms', 'Decoy: Fiber-Optic Towed', 'Compatible: NATO fighters'],
  '[
    {"id": "a03-opt1", "nameKo": "Cognitive Jamming", "nameEn": "Cognitive Jamming", "price": 850000},
    {"id": "a03-opt2", "nameKo": "멀티-플랫폼 협동 EW", "nameEn": "Multi-Platform Cooperative EW", "price": 620000},
    {"id": "a03-opt3", "nameKo": "소형 소모형 재머 발사기", "nameEn": "Small Expendable Jammer Launcher", "price": 480000},
    {"id": "a03-opt4", "nameKo": "먼지 흡입 방지 필터 및 강화 실링", "nameEn": "Dust Ingestion Prevention Filter & Enhanced Sealing", "price": 150000},
    {"id": "a03-opt5", "nameKo": "지형 추적(Terrain Following) 연동 기능", "nameEn": "Terrain Following Integration", "price": 390000}
  ]'::jsonb,
  '{
    "name": {"en": "Advanced Integrated EW Pod", "ko": "고급 통합 전자전 포드"},
    "description": {"en": "Electronic Warfare pod to neutralize enemy radar/comms and ensure aircraft survivability.", "ko": "적 레이더/통신을 무력화하고 항공기 생존성을 보장하는 전자전 포드."},
    "fullDescription": {"en": "The A-03 Advanced Integrated Electronic Warfare Pod represents next-generation aircraft self-protection technology. Combining wide-band digital receivers, cognitive jamming algorithms, and fiber-optic towed decoys, this system provides comprehensive protection against modern integrated air defense systems. The AI-driven threat response system automatically selects optimal countermeasure techniques.", "ko": "A-03 고급 통합 전자전 포드는 차세대 항공기 자체 보호 기술을 나타냅니다. 광대역 디지털 수신기, 인지형 재밍 알고리즘, 광섬유 예인 디코이를 결합하여 현대 통합 방공 시스템에 대한 포괄적인 보호를 제공합니다. AI 기반 위협 대응 시스템이 자동으로 최적의 대응 기술을 선택합니다."}
  }'::jsonb
);

-- 상품 6: A-04 Next-Gen HMD System
INSERT INTO public.products (
  id, code, name, category, description, full_description, price, image_url, specs, options, translations
) VALUES (
  '6',
  'A-04',
  'Next-Gen HMD System',
  'Air',
  'High-res Helmet Mounted Display overlaying flight and target data for enhanced pilot situational awareness.',
  'The A-04 Next-Generation Helmet Mounted Display System delivers unparalleled situational awareness to combat pilots. Featuring 4K resolution micro-displays, eye-tracking weapons cueing, night vision integration, and augmented reality overlays, this system enables pilots to engage targets simply by looking at them. Advanced head tracking provides seamless transition between cockpit displays and external visuals.',
  920000,
  '/src/assets/products/a-04-hmd.jpg',
  ARRAY['Resolution: 4K per eye', 'FOV: 100° x 40°', 'Head Tracking: Sub-milliradian', 'Night Vision: Integrated', 'Weight: 1.8 kg'],
  '[
    {"id": "a04-opt1", "nameKo": "Pilot Vital Sensing", "nameEn": "Pilot Vital Sensing", "price": 120000},
    {"id": "a04-opt2", "nameKo": "AI 가상 윙맨 인터페이스", "nameEn": "AI Virtual Wingman Interface", "price": 180000},
    {"id": "a04-opt3", "nameKo": "3D 입체 음향 경고 시스템", "nameEn": "3D Spatial Audio Warning System", "price": 95000},
    {"id": "a04-opt4", "nameKo": "안티-포그 및 항균 패드", "nameEn": "Anti-Fog & Antibacterial Pad", "price": 28000},
    {"id": "a04-opt5", "nameKo": "저온 특화 배터리 팩", "nameEn": "Low-Temperature Specialized Battery Pack", "price": 65000}
  ]'::jsonb,
  '{
    "name": {"en": "Next-Gen HMD System", "ko": "차세대 HMD 시스템"},
    "description": {"en": "High-res Helmet Mounted Display overlaying flight and target data for enhanced pilot situational awareness.", "ko": "조종사의 상황 인식 향상을 위한 비행 및 표적 데이터를 오버레이하는 고해상도 헬멧 장착 디스플레이."},
    "fullDescription": {"en": "The A-04 Next-Generation Helmet Mounted Display System delivers unparalleled situational awareness to combat pilots. Featuring 4K resolution micro-displays, eye-tracking weapons cueing, night vision integration, and augmented reality overlays, this system enables pilots to engage targets simply by looking at them. Advanced head tracking provides seamless transition between cockpit displays and external visuals.", "ko": "A-04 차세대 헬멧 장착 디스플레이 시스템은 전투 조종사에게 비교할 수 없는 상황 인식을 제공합니다. 4K 해상도 마이크로 디스플레이, 시선 추적 무기 큐잉, 야간 투시경 통합, 증강 현실 오버레이를 갖추고 있어 조종사가 단순히 목표물을 바라보는 것만으로도 교전할 수 있습니다. 고급 헤드 트래킹은 조종석 디스플레이와 외부 시야 간의 원활한 전환을 제공합니다."}
  }'::jsonb
);

