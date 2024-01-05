<template>
  <span>User ID: {{ $route.params.id }}</span>
</template>

<script setup>
const route = useRoute();
console.log(route.params); // { id: '123' }
</script>
