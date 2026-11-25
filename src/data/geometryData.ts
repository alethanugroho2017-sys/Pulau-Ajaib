export type ShapeId =
  | 'persegi'
  | 'persegi_panjang'
  | 'segitiga'
  | 'lingkaran'
  | 'oval'
  | 'trapesium';

export type MenuId =
  | 'home'
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14';

export interface ShapeInfo {
  id: ShapeId;
  name: string;
  nickname: string;
  sides: number;
  corners: number;
  colorHex: string;
  accentHex: string;
  gradientClass: string;
  borderBottomClass: string;
  description: string;
  ciriCiri: string[];
  examples: string[];
  kikoTip: string;
}

export const SHAPES_DATA: ShapeInfo[] = [
  {
    id: 'persegi',
    name: 'Persegi',
    nickname: 'Si Kotak Seimbang',
    sides: 4,
    corners: 4,
    colorHex: '#ef4444',
    accentHex: '#fee2e2',
    gradientClass: 'from-rose-400 to-red-500',
    borderBottomClass: 'border-red-700',
    description:
      'Persegi memiliki 4 sisi yang semua panjangnya sama rata dan 4 sudut yang sama besar.',
    ciriCiri: [
      'Memiliki 4 sisi sama panjang',
      'Memiliki 4 titik sudut siku-siku',
      'Bentuknya selalu simetris dan rapi',
    ],
    examples: ['Ubin Lantai', 'Papan Catur', 'Kertas Origami', 'Biskuit Kotak'],
    kikoTip: 'Meong! Coba ukur keempat sisi ubin lantai di kelasmu, semuanya sama panjang!',
  },
  {
    id: 'persegi_panjang',
    name: 'Persegi Panjang',
    nickname: 'Si Kotak Panjang',
    sides: 4,
    corners: 4,
    colorHex: '#2563eb',
    accentHex: '#dbeafe',
    gradientClass: 'from-sky-400 to-blue-600',
    borderBottomClass: 'border-blue-800',
    description:
      'Persegi panjang memiliki 4 sisi, dengan 2 sisi berhadapan yang lebih panjang dan 2 sisi lainnya lebih pendek.',
    ciriCiri: [
      'Memiliki 4 sisi lurus',
      'Dua pasang sisi berhadapan sama panjang',
      'Memiliki 4 sudut siku-siku',
    ],
    examples: ['Papan Tulis', 'Pintu Kelas', 'Buku Gambar', 'Meja Belajar'],
    kikoTip: 'Lihat pintu kelas dan papan tulis di depan, keduanya berbentuk persegi panjang!',
  },
  {
    id: 'segitiga',
    name: 'Segitiga',
    nickname: 'Si Puncak Tajam',
    sides: 3,
    corners: 3,
    colorHex: '#f59e0b',
    accentHex: '#fef3c7',
    gradientClass: 'from-amber-400 to-orange-500',
    borderBottomClass: 'border-orange-700',
    description:
      'Segitiga adalah bangun datar yang dibatasi oleh 3 sisi lurus dan memiliki 3 titik sudut.',
    ciriCiri: [
      'Memiliki 3 sisi lurus',
      'Memiliki 3 titik sudut',
      'Ada segitiga sama sisi, sama kaki, dan siku-siku',
    ],
    examples: ['Potongan Pizza', 'Penggaris Segitiga', 'Rambu Lalu Lintas', 'Tenda Kemah'],
    kikoTip: 'Satu, dua, tiga! Segitiga selalu punya 3 sisi dan 3 sudut yang mudah dihitung!',
  },
  {
    id: 'lingkaran',
    name: 'Lingkaran',
    nickname: 'Si Bulat Sempurna',
    sides: 1,
    corners: 0,
    colorHex: '#10b981',
    accentHex: '#d1fae5',
    gradientClass: 'from-emerald-400 to-green-600',
    borderBottomClass: 'border-green-800',
    description:
      'Lingkaran memiliki 1 sisi lengkung yang menyatu sempurna tanpa sudut sama sekali.',
    ciriCiri: [
      'Memiliki 1 sisi lengkung tertutup',
      'Tidak memiliki titik sudut (0 sudut)',
      'Dapat menggelinding dengan lancar',
    ],
    examples: ['Jam Dinding', 'Roda Sepeda', 'Piring Makan', 'Uang Koin'],
    kikoTip: 'Roda sepeda bisa berputar lancar karena bentuknya lingkaran tanpa sudut!',
  },
  {
    id: 'oval',
    name: 'Oval',
    nickname: 'Si Lonjong Manis',
    sides: 1,
    corners: 0,
    colorHex: '#8b5cf6',
    accentHex: '#ede9fe',
    gradientClass: 'from-violet-400 to-purple-600',
    borderBottomClass: 'border-purple-800',
    description:
      'Oval memiliki 1 sisi lengkung yang bentuknya memanjang atau lonjong seperti telur.',
    ciriCiri: [
      'Memiliki 1 sisi lengkung lonjong',
      'Tidak memiliki titik sudut (0 sudut)',
      'Lebih panjang di satu arah dibanding lingkaran',
    ],
    examples: ['Telur Ayam', 'Cermin Meja', 'Buah Semangka', 'Lintasan Lari'],
    kikoTip: 'Hati-hati membedakan oval dan lingkaran ya! Oval tampak memanjang seperti telur.',
  },
  {
    id: 'trapesium',
    name: 'Trapesium',
    nickname: 'Si Atap Rumah',
    sides: 4,
    corners: 4,
    colorHex: '#ec4899',
    accentHex: '#fce7f3',
    gradientClass: 'from-pink-400 to-rose-600',
    borderBottomClass: 'border-rose-800',
    description:
      'Trapesium memiliki 4 sisi dan 4 sudut, dengan tepat sepasang sisi yang sejajar tetapi tidak sama panjang.',
    ciriCiri: [
      'Memiliki 4 sisi lurus',
      'Memiliki sepasang sisi sejajar (atas dan bawah)',
      'Memiliki 4 titik sudut',
    ],
    examples: ['Atap Rumah', 'Tas Jinjing', 'Loyang Kue', 'Perahu Kertas'],
    kikoTip: 'Lihat bagian atas rumah yang miring di kiri dan kanannya, itu bentuk trapesium!',
  },
];

