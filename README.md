# Puzzle Cam

Photobooth interaktif berbasis web yang dikendalikan pakai gerakan tangan. Bikin bingkai pakai jari, susun puzzle fotomu dengan gerakan mencubit, lalu hias hasilnya dengan stiker dan warna bingkai. Semuanya jalan langsung di browser, tanpa install aplikasi tambahan.

> **Ini adalah hasil recode.** Proyek ini bukan dibuat dari nol. Base code-nya berasal dari **[Shafira0605/puzzle_cam](https://github.com/Shafira0605/puzzle_cam)** (judul aslinya *Scrapbook Puzzle Cam*). Recode-nya dikerjakan oleh **Ibas** di **[IbasAnakMama/Puzzle-Cam](https://github.com/IbasAnakMama/Puzzle-Cam)**. Semua kredit untuk ide dan logika dasar aplikasinya tetap milik pembuat aslinya.

---

## Apa itu recode?

Recode artinya menulis ulang atau memodifikasi kode yang sudah ada milik orang lain, lalu mengembangkannya jadi versi sendiri. Ide dan logika dasarnya tetap dipakai, tapi tampilan, fitur, atau cara kerjanya diubah dan ditambah sesuai kreativitas orang yang me-recode.

Recode berbeda dengan menjiplak. Pembuat aslinya tetap dikreditkan, base code-nya disebutkan terang-terangan, dan hasilnya punya perubahan yang nyata. Makanya README ini mencantumkan repo asli di atas.

---

## Yang berubah di versi recode ini

Logika inti (deteksi tangan, capture, puzzle, editor) sengaja dibiarkan sama seperti aslinya. Yang diubah ada di tampilan dan interaksi:

- **Ganti nama** dari Scrapbook Puzzle Cam jadi **Puzzle Cam**.
- **Tema warna baru**: dari coklat krem jadi violet, pink, dan cyan. Warna garis grid dan frame di canvas kamera juga diganti supaya jelas terlihat di webcam.
- **Font baru** (Fredoka, Nunito, Caveat, Space Mono) supaya terasa lebih playful.
- **Background aurora** di landing page dan layar awal, bergerak pelan dengan gradasi warna.
- **Jejak kilau kursor**: kursor meninggalkan bintang warna-warni.
- **Ledakan konfeti** setiap klik, dan **hujan konfeti** saat puzzle berhasil diselesaikan.
- **Efek hover magnet**: polaroid, stiker, dan photo strip terangkat dan sedikit tertarik ke arah kursor.
- **Stiker pop** dengan animasi lompat dan konfeti saat diklik.
- **Ripple** di semua tombol.
- **Scroll reveal** dan progress bar di landing page.
- **Easter egg**: tekan tombol **P** untuk hujan konfeti.
- **Footer kredit** di bagian bawah halaman.

---

## Fitur utama (dari versi asli)

- **Hand-Gesture Capture**: buat bingkai pakai jari dan jempol kedua tangan di depan kamera, foto diambil otomatis.
- **Sliding Puzzle Minigame**: foto diacak jadi puzzle, susun dengan gerakan mencubit (*pinch*), kunci dengan kepalan tangan (*fist*).
- **Photobooth Layouts**: pilih strip 3 foto, 4 foto, atau grid 2x2.
- **Filter**: Normal, Black & White, dan Vintage.
- **Scrapbook Editor**: ganti warna bingkai dan tempel stiker dengan drag-and-drop.
- **Printing Animation**: animasi mesin cetak sebelum masuk ke mode edit.

---

## Cara menjalankan di komputer lokal

Aplikasi ini berjalan murni di frontend, tapi browser hanya mengizinkan akses webcam lewat server lokal (atau HTTPS), jadi tidak bisa dibuka dengan klik dua kali pada `index.html`.

### 1. Clone repositori

```bash
git clone https://github.com/IbasAnakMama/Puzzle-Cam.git
cd Puzzle-Cam
```

### 2. Jalankan local server

Pakai ekstensi **Live Server** di VSCode, atau pakai Python:

```bash
python -m http.server 8000
```

### 3. Buka di browser

Disarankan Google Chrome atau Microsoft Edge:

```text
http://localhost:8000
```

Catatan: koneksi internet diperlukan saat pertama kali dibuka karena aplikasi mengunduh model pelacak tangan dari Google MediaPipe, plus font dan Tailwind dari CDN.

---

## Cara bermain

1. Pilih **layout** dan **filter**, lalu klik **Start Creating**.
2. Di depan kamera, bentuk bingkai pakai telunjuk dan jempol kedua tanganmu.
3. Aplikasi mengambil gambar lalu mengacaknya jadi puzzle.
4. Cubit (*pinch*) dan geser tanganmu untuk memindahkan kepingan.
5. Kalau puzzle sudah tersusun, kepalkan tangan (*fist*) untuk mengunci.
6. Ulangi sampai semua slot di strip foto terisi.
7. Tunggu animasi printing, lalu hias fotomu di editor dengan stiker dan warna bingkai.
8. Simpan hasilnya.

---

## Struktur file

```text
Puzzle-Cam/
├── index.html      # tampilan halaman
├── app.js          # logika utama: gesture, puzzle, capture, editor
├── fx.js           # efek interaktif tambahan (hasil recode)
└── css/
    └── styles.css  # styling
```

---

## Teknologi

- HTML5 dan Vanilla JavaScript (ES Modules)
- CSS3 dan Tailwind CSS
- Google MediaPipe (deteksi kerangka tangan real-time)
- HTML5 Canvas API (filter, puzzle, editor stiker)

---

## Rencana update berikutnya

- [ ] Efek suara kecil saat kepingan puzzle terpasang dan saat puzzle selesai
- [ ] Mode gelap (dark mode)
- [ ] Pilihan tingkat kesulitan puzzle (3x3, 4x4, 5x5) dengan timer dan hitungan langkah
- [ ] Lebih banyak stiker, frame, dan filter baru
- [ ] Tombol bagikan hasil foto langsung ke media sosial
- [ ] Tampilan yang lebih rapi untuk layar HP dan tablet
- [ ] Galeri riwayat foto yang tersimpan di browser

---

## Kredit

- **Base code dan ide asli:** [Shafira0605](https://github.com/Shafira0605) lewat [puzzle_cam](https://github.com/Shafira0605/puzzle_cam)
- **Recode, tampilan baru, dan efek interaktif:** [Ibas (IbasAnakMama)](https://github.com/IbasAnakMama) lewat [Puzzle-Cam](https://github.com/IbasAnakMama/Puzzle-Cam)
- **Deteksi tangan:** [Google MediaPipe](https://developers.google.com/mediapipe)

*Recode by Ibas, berdasarkan karya Shafira0605.*
