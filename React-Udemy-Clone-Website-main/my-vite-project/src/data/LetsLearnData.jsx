const courses = [
  {
    id: 1,
    courseTitle: "Sıfırdan Uygulamalı SQL Veri Tabanı Dersleri: MySQL & MsSQL",
    courseTeacher: "Enes Şen",
    coursePoint: "4.5",
    coursePrice: "450 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1604964432806-254d07c11f32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGV2ZWxvcGVyfGVufDB8fDB8fHww",
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
    courseTitle: "Sıfırdan Yapay Zeka Uzmanlığı: ChatGPT ve 20+ Araç (2025)",
    courseTeacher: "Ali Veli",
    coursePoint: "4.7",
    coursePrice: "500 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1605379399642-870262d3d051?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGV2ZWxvcGVyfGVufDB8fDB8fHww",
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
    courseTitle: "SEO Training Masterclass 2025: Beginner To Advanced SEO",
    courseTeacher: "Ayşe Yılmaz",
    coursePoint: "4.2",
    coursePrice: "300 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGV2ZWxvcGVyfGVufDB8fDB8fHww",
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
    courseTitle: "Python Programlama Eğitimi A-Z™ - (71.000+ Öğrenci)",
    courseTeacher: "Mehmet Can",
    coursePoint: "4.8",
    coursePrice: "600 ₺",
    courseImage:
      "https://plus.unsplash.com/premium_photo-1683309565422-77818a287060?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZGV2ZWxvcGVyfGVufDB8fDB8fHww",
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
    courseTitle: "Python ve Yapay Zekaya Giriş: 101",
    courseTeacher: "Elif Öztürk",
    coursePoint: "4.9",
    coursePrice: "750 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRldmVsb3BlcnxlbnwwfHwwfHx8MA%3D%3D",
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
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRldmVsb3BlcnxlbnwwfHwwfHx8MA%3D%3D",
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
    courseTitle: "Dijital Donanım Tasarımcısı Olma Kursu (FPGA / ASIC)",
    courseTeacher: "Ece Demir",
    coursePoint: "4.3",
    coursePrice: "550 ₺",
    courseImage:
      "https://plus.unsplash.com/premium_photo-1682145730713-34bba6d3d14a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRldmVsb3BlcnxlbnwwfHwwfHx8MA%3D%3D",
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
    courseTitle: "The Complete Android 14 & Kotlin Development Masterclass",
    courseTeacher: "Zeynep Güngör",
    coursePoint: "4.5",
    coursePrice: "350 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1603468620905-8de7d86b781e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRldmVsb3BlcnxlbnwwfHwwfHx8MA%3D%3D",
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
    courseTitle: "Python Mucizesi - Temelden Uzmanlığa (FULL Paket)",
    courseTeacher: "Ömer Çelik",
    coursePoint: "4.7",
    coursePrice: "650 ₺",
    courseImage:
      "https://norwegianscitechnews.com/wp-content/uploads/2024/08/rep_ai_inga_hig_res_bruk.jpg",
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
    courseTitle: "Şirket Değerleme ve Finansal Strateji Geliştirme",
    courseTeacher: "Hüseyin Arslan",
    coursePoint: "4.4",
    coursePrice: "450 ₺",
    courseImage:
      "https://omghcontent.affino.com/AcuCustom/Sitename/DAM/235/SINGLE_USE_AI_BING.jpg",
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
    courseTitle: "Machine Learning Fundamentals",
    courseTeacher: "Burcu Yıldız",
    coursePoint: "4.8",
    coursePrice: "700 ₺",
    courseImage:
      "https://www.chitkara.edu.in/blogs/wp-content/uploads/2024/07/AI-Education.jpg",
    courseDescription:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi."
  },
  {
    id: 12,
    courseTitle: "Electronics and Arduino Programming",
    courseTeacher: "Canan Aydın",
    coursePoint: "4.6",
    coursePrice: "550 ₺",
    courseImage:
      "https://plus.unsplash.com/premium_vector-1726125166148-e9e7f4039be0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGNoYXQlMjBib3R8ZW58MHx8MHx8fDA%3D",
    courseDescription:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi."
  }
];

export default courses;
