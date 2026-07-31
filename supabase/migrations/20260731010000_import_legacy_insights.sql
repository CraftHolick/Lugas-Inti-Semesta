-- Migration: Import legacy insights
DO $$ 
DECLARE 
  admin_author_id UUID;
  type_id_mining UUID;
  type_id_regulasi UUID;
  type_id_artikel UUID;
  type_id_company UUID;
  article_uuid UUID;
BEGIN
  -- Get admin author
  SELECT id INTO admin_author_id FROM public.profiles WHERE role = 'admin' LIMIT 1;
  IF admin_author_id IS NULL THEN
    RAISE EXCEPTION 'No Admin profile found to assign as author.';
  END IF;

  -- Get types
  SELECT id INTO type_id_mining FROM public.article_types WHERE slug = 'mining-knowledge';
  SELECT id INTO type_id_regulasi FROM public.article_types WHERE slug = 'regulasi';
  SELECT id INTO type_id_artikel FROM public.article_types WHERE slug = 'artikel';
  SELECT id INTO type_id_company FROM public.article_types WHERE slug = 'company-update';


  -- Article: competent-person-indonesia-penting
  IF NOT EXISTS (SELECT 1 FROM public.article_translations WHERE locale = 'id' AND slug = 'competent-person-indonesia-penting') THEN
    article_uuid := gen_random_uuid();

    INSERT INTO public.articles (id, status, published_at, thumbnail_url, author_id, type_id, category_id, created_at, updated_at)
    VALUES (article_uuid, 'published', '2026-07-20 00:00:00+00', 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80', admin_author_id, type_id_mining, NULL, '2026-07-20 00:00:00+00', '2026-07-20 00:00:00+00');

    INSERT INTO public.article_translations (article_id, locale, title, slug, excerpt, content_json)
    VALUES (article_uuid, 'id', 'Apa itu Competent Person Indonesia (CPI) dan Kenapa Penting untuk Proyek Tambang Anda?', 'competent-person-indonesia-penting', 'Mengenal peran penting CPI dalam menjamin standar dan kualitas pelaporan sumber daya dan cadangan di industri pertambangan Indonesia.', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Competent Person Indonesia (CPI) adalah tenaga ahli profesional yang telah lulus kualifikasi dan bersertifikasi untuk melakukan estimasi, audit, dan pelaporan sumber daya serta cadangan mineral atau batubara di Indonesia. Kehadiran CPI menjamin bahwa pelaporan geologi perusahaan pertambangan memenuhi standar KCMI (Kode Komite Cadangan Mineral Indonesia) maupun standar internasional seperti JORC."}]}]}'::jsonb);
  ELSE
    RAISE NOTICE 'Skipping duplicate slug: competent-person-indonesia-penting';
  END IF;

  -- Article: standar-kcmi-jorc-estimasi
  IF NOT EXISTS (SELECT 1 FROM public.article_translations WHERE locale = 'id' AND slug = 'standar-kcmi-jorc-estimasi') THEN
    article_uuid := gen_random_uuid();

    INSERT INTO public.articles (id, status, published_at, thumbnail_url, author_id, type_id, category_id, created_at, updated_at)
    VALUES (article_uuid, 'published', '2026-07-15 00:00:00+00', 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80', admin_author_id, type_id_mining, NULL, '2026-07-15 00:00:00+00', '2026-07-15 00:00:00+00');

    INSERT INTO public.article_translations (article_id, locale, title, slug, excerpt, content_json)
    VALUES (article_uuid, 'id', 'Mengenal Standar KCMI/JORC dalam Estimasi Sumber Daya & Cadangan Batubara', 'standar-kcmi-jorc-estimasi', 'Penjelasan mendalam tentang standar pelaporan sumber daya dan cadangan menurut KCMI dan JORC.', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Kode KCMI dan JORC memberikan kerangka kerja standar untuk pengumpulan data, interpretasi geologi, klasifikasi sumber daya (tereka, tertunjuk, terukur), hingga konversi menjadi cadangan (terkira dan terbukti). Kepatuhan terhadap standar ini krusial bagi kepastian investasi dan kelayakan tambang."}]}]}'::jsonb);
  ELSE
    RAISE NOTICE 'Skipping duplicate slug: standar-kcmi-jorc-estimasi';
  END IF;

  -- Article: rkab-vs-e-rkab
  IF NOT EXISTS (SELECT 1 FROM public.article_translations WHERE locale = 'id' AND slug = 'rkab-vs-e-rkab') THEN
    article_uuid := gen_random_uuid();

    INSERT INTO public.articles (id, status, published_at, thumbnail_url, author_id, type_id, category_id, created_at, updated_at)
    VALUES (article_uuid, 'published', '2026-07-10 00:00:00+00', 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80', admin_author_id, type_id_regulasi, NULL, '2026-07-10 00:00:00+00', '2026-07-10 00:00:00+00');

    INSERT INTO public.article_translations (article_id, locale, title, slug, excerpt, content_json)
    VALUES (article_uuid, 'id', 'RKAB vs E-RKAB: Apa yang Berubah dalam Proses Perizinan Tambang?', 'rkab-vs-e-rkab', 'Perbandingan dan panduan mengenai transisi dari RKAB konvensional menuju E-RKAB di sektor pertambangan.', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Rencana Kerja dan Anggaran Biaya (RKAB) merupakan dokumen wajib bagi setiap pemegang izin usaha pertambangan (IUP/IUPK). Dengan penerapan E-RKAB oleh Kementerian ESDM, proses pengajuan kini menjadi lebih terdigitalisasi, transparan, dan memerlukan kesiapan data teknis serta finansial yang sangat akurat."}]}]}'::jsonb);
  ELSE
    RAISE NOTICE 'Skipping duplicate slug: rkab-vs-e-rkab';
  END IF;

  -- Article: tahapan-penyusunan-amdal
  IF NOT EXISTS (SELECT 1 FROM public.article_translations WHERE locale = 'id' AND slug = 'tahapan-penyusunan-amdal') THEN
    article_uuid := gen_random_uuid();

    INSERT INTO public.articles (id, status, published_at, thumbnail_url, author_id, type_id, category_id, created_at, updated_at)
    VALUES (article_uuid, 'published', '2026-07-05 00:00:00+00', 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80', admin_author_id, type_id_artikel, NULL, '2026-07-05 00:00:00+00', '2026-07-05 00:00:00+00');

    INSERT INTO public.article_translations (article_id, locale, title, slug, excerpt, content_json)
    VALUES (article_uuid, 'id', 'Tahapan Penyusunan AMDAL untuk Proyek Pertambangan Batubara', 'tahapan-penyusunan-amdal', 'Langkah-langkah krusial dalam mempersiapkan dokumen AMDAL yang sesuai dengan regulasi pemerintah.', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Analisis Mengenai Dampak Lingkungan (AMDAL) di industri batubara mencakup tahapan penapisan, kerangka acuan (KA-ANDAL), analisis dampak (ANDAL), serta Rencana Pengelolaan dan Pemantauan Lingkungan (RKL-RPL). Pendampingan konsultan yang berpengalaman memastikan kelancaran persetujuan lingkungan."}]}]}'::jsonb);
  ELSE
    RAISE NOTICE 'Skipping duplicate slug: tahapan-penyusunan-amdal';
  END IF;

  -- Article: kajian-hidrogeologi-tambang-bawah-tanah
  IF NOT EXISTS (SELECT 1 FROM public.article_translations WHERE locale = 'id' AND slug = 'kajian-hidrogeologi-tambang-bawah-tanah') THEN
    article_uuid := gen_random_uuid();

    INSERT INTO public.articles (id, status, published_at, thumbnail_url, author_id, type_id, category_id, created_at, updated_at)
    VALUES (article_uuid, 'published', '2026-06-30 00:00:00+00', 'https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?w=800&q=80', admin_author_id, type_id_mining, NULL, '2026-06-30 00:00:00+00', '2026-06-30 00:00:00+00');

    INSERT INTO public.article_translations (article_id, locale, title, slug, excerpt, content_json)
    VALUES (article_uuid, 'id', 'Kenapa Kajian Hidrogeologi (Slug Test) Krusial untuk Tambang Bawah Tanah?', 'kajian-hidrogeologi-tambang-bawah-tanah', 'Mengapa pengukuran parameter akuifer dan kajian air tanah sangat vital dalam mencegah risiko tambang bawah tanah.', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Pada tambang bawah tanah (underground mining), risiko inrupsi air atau kebanjiran (mine inundation) merupakan salah satu bahaya terbesar. Pengujian seperti Slug Test dan Pumping Test membantu memetakan konduktivitas hidrolik akuifer sehingga sistem penirisan (dewatering) dapat dirancang dengan tepat."}]}]}'::jsonb);
  ELSE
    RAISE NOTICE 'Skipping duplicate slug: kajian-hidrogeologi-tambang-bawah-tanah';
  END IF;

  -- Article: luise-ekspansi-operasi-kalimantan-timur
  IF NOT EXISTS (SELECT 1 FROM public.article_translations WHERE locale = 'id' AND slug = 'luise-ekspansi-operasi-kalimantan-timur') THEN
    article_uuid := gen_random_uuid();

    INSERT INTO public.articles (id, status, published_at, thumbnail_url, author_id, type_id, category_id, created_at, updated_at)
    VALUES (article_uuid, 'published', '2026-07-25 00:00:00+00', 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80', admin_author_id, type_id_company, NULL, '2026-07-25 00:00:00+00', '2026-07-25 00:00:00+00');

    INSERT INTO public.article_translations (article_id, locale, title, slug, excerpt, content_json)
    VALUES (article_uuid, 'id', 'LUISE Memperluas Operasi Pengawasan Geoteknik & Eksplorasi di Kalimantan Timur', 'luise-ekspansi-operasi-kalimantan-timur', 'PT Lugas Inti Semesta (LUISE) mengumumkan peningkatan kapasitas operasional dan armada teknis lapangan di Kalimantan Timur.', '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Dalam rangka memenuhi permintaan layanan konsultasi pertambangan batubara dan pengawasan geoteknik yang terus meningkat di wilayah Kalimantan Timur, PT Lugas Inti Semesta (LUISE) secara resmi memperluas jangkauan tim teknis lapangan. Langkah strategis ini mempercepat mobilitas tenaga ahli ke area pertambangan klien serta meningkatkan akurasi analisis data langsung dari lapangan."}]}]}'::jsonb);
  ELSE
    RAISE NOTICE 'Skipping duplicate slug: luise-ekspansi-operasi-kalimantan-timur';
  END IF;

END $$;
