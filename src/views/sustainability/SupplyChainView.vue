<template>

  <PageHero
    title="Supply Chain Management"
    subtitle="Efficient and transparent supply chain for sustainable growth."
    :breadcrumbs="[{ label: 'Home', to: '/' }, { label: 'Sustainability' }, { label: 'Supply Chain' }]"
  />

  <section class="py-20 bg-gray-50">
    <div class="max-w-5xl mx-auto px-10">

      <div class="text-center mb-14 reveal" data-delay="0">
        <span class="inline-block bg-green-100 text-green-700 text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
          
        </span>
        <h2 class="text-3xl font-black text-gray-900">Supply Chain Pillars</h2>
        <p class="text-gray-400 text-sm mt-2 max-w-md mx-auto">
          Click each section to explore our complete supply chain management framework.
        </p>
        <div class="flex items-center justify-center gap-2 mt-5">
          <div class="w-8 h-0.5 bg-green-300 rounded-full"></div>
          <div class="w-2 h-2 bg-green-500 rounded-full"></div>
          <div class="w-8 h-0.5 bg-green-300 rounded-full"></div>
        </div>
      </div>

      <div class="space-y-4">

        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden reveal" data-delay="100">
          <button
            @click="toggle(0)"
            class="w-full flex items-center justify-between px-7 py-5 text-left transition-all duration-300"
            :class="open[0] ? 'bg-gradient-to-r from-green-600 to-green-500' : 'bg-white hover:bg-gray-50'">
            <div class="flex items-center gap-4">
              <span class="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black transition-all"
                :class="open[0] ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'">①</span>
              <span :class="open[0] ? 'text-white' : 'text-gray-900'" class="font-bold text-base transition">
                Strategy and Strong Management Plan
              </span>
            </div>
            <svg :class="[open[0] ? 'rotate-180 text-white' : 'text-gray-400', 'transition-transform duration-300 w-5 h-5 flex-shrink-0']"
              fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <transition name="accordion">
            <div v-if="open[0]" class="px-7 pb-7 pt-4">
              <p class="text-gray-500 text-sm leading-relaxed mb-5">We have a strategy for strong management plan as follows:</p>
              <div class="bg-green-50 border border-green-100 rounded-xl p-5 mb-4">
                <div class="flex items-start gap-3 mb-3">
                  <span class="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></span>
                  <p class="text-gray-700 text-sm font-semibold">{{ strategyIntro }}</p>
                </div>
                <div class="grid grid-cols-2 gap-2 ml-5">
                  <div v-for="(item, idx) in strategySubItems" :key="idx"
                    class="flex items-center gap-2 bg-white rounded-lg px-4 py-2.5 border border-green-100 shadow-sm stagger-item"
                    :style="`animation-delay:${idx * 0.1}s`">
                    <span class="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"></span>
                    <span class="text-sm text-gray-600">{{ item }}</span>
                  </div>
                </div>
              </div>
              <div class="space-y-3">
                <div v-for="(item, idx) in strategyExtraItems" :key="idx"
                  class="flex items-start gap-3 bg-gray-50 rounded-xl px-5 py-3.5 border border-gray-100 stagger-item"
                  :style="`animation-delay:${(0.4 + idx * 0.1)}s`">
                  <span class="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></span>
                  <p class="text-gray-600 text-sm">{{ item }}</p>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden reveal" data-delay="200">
          <button
            @click="toggle(1)"
            class="w-full flex items-center justify-between px-7 py-5 text-left transition-all duration-300"
            :class="open[1] ? 'bg-gradient-to-r from-green-600 to-green-500' : 'bg-white hover:bg-gray-50'">
            <div class="flex items-center gap-4">
              <span class="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black transition-all"
                :class="open[1] ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'">②</span>
              <span :class="open[1] ? 'text-white' : 'text-gray-900'" class="font-bold text-base transition">
                Supply Chain Sustainability
              </span>
            </div>
            <svg :class="[open[1] ? 'rotate-180 text-white' : 'text-gray-400', 'transition-transform duration-300 w-5 h-5 flex-shrink-0']"
              fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <transition name="accordion">
            <div v-if="open[1]" class="px-7 pb-7 pt-4">
              <div class="bg-gradient-to-r from-green-800 to-green-700 rounded-xl p-5 mb-5 text-center stagger-item">
                <p class="text-green-300 text-xs font-bold tracking-widest uppercase mb-1">TEL Motto</p>
                <p class="text-white text-lg font-black">"Fairness, Innovation & Harmony"</p>
              </div>
              <div class="space-y-4">
                <div v-for="(item, i) in sustainabilityItems" :key="i"
                  class="flex gap-4 bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition stagger-item"
                  :style="`animation-delay:${i * 0.1}s`">
                  <div class="w-8 h-8 rounded-full bg-green-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {{ i + 1 }}
                  </div>
                  <p class="text-gray-600 text-sm leading-relaxed">{{ item }}</p>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <div class="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden reveal" data-delay="300">
          <button
            @click="toggle(2)"
            class="w-full flex items-center justify-between px-7 py-5 text-left transition-all duration-300"
            :class="open[2] ? 'bg-gradient-to-r from-green-600 to-green-500' : 'bg-white hover:bg-gray-50'">
            <div class="flex items-center gap-4">
              <span class="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black transition-all"
                :class="open[2] ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'">③</span>
              <span :class="open[2] ? 'text-white' : 'text-gray-900'" class="font-bold text-base transition">
                Policy & Guidelines
              </span>
            </div>
            <svg :class="[open[2] ? 'rotate-180 text-white' : 'text-gray-400', 'transition-transform duration-300 w-5 h-5 flex-shrink-0']"
              fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <transition name="accordion">
            <div v-if="open[2]" class="px-7 pb-7 pt-4">
              <div class="space-y-5">
                <div v-for="(policy, i) in policies" :key="i"
                  class="border border-gray-100 rounded-xl overflow-hidden stagger-item"
                  :style="`animation-delay:${i * 0.07}s`">
                  <div class="flex items-center gap-3 bg-gray-50 px-5 py-3 border-b border-gray-100">
                    <span class="w-7 h-7 rounded-lg bg-green-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">{{ i + 1 }}</span>
                    <h4 class="font-bold text-gray-900 text-sm">{{ policy.title }}</h4>
                  </div>
                  <div class="px-5 py-4 space-y-2">
                    <div v-for="(point, j) in policy.points" :key="j" class="flex items-start gap-2.5">
                      <span class="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 flex-shrink-0"></span>
                      <p class="text-gray-500 text-sm leading-relaxed">{{ point }}</p>
                    </div>
                    <div v-if="policy.procedures && policy.procedures.length" class="mt-4 ml-4 border-l-2 border-green-200 pl-4 space-y-3">
                      <p class="text-gray-600 text-xs font-semibold uppercase tracking-widest mb-2">Procedures for vendors not meeting labor standards:</p>
                      <div v-for="(proc, k) in policy.procedures" :key="k" class="flex gap-3 bg-green-50 rounded-lg p-3">
                        <span class="w-5 h-5 rounded-full bg-green-600 text-white font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">{{ k + 1 }}</span>
                        <p class="text-gray-600 text-xs leading-relaxed">{{ proc }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>

      </div>
    </div>
  </section>

  <OfficeCards />

    <FooterGlobal />

</template>

<script setup>
import PageHero from '../../components/PageHero.vue'
import OfficeCards from '@/components/OfficeCards.vue'
import FooterGlobal from '@/components/FooterGlobal.vue'
import { ref, onMounted } from 'vue'
import api from '../../services/api'

// ── Accordion ──
const open = ref([true, false, false])
function toggle(i) { open.value[i] = !open.value[i] }

// ── Typewriter ──
const fullTitle = 'Supply Chain Management'
const displayedTitle = ref('')
const typingDone = ref(false)

// ── Data ──
const strategyIntro = ref('')
const strategySubItems = ref([])
const strategyExtraItems = ref([])
const sustainabilityItems = ref([])
const policies = ref([])
const loading = ref(true)
const error = ref(null)

const fetchData = async () => {
  loading.value = true
  error.value = null
  try {
    const [strategiesRes, sustRes, policiesRes] = await Promise.all([
      api.get('/supply-chain-strategies'),
      api.get('/supply-chain-sustainability-items'),
      api.get('/supply-chain-policies'),
    ])
    const strategiesData = strategiesRes.data?.data || strategiesRes.data || []
    const sustData = sustRes.data?.data || sustRes.data || []
    const policiesData = policiesRes.data?.data || policiesRes.data || []
    const allStrategies = strategiesData.map(s => s.description || s.title)
    strategyIntro.value = allStrategies[0] || ''
    strategySubItems.value = allStrategies.slice(1, 5)
    strategyExtraItems.value = allStrategies.slice(5)
    sustainabilityItems.value = sustData.map(i => i.description)
    policies.value = policiesData.map(p => ({
      title: p.title,
      points: JSON.parse(p.points || '[]'),
      procedures: p.procedures ? JSON.parse(p.procedures) : null,
    }))
  } catch (e) {
    console.error('Failed to load supply chain data:', e)
    error.value = 'Failed to load data'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchData()

  // Typewriter
  let i = 0
  setTimeout(() => {
    const iv = setInterval(() => {
      if (i < fullTitle.length) {
        displayedTitle.value += fullTitle[i++]
      } else {
        clearInterval(iv)
        setTimeout(() => { typingDone.value = true }, 900)
      }
    }, 58)
  }, 500)

  // Intersection Observer — animasi saat scroll ke bawah
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0)
        setTimeout(() => {
          entry.target.classList.add('revealed')
        }, delay)
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })

  // Observe semua elemen .reveal dan .reveal-cta
  document.querySelectorAll('.reveal, .reveal-cta').forEach(el => observer.observe(el))
})
</script>

