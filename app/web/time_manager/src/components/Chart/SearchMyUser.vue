<template>
  <div class="areaChart">
    <form @submit.prevent="getUserInTeam">
      <input type="text" id="getWTUserTeam" ref="userwt" placeholder="User ID">
      <input type="submit" id="submit" value="🔎">
    </form>
    <div id="chart">
      <apexchart type="area" height="300" width="100%" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>

</template>

<style>
.areaChart {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
}

.areaChart form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}

.areaChart #chart {
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.areaChart #chart .vue-apexcharts {
  width: 100%;
}

.areaChart #chart .vue-apexcharts #apexchartsrhjelkyo {
  width: 100%;
}

.areaChart form input:nth-child(1) {
  width: 150px;
  height: 30px;
  border-radius: 5px 0 0 5px;
  border: 1px solid #171a21;
  background-color: #292e39;
}

.areaChart form input:nth-child(2) {
  height: 30px;
  border-radius: 0 5px 5px 0;
  background-color: #d7ba8b;
}

.areaChart form input::placeholder {
  color: white;
  font-size: .9rem;
  font-weight: 500;
  padding-left: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
}

.areaChart .apexcharts-tooltip {
    color: #d7ba8b;
    background: #292e39 !important;
    font-size: 1rem;
    text-shadow: 0 0 2px#292e39;
}
</style>

<script>
import moment from "moment";
import serviceTeams from "../../services/teams/service.teams";
import serviceUser from "../../services/user/service.user";

export default {
  data() {
    return {
      series: [{
        name: 'Working times of user in team',
        data: []
      }],
      chartOptions: {
        chart: {
          height: 350,
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
            animateGradually: {
              enabled: true,
              delay: 150
            },
            dynamicAnimation: {
              enabled: true,
              speed: 350
            }


          },

        },
        colors: [
          function ({ value }) {
            if (value < 7) {
              return "#dd3e3e";
            } else {
              return "#5bdd3e";
            }
          }
        ],
        ooltip: {
           theme: false,
        },

        dataLabels: {
          formatter: function (val, opt) {
            const goals =
              opt.w.config.series[opt.seriesIndex].data[opt.dataPointIndex]
                .goals
            moment(val).format("HH:mm")
            if (goals && goals.length) {
              return `${val} H`
            }
            return val

          },
          
        },
        stroke: {
          curve: 'smooth'
        },
        xaxis: {
          overwriteCategories: true,
        },
        
      },
      averageAllUsers: [],
      workingtimesByUser: [],
      averageByDay: [],
      userInTeam: "",
      currentTeam: "",
      resultArr: [],
      result: "",
      btn: "",
      usernameForWT: "",
    }
  },
  computed: {
    wtResult() {
      return this.$store.state.workingTimes
    },
    currentUser() {
      return this.$store.getters.getCurrentUser
    },
  },
  methods: {
    async getUserInTeam() {
      serviceUser
        .getUserById(this.currentUser.id)

        .then((response) => {
          console.log(response.data.data, "response.data.data");
          this.currentTeam = response.data.data.team_id;
          this.userInTeam = response.data.data.id;
          console.log(this.userInTeam, "userInTeam");
          serviceTeams
            .getUsersInTeam(this.currentTeam)
            .then((response) => {
              const UsersTeam = response.data.data;
              const idUsers = UsersTeam.map((element) => {
                return element.id;
              });
              console.log(idUsers, "idUsers");
              serviceTeams
                .getWTUsersInTeam(this.currentTeam, "workingtimes")
                .then((response) => {
                  let teamUser = response.data.data;
                  const usernameForWT = this.$refs.userwt.value;
                  for (let index = 0; index < idUsers.length; index++) {
                    const element = idUsers[index];
                    console.log(element, "element");
                    console.log(parseInt(usernameForWT), "this.usernameForWT");
                    if (usernameForWT == element) {
                      console.log("ok");
                      //   console.log(element, "idUsers[index]");
                      this.resultArr = teamUser.filter((element) => {
                        console.log(element.user, "elementfdgfdsgdsg");
                        return element.user == usernameForWT;
                      });
                      console.log(this.resultArr, "result");

                      //     return idUsers.includes(element.user);
                      //   });
                      // console.log(this.result, "result");

                    }
                    const wtByMonth = this.resultArr.filter((wt) => {
                      return moment(wt.start).isBetween(moment().startOf('month'), moment().endOf('month'))
                    })
                    console.log(wtByMonth, "wtByMonth");

                    const addFD = wtByMonth.map((element) => {
                      return {
                        ...element,
                        day: moment(element.start).format("d/M/YYYY"),
                      };
                    });
                    console.log(addFD, "addFD");
                    let dAndB = addFD.map((element) => {
                      return {
                        duration: (element.duration / 3600).toFixed(0),
                        breaked: (element.break / 3600).toFixed(0),
                        day: element.day,
                      };
                    });
                    console.log(dAndB, "dAndB");
                    let wtGraphDaily = dAndB.map(({ duration, day }) => {
                      return {
                        x: day,
                        y: duration,
                      };
                    });
                    let breakGraphDaily = dAndB.map(({ breaked, day }) => {
                      return {
                        x: day,
                        y: breaked,
                      };
                    });
                    this.series = [
                      {
                        name: "Working Times",
                        data: wtGraphDaily,
                        type: "bar",

                      },
                      {
                        name: "Break",
                        data: breakGraphDaily,
                        type: "bar",
                      },
                    ];
                    this.xaxis = {
                      overwriteCategories: true,
                      categories: wtGraphDaily.map((element) => {
                        return element.x;
                      }),
                    };
                  }


                })
                .catch((error) => {
                  console.log(error);
                });
            })
        })
        .catch((error) => {
          console.log(error);
        });
    },
    mounted() {
      this.getUserInTeam();
    },
  }
}
</script>


