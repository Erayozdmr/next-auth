Next.js 14 + Auth0 + NextAuth.js Authentication System

Bu proje, OAuth tabanlı kimlik doğrulama sistemi ile kullanıcı girişini sağlayan ve yetkilendirme yapan bir örnek uygulamadır.  
Geliştirme süreci, SOLID prensipleri ve [12 Factor App](https://12factor.net/) ilkeleri dikkate alınarak yürütülmüştür.

 Teknolojiler & Araçlar

- Next.js 14 (App Router)
-  TypeScript
-  Tailwind CSS
-  NextAuth.js
-  Auth0 (OAuth2 Provider)
-  Google OAuth
-  JWT (JSON Web Tokens)
-  Jest (Test Framework)
-  Git / GitHub (Branching Strategy)

# Özellikler

-  Auth0 ve Google ile kullanıcı girişi
-  NextAuth.js ile JWT tabanlı oturum yönetimi
-  `middleware.ts` ile korunan sayfalara erişim kontrolü
-  `/login` yönlendirme sistemi
-  Test altyapısı ve örnek testler
-  12 Factor App uyumlu yapı
-  SOLID prensiplerine uygun modüler kod yapısı
-  TypeScript ile tam tip güvenliği

#  Proje Yapısı

next-auth/
├── app/
│ ├── login/
│ ├── dashboard/
│ └── api/
│ └── auth/[...nextauth]/route.ts
├── components/
├── lib/
│ └── authOptions.ts
├── middleware.ts
├── middleware.test.ts
├── types/
├── jest.config.ts
├── jest.setup.ts
├── .babelrc
├── .env.local.example
└── README.md

Ek Özellikler
Kullanıcı deneyimini artırmak için, görevde belirtilmemesine rağmen e-ticaret paneli tarzında modern ve kullanıcı dostu bir yönetim paneli tasarımı ve implementasyonu yapıldı.

# Kurulum

 1. Repository’yi Klonla

```bash
git clone https://github.com/Erayozdmr/next-auth.git
cd next-auth

2. Gerekli Paketleri Kur
npm install

# Geliştirme Ortamı Değişkenleri
Aşağıdaki .env.local değişkenlerini tanımlamalısınız.
Bu değerleri kendi Auth0 ve Google hesaplarınızdan almalısınız.

.env.local.example dosyasını .env.local olarak kopyalayın:


cp .env.local.example .env.local
.env.local (örnek)

AUTH0_CLIENT_ID=YOUR_AUTH0_CLIENT_ID
AUTH0_CLIENT_SECRET=YOUR_AUTH0_CLIENT_SECRET
AUTH0_ISSUER=YOUR_AUTH0_ISSUER

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

NEXTAUTH_SECRET=YOUR_RANDOM_SECRET
NEXTAUTH_URL=http://localhost:3000

# Çalıştırma
npm run dev

#Test Çalıştırma
npm run test

Örnek test dosyaları:

middleware.test.ts – Yetkilendirme middleware testi

login/page.test.tsx – Login sayfası render testi

dashboard/page.test.tsx – Korunan sayfa testi

# Middleware Koruma Sistemi
Aşağıdaki sayfalar JWT token olmadan erişilemez:

/dashboard

/profile

/admin

Yetkisiz erişim /login sayfasına yönlendirilir.

# Giriş Sayfası
Proje, özel olarak tasarlanmış /login sayfası ile Auth0 ve Google girişlerini tetikler.
Auth0’nun kendi hosted login ekranı kullanılmaz, özel frontend giriş arayüzü kullanılır.



# Branch Stratejisi
dev/v1.0.0: Tüm geliştirmeler bu branch üzerinden yapıldı.


prod/v1.0.0: Tamamlanan geliştirme buraya merge edilecek.


