<template>

  <!-- ── HERO ── -->
  <PageHero
    title="Safety & Health Office"
    subtitle="Committed to implementing Occupational Safety and Health across all factory areas for every employee, contractor and supplier."
    :breadcrumbs="[{ label: 'Home', to: '/' }, { label: 'Sustainability' }, { label: 'Safety & Health' }]"
  />

  <!-- ── K3 POLICY ── -->
  <section class="py-20 bg-white">
    <div class="max-w-5xl mx-auto px-10">

      <div class="flex items-center gap-4 mb-8 anim-item">
        <div class="w-12 h-12 rounded-2xl bg-[#14532d] flex items-center justify-center text-2xl flex-shrink-0">
          🛡️
        </div>
        <div>
          <span class="inline-block bg-green-100 text-green-700 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-1">
            K3 Policy
          </span>
          <h2 class="text-3xl font-black text-gray-900">Kebijakan K3</h2>
        </div>
      </div>

      <div class="space-y-4 text-gray-500 text-sm leading-relaxed anim-slide-right">
        <p>{{ policyDescription }}</p>
      </div>

    </div>
  </section>

  <!-- ── KOMITE K3 ── -->
  <section class="py-20 bg-[#14532d]">
    <div class="max-w-5xl mx-auto px-10">

      <div class="flex items-center gap-4 mb-10 anim-item">
        <div class="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center text-2xl flex-shrink-0">
          👥
        </div>
        <div>
          <span class="inline-block bg-green-800 text-green-200 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-1">
            Komite K3
          </span>
          <h2 class="text-3xl font-black text-white">P2K3 Committee</h2>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition anim-item">
          <div class="w-9 h-9 rounded-xl bg-green-500/30 flex items-center justify-center text-base mb-4">🏢</div>
          <h3 class="font-bold text-white text-sm mb-2">Safety Office & P2K3</h3>
          <p class="text-green-200/60 text-sm leading-relaxed">
            PT. Tanjungenim Lestari Pulp and Paper has a special section that accommodates the implementation of the K3 program, namely the Safety Office and the K3 Committee or the Occupational Safety and Health Management Committee (P2K3) consisting of management lines and employee representatives in each Department / Section.
          </p>
        </div>
        <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition anim-item" style="animation-delay: 0.1s">
          <div class="w-9 h-9 rounded-xl bg-green-500/30 flex items-center justify-center text-base mb-4">📋</div>
          <h3 class="font-bold text-white text-sm mb-2">Legal Authority</h3>
          <p class="text-green-200/60 text-sm leading-relaxed">
            The tasks and authority of P2K3 have been decided in the Decree of the Head of the South Sumatra Province Manpower and Transmigration Office No.254 / SK / Nakertrans / 2016. P2K3 in accordance with regulations of the Minister of Manpower has the duty to provide an output of consideration whether requested or not requested by management regarding aspects of occupational safety and health.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- ── K3 TARGET ── -->
  <section class="py-20 bg-white">
    <div class="max-w-5xl mx-auto px-10">

      <div class="flex items-center gap-4 mb-4 anim-item">
        <div class="w-12 h-12 rounded-2xl bg-[#14532d] flex items-center justify-center text-2xl flex-shrink-0">
          🎯
        </div>
        <div>
          <span class="inline-block bg-green-100 text-green-700 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-1">
            Target & Objective
          </span>
          <h2 class="text-3xl font-black text-gray-900">K3 Target and Objective</h2>
        </div>
      </div>

      <p class="text-gray-400 text-sm mb-10 ml-16 anim-item">
        Key performance targets set to ensure occupational safety and health excellence across all operations.
      </p>

      <div class="space-y-3">
        <div v-for="(target, i) in k3Targets" :key="i"
          class="flex gap-4 bg-green-50 border border-green-100 rounded-xl p-5 hover:border-green-300 hover:bg-green-100/50 transition group anim-item"
          :style="{ animationDelay: (i * 0.08) + 's' }">
          <div class="w-9 h-9 rounded-xl bg-[#14532d] text-white font-black text-xs flex items-center justify-center flex-shrink-0 group-hover:bg-green-700 transition">
            {{ String(i + 1).padStart(2, '0') }}
          </div>
          <p class="text-gray-600 text-sm leading-relaxed self-center">{{ target }}</p>
        </div>
      </div>

    </div>
  </section>

  <!-- ── PROGRAM K3 ── -->
  <section class="py-20 bg-[#14532d]">
    <div class="max-w-5xl mx-auto px-10">

      <div class="flex items-center gap-4 mb-4 anim-item">
        <div class="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center text-2xl flex-shrink-0">
          ⚙️
        </div>
        <div>
          <span class="inline-block bg-green-800 text-green-200 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-1">
            Program K3
          </span>
          <h2 class="text-3xl font-black text-white">K3 Programs</h2>
        </div>
      </div>

      <p class="text-green-200/60 text-sm leading-relaxed mb-10 ml-16 max-w-3xl anim-item">
        In achieving continuous improvement and ensuring that the system is well implemented, PT. Tanjungenim Lestari Pulp and Paper organizes K3 efforts that are contained in the K3 program. K3 program activities become a program that is integrated with the company's operational processes so that there is a mutually beneficial synergy without reducing one part. Some of the K3 programs carried out in 2019 are:
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-for="(program, i) in k3Programs" :key="i"
          class="flex gap-4 bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-5 hover:bg-white/15 transition group anim-item"
          :style="{ animationDelay: (i * 0.05) + 's' }">
          <div class="w-8 h-8 rounded-lg bg-green-500 text-white font-black text-xs flex items-center justify-center flex-shrink-0 group-hover:bg-green-400 transition">
            {{ String(i + 1).padStart(2, '0') }}
          </div>
          <p class="text-green-200/80 text-sm leading-relaxed self-center">{{ program }}</p>
        </div>
      </div>

      <!-- Slider Foto -->
      <div class="mt-12 relative rounded-2xl overflow-hidden shadow-xl aspect-video anim-item">
        <img
          v-for="(img, i) in programImages"
          :key="i"
          :src="img"
          alt="K3 Training Program"
          class="absolute inset-0 w-full h-full object-cover"
          :style="{ opacity: currentImg === i ? 1 : 0, transition: 'opacity 0.8s ease-in-out' }"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

        <button @click="manualImgNav(prevImg)"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
          ‹
        </button>
        <button @click="manualImgNav(nextImg)"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
          ›
        </button>

        <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          <button v-for="(_, i) in programImages" :key="i" @click="manualImgNav(() => currentImg = i)"
            class="h-1.5 rounded-full transition-all duration-500 cursor-pointer"
            :class="currentImg === i ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/60'">
          </button>
        </div>
      </div>
      <p class="text-center text-green-200/60 text-xs mt-3 italic anim-item">
        K3 Training & Emergency Response Program — PT. Tanjungenim Lestari Pulp and Paper
      </p>

    </div>
  </section>

  <OfficeCards />

    <FooterGlobal />

