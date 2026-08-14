export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  imagePosition?: string;
  expertise: string[];
  education: string[];
  credentials?: string[];
  experienceHighlight?: string;
  profile: string;
}

export const team: TeamMember[] = [
  {
    id: "team-wawan",
    name: "Ir. Wawan Gunawan, ST., CPI, IPU, ASEAN Eng., APEC Eng.",
    role: "Direktur",
    image: "/team/wawan-gunawan.png",
    imagePosition: "50% 15%",
    expertise: [
      "Geologi & Eksplorasi",
      "Estimasi Sumber Daya",
      "Mine Management"
    ],
    education: [
      "Teknik Geologi — Universitas Padjadjaran",
      "Program Profesi Insinyur — Institut Teknologi Bandung"
    ],
    credentials: [
      "Competent Person Indonesia (CPI)",
      "Insinyur Profesional Utama (IPU)",
      "ASEAN Engineer",
      "APEC Engineer",
      "POP",
      "POM",
      "POU"
    ],
    profile: "Profesional geologi dan pertambangan dengan pengalaman luas dalam eksplorasi batubara, pemetaan geologi, estimasi sumber daya, due diligence, pengembangan tambang, hingga manajemen operasional pertambangan. Memiliki pengalaman menangani berbagai proyek pertambangan di Sumatera, Kalimantan, Sulawesi, dan wilayah Indonesia lainnya."
  },
  {
    id: "team-eko",
    name: "Ir. Eko Wicaksono, ST., MT., CPI ECB, IPM, ASEAN Eng.",
    role: "Tenaga Ahli Pertambangan & Competent Person Cadangan Batubara",
    image: "/team/eko-wicaksono.png",
    expertise: [
      "Mine Planning",
      "Coal Reserves",
      "Mining Engineering"
    ],
    education: [
      "S1 Teknik Pertambangan — UPN Veteran Yogyakarta",
      "Program Profesi Insinyur — Universitas Mulawarman",
      "S2 Teknik Pertambangan — UPN Veteran Yogyakarta",
      "Kandidat Doktor Teknik Geologi — UPN Veteran Yogyakarta"
    ],
    credentials: [
      "CPI Estimasi Cadangan Batubara",
      "Pengawas Operasional Pratama (POP)",
      "Pengawas Operasional Madya (POM)",
      "Pengawas Operasional Utama (POU)",
      "Insinyur Profesional Madya (IPM)",
      "ASEAN Engineer"
    ],
    experienceHighlight: "15+ tahun pengalaman di industri pertambangan batubara.",
    profile: "Mining engineer dengan pengalaman lebih dari 15 tahun di industri pertambangan batubara, khususnya dalam mine planning, technical analysis, economic evaluation, estimasi cadangan, dan pengelolaan operasi pertambangan."
  },
  {
    id: "team-novandri",
    name: "Novandri Kusuma Wardana, ST., MT.",
    role: "Tenaga Ahli Geoteknik & Hidrogeologi",
    image: "/team/novandri-kusuma-wardana.png",
    expertise: [
      "Geotechnical",
      "Hydrogeology",
      "Geomechanics"
    ],
    education: [
      "S1 Teknik Pertambangan — UPN Veteran Yogyakarta",
      "S1 Matematika Terapan — Universitas Negeri Yogyakarta",
      "S2 Teknik Pertambangan / Geomechanics — UPN Veteran Yogyakarta"
    ],
    experienceHighlight: "10+ tahun pengalaman pada bidang geoteknik dan pertambangan.",
    profile: "Tenaga ahli geoteknik dan hidrogeologi dengan pengalaman lebih dari 10 tahun dalam pertambangan batubara dan mineral, baik tambang permukaan maupun bawah tanah. Berpengalaman dalam geotechnical engineering, mine design, hydrogeology, monitoring air tanah, serta analisis data teknis pertambangan."
  },
  {
    id: "team-erwin",
    name: "Erwin Nurpraza, ST.",
    role: "Geologist",
    image: "/team/erwin-nurpraza.png",
    expertise: [
      "Geological Exploration",
      "RKAB",
      "Mine Management"
    ],
    education: [
      "Teknik Geologi — Universitas Pakuan"
    ],
    credentials: [
      "Pengawas Operasional Pertama / POP — BNSP"
    ],
    profile: "Geologist yang berpengalaman dalam eksplorasi geologi dan geoteknik, pemetaan geologi, pengawasan kegiatan eksplorasi, penyusunan laporan akhir eksplorasi, RKAB, rencana reklamasi, studi kelayakan, serta mine management."
  },
  {
    id: "team-nedy",
    name: "Nedy Andreas Alansyah, ST.",
    role: "Geologist",
    image: "/team/nedy-andreas-alansyah.png",
    expertise: [
      "Wellsite Geology",
      "Drilling Exploration",
      "Hydrogeology"
    ],
    education: [
      "Teknik Geologi — Universitas Pakuan Bogor"
    ],
    profile: "Geologist dengan pengalaman dalam kegiatan eksplorasi dan pemboran untuk tambang batubara, tambang bawah tanah, geoteknik, dan hidrogeologi. Berpengalaman sebagai wellsite geologist dan coordinator geologist dalam berbagai proyek eksplorasi di Kalimantan."
  },
  {
    id: "team-adi",
    name: "Adi Prayetno, ST.",
    role: "Geologist",
    image: "/team/adi-prayetno.png",
    expertise: [
      "Geotechnical",
      "Mine Reclamation",
      "Hydrogeology"
    ],
    education: [
      "Teknik Geologi — Universitas Pakuan Bogor"
    ],
    profile: "Geologist dengan pengalaman dalam penyusunan studi kelayakan, kajian geoteknik dan hidrogeologi, RIPPM, rencana reklamasi, rencana pascatambang, serta dukungan teknis AMDAL. Berpengalaman pula dalam pemboran geoteknik, pemetaan geologi, eksplorasi nikel laterit, grade control, dan proyek hidrogeologi."
  }
];