export type ObjectArtId =
  | 'jam_dinding'
  | 'papan_tulis'
  | 'ubin_lantai'
  | 'potongan_pizza'
  | 'telur_ayam'
  | 'atap_rumah'
  | 'pintu_kelas'
  | 'rambu_jalan'
  | 'cermin_oval'
  | 'tas_trapesium'
  | 'papan_catur'
  | 'roda_sepeda'
  | 'semangka_oval'
  | 'perahu_trapesium'
  | 'penggaris_segitiga'
  | 'kertas_origami';

export interface RealObjectItem {
  id: ObjectArtId;
  name: string;
  shapeId: ShapeId;
  location: string;
  clue: string;
  observePrompt: string;
}

export const REAL_OBJECTS: RealObjectItem[] = [
  {
    id: 'jam_dinding',
    name: 'Jam Dinding',
    shapeId: 'lingkaran',
    location: 'Ruang Kelas',
    clue: 'Memiliki 1 sisi melengkung bulat sempurna tanpa sudut.',
    observePrompt: 'Jarum jam berputar mengikuti tepi jam yang bulat sempurna.',
  },
  {
    id: 'papan_tulis',
    name: 'Papan Tulis',
    shapeId: 'persegi_panjang',
    location: 'Depan Kelas',
    clue: 'Memiliki 4 sisi dengan sisi atas-bawah lebih panjang dari sisi kiri-kanan.',
    observePrompt: 'Ibu guru menulis pelajaran di papan tulis yang lebar memanjang.',
  },
  {
    id: 'ubin_lantai',
    name: 'Ubin Keramik',
    shapeId: 'persegi',
    location: 'Lantai Rumah',
    clue: 'Keempat sisinya sama panjang dan keempat sudutnya siku-siku.',
    observePrompt: 'Ubin lantai tersusun rapi karena semua sisinya sama panjang.',
  },
  {
    id: 'potongan_pizza',
    name: 'Potongan Pizza',
    shapeId: 'segitiga',
    location: 'Meja Makan',
    clue: 'Memiliki 3 sisi lurus dan 3 sudut yang runcing di ujungnya.',
    observePrompt: 'Satu iris pizza lezat selalu memiliki 3 sisi dan 3 sudut!',
  },
  {
    id: 'telur_ayam',
    name: 'Telur Ayam',
    shapeId: 'oval',
    location: 'Dapur Rumah',
    clue: 'Melengkung tanpa sudut, tetapi bentuknya lonjong memanjang.',
    observePrompt: 'Telur berbentuk lonjong halus agar aman saat dierami induknya.',
  },
  {
    id: 'atap_rumah',
    name: 'Atap Rumah',
    shapeId: 'trapesium',
    location: 'Lingkungan Sekitar',
    clue: 'Sisi atas dan bawah sejajar, sisi kiri dan kanannya miring.',
    observePrompt: 'Atap rumah bagian depan memiliki dua sisi sejajar dan dua sisi miring.',
  },
  {
    id: 'pintu_kelas',
    name: 'Pintu Kelas',
    shapeId: 'persegi_panjang',
    location: 'Sekolah',
    clue: 'Tinggi pintu lebih panjang daripada lebarnya, punya 4 sudut.',
    observePrompt: 'Pintu kelas berdiri tegak berbentuk persegi panjang.',
  },
  {
    id: 'rambu_jalan',
    name: 'Rambu Peringatan',
    shapeId: 'segitiga',
    location: 'Jalan Raya',
    clue: 'Papan rambu kuning ini punya 3 sisi dan 3 sudut.',
    observePrompt: 'Rambu peringatan di jalan mudah dikenali dari bentuk 3 sudutnya.',
  },
  {
    id: 'cermin_oval',
    name: 'Cermin Meja',
    shapeId: 'oval',
    location: 'Kamar Tidur',
    clue: 'Bentuk kaca melengkung lonjong tegak tanpa sudut.',
    observePrompt: 'Cermin hias berbentuk lonjong atau oval yang elegan.',
  },
  {
    id: 'tas_trapesium',
    name: 'Tas Jinjing',
    shapeId: 'trapesium',
    location: 'Lemari Pakaian',
    clue: 'Bagian bawah tas lebih lebar daripada bagian atasnya.',
    observePrompt: 'Tas cantik ini sisi bawah dan atasnya sejajar, sisi sampingnya miring.',
  },
  {
    id: 'papan_catur',
    name: 'Papan Catur',
    shapeId: 'persegi',
    location: 'Ruang Bermain',
    clue: 'Memiliki 4 sisi sama panjang berisi petak-petak kotak.',
    observePrompt: 'Papan catur memiliki ukuran panjang dan lebar yang persis sama.',
  },
  {
    id: 'roda_sepeda',
    name: 'Roda Sepeda',
    shapeId: 'lingkaran',
    location: 'Halaman Rumah',
    clue: 'Bulat sempurna sehingga bisa berputar di jalan.',
    observePrompt: 'Ban sepeda berbentuk lingkaran agar melaju mulus.',
  },
  {
    id: 'semangka_oval',
    name: 'Buah Melon Lonjong',
    shapeId: 'oval',
    location: 'Kebun Buah',
    clue: 'Buah utuh yang melengkung lonjong tanpa titik sudut.',
    observePrompt: 'Lihat bentuk buah ini dari samping, memanjang manis seperti oval!',
  },
  {
    id: 'perahu_trapesium',
    name: 'Loyang Kue',
    shapeId: 'trapesium',
    location: 'Toko Roti',
    clue: 'Dasar loyang lebih sempit dibanding bagian atasnya.',
    observePrompt: 'Cetakan kue ini memiliki sisi miring di kiri dan kanannya.',
  },
  {
    id: 'penggaris_segitiga',
    name: 'Penggaris Segitiga',
    shapeId: 'segitiga',
    location: 'Kotak Pensil',
    clue: 'Alat ukur sekolah dengan 3 sisi lurus dan 3 sudut.',
    observePrompt: 'Penggaris ini membantu kita menggambar sudut dengan rapi.',
  },
  {
    id: 'kertas_origami',
    name: 'Kertas Origami',
    shapeId: 'persegi',
    location: 'Meja Belajar',
    clue: 'Kertas lipat warna-warni yang keempat sisinya sama panjang.',
    observePrompt: 'Kertas origami berbentuk persegi agar mudah dilipat menjadi perahu atau burung.',
  },
];

