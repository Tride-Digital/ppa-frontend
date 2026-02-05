<template>

    <v-container class="fill-height" >
        <v-col v-for="n in 10" :key="n" cols="4">
            <GuideBox />
        </v-col>

    </v-container>
</template>
<script setup>
import GuideBox from '~/components/GuideBox.vue';
</script>