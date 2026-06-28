<template>
  <PageHero
    title="Contact Us"
    subtitle="We are ready to help answer your needs."
    :breadcrumbs="[{ label: 'Home', to: '/' }, { label: 'Contact' }]"
    :imageUrl="contactInfo.hero_image" />

  <section class="py-16 bg-white">
    <div class="max-w-5xl mx-auto px-10">
      <h2 class="text-xl font-black text-gray-900 mb-8 anim-item">Contact Information</h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
        <div v-for="(office, idx) in offices" :key="office.id"
          class="anim-item"
          :class="idx % 2 === 0 ? 'anim-from-left' : 'anim-from-right'"
          :style="{ animationDelay: (0.05 * (idx + 1)) + 's' }">
          <div class="grid grid-cols-1 mb-4 overflow-hidden rounded-lg shadow-sm">
            <img :src="getImageUrl(office.image)" :alt="office.name" class="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <h3 class="font-black text-gray-900 text-sm mb-1">{{ office.name }}</h3>
          <p class="text-xs text-gray-600 flex items-start gap-1 mb-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 mt-0.5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            {{ office.address }}
          </p>
          <p class="text-xs text-gray-600 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            {{ office.phone }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="py-10 bg-gray-50">
    <div class="max-w-5xl mx-auto px-10">
      <div class="border border-gray-200 rounded-xl p-8 bg-white flex flex-col gap-4 anim-item">
        <p class="text-2xl font-black text-gray-800 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          {{ contactInfo.address || 'Muara Enim Regency, South Sumatra.' }}
        </p>
        <p class="text-xl text-gray-700 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          {{ contactInfo.phone || '(+62) 713-324-150' }}
        </p>
        <p class="text-xl text-gray-700 flex items-center gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          {{ contactInfo.working_hours || 'Monday - Friday: 08:00 - 17:00' }}
        </p>
        <a :href="contactInfo.map_link || 'https://maps.google.com/?q=PT+Tanjungenim+Lestari+Pulp+and+Paper+Muara+Enim'"
          target="_blank"
          class="inline-flex items-center gap-2 border border-gray-300 text-gray-600 text-sm px-4 py-2 rounded-md w-fit hover:bg-gray-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
          View on Google Maps
        </a>
      </div>
    </div>
  </section>

  <FooterGlobal />
</template>

<script setup>
import { onMounted, onUnmounted, nextTick, ref } from 'vue'
import PageHero from '../components/PageHero.vue'
import FooterGlobal from '@/components/FooterGlobal.vue'
import api from '@/services/api'

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080'

const contactInfo = ref({
  email: '',
  phone: '',
  address: '',
  working_hours: '',
  copyright: '',
  hero_image: '',
  map_link: '',
})
const offices = ref([])

let observer = null

onMounted(async () => {
  await fetchData()
  await nextTick()
  initObserver()
})

onUnmounted(() => {
  if (observer) {observer.disconnect()}
})

async function fetchData() {
  try {
    const [infoRes, officeRes] = await Promise.all([
      api.get('/contact-info'),
      api.get('/contact-offices'),
    ])
    const infoData = infoRes.data?.data || infoRes.data
    if (infoData) {
      contactInfo.value = {
        email: infoData.email || '',
        phone: infoData.phone || '',
        address: infoData.address || '',
        working_hours: infoData.working_hours || '',
        copyright: infoData.copyright || '',
        hero_image: infoData.hero_image || '',
        map_link: infoData.map_link || '',
      }
    }
    offices.value = officeRes.data?.data?.filter(o => o.is_active !== false) || []
  } catch (_e) {}
}

function getImageUrl(path) {
  if (!path) return '/images/jakarta.jpeg'
  if (path.startsWith('http')) return path
  if (path.startsWith('/uploads/')) return BASE_URL + path
  if (path.startsWith('uploads/')) return BASE_URL + '/' + path
  return path
}

const initObserver = () => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })

  document.querySelectorAll('.anim-item').forEach(el => {
    observer.observe(el)
  })
}
</script>

<style scoped>
@keyframes heroTitleFade {
  from { opacity: 0; transform: translateY(20px) scale(0.96); letter-spacing: 0.05em; }
  to { opacity: 1; transform: translateY(0) scale(1); letter-spacing: 0.07em; }
}
@keyframes heroDividerGrow {
  from { width: 0; opacity: 0; }
  to { width: 3rem; opacity: 1; }
}
@keyframes heroSubtitleFade {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.anim-hero-title {
  animation: heroTitleFade 1s cubic-bezier(0.215, 0.610, 0.355, 1) 0.1s forwards;
}
.anim-hero-divider {
  animation: heroDividerGrow 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s forwards;
}
.anim-hero-subtitle {
  animation: heroSubtitleFade 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.7s forwards;
}

.anim-item {
  opacity: 0;
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}
.anim-item.anim-from-left {
  transform: translateX(-50px);
}
.anim-item.anim-from-right {
  transform: translateX(50px);
}
.anim-item:not(.anim-from-left):not(.anim-from-right) {
  transform: translateY(30px);
}
.anim-item.anim-visible {
  opacity: 1;
  transform: translate(0, 0);
}
</style>
