<template>
  <div class="bg-[#F8F9FA] text-zinc-900 font-sans antialiased overflow-x-hidden selection:bg-green-500 selection:text-white">

    <PageHero
      title="Forest Management"
      subtitle="Sustainable and responsible forest management for a greener future in South Sumatra."
      :breadcrumbs="[{ label: 'Home', to: '/' }, { label: 'Sustainability' }, { label: 'Forest Management' }]"
    />

    <section class="py-24 bg-gradient-to-b from-[#F8F9FA] to-white relative">
      <div class="max-w-6xl mx-auto px-6 md:px-12">
        
        <div class="text-center mb-20 anim-reveal-up">
          <span class="text-green-600 text-xs font-bold tracking-widest uppercase block mb-2">RAW MATERIALS</span>
          <h2 class="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight">Types of Wood Used</h2>
          <p class="text-zinc-500 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Pulp is produced from two types of wood sourced from sustainable industrial plantations.
          </p>
        </div>

        <div v-if="woodLoading" class="flex justify-center py-12">
          <div class="w-8 h-8 border-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div v-for="(item, i) in woodTypes" :key="item.ID || i"
            class="bg-[#0b2416] rounded-[28px] overflow-hidden group shadow-xl hover:shadow-[0_20px_40px_rgba(11,36,22,0.15)] hover:-translate-y-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between"
            :class="i % 2 === 0 ? 'anim-reveal-left' : 'anim-reveal-right'">
            <div class="p-8 pb-8">
              <div class="relative rounded-2xl overflow-hidden aspect-[16/10] mb-6 bg-zinc-950">
                <img :src="getImageUrl(item.image_url)" :alt="item.title" class="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-90 group-hover:opacity-100" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
              <span v-if="item.badge" class="inline-block bg-green-500/10 text-green-400 text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-md mb-4 border border-green-500/20">
                {{ item.badge }}
              </span>
              <h3 class="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">{{ item.title }}</h3>
              <p class="text-zinc-400 text-xs md:text-sm leading-relaxed font-light">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-white border-t border-zinc-100 overflow-hidden">
      <div class="max-w-6xl mx-auto px-6 md:px-12">

        <div class="max-w-3xl mx-auto text-center mb-16 anim-item">
          <span class="text-green-600 text-xs font-bold tracking-widest uppercase block mb-3">OUR APPROACH</span>
          <h2 class="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight mb-6">
            High Quality Pulp from <br />
            <span class="text-green-600 font-black">100% Sustainable Wood</span>
          </h2>
          <div v-if="approachLoading" class="flex justify-center py-6">
            <div class="w-8 h-8 border-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
          </div>
          <SafeHtml v-else class="space-y-5 text-zinc-500 text-sm leading-relaxed font-normal text-left" :html="approachDesc" />
        </div>

        <div class="relative rounded-3xl overflow-hidden shadow-2xl bg-zinc-100 aspect-[16/9] anim-item group">
          <img v-for="(slide, i) in sliders" :key="i"
            :src="getImageUrl(slide.image_url)" alt="Forest Management"
            class="absolute inset-0 w-full h-full object-cover"
            :style="{ opacity: currentSlide === i ? 1 : 0, transition: 'opacity 1s ease-in-out' }" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          <button @click="manualHeroNav(prevHeroSlide)"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-white/40">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button @click="manualHeroNav(nextHeroSlide)"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-white/40">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            <button v-for="(_, i) in sliders" :key="i" @click="manualHeroNav(() => goToHeroSlide(i))"
              class="h-1.5 rounded-full transition-all duration-500 cursor-pointer"
              :class="currentSlide === i ? 'w-8 bg-white' : 'w-3 bg-white/40 hover:bg-white/60'"></button>
          </div>
        </div>

      </div>
    </section>

    <section class="py-12 bg-white">
      <div class="max-w-6xl mx-auto px-6 md:px-12">
        <div class="relative bg-gradient-to-r from-[#031d10] to-[#0a351d] rounded-3xl overflow-hidden p-8 md:p-12 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-8 anim-reveal-up">
          <div class="absolute right-0 bottom-0 top-0 w-1/2 opacity-20 md:opacity-30 pointer-events-none select-none">
            <img src="/images/lokasi pabrik.jpeg" class="w-full h-full object-cover mix-blend-overlay scale-105 transition-transform duration-1000" />
          </div>
          <div class="relative z-10 max-w-xl">
            <span class="text-green-400 text-[10px] font-bold tracking-widest uppercase block mb-2">TOGETHER FOR A GREEN FUTURE</span>
            <h2 class="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
              Building a Sustainable Future <br />Through Responsible Forest Management
            </h2>
          </div>
        </div>
      </div>
    </section>

   <OfficeCards />

    <FooterGlobal />
  </div>
