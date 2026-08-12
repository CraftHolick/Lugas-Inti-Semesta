export interface Insight {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  titleId: string;
  titleEn: string;
  titleZh: string;
  category: string;
  date: string;
  excerptId: string;
  excerptEn: string;
  excerptZh: string;
  contentEn: string;
  contentZh: string;
  bodyPlaceholderId: string;
  bodyPlaceholderEn: string;
  image?: string;
}

const defaultInsightImage = "https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?w=800&q=80";

export const insights: Insight[] = [
  {
    id: "insight-1",
    slug: "competent-person-indonesia-penting",
    title: "Apa itu Competent Person Indonesia (CPI) dan Kenapa Penting untuk Proyek Tambang Anda?",
    excerpt: "Mengenal peran penting CPI dalam menjamin standar dan kualitas pelaporan sumber daya dan cadangan di industri pertambangan Indonesia.",
    content: "Competent Person Indonesia (CPI) adalah tenaga ahli profesional yang telah lulus kualifikasi dan bersertifikasi untuk melakukan estimasi, audit, dan pelaporan sumber daya serta cadangan mineral atau batubara di Indonesia. Kehadiran CPI menjamin bahwa pelaporan geologi perusahaan pertambangan memenuhi standar KCMI (Kode Komite Cadangan Mineral Indonesia) maupun standar internasional seperti JORC.",
    titleId: "Apa itu Competent Person Indonesia (CPI) dan Kenapa Penting untuk Proyek Tambang Anda?",
    titleEn: "What is Competent Person Indonesia (CPI) and Why is it Important for Your Mining Project?",
    titleZh: "什么是印度尼西亚合资格人士（CPI），为何对您的采矿项目至关重要？",
    category: "Mining Knowledge",
    date: "2026-07-20",
    excerptId: "Mengenal peran penting CPI dalam menjamin standar dan kualitas pelaporan sumber daya dan cadangan di industri pertambangan Indonesia.",
    excerptEn: "Understanding the crucial role of CPI in ensuring standard and quality resource and reserve reporting in Indonesia's mining industry.",
    excerptZh: "了解CPI在确保印度尼西亚矿业资源和储量报告标准与质量方面的关键作用。",
    contentEn: "Competent Person Indonesia (CPI) is a professional expert who has passed the qualifications and is certified to conduct estimation, audit, and reporting of mineral or coal resources and reserves in Indonesia. The presence of CPI ensures that the geological reporting of mining companies complies with KCMI (Indonesian Mineral Reserve Committee Code) standards as well as international standards such as JORC.",
    contentZh: "印度尼西亚合资格人士（CPI）是经过资质认证的专业人士，有权在印尼进行矿产或煤炭资源与储量的估算、审计和报告工作。CPI的存在确保采矿公司的地质报告符合KCMI（印尼矿产储量委员会规范）标准以及JORC等国际标准。",
    bodyPlaceholderId: "TODO: Isi artikel tentang Competent Person Indonesia (CPI).",
    bodyPlaceholderEn: "TODO: Article content about Competent Person Indonesia (CPI).",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
  },
  {
    id: "insight-2",
    slug: "standar-kcmi-jorc-estimasi",
    title: "Mengenal Standar KCMI/JORC dalam Estimasi Sumber Daya & Cadangan Batubara",
    excerpt: "Penjelasan mendalam tentang standar pelaporan sumber daya dan cadangan menurut KCMI dan JORC.",
    content: "Kode KCMI dan JORC memberikan kerangka kerja standar untuk pengumpulan data, interpretasi geologi, klasifikasi sumber daya (tereka, tertunjuk, terukur), hingga konversi menjadi cadangan (terkira dan terbukti). Kepatuhan terhadap standar ini krusial bagi kepastian investasi dan kelayakan tambang.",
    titleId: "Mengenal Standar KCMI/JORC dalam Estimasi Sumber Daya & Cadangan Batubara",
    titleEn: "Understanding KCMI/JORC Standards in Coal Resource & Reserve Estimation",
    titleZh: "了解KCMI/JORC标准在煤炭资源与储量估算中的应用",
    category: "Mining Knowledge",
    date: "2026-07-15",
    excerptId: "Penjelasan mendalam tentang standar pelaporan sumber daya dan cadangan menurut KCMI dan JORC.",
    excerptEn: "In-depth explanation of resource and reserve reporting standards according to KCMI and JORC.",
    excerptZh: "深入解析KCMI和JORC标准下的资源和储量报告规范。",
    contentEn: "The KCMI and JORC Codes provide a standard framework for data collection, geological interpretation, resource classification (inferred, indicated, measured), and conversion into reserves (probable and proved). Compliance with these standards is crucial for investment certainty and mine feasibility.",
    contentZh: "KCMI和JORC规范为数据收集、地质解释、资源分类（推断、控制、探明）以及转换为储量（可能和探明）提供了标准框架。遵守这些标准对于投资确定性和矿山可行性至关重要。",
    bodyPlaceholderId: "TODO: Isi artikel tentang standar KCMI dan JORC.",
    bodyPlaceholderEn: "TODO: Article content about KCMI and JORC standards.",
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80"
  },
  {
    id: "insight-3",
    slug: "rkab-vs-e-rkab",
    title: "RKAB vs E-RKAB: Apa yang Berubah dalam Proses Perizinan Tambang?",
    excerpt: "Perbandingan dan panduan mengenai transisi dari RKAB konvensional menuju E-RKAB di sektor pertambangan.",
    content: "Rencana Kerja dan Anggaran Biaya (RKAB) merupakan dokumen wajib bagi setiap pemegang izin usaha pertambangan (IUP/IUPK). Dengan penerapan E-RKAB oleh Kementerian ESDM, proses pengajuan kini menjadi lebih terdigitalisasi, transparan, dan memerlukan kesiapan data teknis serta finansial yang sangat akurat.",
    titleId: "RKAB vs E-RKAB: Apa yang Berubah dalam Proses Perizinan Tambang?",
    titleEn: "RKAB vs E-RKAB: What Has Changed in the Mining Licensing Process?",
    titleZh: "RKAB与E-RKAB：采矿许可流程发生了哪些变化？",
    category: "Regulasi",
    date: "2026-07-10",
    excerptId: "Perbandingan dan panduan mengenai transisi dari RKAB konvensional menuju E-RKAB di sektor pertambangan.",
    excerptEn: "Comparison and guide on the transition from conventional RKAB to E-RKAB in the mining sector.",
    excerptZh: "关于采矿业从传统RKAB过渡到E-RKAB的比较与指南。",
    contentEn: "The Work Plan and Budget (RKAB) is a mandatory document for every mining business license holder (IUP/IUPK). With the implementation of E-RKAB by the Ministry of Energy and Mineral Resources (ESDM), the submission process is now more digitalized, transparent, and requires highly accurate technical and financial data preparation.",
    contentZh: "工作计划与预算（RKAB）是每位采矿业务许可证持有人（IUP/IUPK）的必备文件。随着能源与矿产资源部（ESDM）推行E-RKAB，申报流程现已更加数字化、透明，并要求高度精准的技术与财务数据准备。",
    bodyPlaceholderId: "TODO: Isi artikel tentang perubahan proses RKAB dan E-RKAB.",
    bodyPlaceholderEn: "TODO: Article content about changes in the RKAB and E-RKAB process.",
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80"
  },
  {
    id: "insight-4",
    slug: "tahapan-penyusunan-amdal",
    title: "Tahapan Penyusunan AMDAL untuk Proyek Pertambangan Batubara",
    excerpt: "Langkah-langkah krusial dalam mempersiapkan dokumen AMDAL yang sesuai dengan regulasi pemerintah.",
    content: "Analisis Mengenai Dampak Lingkungan (AMDAL) di industri batubara mencakup tahapan penapisan, kerangka acuan (KA-ANDAL), analisis dampak (ANDAL), serta Rencana Pengelolaan dan Pemantauan Lingkungan (RKL-RPL). Pendampingan konsultan yang berpengalaman memastikan kelancaran persetujuan lingkungan.",
    titleId: "Tahapan Penyusunan AMDAL untuk Proyek Pertambangan Batubara",
    titleEn: "AMDAL Preparation Stages for Coal Mining Projects",
    titleZh: "煤矿开采项目环境影响评估（AMDAL）的编制阶段",
    category: "Artikel",
    date: "2026-07-05",
    excerptId: "Langkah-langkah krusial dalam mempersiapkan dokumen AMDAL yang sesuai dengan regulasi pemerintah.",
    excerptEn: "Crucial steps in preparing AMDAL documents that comply with government regulations.",
    excerptZh: "准备符合政府法规的环境影响评估（AMDAL）文件的关键步骤。",
    contentEn: "The Environmental Impact Assessment (AMDAL) in the coal industry covers the screening stage, terms of reference (KA-ANDAL), impact analysis (ANDAL), as well as Environmental Management and Monitoring Plans (RKL-RPL). Mentorship from experienced consultants ensures smooth environmental approval.",
    contentZh: "煤炭行业的环境影响评估（AMDAL）涵盖筛查阶段、职权范围（KA-ANDAL）、影响分析（ANDAL），以及环境管理与监测计划（RKL-RPL）。经验丰富的顾问指导可确保环境审批顺利进行。",
    bodyPlaceholderId: "TODO: Isi artikel mengenai tahapan penyusunan dokumen AMDAL.",
    bodyPlaceholderEn: "TODO: Article content about the stages of preparing AMDAL documents.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
  },
  {
    id: "insight-5",
    slug: "kajian-hidrogeologi-tambang-bawah-tanah",
    title: "Kenapa Kajian Hidrogeologi (Slug Test) Krusial untuk Tambang Bawah Tanah?",
    excerpt: "Mengapa pengukuran parameter akuifer dan kajian air tanah sangat vital dalam mencegah risiko tambang bawah tanah.",
    content: "Pada tambang bawah tanah (underground mining), risiko inrupsi air atau kebanjiran (mine inundation) merupakan salah satu bahaya terbesar. Pengujian seperti Slug Test dan Pumping Test membantu memetakan konduktivitas hidrolik akuifer sehingga sistem penirisan (dewatering) dapat dirancang dengan tepat.",
    titleId: "Kenapa Kajian Hidrogeologi (Slug Test) Krusial untuk Tambang Bawah Tanah?",
    titleEn: "Why is Hydrogeological Study (Slug Test) Crucial for Underground Mines?",
    titleZh: "为什么水文地质研究（微水试验）对地下矿山至关重要？",
    category: "Mining Knowledge",
    date: "2026-06-30",
    excerptId: "Mengapa pengukuran parameter akuifer dan kajian air tanah sangat vital dalam mencegah risiko tambang bawah tanah.",
    excerptEn: "Why measuring aquifer parameters and groundwater studies are vital in preventing underground mining risks.",
    excerptZh: "为什么含水层参数测量和地下水研究对于防止地下采矿风险至关重要。",
    contentEn: "In underground mining, the risk of water inrush or mine inundation is one of the greatest hazards. Tests such as the Slug Test and Pumping Test help map the hydraulic conductivity of aquifers so that the dewatering system can be appropriately designed.",
    contentZh: "在地下采矿中，突水或矿井淹没的风险是最大的危险之一。微水试验和抽水试验等测试有助于绘制含水层水力传导性图，从而合理设计排水系统。",
    bodyPlaceholderId: "TODO: Isi artikel mengenai kajian hidrogeologi dan slug test.",
    bodyPlaceholderEn: "TODO: Article content about hydrogeological studies and slug tests.",
    image: defaultInsightImage
  },
  {
    id: "insight-6",
    slug: "luise-ekspansi-operasi-kalimantan-timur",
    title: "LUISE Memperluas Operasi Pengawasan Geoteknik & Eksplorasi di Kalimantan Timur",
    excerpt: "PT Lugas Inti Semesta (LUISE) mengumumkan peningkatan kapasitas operasional dan armada teknis lapangan di Kalimantan Timur.",
    content: "Dalam rangka memenuhi permintaan layanan konsultasi pertambangan batubara dan pengawasan geoteknik yang terus meningkat di wilayah Kalimantan Timur, PT Lugas Inti Semesta (LUISE) secara resmi memperluas jangkauan tim teknis lapangan. Langkah strategis ini mempercepat mobilitas tenaga ahli ke area pertambangan klien serta meningkatkan akurasi analisis data langsung dari lapangan.",
    titleId: "LUISE Memperluas Operasi Pengawasan Geoteknik & Eksplorasi di Kalimantan Timur",
    titleEn: "LUISE Expands Geotechnical Supervision & Exploration Operations in East Kalimantan",
    titleZh: "LUISE扩大在东加里曼丹的岩土监督与勘探业务",
    category: "Company Update",
    date: "2026-07-25",
    excerptId: "PT Lugas Inti Semesta (LUISE) mengumumkan peningkatan kapasitas operasional dan armada teknis lapangan di Kalimantan Timur.",
    excerptEn: "PT Lugas Inti Semesta (LUISE) announces the enhancement of operational capacity and technical field fleet in East Kalimantan.",
    excerptZh: "PT Lugas Inti Semesta（LUISE）宣布增强在东加里曼丹的运营能力和技术现场团队。",
    contentEn: "In order to meet the growing demand for coal mining consulting and geotechnical supervision services in the East Kalimantan region, PT Lugas Inti Semesta (LUISE) is officially expanding the reach of its field technical team. This strategic move accelerates the mobility of experts to client mining areas and increases the accuracy of direct field data analysis.",
    contentZh: "为满足东加里曼丹地区对煤矿咨询和岩土监督服务日益增长的需求，PT Lugas Inti Semesta（LUISE）正式扩大其现场技术团队的覆盖范围。这一战略举措加速了专家向客户采矿区的调派，并提高了现场数据直接分析的准确性。",
    bodyPlaceholderId: "TODO: Detail ekspansi operasional LUISE di Kalimantan Timur.",
    bodyPlaceholderEn: "TODO: LUISE operational expansion details in East Kalimantan.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
  }
];
