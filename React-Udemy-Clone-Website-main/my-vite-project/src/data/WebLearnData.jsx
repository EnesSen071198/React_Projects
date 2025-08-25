const courses = [
  {
    id: 1,
    courseTitle: ".NET 9 ve React ile FullStack E-Ticaret Projesi Geliştirme",
    courseTeacher: "Enes Şen",
    coursePoint: "4.5",
    coursePrice: "450 ₺",
    courseImage:
      "https://plus.unsplash.com/premium_photo-1661963212517-830bbb7d76fc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8d2VifGVufDB8fDB8fHww",
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
    courseTitle: "Web Tasarım Uzmanı Olmak İçin: HTML, CSS ve Bootstrap Kursu",
    courseTeacher: "Ali Veli",
    coursePoint: "4.7",
    coursePrice: "500 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2VifGVufDB8fDB8fHww",
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
    courseTitle: "Sıfırdan Zirveye Web Tasarım | Komple Frontend Eğitimi",
    courseTeacher: "Ayşe Yılmaz",
    coursePoint: "4.2",
    coursePrice: "300 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2VifGVufDB8fDB8fHww",
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
    courseTitle: "Etik Hacker Olmak: Web Sızma Testleri ve Bug Bounty",
    courseTeacher: "Mehmet Can",
    coursePoint: "4.8",
    coursePrice: "600 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2VifGVufDB8fDB8fHww",
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
    courseTitle: "(120+Saat)Komple Uygulamalı Web Geliştirme Eğitimi | .NET",
    courseTeacher: "Elif Öztürk",
    coursePoint: "4.9",
    coursePrice: "750 ₺",
    courseImage:
      "https://plus.unsplash.com/premium_photo-1685086785077-ff65bf749544?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8d2VifGVufDB8fDB8fHww",
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
    courseTitle: "Sıfırdan İleri Düzey Web Geliştirme (HTML, CSS, Javascript)",
    courseTeacher: "Serkan Kara",
    coursePoint: "4.6",
    coursePrice: "400 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHdlYnxlbnwwfHwwfHx8MA%3D%3D",
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
    courseTitle: "Modern Web Geliştirme Kursu | Sıfırdan Sektörün Yükseklerine",
    courseTeacher: "Ece Demir",
    coursePoint: "4.3",
    coursePrice: "550 ₺",
    courseImage:
      "https://plus.unsplash.com/premium_photo-1678566153919-86c4ba4216f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHdlYnxlbnwwfHwwfHx8MA%3D%3D",
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
    courseTitle: "95+ Saatlik Komple Frontend Eğitimi | React, Angular, Vue",
    courseTeacher: "Zeynep Güngör",
    coursePoint: "4.5",
    coursePrice: "350 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHdlYnxlbnwwfHwwfHx8MA%3D%3D",
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
    courseTitle: "Sıfırdan Komple Web Geliştiricisi Olma Kursu - YAZILIMCI OL",
    courseTeacher: "Ömer Çelik",
    coursePoint: "4.7",
    coursePrice: "650 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHdlYnxlbnwwfHwwfHx8MA%3D%3D",
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
    courseTitle: "Modern Web Geliştirme Kursu | Sıfırdan İleri Seviyeye",
    courseTeacher: "Hüseyin Arslan",
    coursePoint: "4.4",
    coursePrice: "450 ₺",
    courseImage:
      "https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdlYnxlbnwwfHwwfHx8MA%3D%3D",
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
    courseTitle: "Komple Uygulamalı Web Geliştirme Eğitimi",
    courseTeacher: "Ali Veli",
    coursePoint: "4.7",
    coursePrice: "500 ₺",
    courseImage:
      "https://www.ekoturk.com/wp-content/uploads/2024/01/1687260970494.png",
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
    courseTitle: "HTML & CSS for Beginners",
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
