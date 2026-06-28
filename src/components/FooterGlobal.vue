<template>
  <section class="footer-info-section">
    <div class="footer-info-container">
      <div class="footer-info-grid">
        <div class="footer-info-col">
          <p class="footer-about-text">
            <slot name="about">
              PT. Tanjungenim Lestari Pulp and Paper (PT. TEL), is one of the most exciting pulp mills in Indonesia today and the only pulp mill in the world to produce high-quality, bleached-hardwood Kraft pulp with 100 percent plantation grown Acacia mangium and Eucalyptus Pellita trees.
            </slot>
          </p>
        </div>
        <div class="footer-info-col footer-logos-col">
          <slot name="logos">
            <img src="/images/logosatu.jpeg" alt="Yayasan Pendidikan Tanjungenim Lestari" class="footer-logo-combined" />
          </slot>
        </div>
        <div class="footer-info-col footer-contact-col">
          <div class="footer-contact-row">
            <svg class="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>{{ info.address || 'Kab. Muara Enim, Sumatera Selatan.' }}</span>
          </div>
          <div class="footer-contact-row">
            <svg class="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>{{ info.phone || '(+62) 713-324-150' }}</span>
          </div>
          <div class="footer-contact-row">
            <svg class="footer-contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"/></svg>
            <span>{{ info.working_hours || 'Mon-Fri: 8:00 – 17:00' }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <footer class="site-footer">
    <div class="footer-copyright">
      <p>{{ info.copyright || 'Copyright 2026 PT TELPP. All right reserved.' }}</p>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const info = ref({
  email: '',
  phone: '',
  address: '',
  working_hours: '',
  copyright: '',
  hero_image: '',
  map_link: '',
})

onMounted(async () => {
  try {
    const res = await api.get('/contact-info')
    const data = res.data?.data || res.data
    if (data) {
      info.value = {
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
})
</script>

<style scoped>
.footer-info-section {
  background: #ffffff;
  border-top: 1px solid #e4efdb;
  padding: 56px 0;
}
.footer-info-container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 40px;
}
.footer-info-grid {
  display: grid;
  grid-template-columns: 1fr 1.1fr 0.9fr;
  gap: 48px;
  align-items: start;
}
.footer-info-col {
  display: flex;
  flex-direction: column;
}
.footer-about-text {
  margin: 0;
  font-size: 14px;
  color: #7a8a76;
  line-height: 1.75;
  font-weight: 400;
}
.footer-logos-col {
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.footer-logo-combined {
  width: 100%;
  max-width: 380px;
  height: auto;
  object-fit: contain;
  display: block;
}
.footer-contact-col {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 280px;
}
.footer-contact-row {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 14px;
  color: #5a6b56;
  font-weight: 400;
  line-height: 1.4;
  margin: 0;
}
.footer-contact-icon {
  width: 19px;
  height: 19px;
  flex-shrink: 0;
  color: #5F9E42;
}

.site-footer {
  width: 100%;
  background-color: #5F9E42;
  padding: 25px 0;
  margin-top: 40px;
  text-align: center;
}
.footer-copyright p {
  margin: 0;
  font-size: 14px;
  color: #ffffff;
  font-weight: 400;
}

@media (max-width: 768px) {
  .footer-info-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .footer-contact-col {
    max-width: 100%;
  }
  .footer-copyright p {
    font-size: 12px;
  }
}
</style>
