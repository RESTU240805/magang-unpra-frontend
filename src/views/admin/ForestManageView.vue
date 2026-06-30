<template>
  <div class="min-h-screen bg-gray-100 flex">
    <AdminSidebar active="forest" />

    <main class="flex-1 ml-64 p-10">
      <div class="mb-8">
        <p class="text-xs text-gray-400 font-semibold tracking-widest">CONTENT ENGINE</p>
        <h1 class="text-3xl font-black text-gray-900">Forest Management</h1>
        <p class="text-gray-400 text-sm mt-1">Kelola jenis kayu, deskripsi approach, dan slider gambar.</p>
      </div>

      <div v-if="alert.show"
        :class="['mb-4 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2',
          alert.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200']">
        {{ alert.type === 'success' ? '✅' : '❌' }} {{ alert.message }}
      </div>

      <!-- ═══ WOOD TYPES SECTION ═══ -->
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-black text-gray-900">🪵 Types of Wood Used</h2>
            <p class="text-sm text-gray-400 mt-0.5">Kelola data jenis kayu yang tampil di halaman forest management.</p>
          </div>
          <button @click="openWoodCreate"
            class="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition flex items-center gap-2">
            <span class="text-lg leading-none">+</span> Tambah
          </button>
        </div>

        <div v-if="woodLoading" class="flex items-center justify-center py-12 gap-3 text-gray-400">
          <div class="w-5 h-5 border-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
          Memuat data...
        </div>

        <div v-else-if="woodTypes.length === 0"
          class="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
          <p class="text-4xl mb-3">🪵</p>
          <p class="text-gray-500 mb-4">Belum ada data jenis kayu.</p>
          <button @click="openWoodCreate"
            class="bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition">
            + Tambah
          </button>
        </div>

        <div v-else class="grid gap-4">
          <div v-for="(item, i) in woodTypes" :key="item.ID || i"
            class="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100 hover:border-gray-200 transition">
            <div class="w-24 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0 border">
              <img :src="getImageUrl(item.image_url)" class="w-full h-full object-cover"
                @error="(e) => e.target.src='https://via.placeholder.com/150?text=No+Image'" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-gray-900 text-sm">{{ item.title || '(no title)' }}</p>
              <p class="text-xs text-gray-400 truncate">{{ item.badge }}</p>
              <p class="text-xs text-gray-300 mt-0.5">Urutan: {{ item.sort_order || 0 }}</p>
            </div>
            <div class="flex gap-2 flex-shrink-0">
              <button @click="openWoodEdit(item)"
                class="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition">Edit</button>
              <button @click="confirmWoodDelete(item)"
                class="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 transition">Hapus</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ APPROACH SECTION ═══ -->
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8 max-w-3xl">
        <div class="mb-6">
          <h2 class="text-xl font-black text-gray-900">📝 OUR APPROACH</h2>
          <p class="text-sm text-gray-400 mt-0.5">Deskripsi utama yang tampil di bagian approach halaman forest management.</p>
        </div>

        <div v-if="approachLoading" class="flex items-center justify-center py-12 text-gray-400">
          <div class="w-5 h-5 border-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
        </div>
        <div v-else class="space-y-5">
          <div>
            <textarea v-model="approachDesc" rows="10"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-y"
              placeholder="Tulis deskripsi approach di sini..."></textarea>
            <p class="text-xs text-gray-400 mt-2">Gunakan &lt;p&gt; untuk paragraf. Deskripsi ini tampil di bagian "OUR APPROACH".</p>
          </div>

          <div class="flex gap-4 pt-2">
            <button @click="saveApproach" :disabled="approachSaving"
              class="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50 flex items-center gap-2">
              <div v-if="approachSaving" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              {{ approachSaving ? 'Menyimpan...' : 'Simpan Deskripsi' }}
            </button>
          </div>

          <div v-if="approachDesc" class="border-t border-gray-100 pt-6">
            <h3 class="text-xs font-semibold text-gray-400 tracking-widest mb-3">PRATINJAU</h3>
            <div class="bg-gray-50 rounded-xl p-6 prose prose-sm max-w-none">
              <SafeHtml class="text-gray-700 leading-relaxed" :html="approachDesc" />
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ SLIDER SECTION ═══ -->
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-black text-gray-900">🖼️ Slider Gambar</h2>
            <p class="text-sm text-gray-400 mt-0.5">Kelola gambar slide yang tampil di bagian bawah halaman forest management.</p>
          </div>
          <button @click="openSliderCreate"
            class="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition flex items-center gap-2">
            <span class="text-lg leading-none">+</span> Tambah Slide
          </button>
        </div>

        <div v-if="sliderLoading" class="flex items-center justify-center py-12 gap-3 text-gray-400">
          <div class="w-5 h-5 border-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
          Memuat data...
        </div>

        <div v-else-if="sliders.length === 0"
          class="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
          <p class="text-4xl mb-3">🖼️</p>
          <p class="text-gray-500 mb-4">Belum ada slide.</p>
          <button @click="openSliderCreate"
            class="bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition">
            + Tambah Slide
          </button>
        </div>

        <div v-else class="grid gap-4">
          <div v-for="(slide, i) in sliders" :key="slide.ID || i"
            class="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100 hover:border-gray-200 transition">
            <div class="w-24 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0 border">
              <img :src="getImageUrl(slide.image_url)" class="w-full h-full object-cover"
                @error="(e) => e.target.src='https://via.placeholder.com/150?text=No+Image'" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-xs text-gray-400">Urutan: {{ slide.sort_order || 0 }}</p>
            </div>
            <div class="flex gap-2 flex-shrink-0">
              <button @click="openSliderEdit(slide)"
                class="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition">Edit</button>
              <button @click="confirmSliderDelete(slide)"
                class="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 transition">Hapus</button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal Wood Type -->
    <Transition name="modal">
      <div v-if="showWoodModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="closeWoodModal">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 class="text-xl font-black text-gray-900">
              {{ isWoodEdit ? '✏️ Edit Wood Type' : '➕ Tambah Wood Type' }}
            </h2>
            <button @click="closeWoodModal" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
          </div>
          <form @submit.prevent="submitWoodForm" class="p-6 space-y-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Judul <span class="text-red-500">*</span></label>
              <input v-model="woodForm.title" type="text" placeholder="Misal: Acacia Mangium (AM)" required
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Deskripsi</label>
              <textarea v-model="woodForm.description" rows="3" placeholder="Deskripsi jenis kayu..."
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"></textarea>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Badge</label>
              <input v-model="woodForm.badge" type="text" placeholder="Misal: Initial Product"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Gambar</label>
              <div class="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-green-400 transition cursor-pointer"
                @click="$refs.woodFileInput.click()">
                <input ref="woodFileInput" type="file" accept="image/*" class="hidden" @change="handleWoodFileChange" />
                <div v-if="woodImagePreview || woodForm.image_url">
                  <img :src="woodImagePreview || getImageUrl(woodForm.image_url)"
                    class="mx-auto h-28 object-cover rounded-lg mb-2" />
                  <p class="text-xs text-gray-400">Klik untuk ganti gambar</p>
                </div>
                <div v-else>
                  <p class="text-3xl mb-2">🖼️</p>
                  <p class="text-sm text-gray-500">Klik untuk upload gambar</p>
                </div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Urutan</label>
              <input v-model.number="woodForm.sort_order" type="number" min="0"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div v-if="woodFormError" class="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
              ❌ {{ woodFormError }}
            </div>
            <div class="flex gap-3 pt-2">
              <button type="button" @click="closeWoodModal"
                class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Batal</button>
              <button type="submit" :disabled="woodSubmitting"
                class="flex-1 bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition disabled:opacity-60 flex items-center justify-center gap-2">
                <div v-if="woodSubmitting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {{ woodSubmitting ? 'Menyimpan...' : (isWoodEdit ? 'Simpan Perubahan' : 'Tambah') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Modal Hapus Wood Type -->
    <Transition name="modal">
      <div v-if="showWoodDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="showWoodDeleteModal = false">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
          <p class="text-4xl mb-3">🗑️</p>
          <h3 class="text-lg font-black text-gray-900 mb-1">Hapus Wood Type?</h3>
          <p class="text-sm text-gray-500 mb-6">Data akan dihapus permanen.</p>
          <div class="flex gap-3">
            <button @click="showWoodDeleteModal = false"
              class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Batal</button>
            <button @click="doWoodDelete" :disabled="woodSubmitting"
              class="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 transition disabled:opacity-60">
              {{ woodSubmitting ? 'Menghapus...' : 'Hapus' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Modal Slider -->
    <Transition name="modal">
      <div v-if="showSliderModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="closeSliderModal">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 class="text-xl font-black text-gray-900">
              {{ isSliderEdit ? '✏️ Edit Slide' : '➕ Tambah Slide' }}
            </h2>
            <button @click="closeSliderModal" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
          </div>
          <form @submit.prevent="submitSliderForm" class="p-6 space-y-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Gambar</label>
              <div class="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-green-400 transition cursor-pointer"
                @click="$refs.sliderFileInput.click()">
                <input ref="sliderFileInput" type="file" accept="image/*" class="hidden" @change="handleSliderFileChange" />
                <div v-if="sliderImagePreview || sliderForm.image_url">
                  <img :src="sliderImagePreview || getImageUrl(sliderForm.image_url)"
                    class="mx-auto h-28 object-cover rounded-lg mb-2" />
                  <p class="text-xs text-gray-400">Klik untuk ganti gambar</p>
                </div>
                <div v-else>
                  <p class="text-3xl mb-2">🖼️</p>
                  <p class="text-sm text-gray-500">Klik untuk upload gambar</p>
                </div>
              </div>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Urutan</label>
              <input v-model.number="sliderForm.sort_order" type="number" min="0"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div v-if="sliderFormError" class="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
              ❌ {{ sliderFormError }}
            </div>
            <div class="flex gap-3 pt-2">
              <button type="button" @click="closeSliderModal"
                class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Batal</button>
              <button type="submit" :disabled="sliderSubmitting"
                class="flex-1 bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition disabled:opacity-60 flex items-center justify-center gap-2">
                <div v-if="sliderSubmitting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {{ sliderSubmitting ? 'Menyimpan...' : (isSliderEdit ? 'Simpan Perubahan' : 'Tambah Slide') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Modal Hapus Slider -->
    <Transition name="modal">
      <div v-if="showSliderDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="showSliderDeleteModal = false">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
          <p class="text-4xl mb-3">🗑️</p>
          <h3 class="text-lg font-black text-gray-900 mb-1">Hapus Slide?</h3>
          <p class="text-sm text-gray-500 mb-6">Slide akan dihapus permanen.</p>
          <div class="flex gap-3">
            <button @click="showSliderDeleteModal = false"
              class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Batal</button>
            <button @click="doSliderDelete" :disabled="sliderSubmitting"
              class="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 transition disabled:opacity-60">
              {{ sliderSubmitting ? 'Menghapus...' : 'Hapus' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SafeHtml from '@/components/SafeHtml.vue'
import AdminSidebar from '@/components/AdminSidebar.vue'
import api from '../../services/api'

const BASE_URL = import.meta.env.VITE_BASE_URL || (import.meta.env.DEV ? 'http://localhost:8080' : '')

// ─── Alert ────────────────────────────────────────────────────
const alert = ref({ show: false, type: 'success', message: '' })
const showAlert = (type, message) => {
  alert.value = { show: true, type, message }
  setTimeout(() => { alert.value.show = false }, 3000)
}

// ─── Wood Types ───────────────────────────────────────────────
const woodTypes = ref([])
const woodLoading = ref(true)
const woodSubmitting = ref(false)
const showWoodModal = ref(false)
const showWoodDeleteModal = ref(false)
const isWoodEdit = ref(false)
const selectedWood = ref(null)
const woodFileInput = ref(null)
const woodImageFile = ref(null)
const woodImagePreview = ref(null)
const woodFormError = ref('')

const woodForm = ref({ title: '', description: '', image_url: '', badge: '', sort_order: 0 })

const fetchWoodTypes = async () => {
  woodLoading.value = true
  try {
    const res = await api.get('/admin/forest-wood-types')
    woodTypes.value = res.data?.data || res.data || []
  } catch { showAlert('error', 'Gagal memuat wood types') }
  finally { woodLoading.value = false }
}

const openWoodCreate = () => {
  isWoodEdit.value = false
  woodForm.value = { title: '', description: '', image_url: '', badge: '', sort_order: 0 }
  woodImagePreview.value = null; woodImageFile.value = null; woodFormError.value = ''
  showWoodModal.value = true
}

const openWoodEdit = (item) => {
  isWoodEdit.value = true; selectedWood.value = item
  woodForm.value = {
    title: item.title || '',
    description: item.description || '',
    image_url: item.image_url || '',
    badge: item.badge || '',
    sort_order: item.sort_order || 0,
  }
  woodImagePreview.value = null; woodImageFile.value = null; woodFormError.value = ''
  showWoodModal.value = true
}

const closeWoodModal = () => { showWoodModal.value = false; woodFormError.value = '' }

const handleWoodFileChange = async (e) => {
  const file = e.target.files[0]
  if (!file) {return}
  if (file.size > 5 * 1024 * 1024) { woodFormError.value = 'Ukuran gambar maksimal 5MB'; return }
  woodImageFile.value = file
  woodImagePreview.value = URL.createObjectURL(file)
  await uploadWoodImage()
}

const uploadWoodImage = async () => {
  if (!woodImageFile.value) {return}
  const fd = new FormData()
  fd.append('image', woodImageFile.value)
  try {
    const res = await api.post('/upload', fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    woodForm.value.image_url = res.data?.url || ''
  } catch (e) {
    console.error('Upload error:', e)
    woodFormError.value = 'Gagal upload gambar'
  }
}

const submitWoodForm = async () => {
  if (!woodForm.value.title.trim()) {
    woodFormError.value = 'Judul wajib diisi'; return
  }
  woodSubmitting.value = true; woodFormError.value = ''
  try {
    const payload = {
      title: woodForm.value.title,
      description: woodForm.value.description,
      image_url: woodForm.value.image_url,
      badge: woodForm.value.badge,
      sort_order: woodForm.value.sort_order,
    }
    if (isWoodEdit.value) {
      await api.put(`/admin/forest-wood-types/${selectedWood.value.ID}`, payload)
      showAlert('success', 'Wood type berhasil diperbarui!')
    } else {
      await api.post('/admin/forest-wood-types', payload)
      showAlert('success', 'Wood type berhasil ditambahkan!')
    }
    closeWoodModal(); await fetchWoodTypes()
  } catch (e) {
    woodFormError.value = e.response?.data?.error || e.response?.data?.message || e.message || 'Terjadi kesalahan.'
  } finally { woodSubmitting.value = false }
}

const confirmWoodDelete = (item) => { selectedWood.value = item; showWoodDeleteModal.value = true }
const doWoodDelete = async () => {
  woodSubmitting.value = true
  try {
    await api.delete(`/admin/forest-wood-types/${selectedWood.value.ID}`)
    woodTypes.value = woodTypes.value.filter(s => s.ID !== selectedWood.value.ID)
    showWoodDeleteModal.value = false
    showAlert('success', 'Wood type berhasil dihapus!')
  } catch { showAlert('error', 'Gagal menghapus wood type') }
  finally { woodSubmitting.value = false }
}

// ─── Approach ──────────────────────────────────────────────
const approachDesc = ref('')
const approachLoading = ref(true)
const approachSaving = ref(false)

const fetchApproach = async () => {
  approachLoading.value = true
  try {
    const res = await api.get('/admin/forest-approach')
    approachDesc.value = res.data?.data?.description || ''
  } catch { showAlert('error', 'Gagal memuat deskripsi approach') }
  finally { approachLoading.value = false }
}

const saveApproach = async () => {
  approachSaving.value = true
  try {
    await api.put('/admin/forest-approach', { description: approachDesc.value })
    showAlert('success', 'Deskripsi approach berhasil disimpan!')
  } catch (e) {
    showAlert('error', e.response?.data?.error || e.message || 'Gagal menyimpan')
  }
  finally { approachSaving.value = false }
}

// ─── Slider ───────────────────────────────────────────────────
const sliders = ref([])
const sliderLoading = ref(true)
const sliderSubmitting = ref(false)
const showSliderModal = ref(false)
const showSliderDeleteModal = ref(false)
const isSliderEdit = ref(false)
const selectedSlider = ref(null)
const sliderFileInput = ref(null)
const sliderImageFile = ref(null)
const sliderImagePreview = ref(null)
const sliderFormError = ref('')

const sliderForm = ref({ image_url: '', sort_order: 0 })

const fetchSliders = async () => {
  sliderLoading.value = true
  try {
    const res = await api.get('/admin/forest-sliders')
    sliders.value = res.data?.data || res.data || []
  } catch { showAlert('error', 'Gagal memuat slider') }
  finally { sliderLoading.value = false }
}

const openSliderCreate = () => {
  isSliderEdit.value = false
  sliderForm.value = { image_url: '', sort_order: 0 }
  sliderImagePreview.value = null; sliderImageFile.value = null; sliderFormError.value = ''
  showSliderModal.value = true
}

const openSliderEdit = (slide) => {
  isSliderEdit.value = true; selectedSlider.value = slide
  sliderForm.value = {
    image_url: slide.image_url || '',
    sort_order: slide.sort_order || 0,
  }
  sliderImagePreview.value = null; sliderImageFile.value = null; sliderFormError.value = ''
  showSliderModal.value = true
}

const closeSliderModal = () => { showSliderModal.value = false; sliderFormError.value = '' }

const handleSliderFileChange = async (e) => {
  const file = e.target.files[0]
  if (!file) {return}
  if (file.size > 5 * 1024 * 1024) { sliderFormError.value = 'Ukuran gambar maksimal 5MB'; return }
  sliderImageFile.value = file
  sliderImagePreview.value = URL.createObjectURL(file)
  await uploadSliderImage()
}

const uploadSliderImage = async () => {
  if (!sliderImageFile.value) {return}
  const fd = new FormData()
  fd.append('image', sliderImageFile.value)
  try {
    const res = await api.post('/upload', fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    sliderForm.value.image_url = res.data?.url || ''
  } catch (e) {
    console.error('Upload error:', e)
    sliderFormError.value = 'Gagal upload gambar'
  }
}

const submitSliderForm = async () => {
  if (!sliderForm.value.image_url) {
    sliderFormError.value = 'Gambar wajib diupload'; return
  }
  sliderSubmitting.value = true; sliderFormError.value = ''
  try {
    const payload = {
      image_url: sliderForm.value.image_url,
      sort_order: sliderForm.value.sort_order,
    }
    if (isSliderEdit.value) {
      await api.put(`/admin/forest-sliders/${selectedSlider.value.ID}`, payload)
      showAlert('success', 'Slide berhasil diperbarui!')
    } else {
      await api.post('/admin/forest-sliders', payload)
      showAlert('success', 'Slide berhasil ditambahkan!')
    }
    closeSliderModal(); await fetchSliders()
  } catch (e) {
    sliderFormError.value = e.response?.data?.error || e.response?.data?.message || e.message || 'Terjadi kesalahan.'
  } finally { sliderSubmitting.value = false }
}

const confirmSliderDelete = (slide) => { selectedSlider.value = slide; showSliderDeleteModal.value = true }
const doSliderDelete = async () => {
  sliderSubmitting.value = true
  try {
    await api.delete(`/admin/forest-sliders/${selectedSlider.value.ID}`)
    sliders.value = sliders.value.filter(s => s.ID !== selectedSlider.value.ID)
    showSliderDeleteModal.value = false
    showAlert('success', 'Slide berhasil dihapus!')
  } catch { showAlert('error', 'Gagal menghapus slide') }
  finally { sliderSubmitting.value = false }
}

// ─── Auth ─────────────────────────────────────────────────────
const getImageUrl = (path) => {
  if (!path) {return ''}
  if (path.startsWith('http')) {return path}
  return `${BASE_URL}/${path.replace(/^\//, '')}`
}

onMounted(() => {
  fetchWoodTypes()
  fetchApproach()
  fetchSliders()
})
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
