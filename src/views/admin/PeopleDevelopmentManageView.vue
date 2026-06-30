<template>
  <div class="min-h-screen bg-gray-100 flex">
    <AdminSidebar active="people" />

    <main class="flex-1 ml-64 p-10">
      <div class="mb-8">
        <p class="text-xs text-gray-400 font-semibold tracking-widest">CONTENT ENGINE</p>
        <h1 class="text-3xl font-black text-gray-900">People Development</h1>
        <p class="text-gray-400 text-sm mt-1">Kelola deskripsi, development pillars, dan slider gambar.</p>
      </div>

      <div v-if="alert.show" :class="['mb-4 px-4 py-3 rounded-xl text-sm font-medium', alert.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200']">
        {{ alert.message }}
      </div>

      <section class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8 max-w-3xl">
        <h2 class="text-xl font-black text-gray-900 mb-1">📝 Deskripsi</h2>
        <p class="text-sm text-gray-400 mb-5">Deskripsi intro halaman People Development.</p>
        <textarea v-model="description" rows="8" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-y" placeholder="Tulis deskripsi..."></textarea>
        <p class="text-xs text-gray-400 mt-2">Boleh pakai HTML seperti &lt;p&gt;.</p>
        <button @click="savePage" :disabled="pageSaving" class="mt-4 bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50">{{ pageSaving ? 'Menyimpan...' : 'Simpan Deskripsi' }}</button>
      </section>

      <section class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-black text-gray-900">🌱 Development Pillars</h2>
            <p class="text-sm text-gray-400 mt-0.5">Kelola daftar pillar yang tampil di halaman People Development.</p>
          </div>
          <button @click="openPillarCreate" class="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition">+ Tambah Pillar</button>
        </div>
        <div class="grid gap-4">
          <div v-for="(item, i) in pillars" :key="item.ID || i" class="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100">
            <div class="w-10 h-10 rounded-xl bg-green-500 text-white font-black text-sm flex items-center justify-center">{{ String(i + 1).padStart(2, '0') }}</div>
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-gray-900 text-sm">{{ item.title }}</p>
              <p class="text-xs text-gray-400 truncate">{{ item.desc }}</p>
              <p class="text-xs text-gray-300 mt-0.5">Urutan: {{ item.sort_order || 0 }}</p>
            </div>
            <button @click="openPillarEdit(item)" class="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-semibold">Edit</button>
            <button @click="deletePillar(item)" class="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold">Hapus</button>
          </div>
        </div>
      </section>

      <section class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-black text-gray-900">🖼️ Slider Gambar</h2>
            <p class="text-sm text-gray-400 mt-0.5">Kelola gambar slide People in Action.</p>
          </div>
          <button @click="openSlideCreate" class="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition">+ Tambah Slide</button>
        </div>
        <div class="grid gap-4">
          <div v-for="(slide, i) in slides" :key="slide.ID || i" class="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100">
            <div class="w-24 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0 border">
              <img :src="getImageUrl(slide.image_url)" class="w-full h-full object-cover" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-gray-900 text-sm truncate">{{ slide.caption || '(no caption)' }}</p>
              <p class="text-xs text-gray-400">Urutan: {{ slide.sort_order || 0 }}</p>
            </div>
            <button @click="openSlideEdit(slide)" class="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-semibold">Edit</button>
            <button @click="deleteSlide(slide)" class="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold">Hapus</button>
          </div>
        </div>
      </section>
    </main>

    <Transition name="modal">
      <div v-if="showPillarModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="showPillarModal = false">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <form @submit.prevent="savePillar" class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-5">
          <h2 class="text-xl font-black text-gray-900">{{ isPillarEdit ? 'Edit Pillar' : 'Tambah Pillar' }}</h2>
          <input v-model="pillarForm.title" required placeholder="Judul" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
          <textarea v-model="pillarForm.desc" rows="4" placeholder="Deskripsi" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"></textarea>
          <input v-model.number="pillarForm.sort_order" type="number" min="0" placeholder="Urutan" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
          <div class="flex gap-3 pt-2">
            <button type="button" @click="showPillarModal = false" class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold">Batal</button>
            <button type="submit" class="flex-1 bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold">Simpan</button>
          </div>
        </form>
      </div>
    </Transition>

    <Transition name="modal">
      <div v-if="showSlideModal" class="fixed inset-0 z-50 flex items-center justify-center p-4" @click.self="showSlideModal = false">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <form @submit.prevent="saveSlide" class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 space-y-5">
          <h2 class="text-xl font-black text-gray-900">{{ isSlideEdit ? 'Edit Slide' : 'Tambah Slide' }}</h2>
          <div class="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-green-400 transition cursor-pointer" @click="$refs.slideFileInput.click()">
            <input ref="slideFileInput" type="file" accept="image/*" class="hidden" @change="handleSlideFileChange" />
            <img v-if="slidePreview || slideForm.image_url" :src="slidePreview || getImageUrl(slideForm.image_url)" class="mx-auto h-28 object-cover rounded-lg mb-2" />
            <p class="text-sm text-gray-500">Klik untuk upload/ganti gambar</p>
          </div>
          <input v-model="slideForm.caption" placeholder="Caption" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
          <input v-model.number="slideForm.sort_order" type="number" min="0" placeholder="Urutan" class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
          <p v-if="slideError" class="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">{{ slideError }}</p>
          <div class="flex gap-3 pt-2">
            <button type="button" @click="showSlideModal = false" class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold">Batal</button>
            <button type="submit" class="flex-1 bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold">Simpan</button>
          </div>
        </form>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminSidebar from '@/components/AdminSidebar.vue'
