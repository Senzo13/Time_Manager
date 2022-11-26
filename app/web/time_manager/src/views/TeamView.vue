<template>
  <main>
    <NavbarVue />
    <div class="overview">
      <Team />
    </div>
  </main>
</template>

<script>
import NavbarVue from "../components/Navbar/Navbar.vue";
import Team from "../components/Teams/Team.vue";
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
