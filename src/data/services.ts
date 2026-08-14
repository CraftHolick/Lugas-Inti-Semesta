export interface DetailedScope {
  title: string;
  description: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  
  // existing translation fields
  titleId: string;
  titleEn: string;
  titleZh: string;
  descriptionId: string;
  descriptionEn: string;
  descriptionZh: string;
  
  icon: string; // lucide icon name
  scopeOfWork: string[];
  scopeOfWorkId?: string[];
  scopeOfWorkEn?: string[];
  scopeOfWorkZh?: string[];
  caseStudyIds: string[];

  // Extended SEO & Detailed Content (ID)
  seoTitleId?: string;
  metaDescId?: string;
  h1Id?: string;
  introTextId?: string[];
  detailedScopesId?: DetailedScope[];
  deliverablesId?: string[];
  primaryCtaId?: string;
  secondaryCtaId?: string;

  // Extended SEO & Detailed Content (EN)
  seoTitleEn?: string;
  metaDescEn?: string;
  h1En?: string;
  introTextEn?: string[];
  detailedScopesEn?: DetailedScope[];
  deliverablesEn?: string[];
  primaryCtaEn?: string;
  secondaryCtaEn?: string;

  // Extended SEO & Detailed Content (ZH)
  seoTitleZh?: string;
  metaDescZh?: string;
  h1Zh?: string;
  introTextZh?: string[];
  detailedScopesZh?: DetailedScope[];
  deliverablesZh?: string[];
  primaryCtaZh?: string;
  secondaryCtaZh?: string;

  relatedServices?: string[];
  coverImage?: string;
}

