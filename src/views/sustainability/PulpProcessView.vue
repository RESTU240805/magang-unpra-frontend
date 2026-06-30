<template>
  <div v-if="loading" class="flex items-center justify-center min-h-[60vh]">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
  </div>
  <div v-else-if="error" class="flex items-center justify-center min-h-[60vh]">
    <div class="text-center">
      <p class="text-red-600 font-semibold mb-2">Failed to load data</p>
      <p class="text-gray-500 text-sm">{{ error }}</p>
    </div>
  </div>
  <template v-else>
  <PageHero
    title="Pulp Process"
    subtitle="Explore the complete industrial pulp production process from raw logs to finished bales."
    :breadcrumbs="[{ label: 'Home', to: '/' }, { label: 'Sustainability' }, { label: 'Pulp Process' }]"
  />

  <!-- 3D Interactive Map -->
  <section class="bg-[#0a1208] py-10">
    <div class="max-w-7xl mx-auto px-4">
      <div class="anim-item rounded-xl overflow-hidden shadow-2xl border border-white/10">
        <PulpProcess3D />
      </div>
    </div>
  </section>

  <!-- Process Description -->
  <section class="py-16 bg-white">
    <div class="max-w-4xl mx-auto px-10">
      <h2 class="text-3xl font-black text-green-600 mb-6 anim-item">Pulp Process</h2>
      <p class="text-gray-600 text-sm leading-relaxed mb-6 anim-item">
        There are two main processes in the Pulp and Paper Mill, there are:
      </p>

      <div class="space-y-6">
        <div class="bg-green-50 rounded-xl p-6 border border-green-100 anim-item">
          <h3 class="text-lg font-bold text-gray-900 mb-2">1. Pulp Making Process</h3>
          <p class="text-gray-600 text-sm leading-relaxed">
            Pulp making process is represents the process by which wood or other lignocellulosic material
            that reduced to be fibrous mass. Pulp is produced at PT. TELPP is 450,000 Adt (BKP) / year
            or 1,430 Adt/BKPd.
          </p>
        </div>

        <div class="bg-red-50 rounded-xl p-6 border border-red-100 anim-item">
          <h3 class="text-lg font-bold text-gray-900 mb-2">2. Chemical Recovery Process</h3>
          <p class="text-gray-600 text-sm leading-relaxed">
            Chemical recovery process is the process to recover again cooking chemical (White Liquor)
            that used to cooked wood chip become pulp. White Liquor contains active chemical NaOH and
            Na&#8322;S. Design capacity for Chemical recovery process is 2400 TDS/d solid burning in Recovery Boiler.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Pulp Process Flow Diagram -->
  <section class="py-12 bg-gray-50">
    <div class="max-w-4xl mx-auto px-10">
      <h2 class="text-2xl font-black text-gray-900 text-center mb-8 anim-item">
        Pulp Process <span class="text-green-600">Flow</span>
      </h2>
      <div class="anim-item bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <img :src="'/pulp-process/all_process-2.jpg'" alt="Pulp Process Flow Diagram"
          class="w-full h-auto" />
      </div>
    </div>
  </section>

  <!-- Pulp Process Accordion -->
  <section class="py-16 bg-white">
    <div class="max-w-4xl mx-auto px-10">
      <h2 class="text-3xl font-black text-green-600 mb-8 anim-item">Pulp Process</h2>

      <div class="space-y-3">
        <div v-for="(section, i) in pulpSections" :key="i"
          class="border border-gray-200 rounded-xl overflow-hidden anim-item"
          :style="{ animationDelay: `${i * 0.08}s` }">
          <button @click="togglePulpSection(i)"
            class="w-full flex items-center justify-between px-6 py-4 text-left transition-colors cursor-pointer"
            :class="section.open ? 'bg-green-600 text-white' : 'bg-green-600 text-white hover:bg-green-700'">
            <span class="font-bold text-sm">{{ section.title }}</span>
            <svg class="w-5 h-5 transition-transform duration-300" :class="section.open ? 'rotate-180' : ''"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <div v-show="section.open" class="px-6 py-5 bg-gray-50">
            <img v-if="section.image_url" :src="section.image_url" :alt="section.title"
              class="w-full h-72 object-cover rounded-lg mb-4" />
            <p class="text-gray-600 text-sm leading-relaxed">{{ section.description }}</p>
            <div v-if="section.details" class="mt-4 space-y-2">
              <div v-for="(detail, j) in section.details" :key="j"
                class="flex items-start gap-3 text-sm">
                <span class="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></span>
                <span class="text-gray-600">{{ detail }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Warehouse Photo -->
  <section class="py-12 bg-gray-50">
    <div class="anim-item overflow-hidden shadow-lg">
      <img :src="'/pulp-process/IMG_6725.jpg'" alt="Finished Pulp Bales Warehouse"
        class="w-full h-[500px] object-cover" />
    </div>
  </section>

  <!-- Chemical Recovery Process -->
  <section class="py-16 bg-white">
    <div class="max-w-4xl mx-auto px-10">
      <h2 class="text-3xl font-black text-green-600 mb-4 anim-item">Chemical Recovery Process</h2>
      <p class="text-gray-600 text-sm leading-relaxed mb-8 anim-item">
        The chemical recovery cycle regenerates cooking chemicals and generates energy.
        Black liquor from the washing process is concentrated and burned to recover
        inorganic chemicals while producing steam for power generation.
      </p>

      <div class="flex flex-wrap gap-2 mb-8 anim-item">
        <button v-for="(tab, i) in recoveryTabs" :key="i"
          @click="activeRecoveryTab = i"
          class="px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all cursor-pointer border"
          :class="activeRecoveryTab === i
            ? 'bg-green-600 text-white border-green-600'
            : 'bg-white text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-600'">
          {{ tab }}
        </button>
      </div>

      <div class="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 anim-item">
        <img v-if="recoveryData[activeRecoveryTab]?.image_url"
          :src="recoveryData[activeRecoveryTab].image_url"
          :alt="recoveryData[activeRecoveryTab].title"
          class="w-full h-72 object-cover" />
        <div class="p-6">
          <h3 class="text-lg font-bold text-gray-900 mb-3">{{ recoveryData[activeRecoveryTab]?.title }}</h3>
          <p class="text-gray-600 text-sm leading-relaxed mb-4">{{ recoveryData[activeRecoveryTab]?.description }}</p>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="(spec, j) in recoveryData[activeRecoveryTab]?.specs" :key="j"
              class="bg-white rounded-lg p-4 border border-gray-100">
              <div class="text-xs text-gray-400 mb-1">{{ spec.label }}</div>
              <div class="text-sm font-bold text-gray-800">{{ spec.value }}</div>
            </div>
          </div>
        </div>
      </div>
      </div>
  
  </section>

  <OfficeCards />

    <FooterGlobal />
  </template>
</template>

<script setup>
import PageHero from '../../components/PageHero.vue'
import OfficeCards from '@/components/OfficeCards.vue'
import FooterGlobal from '@/components/FooterGlobal.vue'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import PulpProcess3D from '@/components/PulpProcess3D.vue'
import api from '../../services/api'

const pulpSections = ref([])
const recoveryData = ref([])
const loading = ref(true)
const error = ref(null)

function togglePulpSection(index) {
  pulpSections.value[index].open = !pulpSections.value[index].open
}

const activeRecoveryTab = ref(0)
const recoveryTabs = ['Evaporator', 'Recovery Boiler', 'Recausticizing', 'Lime Kiln']

let observer = null

onMounted(async () => {
  try {
    loading.value = true
    const [sectionsRes, recoveriesRes] = await Promise.all([
      api.get('/pulp-process-sections'),
      api.get('/pulp-process-recoveries')
    ])
    pulpSections.value = sectionsRes.data.data.map(s => ({ ...s, open: false }))
    recoveryData.value = recoveriesRes.data.data.map(r => ({
      ...r,
      specs: typeof r.specs === 'string' ? JSON.parse(r.specs) : r.specs
    }))
  } catch (err) {
    error.value = err.response?.data?.error || err.message || 'Failed to load data'
  } finally {
    loading.value = false
  }

  await nextTick()
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })
  document.querySelectorAll('.anim-item').forEach(el => observer.observe(el))
})

onUnmounted(() => {
  if (observer) {observer.disconnect()}
})
</script>

<style scoped>
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.anim-fade-up {
  animation: fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
@keyframes fadeRight {
  from { opacity: 0; transform: translateX(-24px); }
  to { opacity: 1; transform: translateX(0); }
}
.anim-fade-right {
  animation: fadeRight 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.anim-item {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.anim-item.anim-visible {
  opacity: 1;
  transform: translateY(0);
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
