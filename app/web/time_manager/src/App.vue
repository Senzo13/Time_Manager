<script>
import { RouterView } from 'vue-router'
import Timer from "./components/Timer/Timer.vue";



export default {
  name: 'App',
  components: {
    Timer,
  },
}


</script>

<template>
  <main class="mainApp">
    <RouterView />
    <Timer />
  </main>
</template>