<script setup>
import { useGoogleTranslate } from '#imports';

const { activeLanguage, setLanguage, supportedLanguages, isLoaded } = useGoogleTranslate();

// const languageNames = {
//   en: 'English - English',
//   ta: 'Tamil - தமிழ்',
//   si: 'Sinhala - සිංහල'
// };

const languageNames = {
  en: 'EN',
  ta: 'தமிழ்',
  si: 'සිං'
};

const changeLanguage = (event) => {
  setLanguage(event.target.value); // No refresh
};
</script>

<template>
  <div translate="no" class="dropdown-container">
    <select v-if="isLoaded" :value="activeLanguage" @change="changeLanguage">
      <option v-for="lang in supportedLanguages" :key="lang" :value="lang">
        {{ languageNames[lang] || lang }}
      </option>
    </select>
  </div>
</template>

<style scoped>
.dropdown-container {
  display: flex;
  align-items: center;
}
select {
  width: auto;
  color: var(--v-theme-navtext);
  border: 1px solid rgb(var(--v-theme-navtext));
  border-radius: 20px;
  padding: 4px 12px;
  font-weight: 500;
  font-size: 14px;
  appearance: none;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
select:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
select option {
  color: black;
  background-color: white;
}
</style>
