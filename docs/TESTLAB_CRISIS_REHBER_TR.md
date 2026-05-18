# TestLab Crisis — Oyun Rehberi + Proje Haritası (TR)

Bu doküman iki şeyi aynı yerde toplar:

1) Hiç bilmeyen biri için oyunun nasıl oynandığını adım adım anlatır.
2) Projede “kritik şeyler nerede” sorusuna dosya bazında cevap verir.

> Not: Bu proje **database kullanmıyor**. Tüm “sorular/şıklar” ve kriz senaryoları `src/data/` altında **statik JS dosyalarında** durur. Kayıt alma (save) varsa o da **tarayıcı localStorage** ile yapılır.

---

## 1) Oyun ne? Ne yapıyorum?

Sen bir “Lead Test Manager / QA Lead” gibi davranıyorsun.
Her bölümde (phase/question):

- Sana bir durum (context) veriliyor.
- 2x2 grid halinde 4 adet karar/yanıt (decision) sunuluyor.
- Sen **bir tanesini seçiyorsun**.
- Seçimin:
  - 7 adet metriği (KPI) artırıp/azaltıyor.
  - Skoruna puan ekliyor/çıkarıyor.
  - Ekranda ISO 29119 referanslı geri bildirim (feedback) gösteriyor.

Toplamda 12 soru/phase var. En sonda “result” ekranında bir sonuç/ending ve harf notu (S/A/B/C/F) alıyorsun.

---

## 2) Kurulum ve çalıştırma (en kısa)

Projeyi terminalden çalıştırmak için (Windows / PowerShell):

```powershell
npm install
npm run dev
```

Terminal URL verir (genelde `http://localhost:5173`). Tarayıcıda aç.

---

## 3) Oyun nasıl oynanır? (0’dan anlatım)

### Adım 1 — Intro ekranı
- Oyunun mantığı anlatılır.
- “New Simulation” ile yeni oyun başlatırsın.
- Daha önce oyun yarım kaldıysa “Resume” görünebilir.

### Adım 2 — Senaryo seçimi
3 senaryodan birini seçersin:
- Banking
- Healthcare
- Ecommerce

Bu seçim, hangi soru setinin (hangi senaryo dosyasının) kullanılacağını belirler.

### Adım 3 — Game ekranı (asıl oyun)
Bu ekranda:

1) Üstte **metric bar** (7 KPI) görürsün.
2) Ortada “Situation Briefing” yani sorunun bağlamı (context) vardır.
3) Altta 4 karar çıkar. Sadece **bir karar** seçebilirsin.
4) Seçince bir “Feedback modal” açılır:
   - Neden iyi/kötü olduğuna dair açıklama
   - ISO referansı
   - Metric delta (hangi metric kaç değişti)

Sonra bir sonraki phase’e ilerlersin.

### Adım 4 — Crisis Event (bazı phase’lerde)
Bazı phase’lerde “CRISIS” olayı tetiklenir.
- Bu, normal sorudan ayrı bir popup’tır.
- Yine seçenek seçersin.
- Seçim metric’leri ve skoru etkiler.

### Adım 5 — Result ekranı
12 phase bitince:
- Final score hesaplanır
- Harf notu çıkar (S/A/B/C/F)
- “Outcome” (başarı/başarısızlık gibi ending) belirlenir.

---

## 4) Metric’ler (7 KPI) nedir?

Metric’ler 0–100 aralığında tutulur.
Başlangıçta sabit değerlerle başlar (senaryo seçince resetlenir).

### Metric listesi
- `testCoverage` — test kapsamı
- `defectDetection` — bug yakalama etkinliği
- `stakeholderTrust` — paydaş güveni
- `teamMorale` — ekip morali
- `budgetEfficiency` — bütçe verimliliği
- `timelinePressure` — zaman baskısı (**düşük olması daha iyi**) 
- `riskExposure` — risk maruziyeti (**düşük olması daha iyi**)

> “Inverted” metric: `timelinePressure` ve `riskExposure` için sayı azaldıkça daha iyi.

### Metric’ler nasıl değişiyor?
Her decision içinde `metricDeltas` var. Örnek:

```js
metricDeltas: { stakeholderTrust: 10, riskExposure: -8 }
```

Oyun bunu mevcut değere ekler. Sonra 0–100 aralığına sıkıştırır.

