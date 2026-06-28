<template>
  <div class="min-h-screen bg-gray-100 flex">
    <AdminSidebar active="contact" />
    <main class="flex-1 ml-64 p-10">

      <div class="flex justify-between items-center mb-8">
        <div>
          <p class="text-xs text-gray-400 font-semibold tracking-widest">CONTACT ENGINE</p>
          <h1 class="text-3xl font-black text-gray-900">Contact Management</h1>
        </div>
      </div>

      <div v-if="alert.show"
        :class="['mb-4 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2',
          alert.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200']">
        {{ alert.type === 'success' ? '✅' : '❌' }} {{ alert.message }}
      </div>

      <!-- ════════════════════════════════════════════════════════
           SECTION: CONTACT INFO (Footer / Global)
           ════════════════════════════════════════════════════════ -->
      <section class="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">I</div>
          <div>
            <h2 class="font-bold text-gray-900">Contact Info</h2>
            <p class="text-xs text-gray-400">Informasi kontak global yang tampil di footer semua halaman & halaman kontak</p>
          </div>
        </div>

        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input v-model="contactInfo.email" placeholder="info@telpp.co.id"
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input v-model="contactInfo.phone" placeholder="(+62) 713-324-150"
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea v-model="contactInfo.address" rows="2" placeholder="Alamat utama perusahaan..."
              class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Working Hours</label>
              <input v-model="contactInfo.working_hours" placeholder="Mon-Fri: 8:00 – 17:00"
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Copyright Text</label>
              <input v-model="contactInfo.copyright" placeholder="Copyright 2026 PT TELPP. All right reserved."
                class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Google Maps Link</label>
            <input v-model="contactInfo.map_link" placeholder="https://maps.google.com/?q=..."
              class="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Hero Image</label>
            <div class="flex items-center gap-4">
              <div v-if="contactInfo.hero_image" class="w-28 h-20 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0 relative group">
                <img :src="getImageUrl(contactInfo.hero_image)" class="w-full h-full object-cover" />
                <button @click="contactInfo.hero_image = ''" type="button"
                  class="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition hover:bg-red-600">×</button>
              </div>
              <div class="flex-1">
                <input type="file" accept="image/*" @change="onHeroImageChange" ref="heroInput" class="hidden" />
                <div class="flex gap-2">
                  <button @click="$refs.heroInput.click()"
                    class="flex-1 border border-dashed border-gray-300 rounded-xl px-4 py-3 text-sm text-gray-500 hover:border-green-500 hover:text-green-600 transition text-left">
                    {{ uploading ? 'Mengupload...' : 'Pilih gambar hero' }}
                  </button>
                  <button v-if="contactInfo.hero_image" @click="contactInfo.hero_image = ''" type="button"
                    class="px-3 py-3 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition shrink-0">Hapus</button>
                </div>
                <p class="text-xs text-gray-400 mt-1">JPG, PNG. Maks 5MB.</p>
              </div>
            </div>
          </div>
          <div class="flex justify-end pt-2">
            <button @click="saveContactInfo"
              class="bg-green-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition flex items-center gap-2">
              💾 Simpan Contact Info
            </button>
          </div>
        </div>
      </section>

      <!-- ════════════════════════════════════════════════════════
           SECTION: CONTACT OFFICES (Location Cards)
           ════════════════════════════════════════════════════════ -->
      <section class="bg-white rounded-2xl p-8 border border-gray-100 mb-8">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 font-bold text-sm">O</div>
            <div>
              <h2 class="font-bold text-gray-900">Contact Offices</h2>
              <p class="text-xs text-gray-400">Kantor / lokasi yang tampil di halaman kontak & home</p>
            </div>
          </div>
          <button @click="openOfficeForm()"
            class="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition flex items-center gap-1.5">
            <span class="text-lg leading-none">+</span> Tambah
          </button>
        </div>

        <div v-if="offices.length > 0" class="space-y-3">
          <div v-for="(office, idx) in offices" :key="office.id"
            class="flex items-start justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-mono text-gray-400 bg-gray-200 px-2 py-0.5 rounded">{{ idx }}</span>
                <span class="font-semibold text-gray-900">{{ office.name }}</span>
                <span :class="['text-xs px-2 py-0.5 rounded-full font-medium', office.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500']">
                  {{ office.is_active ? 'Aktif' : 'Nonaktif' }}
                </span>
              </div>
              <p class="text-sm text-gray-500 line-clamp-1">{{ office.address }}</p>
              <p class="text-sm text-gray-500">{{ office.phone }}</p>
            </div>
            <div class="flex gap-2 ml-4 shrink-0">
              <button @click="openOfficeForm(office)"
                class="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition">Edit</button>
              <button @click="deleteOffice(office.id)"
                class="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition">Hapus</button>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-10 text-gray-400 text-sm">
          Belum ada office. Klik "Tambah" untuk menambahkan kantor.
        </div>

        <!-- Form Office -->
        <div v-if="showOfficeForm"
          class="mt-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h3 class="font-semibold text-gray-900 mb-4">{{ officeForm.id ? 'Edit Office' : 'Tambah Office Baru' }}</h3>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Nama Kantor *</label>
              <input v-model="officeForm.name" placeholder="Jakarta"
                class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Phone</label>
              <input v-model="officeForm.phone" placeholder="+62 21 8865 6809"
                class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div class="col-span-2">
              <label class="block text-xs font-medium text-gray-600 mb-1">Address</label>
              <textarea v-model="officeForm.address" rows="2" placeholder="Alamat kantor..."
                class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Email</label>
              <input v-model="officeForm.email" placeholder="office@telpp.co.id"
                class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-600 mb-1">Urutan tampil</label>
              <input v-model.number="officeForm.sort_order" type="number" placeholder="0"
                class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div class="col-span-2">
              <label class="block text-xs font-medium text-gray-600 mb-1">Google Maps Link</label>
              <input v-model="officeForm.map_link" placeholder="https://maps.google.com/?q=..."
                class="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div class="col-span-2">
              <label class="block text-xs font-medium text-gray-600 mb-1">Gambar</label>
              <div class="flex items-center gap-4">
                <div v-if="officeForm.image" class="w-28 h-20 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                  <img :src="getImageUrl(officeForm.image)" class="w-full h-full object-cover" />
                </div>
                <input type="file" accept="image/*" @change="onOfficeImageChange"
                  class="block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
              </div>
            </div>
            <div class="col-span-2">
              <label class="flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" v-model="officeForm.is_active"
                  class="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                Aktif (tampil di halaman publik)
              </label>
            </div>
          </div>
          <div class="flex gap-2 mt-4">
            <button @click="saveOffice"
              class="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition">Simpan</button>
            <button @click="showOfficeForm = false"
              class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition">Batal</button>
          </div>
        </div>
      </section>

    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminSidebar from '@/components/AdminSidebar.vue'
