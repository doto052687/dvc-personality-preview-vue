<template>
  <main>
    <div class="wrapper">
      <LeftForm />
      <DragonCanvas />
      <RightForm />
    </div>
  </main>
</template>

<script setup lang="ts">
import DragonCanvas from '@/components/DragonCanvas.vue'
import LeftForm from '@/components/LeftForm.vue'
import RightForm from '@/components/RightForm.vue';
</script>
