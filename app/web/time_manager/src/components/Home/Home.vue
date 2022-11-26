<template>

  <!-- START MAIN -->
  <div class="home-main">
    <div class="home-top">

      <!-- HEADER -->
      <div class="home-left">
        <p class="title">Welcome back, {{ currentUser.username }}</p>
        <p class="text">Here’s what’s happening with your store today</p>
      </div>
      <div class="home-right"></div>
    </div>
    <div class="home-content">
      <div class="content-main">

        <!-- COMPONENT TOTAL USERS -->
        <div class="content-top">Team users</div>
        <div class="content-middle">{{ this.usersG }}</div>
      </div>
      <div class="content-main">

        <!-- COMPONENT TOTAL TIMES -->
        <div class="content-top">Total users</div>
        <div class="content-middle">{{ this.users.length }}</div>
      </div>
      <div class="content-main">

        <!-- COMPONENT TOTAL TIMES -->
        <div class="content-top">Total times</div>
        <div class="content-middle">{{ this.workingtimes.length }}</div>
      </div>
      <div class="content-main">

        <!-- COMPONENT TOTAL TIMES -->
        <div class="content-top">Yesterday you took</div>
        <div class="seedBreak"> {{ this.rolebreaktimer }} breaks</div>
        <div class="content-top">for a duration of </div>
        <div class="seedBreak">{{ this.rolebreakduration }}s</div>


      </div>



    </div>
  </div>
</template>
<script>

import serviceUser from "../../services/user/service.user";
import serviceWorkingtimes from "../../services/workingtimes/service.workingTimes";
import serviceClocks from "../../services/clock/service.clocks";
import utils_dateformat from "../../utils/utils.dateformatter";
import serviceTeam from "../../services/teams/service.teams";

export default {
  name: "Home",
  data() {
    return {
      users: [],
      usersG: [],
      workingtimes: [],
      isActive: false,
    };
  },
  methods: {
    breaktimerget() {
      this.rolebreaktimer = localStorage.getItem('breakNum');
      this.rolebreakduration = localStorage.getItem('breakDuration');
    },
    // Get all users
    async getAllUsers() {
      await serviceUser
        .getAllUsers()
        .then((response) => {
          console.log(this.$store.state);
          this.users = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async getTeamById() {
      await serviceTeam
        .getTeamById(1)
        .then((response) => {
          const res = response.data.data;
          this.usersG = Object.keys(res).length;
          console.log(this.usersG, "usersG");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // Get all working times
    async getAllWorkingTimes() {
      await serviceWorkingtimes
        .getAllWorkingTimes()
        .then((response) => {
          this.workingtimes = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  // Get current user from store
  computed: {
    currentUser() {
      return this.$store.getters.getCurrentUser;
    },
  },
  mounted() {
    this.getAllUsers();
    this.getAllWorkingTimes();
    this.getTeamById();
    this.breaktimerget();
  },
};
</script>

<style scoped>
.home-main {
  width: 90%;
  background-color: #171a21;
  padding: 50px;
  height: 30%;
}
.seedBreak{
  font-weight: 500;
  font-size: 30px;
  height: 15px;
}
.home-top {
  display: flex;
  flex-direction: row;
  width: 100%;
}
.home-left {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.title {
  font-size: 32px;
  color: #fff;
}
.text {
  font-size: 16px;
  color: #929292;
}
.home-content {
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 50px;
  margin-left: 5%;
}
.content-main:nth-child(1) {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #292e39;
  width: 210px;
  height: 140px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  color: #d7ba8b;
  padding: 20px;
}
.content-top {
  font-size: 16px;
  height: 5px;
}
.content-main:nth-child(2),.content-main:nth-child(3) {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #d7ba8b;
  width: 210px;
  height: 140px;
  color: #292e39;
  padding: 20px;
}
.content-main:nth-child(3) {
  background-color: #292e39;
  color: #d7ba8b;
}
.content-main:nth-child(4) {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #d7ba8b;
  width: 210px;
  height: 140px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  color: #292e39;
  padding: 0 20px 20px 20px;
}
.content-main:nth-child(4) .content-middle {
  font-size: 17px;
}
.content-middle {
  font-size: 40px;

}
@media screen and (max-width: 1160px) {
  .home-main {
    width: 90%;
    padding: 20px 0;
    height: 25%;
  }
  .home-content {
    margin-left: 0px;
  }
}
@media screen and (max-width: 860px) {
  .home-main {
    width: 90%;
    padding: 20px 0;
    height: 17%;
  }
  .home-content {
    margin-left: 0px;
  }
}
</style>