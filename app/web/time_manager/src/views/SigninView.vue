<script>
import SigninForm from "../components/Login/SigninForm.vue";
</script>

<template>
  <main>
    <div class="overview"> 
      <SigninForm /></div>
  </main>
</template>

<style>
  @import '../components/Login/SigninForm.css';
  @import '../assets/base.css';
  
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