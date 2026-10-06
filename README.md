# 🚀 PAÜ Medya - 7/24 Ücretsiz Web Sitesi Yayınlama ve Özel Domain Rehberi

Bu proje **PAÜ Medya (`@pau.medya`)** için Pamukkale Üniversitesi öğrencilerinin etkinlikleri, mizah paylaşımlarını, duyuruları, yemekhane menülerini ve anonim itirafları takip edebileceği şekilde geliştirilmiştir.

---

## 🌐 1. Sitenizi 7/24 ÜCRETSİZ ve Kesintisiz Yayınlama (Vercel)

Web sitenizin sunucu kapama/açma derdi olmadan 7 gün 24 saat ücretsiz yayında kalması için **Vercel** veya **Netlify** kullanabilirsiniz.

### 📌 Adım Adım Yayınlama (Sadece 2 Dakika):

1. **Vercel Hesabı Oluşturun:**
   - [vercel.com](https://vercel.com) adresine gidin.
   - "Sign Up" butonuna tıklayarak ücretsiz (Hobby) hesabınızı açın.

2. **Projenizi Yükleyin:**
   - Vercel Dashboard ekranında **"Add New" -> "Project"** butonuna tıklayın.
   - Bilgisayarınızdaki `pau_medya_website` klasörünü Vercel ekranına sürükleyip bırakın (veya GitHub hesabınız üzerinden bağlayın).

3. **Yayınlama (Deploy):**
   - **"Deploy"** butonuna basın.
   - Siteniz 30 saniye içinde canlıya alınacak ve size özel `paumedya.vercel.app` şeklinde **ücretsiz 7/24 bağlantınız** oluşturulacaktır!

---

## 🔗 2. Özel Domain (Alan Adı) Bağlama Rehberi

Vercel size varsayılan olarak `paumedya.vercel.app` verir. Ancak özel bir alan adınız varsa (`.com`, `.net`, `.com.tr` vb.):

1. Vercel panelinizde projenize tıklayın.
2. **Settings -> Domains** sekmesine gidin.
3. Almış olduğunuz alan adını (örneğin `paumedya.com`) buraya yazıp **"Add"** deyin.
4. Vercel size verilen **DNS (CNAME / A)** değerlerini gösterecektir. Domain'i satın aldığınız firmanın (GoDaddy, İsimtescil, Niohosting vb.) DNS yönetim paneline bu değerleri ekleyin.
5. 5-10 dakika içinde özel domaininiz SSL sertifikasıyla (HTTPS) **otomatik ve ücretsiz** olarak aktifleşecektir.

---

## 📁 Proje Dosya Yapısı

- `index.html`: Ana sayfa, Instagram biyografi tasarımı, etkinlikler, mizah, yemekhane menüsü ve anonim modal.
- `style.css`: Modern Glassmorphism (cam tasarımı), neon mavi teması, responsive (mobil) düzen.
- `app.js`: Etkinlik filtreleme, beğeni dinamikleri, yemekhane menü değiştiricisi ve form bildirimleri.
- `assets/`:
  - `logo.jpg`: PAÜ Medya 3D özel logo ikonu.
  - `campus.jpg`: Pamukkale Üniversitesi kampüs ve traverten temalı arka plan görseli.

---

🎉 **PAÜ Medya'ya Yayın Hayatında Başarılar Dileriz!**
