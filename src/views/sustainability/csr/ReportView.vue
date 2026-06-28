<template>
  <!-- ═══ HERO ═══ -->
  <PageHero
    title="CSR Report"
    subtitle="Annual quarterly sustainability reports by PT. Tanjungenim Lestari Pulp and Paper."
    :breadcrumbs="[{ label: 'Home', to: '/' }, { label: 'Sustainability' }, { label: 'CSR' }, { label: 'CSR Report' }]"
  />

  <!-- ═══ REPORT LIST ═══ -->
  <section class="csrr-body">
    <div class="max-w-7xl mx-auto px-10">

      <div v-for="year in reports" :key="year.year" class="csrr-year-block">

        <!-- Year Header -->
        <div class="csrr-year-header">
          <div class="csrr-year-badge">{{ year.year }}</div>
          <div class="csrr-year-line"></div>
          <span class="csrr-year-label">CSR Report Fiscal Year {{ year.year }}</span>
        </div>

        <!-- Quarter Cards -->
        <div class="csrr-quarters">
          <div
            v-for="q in year.quarters"
            :key="q.label"
            class="csrr-card"
            :class="q.file ? 'csrr-card--available' : 'csrr-card--unavailable'"
            @click="q.file && openPdf(q.file)"
          >
            <!-- Icon -->
            <div class="csrr-card__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line v-if="q.file" x1="12" y1="18" x2="12" y2="12"/>
                <line v-if="q.file" x1="9" y1="15" x2="15" y2="15"/>
                <line v-else x1="9" y1="15" x2="15" y2="15"/>
              </svg>
            </div>

            <!-- Info -->
            <div class="csrr-card__info">
              <p class="csrr-card__quarter">{{ q.label }}</p>
              <p class="csrr-card__period">{{ q.period }}</p>
            </div>

            <!-- Action -->
            <div class="csrr-card__action">
              <span v-if="q.file" class="csrr-card__btn">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                View PDF
              </span>
              <span v-else class="csrr-card__na">Not Available</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <!-- ═══ PDF MODAL ═══ -->
  <Teleport to="body">
    <div v-if="activePdf" class="csrr-modal" @click.self="activePdf = null">
      <div class="csrr-modal__box">
        <div class="csrr-modal__header">
          <div class="csrr-modal__header-left">
            <div class="csrr-modal__pdf-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <span class="csrr-modal__title">{{ activePdfName }}</span>
          </div>
          <button class="csrr-modal__close" @click="activePdf = null">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <iframe :src="activePdf" class="csrr-modal__iframe"></iframe>
      </div>
    </div>
  </Teleport>

  <OfficeCards />
    
  <FooterGlobal />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PageHero from '../../../components/PageHero.vue'
import api from '../../../services/api'
import OfficeCards from '@/components/OfficeCards.vue'
import FooterGlobal from '@/components/FooterGlobal.vue'

const activePdf = ref(null)
const activePdfName = ref('')
const reports = ref([])
const loading = ref(true)

const quarterLabels = { 1: '1st Quarter', 2: '2nd Quarter', 3: '3rd Quarter', 4: '4th Quarter' }

onMounted(async () => {
  try {
    const res = await api.get('/csr-reports')
    const grouped = {}
    for (const r of res.data.data) {
      if (!grouped[r.year]) {
        grouped[r.year] = { year: r.year, quarters: [] }
      }
      grouped[r.year].quarters.push({
        label: quarterLabels[r.quarter] || `Quarter ${r.quarter}`,
        period: r.period || '',
        file: r.file_url || null,
        _q: r.quarter,
      })
    }
    for (const g of Object.values(grouped)) {
      g.quarters.sort((a, b) => a._q - b._q)
      g.quarters.forEach(q => delete q._q)
    }
    reports.value = Object.values(grouped).sort((a, b) => b.year - a.year)
  } catch (e) {
    console.error('Failed to load reports:', e)
  } finally {
    loading.value = false
  }
})

const openPdf = (fileUrl) => {
  activePdf.value = fileUrl.startsWith('http') ? fileUrl : `/${fileUrl}`
  activePdfName.value = fileUrl.split('/').pop().replace(/[-_]/g, ' ').replace('.pdf', '')
}
</script>