// 10 items specifically highlighted in Menu 04 Ayo Mengamati Benda
export const OBSERVE_10_OBJECTS: RealObjectItem[] = REAL_OBJECTS.slice(0, 10);

// 12 items for Menu 08 Game 3 Kelompokkan Benda (2 items per shape across all 6 shapes!)
export const SORT_12_OBJECTS: RealObjectItem[] = [
  REAL_OBJECTS[2],  // ubin_lantai (persegi)
  REAL_OBJECTS[10], // papan_catur (persegi)
  REAL_OBJECTS[1],  // papan_tulis (persegi_panjang)
  REAL_OBJECTS[6],  // pintu_kelas (persegi_panjang)
  REAL_OBJECTS[3],  // potongan_pizza (segitiga)
  REAL_OBJECTS[7],  // rambu_jalan (segitiga)
  REAL_OBJECTS[0],  // jam_dinding (lingkaran)
  REAL_OBJECTS[11], // roda_sepeda (lingkaran)
  REAL_OBJECTS[4],  // telur_ayam (oval)
  REAL_OBJECTS[8],  // cermin_oval (oval)
  REAL_OBJECTS[5],  // atap_rumah (trapesium)
  REAL_OBJECTS[9],  // tas_trapesium (trapesium)
];

export interface QuizQuestion {
  id: number;
  question: string;
  promptObjectId?: ObjectArtId;
  options: {
    id: string;
    label: string;
    shapeVisual?: ShapeId;
    objectVisual?: ObjectArtId;
  }[];
  correctOptionId: string;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Manakah gambar bangun datar yang memiliki 3 sisi dan 3 sudut?',
    options: [
      { id: 'a', label: 'Persegi', shapeVisual: 'persegi' },
      { id: 'b', label: 'Segitiga', shapeVisual: 'segitiga' },
      { id: 'c', label: 'Lingkaran', shapeVisual: 'lingkaran' },
      { id: 'd', label: 'Trapesium', shapeVisual: 'trapesium' },
    ],
    correctOptionId: 'b',
    explanation: 'Segitiga selalu memiliki tepat 3 sisi lurus dan 3 titik sudut.',
  },
  {
    id: 2,
    question: 'Benda pada gambar di samping berbentuk bangun datar apa?',
    promptObjectId: 'jam_dinding',
    options: [
      { id: 'a', label: 'Oval', shapeVisual: 'oval' },
      { id: 'b', label: 'Persegi', shapeVisual: 'persegi' },
      { id: 'c', label: 'Lingkaran', shapeVisual: 'lingkaran' },
      { id: 'd', label: 'Segitiga', shapeVisual: 'segitiga' },
    ],
    correctOptionId: 'c',
    explanation: 'Jam dinding ini berbentuk lingkaran bulat sempurna dengan 0 sudut.',
  },
  {
    id: 3,
    question: 'Manakah benda di sekitar kelas yang berbentuk Persegi Panjang?',
    options: [
      { id: 'a', label: 'Papan Tulis', objectVisual: 'papan_tulis' },
      { id: 'b', label: 'Telur Ayam', objectVisual: 'telur_ayam' },
      { id: 'c', label: 'Roda Sepeda', objectVisual: 'roda_sepeda' },
      { id: 'd', label: 'Potongan Pizza', objectVisual: 'potongan_pizza' },
    ],
    correctOptionId: 'a',
    explanation: 'Papan tulis memiliki 2 pasang sisi berhadapan sama panjang sehingga berbentuk persegi panjang.',
  },
  {
    id: 4,
    question: 'Bangun datar yang semua 4 sisinya sama panjang disebut apa?',
    options: [
      { id: 'a', label: 'Trapesium', shapeVisual: 'trapesium' },
      { id: 'b', label: 'Persegi Panjang', shapeVisual: 'persegi_panjang' },
      { id: 'c', label: 'Oval', shapeVisual: 'oval' },
      { id: 'd', label: 'Persegi', shapeVisual: 'persegi' },
    ],
    correctOptionId: 'd',
    explanation: 'Persegi memiliki 4 sisi yang sama persis panjangnya.',
  },
  {
    id: 5,
    question: 'Manakah benda yang berbentuk Oval (lonjong tanpa sudut)?',
    options: [
      { id: 'a', label: 'Ubin Lantai', objectVisual: 'ubin_lantai' },
      { id: 'b', label: 'Telur Ayam', objectVisual: 'telur_ayam' },
      { id: 'c', label: 'Atap Rumah', objectVisual: 'atap_rumah' },
      { id: 'd', label: 'Rambu Jalan', objectVisual: 'rambu_jalan' },
    ],
    correctOptionId: 'b',
    explanation: 'Telur ayam berbentuk lonjong atau oval dan tidak memiliki sudut.',
  },
  {
    id: 6,
    question: 'Atap rumah pada gambar ini berbentuk bangun datar apa?',
    promptObjectId: 'atap_rumah',
    options: [
      { id: 'a', label: 'Trapesium', shapeVisual: 'trapesium' },
      { id: 'b', label: 'Lingkaran', shapeVisual: 'lingkaran' },
      { id: 'c', label: 'Persegi', shapeVisual: 'persegi' },
      { id: 'd', label: 'Segitiga', shapeVisual: 'segitiga' },
    ],
    correctOptionId: 'a',
    explanation: 'Atap rumah ini memiliki sepasang sisi sejajar atas-bawah dan dua sisi miring, yaitu trapesium.',
  },
  {
    id: 7,
    question: 'Berapa banyak titik sudut yang dimiliki oleh Lingkaran?',
    options: [
      { id: 'a', label: '0 Sudut (Lingkaran)', shapeVisual: 'lingkaran' },
      { id: 'b', label: '3 Sudut (Segitiga)', shapeVisual: 'segitiga' },
      { id: 'c', label: '4 Sudut (Persegi)', shapeVisual: 'persegi' },
      { id: 'd', label: '4 Sudut (Trapesium)', shapeVisual: 'trapesium' },
    ],
    correctOptionId: 'a',
    explanation: 'Lingkaran hanya memiliki 1 sisi lengkung tertutup dan 0 titik sudut.',
  },
  {
    id: 8,
    question: 'Manakah benda yang memiliki bentuk Persegi (4 sisi sama panjang)?',
    options: [
      { id: 'a', label: 'Pintu Kelas', objectVisual: 'pintu_kelas' },
      { id: 'b', label: 'Papan Catur', objectVisual: 'papan_catur' },
      { id: 'c', label: 'Cermin Meja', objectVisual: 'cermin_oval' },
      { id: 'd', label: 'Tas Jinjing', objectVisual: 'tas_trapesium' },
    ],
    correctOptionId: 'b',
    explanation: 'Papan catur mempunyai panjang dan lebar yang sama, berbentuk persegi.',
  },
  {
    id: 9,
    question: 'Rambu lalu lintas di jalan pada gambar berbentuk apa?',
    promptObjectId: 'rambu_jalan',
    options: [
      { id: 'a', label: 'Persegi Panjang', shapeVisual: 'persegi_panjang' },
      { id: 'b', label: 'Oval', shapeVisual: 'oval' },
      { id: 'c', label: 'Segitiga', shapeVisual: 'segitiga' },
      { id: 'd', label: 'Lingkaran', shapeVisual: 'lingkaran' },
    ],
    correctOptionId: 'c',
    explanation: 'Rambu peringatan tersebut memiliki 3 sisi dan 3 sudut, artinya berbentuk segitiga.',
  },
  {
    id: 10,
    question: 'Pilihlah gambar bangun datar yang memiliki sepasang sisi sejajar berbeda panjang!',
    options: [
      { id: 'a', label: 'Lingkaran', shapeVisual: 'lingkaran' },
      { id: 'b', label: 'Persegi', shapeVisual: 'persegi' },
      { id: 'c', label: 'Oval', shapeVisual: 'oval' },
      { id: 'd', label: 'Trapesium', shapeVisual: 'trapesium' },
    ],
    correctOptionId: 'd',
    explanation: 'Trapesium memiliki 4 sisi, dengan sisi atas dan bawah sejajar tetapi panjangnya berbeda.',
  },
];

