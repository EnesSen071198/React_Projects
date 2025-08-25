const courses = [
  {
    id: 1,
    courseTitle: "Learn React",
    courseTeacher: "Enes Şen",
    coursePoint: "4.5",
    coursePrice: "450 ₺",
    courseImage:
      "https://teknoerbilisim.com/tema/genel/uploads/haberler/yapay_zeka.jpg",
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
    courseTitle: "Master JavaScript",
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
    id: 3,
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
  },
  {
    id: 4,
    courseTitle: "Node.js and Backend Development",
    courseTeacher: "Mehmet Can",
    coursePoint: "4.8",
    coursePrice: "600 ₺",
    courseImage:
      "https://www.innova.com.tr/medias/Yapay_Zeka_ile_Kisisel_Finans_Yonetimi_Akilli_Butceleme_ve_Yatirim_1.jpg",
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
    courseTitle: "Advanced React Native",
    courseTeacher: "Elif Öztürk",
    coursePoint: "4.9",
    coursePrice: "750 ₺",
    courseImage:
      "https://mediatrend.mediamarkt.com.tr/wp-content/uploads/2024/07/Yapay-Zeka-Nereye-Gidiyor.webp",
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
    courseTitle: "Python Programming for Beginners",
    courseTeacher: "Serkan Kara",
    coursePoint: "4.6",
    coursePrice: "400 ₺",
    courseImage:
      "https://iakademi.com/wp-content/uploads/2023/09/yapay-zeka-nedir-nasil-gelistirilir.webp",
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
    courseTitle: "Full Stack Development with MERN",
    courseTeacher: "Ece Demir",
    coursePoint: "4.3",
    coursePrice: "550 ₺",
    courseImage:
      "https://d3g5ywftkpzr0e.cloudfront.net/wp-content/uploads/2023/07/13220529/Artificial-Intelligence-in-Indonesia-The-current-state-and-its-opportunities-1200x675.jpeg",
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
    courseTitle: "UI/UX Design Fundamentals",
    courseTeacher: "Zeynep Güngör",
    coursePoint: "4.5",
    coursePrice: "350 ₺",
    courseImage:
      "https://eu-images.contentstack.com/v3/assets/blt69509c9116440be8/bltdab34f69f74c72fe/65380fc40ef0e002921fc072/AI-thinking-Kittipong_Jirasukhanont-alamy.jpg?width=1280&auto=webp&quality=95&format=jpg&disable=upscale",
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
    courseTitle: "Data Science with Python",
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
    courseTitle: "Digital Marketing Masterclass",
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
