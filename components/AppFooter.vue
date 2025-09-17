<template>
  <v-footer class="footer-section">
    <v-container>
      <v-row>
        <v-col cols="12" md="4" class="mb-6">
          <div class="footer-brand mb-4">
            <v-row align="center" no-gutters>
              <v-col cols="auto">
                <v-img :height="60" :width="60" src="/images/logo_white.png" alt="PPA Logo" contain class="footer-logo"></v-img>
              </v-col>
              <v-col class="ml-3">
                <h3 class="footer-brand-text footer-primary-text" translate="no">Proprietary</h3>
                <h3 class="footer-brand-text footer-primary-text" translate="no">Planters Alliance</h3>
              </v-col>
            </v-row>
          </div>
          <p class="footer-description footer-secondary-text">{{ footerDescription }}</p>
          <div class="footer-social mt-4">
            <v-btn v-for="social in socialLinks" :key="social.name" :href="social.url" target="_blank" icon variant="text" class="footer-social-btn" size="small">
              <v-icon v-if="social.icon !== 'custom-x'">{{ social.icon }}</v-icon>
              <v-img v-else src="/icons/x-icon.svg" alt="X (Twitter)" width="20" height="20" class="custom-x-icon"/>
            </v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="2"></v-col>
        <v-col cols="12" md="2" class="mb-6">
          <div>
            <h4 class="footer-section-title footer-primary-text mb-4">Quick Links</h4>
            <v-list class="footer-list px-0">
              <v-list-item v-for="item in quickLinks" :key="item.title" :to="item.external ? undefined : item.path" :href="item.external ? item.url : undefined" :target="item.external ? '_blank' : undefined" class="footer-list-item px-0">
                <v-list-item-title class="footer-link footer-primary-text footer-link-base">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </div>
        </v-col>
        <v-col cols="12" md="1"></v-col>
        <v-col cols="12" md="3" class="mb-6">
          <h4 class="footer-section-title footer-primary-text mb-4">Contact Info</h4>
          <div class="footer-contact">
            <div v-for="contact in contactInfo" :key="contact.type" class="contact-item mb-3">
              <v-icon class="contact-icon">{{ contact.icon }}</v-icon>
              <span v-if="!contact.href"class="contact-text footer-secondary-text"> {{ contact.text }}</span>
              <a v-else :href="contact.href" class="contact-text contact-link footer-secondary-text footer-link-base" :target="contact.type === 'website' ? '_blank' : '_self'">{{ contact.text }}</a>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-divider class="footer-divider mb-6"></v-divider>
      <v-row align="center">
        <v-col cols="12" md="6" class="copyright-col">
          <p class="footer-copyright footer-secondary-text" translate="no">© {{ currentYear }} Proprietary Planters Alliance. All rights reserved.</p>
        </v-col>
        <v-col cols="12" md="6" class="text-md-end">
          <div class="footer-legal">
          <!-- <LanguageSelector class="mr-4" /> -->
            <a href="/privacy" class="footer-legal-link footer-primary-text footer-link-base">Privacy Policy</a>
            <span class="footer-separator footer-secondary-text">|</span>
            <a href="/terms" class="footer-legal-link footer-primary-text footer-link-base">Terms of Service</a>
            <span class="footer-separator footer-secondary-text">|</span>
            <a translate="no" target="_blank" href="https://www.trbogen.com/" class="footer-legal-link footer-primary-text footer-link-base">Powered by Turbogen</a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import { ref, computed } from 'vue'
const currentYear = computed(() => new Date().getFullYear())
const footerDescription = ref('Empowering proprietary plantations for a sustainable future through unified representation and agricultural innovation.')
const quickLinks = ref([
  { title: 'Home', path: '/' },
  { title: 'About Us', path: '/aboutus' },
  { title: 'Announcements', path: '/announcements' },
  { title: 'Services', path: '/services' },
  { title: 'Join PPA', path: '/providerselector' }
])
const socialLinks = ref([
  { name: 'Facebook', icon: 'mdi-facebook', url: 'https://www.facebook.com/share/1BZSphvAiV/?mibextid=wwXIfr' },
  { name: 'X', icon: 'custom-x'/*, url: '#'*/ },
  { name: 'LinkedIn', icon: 'mdi-linkedin'/*, url: '#'*/ },
  { name: 'Instagram', icon: 'mdi-instagram'/*, url: '#'*/ },
  { name: 'YouTube', icon: 'mdi-youtube'/*, url: '#'*/ }
])
const contactInfo = ref([
  {
    icon: 'mdi-map-marker',
    text: 'No. 28, U. E. Perera Mawatha, Rajagiriya. 10107',  
    type: 'address'
  },
  {
    icon: 'mdi-email',
    text: 'info@planters.lk',
    type: 'email',
    href: 'mailto:info@planters.lk'
  },
  {
    icon: 'mdi-web',
    text: 'www.planters.lk',
    type: 'website',
    href: 'https://planters.lk/'
  }
])
</script>

