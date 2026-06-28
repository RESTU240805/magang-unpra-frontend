<template>
  <div class="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-emerald-100">

    <PageHero
      :title="product.name || 'Product Detail'"
      :subtitle="product.summary || ''"
      :breadcrumbs="[{ label: 'Home', to: '/' }, { label: 'Product', to: '/product' }, { label: product.name || 'Detail' }]"
    />

    <main class="container mx-auto px-6 lg:px-16 py-16">

      <div v-if="loading" class="flex items-center justify-center py-24">
        <div class="w-6 h-6 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
      </div>

      <div v-else-if="error" class="text-center py-24 text-slate-400">
        <p class="text-5xl mb-4">😕</p>
        <p class="text-xl">Product not found.</p>
        <RouterLink to="/product" class="mt-6 inline-block text-emerald-600 hover:underline font-medium">Back to Products</RouterLink>
      </div>

      <div v-else class="max-w-5xl mx-auto">

        <div class="flex flex-col lg:flex-row gap-12">

          <!-- Thumbnail / Gallery -->
          <div class="lg:w-1/2">
            <div v-if="product.thumbnail_path" class="rounded-2xl overflow-hidden shadow-lg bg-white">
              <img :src="getImageUrl(product.thumbnail_path)" :alt="product.name"
                   class="w-full h-auto object-cover"
                   @error="(e) => e.target.src='https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200'" />
            </div>

            <div v-if="product.Images && product.Images.length" class="grid grid-cols-3 gap-3 mt-4">
              <div v-for="(img, i) in product.Images" :key="i"
                   class="rounded-xl overflow-hidden shadow cursor-pointer hover:shadow-lg transition-shadow">
                <img :src="getImageUrl(img.image_url)" :alt="`${product.name} ${i + 1}`"
                     class="w-full h-28 object-cover"
                     @error="(e) => e.target.style.display='none'" />
              </div>
            </div>
          </div>

          <!-- Info -->
          <div class="lg:w-1/2 flex flex-col justify-center">
            <span v-if="product.category" class="text-emerald-600 font-bold tracking-[0.2em] text-xs uppercase mb-3">{{ product.category }}</span>
            <h1 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">{{ product.name }}</h1>

            <div v-if="product.tags" class="flex flex-wrap gap-2 mb-5">
              <span v-for="tag in product.tags.split(',')" :key="tag"
                    class="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-200">
                {{ tag.trim() }}
              </span>
            </div>

            <p v-if="product.summary" class="text-slate-600 text-lg leading-relaxed mb-6">{{ product.summary }}</p>

            <div v-if="product.description" class="product-description prose prose-slate max-w-none"><SafeHtml :html="product.description" /></div>
          </div>

        </div>

        <div class="mt-16 pt-8 border-t border-slate-200">
          <RouterLink to="/product" class="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
            Back to Products
          </RouterLink>
        </div>

      </div>

    </main>

    <FooterGlobal />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import api from '../services/api'
import PageHero from '../components/PageHero.vue'
import SafeHtml from '../components/SafeHtml.vue'
import FooterGlobal from '@/components/FooterGlobal.vue'

const route = useRoute()
const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080'

const product = ref({})
const loading = ref(true)
const error = ref(false)

const getImageUrl = (path) => {
  if (!path) {
    return ''
  }
  if (path.startsWith('http')) {
    return path
  }
  return `${BASE_URL}/${path.replace(/^\//, '')}`
}

onMounted(async () => {
  try {
    const res = await api.get(`/products/${route.params.id}`)
    product.value = res.data?.data || {}
    if (!product.value.name) {
      error.value = true
    }
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.footer-info-section {
  background: #ffffff;
  border-top: 1px solid #e4efdb;
  padding: 56px 0;
}
.footer-info-container { max-width: 1140px; margin: 0 auto; padding: 0 40px; }
.footer-info-grid { display: grid; grid-template-columns: 1fr 1.1fr 0.9fr; gap: 48px; align-items: start; }
.footer-info-col { display: flex; flex-direction: column; }
.footer-about-text { margin: 0; font-size: 14px; color: #7a8a76; line-height: 1.75; }
.footer-logos-col { display: flex; align-items: flex-start; justify-content: center; }
.footer-logo-combined { width: 100%; max-width: 380px; height: auto; object-fit: contain; }
.footer-contact-col { display: flex; flex-direction: column; gap: 20px; max-width: 280px; }
.footer-contact-row { display: flex; align-items: center; gap: 14px; font-size: 14px; color: #5a6b56; }
.footer-contact-icon { width: 19px; height: 19px; flex-shrink: 0; color: #5F9E42; }
.site-footer { width: 100%; background-color: #5F9E42; padding: 25px 0; margin-top: 40px; }
.footer-container { display: flex; align-items: center; justify-content: center; max-width: 1140px; margin: 0 auto; padding: 0 40px; }
.footer-copyright { text-align: center; width: 100%; }
.footer-copyright p { font-size: 13px; color: #ffffff; margin: 0; }
@media (max-width: 768px) {
  .footer-info-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
  .footer-contact-col { max-width: 100% !important; }
  .footer-info-container { padding: 0 20px !important; }
  .footer-info-section { padding: 36px 0; }
}
</style>

<style>
.product-description { color: #374151; font-size: 16px; line-height: 1.75; }
.product-description p { margin-bottom: 1em; }
.product-description h2 { font-size: 1.25em; font-weight: 600; margin: 0.8em 0 0.4em; color: #111827; }
.product-description ul { list-style-type: disc; padding-left: 1.5em; margin: 0.5em 0; }
.product-description li { margin: 0.25em 0; }
.product-description strong { font-weight: 700; color: #111827; }
.product-description img { max-width: 100%; border-radius: 8px; margin: 1em 0; }
</style>
