const courses = [
  {
    id: 1,
    courseTitle: "Flutter REST Movie App: Master Flutter REST API Development",
    courseTeacher: "Enes Şen",
    coursePoint: "4.5",
    coursePrice: "450 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1580860749755-f49eb5509d55?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YW5kcm9pZHxlbnwwfHwwfHx8MA%3D%3D",
    courseDescription:
      "React is a JavaScript library for building user interfaces. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications, as it is optimal for fetching rapidly changing data that needs to be recorded.",
    courseLearn: [
      "Yapay Zeka Teknolojileri: Makine öğrenmesi, derin öğrenme ve büyük dil modellerini öğren",
      "React ile Web Geliştirme: Temelden ileri seviyeye",
      "React Router ve State Yönetimi: Projelerde nasıl kullanılır"
    ],
    courseInfo: [
      "5 saat uzunluğunda hazır video içeriği",
      "4 makale",
      "38 indirilebilir kaynak",
      "Mobil ve TVden erişim",
      "Altyazılar",
      "Mevcut seste ses açıklaması",
      "Bitirme sertifikası"
    ],
    necessary: [
      "Kodlama bilmeniz gerekmez.",
      "Kurs boyunca kodlama gerektirmeyen araçlar kullanacağız.",
      "Ücretli araçlar satın almanız gerekmez. Ücretsiz alternatifler paylaşılmaktadır.",
      "Yapay zeka üzerine tecrübeli olmanıza gerek yoktur."
    ]
  },
  {
    id: 2,
    courseTitle: "The Complete Android 14 & Kotlin Development Masterclass",
    courseTeacher: "Ali Veli",
    coursePoint: "4.7",
    coursePrice: "500 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5kcm9pZHxlbnwwfHwwfHx8MA%3D%3D",
    courseDescription:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam.",
    courseLearn: [
      "JavaScript Temelleri: Değişkenler, fonksiyonlar ve diziler",
      "ES6 Yenilikleri: Let, Const, Arrow Fonksiyonları",
      "Asenkron JavaScript: Promises, Async/Await"
    ],
    courseInfo: [
      "5 saat uzunluğunda hazır video içeriği",
      "4 makale",
      "38 indirilebilir kaynak",
      "Mobil ve TVden erişim",
      "Altyazılar",
      "Mevcut seste ses açıklaması",
      "Bitirme sertifikası"
    ],
    necessary: [
      "Kodlama bilmeniz gerekmez.",
      "Kurs boyunca kodlama gerektirmeyen araçlar kullanacağız.",
      "Ücretli araçlar satın almanız gerekmez. Ücretsiz alternatifler paylaşılmaktadır.",
      "Yapay zeka üzerine tecrübeli olmanıza gerek yoktur."
    ]
  },
  {
    id: 3,
    courseTitle: "The Complete Android & Kotlin App Development A-Z Bootcamp",
    courseTeacher: "Ayşe Yılmaz",
    coursePoint: "4.2",
    coursePrice: "300 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1603566234499-85676f87022f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFuZHJvaWR8ZW58MHx8MHx8fDA%3D",
    courseDescription: "HTML ve CSS temellerini öğrenin.",
    courseLearn: [
      "HTML Etiketleri: Temel yapı öğeleri",
      "CSS Styling: Renkler, fontlar ve düzenlemeler",
      "Responsive Design: Mobil uyumlu web siteleri tasarlamak"
    ],
    courseInfo: [
      "5 saat uzunluğunda hazır video içeriği",
      "4 makale",
      "38 indirilebilir kaynak",
      "Mobil ve TVden erişim",
      "Altyazılar",
      "Mevcut seste ses açıklaması",
      "Bitirme sertifikası"
    ],
    necessary: [
      "Kodlama bilmeniz gerekmez.",
      "Kurs boyunca kodlama gerektirmeyen araçlar kullanacağız.",
      "Ücretli araçlar satın almanız gerekmez. Ücretsiz alternatifler paylaşılmaktadır.",
      "Yapay zeka üzerine tecrübeli olmanıza gerek yoktur."
    ]
  },
  {
    id: 4,
    courseTitle: "Flutter & Dart - The Complete Guide [2025 Edition]",
    courseTeacher: "Mehmet Can",
    coursePoint: "4.8",
    coursePrice: "600 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1521939094609-93aba1af40d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFuZHJvaWR8ZW58MHx8MHx8fDA%3D",
    courseDescription:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.",
    courseLearn: [
      "JavaScript Temelleri: Değişkenler, fonksiyonlar ve diziler",
      "ES6 Yenilikleri: Let, Const, Arrow Fonksiyonları",
      "Asenkron JavaScript: Promises, Async/Await"
    ],
    courseInfo: [
      "5 saat uzunluğunda hazır video içeriği",
      "4 makale",
      "38 indirilebilir kaynak",
      "Mobil ve TVden erişim",
      "Altyazılar",
      "Mevcut seste ses açıklaması",
      "Bitirme sertifikası"
    ],
    necessary: [
      "Kodlama bilmeniz gerekmez.",
      "Kurs boyunca kodlama gerektirmeyen araçlar kullanacağız.",
      "Ücretli araçlar satın almanız gerekmez. Ücretsiz alternatifler paylaşılmaktadır.",
      "Yapay zeka üzerine tecrübeli olmanıza gerek yoktur."
    ]
  },
  {
    id: 5,
    courseTitle: "The Complete Flutter Development Bootcamp with Dart",
    courseTeacher: "Elif Öztürk",
    coursePoint: "4.9",
    coursePrice: "750 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1596742578443-7682ef5251cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFuZHJvaWR8ZW58MHx8MHx8fDA%3D",
    courseDescription:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.",
    courseLearn: [
      "JavaScript Temelleri: Değişkenler, fonksiyonlar ve diziler",
      "ES6 Yenilikleri: Let, Const, Arrow Fonksiyonları",
      "Asenkron JavaScript: Promises, Async/Await"
    ],
    courseInfo: [
      "5 saat uzunluğunda hazır video içeriği",
      "4 makale",
      "38 indirilebilir kaynak",
      "Mobil ve TVden erişim",
      "Altyazılar",
      "Mevcut seste ses açıklaması",
      "Bitirme sertifikası"
    ],
    necessary: [
      "Kodlama bilmeniz gerekmez.",
      "Kurs boyunca kodlama gerektirmeyen araçlar kullanacağız.",
      "Ücretli araçlar satın almanız gerekmez. Ücretsiz alternatifler paylaşılmaktadır.",
      "Yapay zeka üzerine tecrübeli olmanıza gerek yoktur."
    ]
  },
  {
    id: 6,
    courseTitle: "The Complete Android 15 Course [Part 1]-Master Java & Kotlin",
    courseTeacher: "Serkan Kara",
    coursePoint: "4.6",
    coursePrice: "400 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1571126770247-9a99e5f7eff7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFuZHJvaWR8ZW58MHx8MHx8fDA%3D",
    courseDescription:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.",
    courseLearn: [
      "JavaScript Temelleri: Değişkenler, fonksiyonlar ve diziler",
      "ES6 Yenilikleri: Let, Const, Arrow Fonksiyonları",
      "Asenkron JavaScript: Promises, Async/Await"
    ],
    courseInfo: [
      "5 saat uzunluğunda hazır video içeriği",
      "4 makale",
      "38 indirilebilir kaynak",
      "Mobil ve TVden erişim",
      "Altyazılar",
      "Mevcut seste ses açıklaması",
      "Bitirme sertifikası"
    ],
    necessary: [
      "Kodlama bilmeniz gerekmez.",
      "Kurs boyunca kodlama gerektirmeyen araçlar kullanacağız.",
      "Ücretli araçlar satın almanız gerekmez. Ücretsiz alternatifler paylaşılmaktadır.",
      "Yapay zeka üzerine tecrübeli olmanıza gerek yoktur."
    ]
  },
  {
    id: 7,
    courseTitle: "The Complete Android & Kotlin App Development A-Z Bootcamp",
    courseTeacher: "Ece Demir",
    coursePoint: "4.3",
    coursePrice: "550 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1523474438810-b04a2480633c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFuZHJvaWR8ZW58MHx8MHx8fDA%3D",
    courseDescription:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.",
    courseLearn: [
      "JavaScript Temelleri: Değişkenler, fonksiyonlar ve diziler",
      "ES6 Yenilikleri: Let, Const, Arrow Fonksiyonları",
      "Asenkron JavaScript: Promises, Async/Await"
    ],
    courseInfo: [
      "5 saat uzunluğunda hazır video içeriği",
      "4 makale",
      "38 indirilebilir kaynak",
      "Mobil ve TVden erişim",
      "Altyazılar",
      "Mevcut seste ses açıklaması",
      "Bitirme sertifikası"
    ],
    necessary: [
      "Kodlama bilmeniz gerekmez.",
      "Kurs boyunca kodlama gerektirmeyen araçlar kullanacağız.",
      "Ücretli araçlar satın almanız gerekmez. Ücretsiz alternatifler paylaşılmaktadır.",
      "Yapay zeka üzerine tecrübeli olmanıza gerek yoktur."
    ]
  },
  {
    id: 8,
    courseTitle: "Android App Development with Kotlin | Beginner to Advanced",
    courseTeacher: "Zeynep Güngör",
    coursePoint: "4.5",
    coursePrice: "350 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1598965402089-897ce52e8355?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGFuZHJvaWR8ZW58MHx8MHx8fDA%3D",
    courseDescription:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.",
    courseLearn: [
      "JavaScript Temelleri: Değişkenler, fonksiyonlar ve diziler",
      "ES6 Yenilikleri: Let, Const, Arrow Fonksiyonları",
      "Asenkron JavaScript: Promises, Async/Await"
    ],
    courseInfo: [
      "5 saat uzunluğunda hazır video içeriği",
      "4 makale",
      "38 indirilebilir kaynak",
      "Mobil ve TVden erişim",
      "Altyazılar",
      "Mevcut seste ses açıklaması",
      "Bitirme sertifikası"
    ],
    necessary: [
      "Kodlama bilmeniz gerekmez.",
      "Kurs boyunca kodlama gerektirmeyen araçlar kullanacağız.",
      "Ücretli araçlar satın almanız gerekmez. Ücretsiz alternatifler paylaşılmaktadır.",
      "Yapay zeka üzerine tecrübeli olmanıza gerek yoktur."
    ]
  },
  {
    id: 9,
    courseTitle: "Flutter UI Bootcamp | Build Beautiful Apps using Flutter",
    courseTeacher: "Ömer Çelik",
    coursePoint: "4.7",
    coursePrice: "650 ₺",
    courseImage:
      "https://plus.unsplash.com/premium_photo-1663100078216-2ff58616cf54?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YW5kcm9pZHxlbnwwfHwwfHx8MA%3D%3D",
    courseDescription:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.",
    courseLearn: [
      "JavaScript Temelleri: Değişkenler, fonksiyonlar ve diziler",
      "ES6 Yenilikleri: Let, Const, Arrow Fonksiyonları",
      "Asenkron JavaScript: Promises, Async/Await"
    ],
    courseInfo: [
      "5 saat uzunluğunda hazır video içeriği",
      "4 makale",
      "38 indirilebilir kaynak",
      "Mobil ve TVden erişim",
      "Altyazılar",
      "Mevcut seste ses açıklaması",
      "Bitirme sertifikası"
    ],
    necessary: [
      "Kodlama bilmeniz gerekmez.",
      "Kurs boyunca kodlama gerektirmeyen araçlar kullanacağız.",
      "Ücretli araçlar satın almanız gerekmez. Ücretsiz alternatifler paylaşılmaktadır.",
      "Yapay zeka üzerine tecrübeli olmanıza gerek yoktur."
    ]
  },
  {
    id: 10,
    courseTitle: "Android Jetpack Compose: The Comprehensive Bootcamp",
    courseTeacher: "Hüseyin Arslan",
    coursePoint: "4.4",
    coursePrice: "450 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1621592867256-8ef277cfb72b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGFuZHJvaWR8ZW58MHx8MHx8fDA%3D",
    courseDescription:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.",
    courseLearn: [
      "JavaScript Temelleri: Değişkenler, fonksiyonlar ve diziler",
      "ES6 Yenilikleri: Let, Const, Arrow Fonksiyonları",
      "Asenkron JavaScript: Promises, Async/Await"
    ],
    courseInfo: [
      "5 saat uzunluğunda hazır video içeriği",
      "4 makale",
      "38 indirilebilir kaynak",
      "Mobil ve TVden erişim",
      "Altyazılar",
      "Mevcut seste ses açıklaması",
      "Bitirme sertifikası"
    ],
    necessary: [
      "Kodlama bilmeniz gerekmez.",
      "Kurs boyunca kodlama gerektirmeyen araçlar kullanacağız.",
      "Ücretli araçlar satın almanız gerekmez. Ücretsiz alternatifler paylaşılmaktadır.",
      "Yapay zeka üzerine tecrübeli olmanıza gerek yoktur."
    ]
  },
  {
    id: 11,
    courseTitle: "Dart & Flutter | The Complete Flutter Development Course",
    courseTeacher: "Burcu Yıldız",
    coursePoint: "4.8",
    coursePrice: "700 ₺",
    courseImage:
      "https://plus.unsplash.com/premium_photo-1690297853326-e127726588ac?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGFuZHJvaWR8ZW58MHx8MHx8fDA%3D",
    courseDescription:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi."
  },
  {
    id: 12,
    courseTitle: "E-commerce App & Admin Website Using Flutter & Supabase",
    courseTeacher: "Canan Aydın",
    coursePoint: "4.6",
    coursePrice: "550 ₺",
    courseImage:
      "https://plus.unsplash.com/premium_photo-1682023585957-f191203ab239?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YW5kcm9pZHxlbnwwfHwwfHx8MA%3D%3D",
    courseDescription:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi."
  }
];

export default courses;