export const services: ServiceItem[] = [
  {
    id: "service-1",
    slug: "konsultasi-geologi",
    title: "Konsultasi Geologi",
    description: "Perencanaan eksplorasi, pemetaan geologi, topografi, geofisika, pemboran, hingga perhitungan sumber daya dan cadangan berstandar SNI dan KCMI.",
    titleId: "Konsultasi Geologi",
    titleEn: "Geological Consulting",
    titleZh: "地质咨询",
    descriptionId: "Perencanaan eksplorasi, pemetaan geologi, topografi, geofisika, pemboran, hingga perhitungan sumber daya dan cadangan berstandar SNI dan KCMI.",
    descriptionEn: "Exploration planning, geological mapping, topography, geophysics, to resource estimation & audit with KCMI/JORC standards.",
    descriptionZh: "勘探规划、地质测绘、地形、地球物理，直至符合KCMI/JORC标准的资源估算和审计。",
    icon: "Mountain",
    scopeOfWork: [
      "Perencanaan eksplorasi / Exploration planning",
      "Pemetaan geologi / Geological mapping",
      "Topografi dan geofisika / Topography and geophysics",
      "Estimasi sumber daya & cadangan (KCMI/JORC) / Resource & reserve estimation (KCMI/JORC)",
    ],
    scopeOfWorkId: [
      "Perencanaan eksplorasi",
      "Pemetaan geologi",
      "Topografi dan geofisika",
      "Estimasi sumber daya & cadangan (KCMI/JORC)"
    ],
    scopeOfWorkEn: [
      "Exploration planning",
      "Geological mapping",
      "Topography and geophysics",
      "Resource & reserve estimation (KCMI/JORC)"
    ],
    scopeOfWorkZh: [
      "勘探规划",
      "地质测绘",
      "地形与地球物理",
      "资源与储量估算 (KCMI/JORC)"
    ],
    caseStudyIds: ["proj-1", "proj-6"],
    relatedServices: ["geoteknik-hidrologi-hidrogeologi", "konsultasi-pertambangan"],

    // --- SEO Extended ID ---
    seoTitleId: "Jasa Konsultasi Geologi dan Eksplorasi Tambang | PT LIS",
    metaDescId: "Jasa konsultasi geologi untuk pemetaan, pemboran eksplorasi, geophysical logging, wellsite, topografi, dan evaluasi sumber daya tambang.",
    h1Id: "Jasa Konsultasi Geologi dan Eksplorasi Pertambangan",
    introTextId: [
      "Data geologi yang akurat menjadi dasar penting dalam menentukan potensi, risiko, serta arah pengembangan suatu wilayah pertambangan.",
      "PT Lugas Inti Semesta menyediakan layanan konsultasi geologi dan eksplorasi untuk membantu perusahaan mengumpulkan, memverifikasi, dan menganalisis data teknis pada proyek mineral maupun batubara."
    ],
    detailedScopesId: [
      { title: "Perencanaan Eksplorasi", description: "Penyusunan tahapan dan kebutuhan kegiatan eksplorasi berdasarkan tujuan proyek, kondisi wilayah, data awal, serta target informasi yang ingin diperoleh." },
      { title: "Pemetaan Geologi Permukaan", description: "Observasi singkapan, pencatatan litologi, struktur geologi, serta kondisi lapangan untuk memperoleh gambaran awal mengenai karakteristik wilayah proyek." },
      { title: "Pemetaan Topografi dan UAV Drone", description: "Pengumpulan data topografi dan dokumentasi udara untuk mendukung pemetaan wilayah, perencanaan titik kegiatan, serta pengembangan basis data spasial proyek." },
      { title: "Survei dan Pengukuran Geofisika", description: "Pengumpulan data geofisika untuk membantu mengidentifikasi kondisi bawah permukaan dan melengkapi interpretasi geologi." },
      { title: "Pemboran Eksplorasi dan Stratigrafi", description: "Pelaksanaan serta pengawasan kegiatan pemboran untuk memperoleh sampel, data litologi, ketebalan lapisan, struktur, dan informasi geologi bawah permukaan." },
      { title: "Wellsite dan Geophysical Logging", description: "Pengawasan kegiatan pemboran, deskripsi material inti, pencatatan data lapangan, serta pengukuran geophysical logging untuk mendukung validitas data eksplorasi." },
      { title: "Estimasi dan Tinjauan Sumber Daya dan Cadangan", description: "Pendampingan estimasi, audit, atau tinjauan sumber daya dan cadangan dengan mengacu pada kebutuhan proyek dan standar pelaporan yang disepakati, termasuk KCMI atau JORC apabila relevan dengan ruang lingkup pekerjaan." }
    ],
    deliverablesId: [
      "Data dan catatan kegiatan lapangan.",
      "Peta geologi dan topografi.",
      "Log pemboran dan deskripsi material inti.",
      "Data geophysical logging.",
      "Interpretasi kondisi geologi.",
      "Rekomendasi tahapan eksplorasi berikutnya.",
      "Laporan teknis eksplorasi.",
      "Evaluasi atau tinjauan sumber daya dan cadangan."
    ],
    primaryCtaId: "Diskusikan Kebutuhan Eksplorasi",
    secondaryCtaId: "Lihat Pengalaman Proyek",
    coverImage: "https://images.unsplash.com/photo-1601232193692-28a2a69a2d3f?auto=format&fit=crop&w=1600&q=85"
  },
  {
    id: "service-2",
    slug: "geoteknik-hidrologi-hidrogeologi",
    title: "Konsultasi Geoteknik, Hidrologi & Hidrogeologi",
    description: "Pengawasan pengeboran geoteknik, pumping test, slug test, hingga pengukuran debit sungai dan mata air.",
    titleId: "Konsultasi Geoteknik, Hidrologi & Hidrogeologi",
    titleEn: "Geotechnical, Hydrology & Hydrogeology",
    titleZh: "岩土工程、水文学和水文地质学",
    descriptionId: "Pengawasan pengeboran geoteknik, pumping test, slug test, hingga pengukuran debit sungai dan mata air.",
    descriptionEn: "Supervision of geotechnical drilling, pumping test, slug test, to river and spring discharge measurement.",
    descriptionZh: "岩土钻探监督、抽水试验、微水试验，直至河流和泉水流量测量。",
    icon: "Droplets",
    scopeOfWork: [
      "Pengawasan pengeboran geoteknik / Geotechnical drilling supervision",
      "Pumping test & Slug test",
      "Pengukuran debit sungai dan mata air / River and spring discharge measurement",
      "Analisis kestabilan lereng / Slope stability analysis",
    ],
    scopeOfWorkId: [
      "Pengawasan pengeboran geoteknik",
      "Pumping test & Slug test",
      "Pengukuran debit sungai dan mata air",
      "Analisis kestabilan lereng"
    ],
    scopeOfWorkEn: [
      "Geotechnical drilling supervision",
      "Pumping test & Slug test",
      "River and spring discharge measurement",
      "Slope stability analysis"
    ],
    scopeOfWorkZh: [
      "岩土钻探监督",
      "抽水试验与微水试验",
      "河流与泉水流量测量",
      "边坡稳定性分析"
    ],
    caseStudyIds: ["proj-2"],
    relatedServices: ["konsultasi-geologi", "lingkungan-sosial"],

    // --- SEO Extended ID ---
    seoTitleId: "Konsultan Geoteknik dan Hidrogeologi Tambang | PT LIS",
    metaDescId: "Layanan pemboran geoteknik, slug test, pumping test, pengukuran muka air tanah, debit sungai, sumur, dan mata air untuk proyek tambang.",
    h1Id: "Layanan Konsultasi Geoteknik, Hidrologi, dan Hidrogeologi Tambang",
    introTextId: [
      "Pemahaman terhadap kondisi batuan, tanah, air permukaan, dan air tanah diperlukan untuk mendukung keselamatan, perencanaan, dan pengendalian risiko dalam kegiatan pertambangan.",
      "PT Lugas Inti Semesta memberikan layanan investigasi geoteknik, hidrologi, dan hidrogeologi melalui kegiatan lapangan, pengawasan, pengukuran, pengujian, serta penyusunan data teknis sesuai kebutuhan proyek."
    ],
    detailedScopesId: [
      { title: "Pemboran Geoteknik", description: "Pelaksanaan dan pengawasan pemboran untuk memperoleh informasi mengenai kondisi material, litologi, karakteristik batuan, serta parameter yang dibutuhkan dalam kajian geoteknik." },
      { title: "Pengukuran Muka Air Tanah", description: "Pemantauan kondisi muka air tanah pada lubang bor atau titik pengamatan untuk memahami perubahan dan karakteristik sistem air tanah di wilayah proyek." },
      { title: "Slug Test", description: "Pengujian untuk memperoleh informasi mengenai respons air tanah dan karakteristik hidraulik pada titik pengamatan yang telah ditentukan." },
      { title: "Pumping Test", description: "Pengujian pemompaan untuk mengevaluasi respons akuifer, perubahan muka air tanah, serta parameter hidrogeologi yang dibutuhkan dalam perencanaan proyek." },
      { title: "Pengukuran Debit Air", description: "Pengukuran debit pada sungai, sumur, dan mata air untuk memperoleh data kondisi air permukaan maupun air tanah di sekitar wilayah pertambangan." },
      { title: "Pengawasan dan Dokumentasi Lapangan", description: "Pengawasan pekerjaan, pencatatan data, dokumentasi kegiatan, serta koordinasi teknis dengan pihak terkait selama pelaksanaan investigasi." }
    ],
    deliverablesId: [
      "Data pemboran dan log geoteknik.",
      "Data muka air tanah.",
      "Hasil slug test atau pumping test.",
      "Data debit sungai, sumur, dan mata air.",
      "Dokumentasi kegiatan lapangan.",
      "Interpretasi kondisi hidrologi dan hidrogeologi.",
      "Rekomendasi teknis sesuai ruang lingkup kajian.",
      "Laporan geoteknik, hidrologi, atau hidrogeologi."
    ],
    primaryCtaId: "Konsultasikan Kebutuhan Investigasi",
    secondaryCtaId: "Lihat Pengalaman Proyek",
    coverImage: "https://images.unsplash.com/photo-1752779645051-9dc6d555b435?auto=format&fit=crop&w=1600&q=85"
  },
  {
    id: "service-3b",
    slug: "konsultasi-pertambangan",
    title: "Konsultasi Pertambangan",
    description: "Pembuatan studi kelayakan (FS), penyusunan RKAB, desain dan layout tambang, serta manajemen operasional pertambangan.",
    titleId: "Konsultasi Pertambangan",
    titleEn: "Mining Consulting",
    titleZh: "采矿咨询",
    descriptionId: "Pembuatan studi kelayakan (FS), penyusunan RKAB, desain dan layout tambang, serta manajemen operasional pertambangan.",
    descriptionEn: "Feasibility study (FS), RKAB preparation, coal reserve evaluation, to geological modeling and mine design.",
    descriptionZh: "可行性研究（FS）、年度工作计划与预算（RKAB）编制、煤炭储量评估，直至地质建模与矿山设计。",
    icon: "Compass",
    scopeOfWork: [
      "Studi kelayakan (FS) / Feasibility study (FS)",
      "Penyusunan RKAB / RKAB preparation",
      "Evaluasi cadangan batubara / Coal reserve evaluation",
      "Desain & pemodelan tambang / Mine design & modeling",
    ],
    scopeOfWorkId: [
      "Studi kelayakan (FS)",
      "Penyusunan RKAB",
      "Evaluasi cadangan batubara",
      "Desain & pemodelan tambang"
    ],
    scopeOfWorkEn: [
      "Feasibility study (FS)",
      "RKAB preparation",
      "Coal reserve evaluation",
      "Mine design & modeling"
    ],
    scopeOfWorkZh: [
      "可行性研究 (FS)",
      "年度工作计划与预算 (RKAB) 编制",
      "煤炭储量综合评估",
      "矿山优化设计与建模"
    ],
    caseStudyIds: ["proj-5"],
    relatedServices: ["konsultasi-geologi", "lingkungan-sosial"],

    // --- SEO Extended ID ---
    seoTitleId: "Konsultan Pertambangan, RKAB dan Studi Kelayakan | PT LIS",
    metaDescId: "Jasa penyusunan studi kelayakan, RKAB, E-RKAB, manajemen tambang, dan pemasangan tanda batas WIUP untuk perusahaan pertambangan.",
    h1Id: "Layanan Konsultasi dan Manajemen Pertambangan",
    introTextId: [
      "Perencanaan dan pelaksanaan kegiatan pertambangan membutuhkan keterpaduan antara data teknis, target operasional, kondisi lapangan, serta kebutuhan dokumentasi perusahaan.",
      "PT Lugas Inti Semesta menyediakan pendampingan konsultasi pertambangan untuk membantu perusahaan menyusun rencana kerja, mengevaluasi kelayakan proyek, menjalankan manajemen tambang, dan memenuhi kebutuhan teknis kegiatan operasional."
    ],
    detailedScopesId: [
      { title: "Penyusunan Studi Kelayakan", description: "Pendampingan penyusunan dokumen studi kelayakan berdasarkan data geologi, sumber daya dan cadangan, rencana penambangan, kebutuhan operasional, lingkungan, serta aspek pendukung lainnya sesuai ruang lingkup proyek." },
      { title: "Penyusunan RKAB dan E-RKAB", description: "Pendampingan pengumpulan data, penyusunan, pemeriksaan, dan perbaikan dokumen Rencana Kerja dan Anggaran Biaya berdasarkan kebutuhan perusahaan dan periode kegiatan yang diajukan." },
      { title: "Manajemen Tambang", description: "Pendampingan dalam perencanaan, koordinasi, pengawasan, dan evaluasi kegiatan tambang untuk mendukung pencapaian target operasional perusahaan." },
      { title: "Pemasangan Tanda Batas WIUP", description: "Pelaksanaan koordinasi, stake out, konstruksi, pemasangan, dan dokumentasi tanda batas Wilayah Izin Usaha Pertambangan sesuai ruang lingkup pekerjaan." }
    ],
    deliverablesId: [
      "Dokumen studi kelayakan.",
      "Dokumen RKAB atau E-RKAB.",
      "Hasil evaluasi dan rekomendasi teknis.",
      "Laporan kegiatan manajemen tambang.",
      "Data dan dokumentasi pemasangan batas WIUP.",
      "Pendampingan pembahasan dan penyempurnaan dokumen."
    ],
    primaryCtaId: "Minta Proposal Teknis",
    secondaryCtaId: "Lihat Pengalaman Proyek",
    coverImage: "https://images.unsplash.com/photo-1689585190694-7efb4032cc49?auto=format&fit=crop&w=1600&q=85"
  },
  {
    id: "service-3",
    slug: "lingkungan-sosial",
    title: "Konsultasi Lingkungan & Sosial",
    description: "Kajian RIPPIM, Dokumen Rencana Reklamasi, Dokumen Pascatambang, AMDAL, serta RKL/RPL.",
    titleId: "Konsultasi Lingkungan & Sosial",
    titleEn: "Environmental & Social Consulting",
    titleZh: "环境与社会咨询",
    descriptionId: "Kajian RIPPIM, Dokumen Rencana Reklamasi, Dokumen Pascatambang, AMDAL, serta RKL/RPL.",
    descriptionEn: "Preparation of RIPPM, Reclamation Plan, Mine Closure Plan, AMDAL, RKL, and RPL.",
    descriptionZh: "编制RIPPM、复垦计划、矿山闭坑计划、AMDAL、RKL和RPL。",
    icon: "Leaf",
    scopeOfWork: [
      "Penyusunan RIPPM / Preparation of RIPPM",
      "Rencana Reklamasi & Pascatambang / Reclamation & Mine Closure Plan",
      "Penyusunan AMDAL, RKL, RPL / Preparation of AMDAL, RKL, RPL",
      "Pemetaan Sosial / Social Mapping",
    ],
    scopeOfWorkId: [
      "Penyusunan RIPPM",
      "Rencana Reklamasi & Pascatambang",
      "Penyusunan AMDAL, RKL, RPL",
      "Pemetaan Sosial"
    ],
    scopeOfWorkEn: [
      "Preparation of RIPPM",
      "Reclamation & Mine Closure Plan",
      "Preparation of AMDAL, RKL, RPL",
      "Social Mapping"
    ],
    scopeOfWorkZh: [
      "编制RIPPM (社区发展与赋能总体规划)",
      "复垦与矿山闭坑计划",
      "环境影响评价 (AMDAL, RKL, RPL) 编制",
      "社会普查与测绘"
    ],
    caseStudyIds: [],
    relatedServices: ["konsultasi-pertambangan", "geoteknik-hidrologi-hidrogeologi"],

    // --- SEO Extended ID ---
    seoTitleId: "Konsultan Lingkungan Pertambangan dan Reklamasi | PT LIS",
    metaDescId: "Jasa penyusunan AMDAL, RKL, RPL, RIPPM, rencana reklamasi, rencana pascatambang, pemetaan sosial, dan konsultasi publik pertambangan.",
    h1Id: "Layanan Konsultasi Lingkungan dan Sosial Pertambangan",
    introTextId: [
      "Pengelolaan lingkungan dan hubungan sosial merupakan bagian penting dari keberlanjutan kegiatan pertambangan sejak tahap perencanaan, operasional, reklamasi, hingga pascatambang.",
      "PT Lugas Inti Semesta membantu perusahaan dalam pengumpulan data, penyusunan kajian, penyiapan dokumen, serta pendampingan konsultasi lingkungan dan sosial sesuai kebutuhan proyek."
    ],
    detailedScopesId: [
      { title: "Rencana Induk Pengembangan dan Pemberdayaan Masyarakat", description: "Pendampingan penyusunan program pengembangan dan pemberdayaan masyarakat berdasarkan kondisi sosial, kebutuhan wilayah, potensi lokal, dan rencana kegiatan perusahaan." },
      { title: "Rencana Reklamasi", description: "Penyusunan rencana pelaksanaan reklamasi yang mencakup kondisi wilayah, tahapan kegiatan, penataan lahan, revegetasi, pemeliharaan, serta kebutuhan pendukung sesuai ruang lingkup pekerjaan." },
      { title: "Rencana Pascatambang", description: "Penyusunan rencana penanganan wilayah setelah kegiatan pertambangan berakhir, termasuk program lingkungan, sosial, pemanfaatan lahan, pemeliharaan, dan pemantauan." },
      { title: "AMDAL, RKL, dan RPL", description: "Pendampingan pengumpulan data, penyusunan kajian dampak, rencana pengelolaan lingkungan, dan rencana pemantauan lingkungan berdasarkan karakteristik kegiatan perusahaan." },
      { title: "Pemetaan Sosial", description: "Pengumpulan dan analisis informasi mengenai masyarakat, pemangku kepentingan, potensi wilayah, kebutuhan sosial, serta kondisi yang dapat memengaruhi pelaksanaan program perusahaan." },
      { title: "Konsultasi Publik", description: "Pendampingan penyiapan materi, dokumentasi, komunikasi, dan kegiatan konsultasi dengan pihak-pihak terkait sesuai kebutuhan proyek." }
    ],
    deliverablesId: [
      "Dokumen RIPPM atau RI PPM.",
      "Dokumen rencana reklamasi.",
      "Dokumen rencana pascatambang.",
      "Dokumen AMDAL, RKL, dan RPL.",
      "Hasil pemetaan sosial.",
      "Program pengembangan dan pemberdayaan masyarakat.",
      "Dokumentasi konsultasi publik.",
      "Rekomendasi pengelolaan lingkungan dan sosial."
    ],
    primaryCtaId: "Konsultasikan Kebutuhan Dokumen",
    secondaryCtaId: "Lihat Pengalaman Proyek",
    coverImage: "https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&w=1600&q=85"
  },
  
  // LEGACY SERVICES (Preserved as requested)
  {
    id: "service-5",
    slug: "mine-management",
    title: "Mine Management",
    description: "Manajemen operasional tambang komprehensif, pengawasan teknis harian, optimalisasi produksi, dan kontrol kualitas batubara.",
    titleId: "Mine Management",
    titleEn: "Mine Management",
    titleZh: "矿山管理",
    descriptionId: "Manajemen operasional tambang komprehensif, pengawasan teknis harian, optimalisasi produksi, dan kontrol kualitas batubara.",
    descriptionEn: "Comprehensive mine operational management, daily technical supervision, production optimization, and coal quality control.",
    descriptionZh: "全面矿山运营管理、日常技术监督、生产效益优化及煤炭质量控制（QC）。",
    icon: "Users",
    scopeOfWork: [
      "Manajemen operasional tambang / Mine operational management",
      "Pengawasan teknis harian / Daily technical supervision",
      "Optimalisasi produksi & efisiensi / Production optimization & efficiency",
      "Kontrol kualitas batubara (QC) / Coal quality control (QC)",
    ],
    scopeOfWorkId: [
      "Manajemen operasional tambang",
      "Pengawasan teknis harian",
      "Optimalisasi produksi & efisiensi",
      "Kontrol kualitas batubara (QC)"
    ],
    scopeOfWorkEn: [
      "Mine operational management",
      "Daily technical supervision",
      "Production optimization & efficiency",
      "Coal quality control (QC)"
    ],
    scopeOfWorkZh: [
      "全面矿山运营与监督管理",
      "现场日常技术与工程指导",
      "生产效能提升与成本优化",
      "煤炭全流程质量控制 (QC)"
    ],
    caseStudyIds: ["proj-5"],
    coverImage: "https://images.unsplash.com/photo-1628487749130-2d41acb1802a?auto=format&fit=crop&w=1600&q=85"
  },
  {
    id: "service-6",
    slug: "mine-contractor",
    title: "Mine Contractor",
    description: "Jasa pengupasan lapisan tanah penutup (OB removal), penambangan batubara (coal getting), pengangkutan (hauling), dan penyewaan alat berat.",
    titleId: "Mine Contractor",
    titleEn: "Mine Contractor Services",
    titleZh: "采矿工程承包",
    descriptionId: "Jasa pengupasan lapisan tanah penutup (OB removal), penambangan batubara (coal getting), pengangkutan (hauling), dan penyewaan alat berat.",
    descriptionEn: "Overburden removal (OB removal), coal getting, hauling, and heavy equipment rental services.",
    descriptionZh: "土石方及覆盖层剥离（OB removal）、煤炭开采（Coal getting）、运输及重型机械设备租赁服务。",
    icon: "Pickaxe",
    scopeOfWork: [
      "Pengupasan tanah penutup (OB removal) / Overburden removal",
      "Penambangan batubara (Coal getting)",
      "Pengangkutan batubara (Hauling)",
      "Pemasangan tanda batas WIUP / WIUP boundary marking installation",
    ],
    scopeOfWorkId: [
      "Pengupasan tanah penutup (OB removal)",
      "Penambangan batubara (Coal getting)",
      "Pengangkutan batubara (Hauling)",
      "Pemasangan tanda batas WIUP"
    ],
    scopeOfWorkEn: [
      "Overburden removal (OB removal)",
      "Coal getting operations",
      "Coal hauling services",
      "WIUP boundary marking installation"
    ],
    scopeOfWorkZh: [
      "覆盖层与土石方剥离工程 (OB removal)",
      "专业煤炭开采作业 (Coal getting)",
      "矿区及码头煤炭运输 (Hauling)",
      "WIUP 矿区边界标志测设与安装"
    ],
    caseStudyIds: ["proj-3", "proj-4"],
    coverImage: "https://images.unsplash.com/photo-1709489662983-3674d790b224?auto=format&fit=crop&w=1600&q=85"
  },
  {
    id: "service-4",
    slug: "konsultasi-kontraktor-pertambangan",
    title: "Konsultasi & Kontraktor Pertambangan",
    description: "Studi kelayakan (FS), RKAB, manajemen tambang, pemasangan tanda batas WIUP, hingga jasa kontraktor pertambangan.",
    titleId: "Konsultasi & Kontraktor Pertambangan",
    titleEn: "Mining Consulting & Contracting",
    titleZh: "采矿咨询与承包",
    descriptionId: "Studi kelayakan (FS), RKAB, manajemen tambang, pemasangan tanda batas WIUP, hingga jasa kontraktor pertambangan.",
    descriptionEn: "Feasibility study (FS), RKAB, mine management, WIUP boundary marking installation, to mining contractor services.",
    descriptionZh: "可行性研究（FS）、RKAB、矿山管理、WIUP边界标志安装，直至采矿承包商服务。",
    icon: "Pickaxe",
    scopeOfWork: [
      "Studi kelayakan (FS) / Feasibility study (FS)",
      "Penyusunan RKAB / RKAB preparation",
      "Manajemen operasional tambang / Mine operational management",
      "Jasa kontraktor pertambangan / Mining contractor services",
    ],
    scopeOfWorkId: [
      "Studi kelayakan (FS)",
      "Penyusunan RKAB",
      "Manajemen operasional tambang",
      "Jasa kontraktor pertambangan"
    ],
    scopeOfWorkEn: [
      "Feasibility study (FS)",
      "RKAB preparation",
      "Mine operational management",
      "Mining contractor services"
    ],
    scopeOfWorkZh: [
      "可行性研究 (FS)",
      "年度工作计划与预算 (RKAB) 编制",
      "矿山运营全面管理",
      "采矿工程承包商服务"
    ],
    caseStudyIds: ["proj-3", "proj-4", "proj-5"],
    coverImage: "https://images.unsplash.com/photo-1523848309072-c199db53f137?auto=format&fit=crop&w=1600&q=85"
  }
];
