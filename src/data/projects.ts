export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  client: string;
  scopeId: string;
  scopeEn: string;
  scopeZh?: string;
  scope?: string;
  province: string;
  provinceEn?: string;
  provinceZh?: string;
  location: string;
  locationEn?: string;
  locationZh?: string;
  year: string | number;
  status: 'selesai' | 'berjalan';
  category: string;
  lat: number;
  lng: number;
  featured: boolean;
  image?: string;
  gallery?: string[];
}

// TODO: update with precise coordinates and real images for each project. Currently using province centroids and Unsplash placeholders.
const defaultImage = "https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?auto=format&fit=crop&q=80&w=800";

export const projects: Project[] = [
  {
    id: "proj-1",
    slug: "proj-1-htm",
    title: "PT Harfa Taruna Mandiri (joint ZIEC Co Ltd)",
    description: "Pemboran Eksplorasi & Geoteknik Tambang Bawah Permukaan 'Cooking Coal'",
    client: "PT Harfa Taruna Mandiri (joint ZIEC Co Ltd)",
    scopeId: "Pemboran Eksplorasi & Geoteknik Tambang Bawah Permukaan 'Cooking Coal'",
    scopeEn: "Exploration Drilling & Geotechnical for Underground Mine 'Coking Coal'",
    scopeZh: "地下炼焦煤矿勘探钻探与岩土工程评估",
    scope: "Pemboran Eksplorasi & Geoteknik Tambang Bawah Permukaan",
    province: "Kalimantan Tengah",
    provinceEn: "Central Kalimantan",
    provinceZh: "中加里曼丹省",
    location: "Barito Utara",
    locationEn: "North Barito",
    locationZh: "北巴里托县",
    year: "2023",
    status: "selesai",
    category: "konsultasi-geologi",
    lat: -1.6815,
    lng: 113.3824,
    featured: true,
    image: "https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?auto=format&fit=crop&q=80&w=800",
    gallery: [
      "https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80"
    ]
  },
  {
    id: "proj-2",
    slug: "proj-2-jhonlin",
    title: "PT Jhonlin Baratama",
    description: "Kajian Hidrogeologi Slug Test Site CV Selagai Jaya",
    client: "PT Jhonlin Baratama",
    scopeId: "Kajian Hidrogeologi Slug Test Site CV Selagai Jaya",
    scopeEn: "Hydrogeological Study Slug Test Site CV Selagai Jaya",
    scopeZh: "CV Selagai Jaya 矿区水文地质微型抽水测试研究",
    scope: "Kajian Hidrogeologi Slug Test",
    province: "Kalimantan Selatan",
    provinceEn: "South Kalimantan",
    provinceZh: "南加里曼丹省",
    location: "Tanah Bumbu",
    locationEn: "Tanah Bumbu",
    locationZh: "塔纳本布县",
    year: "2023-2024",
    status: "selesai",
    category: "geoteknik-hidrologi-hidrogeologi",
    lat: -3.0926,
    lng: 115.2838,
    featured: true,
    image: "https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?w=800&q=80",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
    ]
  },
  {
    id: "proj-3",
    slug: "proj-3-transcoal",
    title: "PT Transcoal Minergy (CNGR Material)",
    description: "Verifikasi Sumberdaya & Studi Kelayakan Tambang Bawah Tanah",
    client: "PT Transcoal Minergy (CNGR Material)",
    scopeId: "Verifikasi Sumberdaya & Studi Kelayakan Tambang Bawah Tanah",
    scopeEn: "Resource Verification & Underground Mine Feasibility Study",
    scopeZh: "矿产资源核实与地下采矿可行性研究",
    scope: "Verifikasi Sumberdaya & Studi Kelayakan",
    province: "Kalimantan Selatan",
    provinceEn: "South Kalimantan",
    provinceZh: "南加里曼丹省",
    location: "Kalimantan Selatan",
    locationEn: "South Kalimantan",
    locationZh: "南加里曼丹省",
    year: "2021 & 2025",
    status: "selesai",
    category: "mine-contractor",
    lat: -3.0926,
    lng: 115.2838,
    featured: true,
    image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80"
    ]
  },
  {
    id: "proj-4",
    slug: "proj-4-graha-equity",
    title: "PT Graha Equity Investment",
    description: "Manajemen Tambang Zirkon",
    client: "PT Graha Equity Investment",
    scopeId: "Manajemen Tambang Zirkon",
    scopeEn: "Zircon Mine Management",
    scopeZh: "锆石矿山运营与管理",
    scope: "Manajemen Tambang Zirkon",
    province: "Kalimantan Tengah",
    provinceEn: "Central Kalimantan",
    provinceZh: "中加里曼丹省",
    location: "Kapuas",
    locationEn: "Kapuas",
    locationZh: "卡普阿斯县",
    year: "2022-2024",
    status: "selesai",
    category: "mine-management",
    lat: -1.6815,
    lng: 113.3824,
    featured: true,
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&q=80",
    gallery: []
  },
  {
    id: "proj-5",
    slug: "proj-5-murung-raya",
    title: "PT Murung Raya Coal",
    description: "Manajemen Tambang Batubara",
    client: "PT Murung Raya Coal",
    scopeId: "Manajemen Tambang Batubara",
    scopeEn: "Coal Mine Management",
    scopeZh: "煤矿全面管理与承包运营",
    scope: "Manajemen Tambang Batubara",
    province: "Kalimantan Tengah",
    provinceEn: "Central Kalimantan",
    provinceZh: "中加里曼丹省",
    location: "Murung Raya",
    locationEn: "Murung Raya",
    locationZh: "穆龙拉亚县",
    year: "2024",
    status: "berjalan",
    category: "konsultasi-pertambangan",
    lat: -1.6815,
    lng: 113.3824,
    featured: true,
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
    gallery: []
  },
  {
    id: "proj-6",
    slug: "proj-6-jati-kreasi",
    title: "PT Jati Kreasi Nusantara",
    description: "Pendampingan Pemetaan Prospeksi Nikel Laterite",
    client: "PT Jati Kreasi Nusantara",
    scopeId: "Pendampingan Pemetaan Prospeksi Nikel Laterite",
    scopeEn: "Laterite Nickel Prospecting Mapping Assistance",
    scopeZh: "红土镍矿地质普查与勘探测绘指导",
    scope: "Pemetaan Prospeksi Nikel Laterite",
    province: "Sulawesi Tengah",
    provinceEn: "Central Sulawesi",
    provinceZh: "中苏拉威西省",
    location: "Morowali",
    locationEn: "Morowali",
    locationZh: "莫罗瓦利县",
    year: "2024",
    status: "selesai",
    category: "konsultasi-geologi",
    lat: -1.4300,
    lng: 121.4456,
    featured: true,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    gallery: []
  },
  // 19+ more projects with placeholder data
  ...Array.from({ length: 19 }).map((_, i) => ({
    id: `proj-placeholder-${i + 7}`,
    slug: `proj-placeholder-${i + 7}`,
    title: `Client Placeholder ${i + 7}`,
    description: `Cakupan Kerja Placeholder ${i + 7} untuk evaluasi dan konsultasi pertambangan.`,
    client: `Client Placeholder ${i + 7}`,
    scopeId: `Cakupan Kerja Placeholder ${i + 7}`,
    scopeEn: `Scope Placeholder ${i + 7}`,
    scopeZh: `勘探与咨询工作范围示例 ${i + 7}`,
    scope: `Cakupan Kerja ${i + 7}`,
    province: ["Kalimantan Timur", "Kalimantan Utara", "Bengkulu", "Sumatera Selatan", "Nusa Tenggara Timur"][i % 5],
    provinceEn: ["East Kalimantan", "North Kalimantan", "Bengkulu", "South Sumatra", "East Nusa Tenggara"][i % 5],
    provinceZh: ["东加里曼丹省", "北加里曼丹省", "明古鲁省", "南苏门答腊省", "东努沙登加拉省"][i % 5],
    location: `Lokasi ${i + 7}`,
    locationEn: `Location ${i + 7}`,
    locationZh: `矿区位置 ${i + 7}`,
    year: "2023",
    status: "selesai" as const,
    category: ["konsultasi-geologi", "geoteknik-hidrologi-hidrogeologi", "konsultasi-pertambangan", "lingkungan-sosial", "mine-management", "mine-contractor"][i % 6],
    lat: [0.5387, 2.7256, -3.5778, -3.3194, -8.6574][i % 5],
    lng: [116.4194, 116.9114, 102.3464, 104.9147, 121.0794][i % 5],
    featured: false,
    image: defaultImage,
    gallery: []
  })),
];