import api from '@/services/api'

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080'
const router = useRouter()

const alert = ref({ show: false, type: 'success', message: '' })

const uploading = ref(false)
const heroInput = ref(null)

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
const showOfficeForm = ref(false)
const officeForm = ref({
  id: null,
  name: '',
  address: '',
  phone: '',
  email: '',
  map_link: '',
  image: '',
  sort_order: 0,
  is_active: true,
})
const selectedOfficeImage = ref(null)

onMounted(() => {
  const token = localStorage.getItem('token')
  if (!token) { router.push('/admin/login'); return }
  fetchContactInfo()
  fetchOffices()
})

function showAlert(type, message) {
  alert.value = { show: true, type, message }
  setTimeout(() => { alert.value.show = false }, 3000)
}

function getImageUrl(path) {
  if (!path) return ''
  if (path.startsWith('http')) return path
  if (path.startsWith('/uploads/')) return BASE_URL + path
  if (path.startsWith('uploads/')) return BASE_URL + '/' + path
  return path
}

// ─── CONTACT INFO ───
async function fetchContactInfo() {
  try {
    const res = await api.get('/admin/contact-info')
    const data = res.data?.data || res.data
    if (data && typeof data === 'object') {
      contactInfo.value = {
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || '',
        working_hours: data.working_hours || '',
        copyright: data.copyright || '',
        hero_image: data.hero_image || '',
        map_link: data.map_link || '',
      }
    }
  } catch (_e) {}
}
async function saveContactInfo() {
  try {
    const res = await api.put('/admin/contact-info', contactInfo.value)
    const data = res.data?.data || res.data
    if (data) {
      contactInfo.value = {
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || '',
        working_hours: data.working_hours || '',
        copyright: data.copyright || '',
        hero_image: data.hero_image || '',
        map_link: data.map_link || '',
      }
    }
    showAlert('success', 'Contact info berhasil disimpan')
  } catch (e) {
    showAlert('error', 'Gagal menyimpan: ' + (e.response?.data?.error || e.message))
  }
}