<style scoped>
/* ─── HERO ─────────────────────────────────────────────── */
.csrr-hero {
  position: relative;
  background: #0d1f17;
  padding: 4rem 0;
  overflow: hidden;
}
.csrr-hero__bg {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 75% 30%, rgba(34,197,94,0.1) 0%, transparent 55%),
    radial-gradient(circle at 10% 70%, rgba(16,185,129,0.07) 0%, transparent 45%);
  pointer-events: none;
}
.csrr-hero__content { position: relative; z-index: 1; }
.csrr-hero__breadcrumb {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(255,255,255,0.4);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
}
.csrr-sep { opacity: 0.35; }
.csrr-active { color: #4ade80; }
.csrr-hero__title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 900;
  color: #fff;
  letter-spacing: -0.02em;
  margin: 0 0 1rem;
  line-height: 1.05;
}
.csrr-hero__accent { color: #22c55e; }
.csrr-hero__sub {
  font-size: 1rem;
  color: rgba(255,255,255,0.5);
  max-width: 460px;
  line-height: 1.7;
  margin: 0 0 2rem;
}
.csrr-hero__divider {
  width: 52px;
  height: 3px;
  background: #22c55e;
  border-radius: 2px;
}

/* ─── BODY ──────────────────────────────────────────────── */
.csrr-body {
  background: #f8faf8;
  padding: 4rem 0 5rem;
}

/* ─── YEAR BLOCK ─────────────────────────────────────────── */
.csrr-year-block { margin-bottom: 3rem; }
.csrr-year-block:last-child { margin-bottom: 0; }

.csrr-year-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
}
.csrr-year-badge {
  flex-shrink: 0;
  background: #0d1f17;
  color: #4ade80;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  padding: 4px 14px;
  border-radius: 20px;
  border: 1px solid rgba(74,222,128,0.25);
}
.csrr-year-line {
  flex-shrink: 0;
  width: 20px;
  height: 2px;
  background: #22c55e;
  border-radius: 2px;
}
.csrr-year-label {
  flex: 1;
  min-width: 0;
  font-size: 1.1rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ─── QUARTER CARDS ──────────────────────────────────────── */
.csrr-quarters {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.csrr-card {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.875rem;
  min-height: 80px;
  transition: all 0.2s;
}
.csrr-card--available {
  cursor: pointer;
}
.csrr-card--available:hover {
  border-color: #86efac;
  box-shadow: 0 4px 20px rgba(34,197,94,0.1);
  transform: translateY(-2px);
}
.csrr-card--unavailable {
  opacity: 1;
  cursor: default;
}

.csrr-card__icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.csrr-card--available .csrr-card__icon {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #16a34a;
}
.csrr-card--unavailable .csrr-card__icon {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  color: #9ca3af;
}

.csrr-card__info { flex: 1; min-width: 0; }
.csrr-card__quarter {
  font-size: 0.875rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.csrr-card__period {
  font-size: 0.72rem;
  color: #9ca3af;
  margin: 0;
  white-space: nowrap;
}

.csrr-card__action { flex-shrink: 0; }
.csrr-card__btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
  border-radius: 8px;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 5px 10px;
  white-space: nowrap;
  transition: all 0.15s;
}
.csrr-card--available:hover .csrr-card__btn {
  background: #16a34a;
  color: #fff;
  border-color: #16a34a;
}
.csrr-card__na {
  font-size: 0.68rem;
  color: #d1d5db;
  font-weight: 600;
  white-space: nowrap;
}

/* ─── MODAL ──────────────────────────────────────────────── */
.csrr-modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.65);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
.csrr-modal__box {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  width: 100%;
  max-width: 960px;
  height: 88vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 24px 60px rgba(0,0,0,0.3);
}
.csrr-modal__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid #e5e7eb;
  background: #f9fafb;
  flex-shrink: 0;
}
.csrr-modal__header-left {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}
.csrr-modal__pdf-icon {
  width: 30px;
  height: 30px;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #16a34a;
  flex-shrink: 0;
}
.csrr-modal__title {
  font-size: 0.8rem;
  font-weight: 700;
  color: #374151;
  text-transform: capitalize;
}
.csrr-modal__close {
  width: 30px;
  height: 30px;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  background: transparent;
  border: 1px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.15s;
}
.csrr-modal__close:hover {
  background: #fee2e2;
  color: #dc2626;
  border-color: #fca5a5;
}
.csrr-modal__iframe {
  flex: 1;
  width: 100%;
  border: none;
}

