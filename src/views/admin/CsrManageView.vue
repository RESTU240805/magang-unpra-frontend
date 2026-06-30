<template>
  <div class="min-h-screen bg-gray-100 flex">
    <AdminSidebar active="csr" />

    <main class="flex-1 ml-64 p-10">
      <div class="mb-8">
        <p class="text-xs text-gray-400 font-semibold tracking-widest">CONTENT ENGINE</p>
        <h1 class="text-3xl font-black text-gray-900">CSR Management</h1>
        <p class="text-gray-400 text-sm mt-1">Kelola visi strategi CSR dan laporan CSR.</p>
      </div>

      <div v-if="alert.show"
        :class="['mb-4 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2',
          alert.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200']">
        {{ alert.type === 'success' ? '✅' : '❌' }} {{ alert.message }}
      </div>

      <!-- ═══ CSR CORPORATE DESCRIPTION ═══ -->
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <div class="mb-6">
          <h2 class="text-xl font-black text-gray-900">🏢 Corporate Social Responsibility</h2>
          <p class="text-sm text-gray-400 mt-0.5">Kelola deskripsi corporate yang tampil di halaman Vision And Mission.</p>
        </div>

        <div v-if="contentLoading" class="flex items-center justify-center py-12 gap-3 text-gray-400">
          <div class="w-5 h-5 border-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
          Memuat data...
        </div>

        <form v-else @submit.prevent="submitContentForm" class="space-y-5">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Deskripsi Corporate <span class="text-red-500">*</span></label>
            <textarea v-model="contentForm.corporate_description" rows="8" placeholder="Deskripsi Corporate Social Responsibility..." required
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"></textarea>
          </div>
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Objectives <span class="text-red-500">*</span></label>
            <textarea v-model="contentForm.objectives" rows="8" placeholder="Objectives of the CSR Program (pisahkan paragraf dengan baris kosong)..." required
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"></textarea>
          </div>
          <div v-if="contentFormError" class="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
            ❌ {{ contentFormError }}
          </div>
          <button type="submit" :disabled="contentSubmitting"
            class="bg-green-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition disabled:opacity-60 flex items-center justify-center gap-2">
            <div v-if="contentSubmitting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            {{ contentSubmitting ? 'Menyimpan...' : 'Simpan Deskripsi' }}
          </button>
        </form>
      </div>

      <!-- ═══ CSR VISION STRATEGIES ═══ -->
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-black text-gray-900">🎯 CSR Vision Strategies</h2>
            <p class="text-sm text-gray-400 mt-0.5">Kelola visi strategi CSR yang tampil di halaman CSR.</p>
          </div>
          <button @click="openStrategyCreate"
            class="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition flex items-center gap-2">
            <span class="text-lg leading-none">+</span> Tambah
          </button>
        </div>

        <div v-if="strategiesLoading" class="flex items-center justify-center py-12 gap-3 text-gray-400">
          <div class="w-5 h-5 border-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
          Memuat data...
        </div>

        <div v-else-if="strategies.length === 0"
          class="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
          <p class="text-4xl mb-3">🎯</p>
          <p class="text-gray-500 mb-4">Belum ada strategi.</p>
          <button @click="openStrategyCreate"
            class="bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition">
            + Tambah
          </button>
        </div>

        <div v-else class="grid gap-4">
          <div v-for="(item, i) in strategies" :key="item.ID || i"
            class="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100 hover:border-gray-200 transition">
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-gray-900 text-sm">{{ item.description || '(no description)' }}</p>
              <p class="text-xs text-gray-300 mt-0.5">Urutan: {{ item.sort_order || 0 }}</p>
            </div>
            <div class="flex items-center gap-3 flex-shrink-0">
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" :checked="item.is_active" @change="toggleStrategyActive(item)" class="sr-only peer" />
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
              </label>
              <button @click="openStrategyEdit(item)"
                class="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition">Edit</button>
              <button @click="confirmStrategyDelete(item)"
                class="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 transition">Hapus</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ CSR REPORTS ═══ -->
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-black text-gray-900">📄 CSR Reports</h2>
            <p class="text-sm text-gray-400 mt-0.5">Kelola laporan CSR tahunan per kuartal.</p>
          </div>
          <button @click="openReportCreate"
            class="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition flex items-center gap-2">
            <span class="text-lg leading-none">+</span> Tambah
          </button>
        </div>

        <div v-if="reportsLoading" class="flex items-center justify-center py-12 gap-3 text-gray-400">
          <div class="w-5 h-5 border-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
          Memuat data...
        </div>

        <div v-else-if="reports.length === 0"
          class="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
          <p class="text-4xl mb-3">📄</p>
          <p class="text-gray-500 mb-4">Belum ada laporan.</p>
          <button @click="openReportCreate"
            class="bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition">
            + Tambah
          </button>
        </div>

        <div v-else class="grid gap-4">
          <div v-for="(item, i) in reports" :key="item.ID || i"
            class="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100 hover:border-gray-200 transition">
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-gray-900 text-sm">{{ item.quarter }} - {{ item.year }}</p>
              <p class="text-xs text-gray-400">{{ item.period }}</p>
              <a v-if="item.file_url" :href="getReportFileUrl(item.file_url)" target="_blank" class="text-xs text-blue-500 hover:underline truncate mt-0.5 block">{{ item.file_url.split('/').pop() }}</a>
              <p class="text-xs text-gray-300 mt-0.5">Urutan: {{ item.sort_order || 0 }}</p>
            </div>
            <div class="flex items-center gap-3 flex-shrink-0">
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" :checked="item.is_active" @change="toggleReportActive(item)" class="sr-only peer" />
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
              </label>
              <button @click="openReportEdit(item)"
                class="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition">Edit</button>
              <button @click="confirmReportDelete(item)"
                class="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 transition">Hapus</button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal Strategy -->
    <Transition name="modal">
      <div v-if="showStrategyModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="closeStrategyModal">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 class="text-xl font-black text-gray-900">
              {{ isStrategyEdit ? '✏️ Edit Strategy' : '➕ Tambah Strategy' }}
            </h2>
            <button @click="closeStrategyModal" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
          </div>
          <form @submit.prevent="submitStrategyForm" class="p-6 space-y-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Deskripsi <span class="text-red-500">*</span></label>
              <textarea v-model="strategyForm.description" rows="4" placeholder="Tulis strategi CSR..." required
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"></textarea>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Urutan</label>
              <input v-model.number="strategyForm.sort_order" type="number" min="0"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Status Aktif</label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="strategyForm.is_active" class="sr-only peer" />
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
            <div v-if="strategyFormError" class="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
              ❌ {{ strategyFormError }}
            </div>
            <div class="flex gap-3 pt-2">
              <button type="button" @click="closeStrategyModal"
                class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Batal</button>
              <button type="submit" :disabled="strategySubmitting"
                class="flex-1 bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition disabled:opacity-60 flex items-center justify-center gap-2">
                <div v-if="strategySubmitting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {{ strategySubmitting ? 'Menyimpan...' : (isStrategyEdit ? 'Simpan Perubahan' : 'Tambah') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Modal Hapus Strategy -->
    <Transition name="modal">
      <div v-if="showStrategyDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="showStrategyDeleteModal = false">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
          <p class="text-4xl mb-3">🗑️</p>
          <h3 class="text-lg font-black text-gray-900 mb-1">Hapus Strategy?</h3>
          <p class="text-sm text-gray-500 mb-6">Data akan dihapus permanen.</p>
          <div class="flex gap-3">
            <button @click="showStrategyDeleteModal = false"
              class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Batal</button>
            <button @click="doStrategyDelete" :disabled="strategySubmitting"
              class="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 transition disabled:opacity-60">
              {{ strategySubmitting ? 'Menghapus...' : 'Hapus' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Modal Report -->
    <Transition name="modal">
      <div v-if="showReportModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="closeReportModal">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 class="text-xl font-black text-gray-900">
              {{ isReportEdit ? '✏️ Edit Report' : '➕ Tambah Report' }}
            </h2>
            <button @click="closeReportModal" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
          </div>
          <form @submit.prevent="submitReportForm" class="p-6 space-y-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Tahun <span class="text-red-500">*</span></label>
              <input v-model.number="reportForm.year" type="number" min="2000" max="2100" required
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Kuartal <span class="text-red-500">*</span></label>
              <input v-model="reportForm.quarter" type="text" placeholder="Misal: 1st Quarter" required
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Periode</label>
              <input v-model="reportForm.period" type="text" placeholder="Misal: Jan - Mar 2020"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">File PDF</label>
              <input ref="reportFileInput" type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx" class="hidden" @change="handleReportFileChange" />
              <div class="flex items-center gap-3">
                <button type="button" @click="$refs.reportFileInput.click()"
                  class="bg-blue-50 text-blue-600 px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-100 transition flex items-center gap-2 border border-blue-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  {{ reportForm.file_url ? 'Ganti File' : 'Pilih File' }}
                </button>
                <span v-if="reportFileUploading" class="text-xs text-gray-400 flex items-center gap-1">
                  <div class="w-3 h-3 border-2 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div> Upload...
                </span>
              </div>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Urutan</label>
              <input v-model.number="reportForm.sort_order" type="number" min="0"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Status Aktif</label>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="reportForm.is_active" class="sr-only peer" />
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
              </label>
            </div>
            <div v-if="reportFormError" class="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
              ❌ {{ reportFormError }}
            </div>
            <div class="flex gap-3 pt-2">
              <button type="button" @click="closeReportModal"
                class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Batal</button>
              <button type="submit" :disabled="reportSubmitting"
                class="flex-1 bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition disabled:opacity-60 flex items-center justify-center gap-2">
                <div v-if="reportSubmitting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {{ reportSubmitting ? 'Menyimpan...' : (isReportEdit ? 'Simpan Perubahan' : 'Tambah') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Modal Hapus Report -->
    <Transition name="modal">
      <div v-if="showReportDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="showReportDeleteModal = false">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
          <p class="text-4xl mb-3">🗑️</p>
          <h3 class="text-lg font-black text-gray-900 mb-1">Hapus Report?</h3>
          <p class="text-sm text-gray-500 mb-6">Data akan dihapus permanen.</p>
          <div class="flex gap-3">
            <button @click="showReportDeleteModal = false"
              class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Batal</button>
            <button @click="doReportDelete" :disabled="reportSubmitting"
              class="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 transition disabled:opacity-60">
              {{ reportSubmitting ? 'Menghapus...' : 'Hapus' }}
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


// ─── Alert ────────────────────────────────────────────────────
const alert = ref({ show: false, type: 'success', message: '' })
const showAlert = (type, message) => {
  alert.value = { show: true, type, message }
  setTimeout(() => { alert.value.show = false }, 3000)
}

// ─── Corporate Description ────────────────────────────────────
const contentLoading = ref(true)
const contentSubmitting = ref(false)
const contentFormError = ref('')
const contentForm = ref({ corporate_description: '', objectives: '' })

const fetchContent = async () => {
  contentLoading.value = true
  try {
    const res = await api.get('/admin/csr-vision-content')
    contentForm.value = {
      corporate_description: res.data?.data?.corporate_description || '',
      objectives: res.data?.data?.objectives || '',
    }
  } catch { showAlert('error', 'Gagal memuat deskripsi corporate') }
  finally { contentLoading.value = false }
}

const submitContentForm = async () => {
  if (!contentForm.value.corporate_description.trim()) {
    contentFormError.value = 'Deskripsi wajib diisi'; return
  }
  contentSubmitting.value = true; contentFormError.value = ''
  try {
    await api.put('/admin/csr-vision-content', contentForm.value)
    showAlert('success', 'Deskripsi corporate berhasil diperbarui!')
    await fetchContent()
  } catch (e) {
    contentFormError.value = e.response?.data?.error || e.response?.data?.message || e.message || 'Terjadi kesalahan.'
  } finally { contentSubmitting.value = false }
}

// ─── Vision Strategies ────────────────────────────────────────
const strategies = ref([])
const strategiesLoading = ref(true)
const strategySubmitting = ref(false)
const showStrategyModal = ref(false)
const showStrategyDeleteModal = ref(false)
const isStrategyEdit = ref(false)
const selectedStrategy = ref(null)
const strategyFormError = ref('')

const strategyForm = ref({ description: '', sort_order: 0, is_active: true })

const fetchStrategies = async () => {
  strategiesLoading.value = true
  try {
    const res = await api.get('/admin/csr-vision-strategies')
    strategies.value = res.data?.data || res.data || []
  } catch { showAlert('error', 'Gagal memuat strategi') }
  finally { strategiesLoading.value = false }
}

const openStrategyCreate = () => {
  isStrategyEdit.value = false
  strategyForm.value = { description: '', sort_order: 0, is_active: true }
  strategyFormError.value = ''
  showStrategyModal.value = true
}

const openStrategyEdit = (item) => {
  isStrategyEdit.value = true; selectedStrategy.value = item
  strategyForm.value = {
    description: item.description || '',
    sort_order: item.sort_order || 0,
    is_active: item.is_active !== undefined ? item.is_active : true,
  }
  strategyFormError.value = ''
  showStrategyModal.value = true
}

const closeStrategyModal = () => { showStrategyModal.value = false; strategyFormError.value = '' }

const submitStrategyForm = async () => {
  if (!strategyForm.value.description.trim()) {
    strategyFormError.value = 'Deskripsi wajib diisi'; return
  }
  strategySubmitting.value = true; strategyFormError.value = ''
  try {
    const payload = {
      description: strategyForm.value.description,
      sort_order: strategyForm.value.sort_order,
      is_active: strategyForm.value.is_active,
    }
    if (isStrategyEdit.value) {
      await api.put(`/admin/csr-vision-strategies/${selectedStrategy.value.ID}`, payload)
      showAlert('success', 'Strategy berhasil diperbarui!')
    } else {
      await api.post('/admin/csr-vision-strategies', payload)
      showAlert('success', 'Strategy berhasil ditambahkan!')
    }
    closeStrategyModal(); await fetchStrategies()
  } catch (e) {
    strategyFormError.value = e.response?.data?.error || e.response?.data?.message || e.message || 'Terjadi kesalahan.'
  } finally { strategySubmitting.value = false }
}

const toggleStrategyActive = async (item) => {
  try {
    const newActive = !item.is_active
    await api.put(`/admin/csr-vision-strategies/${item.ID}`, { is_active: newActive })
    await fetchStrategies()
    showAlert('success', `Strategy ${newActive ? 'diaktifkan' : 'dinonaktifkan'}!`)
  } catch { showAlert('error', 'Gagal mengubah status') }
}

const confirmStrategyDelete = (item) => { selectedStrategy.value = item; showStrategyDeleteModal.value = true }
const doStrategyDelete = async () => {
  strategySubmitting.value = true
  try {
    await api.delete(`/admin/csr-vision-strategies/${selectedStrategy.value.ID}`)
    strategies.value = strategies.value.filter(s => s.ID !== selectedStrategy.value.ID)
    showStrategyDeleteModal.value = false
    showAlert('success', 'Strategy berhasil dihapus!')
  } catch { showAlert('error', 'Gagal menghapus strategy') }
  finally { strategySubmitting.value = false }
}

// ─── Reports ──────────────────────────────────────────────────
const reports = ref([])
const reportsLoading = ref(true)
const reportSubmitting = ref(false)
const showReportModal = ref(false)
const showReportDeleteModal = ref(false)
const isReportEdit = ref(false)
const selectedReport = ref(null)
const reportFormError = ref('')

const reportForm = ref({ year: new Date().getFullYear(), quarter: '', period: '', file_url: '', sort_order: 0, is_active: true })
const reportFileUploading = ref(false)

const getReportFileUrl = (path) => {
  if (!path) { return '' }
  if (path.startsWith('http')) { return path }
  const base = import.meta.env.VITE_BASE_URL || ''
  return `${base}/${path.replace(/^\//, '')}`
}

const handleReportFileChange = async (e) => {
  const file = e.target.files[0]
  if (!file) { return }
  reportFileUploading.value = true
  try {
    const fd = new FormData()
    fd.append('file', file)
    const res = await api.post('/upload/document', fd)
    reportForm.value.file_url = res.data.url || ''
    showAlert('success', 'File berhasil diupload!')
  } catch {
    showAlert('error', 'Gagal upload file')
  } finally {
    reportFileUploading.value = false
    e.target.value = ''
  }
}

const fetchReports = async () => {
  reportsLoading.value = true
  try {
    const res = await api.get('/admin/csr-reports')
    reports.value = res.data?.data || res.data || []
  } catch { showAlert('error', 'Gagal memuat laporan') }
  finally { reportsLoading.value = false }
}

const openReportCreate = () => {
  isReportEdit.value = false
  reportForm.value = { year: new Date().getFullYear(), quarter: '', period: '', file_url: '', sort_order: 0, is_active: true }
  reportFormError.value = ''
  showReportModal.value = true
}

const openReportEdit = (item) => {
  isReportEdit.value = true; selectedReport.value = item
  reportForm.value = {
    year: item.year || new Date().getFullYear(),
    quarter: item.quarter || '',
    period: item.period || '',
    file_url: item.file_url || '',
    sort_order: item.sort_order || 0,
    is_active: item.is_active !== undefined ? item.is_active : true,
  }
  reportFormError.value = ''
  showReportModal.value = true
}

const closeReportModal = () => { showReportModal.value = false; reportFormError.value = '' }

const submitReportForm = async () => {
  if (!reportForm.value.year) {
    reportFormError.value = 'Tahun wajib diisi'; return
  }
  if (!reportForm.value.quarter.trim()) {
    reportFormError.value = 'Kuartal wajib diisi'; return
  }
  reportSubmitting.value = true; reportFormError.value = ''
  try {
    const payload = {
      year: reportForm.value.year,
      quarter: reportForm.value.quarter,
      period: reportForm.value.period,
      file_url: reportForm.value.file_url,
      sort_order: reportForm.value.sort_order,
      is_active: reportForm.value.is_active,
    }
    if (isReportEdit.value) {
      await api.put(`/admin/csr-reports/${selectedReport.value.ID}`, payload)
      showAlert('success', 'Report berhasil diperbarui!')
    } else {
      await api.post('/admin/csr-reports', payload)
      showAlert('success', 'Report berhasil ditambahkan!')
    }
    closeReportModal(); await fetchReports()
  } catch (e) {
    reportFormError.value = e.response?.data?.error || e.response?.data?.message || e.message || 'Terjadi kesalahan.'
  } finally { reportSubmitting.value = false }
}

const toggleReportActive = async (item) => {
  try {
    const newActive = !item.is_active
    await api.put(`/admin/csr-reports/${item.ID}`, { is_active: newActive })
    await fetchReports()
    showAlert('success', `Report ${newActive ? 'diaktifkan' : 'dinonaktifkan'}!`)
  } catch { showAlert('error', 'Gagal mengubah status') }
}

const confirmReportDelete = (item) => { selectedReport.value = item; showReportDeleteModal.value = true }
const doReportDelete = async () => {
  reportSubmitting.value = true
  try {
    await api.delete(`/admin/csr-reports/${selectedReport.value.ID}`)
    reports.value = reports.value.filter(s => s.ID !== selectedReport.value.ID)
    showReportDeleteModal.value = false
    showAlert('success', 'Report berhasil dihapus!')
  } catch { showAlert('error', 'Gagal menghapus report') }
  finally { reportSubmitting.value = false }
}

onMounted(() => {
  fetchContent()
  fetchStrategies()
  fetchReports()
})
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