export interface SongLine {
  id: number;
  text: string;
  shapeHighlight?: ShapeId;
  durationMs: number;
}

export const SONG_LYRICS: SongLine[] = [
  {
    id: 1,
    text: 'Ayo kawan kita belajar, mengenal bentuk bangun datar!',
    durationMs: 3600,
  },
  {
    id: 2,
    text: 'Ada Persegi empat sisi sama, seperti ubin di lantai rumah.',
    shapeHighlight: 'persegi',
    durationMs: 4200,
  },
  {
    id: 3,
    text: 'Persegi Panjang dua sisi panjang, seperti pintu dan papan tulis.',
    shapeHighlight: 'persegi_panjang',
    durationMs: 4200,
  },
  {
    id: 4,
    text: 'Segitiga punya tiga sisi, seperti pizza enak sekali!',
    shapeHighlight: 'segitiga',
    durationMs: 4000,
  },
  {
    id: 5,
    text: 'Lingkaran bulat tiada sudut, seperti roda yang berputar terus.',
    shapeHighlight: 'lingkaran',
    durationMs: 4200,
  },
  {
    id: 6,
    text: 'Oval lonjong bagai telur ayam, Trapesium mirip atap rumah nyaman.',
    shapeHighlight: 'trapesium',
    durationMs: 4400,
  },
  {
    id: 7,
    text: 'Hore! Semua bentuk sudah ku tahu, bersama Kiko di Pulau Ajaib!',
    durationMs: 4000,
  },
];

