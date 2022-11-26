<script>
import SigninForm from "../components/Register/SignupForm.vue";
</script>

<template>
  <main class="overview">
    <SigninForm />
  </main>
</template>

<style>
  @import '../components/Register/SignupForm.css';
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