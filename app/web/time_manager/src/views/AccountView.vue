<script>
    import EditForm from "../components/Account/EditForm.vue";
    import NavBar from "../components/Navbar/Navbar.vue";
</script>

<template>
  <main>
    <NavBar />
    <div class="overview"><EditForm /></div>
  </main>
</template>

<style>
@import '../components/Account/EditForm.css';
@import '../assets/base.css';
main {
  display: flex;
  flex-direction: row;
  background-color: #171a21;
}

.overview {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
</style>