export interface IslandQuestChallenge {
  question: string;
  objectId?: ObjectArtId;
  options: { id: string; label: string; shapeId?: ShapeId }[];
  correctId: string;
  successNote: string;
}

export interface IslandNode {
  id: number;
  shapeId: ShapeId;
  islandName: string;
  subtitle: string;
  badgeName: string;
  challenges: IslandQuestChallenge[];
}

export const ISLAND_QUESTS: IslandNode[] = [
  {
    id: 1,
    shapeId: 'persegi',
    islandName: 'Pulau 1: Pulau Persegi',
    subtitle: 'Gerbang Kotak Seimbang',
    badgeName: 'Penjaga Persegi',
    challenges: [
      {
        question: 'Berapa banyak sisi sama panjang yang dimiliki Persegi?',
        options: [
          { id: '3', label: '3 Sisi' },
          { id: '4', label: '4 Sisi Sama Panjang' },
          { id: '0', label: '0 Sisi' },
        ],
        correctId: '4',
        successNote: 'Hebat! Persegi punya 4 sisi yang sama panjang!',
      },
      {
        question: 'Benda manakah yang berbentuk Persegi di Pulau 1?',
        objectId: 'kertas_origami',
        options: [
          { id: 'persegi', label: 'Kertas Origami', shapeId: 'persegi' },
          { id: 'lingkaran', label: 'Roda Sepeda', shapeId: 'lingkaran' },
          { id: 'oval', label: 'Telur Ayam', shapeId: 'oval' },
        ],
        correctId: 'persegi',
        successNote: 'Betul! Kertas origami berbentuk persegi!',
      },
    ],
  },
  {
    id: 2,
    shapeId: 'persegi_panjang',
    islandName: 'Pulau 2: Pulau Persegi Panjang',
    subtitle: 'Lembah Papan Tulis',
    badgeName: 'Penjelajah Papan',
    challenges: [
      {
        question: 'Papan tulis di depan kelas berbentuk apa?',
        objectId: 'papan_tulis',
        options: [
          { id: 'segitiga', label: 'Segitiga', shapeId: 'segitiga' },
          { id: 'persegi_panjang', label: 'Persegi Panjang', shapeId: 'persegi_panjang' },
          { id: 'lingkaran', label: 'Lingkaran', shapeId: 'lingkaran' },
        ],
        correctId: 'persegi_panjang',
        successNote: 'Benar! Papan tulis berbentuk persegi panjang!',
      },
      {
        question: 'Berapa jumlah sudut pada Persegi Panjang?',
        options: [
          { id: '2', label: '2 Sudut' },
          { id: '3', label: '3 Sudut' },
          { id: '4', label: '4 Sudut Siku-siku' },
        ],
        correctId: '4',
        successNote: 'Keren! Persegi panjang juga punya 4 titik sudut!',
      },
    ],
  },
  {
    id: 3,
    shapeId: 'segitiga',
    islandName: 'Pulau 3: Pulau Segitiga',
    subtitle: 'Puncak Piramida Cerah',
    badgeName: 'Pendaki Segitiga',
    challenges: [
      {
        question: 'Potongan pizza yang lezat ini berbentuk apa?',
        objectId: 'potongan_pizza',
        options: [
          { id: 'segitiga', label: 'Segitiga', shapeId: 'segitiga' },
          { id: 'persegi', label: 'Persegi', shapeId: 'persegi' },
          { id: 'oval', label: 'Oval', shapeId: 'oval' },
        ],
        correctId: 'segitiga',
        successNote: 'Mantap! Potongan pizza punya 3 sisi dan 3 sudut!',
      },
      {
        question: 'Mana ciri yang tepat untuk Segitiga?',
        options: [
          { id: '3', label: '3 Sisi & 3 Sudut' },
          { id: '1', label: '1 Sisi Lengkung' },
          { id: '4', label: '4 Sisi Sama Panjang' },
        ],
        correctId: '3',
        successNote: 'Tepat sekali! Segitiga selalu punya 3 sisi dan 3 sudut.',
      },
    ],
  },
  {
    id: 4,
    shapeId: 'lingkaran',
    islandName: 'Pulau 4: Pulau Lingkaran',
    subtitle: 'Teluk Roda Berputar',
    badgeName: 'Nakhoda Lingkaran',
    challenges: [
      {
        question: 'Berapa banyak sudut yang dimiliki oleh Lingkaran?',
        options: [
          { id: '0', label: '0 Sudut (Tidak Ada)' },
          { id: '3', label: '3 Sudut' },
          { id: '4', label: '4 Sudut' },
        ],
        correctId: '0',
        successNote: 'Yes! Lingkaran tidak punya titik sudut sama sekali!',
      },
      {
        question: 'Jam dinding di kelas berbentuk apa?',
        objectId: 'jam_dinding',
        options: [
          { id: 'trapesium', label: 'Trapesium', shapeId: 'trapesium' },
          { id: 'lingkaran', label: 'Lingkaran', shapeId: 'lingkaran' },
          { id: 'persegi', label: 'Persegi', shapeId: 'persegi' },
        ],
        correctId: 'lingkaran',
        successNote: 'Hebat! Jam dinding berbentuk lingkaran sempurna!',
      },
    ],
  },
  {
    id: 5,
    shapeId: 'oval',
    islandName: 'Pulau 5: Pulau Oval',
    subtitle: 'Sarang Telur Emas',
    badgeName: 'Sahabat Oval',
    challenges: [
      {
        question: 'Telur ayam ini memiliki bentuk apa?',
        objectId: 'telur_ayam',
        options: [
          { id: 'oval', label: 'Oval', shapeId: 'oval' },
          { id: 'persegi', label: 'Persegi', shapeId: 'persegi' },
          { id: 'segitiga', label: 'Segitiga', shapeId: 'segitiga' },
        ],
        correctId: 'oval',
        successNote: 'Betul! Telur ayam berbentuk lonjong atau oval!',
      },
      {
        question: 'Apa perbedaan utama Oval dengan Lingkaran?',
        options: [
          { id: 'lonjong', label: 'Oval berbentuk lonjong memanjang' },
          { id: 'sudut', label: 'Oval punya 4 sudut tajam' },
          { id: 'lurus', label: 'Oval punya 3 sisi lurus' },
        ],
        correctId: 'lonjong',
        successNote: 'Pintar! Oval sama-sama tanpa sudut, tapi lebih lonjong!',
      },
    ],
  },
  {
    id: 6,
    shapeId: 'trapesium',
    islandName: 'Pulau 6: Pulau Trapesium',
    subtitle: 'Istana Mahkota Pelangi',
    badgeName: 'Juara Pulau Ajaib',
    challenges: [
      {
        question: 'Atap rumah pada gambar berbentuk bangun datar apa?',
        objectId: 'atap_rumah',
        options: [
          { id: 'lingkaran', label: 'Lingkaran', shapeId: 'lingkaran' },
          { id: 'trapesium', label: 'Trapesium', shapeId: 'trapesium' },
          { id: 'oval', label: 'Oval', shapeId: 'oval' },
        ],
        correctId: 'trapesium',
        successNote: 'Luar biasa! Atap rumah berbentuk trapesium!',
      },
      {
        question: 'Berapa jumlah sisi dan sudut Trapesium?',
        options: [
          { id: '4', label: '4 Sisi & 4 Sudut' },
          { id: '3', label: '3 Sisi & 3 Sudut' },
          { id: '0', label: '1 Sisi & 0 Sudut' },
        ],
        correctId: '4',
        successNote: 'Sempurna! Kamu menaklukkan semua 6 Pulau Ajaib!',
      },
    ],
  },
];

