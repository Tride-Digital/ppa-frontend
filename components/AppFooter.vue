<template>
  <v-footer app :class="theme.global.current.value.dark ? '' : 'bg-grey-lighten-2 text-black'">
    <v-col><h1>Add a footer to here</h1>
    <h1>Add a footer to here</h1></v-col>
    
  </v-footer>
</template>

<script setup>
import { useTheme } from 'vuetify';
const theme = useTheme()

</script>

<style scoped lang="sass">

</style>
