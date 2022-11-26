<template>
  <main>
    <NavbarVue />
    <div class="overview">
      <Teams />
    </div>
  </main>
</template>

<script>
import NavbarVue from "../components/Navbar/Navbar.vue";
import Teams from "../components/Teams/Teams.vue";
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
