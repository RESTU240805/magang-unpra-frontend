<template>
  <section class="office-cards-section">
    <div class="office-cards-container">
      <div class="office-cards-header">
        <span class="office-cards-label">GET IN TOUCH</span>
        <h2 class="office-cards-title">Our Offices</h2>
      </div>

      <div class="office-cards-grid">
        <div v-for="(office, idx) in offices" :key="office.id ?? office.ID ?? idx" class="office-card-item">
          <div class="office-card-image">
            <img :src="getImageUrl(office.image)" :alt="office.name" />
          </div>
          <div class="office-card-body">
            <h3 class="office-card-city">{{ office.name }}</h3>
            <p class="office-card-address">{{ office.address }}</p>
            <a class="office-card-phone" v-if="office.phone" :href="'tel:' + office.phone.replace(/[^0-9+]/g, '')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              {{ office.phone }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:8080'
const offices = ref([])

onMounted(async () => {
  try {
    const res = await api.get('/contact-offices')
    const raw = res.data?.data || []
    offices.value = raw.filter(o => o.is_active !== false).map(o => ({ ...o, id: o.id ?? o.ID }))
  } catch (_e) {}
})

function getImageUrl(path) {
  if (!path) return '/images/jakarta.jpeg'
  if (path.startsWith('http')) return path
  if (path.startsWith('/uploads/')) return BASE_URL + path
  if (path.startsWith('uploads/')) return BASE_URL + '/' + path
  return path
}
</script>

<style scoped>
.office-cards-section {
  background: linear-gradient(180deg, #f4f9f2 0%, #ffffff 100%);
  padding: 56px 0;
}

.office-cards-container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 40px;
}

.office-cards-header {
  text-align: center;
  margin-bottom: 48px;
}

.office-cards-label {
  display: block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #5F9E42;
  margin-bottom: 8px;
}

.office-cards-title {
  font-size: 32px;
  font-weight: 900;
  color: #1a2e1a;
  margin: 0;
}

.office-cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.office-card-item {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e4efdb;
  transition: box-shadow 0.3s, transform 0.3s;
}

.office-card-item:hover {
  box-shadow: 0 8px 24px rgba(95, 158, 66, 0.12);
  transform: translateY(-4px);
}

.office-card-image {
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.office-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.office-card-item:hover .office-card-image img {
  transform: scale(1.05);
}

.office-card-body {
  padding: 20px;
}

.office-card-city {
  font-size: 16px;
  font-weight: 800;
  color: #1a2e1a;
  margin: 0 0 8px;
}

.office-card-address {
  font-size: 13px;
  color: #6b7b67;
  line-height: 1.6;
  margin: 0 0 12px;
}

.office-card-phone {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #5F9E42;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.office-card-phone:hover {
  color: #4a8534;
}

.office-card-phone svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

@media (max-width: 1024px) {
  .office-cards-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .office-cards-grid { grid-template-columns: 1fr; }
  .office-cards-container { padding: 0 20px; }
  .office-cards-title { font-size: 24px; }
}
</style>
