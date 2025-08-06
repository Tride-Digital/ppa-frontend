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
        <v-col cols="12" md="2" class="mb-6">
          <h4 class="footer-section-title footer-primary-text mb-4">Quick Links</h4>
          <v-list class="footer-list">
            <v-list-item v-for="item in quickLinks" :key="item.title" :to="item.path" class="footer-list-item">
              <v-list-item-title class="footer-link footer-primary-text footer-link-base">
                {{ item.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="2" class="mb-6">
          <h4 class="footer-section-title footer-primary-text mb-4">Services</h4>
          <v-list class="footer-list">
            <v-list-item v-for="service in services" :key="service.title" :to="service.path" class="footer-list-item">
              <v-list-item-title class="footer-link footer-primary-text footer-link-base">
                {{ service.title }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="12" md="4" class="mb-6">
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
      <v-row>
        <v-col cols="12" class="mb-4">
          <div class="footer-directors">
            <v-row>
              <v-col  v-for="(director, index) in directorContacts" :key="director.name" cols="12" sm="6" md="3" lg="2.4" xl="1.2" class="director-col">
                  <div class="director-item mb-2">
                    <div class="director-content">
                      <div class="director-name footer-primary-text">{{ director.name }}</div>
                       <div class="director-phone footer-secondary-text">
                        <v-icon class="phone-icon">mdi-phone</v-icon>
                        <a :href="'tel:' + director.phone" class="contact-link footer-secondary-text footer-link-base">{{ director.phone }}</a>
                        <span v-if="director.note" class="director-note footer-secondary-text">{{ director.note }}</span>
                       </div>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </div>
        </v-col>
      </v-row>
      <v-divider class="footer-divider my-6"></v-divider>
      <v-row align="center">
        <v-col cols="12" md="6">
          <p class="footer-copyright footer-secondary-text">© {{ currentYear }} Proprietary Planters Alliance. All rights reserved.</p>
        </v-col>
        <v-col cols="12" md="6" class="text-md-end">
          <div class="footer-legal">
          <LanguageSelector class="mr-4" />
            <a href="/privacy" class="footer-legal-link footer-primary-text footer-link-base">Privacy Policy</a>
            <span class="footer-separator footer-secondary-text">|</span>
            <a href="/terms" class="footer-legal-link footer-primary-text footer-link-base">Terms of Service</a>
            <span class="footer-separator footer-secondary-text">|</span>
            <a target="_blank" href="https://www.trbogen.com/" class="footer-legal-link footer-primary-text footer-link-base">Powered by Turbogen</a>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
import { ref, computed } from 'vue'
const currentYear = computed(() => new Date().getFullYear())
const footerDescription = ref('Empowering private plantation growers for a sustainable future through unified representation and agricultural innovation.')
const quickLinks = ref([
  { title: 'Home', path: '/' },
  { title: 'About Us', path: '/aboutus' },
  { title: 'Announcements', path: '/announcements' },
  { title: 'Products', path: '/products' },
  { title: 'Membership', path: '/membership' }
])
const services = ref([
  { title: 'Consultation'/*, path: '/services/consultation'*/ },
  { title: 'Training'/*, path: '/services/training'*/ },
  { title: 'Certification'/*, path: '/services/certification'*/ },
  { title: 'Market Access'/*, path: '/services/market-access'*/ }
])
const socialLinks = ref([
  { name: 'Facebook', icon: 'mdi-facebook'/*, url: '#'*/ },
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
const directorContacts = ref([
  { name: 'Director / CEO', phone: '077 7790147' },
  { name: 'Director-Operations', phone: '077 7812538' },
  { name: 'Director-Marketing', phone: '077 7423500' },
  { name: 'Director-Finance', phone: '076 9499270', note: '(WhatsApp)' },
  { name: 'Director-Projects', phone: '077 2960284' },
  { name: 'Director-Sustainability', phone: '077 7485957' },
  { name: 'Director-Exports', phone: '077 8752657' },
  { name: 'Director-Legal', phone: '077 7713567' },
  { name: 'Director-HRM', phone: '077 2376343' },
  { name: 'Director-Export crops', phone: '077 6083027' }
])
</script>

<style scoped>
.footer-section {
  background-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
  padding: 60px 0 20px 0;
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
}
.footer-list-item {
  padding: 4px 0;
  min-height: auto;
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
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
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
  transition: color 0.3s ease, background-color 0.3s ease;
}
.footer-social-btn:hover {
  color: rgb(var(--v-theme-footer-link-hover));
  background-color: rgb(var(--v-theme-footer-social-btn-bg));
}
.custom-x-icon {
  filter: brightness(0) invert(1);
  transition: filter 0.3s ease;
}
.footer-social-btn:hover .custom-x-icon {
  filter: brightness(0) invert(1) sepia(1) hue-rotate(88deg) saturate(2);
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
