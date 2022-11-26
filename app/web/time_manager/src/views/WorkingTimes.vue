<script>
import Workingtimes from "../components/WorkingTimes/WorkingtimesComponent.vue";
import NavbarVue from "../components/Navbar/Navbar.vue";
</script>

<template>
  <main>
    <NavbarVue />
    <div class="overview"><Workingtimes /></div>
  </main>
</template>

<style>
main {
  display: flex;
  flex-direction: row;
  background-color: #171a21;
  width: 100%;
}

.overview {
  display: flex;
  width: 100%;
  flex-direction: column;
}
</style>
