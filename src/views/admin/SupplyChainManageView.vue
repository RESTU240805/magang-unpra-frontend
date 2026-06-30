<template>
  <div class="min-h-screen bg-gray-100 flex">
    <AdminSidebar active="supply-chain" />

    <main class="flex-1 ml-64 p-10">
      <div class="mb-8">
        <p class="text-xs text-gray-400 font-semibold tracking-widest">CONTENT ENGINE</p>
        <h1 class="text-3xl font-black text-gray-900">Supply Chain Management</h1>
        <p class="text-gray-400 text-sm mt-1">Kelola strategi, sustainability items, dan kebijakan supply chain.</p>
      </div>

      <div v-if="alert.show"
        :class="['mb-4 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2',
          alert.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200']">
        {{ alert.type === 'success' ? '✅' : '❌' }} {{ alert.message }}
      </div>

      <!-- ═══ SECTION 1: STRATEGIES ═══ -->
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-black text-gray-900">📋 Supply Chain Strategies</h2>
            <p class="text-sm text-gray-400 mt-0.5">Kelola strategi supply chain (title, deskripsi, urutan, status aktif).</p>
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
          <p class="text-4xl mb-3">📋</p>
          <p class="text-gray-500 mb-4">Belum ada strategy.</p>
          <button @click="openStrategyCreate"
            class="bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition">
            + Tambah
          </button>
        </div>

        <div v-else class="grid gap-4">
          <div v-for="(item, i) in strategies" :key="item.ID || i"
            class="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100 hover:border-gray-200 transition">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <p class="font-semibold text-gray-900 text-sm">{{ item.title || '(no title)' }}</p>
                <span v-if="item.is_active"
                  class="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span>
                <span v-else
                  class="bg-gray-200 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">Inactive</span>
              </div>
              <p class="text-xs text-gray-400 truncate mt-0.5">{{ item.description }}</p>
              <p class="text-xs text-gray-300 mt-0.5">Urutan: {{ item.sort_order || 0 }}</p>
            </div>
            <div class="flex gap-2 flex-shrink-0">
              <button @click="openStrategyEdit(item)"
                class="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition">Edit</button>
              <button @click="confirmStrategyDelete(item)"
                class="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 transition">Hapus</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ SECTION 2: SUSTAINABILITY ITEMS ═══ -->
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-black text-gray-900">🌱 Supply Chain Sustainability Items</h2>
            <p class="text-sm text-gray-400 mt-0.5">Kelola item sustainability (deskripsi, urutan, status aktif).</p>
          </div>
          <button @click="openSustCreate"
            class="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition flex items-center gap-2">
            <span class="text-lg leading-none">+</span> Tambah
          </button>
        </div>

        <div v-if="sustLoading" class="flex items-center justify-center py-12 gap-3 text-gray-400">
          <div class="w-5 h-5 border-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
          Memuat data...
        </div>

        <div v-else-if="sustItems.length === 0"
          class="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
          <p class="text-4xl mb-3">🌱</p>
          <p class="text-gray-500 mb-4">Belum ada sustainability item.</p>
          <button @click="openSustCreate"
            class="bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition">
            + Tambah
          </button>
        </div>

        <div v-else class="grid gap-4">
          <div v-for="(item, i) in sustItems" :key="item.ID || i"
            class="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100 hover:border-gray-200 transition">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <p class="text-xs text-gray-400 font-semibold">#{{ item.sort_order || i + 1 }}</p>
                <span v-if="item.is_active"
                  class="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span>
                <span v-else
                  class="bg-gray-200 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">Inactive</span>
              </div>
              <p class="text-sm text-gray-700 mt-1">{{ item.description }}</p>
            </div>
            <div class="flex gap-2 flex-shrink-0">
              <button @click="openSustEdit(item)"
                class="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition">Edit</button>
              <button @click="confirmSustDelete(item)"
                class="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 transition">Hapus</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ SECTION 3: POLICIES ═══ -->
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-black text-gray-900">📜 Supply Chain Policies</h2>
            <p class="text-sm text-gray-400 mt-0.5">Kelola kebijakan (title, points JSON, procedures JSON, urutan, status aktif).</p>
          </div>
          <button @click="openPolicyCreate"
            class="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition flex items-center gap-2">
            <span class="text-lg leading-none">+</span> Tambah
          </button>
        </div>

        <div v-if="policiesLoading" class="flex items-center justify-center py-12 gap-3 text-gray-400">
          <div class="w-5 h-5 border-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
          Memuat data...
        </div>

        <div v-else-if="policies.length === 0"
          class="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
          <p class="text-4xl mb-3">📜</p>
          <p class="text-gray-500 mb-4">Belum ada policy.</p>
          <button @click="openPolicyCreate"
            class="bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition">
            + Tambah
          </button>
        </div>

        <div v-else class="grid gap-4">
          <div v-for="(item, i) in policies" :key="item.ID || i"
            class="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100 hover:border-gray-200 transition">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <p class="font-semibold text-gray-900 text-sm">{{ item.title || '(no title)' }}</p>
                <span v-if="item.is_active"
                  class="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">Active</span>
                <span v-else
                  class="bg-gray-200 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded-full">Inactive</span>
              </div>
              <p class="text-xs text-gray-400 mt-0.5">Points: {{ item.points ? (Array.isArray(item.points) ? item.points.length : 'set') : 0 }} item</p>
              <p class="text-xs text-gray-400">Procedures: {{ item.procedures ? (Array.isArray(item.procedures) ? item.procedures.length : 'set') : 0 }} item</p>
              <p class="text-xs text-gray-300 mt-0.5">Urutan: {{ item.sort_order || 0 }}</p>
            </div>
            <div class="flex gap-2 flex-shrink-0">
              <button @click="openPolicyEdit(item)"
                class="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition">Edit</button>
              <button @click="confirmPolicyDelete(item)"
                class="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 transition">Hapus</button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- ═══ MODAL: STRATEGY ═══ -->
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
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Title <span class="text-red-500">*</span></label>
              <input v-model="strategyForm.title" type="text" placeholder="Misal: Log Management" required
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
              <textarea v-model="strategyForm.description" rows="3" placeholder="Deskripsi strategy..."
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"></textarea>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Sort Order</label>
              <input v-model.number="strategyForm.sort_order" type="number" min="0"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div class="flex items-center gap-3">
              <input v-model="strategyForm.is_active" type="checkbox" id="strategyActive"
                class="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
              <label for="strategyActive" class="text-sm font-semibold text-gray-700">Active</label>
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

    <!-- ═══ MODAL: SUSTAINABILITY ITEM ═══ -->
    <Transition name="modal">
      <div v-if="showSustModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="closeSustModal">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 class="text-xl font-black text-gray-900">
              {{ isSustEdit ? '✏️ Edit Sustainability Item' : '➕ Tambah Sustainability Item' }}
            </h2>
            <button @click="closeSustModal" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
          </div>
          <form @submit.prevent="submitSustForm" class="p-6 space-y-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Description <span class="text-red-500">*</span></label>
              <textarea v-model="sustForm.description" rows="4" placeholder="Deskripsi sustainability item..." required
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"></textarea>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Sort Order</label>
              <input v-model.number="sustForm.sort_order" type="number" min="0"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div class="flex items-center gap-3">
              <input v-model="sustForm.is_active" type="checkbox" id="sustActive"
                class="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
              <label for="sustActive" class="text-sm font-semibold text-gray-700">Active</label>
            </div>
            <div v-if="sustFormError" class="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
              ❌ {{ sustFormError }}
            </div>
            <div class="flex gap-3 pt-2">
              <button type="button" @click="closeSustModal"
                class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Batal</button>
              <button type="submit" :disabled="sustSubmitting"
                class="flex-1 bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition disabled:opacity-60 flex items-center justify-center gap-2">
                <div v-if="sustSubmitting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {{ sustSubmitting ? 'Menyimpan...' : (isSustEdit ? 'Simpan Perubahan' : 'Tambah') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Modal Hapus Sustainability Item -->
    <Transition name="modal">
      <div v-if="showSustDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="showSustDeleteModal = false">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
          <p class="text-4xl mb-3">🗑️</p>
          <h3 class="text-lg font-black text-gray-900 mb-1">Hapus Sustainability Item?</h3>
          <p class="text-sm text-gray-500 mb-6">Data akan dihapus permanen.</p>
          <div class="flex gap-3">
            <button @click="showSustDeleteModal = false"
              class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Batal</button>
            <button @click="doSustDelete" :disabled="sustSubmitting"
              class="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 transition disabled:opacity-60">
              {{ sustSubmitting ? 'Menghapus...' : 'Hapus' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ═══ MODAL: POLICY ═══ -->
    <Transition name="modal">
      <div v-if="showPolicyModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="closePolicyModal">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 class="text-xl font-black text-gray-900">
              {{ isPolicyEdit ? '✏️ Edit Policy' : '➕ Tambah Policy' }}
            </h2>
            <button @click="closePolicyModal" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
          </div>
          <form @submit.prevent="submitPolicyForm" class="p-6 space-y-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Title <span class="text-red-500">*</span></label>
              <input v-model="policyForm.title" type="text" placeholder="Misal: Observance of Laws" required
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">
                Points <span class="text-xs text-gray-400 font-normal">(JSON array of strings)</span>
              </label>
              <textarea v-model="policyForm.points" rows="5"
                placeholder='["Observe the laws of the countries...", "..." ]'
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-green-400 resize-y"></textarea>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">
                Procedures <span class="text-xs text-gray-400 font-normal">(JSON array of strings, optional)</span>
              </label>
              <textarea v-model="policyForm.procedures" rows="4"
                placeholder='["Step one...", "Step two..." ]'
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-green-400 resize-y"></textarea>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Sort Order</label>
              <input v-model.number="policyForm.sort_order" type="number" min="0"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div class="flex items-center gap-3">
              <input v-model="policyForm.is_active" type="checkbox" id="policyActive"
                class="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
              <label for="policyActive" class="text-sm font-semibold text-gray-700">Active</label>
            </div>
            <div v-if="policyFormError" class="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
              ❌ {{ policyFormError }}
            </div>
            <div class="flex gap-3 pt-2">
              <button type="button" @click="closePolicyModal"
                class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Batal</button>
              <button type="submit" :disabled="policySubmitting"
                class="flex-1 bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition disabled:opacity-60 flex items-center justify-center gap-2">
                <div v-if="policySubmitting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {{ policySubmitting ? 'Menyimpan...' : (isPolicyEdit ? 'Simpan Perubahan' : 'Tambah') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Modal Hapus Policy -->
    <Transition name="modal">
      <div v-if="showPolicyDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="showPolicyDeleteModal = false">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
          <p class="text-4xl mb-3">🗑️</p>
          <h3 class="text-lg font-black text-gray-900 mb-1">Hapus Policy?</h3>
          <p class="text-sm text-gray-500 mb-6">Data akan dihapus permanen.</p>
          <div class="flex gap-3">
            <button @click="showPolicyDeleteModal = false"
              class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Batal</button>
            <button @click="doPolicyDelete" :disabled="policySubmitting"
              class="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 transition disabled:opacity-60">
              {{ policySubmitting ? 'Menghapus...' : 'Hapus' }}
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
import api from '@/services/api'


// ─── Alert ────────────────────────────────────────────────────
const alert = ref({ show: false, type: 'success', message: '' })
const showAlert = (type, message) => {
  alert.value = { show: true, type, message }
  setTimeout(() => { alert.value.show = false }, 3000)
}

// ─── Supply Chain Strategies ──────────────────────────────────
const strategies = ref([])
const strategiesLoading = ref(true)
const strategySubmitting = ref(false)
const showStrategyModal = ref(false)
const showStrategyDeleteModal = ref(false)
const isStrategyEdit = ref(false)
const selectedStrategy = ref(null)
const strategyFormError = ref('')

const strategyForm = ref({ title: '', description: '', sort_order: 0, is_active: true })

const fetchStrategies = async () => {
  strategiesLoading.value = true
  try {
    const res = await api.get('/admin/supply-chain-strategies')
    strategies.value = res.data?.data || res.data || []
  } catch { showAlert('error', 'Gagal memuat strategies') }
  finally { strategiesLoading.value = false }
}

const openStrategyCreate = () => {
  isStrategyEdit.value = false
  strategyForm.value = { title: '', description: '', sort_order: 0, is_active: true }
  strategyFormError.value = ''
  showStrategyModal.value = true
}

const openStrategyEdit = (item) => {
  isStrategyEdit.value = true; selectedStrategy.value = item
  strategyForm.value = {
    title: item.title || '',
    description: item.description || '',
    sort_order: item.sort_order || 0,
    is_active: item.is_active ?? true,
  }
  strategyFormError.value = ''
  showStrategyModal.value = true
}

const closeStrategyModal = () => { showStrategyModal.value = false; strategyFormError.value = '' }

const submitStrategyForm = async () => {
  if (!strategyForm.value.title.trim()) {
    strategyFormError.value = 'Title wajib diisi'; return
  }
  strategySubmitting.value = true; strategyFormError.value = ''
  try {
    const payload = {
      title: strategyForm.value.title,
      description: strategyForm.value.description,
      sort_order: strategyForm.value.sort_order,
      is_active: strategyForm.value.is_active,
    }
    if (isStrategyEdit.value) {
      await api.put(`/admin/supply-chain-strategies/${selectedStrategy.value.ID}`, payload)
      showAlert('success', 'Strategy berhasil diperbarui!')
    } else {
      await api.post('/admin/supply-chain-strategies', payload)
      showAlert('success', 'Strategy berhasil ditambahkan!')
    }
    closeStrategyModal(); await fetchStrategies()
  } catch (e) {
    strategyFormError.value = e.response?.data?.error || e.response?.data?.message || e.message || 'Terjadi kesalahan.'
  } finally { strategySubmitting.value = false }
}

const confirmStrategyDelete = (item) => { selectedStrategy.value = item; showStrategyDeleteModal.value = true }
const doStrategyDelete = async () => {
  strategySubmitting.value = true
  try {
    await api.delete(`/admin/supply-chain-strategies/${selectedStrategy.value.ID}`)
    strategies.value = strategies.value.filter(s => s.ID !== selectedStrategy.value.ID)
    showStrategyDeleteModal.value = false
    showAlert('success', 'Strategy berhasil dihapus!')
  } catch { showAlert('error', 'Gagal menghapus strategy') }
  finally { strategySubmitting.value = false }
}

// ─── Sustainability Items ─────────────────────────────────────
const sustItems = ref([])
const sustLoading = ref(true)
const sustSubmitting = ref(false)
const showSustModal = ref(false)
const showSustDeleteModal = ref(false)
const isSustEdit = ref(false)
const selectedSust = ref(null)
const sustFormError = ref('')

const sustForm = ref({ description: '', sort_order: 0, is_active: true })

const fetchSustItems = async () => {
  sustLoading.value = true
  try {
    const res = await api.get('/admin/supply-chain-sustainability-items')
    sustItems.value = res.data?.data || res.data || []
  } catch { showAlert('error', 'Gagal memuat sustainability items') }
  finally { sustLoading.value = false }
}

const openSustCreate = () => {
  isSustEdit.value = false
  sustForm.value = { description: '', sort_order: 0, is_active: true }
  sustFormError.value = ''
  showSustModal.value = true
}

const openSustEdit = (item) => {
  isSustEdit.value = true; selectedSust.value = item
  sustForm.value = {
    description: item.description || '',
    sort_order: item.sort_order || 0,
    is_active: item.is_active ?? true,
  }
  sustFormError.value = ''
  showSustModal.value = true
}

const closeSustModal = () => { showSustModal.value = false; sustFormError.value = '' }

const submitSustForm = async () => {
  if (!sustForm.value.description.trim()) {
    sustFormError.value = 'Description wajib diisi'; return
  }
  sustSubmitting.value = true; sustFormError.value = ''
  try {
    const payload = {
      description: sustForm.value.description,
      sort_order: sustForm.value.sort_order,
      is_active: sustForm.value.is_active,
    }
    if (isSustEdit.value) {
      await api.put(`/admin/supply-chain-sustainability-items/${selectedSust.value.ID}`, payload)
      showAlert('success', 'Sustainability item berhasil diperbarui!')
    } else {
      await api.post('/admin/supply-chain-sustainability-items', payload)
      showAlert('success', 'Sustainability item berhasil ditambahkan!')
    }
    closeSustModal(); await fetchSustItems()
  } catch (e) {
    sustFormError.value = e.response?.data?.error || e.response?.data?.message || e.message || 'Terjadi kesalahan.'
  } finally { sustSubmitting.value = false }
}

const confirmSustDelete = (item) => { selectedSust.value = item; showSustDeleteModal.value = true }
const doSustDelete = async () => {
  sustSubmitting.value = true
  try {
    await api.delete(`/admin/supply-chain-sustainability-items/${selectedSust.value.ID}`)
    sustItems.value = sustItems.value.filter(s => s.ID !== selectedSust.value.ID)
    showSustDeleteModal.value = false
    showAlert('success', 'Sustainability item berhasil dihapus!')
  } catch { showAlert('error', 'Gagal menghapus sustainability item') }
  finally { sustSubmitting.value = false }
}

// ─── Policies ─────────────────────────────────────────────────
const policies = ref([])
const policiesLoading = ref(true)
const policySubmitting = ref(false)
const showPolicyModal = ref(false)
const showPolicyDeleteModal = ref(false)
const isPolicyEdit = ref(false)
const selectedPolicy = ref(null)
const policyFormError = ref('')

const policyForm = ref({ title: '', points: '', procedures: '', sort_order: 0, is_active: true })

const fetchPolicies = async () => {
  policiesLoading.value = true
  try {
    const res = await api.get('/admin/supply-chain-policies')
    policies.value = res.data?.data || res.data || []
  } catch { showAlert('error', 'Gagal memuat policies') }
  finally { policiesLoading.value = false }
}

const serializeJsonArray = (val) => {
  if (!val) {return ''}
  if (Array.isArray(val)) {return JSON.stringify(val, null, 2)}
  return val
}

const parseJsonArray = (val) => {
  if (!val) {return []}
  if (Array.isArray(val)) {return val}
  try {
    const parsed = JSON.parse(val)
    return Array.isArray(parsed) ? parsed : []
  } catch { return [] }
}

const openPolicyCreate = () => {
  isPolicyEdit.value = false
  policyForm.value = { title: '', points: '', procedures: '', sort_order: 0, is_active: true }
  policyFormError.value = ''
  showPolicyModal.value = true
}

const openPolicyEdit = (item) => {
  isPolicyEdit.value = true; selectedPolicy.value = item
  policyForm.value = {
    title: item.title || '',
    points: serializeJsonArray(item.points),
    procedures: serializeJsonArray(item.procedures),
    sort_order: item.sort_order || 0,
    is_active: item.is_active ?? true,
  }
  policyFormError.value = ''
  showPolicyModal.value = true
}

const closePolicyModal = () => { showPolicyModal.value = false; policyFormError.value = '' }

const submitPolicyForm = async () => {
  if (!policyForm.value.title.trim()) {
    policyFormError.value = 'Title wajib diisi'; return
  }
  let pointsParsed, proceduresParsed
  try {
    pointsParsed = policyForm.value.points.trim() ? JSON.parse(policyForm.value.points) : []
    if (!Array.isArray(pointsParsed)) {throw new Error('points harus array')}
  } catch {
    policyFormError.value = 'Format JSON points tidak valid. Gunakan array of strings.'; return
  }
  try {
    proceduresParsed = policyForm.value.procedures.trim() ? JSON.parse(policyForm.value.procedures) : []
    if (!Array.isArray(proceduresParsed)) {throw new Error('procedures harus array')}
  } catch {
    policyFormError.value = 'Format JSON procedures tidak valid. Gunakan array of strings.'; return
  }
  policySubmitting.value = true; policyFormError.value = ''
  try {
    const payload = {
      title: policyForm.value.title,
      points: pointsParsed,
      procedures: proceduresParsed,
      sort_order: policyForm.value.sort_order,
      is_active: policyForm.value.is_active,
    }
    if (isPolicyEdit.value) {
      await api.put(`/admin/supply-chain-policies/${selectedPolicy.value.ID}`, payload)
      showAlert('success', 'Policy berhasil diperbarui!')
    } else {
      await api.post('/admin/supply-chain-policies', payload)
      showAlert('success', 'Policy berhasil ditambahkan!')
    }
    closePolicyModal(); await fetchPolicies()
  } catch (e) {
    policyFormError.value = e.response?.data?.error || e.response?.data?.message || e.message || 'Terjadi kesalahan.'
  } finally { policySubmitting.value = false }
}

const confirmPolicyDelete = (item) => { selectedPolicy.value = item; showPolicyDeleteModal.value = true }
const doPolicyDelete = async () => {
  policySubmitting.value = true
  try {
    await api.delete(`/admin/supply-chain-policies/${selectedPolicy.value.ID}`)
    policies.value = policies.value.filter(s => s.ID !== selectedPolicy.value.ID)
    showPolicyDeleteModal.value = false
    showAlert('success', 'Policy berhasil dihapus!')
  } catch { showAlert('error', 'Gagal menghapus policy') }
  finally { policySubmitting.value = false }
}

// ─── Lifecycle ────────────────────────────────────────────────
onMounted(() => {
  fetchStrategies()
  fetchSustItems()
  fetchPolicies()
})
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
