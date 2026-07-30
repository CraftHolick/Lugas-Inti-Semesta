export interface Testimonial {
  id: string;
  name: string;
  company: string;
  roleId: string;
  roleEn: string;
  quoteId: string;
  quoteEn: string;
  quoteZh: string;
  avatar: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 't-1',
    name: 'Haryanto Wijaya',
    company: 'PT Borneo Resources',
    roleId: 'Manajer Proyek',
    roleEn: 'Project Manager',
    quoteId: 'Tim LUISE memberikan analisis model geologi yang sangat akurat untuk konsesi kami di Batulicin. Profesionalisme mereka sangat membantu kelancaran operasi kami.',
    quoteEn: 'The LUISE team provided highly accurate geological model analysis for our concession in Batulicin. Their professionalism greatly assisted our operational smoothness.',
    quoteZh: 'LUISE 团队为我们在巴图利钦的特许权提供了非常准确的地质模型分析。他们的专业精神极大地帮助了我们的运营顺利进行。',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    rating: 5
  },
  {
    id: 't-2',
    name: 'Siti Aminah',
    company: 'Kutai Energy Resources',
    roleId: 'Direktur Operasional',
    roleEn: 'Operations Director',
    quoteId: 'Laporan studi kelayakan dari LUISE sangat komprehensif dan mudah dipahami oleh investor kami. Sangat direkomendasikan untuk konsultasi tambang.',
    quoteEn: 'The feasibility study report from LUISE was very comprehensive and easily understood by our investors. Highly recommended for mining consultation.',
    quoteZh: 'LUISE 的可行性研究报告非常全面，我们的投资者很容易理解。强烈推荐用于采矿咨询。',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    rating: 5
  },
  {
    id: 't-3',
    name: 'Doni Kusuma',
    company: 'Central Borneo Mining',
    roleId: 'Kepala Teknik Tambang',
    roleEn: 'Chief Mine Engineer',
    quoteId: 'Hasil survei topografi UAV yang diberikan sangat detail dan dikerjakan lebih cepat dari jadwal. Ini sangat krusial untuk perencanaan bukaan tambang baru kami.',
    quoteEn: 'The UAV topographic survey results provided were highly detailed and completed ahead of schedule. This was crucial for planning our new mine opening.',
    quoteZh: '提供的无人机地形图测量结果非常详细，并提前完成。这对于规划我们的新矿山开采至关重要。',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    rating: 5
  }
];
