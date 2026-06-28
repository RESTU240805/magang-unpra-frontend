<template>
  <aside class="w-64 bg-gray-950 text-white flex flex-col fixed h-full z-40">
    <div class="p-6 border-b border-gray-800">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center font-black text-sm">T</div>
        <div>
          <p class="font-black text-sm">TELPP</p>
          <p class="text-xs text-gray-500">Management Profile</p>
        </div>
      </div>
    </div>
    <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
      <p class="text-xs text-gray-500 font-semibold tracking-widest mb-2 mt-2 px-2">OVERVIEW</p>
      <RouterLink to="/admin/dashboard"
        :class="['flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition',
          active === 'dashboard' ? 'bg-green-600 text-white font-medium' : 'hover:bg-gray-800 text-gray-300']">
        📊 Dashboard
      </RouterLink>
      <p class="text-xs text-gray-500 font-semibold tracking-widest mb-2 mt-4 px-2">CONTENT ENGINE</p>
      <RouterLink to="/admin/news"
        :class="['flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition',
          active === 'news' ? 'bg-green-600 text-white font-medium' : 'hover:bg-gray-800 text-gray-300']">
        📰 Corporate News
      </RouterLink>
      <RouterLink to="/admin/product-page"
        :class="['flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition',
          active === 'product' ? 'bg-green-600 text-white font-medium' : 'hover:bg-gray-800 text-gray-300']">
        📦 Product
      </RouterLink>
      <RouterLink to="/admin/forest-management"
        :class="['flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition',
          active === 'forest' ? 'bg-green-600 text-white font-medium' : 'hover:bg-gray-800 text-gray-300']">
        🌲 Forest Management
      </RouterLink>
      <RouterLink to="/admin/people-development"
        :class="['flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition',
          active === 'people' ? 'bg-green-600 text-white font-medium' : 'hover:bg-gray-800 text-gray-300']">
        👥 People Development
      </RouterLink>
      <RouterLink to="/admin/about"
        :class="['flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition',
          active === 'about' ? 'bg-green-600 text-white font-medium' : 'hover:bg-gray-800 text-gray-300']">
        🏢 About Section
      </RouterLink>
      <RouterLink to="/admin/community"
        :class="['flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition',
          active === 'community' ? 'bg-green-600 text-white font-medium' : 'hover:bg-gray-800 text-gray-300']">
        🌱 Community
      </RouterLink>
      <RouterLink to="/admin/pulp-process"
        :class="['flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition',
          active === 'pulp-process' ? 'bg-green-600 text-white font-medium' : 'hover:bg-gray-800 text-gray-300']">
        🏭 Pulp Process
      </RouterLink>
      <RouterLink to="/admin/safety-health"
        :class="['flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition',
          active === 'safety-health' ? 'bg-green-600 text-white font-medium' : 'hover:bg-gray-800 text-gray-300']">
        🛡️ Safety & Health
      </RouterLink>
      <RouterLink to="/admin/supply-chain"
        :class="['flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition',
          active === 'supply-chain' ? 'bg-green-600 text-white font-medium' : 'hover:bg-gray-800 text-gray-300']">
        🔗 Supply Chain
      </RouterLink>
      <RouterLink to="/admin/csr"
        :class="['flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition',
          active === 'csr' ? 'bg-green-600 text-white font-medium' : 'hover:bg-gray-800 text-gray-300']">
        📄 CSR Management
      </RouterLink>
      <RouterLink to="/admin/contact"
        :class="['flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition',
          active === 'contact' ? 'bg-green-600 text-white font-medium' : 'hover:bg-gray-800 text-gray-300']">
        📞 Contact
      </RouterLink>
      <RouterLink to="/admin/team-members"
        :class="['flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition',
          active === 'team' ? 'bg-green-600 text-white font-medium' : 'hover:bg-gray-800 text-gray-300']">
        👥 Our Team
      </RouterLink>
      <RouterLink to="/admin/our-company"
        :class="['flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition',
          active === 'company' ? 'bg-green-600 text-white font-medium' : 'hover:bg-gray-800 text-gray-300']">
        🏛️ Our Company
      </RouterLink>
      <RouterLink to="/admin/menus"
        :class="['flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition',
          active === 'menus' ? 'bg-green-600 text-white font-medium' : 'hover:bg-gray-800 text-gray-300']">
        📋 Menu
      </RouterLink>
    </nav>
    <div class="p-4 border-t border-gray-800">
      <div v-if="user" class="flex items-center gap-3 mb-3">
        <div class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-xs font-bold">A</div>
        <div>
          <p class="text-sm font-medium">{{ user.name }}</p>
          <p class="text-xs text-gray-500">{{ user.email }}</p>
        </div>
      </div>
      <button @click="logout" class="w-full text-left text-sm text-gray-400 hover:text-white transition px-2">→ Logout</button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { RouterLink } from 'vue-router'

defineProps({
  active: { type: String, default: 'dashboard' }
})

const router = useRouter()

const user = computed(() => {
  try {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  } catch { return null }
})

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/admin/login')
}
</script>