async function onHeroImageChange(e) {
  const file = e.target.files?.[0]
  if (!file) return
  uploading.value = true
  try {
    const fd = new FormData()
    fd.append('image', file)
    const res = await api.post('/upload', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    contactInfo.value.hero_image = 'uploads/' + (res.data?.filename || '')
    showAlert('success', 'Gambar hero berhasil diupload!')
  } catch (_e) {
    showAlert('error', 'Gagal upload gambar hero')
  } finally {
    uploading.value = false
  }
}

// ─── OFFICES ───
async function fetchOffices() {
  try {
    const res = await api.get('/admin/contact-offices')
    const raw = res.data?.data || []
    offices.value = raw.map(o => ({ ...o, id: o.id ?? o.ID }))
  } catch (_e) {}
}
function openOfficeForm(office) {
  if (office) {
    officeForm.value = { ...office }
  } else {
    officeForm.value = {
      id: null,
      name: '',
      address: '',
      phone: '',
      email: '',
      map_link: '',
      image: '',
      sort_order: offices.value.length,
      is_active: true,
    }
  }
  selectedOfficeImage.value = null
  showOfficeForm.value = true
}
function onOfficeImageChange(e) {
  selectedOfficeImage.value = e.target.files?.[0] || null
}
async function saveOffice() {
  try {
    if (officeForm.value.id) {
      // Update with optional file upload
      if (selectedOfficeImage.value) {
        const fd = new FormData()
        fd.append('image', selectedOfficeImage.value)
        const uploadRes = await api.post('/upload', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        officeForm.value.image = 'uploads/' + (uploadRes.data?.filename || '')
      }
      await api.put(`/admin/contact-offices/${officeForm.value.id}`, officeForm.value)
    } else {
      // Upload image first if selected
      if (selectedOfficeImage.value) {
        const fd = new FormData()
        fd.append('image', selectedOfficeImage.value)
        const uploadRes = await api.post('/upload', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        officeForm.value.image = 'uploads/' + (uploadRes.data?.filename || '')
      }
      await api.post('/admin/contact-offices', officeForm.value)
    }
    showOfficeForm.value = false
    await fetchOffices()
    showAlert('success', 'Office berhasil disimpan')
  } catch (e) {
    showAlert('error', 'Gagal menyimpan: ' + (e.response?.data?.error || e.message))
  }
}
async function deleteOffice(id) {
  if (!confirm('Hapus office ini?')) return
  try {
    await api.delete(`/admin/contact-offices/${id}`)
    await fetchOffices()
    showAlert('success', 'Office berhasil dihapus')
  } catch (_e) {
    showAlert('error', 'Gagal menghapus office')
  }
}
</script>
