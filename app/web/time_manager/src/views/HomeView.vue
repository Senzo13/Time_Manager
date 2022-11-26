<script>
import NavbarVue from "../components/Navbar/Navbar.vue";
import Home from "../components/Home/Home.vue";
import WTByUser from "../components/Chart/WTByUser.vue";
import AverageChart from "../components/Chart/AverageChart.vue";
import SearchMyUser from "../components/Chart/SearchMyUser.vue";


export default {
  name: "HomeView",
  components: {
    NavbarVue,
    Home,
    WTByUser,
    AverageChart,
    SearchMyUser,
  },
  computed: {
    currentUser() {
      return this.$store.getters.getCurrentUser;
    },
  },
  methods:{
    logout(){
      this.$store.getters.getCurrentUser;
    }
  },
  mounted() {
    this.logout()
    console.log(this.currentUser.role, "currentUser");
  },
}
  

</script>

<template>
  <main>
    <NavbarVue />
    <div class="overview">
      <Home />
      <div class="charts">
        <div class="chartWT">
          <WTByUser />
        </div>
        <div class="managerChart" v-if="this.currentUser.role != 'Users'">

          <div class="chartColumn">
            <SearchMyUser />
          </div>
          <div class="chartClocks">
            <AverageChart />
          </div>
        </div>

      </div>

    </div>
  </main>
</template>


<style scoped>
@import '../components/Chart/chart.css';


main {
  display: flex;
  flex-direction: row;
  background-color: #171a21;
}

.overview {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
}

.chart {
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@media screen and (max-width: 1160px) {
  .overview{
    width:75%;
  }
}
  @media screen and (max-width: 850px) {
  .overview{
    width:68%;
  }
}

</style>