<style scoped>
.footer-section {
  background-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
  padding: 40px 0 0 0;
}
.footer-primary-text {
  color: rgb(var(--v-theme-on-primary));
  margin: 0;
}
.footer-secondary-text {
  color: rgb(var(--v-theme-footer-text-secondary));
}
.footer-link-base {
  text-decoration: none;
  transition: color 0.3s ease;
}
.footer-link-base:hover {
  color: rgb(var(--v-theme-footer-link-hover));
}
.footer-brand-text {
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.2;
}
.footer-description {
  font-size: 0.95rem;
  line-height: 1.6;
}
.footer-logo {
  filter: brightness(0) invert(1);
}
.footer-section-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}
.footer-list {
  background: transparent;
  padding: 0;
  margin-left: 0;
}
.footer-list-item {
  padding: 4px 0;
  min-height: auto;
  padding-left: 0;
}
.footer-link {
  font-size: 0.9rem;
  cursor: pointer;
}
.footer-contact .contact-item {
  display: flex;
  align-items: flex-start;
}
.contact-icon {
  color: rgb(var(--v-theme-footer-link-hover));
  margin-right: 12px;
  margin-top: 2px;
  font-size: 1.1rem;
}
.contact-text {
  font-size: 0.9rem;
  line-height: 1.4;
}
.footer-directors .director-item {
  margin-bottom: 8px;
}
.director-col {
  padding: 0 4px !important;
}
.director-content {
  display: flex;
  /* flex-direction: column; */
  align-items: flex-start;
  text-align: left; 
  /* justify-content: center;
  flex-wrap: wrap; */
  gap: 8px;
}
.director-name {
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 1.2;
  text-align: center;
  white-space: nowrap;
}
.director-phone {
  font-size: 0.8rem;
  line-height: 1.3;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  white-space: nowrap;
}
.phone-icon {
  color: rgb(var(--v-theme-footer-link-hover));
  font-size: 1rem;
  margin-right: 4px;
  margin-bottom: 0;
}
.director-phone .contact-link {
  text-align: center;
}
.director-note {
  font-size: 0.7rem;
  margin-left: 4px;
  opacity: 0.8;
  display: inline;
}
.footer-social-btn {
  margin-right: 8px;
  color: rgb(var(--v-theme-text));
  transition: background-color 0.3s ease;
}
.footer-social-btn:hover {
  color: rgb(var(--v-theme-text)) !important;
  background-color: rgba(255, 255, 255, 0.1) !important;
}
.custom-x-icon {
  filter: brightness(0) invert(1);
  transition: none;
}
.footer-social-btn:hover .custom-x-icon {
  filter: brightness(0) invert(1);
}
.footer-divider {
  border-color: rgb(var(--v-theme-footer-border));
  opacity: 0.3;
}
.footer-copyright {
  font-size: 0.85rem;
  margin: 0;
}
.footer-legal {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.footer-legal-link {
  font-size: 0.85rem;
}
.footer-separator {
  margin: 0 12px;
  font-size: 0.85rem;
}
@media (max-width: 768px) {
  .footer-section {
    padding: 40px 0 20px 0;
  }
  .footer-brand-text {
    font-size: 1rem;
  }
  .footer-section-title {
    font-size: 1.1rem;
  }
  .footer-legal {
    justify-content: center;
    margin-top: 10px;
  }
  .copyright-col {
    text-align: center;
  }
}
@media (max-width: 480px) {
  .footer-brand .v-row {
    flex-direction: column;
    text-align: center;
  }
  .footer-brand .ml-3 {
    margin-left: 0 !important;
    margin-top: 8px;
  }
  .footer-social {
    text-align: center;
  }
}
</style>