<template>
  <div class="min-h-screen bg-gray-100 flex">
    <AdminSidebar active="safety-health" />

    <main class="flex-1 ml-64 p-10">
      <div class="mb-8">
        <p class="text-xs text-gray-400 font-semibold tracking-widest">CONTENT ENGINE</p>
        <h1 class="text-3xl font-black text-gray-900">Safety & Health Management</h1>
        <p class="text-gray-400 text-sm mt-1">Kelola deskripsi K3 Policy, K3 targets, K3 programs, dan slider gambar.</p>
      </div>

      <div v-if="alert.show"
        :class="['mb-4 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2',
          alert.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200']">
        {{ alert.type === 'success' ? '✅' : '❌' }} {{ alert.message }}
      </div>

      <!-- ═══ SAFETY POLICY DESCRIPTION ═══ -->
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <div class="mb-6">
          <h2 class="text-xl font-black text-gray-900">🛡️ Deskripsi K3 Policy</h2>
          <p class="text-sm text-gray-400 mt-0.5">Kelola satu deskripsi Kebijakan K3 yang tampil di halaman safety & health.</p>
        </div>

        <div v-if="policyLoading" class="flex items-center justify-center py-12 gap-3 text-gray-400">
          <div class="w-5 h-5 border-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
          Memuat data...
        </div>

        <form v-else @submit.prevent="submitPolicyForm" class="space-y-5">
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-1.5">Deskripsi <span class="text-red-500">*</span></label>
            <textarea v-model="policyForm.description" rows="6" placeholder="Deskripsi Kebijakan K3..." required
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"></textarea>
          </div>
          <div v-if="policyFormError" class="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
            ❌ {{ policyFormError }}
          </div>
          <button type="submit" :disabled="policySubmitting"
            class="bg-green-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition disabled:opacity-60 flex items-center justify-center gap-2">
            <div v-if="policySubmitting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            {{ policySubmitting ? 'Menyimpan...' : 'Simpan Deskripsi' }}
          </button>
        </form>
      </div>

      <!-- ═══ K3 TARGETS ═══ -->
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-black text-gray-900">🎯 K3 Targets</h2>
            <p class="text-sm text-gray-400 mt-0.5">Kelola target K3 yang tampil di halaman safety & health.</p>
          </div>
          <button @click="openTargetCreate"
            class="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition flex items-center gap-2">
            <span class="text-lg leading-none">+</span> Tambah
          </button>
        </div>

        <div v-if="targetLoading" class="flex items-center justify-center py-12 gap-3 text-gray-400">
          <div class="w-5 h-5 border-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
          Memuat data...
        </div>

        <div v-else-if="targets.length === 0"
          class="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
          <p class="text-4xl mb-3">🎯</p>
          <p class="text-gray-500 mb-4">Belum ada data target K3.</p>
          <button @click="openTargetCreate"
            class="bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition">
            + Tambah
          </button>
        </div>

        <div v-else class="grid gap-4">
          <div v-for="(item, i) in targets" :key="item.ID || i"
            class="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100 hover:border-gray-200 transition">
            <div class="w-9 h-9 rounded-xl bg-[#14532d] text-white font-black text-xs flex items-center justify-center flex-shrink-0">
              {{ String(i + 1).padStart(2, '0') }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-gray-700">{{ item.description }}</p>
              <p class="text-xs text-gray-300 mt-0.5">Urutan: {{ item.sort_order || 0 }}</p>
            </div>
            <div class="flex items-center gap-3 flex-shrink-0">
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" :checked="item.is_active" @change="toggleTargetActive(item)"
                  class="sr-only peer" />
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
              </label>
              <button @click="openTargetEdit(item)"
                class="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition">Edit</button>
              <button @click="confirmTargetDelete(item)"
                class="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 transition">Hapus</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ K3 PROGRAMS ═══ -->
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-black text-gray-900">⚙️ K3 Programs</h2>
            <p class="text-sm text-gray-400 mt-0.5">Kelola program K3 yang tampil di halaman safety & health.</p>
          </div>
          <button @click="openProgramCreate"
            class="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition flex items-center gap-2">
            <span class="text-lg leading-none">+</span> Tambah
          </button>
        </div>

        <div v-if="programLoading" class="flex items-center justify-center py-12 gap-3 text-gray-400">
          <div class="w-5 h-5 border-2 border-gray-200 border-t-green-500 rounded-full animate-spin"></div>
          Memuat data...
        </div>

        <div v-else-if="programs.length === 0"
          class="border-2 border-dashed border-gray-200 rounded-xl p-12 text-center">
          <p class="text-4xl mb-3">⚙️</p>
          <p class="text-gray-500 mb-4">Belum ada data program K3.</p>
          <button @click="openProgramCreate"
            class="bg-green-600 text-white px-6 py-2 rounded-xl text-sm font-semibold hover:bg-green-700 transition">
            + Tambah
          </button>
        </div>

        <div v-else class="grid gap-4">
          <div v-for="(item, i) in programs" :key="item.ID || i"
            class="bg-gray-50 rounded-xl p-4 flex items-center gap-4 border border-gray-100 hover:border-gray-200 transition">
            <div class="w-9 h-9 rounded-xl bg-green-600 text-white font-black text-xs flex items-center justify-center flex-shrink-0">
              {{ String(i + 1).padStart(2, '0') }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-gray-700">{{ item.description }}</p>
              <p class="text-xs text-gray-300 mt-0.5">Urutan: {{ item.sort_order || 0 }}</p>
            </div>
            <div class="flex items-center gap-3 flex-shrink-0">
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" :checked="item.is_active" @change="toggleProgramActive(item)"
                  class="sr-only peer" />
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
              </label>
              <button @click="openProgramEdit(item)"
                class="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition">Edit</button>
              <button @click="confirmProgramDelete(item)"
                class="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 transition">Hapus</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ═══ SLIDER SECTION ═══ -->
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-8">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-black text-gray-900">🖼️ Slider Gambar</h2>
            <p class="text-sm text-gray-400 mt-0.5">Kelola gambar slide yang tampil di bagian bawah halaman safety & health.</p>
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
            <div class="flex items-center gap-3 flex-shrink-0">
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" :checked="slide.is_active" @change="toggleSliderActive(slide)"
                  class="sr-only peer" />
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
              </label>
              <button @click="openSliderEdit(slide)"
                class="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-blue-100 transition">Edit</button>
              <button @click="confirmSliderDelete(slide)"
                class="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-red-100 transition">Hapus</button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- ═══ MODAL TARGET ═══ -->
    <Transition name="modal">
      <div v-if="showTargetModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="closeTargetModal">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 class="text-xl font-black text-gray-900">
              {{ isTargetEdit ? '✏️ Edit K3 Target' : '➕ Tambah K3 Target' }}
            </h2>
            <button @click="closeTargetModal" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
          </div>
          <form @submit.prevent="submitTargetForm" class="p-6 space-y-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Deskripsi <span class="text-red-500">*</span></label>
              <textarea v-model="targetForm.description" rows="3" placeholder="Deskripsi target K3..." required
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"></textarea>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Urutan</label>
              <input v-model.number="targetForm.sort_order" type="number" min="0"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="targetForm.is_active" class="sr-only peer" />
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                <span class="ms-3 text-sm font-medium text-gray-700">Aktif</span>
              </label>
            </div>
            <div v-if="targetFormError" class="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
              ❌ {{ targetFormError }}
            </div>
            <div class="flex gap-3 pt-2">
              <button type="button" @click="closeTargetModal"
                class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Batal</button>
              <button type="submit" :disabled="targetSubmitting"
                class="flex-1 bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition disabled:opacity-60 flex items-center justify-center gap-2">
                <div v-if="targetSubmitting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {{ targetSubmitting ? 'Menyimpan...' : (isTargetEdit ? 'Simpan Perubahan' : 'Tambah') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Modal Hapus Target -->
    <Transition name="modal">
      <div v-if="showTargetDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="showTargetDeleteModal = false">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
          <p class="text-4xl mb-3">🗑️</p>
          <h3 class="text-lg font-black text-gray-900 mb-1">Hapus K3 Target?</h3>
          <p class="text-sm text-gray-500 mb-6">Data akan dihapus permanen.</p>
          <div class="flex gap-3">
            <button @click="showTargetDeleteModal = false"
              class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Batal</button>
            <button @click="doTargetDelete" :disabled="targetSubmitting"
              class="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 transition disabled:opacity-60">
              {{ targetSubmitting ? 'Menghapus...' : 'Hapus' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ═══ MODAL PROGRAM ═══ -->
    <Transition name="modal">
      <div v-if="showProgramModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="closeProgramModal">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
          <div class="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 class="text-xl font-black text-gray-900">
              {{ isProgramEdit ? '✏️ Edit K3 Program' : '➕ Tambah K3 Program' }}
            </h2>
            <button @click="closeProgramModal" class="text-gray-400 hover:text-gray-600 text-2xl leading-none">×</button>
          </div>
          <form @submit.prevent="submitProgramForm" class="p-6 space-y-5">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Deskripsi <span class="text-red-500">*</span></label>
              <textarea v-model="programForm.description" rows="3" placeholder="Deskripsi program K3..." required
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"></textarea>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Urutan</label>
              <input v-model.number="programForm.sort_order" type="number" min="0"
                class="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            <div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="programForm.is_active" class="sr-only peer" />
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                <span class="ms-3 text-sm font-medium text-gray-700">Aktif</span>
              </label>
            </div>
            <div v-if="programFormError" class="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-200">
              ❌ {{ programFormError }}
            </div>
            <div class="flex gap-3 pt-2">
              <button type="button" @click="closeProgramModal"
                class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Batal</button>
              <button type="submit" :disabled="programSubmitting"
                class="flex-1 bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition disabled:opacity-60 flex items-center justify-center gap-2">
                <div v-if="programSubmitting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {{ programSubmitting ? 'Menyimpan...' : (isProgramEdit ? 'Simpan Perubahan' : 'Tambah') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Modal Hapus Program -->
    <Transition name="modal">
      <div v-if="showProgramDeleteModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="showProgramDeleteModal = false">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
          <p class="text-4xl mb-3">🗑️</p>
          <h3 class="text-lg font-black text-gray-900 mb-1">Hapus K3 Program?</h3>
          <p class="text-sm text-gray-500 mb-6">Data akan dihapus permanen.</p>
          <div class="flex gap-3">
            <button @click="showProgramDeleteModal = false"
              class="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition">Batal</button>
            <button @click="doProgramDelete" :disabled="programSubmitting"
              class="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-red-700 transition disabled:opacity-60">
              {{ programSubmitting ? 'Menghapus...' : 'Hapus' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ═══ MODAL SLIDER ═══ -->
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
            <div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="sliderForm.is_active" class="sr-only peer" />
                <div class="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-600"></div>
                <span class="ms-3 text-sm font-medium text-gray-700">Aktif</span>
              </label>
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
import AdminSidebar from '@/components/AdminSidebar.vue'
import api from '@/services/api'

const BASE_URL = import.meta.env.VITE_BASE_URL || (import.meta.env.DEV ? 'http://localhost:8080' : '')

// ─── Alert ────────────────────────────────────────────────────
const alert = ref({ show: false, type: 'success', message: '' })
const showAlert = (type, message) => {
  alert.value = { show: true, type, message }
  setTimeout(() => { alert.value.show = false }, 3000)
}

// ─── Helpers ──────────────────────────────────────────────────
const toggleField = async (id, field, value, endpoint, label) => {
  try {
    await api.put(`/admin/${endpoint}/${id}`, { [field]: value })
    showAlert('success', `${label} berhasil diperbarui!`)
  } catch { showAlert('error', `Gagal memperbarui ${label}`) }
}

// ═══════════════════════════════════════════════════════════════
// ─── Safety Policy Descriptions ───────────────────────────────
// ═══════════════════════════════════════════════════════════════
const policies = ref([])
const policyLoading = ref(true)
const policySubmitting = ref(false)
const selectedPolicy = ref(null)
const policyFormError = ref('')

const policyForm = ref({ description: '', sort_order: 0, is_active: true })

const fetchPolicies = async () => {
  policyLoading.value = true
  try {
    const res = await api.get('/admin/safety-policies')
    policies.value = res.data?.data || res.data || []
    selectedPolicy.value = policies.value[0] || null
    policyForm.value = {
      description: selectedPolicy.value?.description || '',
      sort_order: selectedPolicy.value?.sort_order || 1,
      is_active: selectedPolicy.value?.is_active !== undefined ? selectedPolicy.value.is_active : true,
    }
  } catch { showAlert('error', 'Gagal memuat deskripsi K3 Policy') }
  finally { policyLoading.value = false }
}

const submitPolicyForm = async () => {
  if (!policyForm.value.description.trim()) {
    policyFormError.value = 'Deskripsi wajib diisi'; return
  }
  policySubmitting.value = true; policyFormError.value = ''
  try {
    const payload = {
      title: '',
      description: policyForm.value.description,
      icon: '',
      sort_order: policyForm.value.sort_order,
      is_active: policyForm.value.is_active,
    }
    if (selectedPolicy.value?.ID) {
      await api.put(`/admin/safety-policies/${selectedPolicy.value.ID}`, payload)
      showAlert('success', 'Deskripsi K3 Policy berhasil diperbarui!')
    } else {
      await api.post('/admin/safety-policies', payload)
      showAlert('success', 'Deskripsi K3 Policy berhasil ditambahkan!')
    }
    await fetchPolicies()
  } catch (e) {
    policyFormError.value = e.response?.data?.error || e.response?.data?.message || e.message || 'Terjadi kesalahan.'
  } finally { policySubmitting.value = false }
}

// ═══════════════════════════════════════════════════════════════
// ─── K3 Targets ───────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
const targets = ref([])
const targetLoading = ref(true)
const targetSubmitting = ref(false)
const showTargetModal = ref(false)
const showTargetDeleteModal = ref(false)
const isTargetEdit = ref(false)
const selectedTarget = ref(null)
const targetFormError = ref('')

const targetForm = ref({ description: '', sort_order: 0, is_active: true })

const fetchTargets = async () => {
  targetLoading.value = true
  try {
    const res = await api.get('/admin/safety-k3-targets')
    targets.value = res.data?.data || res.data || []
  } catch { showAlert('error', 'Gagal memuat K3 targets') }
  finally { targetLoading.value = false }
}

const openTargetCreate = () => {
  isTargetEdit.value = false
  targetForm.value = { description: '', sort_order: 0, is_active: true }
  targetFormError.value = ''
  showTargetModal.value = true
}

const openTargetEdit = (item) => {
  isTargetEdit.value = true; selectedTarget.value = item
  targetForm.value = {
    description: item.description || '',
    sort_order: item.sort_order || 0,
    is_active: item.is_active !== undefined ? item.is_active : true,
  }
  targetFormError.value = ''
  showTargetModal.value = true
}

const closeTargetModal = () => { showTargetModal.value = false; targetFormError.value = '' }

const submitTargetForm = async () => {
  if (!targetForm.value.description.trim()) {
    targetFormError.value = 'Deskripsi wajib diisi'; return
  }
  targetSubmitting.value = true; targetFormError.value = ''
  try {
    const payload = {
      description: targetForm.value.description,
      sort_order: targetForm.value.sort_order,
      is_active: targetForm.value.is_active,
    }
    if (isTargetEdit.value) {
      await api.put(`/admin/safety-k3-targets/${selectedTarget.value.ID}`, payload)
      showAlert('success', 'K3 target berhasil diperbarui!')
    } else {
      await api.post('/admin/safety-k3-targets', payload)
      showAlert('success', 'K3 target berhasil ditambahkan!')
    }
    closeTargetModal(); await fetchTargets()
  } catch (e) {
    targetFormError.value = e.response?.data?.error || e.response?.data?.message || e.message || 'Terjadi kesalahan.'
  } finally { targetSubmitting.value = false }
}

const confirmTargetDelete = (item) => { selectedTarget.value = item; showTargetDeleteModal.value = true }
const doTargetDelete = async () => {
  targetSubmitting.value = true
  try {
    await api.delete(`/admin/safety-k3-targets/${selectedTarget.value.ID}`)
    targets.value = targets.value.filter(s => s.ID !== selectedTarget.value.ID)
    showTargetDeleteModal.value = false
    showAlert('success', 'K3 target berhasil dihapus!')
  } catch { showAlert('error', 'Gagal menghapus K3 target') }
  finally { targetSubmitting.value = false }
}

const toggleTargetActive = (item) => {
  const newVal = !item.is_active
  item.is_active = newVal
  toggleField(item.ID, 'is_active', newVal, 'safety-k3-targets', 'Status K3 target')
}

// ═══════════════════════════════════════════════════════════════
// ─── K3 Programs ──────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
const programs = ref([])
const programLoading = ref(true)
const programSubmitting = ref(false)
const showProgramModal = ref(false)
const showProgramDeleteModal = ref(false)
const isProgramEdit = ref(false)
const selectedProgram = ref(null)
const programFormError = ref('')

const programForm = ref({ description: '', sort_order: 0, is_active: true })

const fetchPrograms = async () => {
  programLoading.value = true
  try {
    const res = await api.get('/admin/safety-k3-programs')
    programs.value = res.data?.data || res.data || []
  } catch { showAlert('error', 'Gagal memuat K3 programs') }
  finally { programLoading.value = false }
}

const openProgramCreate = () => {
  isProgramEdit.value = false
  programForm.value = { description: '', sort_order: 0, is_active: true }
  programFormError.value = ''
  showProgramModal.value = true
}

const openProgramEdit = (item) => {
  isProgramEdit.value = true; selectedProgram.value = item
  programForm.value = {
    description: item.description || '',
    sort_order: item.sort_order || 0,
    is_active: item.is_active !== undefined ? item.is_active : true,
  }
  programFormError.value = ''
  showProgramModal.value = true
}

const closeProgramModal = () => { showProgramModal.value = false; programFormError.value = '' }

const submitProgramForm = async () => {
  if (!programForm.value.description.trim()) {
    programFormError.value = 'Deskripsi wajib diisi'; return
  }
  programSubmitting.value = true; programFormError.value = ''
  try {
    const payload = {
      description: programForm.value.description,
      sort_order: programForm.value.sort_order,
      is_active: programForm.value.is_active,
    }
    if (isProgramEdit.value) {
      await api.put(`/admin/safety-k3-programs/${selectedProgram.value.ID}`, payload)
      showAlert('success', 'K3 program berhasil diperbarui!')
    } else {
      await api.post('/admin/safety-k3-programs', payload)
      showAlert('success', 'K3 program berhasil ditambahkan!')
    }
    closeProgramModal(); await fetchPrograms()
  } catch (e) {
    programFormError.value = e.response?.data?.error || e.response?.data?.message || e.message || 'Terjadi kesalahan.'
  } finally { programSubmitting.value = false }
}

const confirmProgramDelete = (item) => { selectedProgram.value = item; showProgramDeleteModal.value = true }
const doProgramDelete = async () => {
  programSubmitting.value = true
  try {
    await api.delete(`/admin/safety-k3-programs/${selectedProgram.value.ID}`)
    programs.value = programs.value.filter(s => s.ID !== selectedProgram.value.ID)
    showProgramDeleteModal.value = false
    showAlert('success', 'K3 program berhasil dihapus!')
  } catch { showAlert('error', 'Gagal menghapus K3 program') }
  finally { programSubmitting.value = false }
}

const toggleProgramActive = (item) => {
  const newVal = !item.is_active
  item.is_active = newVal
  toggleField(item.ID, 'is_active', newVal, 'safety-k3-programs', 'Status K3 program')
}

// ═══════════════════════════════════════════════════════════════
// ─── Safety Sliders ───────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════
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

const sliderForm = ref({ image_url: '', sort_order: 0, is_active: true })

const fetchSliders = async () => {
  sliderLoading.value = true
  try {
    const res = await api.get('/admin/safety-sliders')
    sliders.value = res.data?.data || res.data || []
  } catch { showAlert('error', 'Gagal memuat slider') }
  finally { sliderLoading.value = false }
}

const openSliderCreate = () => {
  isSliderEdit.value = false
  sliderForm.value = { image_url: '', sort_order: 0, is_active: true }
  sliderImagePreview.value = null; sliderImageFile.value = null; sliderFormError.value = ''
  showSliderModal.value = true
}

const openSliderEdit = (slide) => {
  isSliderEdit.value = true; selectedSlider.value = slide
  sliderForm.value = {
    image_url: slide.image_url || '',
    sort_order: slide.sort_order || 0,
    is_active: slide.is_active !== undefined ? slide.is_active : true,
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
      is_active: sliderForm.value.is_active,
    }
    if (isSliderEdit.value) {
      await api.put(`/admin/safety-sliders/${selectedSlider.value.ID}`, payload)
      showAlert('success', 'Slide berhasil diperbarui!')
    } else {
      await api.post('/admin/safety-sliders', payload)
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
    await api.delete(`/admin/safety-sliders/${selectedSlider.value.ID}`)
    sliders.value = sliders.value.filter(s => s.ID !== selectedSlider.value.ID)
    showSliderDeleteModal.value = false
    showAlert('success', 'Slide berhasil dihapus!')
  } catch { showAlert('error', 'Gagal menghapus slide') }
  finally { sliderSubmitting.value = false }
}

const toggleSliderActive = (slide) => {
  const newVal = !slide.is_active
  slide.is_active = newVal
  toggleField(slide.ID, 'is_active', newVal, 'safety-sliders', 'Status slider')
}

// ─── Auth & Image URL ─────────────────────────────────────────
const getImageUrl = (path) => {
  if (!path) {return ''}
  if (path.startsWith('http')) {return path}
  return `${BASE_URL}/${path.replace(/^\//, '')}`
}

onMounted(() => {
  fetchPolicies()
  fetchTargets()
  fetchPrograms()
  fetchSliders()
})
</script>

<style scoped>
.modal-enter-active, .modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
</style>