/* ─── FOOTER BAR ─────────────────────────────────────────── */
.csrr-footer-bar {
  height: 5px;
  background: linear-gradient(90deg, #15803d 0%, #22c55e 50%, #86efac 100%);
}

/* ─── RESPONSIVE ─────────────────────────────────────────── */
@media (max-width: 1024px) {
  .csrr-quarters { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .csrr-quarters { grid-template-columns: 1fr; }
  .csrr-modal__box { height: 90vh; }
}


.contact-container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 40px;
}

.contact-header {
  text-align: center;
  margin-bottom: 48px;
}

.contact-label {
  color: #5F9E42;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 10px;
}

.contact-title {
  font-size: 32px;
  font-weight: 800;
  color: #18301f;
  letter-spacing: -0.02em;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

.contact-card {
  background: #ffffff;
  border: 1px solid #dcecd2;
  border-radius: 20px;
  padding: 28px 24px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.contact-card:hover {
  transform: translateY(-6px);
  border-color: #a9d68c;
  box-shadow: 0 16px 32px rgba(95, 158, 66, 0.12);
}

.contact-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: #eaf6e1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  color: #5F9E42;
}

.contact-icon svg {
  width: 22px;
  height: 22px;
}

.contact-city {
  font-size: 17px;
  font-weight: 700;
  color: #18301f;
  margin-bottom: 10px;
}

.contact-address {
  font-size: 13px;
  color: #6b7b66;
  line-height: 1.6;
  margin-bottom: 16px;
  font-weight: 400;
}

.contact-phone {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 600;
  color: #3b6d11;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-phone:hover {
  color: #27500a;
}

.contact-phone svg {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

.contact-section {
  background: linear-gradient(180deg, #ffffff 0%, #eef7e9 100%);
  padding: 80px 0 70px;
}

.contact-container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 40px;
}

.contact-header {
  text-align: center;
  margin-bottom: 48px;
}

.contact-label {
  color: #5F9E42;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 10px;
}

.contact-title {
  font-size: 32px;
  font-weight: 800;
  color: #18301f;
  letter-spacing: -0.02em;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

.contact-card {
  background: #ffffff;
  border: 1px solid #dcecd2;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.contact-card:hover {
  transform: translateY(-6px);
  border-color: #a9d68c;
  box-shadow: 0 16px 32px rgba(95, 158, 66, 0.15);
}

.contact-image {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: #eaf6e1;
}

.contact-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.contact-card:hover .contact-image img {
  transform: scale(1.06);
}

.contact-body {
  padding: 20px 18px 22px;
}

.contact-city {
  font-size: 18px;
  font-weight: 800;
  color: #1a4d8f;
  margin-bottom: 12px;
  letter-spacing: -0.01em;
}

.contact-address {
  font-size: 13px;
  color: #5a6b56;
  line-height: 1.6;
  margin-bottom: 16px;
  font-weight: 400;
}

.contact-phone {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 500;
  color: #2c3a2a;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-phone:hover {
  color: #3b6d11;
}

.contact-phone svg {
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  color: #5F9E42;
}
/* Responsif untuk Layar Handphone (Mobile) */
@media (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    gap: 15px;
    padding: 0 20px;
  }
  
  .footer-copyright {
    text-align: center; /* Di HP otomatis pindah ke tengah bawah agar rapi */
    width: 100%;
  }
  
  .footer-copyright p {
    font-size: 12px; /* Ukuran sedikit disesuaikan untuk layar kecil */
  }
}

.footer-info-section {
  background: #ffffff;
  border-top: 1px solid #e4efdb;
  padding: 56px 0;
}

.footer-info-container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 40px;
}
.footer-info-grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr 0.9fr;
  gap: 48px;
  align-items: start;
}

.footer-info-col {
  display: flex;
  flex-direction: column;
}

.footer-about-text {
  margin: 0;
  font-size: 14px;
  color: #7a8a76;
  line-height: 1.75;
  font-weight: 400;
}

.footer-logos-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  margin: 0;
  padding: 0;
}

.footer-logos-col {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 0;
  padding: 0;
}

.footer-logo-combined {
  width: 100%;
  max-width: 380px;
  height: auto;
  object-fit: contain;
  display: block;
}

.footer-contact-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 280px;
  margin: 0;
  padding: 0;
}

.footer-contact-row {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 14px;
  color: #5a6b56;
  font-weight: 400;
  line-height: 1.4;
  margin: 0;
}
.footer-contact-icon {
  width: 19px;
  height: 19px;
  flex-shrink: 0;
  color: #5F9E42;
}

/* ============ FOOTER ============ */
.site-footer {
  width: 100%;
  /* Warna hijau tua disesuaikan dengan identitas PT TEL pada gambar */
  background-color: #5F9E42; 
  padding: 25px 0; /* Memberikan ruang tinggi baris yang pas */
  margin-top: 40px; /* Jarak pemisah dari konten di atasnya */
}

.footer-container {
  display: flex;
  align-items: center;
  justify-content: center; /* DIUBAH: Membuat konten berkumpul di tengah */
  max-width: 1140px; /* Menyelaraskan lebar dengan konten atas website */
  margin: 0 auto;
  padding: 0 40px; /* Jarak aman agar teks tidak terlalu menempel ke pinggir layar */
}

/* Kolom Kiri Footer */
.footer-left-content {
  display: none; /* DIUBAH: Disembunyikan karena kosong, agar tidak memakan space */
}

/* Kolom Kanan Footer (Teks Copyright) */
.footer-copyright {
  text-align: center; /* DIUBAH: Memastikan teks rata tengah */
  width: 100%; /* Memastikan block mengambil ruang penuh untuk fungsi centering */
}

.footer-copyright p {
  font-family: Arial, sans-serif;
  font-size: 13px; /* Ukuran teks kecil, tipis, dan normal untuk footer */
  color: #ffffff;  /* Warna teks putih bersih agar kontras dengan background hijau */
  margin: 0;
  font-weight: normal;
  letter-spacing: 0.3px;
}
@media (max-width: 768px) {
  .footer-info-grid {
    grid-template-columns: 1fr !important;
    gap: 32px !important;
  }
  .footer-contact-col {
    max-width: 100% !important;
  }
  .footer-info-container,
  .contact-container {
    padding: 0 20px !important;
  }
  .contact-section {
    padding: 48px 0 40px;
  }
  .footer-info-section {
    padding: 36px 0;
  }
}
</style>