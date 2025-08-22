# easyRest Second Screen

İkinci monitörde sipariş özeti gösteren masaüstü app.

## Kurulum
```powershell
cd D:\GitHub\easyRest--FrontSecond
npm install
npm run start
```

## Dosyalar
- `main.js` - Electron ana dosya
- `renderer/index.html` - UI 
- `package.json` - Bağımlılıklar

## Angular entegrasyonu
- `SecondScreenClientService` oluştur
- `order.ts` içinde `updateOrderData()` ve `clearCustomerOrderWindow()` güncelle
- localhost:37251'e POST at

Detaylar için GitHub'daki README'yi inceleyin.
