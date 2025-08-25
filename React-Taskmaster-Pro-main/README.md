# 🎯 TaskMaster Pro

Profesyonel görev yönetimi ve üretkenlik uygulaması.

## ✨ Özellikler

- 🎯 **Gelişmiş Görev Yönetimi** - Kategori, öncelik, durum takibi
- 📝 **Not Alma Sistemi** - Markdown destekli zengin metin
- 📅 **Akıllı Takvim** - Görev entegrasyonu ve sürükle-bırak
- 🍅 **Pomodoro Timer** - Görev odaklı çalışma teknikleri
- 📊 **İlerleme Takibi** - Detaylı analitik ve raporlar
- 🔐 **Google Entegrasyonu** - Güvenli giriş ve veri senkronizasyonu
- 🎨 **Modern UI/UX** - Dark/Light tema desteği
- 📱 **Responsive Tasarım** - Tüm cihazlarda mükemmel deneyim

## 🚀 Kurulum

### Ön Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Adımlar

1. **Repoyu klonlayın:**
```bash
git clone <repository-url>
cd taskmaster-pro
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Google OAuth2 Kurulumu (Opsiyonel):**

Gerçek Google Authentication için:

a) [Google Cloud Console](https://console.cloud.google.com/) üzerinden yeni proje oluşturun

b) APIs & Services > Credentials bölümünden OAuth 2.0 Client ID oluşturun

c) APIs & Services > Library bölümünden Google Calendar API'yi etkinleştirin

d) Authorized JavaScript origins ekleyin:
   - `http://localhost:5173` (development) 
   - `http://localhost:5174` (development alternative)
   - Production domain'iniz

e) `.env` dosyası oluşturun:
```env
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id-here
REACT_APP_GOOGLE_API_KEY=your-google-api-key-here
REACT_APP_DEMO_MODE=false
```

f) API Key oluşturmak için:
   - APIs & Services > Credentials > CREATE CREDENTIALS > API key
   - API key'i kopyalayın ve `.env` dosyasına ekleyin

4. **Uygulamayı başlatın:**
```bash
npm run dev
```

## 🎮 Demo Mode

**Default olarak demo mode aktif!** Google hesabı olmadan tüm özellikleri test edebilirsiniz.

Demo kullanıcı bilgileri:
- **İsim:** Demo Kullanıcı
- **Email:** demo@taskmaster.com
- **Veri:** LocalStorage'da güvenle saklanır
- **Özellikler:** Tüm özellikler çalışır (sürükle-bırak, takvim, pomodoro, vb.)

## 📁 Proje Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── Auth/           # Giriş sistemleri
│   ├── Calendar/       # Takvim bileşenleri
│   ├── Layout/         # Sayfa düzeni
│   ├── Pomodoro/       # Timer bileşenleri
│   ├── Progress/       # İstatistik bileşenleri
│   └── Tasks/          # Görev bileşenleri
├── pages/              # Ana sayfalar
├── store/              # Redux store
├── types/              # TypeScript tipleri
├── utils/              # Yardımcı fonksiyonlar
└── theme/              # UI tema ayarları
```

## 🛠️ Teknolojiler

- **Frontend:** React 18 + TypeScript + Vite
- **UI Library:** Material-UI 5
- **State Management:** Redux Toolkit
- **Styling:** Emotion + Material-UI theming
- **Date Handling:** date-fns
- **Drag & Drop:** @dnd-kit
- **Charts:** Chart.js + react-chartjs-2
- **Authentication:** Google OAuth2 API

## 📊 Özellik Detayları

### Görev Yönetimi
- ✅ Kategori sistemı (renkli etiketler)
- ✅ Öncelik seviyeleri (Yüksek, Orta, Düşük)
- ✅ Durum takibi (Başlamadı, Devam Ediyor, Tamamlandı, Beklemede, İptal)
- ✅ Alt görevler ve etiketler
- ✅ Son teslim tarihi ve hatırlatıcılar

### Takvim Entegrasyonu
- ✅ Görevleri takvimde görüntüleme
- ✅ Sürükle-bırak ile görev ekleme
- ✅ Aylık/haftalık/günlük görünümler
- ✅ Google Calendar senkronizasyonu

### Pomodoro Sistemi
- ✅ Özelleştirilebilir timer (25/5/15 dakika)
- ✅ Görev odaklı çalışma
- ✅ Günlük hedef takibi
- ✅ Detaylı istatistikler

### İlerleme ve Analitik
- ✅ Günlük/haftalık/aylık raporlar
- ✅ Görev tamamlama oranları
- ✅ Pomodoro istatistikleri
- ✅ Kategori bazlı analizler

## 🔐 Güvenlik

- Google OAuth2 ile güvenli kimlik doğrulama
- Kullanıcı verilerinin yerel şifrelenmesi
- CORS ve XSS koruması
- Güvenli token yönetimi

## 🎨 Tema Sistemi

- **Light Theme:** Aydınlık ve minimal tasarım
- **Dark Theme:** Göz dostu karanlık mod
- **System Theme:** Sistem tercihini takip eder
- **Custom Colors:** Marka renkleri ve kişiselleştirme

## 📱 Responsive Tasarım

- **Mobile First:** Mobil cihazlar öncelikli tasarım
- **Tablet Optimize:** Orta boy ekranlar için optimize
- **Desktop Enhanced:** Büyük ekranlarda gelişmiş deneyim

## 🚀 Production Deployment

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

Build dosyaları `dist/` klasöründe oluşturulur ve herhangi bir statik hosting servisinde yayınlanabilir.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'i push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Herhangi bir sorunuz için:
- Email: support@taskmaster.com
- GitHub Issues: [Issues sayfası](https://github.com/your-repo/issues)

---

**TaskMaster Pro** ile üretkenliğinizi artırın! 🚀