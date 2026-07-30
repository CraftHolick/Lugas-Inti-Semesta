export interface Insight {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  titleId: string;
  titleEn: string;
  category: string;
  date: string;
  excerptId: string;
  excerptEn: string;
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
    category: "Mining Knowledge",
    date: "2026-07-20",
    excerptId: "Mengenal peran penting CPI dalam menjamin standar dan kualitas pelaporan sumber daya dan cadangan di industri pertambangan Indonesia.",
    excerptEn: "Understanding the crucial role of CPI in ensuring standard and quality resource and reserve reporting in Indonesia's mining industry.",
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
    category: "Mining Knowledge",
    date: "2026-07-15",
    excerptId: "Penjelasan mendalam tentang standar pelaporan sumber daya dan cadangan menurut KCMI dan JORC.",
    excerptEn: "In-depth explanation of resource and reserve reporting standards according to KCMI and JORC.",
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
    category: "Regulasi",
    date: "2026-07-10",
    excerptId: "Perbandingan dan panduan mengenai transisi dari RKAB konvensional menuju E-RKAB di sektor pertambangan.",
    excerptEn: "Comparison and guide on the transition from conventional RKAB to E-RKAB in the mining sector.",
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
    category: "Artikel",
    date: "2026-07-05",
    excerptId: "Langkah-langkah krusial dalam mempersiapkan dokumen AMDAL yang sesuai dengan regulasi pemerintah.",
    excerptEn: "Crucial steps in preparing AMDAL documents that comply with government regulations.",
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
    category: "Mining Knowledge",
    date: "2026-06-30",
    excerptId: "Mengapa pengukuran parameter akuifer dan kajian air tanah sangat vital dalam mencegah risiko tambang bawah tanah.",
    excerptEn: "Why measuring aquifer parameters and groundwater studies are vital in preventing underground mining risks.",
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
    category: "Company Update",
    date: "2026-07-25",
    excerptId: "PT Lugas Inti Semesta (LUISE) mengumumkan peningkatan kapasitas operasional dan armada teknis lapangan di Kalimantan Timur.",
    excerptEn: "PT Lugas Inti Semesta (LUISE) announces the enhancement of operational capacity and technical field fleet in East Kalimantan.",
    bodyPlaceholderId: "TODO: Detail ekspansi operasional LUISE di Kalimantan Timur.",
    bodyPlaceholderEn: "TODO: LUISE operational expansion details in East Kalimantan.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
  }
];