</template>

<script setup>
import PageHero from '../../components/PageHero.vue'
import OfficeCards from '@/components/OfficeCards.vue'
import SafeHtml from '@/components/SafeHtml.vue'
import FooterGlobal from '@/components/FooterGlobal.vue'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import api from '../../services/api'

const BASE_URL = import.meta.env.VITE_BASE_URL || (import.meta.env.DEV ? 'http://localhost:8080' : '')

let observer = null
let heroTimer = null

const currentSlide = ref(0)
const woodTypes = ref([])
const woodLoading = ref(true)
const sliders = ref([])
const approachDesc = ref('')
const approachLoading = ref(true)

const getImageUrl = (path) => {
  if (!path) {return ''}
  if (path.startsWith('http')) {return path}
  return `${BASE_URL}/${path.replace(/^\//, '')}`
}

const nextHeroSlide = () => { currentSlide.value = (currentSlide.value + 1) % sliders.value.length }
const prevHeroSlide = () => { currentSlide.value = (currentSlide.value - 1 + sliders.value.length) % sliders.value.length }
const goToHeroSlide = (i) => { currentSlide.value = i }
const startHeroTimer = () => { heroTimer = setInterval(nextHeroSlide, 5000) }
const stopHeroTimer = () => { clearInterval(heroTimer) }
const manualHeroNav = (fn) => { stopHeroTimer(); fn(); startHeroTimer() }

const fetchData = async () => {
  try {
    const [woodRes, approachRes, sliderRes] = await Promise.all([
      api.get('/forest-wood-types'),
      api.get('/forest-approach'),
      api.get('/forest-sliders')
    ])
    woodTypes.value = woodRes.data?.data || []
    approachDesc.value = approachRes.data?.data?.description || ''
    sliders.value = sliderRes.data?.data || []
  } catch (e) {
    console.error('Failed to load forest management data:', e)
  } finally {
    woodLoading.value = false
    approachLoading.value = false
  }
}

onMounted(async () => {
  await fetchData()
  await nextTick()
  initObserver()
  if (sliders.value.length > 0) {startHeroTimer()}
})

onUnmounted(() => {
  if (observer) {observer.disconnect()}
  stopHeroTimer()
})

const initObserver = () => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-active')
      } else {
        entry.target.classList.remove('anim-active')
      }
    })
  }, { 
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  })

  document.querySelectorAll('.anim-reveal-up, .anim-reveal-left, .anim-reveal-right, .anim-item').forEach(el => {
    observer.observe(el)
  })
}
</script>

<style scoped>
@keyframes superZoomOut {
  0% { transform: scale(1.15); opacity: 0; filter: blur(4px); }
  100% { transform: scale(1); opacity: 1; filter: blur(0); }
}

@keyframes elegantReveal {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes scrollDrop {
  0% { opacity: 0; transform: translateY(-8px); }
  30% { opacity: 1; }
  60% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 0; }
}

.anim-hero-reveal {
  animation: elegantReveal 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.anim-reveal-up {
  opacity: 0;
  transform: translateY(60px);
  transition: opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.anim-reveal-left {
  opacity: 0;
  transform: translateX(-50px) translateY(10px);
  transition: opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.anim-reveal-right {
  opacity: 0;
  transform: translateX(50px) translateY(10px);
  transition: opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
}

.anim-active, .anim-item.anim-active {
  opacity: 1 !important;
  transform: translate(0, 0) !important;
}

.anim-item {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes smoothFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(0.5deg); }
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
    text-align: center;
    width: 100%;
  }
  
  .footer-copyright p {
    font-size: 12px;
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
  background-color: #5F9E42; 
  padding: 25px 0;
  margin-top: 40px;
}

.footer-container {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 40px;
}

.footer-left-content {
  display: none;
}

.footer-copyright {
  text-align: center;
  width: 100%;
}

.footer-copyright p {
  font-family: Arial, sans-serif;
  font-size: 13px;
  color: #ffffff;
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
