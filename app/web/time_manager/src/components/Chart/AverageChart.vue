<template>
  <div class="donutChart">
    <div class="titleDonut">
      <h2>Working Time by User of {{ this.nameTeam }}</h2>
      <div id="chart">
        <apexchart type="donut" heigth="500px" width="330px" :options="donutChartOptions" :series="donutSeries"></apexchart>
      </div>
    </div>
  </div>
</template>

<style scoped>
.titleDonut{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}
.titleDonut h2{
    font-size: 1.2rem;
    margin-bottom: 50px;
    margin-left: 0;
    align-self: flex-start;
}
.titleDonut #chart{
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

</style>
<script>

import serviceTeams from "../../services/teams/service.teams";
import serviceUser from "../../services/user/service.user";



export default {
  name: "AverageChart",
  data() {
    return {
      teamWorkingtimes: {},
      donutSeries: [],
      donutChartOptions: {
        chart: {
          width: 380,
        },
        labels: [],
        
      },
      dataLabels: {
        fomatter: function (val, opts) {
          const name = opts.w.config.labels[opts.seriesIndex];
          return [name, val.toFixed(0) + "%"];
        },
      },
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "%";
          },
        },

      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    }

  },
  computed: {
    currentUser() {
      return this.$store.getters.getCurrentUser
    },
  },
  methods: {

    async getWTByUser() {
      serviceUser
        .getUserById(this.currentUser.id)
        .then((response) => {
          this.currentTeam = response.data.data;

          const teamId = this.currentTeam.team_id
          serviceTeams
            .getWTUsersInTeam(teamId, "workingtimes")
            .then((response) => {
              this.teamWorkingtimes = response.data.data;
              const usersWTs = this.teamWorkingtimes.map((wt) => {
                return {
                  name: wt.user,
                  duration: (wt.duration / 3600).toFixed(0),
                }
              })
              const durationOfAllUsers = usersWTs.filter((wt) => {
                return {
                  duration: wt.duration,
                }
              })
              const allDurationsArray = durationOfAllUsers.map((wt) => {
                return wt.duration
              })
              let sumOfAlldurations = 0;
              for (let i = 0; i < allDurationsArray.length; i++) {
                sumOfAlldurations += parseInt(allDurationsArray[i]);
              }
              const usersWTsPercentage = usersWTs.map((wt) => {
                return {
                  name: wt.name,
                  duration: (sumOfAlldurations * 100).toFixed(0),
                }
              })
              
              const unique = usersWTsPercentage.reduce((acc, el) => {
                (acc[el.name] = acc[el.name] || []).push(el.duration);
                return acc
              }, {})
              const sumofunique = Object.keys(unique).map((key) => {
                return {
                  name: key,
                  duration: unique[key].reduce((a, b) => parseInt(a) + parseInt(b), 0)
                }
              })
              let sumOfAllUsersWts = 0;
              for (let i = 0; i < sumofunique.length; i++) {
                sumOfAllUsersWts += parseInt(sumofunique[i].duration);
              }
              const usersWTsPercentage2 = sumofunique.map((wt) => {
                return {
                  name: wt.name,
                  duration: (wt.duration / sumOfAllUsersWts * 100),
                }
              })
              const usersWTsPercentage3 = usersWTsPercentage2.map((wt) => {
                return {
                  x: parseInt(wt.duration.toFixed(0)),
                  y: wt.name,
                }
              })
              this.donutSeries = usersWTsPercentage3.map((wt) => {
                return wt.x
              })
              
              this.donutChartOptions = {
                labels: usersWTsPercentage2.map((wt) => {
                return wt.name
              })
            }



            })
        })
    },

    async getTeam() {
      serviceTeams
        .getAllTeams()
          .then((response) => {
            this.teams = response.data.data;
            console.log(this.teams, "teams");
            console.log(this.currentTeam, "currentTeam");
            const nameTeam = this.teams.find((team) => {
              return team.id === this.currentTeam.team_id;
            });
            this.nameTeam = nameTeam.name;
            console.log(nameTeam, "nameTeam");
            console.log(this.nameTeam, "nameTeam");
          })
        
     
    },

  },

  mounted() {
    this.getWTByUser();
    this.getTeam();
  },
}

</script>


