const courses = [
  {
    id: 1,
    courseTitle: "Uygulamalarla SQL Öğreniyorum",
    courseTeacher: "Enes Şen",
    coursePoint: "4.5",
    coursePrice: "450 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1597008641621-cefdcf718025?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3FsfGVufDB8fDB8fHww",
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
    courseTitle: "SQL Kursu : Sıfırdan Sektörün Yükseklerine | 2020",
    courseTeacher: "Ali Veli",
    coursePoint: "4.7",
    coursePrice: "500 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1662026911591-335639b11db6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNxbHxlbnwwfHwwfHx8MA%3D%3D",
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
    courseTitle: "Sorgularla Adım Adım SQL Veri Tabanı Programlama",
    courseTeacher: "Ayşe Yılmaz",
    coursePoint: "4.2",
    coursePrice: "300 ₺",
    courseImage:
      "https://plus.unsplash.com/premium_photo-1661878265739-da90bc1af051?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGF0YXxlbnwwfHwwfHx8MA%3D%3D",
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
    courseTitle: "C# ile DevExpress'de SQL Tabanlı Ticari Otomasyon Geliştirin",
    courseTeacher: "Mehmet Can",
    coursePoint: "4.8",
    coursePrice: "600 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGF0YXxlbnwwfHwwfHx8MA%3D%3D",
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
    courseTitle: "C# ile 20 Derste 20 Uygulamalı Proje",
    courseTeacher: "Elif Öztürk",
    coursePoint: "4.9",
    coursePrice: "750 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGF0YXxlbnwwfHwwfHx8MA%3D%3D",
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
    courseTitle: "Asp.Net Core Api SignalR ile QR Kodlu Sipariş Yönetimi",
    courseTeacher: "Serkan Kara",
    coursePoint: "4.6",
    coursePrice: "400 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZGF0YXxlbnwwfHwwfHx8MA%3D%3D",
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
    courseTitle: "Asp.Net Mvc5 ile Online Ticari Otomasyon",
    courseTeacher: "Ece Demir",
    coursePoint: "4.3",
    coursePrice: "550 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1495592822108-9e6261896da8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRhdGF8ZW58MHx8MHx8fDA%3D",
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
    courseTitle: "Asp.Net Core MultiShop Mikroservis E-Ticaret Kursu",
    courseTeacher: "Zeynep Güngör",
    coursePoint: "4.5",
    coursePrice: "350 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1488229297570-58520851e868?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRhdGF8ZW58MHx8MHx8fDA%3D",
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
    courseTitle: "C# İLE OOP TEMELLERİ: ADIM ADIM KATMANLI MİMARİ",
    courseTeacher: "Ömer Çelik",
    coursePoint: "4.7",
    coursePrice: "650 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1588600878108-578307a3cc9d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGRhdGF8ZW58MHx8MHx8fDA%3D",
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
    courseTitle: "C# |Sıfırdan İleri Seviyeye Komple C# Kursu +SQL",
    courseTeacher: "Hüseyin Arslan",
    coursePoint: "4.4",
    coursePrice: "450 ₺",
    courseImage:
      "https://plus.unsplash.com/premium_photo-1682126325927-0e6399d5d170?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGRhdGF8ZW58MHx8MHx8fDA%3D",
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
    courseTitle: "C# |Sıfırdan İleri Seviyeye Komple C# Kursu +SQL",
    courseTeacher: "Ali Veli",
    coursePoint: "4.7",
    coursePrice: "500 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1501526029524-a8ea952b15be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGRhdGF8ZW58MHx8MHx8fDA%3D",
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
    id: 12,
    courseTitle: "SQL Server Eğitim Videosu Serisi",
    courseTeacher: "Ayşe Yılmaz",
    coursePoint: "4.2",
    coursePrice: "300 ₺",
    courseImage:
      "https://yegitek.meb.gov.tr/meb_iys_dosyalar/2024_04/11172533_11114352_mnyt_yapay_zeka.jpg",
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
  }
];

export default courses;