export interface MenuDefinition {
  id: MenuId;
  number: string;
  title: string;
  subtitle: string;
  gradient: string;
  borderBottom: string;
  badgeColor: string;
}

export const ALL_MENUS: MenuDefinition[] = [
  {
    id: '01',
    number: '01',
    title: 'Petunjuk Penggunaan',
    subtitle: 'Cara belajar, menonton & bermain',
    gradient: 'from-sky-400 to-blue-500',
    borderBottom: 'border-blue-700',
    badgeColor: 'bg-blue-700',
  },
  {
    id: '02',
    number: '02',
    title: 'Tujuan Pembelajaran',
    subtitle: '3 misi seru kelas 2 SD',
    gradient: 'from-emerald-400 to-teal-500',
    borderBottom: 'border-teal-700',
    badgeColor: 'bg-teal-700',
  },
  {
    id: '03',
    number: '03',
    title: 'Ayo Belajar Bangun Datar',
    subtitle: '6 kartu 3D berputar interaktif',
    gradient: 'from-amber-400 to-orange-500',
    borderBottom: 'border-orange-700',
    badgeColor: 'bg-orange-700',
  },
  {
    id: '04',
    number: '04',
    title: 'Ayo Mengamati Benda',
    subtitle: 'Tantangan 10 benda di sekitar',
    gradient: 'from-rose-400 to-red-500',
    borderBottom: 'border-red-700',
    badgeColor: 'bg-red-700',
  },
  {
    id: '05',
    number: '05',
    title: 'Video Pembelajaran',
    subtitle: 'Tonton via YouTube & Drive',
    gradient: 'from-red-500 to-rose-600',
    borderBottom: 'border-rose-800',
    badgeColor: 'bg-rose-800',
  },
  {
    id: '06',
    number: '06',
    title: 'Game 1: Tebak Bentuk',
    subtitle: 'Tebak bentuk dari benda nyata',
    gradient: 'from-violet-400 to-purple-600',
    borderBottom: 'border-purple-800',
    badgeColor: 'bg-purple-800',
  },
  {
    id: '07',
    number: '07',
    title: 'Game 2: Pasangkan Benda',
    subtitle: 'Cocokkan benda & namanya',
    gradient: 'from-fuchsia-400 to-pink-600',
    borderBottom: 'border-pink-800',
    badgeColor: 'bg-pink-800',
  },
  {
    id: '08',
    number: '08',
    title: 'Game 3: Kelompokkan Benda',
    subtitle: 'Masukkan 12 benda ke keranjang',
    gradient: 'from-cyan-400 to-sky-600',
    borderBottom: 'border-sky-800',
    badgeColor: 'bg-sky-800',
  },
  {
    id: '09',
    number: '09',
    title: 'Kuis Evaluasi',
    subtitle: '10 soal pilihan gambar & skor',
    gradient: 'from-indigo-400 to-blue-600',
    borderBottom: 'border-blue-800',
    badgeColor: 'bg-blue-800',
  },
  {
    id: '10',
    number: '10',
    title: 'Hasil dan Refleksi',
    subtitle: 'Nilai, piagam & perasaanmu',
    gradient: 'from-yellow-400 to-amber-500',
    borderBottom: 'border-amber-700',
    badgeColor: 'bg-amber-700',
  },
  {
    id: '11',
    number: '11',
    title: 'Profil Pengembang & TPACK',
    subtitle: 'Profil guru & kerangka TPACK',
    gradient: 'from-slate-600 to-slate-800',
    borderBottom: 'border-slate-950',
    badgeColor: 'bg-slate-900',
  },
  {
    id: '12',
    number: '12',
    title: 'Bernyanyi',
    subtitle: 'Lagu ceria bangun datar',
    gradient: 'from-lime-400 to-green-600',
    borderBottom: 'border-green-800',
    badgeColor: 'bg-green-800',
  },
  {
    id: '13',
    number: '13',
    title: 'Ayo Menggambar',
    subtitle: 'Kanvas gambar jari & mouse',
    gradient: 'from-orange-400 to-pink-500',
    borderBottom: 'border-pink-700',
    badgeColor: 'bg-pink-700',
  },
  {
    id: '14',
    number: '14',
    title: 'Peta Pulau Ajaib',
    subtitle: 'Petualangan 6 pulau berurutan',
    gradient: 'from-teal-400 to-emerald-600',
    borderBottom: 'border-emerald-800',
    badgeColor: 'bg-emerald-800',
  },
];
