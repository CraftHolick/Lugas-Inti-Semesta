export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  description: string;
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
}

export const services: ServiceItem[] = [
  {
    id: "service-1",
    slug: "konsultasi-geologi",
    title: "Konsultasi Geologi",
    description: "Perencanaan eksplorasi, pemetaan geologi, topografi, geofisika, hingga estimasi & audit sumber daya standar KCMI/JORC.",
    titleId: "Konsultasi Geologi",
    titleEn: "Geological Consulting",
    titleZh: "地质咨询",
    descriptionId: "Perencanaan eksplorasi, pemetaan geologi, topografi, geofisika, hingga estimasi & audit sumber daya standar KCMI/JORC.",
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
  },
  {
    id: "service-3",
    slug: "lingkungan-sosial",
    title: "Konsultasi Lingkungan & Sosial",
    description: "Penyusunan RIPPM, Rencana Reklamasi, Rencana Pascatambang, AMDAL, RKL, dan RPL.",
    titleId: "Konsultasi Lingkungan & Sosial",
    titleEn: "Environmental & Social Consulting",
    titleZh: "环境与社会咨询",
    descriptionId: "Penyusunan RIPPM, Rencana Reklamasi, Rencana Pascatambang, AMDAL, RKL, dan RPL.",
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
  },
  {
    id: "service-3b",
    slug: "konsultasi-pertambangan",
    title: "Konsultasi Pertambangan",
    description: "Studi kelayakan (FS), penyusunan RKAB, evaluasi cadangan batubara, hingga pemodelan geologi dan desain tambang.",
    titleId: "Konsultasi Pertambangan",
    titleEn: "Mining Consulting",
    titleZh: "采矿咨询",
    descriptionId: "Studi kelayakan (FS), penyusunan RKAB, evaluasi cadangan batubara, hingga pemodelan geologi dan desain tambang.",
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
  },
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
  }
];