import api from '../../services/api'

const BASE_URL = import.meta.env.VITE_BASE_URL || (import.meta.env.DEV ? 'http://localhost:8080' : '')
const alert = ref({ show: false, type: 'success', message: '' })
const showAlert = (type, message) => { alert.value = { show: true, type, message }; setTimeout(() => { alert.value.show = false }, 3000) }

const description = ref('')
const pageSaving = ref(false)
const pillars = ref([])
const slides = ref([])
const showPillarModal = ref(false)
const isPillarEdit = ref(false)
const selectedPillar = ref(null)
const pillarForm = ref({ title: '', desc: '', sort_order: 0 })
const showSlideModal = ref(false)
const isSlideEdit = ref(false)
const selectedSlide = ref(null)
const slideForm = ref({ image_url: '', caption: '', sort_order: 0 })
const slideFile = ref(null)
const slidePreview = ref(null)
const slideError = ref('')

const fetchPage = async () => { const res = await api.get('/admin/people-development-page'); description.value = res.data?.data?.description || '' }
const fetchPillars = async () => { const res = await api.get('/admin/people-development-pillars'); pillars.value = res.data?.data || [] }
const fetchSlides = async () => { const res = await api.get('/admin/people-development-sliders'); slides.value = res.data?.data || [] }

const savePage = async () => {
  pageSaving.value = true
  try { await api.put('/admin/people-development-page', { description: description.value }); showAlert('success', 'Deskripsi berhasil disimpan') }
  catch (e) { showAlert('error', e.response?.data?.error || 'Gagal menyimpan') }
  finally { pageSaving.value = false }
}

const openPillarCreate = () => { isPillarEdit.value = false; selectedPillar.value = null; pillarForm.value = { title: '', desc: '', sort_order: pillars.value.length + 1 }; showPillarModal.value = true }
const openPillarEdit = (item) => { isPillarEdit.value = true; selectedPillar.value = item; pillarForm.value = { title: item.title || '', desc: item.desc || '', sort_order: item.sort_order || 0 }; showPillarModal.value = true }
const savePillar = async () => {
  try {
    if (isPillarEdit.value) { await api.put(`/admin/people-development-pillars/${selectedPillar.value.ID}`, pillarForm.value) } else { await api.post('/admin/people-development-pillars', pillarForm.value) }
    showPillarModal.value = false; await fetchPillars(); showAlert('success', 'Pillar berhasil disimpan')
  } catch (e) { showAlert('error', e.response?.data?.error || 'Gagal menyimpan pillar') }
}
const deletePillar = async (item) => { if (!confirm('Hapus pillar ini?')) { return }; await api.delete(`/admin/people-development-pillars/${item.ID}`); await fetchPillars(); showAlert('success', 'Pillar dihapus') }

const openSlideCreate = () => { isSlideEdit.value = false; selectedSlide.value = null; slideForm.value = { image_url: '', caption: '', sort_order: slides.value.length + 1 }; slidePreview.value = null; slideError.value = ''; showSlideModal.value = true }
const openSlideEdit = (item) => { isSlideEdit.value = true; selectedSlide.value = item; slideForm.value = { image_url: item.image_url || '', caption: item.caption || '', sort_order: item.sort_order || 0 }; slidePreview.value = null; slideError.value = ''; showSlideModal.value = true }
const handleSlideFileChange = async (e) => {
  const file = e.target.files[0]
  if (!file) { return }
  if (file.size > 5 * 1024 * 1024) { slideError.value = 'Ukuran gambar maksimal 5MB'; return }
  slideFile.value = file
  slidePreview.value = URL.createObjectURL(file)
  const fd = new FormData()
  fd.append('image', file)
  try { const res = await api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } }); slideForm.value.image_url = res.data?.url || '' }
  catch (e) { slideError.value = e.response?.data?.error || 'Gagal upload gambar' }
}
const saveSlide = async () => {
  if (!slideForm.value.image_url) { slideError.value = 'Gambar wajib diupload'; return }
  try {
    if (isSlideEdit.value) { await api.put(`/admin/people-development-sliders/${selectedSlide.value.ID}`, slideForm.value) } else { await api.post('/admin/people-development-sliders', slideForm.value) }
    showSlideModal.value = false; await fetchSlides(); showAlert('success', 'Slide berhasil disimpan')
  } catch (e) { slideError.value = e.response?.data?.error || 'Gagal menyimpan slide' }
}
const deleteSlide = async (item) => { if (!confirm('Hapus slide ini?')) { return }; await api.delete(`/admin/people-development-sliders/${item.ID}`); await fetchSlides(); showAlert('success', 'Slide dihapus') }

const getImageUrl = (path) => {
  if (!path) { return '' }
  if (path.startsWith('http') || path.startsWith('/images/')) { return path }
  if (path.startsWith('/uploads/')) { return BASE_URL + path }
  if (path.startsWith('uploads/')) { return BASE_URL + '/' + path }
  return path
}
onMounted(async () => { await Promise.all([fetchPage(), fetchPillars(), fetchSlides()]) })
</script>
