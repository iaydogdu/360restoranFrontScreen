# 🚀 Otomatik Update Sistemi Kurulum Rehberi

## ✅ Yapılan Değişiklikler

- ✅ Electron autoUpdater modülü entegre edildi
- ✅ GitHub Releases desteği eklendi
- ✅ Otomatik güncelleme kontrolleri (30 dakikada bir)
- ✅ Kullanıcı bildirimleri eklendi
- ✅ Update UI komponenti eklendi

## 🔧 Kurulum Adımları

### 1. GitHub Repository Ayarları

**main.js** dosyasında şu değerleri değiştirin:
```javascript
// 16. satır
owner: 'SIZIN_GITHUB_KULLANICI_ADINIZ',

// 17. satır  
repo: 'SIZIN_REPOSITORY_ADINIZ'
```

**package.json** dosyasında şu değerleri değiştirin:
```json
"publish": {
  "provider": "github",
  "owner": "SIZIN_GITHUB_KULLANICI_ADINIZ",
  "repo": "SIZIN_REPOSITORY_ADINIZ"
}
```

### 2. GitHub Personal Access Token

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. "Generate new token (classic)" tıklayın
3. **Permissions**: `repo` (full control) seçin
4. Token'ı kopyalayın

**Environment variable olarak ayarlayın:**
```bash
# Windows PowerShell
$env:GH_TOKEN = "SIZIN_GITHUB_TOKEN"

# Windows CMD
set GH_TOKEN=SIZIN_GITHUB_TOKEN

# Kalıcı olarak ayarlamak için System Properties → Environment Variables
```

### 3. Yeni Sürüm Yayınlama

#### Yöntem 1: Otomatik Publish (Önerilen)
```bash
# Sürüm numarasını güncelleyin
npm version patch  # 0.1.0 → 0.1.1
npm version minor  # 0.1.0 → 0.2.0  
npm version major  # 0.1.0 → 1.0.0

# Build ve GitHub'a publish et
npm run publish
```

#### Yöntem 2: Manuel Publish
```bash
# Sadece build et (publish etme)
npm run draft

# Sonra GitHub'da manuel release oluşturun
```

### 4. İlk Kurulum

1. **Repository'yi public yapın** (private repo için GitHub Pro gerekli)
2. İlk sürümü yayınlayın:
   ```bash
   npm run publish
   ```
3. GitHub'da Releases sekmesinde yayınlandığını kontrol edin

## 🔄 Güncelleme Süreci

### Otomatik Kontrol
- Uygulama başladığında 3 saniye sonra kontrol eder
- Her 10 dakikada bir otomatik kontrol yapar
- Yeni sürüm varsa otomatik indirir
- **TAM OTOMATİK**: Kullanıcı müdahalesi gerektirmez

### Kullanıcı Deneyimi
1. **Güncelleme Mevcut**: Mavi bildirim (sürüm numarası ile)
2. **İndiriliyor**: Progress log'ları (console'da)
3. **İndirme Tamamlandı**: Yeşil bildirim + 3 saniye sonra otomatik yeniden başlatma
4. **Hata**: Kırmızı bildirim
5. **Hiçbir Dialog Yok**: Arka plan uygulaması için tamamen otomatik

## 📋 Yeni Sürüm Çıkarma Checklist

- [ ] Kod değişikliklerini yap
- [ ] `package.json` → version numarasını artır
- [ ] `npm run publish` komutu çalıştır  
- [ ] GitHub Releases'de yayınlandığını kontrol et
- [ ] Test ortamında güncellemeyi test et

## 🛠️ Komutlar

```bash
# Development
npm start                # Uygulamayı çalıştır
npm run debug           # Debug modunda çalıştır

# Production
npm run dist            # Sadece build et (publish etme)
npm run publish         # Build + GitHub'a publish et
npm run draft           # Build et ama publish etme

# Version Management  
npm version patch       # Patch sürümü artır (0.1.0 → 0.1.1)
npm version minor       # Minor sürümü artır (0.1.0 → 0.2.0)
npm version major       # Major sürümü artır (0.1.0 → 1.0.0)
```

## 🚨 Sorun Giderme

### "GitHub token not found" hatası
- `GH_TOKEN` environment variable'ı doğru ayarlandığından emin olun
- Token'ın `repo` permission'ına sahip olduğunu kontrol edin

### "Repository not found" hatası  
- Repository adı ve owner doğru yazıldığından emin olun
- Repository public olduğundan emin olun

### Update çalışmıyor
- Internet bağlantısını kontrol edin
- GitHub'da yeni release olduğundan emin olun
- Console log'larını kontrol edin

## 📈 Alternatif Update Sunucuları

### Kendi Sunucunuz
```javascript
autoUpdater.setFeedURL({
  provider: 'generic',
  url: 'https://yourserver.com/updates/'
});
```

### Electron Forge ile
```bash
npm install --save-dev @electron-forge/cli
npm install --save-dev @electron-forge/publisher-github
```

## 🎯 Sonraki Adımlar

1. GitHub repository ayarlarını yapın
2. İlk release'i oluşturun  
3. Test ortamında güncellemeleri test edin
4. Production'a deploy edin

---
**Not**: Bu sistem sadece production build'lerde çalışır. Development modunda (`npm start`) update kontrolleri yapılmaz.
