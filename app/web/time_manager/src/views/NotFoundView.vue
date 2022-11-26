<template>
  <main class="notlogged-main">
    <div class="notlogged-container">
      <p class="title">404 - Looks like you're lost.</p>
      <p class="text">Maybe this page used to exist or you just spelled something wrong.</p>
      <p class="text">Chances are you spelled something wrong, so you can double check the url.</p>
      <div class="notlogged-boxbtn">
        <button class="notlogged-btn" @click="this.$router.push(`/signup`)">Register</button>
        <button class="notlogged-btn" @click="this.$router.push(`/signin`)">Login</button>
      </div>
    </div>
  </main>   
</template>


<style>

@import url('https://fonts.googleapis.com/css2?family=Work+Sans&display=swap');

.notlogged-main {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 100vh;
  width: 100%;
}

.notlogged-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-size: 62px;
  font-family: 'Work Sans', sans-serif;
  font-weight: 600;
  color: #fff;
}

.text {
  font-size: 20px;
  font-family: 'Work Sans', sans-serif;
  font-weight: 400;
  color: gray;
}

.notlogged-boxbtn {
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  text-align: center;
  margin-top: 50px;
  gap: 10px;
}

.notlogged-btn {
  font-size: 20px;
  font-weight: bold;
  font-family: 'Work Sans', sans-serif;
  width: 300px;
  height: 60px;
  background-color: #2b3241;
  color: #d7ba8b;
  border: none;
  cursor: pointer;
}

.notlogged-btn:hover {
  background-color: #363e51;
  transition: 0.5s;
}

</style>