<template>
  <div class="min-h-screen bg-gray-100 flex">
    <AdminSidebar active="pulp-process" />

    <main class="flex-1 ml-64 p-10">
      <div class="mb-8">
        <p class="text-xs text-gray-400 font-semibold tracking-widest">CONTENT ENGINE</p>
        <h1 class="text-3xl font-black text-gray-900">Pulp Process Management</h1>
        <p class="text-gray-400 text-sm mt-1">Kelola section accordion dan tab chemical recovery.</p>
      </div>

      <div v-if="alert.show"
        :class="['mb-4 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2',
          alert.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200']">
        {{ alert.type === 'success' ? '✅' : '❌' }} {{ alert.message }}
      </div>

      <!-- ═══ PULP PROCESS SECTIONS ═══ -->
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-black text-gray-900">📋 Pulp Process Sections</h2>
            <p class="text-sm text-gray-400 mt-0.5">Kelola section accordion yang tampil di halaman pulp process.</p>
          </div>
          <button @click="openSectionCreate"
            class="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition flex items-center gap-2">
            <span class="text-lg leading-none">+</span> Tambah
          </button>
        </div>

        <div v-if="sectionsLoading" class="flex items-center justify-center py-12 gap-3 text-gray-400">
          <div class="w-5 h-5 border-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
          Memuat data...
        </div>

        <div v-else-if="sections.length === 0"
          class="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
          <p class="text-4xl mb-3">📋</p>
          <p class="text-gray-500 mb-4">Belum ada data section.</p>
          <button @click="openSectionCreate"
            class="bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition">
            + Tambah
          </button>
        </div>

        <div v-else class="grid gap-4">
          <div v-for="(item, i) in sections" :key="item.ID || i"
            class="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100 hover:border-gray-200 transition">
            <div class="w-24 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0 border">
              <img :src="getImageUrl(item.image_url)" class="w-full h-full object-cover"
                @error="(e) => e.target.src='https://via.placeholder.com/150?text=No+Image'" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-gray-900 text-sm">{{ item.title || '(no title)' }}</p>
              <p class="text-xs text-gray-400 truncate">{{ item.description }}</p>
              <p class="text-xs text-gray-300 mt-0.5">Urutan: {{ item.sort_order || 0 }}</p>
              <span :class="['inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium',
                item.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500']">
                {{ item.is_active ? 'Active' : 'Inactive' }}
              </span>
            </div>
            <div class="flex gap-2 flex-shrink-0">
              <button @click="openSectionEdit(item)"
                class="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition">Edit</button>
              <button @click="confirmSectionDelete(item)"
                class="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 transition">Hapus</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ CHEMICAL RECOVERY TABS ═══ -->
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-black text-gray-900">🧪 Chemical Recovery Tabs</h2>
            <p class="text-sm text-gray-400 mt-0.5">Kelola data tab chemical recovery yang tampil di halaman pulp process.</p>
          </div>
          <button @click="openRecoveryCreate"
            class="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition flex items-center gap-2">
            <span class="text-lg leading-none">+</span> Tambah
          </button>
        </div>

        <div v-if="recoveriesLoading" class="flex items-center justify-center py-12 gap-3 text-gray-400">
          <div class="w-5 h-5 border-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
          Memuat data...
        </div>

        <div v-else-if="recoveries.length === 0"
          class="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
          <p class="text-4xl mb-3">🧪</p>
          <p class="text-gray-500 mb-4">Belum ada data recovery.</p>
          <button @click="openRecoveryCreate"
            class="bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition">
            + Tambah
          </button>
        </div>

        <div v-else class="grid gap-4">
          <div v-for="(item, i) in recoveries" :key="item.ID || i"
            class="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100 hover:border-gray-200 transition">
            <div class="w-24 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0 border">
              <img :src="getImageUrl(item.image_url)" class="w-full h-full object-cover"
                @error="(e) => e.target.src='https://via.placeholder.com/150?text=No+Image'" />
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-gray-900 text-sm">{{ item.title || '(no title)' }}</p>
              <p class="text-xs text-gray-400 truncate">{{ item.description }}</p>
              <p class="text-xs text-gray-300 mt-0.5">Urutan: {{ item.sort_order || 0 }}</p>
              <span :class="['inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium',
                item.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500']">
                {{ item.is_active ? 'Active' : 'Inactive' }}
              </span>
            </div>
            <div class="flex gap-2 flex-shrink-0">
              <button @click="openRecoveryEdit(item)"
                class="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition">Edit</button>
              <button @click="confirmRecoveryDelete(item)"
                class="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 transition">Hapus</button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal Pulp Process Section -->
    <Transition name="modal">
      <div v-if="showSectionModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="closeSectionModal">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 class="text-xl font-black text-gray-900">
              {{ isSectionEdit ? '✏️ Edit Section' : '➕ Tambah Section' }}
            </h2>
            <button @click="closeSectionModal" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
          </div>
          <form @submit.prevent="submitSectionForm" class="p-6 space-y-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Judul <span class="text-red-500">*</span></label>
              <input v-model="sectionForm.title" type="text" placeholder="Misal: Wood and Chip Handling" required
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Deskripsi</label>
              <textarea v-model="sectionForm.description" rows="3" placeholder="Deskripsi section..."
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"></textarea>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Gambar</label>
              <div class="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-green-400 transition cursor-pointer"
                @click="$refs.sectionFileInput.click()">
                <input ref="sectionFileInput" type="file" accept="image/*" class="hidden" @change="handleSectionFileChange" />
                <div v-if="sectionImagePreview || sectionForm.image_url">
                  <img :src="sectionImagePreview || getImageUrl(sectionForm.image_url)"
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
              <input v-model.number="sectionForm.sort_order" type="number" min="0"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div class="flex items-center gap-3">
              <input v-model="sectionForm.is_active" type="checkbox" id="sectionActive"
                class="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-400" />
              <label for="sectionActive" class="text-sm font-semibold text-gray-700">Active</label>
            </div>
            <div v-if="sectionFormError" class="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
              ❌ {{ sectionFormError }}
            </div>
            <div class="flex gap-3 pt-2">
              <button type="button" @click="closeSectionModal"
                class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Batal</button>
              <button type="submit" :disabled="sectionSubmitting"
                class="flex-1 bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition disabled:opacity-60 flex items-center justify-center gap-2">
                <div v-if="sectionSubmitting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {{ sectionSubmitting ? 'Menyimpan...' : (isSectionEdit ? 'Simpan Perubahan' : 'Tambah') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Modal Hapus Section -->
    <Transition name="modal">
      <div v-if="showSectionDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="showSectionDeleteModal = false">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
          <p class="text-4xl mb-3">🗑️</p>
          <h3 class="text-lg font-black text-gray-900 mb-1">Hapus Section?</h3>
          <p class="text-sm text-gray-500 mb-6">Data akan dihapus permanen.</p>
          <div class="flex gap-3">
            <button @click="showSectionDeleteModal = false"
              class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Batal</button>
            <button @click="doSectionDelete" :disabled="sectionSubmitting"
              class="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 transition disabled:opacity-60">
              {{ sectionSubmitting ? 'Menghapus...' : 'Hapus' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Modal Chemical Recovery -->
    <Transition name="modal">
      <div v-if="showRecoveryModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="closeRecoveryModal">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 class="text-xl font-black text-gray-900">
              {{ isRecoveryEdit ? '✏️ Edit Chemical Recovery' : '➕ Tambah Chemical Recovery' }}
            </h2>
            <button @click="closeRecoveryModal" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
          </div>
          <form @submit.prevent="submitRecoveryForm" class="p-6 space-y-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Judul <span class="text-red-500">*</span></label>
              <input v-model="recoveryForm.title" type="text" placeholder="Misal: Evaporator Plant (7-Effect)" required
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Deskripsi</label>
              <textarea v-model="recoveryForm.description" rows="3" placeholder="Deskripsi chemical recovery..."
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"></textarea>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Gambar</label>
              <div class="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-green-400 transition cursor-pointer"
                @click="$refs.recoveryFileInput.click()">
                <input ref="recoveryFileInput" type="file" accept="image/*" class="hidden" @change="handleRecoveryFileChange" />
                <div v-if="recoveryImagePreview || recoveryForm.image_url">
                  <img :src="recoveryImagePreview || getImageUrl(recoveryForm.image_url)"
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
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Specs (JSON)</label>
              <textarea v-model="recoveryForm.specs" rows="4" placeholder='[{"label":"Inlet Concentration","value":"15% Dissolved Solids"}]'
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 font-mono resize-none"></textarea>
              <p class="text-xs text-gray-400 mt-1">Array of objects with label & value fields.</p>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Urutan</label>
              <input v-model.number="recoveryForm.sort_order" type="number" min="0"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div class="flex items-center gap-3">
              <input v-model="recoveryForm.is_active" type="checkbox" id="recoveryActive"
                class="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-400" />
              <label for="recoveryActive" class="text-sm font-semibold text-gray-700">Active</label>
            </div>
            <div v-if="recoveryFormError" class="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
              ❌ {{ recoveryFormError }}
            </div>
            <div class="flex gap-3 pt-2">
              <button type="button" @click="closeRecoveryModal"
                class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Batal</button>
              <button type="submit" :disabled="recoverySubmitting"
                class="flex-1 bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition disabled:opacity-60 flex items-center justify-center gap-2">
                <div v-if="recoverySubmitting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {{ recoverySubmitting ? 'Menyimpan...' : (isRecoveryEdit ? 'Simpan Perubahan' : 'Tambah') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Modal Hapus Chemical Recovery -->
    <Transition name="modal">
      <div v-if="showRecoveryDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="showRecoveryDeleteModal = false">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
          <p class="text-4xl mb-3">🗑️</p>
          <h3 class="text-lg font-black text-gray-900 mb-1">Hapus Chemical Recovery?</h3>
          <p class="text-sm text-gray-500 mb-6">Data akan dihapus permanen.</p>
          <div class="flex gap-3">
            <button @click="showRecoveryDeleteModal = false"
              class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Batal</button>
            <button @click="doRecoveryDelete" :disabled="recoverySubmitting"
              class="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 transition disabled:opacity-60">
              {{ recoverySubmitting ? 'Menghapus...' : 'Hapus' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminSidebar from '@/components/AdminSidebar.vue'
import api from '../../services/api'

const BASE_URL = import.meta.env.VITE_BASE_URL || (import.meta.env.DEV ? 'http://localhost:8080' : '')

// ─── Alert ────────────────────────────────────────────────────
const alert = ref({ show: false, type: 'success', message: '' })
const showAlert = (type, message) => {
  alert.value = { show: true, type, message }
  setTimeout(() => { alert.value.show = false }, 3000)
}

// ─── Pulp Process Sections ────────────────────────────────────
const sections = ref([])
const sectionsLoading = ref(true)
const sectionSubmitting = ref(false)
const showSectionModal = ref(false)
const showSectionDeleteModal = ref(false)
const isSectionEdit = ref(false)
const selectedSection = ref(null)
const sectionFileInput = ref(null)
const sectionImageFile = ref(null)
const sectionImagePreview = ref(null)
const sectionFormError = ref('')

const sectionForm = ref({ title: '', description: '', image_url: '', sort_order: 0, is_active: true })

const fetchSections = async () => {
  sectionsLoading.value = true
  try {
    const res = await api.get('/admin/pulp-process-sections')
    sections.value = res.data?.data || res.data || []
  } catch { showAlert('error', 'Gagal memuat sections') }
  finally { sectionsLoading.value = false }
}

const openSectionCreate = () => {
  isSectionEdit.value = false
  sectionForm.value = { title: '', description: '', image_url: '', sort_order: 0, is_active: true }
  sectionImagePreview.value = null; sectionImageFile.value = null; sectionFormError.value = ''
  showSectionModal.value = true
}

const openSectionEdit = (item) => {
  isSectionEdit.value = true; selectedSection.value = item
  sectionForm.value = {
    title: item.title || '',
    description: item.description || '',
    image_url: item.image_url || '',
    sort_order: item.sort_order || 0,
    is_active: item.is_active !== undefined ? item.is_active : true,
  }
  sectionImagePreview.value = null; sectionImageFile.value = null; sectionFormError.value = ''
  showSectionModal.value = true
}

const closeSectionModal = () => { showSectionModal.value = false; sectionFormError.value = '' }

const handleSectionFileChange = async (e) => {
  const file = e.target.files[0]
  if (!file) {return}
  if (file.size > 5 * 1024 * 1024) { sectionFormError.value = 'Ukuran gambar maksimal 5MB'; return }
  sectionImageFile.value = file
  sectionImagePreview.value = URL.createObjectURL(file)
  await uploadSectionImage()
}

const uploadSectionImage = async () => {
  if (!sectionImageFile.value) {return}
  const fd = new FormData()
  fd.append('image', sectionImageFile.value)
  try {
    const res = await api.post('/upload', fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    sectionForm.value.image_url = res.data?.url || ''
  } catch (e) {
    console.error('Upload error:', e)
    sectionFormError.value = 'Gagal upload gambar'
  }
}

const submitSectionForm = async () => {
  if (!sectionForm.value.title.trim()) {
    sectionFormError.value = 'Judul wajib diisi'; return
  }
  sectionSubmitting.value = true; sectionFormError.value = ''
  try {
    const payload = {
      title: sectionForm.value.title,
      description: sectionForm.value.description,
      image_url: sectionForm.value.image_url,
      sort_order: sectionForm.value.sort_order,
      is_active: sectionForm.value.is_active,
    }
    if (isSectionEdit.value) {
      await api.put(`/admin/pulp-process-sections/${selectedSection.value.ID}`, payload)
      showAlert('success', 'Section berhasil diperbarui!')
    } else {
      await api.post('/admin/pulp-process-sections', payload)
      showAlert('success', 'Section berhasil ditambahkan!')
    }
    closeSectionModal(); await fetchSections()
  } catch (e) {
    sectionFormError.value = e.response?.data?.error || e.response?.data?.message || e.message || 'Terjadi kesalahan.'
  } finally { sectionSubmitting.value = false }
}

const confirmSectionDelete = (item) => { selectedSection.value = item; showSectionDeleteModal.value = true }
const doSectionDelete = async () => {
  sectionSubmitting.value = true
  try {
    await api.delete(`/admin/pulp-process-sections/${selectedSection.value.ID}`)
    sections.value = sections.value.filter(s => s.ID !== selectedSection.value.ID)
    showSectionDeleteModal.value = false
    showAlert('success', 'Section berhasil dihapus!')
  } catch { showAlert('error', 'Gagal menghapus section') }
  finally { sectionSubmitting.value = false }
}

// ─── Chemical Recovery Tabs ────────────────────────────────────
const recoveries = ref([])
const recoveriesLoading = ref(true)
const recoverySubmitting = ref(false)
const showRecoveryModal = ref(false)
const showRecoveryDeleteModal = ref(false)
const isRecoveryEdit = ref(false)
const selectedRecovery = ref(null)
const recoveryFileInput = ref(null)
const recoveryImageFile = ref(null)
const recoveryImagePreview = ref(null)
const recoveryFormError = ref('')

const recoveryForm = ref({ title: '', description: '', image_url: '', specs: '', sort_order: 0, is_active: true })

const fetchRecoveries = async () => {
  recoveriesLoading.value = true
  try {
    const res = await api.get('/admin/pulp-process-recoveries')
    const data = res.data?.data || res.data || []
    recoveries.value = data.map(r => ({
      ...r,
      _specsStr: r.specs ? (typeof r.specs === 'string' ? r.specs : JSON.stringify(r.specs, null, 2)) : ''
    }))
  } catch { showAlert('error', 'Gagal memuat recoveries') }
  finally { recoveriesLoading.value = false }
}

const openRecoveryCreate = () => {
  isRecoveryEdit.value = false
  recoveryForm.value = { title: '', description: '', image_url: '', specs: '', sort_order: 0, is_active: true }
  recoveryImagePreview.value = null; recoveryImageFile.value = null; recoveryFormError.value = ''
  showRecoveryModal.value = true
}

const openRecoveryEdit = (item) => {
  isRecoveryEdit.value = true; selectedRecovery.value = item
  recoveryForm.value = {
    title: item.title || '',
    description: item.description || '',
    image_url: item.image_url || '',
    specs: item._specsStr || '',
    sort_order: item.sort_order || 0,
    is_active: item.is_active !== undefined ? item.is_active : true,
  }
  recoveryImagePreview.value = null; recoveryImageFile.value = null; recoveryFormError.value = ''
  showRecoveryModal.value = true
}

const closeRecoveryModal = () => { showRecoveryModal.value = false; recoveryFormError.value = '' }

const handleRecoveryFileChange = async (e) => {
  const file = e.target.files[0]
  if (!file) {return}
  if (file.size > 5 * 1024 * 1024) { recoveryFormError.value = 'Ukuran gambar maksimal 5MB'; return }
  recoveryImageFile.value = file
  recoveryImagePreview.value = URL.createObjectURL(file)
  await uploadRecoveryImage()
}

const uploadRecoveryImage = async () => {
  if (!recoveryImageFile.value) {return}
  const fd = new FormData()
  fd.append('image', recoveryImageFile.value)
  try {
    const res = await api.post('/upload', fd, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    recoveryForm.value.image_url = res.data?.url || ''
  } catch (e) {
    console.error('Upload error:', e)
    recoveryFormError.value = 'Gagal upload gambar'
  }
}

const submitRecoveryForm = async () => {
  if (!recoveryForm.value.title.trim()) {
    recoveryFormError.value = 'Judul wajib diisi'; return
  }
  if (recoveryForm.value.specs.trim()) {
    try {
      JSON.parse(recoveryForm.value.specs)
    } catch {
      recoveryFormError.value = 'Format JSON specs tidak valid'; return
    }
  }
  recoverySubmitting.value = true; recoveryFormError.value = ''
  try {
    const payload = {
      title: recoveryForm.value.title,
      description: recoveryForm.value.description,
      image_url: recoveryForm.value.image_url,
      specs: recoveryForm.value.specs,
      sort_order: recoveryForm.value.sort_order,
      is_active: recoveryForm.value.is_active,
    }
    if (isRecoveryEdit.value) {
      await api.put(`/admin/pulp-process-recoveries/${selectedRecovery.value.ID}`, payload)
      showAlert('success', 'Chemical recovery berhasil diperbarui!')
    } else {
      await api.post('/admin/pulp-process-recoveries', payload)
      showAlert('success', 'Chemical recovery berhasil ditambahkan!')
    }
    closeRecoveryModal(); await fetchRecoveries()
  } catch (e) {
    recoveryFormError.value = e.response?.data?.error || e.response?.data?.message || e.message || 'Terjadi kesalahan.'
  } finally { recoverySubmitting.value = false }
}

const confirmRecoveryDelete = (item) => { selectedRecovery.value = item; showRecoveryDeleteModal.value = true }
const doRecoveryDelete = async () => {
  recoverySubmitting.value = true
  try {
    await api.delete(`/admin/pulp-process-recoveries/${selectedRecovery.value.ID}`)
    recoveries.value = recoveries.value.filter(r => r.ID !== selectedRecovery.value.ID)
    showRecoveryDeleteModal.value = false
    showAlert('success', 'Chemical recovery berhasil dihapus!')
  } catch { showAlert('error', 'Gagal menghapus chemical recovery') }
  finally { recoverySubmitting.value = false }
}

// ─── Auth & Helpers ────────────────────────────────────────────
const getImageUrl = (path) => {
  if (!path) {return ''}
  if (path.startsWith('http')) {return path}
  return `${BASE_URL}/${path.replace(/^\//, '')}`
}

onMounted(() => {
  fetchSections()
  fetchRecoveries()
})
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
