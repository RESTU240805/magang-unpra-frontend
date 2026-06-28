<template>
  <div class="min-h-screen bg-white font-sans">

    <!-- ─── HERO ──────────────────────────────────────────────── -->
    <PageHero
      title="News & Update"
      subtitle="Berita terbaru dan informasi resmi PT Tanjungenim Lestari Pulp and Paper."
      :breadcrumbs="[{ label: 'Home', to: '/' }, { label: 'News' }]"
    />

    <!-- ─── MAIN CONTENT ──────────────────────────────────────── -->
    <div class="max-w-[1200px] mx-auto px-4 sm:px-8 py-8 md:py-16">

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center py-20">
        <div class="w-10 h-10 border-4 border-gray-200 border-t-[#5F9E42] rounded-full animate-spin"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-20 text-gray-400">
        <p class="text-xl mb-4">Gagal memuat berita.</p>
        <button @click="fetchNews" class="px-6 py-2 bg-[#5F9E42] text-white rounded text-sm font-semibold cursor-pointer">Coba Lagi</button>
      </div>

      <!-- Empty -->
      <div v-else-if="!newsList.length" class="text-center py-20 text-gray-400">
        <p class="text-4xl mb-4">📰</p>
        <p class="text-xl">Belum ada berita.</p>
      </div>

      <!-- Empty search -->
      <div v-else-if="!filteredNews.length && searchQuery" class="text-center py-16 text-gray-400">
        <p class="text-4xl mb-4">🔍</p>
        <p class="text-xl">Tidak ada berita yang cocok dengan "{{ searchQuery }}".</p>
        <button @click="searchQuery = ''" class="mt-4 px-4 py-2 text-sm text-[#5F9E42] font-semibold hover:underline cursor-pointer">Hapus Pencarian</button>
      </div>

      <!-- Content -->
      <div v-else-if="filteredNews.length" class="flex flex-col lg:flex-row gap-8 lg:gap-10">

        <!-- Left: Articles -->
        <div class="flex-1 min-w-0">
          <h2 class="text-2xl font-bold text-gray-900 mb-2 anim-item">Berita Terbaru</h2>
          <div class="w-16 h-1 bg-[#5F9E42] rounded mb-8 anim-item"></div>

          <!-- News Items -->
          <div v-for="(item, index) in filteredNews" :key="item.id"
            class="flex flex-col sm:flex-row gap-4 sm:gap-6 pb-8 mb-8 border-b border-gray-200 last:border-b-0 last:mb-0 last:pb-0 anim-item"
            :style="{ animationDelay: (index * 0.1) + 's' }">

            <!-- Image -->
            <div class="w-full sm:w-[340px] h-48 sm:h-[220px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
              <img :src="getImageUrl(item.image)" :alt="item.title"
                class="w-full h-full object-cover"
                @error="(e) => e.target.src = fallbackImg" />
            </div>

            <!-- Content -->
            <div class="flex flex-col justify-start pt-1 min-w-0">
              <span class="inline-block text-[10px] font-bold tracking-widest uppercase text-white bg-[#5F9E42] px-3 py-1 rounded mb-3 w-fit">
                {{ item.category || 'News' }}
              </span>
              <div class="flex items-center gap-4 text-xs text-gray-500 mb-3">
                <span class="flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  {{ item.author || 'Admin' }}
                </span>
                <span class="flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  {{ formatDate(item.date) }}
                </span>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2 leading-snug">{{ item.title }}</h3>
              <p class="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">{{ item.excerpt }}</p>
              <RouterLink :to="`/news/${item.id}`"
                class="text-[#5F9E42] text-sm font-bold no-underline hover:underline">
                Baca Selengkapnya →
              </RouterLink>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex items-center gap-2 mt-10 justify-center">
            <button @click="prevPage" :disabled="currentPage <= 1"
              class="w-9 h-9 rounded border border-gray-300 bg-white text-gray-600 text-sm cursor-pointer hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center">
              ‹
            </button>
            <button v-for="page in totalPages" :key="page" @click="goToPage(page)"
              class="w-9 h-9 rounded text-sm font-semibold cursor-pointer flex items-center justify-center transition-colors"
              :class="currentPage === page
                ? 'bg-[#5F9E42] text-white border border-[#5F9E42]'
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'">
              {{ page }}
            </button>
            <button @click="nextPage" :disabled="currentPage >= totalPages"
              class="w-9 h-9 rounded border border-gray-300 bg-white text-gray-600 text-sm cursor-pointer hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center">
              ›
            </button>
          </div>
        </div>

        <!-- Right: Sidebar -->
        <aside class="w-full lg:w-[320px] flex-shrink-0 anim-slide-right">

          <!-- Search -->
          <div class="relative mb-8">
            <input v-model="searchQuery" type="text" placeholder="Cari berita..."
              class="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#5F9E42]" />
            <button @click="searchQuery = ''" v-if="searchQuery"
              class="absolute right-12 top-0 h-full w-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            <button class="absolute right-0 top-0 h-full w-12 bg-[#5F9E42] text-white rounded-r-lg flex items-center justify-center cursor-pointer hover:bg-[#4d8536]">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
          </div>

          <!-- Berita Terbaru -->
          <div>
            <h3 class="text-lg font-bold text-gray-900 mb-5">Berita Terbaru</h3>
            <div v-for="item in filteredNews.slice(0, 5)" :key="'side-' + item.id"
              class="flex gap-3 pb-4 mb-4 border-b border-gray-100 last:border-b-0 last:mb-0 last:pb-0">
              <div class="w-[90px] h-[65px] flex-shrink-0 rounded overflow-hidden bg-gray-100">
                <img :src="getImageUrl(item.image)" :alt="item.title"
                  class="w-full h-full object-cover"
                  @error="(e) => e.target.src = fallbackImg" />
              </div>
              <div class="flex flex-col justify-center min-w-0">
                <h4 class="text-sm font-bold text-gray-900 leading-snug mb-1 line-clamp-2">{{ item.title }}</h4>
                <span class="text-[11px] text-gray-400">{{ formatDate(item.date) }}</span>
              </div>
            </div>
          </div>

        </aside>
      </div>
    </div>

   

    <OfficeCards />

    <FooterGlobal />

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import api from '../services/api'
import PageHero from '../components/PageHero.vue'
import OfficeCards from '@/components/OfficeCards.vue'
import FooterGlobal from '@/components/FooterGlobal.vue'

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080'
const fallbackImg = 'https://placehold.co/600x400/e8e8e8/999?text=News'

const newsList = ref([])
const loading = ref(true)
const error = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)
const searchQuery = ref('')