<style scoped>

/* ══════════════════════════════════════
   SCROLL REVEAL — state awal & revealed
   ══════════════════════════════════════ */
.reveal {
  opacity: 0;
  transform: translateY(36px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* CTA: muncul dari bawah + sedikit scale */
.reveal-cta {
  opacity: 0;
  transform: translateY(28px) scale(0.97);
  transition: opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal-cta.revealed {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* ══════════════════════════════
   CTA section extras
   ══════════════════════════════ */
.cta-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(74, 222, 128, 0.12);
  pointer-events: none;
  animation: ringPulse 6s ease-in-out infinite;
}
.cta-ring-1 { width: 500px; height: 500px; top: 50%; left: 50%; transform: translate(-50%, -50%); }
.cta-ring-2 { width: 700px; height: 700px; top: 50%; left: 50%; transform: translate(-50%, -50%); animation-delay: 1.5s; }
@keyframes ringPulse {
  0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
  50%       { opacity: 0.8; transform: translate(-50%, -50%) scale(1.04); }
}

.cta-pill {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 14px 20px;
  transition: background 0.25s, transform 0.25s, border-color 0.25s;
  cursor: default;
  min-width: 180px;
}
.cta-pill:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(74, 222, 128, 0.4);
  transform: translateY(-3px);
}

.pulse-dot-sm {
  animation: dotPulse 1.8s ease-in-out infinite;
}
@keyframes dotPulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.5); }
}

