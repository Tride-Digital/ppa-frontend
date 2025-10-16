<template>
  <section class="about-section py-8">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" class="text-center mb-6">
          <h2 class="section-title">About us</h2>
        </v-col>
        <v-col cols="12" md="10" lg="8">
          <div class="about-content">
            <p class="about-text mb-6" v-html="tagLine"></p>
            <p class="about-text mb-4" v-html="aboutParagraph1"></p>
            <p class="about-text mb-4" v-html="aboutParagraph2"></p>
            <p class="about-text mb-4" v-html="aboutParagraph3"></p>
            <p class="about-text mb-4" v-html="aboutParagraph4"></p>
            <p class="about-text mb-4" v-html="aboutParagraph5"></p>
            <p class="about-text mb-4" v-html="aboutParagraph6"></p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { ref } from "vue";
const tagLine = ref(
  '<h3><b>Cultivating Tomorrow’s Agricultural Legacy</b></h3>'
);

const aboutParagraph1 = ref(
  'The <span translate="no"> Proprietary Planters Alliance (Pvt) Ltd (PPA) </span> s where Sri Lanka’s proud plantation heritage meets modern financial opportunity. Representing clients across all nine provinces, PPA is the nation’s first private-sector alliance dedicated to transforming privately owned plantations—10 to 50 acres—into high-value, future-ready enterprises with global reach. In this journey, we see the Ministry of Plantations, the Treasury, and both national and international funding institutions as strategic partners in progress.'
);
const aboutParagraph2 = ref(
  "At PPA, we believe a plantation is more than land—it is a <b>dynamic investment platform.</b> Every ray of sunlight, each layer of fertile soil, Sri Lanka’s unique climate, and rich biodiversity are harnessed to generate sustainable, above-average profits. Each estate is developed as an independent business, structured and nurtured by our multidisciplinary team of professionals in finance, law, agronomy, human resource management, and market strategy—turning potential into prosperity."
);

const aboutParagraph3 = ref(
  "PPA is not just an organization—it is a <b>movement and philosophy.</b> We unite visionary growers, Agri-innovators, and strategic investors to unlock prosperity and serve global markets increasingly focused on health and wellness. From tea, rubber, and coconut to 14 spices, fruits, and timber, every perennial crop is managed as a multicopped wealth-creating asset."
);

const aboutParagraph4 = ref(
  "Our 10-member leadership team delivers end-to-end expertise: policy advocacy, financial structuring, climate-smart technologies, value-added processing, branding, exports, and supply chain solutions—all aligned with Sri Lanka’s Agri-modernization goals and tailored to client budgets."
);

const aboutParagraph5 = ref(
  "At PPA, every partnership is a seed of growth. Together, we cultivate livelihoods, empower entrepreneurs, and expand Sri Lanka’s plantations into global markets."
);

const aboutParagraph6 = ref(
  "<b>Join the Alliance. Invest Wisely. Grow Sustainably. Be a partner in building a developed Sri Lanka.</b>"
);
</script>

<style scoped>
.about-section {
  background-color: rgb(var(--v-theme-background));
}
.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: rgb(var(--v-theme-section-title));
}
.about-content {
  text-align: justify;
}
.about-text {
  font-size: 1.1rem;
  line-height: 1.8;
  color: rgb(var(--v-theme-about-text));
}
</style>