const filteredNews = computed(() => {
  if (!searchQuery.value.trim()) { return newsList.value }
  const q = searchQuery.value.toLowerCase()
  return newsList.value.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.excerpt.toLowerCase().includes(q) ||
    (item.category || '').toLowerCase().includes(q)
  )
})

const formatDate = (dateStr) => {
  if (!dateStr) {return ''}
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

const getImageUrl = (path) => {
  if (!path) {return fallbackImg}
  if (path.startsWith('http')) {return path}
  return `${BASE_URL}/${path.replace(/^\//, '')}`
}

const fetchNews = async () => {
  loading.value = true
  error.value = false
  try {
    const res = await api.get(`/news?page=${currentPage.value}`)
    const data = res.data

    const rawList = data.data || data.news || data || []
    newsList.value = rawList
      .filter(item => item.is_published)
      .map(item => ({
        id: item.ID || item.id,
        title: item.title,
        excerpt: item.summary || '',
        category: item.category,
        author: item.author || 'Admin',
        date: item.published_at || item.CreatedAt || item.created_at || item.date,
        image: item.Images?.[0]?.image_url || item.thumbnail_path || '',
      }))

    if (data.total_pages) {totalPages.value = data.total_pages}
  } catch (e) {
    console.error(e)
    error.value = true
  } finally {
    loading.value = false
  }
}

const goToPage = (page) => {
  currentPage.value = page
  fetchNews()
}

const prevPage = () => {
  if (currentPage.value > 1) {goToPage(currentPage.value - 1)}
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {goToPage(currentPage.value + 1)}
}

let observer = null

const reobserve = () => {
  if (!observer) {return}
  document.querySelectorAll('.anim-item:not(.anim-visible), .anim-slide-right:not(.anim-visible)').forEach(el => {
    observer.observe(el)
  })
}

watch(searchQuery, () => { nextTick(reobserve) })

onMounted(async () => {
  await fetchNews()
  await nextTick()
  initObserver()
})

onUnmounted(() => {
  if (observer) {observer.disconnect()}
})

const initObserver = () => {
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('anim-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })

  document.querySelectorAll('.anim-item, .anim-slide-right').forEach(el => {
    observer.observe(el)
  })
}
</script>

<style scoped>
.animate-spin {
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Hero animations */
@keyframes heroZoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.08); }
}
.animate-hero-zoom {
  animation: heroZoom 20s infinite alternate ease-in-out;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-up {
  animation: fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* Scroll animations */
.anim-item {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.anim-item.anim-visible {
  opacity: 1;
  transform: translateY(0);
}

.anim-slide-right {
  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.anim-slide-right.anim-visible {
  opacity: 1;
  transform: translateX(0);
}

/* ============ PT TEL INFO + LOGOS ============ */
.tel-info-section {
  width: 100%;
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;
  padding: 48px 0 40px;
}

.tel-info-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 60px;
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 40px;
}

.tel-info-text {
  flex: 1;
  min-width: 0;
}

.tel-info-text p {
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 1.8;
  color: #374151;
  margin: 0;
  text-align: justify;
}

.tel-logo-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
  flex-shrink: 0;
  align-items: flex-start;
}

.tel-logo-item {
  display: block;
  transition: opacity 0.25s ease;
}

.tel-logo-item:hover {
  opacity: 0.75;
}

.tel-logo-item img {
  height: 44px;
  width: auto;
  object-fit: contain;
  display: block;
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