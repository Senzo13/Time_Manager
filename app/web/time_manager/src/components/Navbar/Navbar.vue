<template>
  <div class="nav_main">

    <!-- TITLE -->
    <div class="nav_top">
      <div>
        <BIconGearWideConnected class="top_nav_icon" />
        </div>
      <p class="nav_h2">Time Manager</p>
    </div>

    <!-- NAVIGATION -->
    <div class="nav_middle">

      <!-- OVERVIEW -->
      <RouterLink to="/" class="navigation">
        <BIconBarChart class="icons" />
        <p>Overview</p>
      </RouterLink>

      <!-- ACCOUNT -->
      <RouterLink to="/account" class="navigation">
        <BIconPerson class="icons" />
        <p>Account</p></RouterLink>
        
      <!-- WORKINGTIMES -->
      <RouterLink to="/workingtimes" class="navigation">
        <BIconCalendar2Range class="icons" />
        <p>WorkingTimes</p></RouterLink>

      <!-- TEAMS -->
      <RouterLink to="/teams" class="navigation">
        <BIconGrid  v-if="this.currentUser.role != 'Users'" class="icons" />
        <p  v-if="this.currentUser.role != 'Users'" >Teams</p></RouterLink>
    </div>
  </div>
</template>

<script>
// IMPORT
import { BIconBarChart, BIconClockHistory, BIconGearWideConnected, BIconPerson, BIconCalendar2Range, BIconGrid } from "bootstrap-icons-vue";


export default{
  name: "Navbar",
  // Icons
  components: {
    BIconGearWideConnected,
    BIconBarChart,
    BIconPerson,
    BIconClockHistory,
    BIconCalendar2Range,
    BIconGrid
},

computed:{
currentUser() {
      return this.$store.getters.getCurrentUser;
    },
  },

methods: { 

  // Logout
  logOut() {
  localStorage.clear("token");
  window.location.href = "/";
}
}}
</script>

<style scoped>
.nav_main {
  display: flex;
  flex-direction: column;
  height: 140vh;
  width: 25%;
  align-items: center;
  background-color: #171a21;
  padding-top: 50px;
  padding-left: 50px;
  border-right: 2px solid #323232;
}
.nav_top {
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid #323232;
  height: 10vh;
  width: 100%;
}

.icons {
  height: 20px;
  width: 20px;
  margin-right: 10px;
  color:#929292
}
.top_nav_icon {
  height: 30px;
  width: 30px;
  margin-right: 10px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  color: #d7ba8b;
}
.nav_top > p.nav_h2 {
  color: #d7ba8b;
  font-size: 24px;
}
.nav_middle {
    height: 70vh;
    width: 100%;
    padding-top: 50px;
    display: flex;
    flex-direction: column;
}
.navigation {
    display: flex;
    flex-direction: row;
    margin-bottom: 25px;
    text-decoration: none;
    align-items: center;
}
.navigation > p {
    font-size: 20px;
    color: #929292;
    cursor: pointer;
    text-decoration: none;
}
.navigation > p:hover {
    transition: 0.5s;
    color: #fff;
}

@media screen and (max-width: 1190px) {
  .nav_main{
    width:40%;
    height: 150vh;
  }
}
@media screen and (max-width: 1160px) {
  .nav_main{
    width:40%;
    height: 130vh;
  }
}
  @media screen and (max-width: 900px) {
  .nav_main{
    width:40%;
    height: 150vh;
  }
}


</style>
