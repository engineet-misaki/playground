// app.vue
<template>
  <v-btn>Hello Sass Change</v-btn>
  <p>{{ $route.name }}</p>
</template>

<script setup>
const route = useRoute();
console.log(route.params); // { name: 'spongebob' }
console.log(route); // { name: 'spongebob' }
</script>