</template>

<script setup>
import PageHero from '../../components/PageHero.vue'
import OfficeCards from '@/components/OfficeCards.vue'
import FooterGlobal from '@/components/FooterGlobal.vue'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import api from '../../services/api'

const policyDescription = ref('')
const k3Targets = ref([])
const k3Programs = ref([])
const programImages = ref([])
const loading = ref(true)
const error = ref(null)

// ─── Image Slider ─────────────────────────────────────────────
const currentImg = ref(0)
let imgTimer = null

const nextImg = () => { currentImg.value = (currentImg.value + 1) % programImages.value.length }
const prevImg = () => { currentImg.value = (currentImg.value - 1 + programImages.value.length) % programImages.value.length }
const startImgTimer = () => { imgTimer = setInterval(nextImg, 5000) }
const stopImgTimer = () => { clearInterval(imgTimer) }
const manualImgNav = (fn) => { stopImgTimer(); fn(); startImgTimer() }

// ─── Scroll Observer ──────────────────────────────────────────
let observer = null

onMounted(async () => {
  await nextTick()
  initObserver()
  startImgTimer()

  try {
    loading.value = true
    error.value = null

    const [policiesRes, targetsRes, programsRes, slidersRes] = await Promise.all([
      api.get('/safety-policies'),
      api.get('/safety-k3-targets'),
      api.get('/safety-k3-programs'),
      api.get('/safety-sliders'),
    ])

    policyDescription.value = policiesRes.data.data?.[0]?.description || ''

    k3Targets.value = targetsRes.data.data.map(item => item.description)
    k3Programs.value = programsRes.data.data.map(item => item.description)
    programImages.value = slidersRes.data.data.map(item => item.image_url)

    await nextTick()
    document.querySelectorAll('.anim-item, .anim-slide-right, .anim-slide-left').forEach(el => {
      if (!el.classList.contains('anim-visible')) {
        observer.observe(el)
      }
    })
  } catch (err) {
    error.value = err.message || 'Failed to load data'
  } finally {
    loading.value = false
  }
})

onUnmounted(() => {
  if (observer) {observer.disconnect()}
  stopImgTimer()
})

const initObserver = () => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-visible')
      } else {
        entry.target.classList.remove('anim-visible')
      }
    })
  }, { 
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  })

  document.querySelectorAll('.anim-item, .anim-slide-right, .anim-slide-left').forEach(el => {
    observer.observe(el)
  })
}
</script>

<style scoped>
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.anim-fade-up { animation: fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

@keyframes fadeRight {
  from { opacity: 0; transform: translateX(-24px); }
  to { opacity: 1; transform: translateX(0); }
}
.anim-fade-right { animation: fadeRight 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

.anim-item {
  opacity: 0; transform: translateY(30px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.anim-item.anim-visible { opacity: 1; transform: translateY(0); }

.anim-slide-right {
  opacity: 0; transform: translateX(-40px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.anim-slide-right.anim-visible { opacity: 1; transform: translateX(0); }

.anim-slide-left {
  opacity: 0; transform: translateX(40px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.anim-slide-left.anim-visible { opacity: 1; transform: translateX(0); }


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