/* ══════════════════════════════
   HERO
   ══════════════════════════════ */
.hero-grid {
  background-image:
    linear-gradient(rgba(74,222,128,0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(74,222,128,0.3) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: gridMove 20s linear infinite;
}
@keyframes gridMove {
  from { background-position: 0 0; }
  to   { background-position: 60px 60px; }
}

.orb { position:absolute; border-radius:50%; filter:blur(60px); pointer-events:none; }
.orb-1 { width:300px; height:300px; background:rgba(74,222,128,0.12); top:-80px; left:-80px; animation:orbFloat 8s ease-in-out infinite; }
.orb-2 { width:200px; height:200px; background:rgba(21,128,61,0.2); bottom:0; right:10%; animation:orbFloat 10s ease-in-out infinite reverse; }
.orb-3 { width:150px; height:150px; background:rgba(74,222,128,0.08); top:30%; left:50%; animation:orbFloat 12s ease-in-out infinite; }
@keyframes orbFloat {
  0%,100% { transform:translate(0,0) scale(1); }
  33%     { transform:translate(20px,-20px) scale(1.05); }
  66%     { transform:translate(-15px,15px) scale(0.97); }
}

.divider-line {
  height:1px; width:0;
  background:linear-gradient(to right, transparent, #4ade80, transparent);
  animation:lineGrow 1s 2.6s cubic-bezier(0.22,1,0.36,1) forwards;
}
@keyframes lineGrow {
  from { width:0; opacity:0; }
  to   { width:120px; opacity:1; }
}

.scroll-indicator {
  width:22px; height:36px;
  border:2px solid rgba(255,255,255,0.3);
  border-radius:11px; margin:0 auto;
  display:flex; align-items:flex-start; justify-content:center; padding-top:5px;
}
.scroll-dot {
  width:4px; height:8px; background:#4ade80; border-radius:2px;
  animation:scrollBounce 1.8s ease-in-out infinite;
}
@keyframes scrollBounce {
  0%,100% { transform:translateY(0); opacity:1; }
  50%     { transform:translateY(10px); opacity:0.4; }
}

.typewriter-cursor {
  display:inline-block; color:#4ade80; font-weight:300; margin-left:3px;
  animation:blink 0.65s step-end infinite;
}
.typewriter-cursor.cursor-hidden { opacity:0; animation:none; }
@keyframes blink {
  0%,100% { opacity:1; }
  50%     { opacity:0; }
}

/* ══════════════════════════════
   GENERAL ENTRANCE
   ══════════════════════════════ */
@keyframes fadeUp {
  from { opacity:0; transform:translateY(28px); }
  to   { opacity:1; transform:translateY(0); }
}
.anim-fade-up { animation:fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) forwards; }

.stagger-item {
  opacity:0;
  animation:fadeUp 0.5s cubic-bezier(0.22,1,0.36,1) forwards;
}

/* ── Accordion transition ── */
.accordion-enter-active,
.accordion-leave-active { transition:all 0.38s cubic-bezier(0.22,1,0.36,1); overflow:hidden; }
.accordion-enter-from,
.accordion-leave-to  { opacity:0; max-height:0; }
.accordion-enter-to,
.accordion-leave-from { opacity:1; max-height:2000px; }

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