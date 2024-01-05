// app.vue
<template>
  <v-btn>Hello Sass Change</v-btn>
</template>

<script setup>
const route = useRoute();
console.log(route.params); // { name: 'spongebob' }
</script>
