<script setup>
import { useGoogleTranslate } from '#imports';

const { activeLanguage, setLanguage, supportedLanguages, isLoaded } = useGoogleTranslate();

const languageNames = {
  en: 'English - English',
  ta: 'Tamil - தமிழ்',
  si: 'Sinhala - සිංහල'
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
  color: white;
  border: 1px solid white;
  padding: 10px;
  font-weight: 500;
  font-size: 14px;
  appearance: none;
  outline: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
select:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
select option {
  color: black;
  background-color: white;
}
</style>