**Önemli:** “Yanlış cevap” diye bir kavram kodda otomatik hesaplanmıyor.
“Yanlış/doğru” etkisi senaryoda yazan delta ve `quality` alanıyla belirleniyor.

---

## 5) Score (puan) nasıl hesaplanıyor?

Skor iki yerden gelir:

1) Her normal decision seçince eklenen puan
2) Oyun bitince “final metric score” (metric’lere göre ağırlıklı puan)

### Harf notu
Skorun toplamına göre:
- 850+ → S
- 700+ → A
- 550+ → B
- 400+ → C
- altı → F

---

## 6) Save / Resume var mı? Database mi?

- Database yok.
- Save sistemi tarayıcı `localStorage` kullanır.
- Oyun “game” ekranındayken otomatik save eder.
- “result” ekranına geçince save’i temizler.

---

# 2) Proje Haritası — “Nerede ne var?”

Aşağıda kritik parçaların **dosya bazında** haritası var.

## A) Sorular/Şıklar (asıl içerik)
- Senaryo verileri:
  - `src/data/scenarios/banking.js`
  - `src/data/scenarios/healthcare.js`
  - `src/data/scenarios/ecommerce.js`

Bu dosyalarda her phase için:
- `context` → sorunun metni
- `decisions[]` → şıklar
- `metricDeltas` → metric etkisi
- `quality` → best/good/neutral/bad
- `feedback` → açıklama

## B) Kriz olayları (Crisis)
- `src/data/crisisEvents.js`

Her senaryo için kriz event listesi ve seçenekleri burada.

## C) Phase meta bilgisi
- `src/data/phases.js`

`hasCrisisEvent` gibi phase “meta” özellikleri burada.

## D) Oyun state’i ve iş kuralları (en kritik)
- Başlangıç state + metric config:
  - `src/state/initialState.js`

- Reducer (decision uygulanır, phase ilerler, game biter):
  - `src/state/gameReducer.js`

- Hook (action wrapper):
  - `src/hooks/useGameState.js`

## E) Metric hesaplama / yardımcılar
- Delta uygulama + clamp (0–100):
  - `src/utils/metricHelpers.js`

- Skorlama:
  - `src/utils/scoring.js`

- Final outcome (ending) belirleme:
  - `src/utils/outcomeCalculator.js`

## F) UI akışı (hangi ekranlar var?)
- Ekran yönlendirme:
  - `src/App.jsx`

- Ekranlar:
  - `src/components/screens/IntroScreen.jsx`
  - `src/components/screens/ScenarioSelect.jsx`
  - `src/components/screens/GameScreen.jsx`
  - `src/components/screens/ResultScreen.jsx`
  - `src/components/screens/FeedbackModal.jsx`
  - `src/components/screens/CrisisPopup.jsx`

## G) Save/Resume (localStorage)
- `src/state/storageService.js`
- `src/hooks/useSaveLoad.js`

---

# 3) PDF’e dönüştürme (2 pratik yol)

## Yol 1 — VS Code ile (kolay)
1) Bu dosyayı aç: `docs/TESTLAB_CRISIS_REHBER_TR.md`
2) VS Code’da “Markdown PDF” benzeri bir eklentiyle Export → PDF yap.

## Yol 2 — Terminal ile (komutla)
Aşağıdaki komut `md-to-pdf` aracıyla PDF üretir (paket kurmadan `npx` ile):

```powershell
npx md-to-pdf docs/TESTLAB_CRISIS_REHBER_TR.md
```

Çıktı aynı klasörde `.pdf` olarak oluşur.

> Eğer `npx` ilk kez indirirken bekleme olursa normal.

---

## 4) Sık sorulanlar

### “Yanlış cevap metric’i artırıyor mu?”
Bazen evet. Çünkü:
- Bazı metric’lerde artış iyi (`stakeholderTrust`)
- Bazılarında artış kötü (`riskExposure` inverted)
- Ne olacağı tamamen `metricDeltas` ile belirleniyor.

### “Sorular nereden geliyor?”
`src/data/scenarios/*` dosyalarından.

### “Database var mı?”
Yok.

---

## 5) İstersen beraber ilerleyelim

İstersen şunlardan birini senin için kodlayabilirim:
1) Senaryoya göre farklı başlangıç metric seti (banking/healthcare/ecommerce ayrı)
2) “Quality = bad” ise mutlaka belirli metric’leri kötüleştiren tutarlı bir kural seti
3) Oyun içi “help” sayfası/overlay (dokümanın kısaltılmış hali)
