<template>
  <main>
    <NavbarVue />
    <div class="overview">
      <WorkingtimeComponent />
    </div>
  </main>
</template>

<script>
import NavbarVue from "../components/Navbar/Navbar.vue";
import WorkingtimeComponent from "../components/WorkingTime/WorkingtimeComponent.vue";
</script>

<style scoped>
main {
  display: flex;
  flex-direction: row;
  background-color: #171a21;
}

.overview {
  display: flex;
  width: 100%;
  flex-direction: column;
}
</style>
