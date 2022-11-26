<template>

  <div class="filter">
    <input type="button" value="week" @click="clickWeek" id="week">
    <input type="button" value="month" @click="clickMonth" id="month">
    <input type="button" value="year" @click="clickYear" id="year">
  </div>
  <div id="chart">
    <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>
  <div>{{ this.result }}</div>

</template>

<style>

.filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10%;
    width: 35%;
}
.filter input {
    width: 50%;
    height: 80%;
    background-color: #292e39;
    border: none;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
}
.filter input:nth-child(2){
    background-color: #d7ba8b;
    color: #292e39;

}
.apexcharts-tooltip {
    color: #d7ba8b;
    background: #292e39;
    font-size: 1rem;
}
@media screen and (max-width: 1090px) {
    .filter {
        width: 40%;
    }
    
}
@media screen and (max-width: 850px) {
  .chartWT{
    width:88%;
  }
  

}
</style>

<script>
import moment from "moment";
import service from "../../services/workingtimes/service.workingTimes";
import { calculWT, calculAverage } from "../../utils/chart";

export default {
  
  name: 'BarChart',
  data() {
    return {
      series: [
        {
          name: "Working Time",
          type: "bar",
          data: [],
        },
        {
          name: "Working Time",
          type: "area",
          data: [],
        },


      ],
      

      chartOptions: {
        chart: {
          type: "bar",
          height: 550,
        },
        plotOptions: {
          bar: {
            horizontal: false,
          }

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
        markers: {
          color: "#dd3e3e"
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
          fillColor: "#dd3e3e",
        },

        yaxis: {
          title: {
            text: "Working Time",
          },
          label: {
            formatter: function (val) {
              return val.toFixed(0) + " H";
            },
          },
          tickAmount: 6,
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ['Actual', 'Expected'],
          markers: {
            fillColors: ['#78c36c', '#a8a8a8']
          }


        },
        tooltip: {
           theme: false,
        },
      },
      workingtimesByUser: [],
      weekBtn: true,
      monthBtn: false,
      yearBtn: false,
      averageAllUsers: [],
      averageByDay: [],
      result: "",
      btn: "",
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.getCurrentUser;
    },
  },
  methods: {

    async getWTByUserId() {
      // await this.getAverageForUsers();
      service
        .getAllWorkingTimesUser(
          "?start=2019-10-25T13:08:11Z&end=2045-10-25T20:08:11Z",
          this.currentUser.id
        )
        .then((response) => {
          this.workingtimesByUser = response.data.data;
          // console.log(this.workingtimesByUser);
          const wtByUser = this.workingtimesByUser.sort((a, b) => {
            return new Date(a.start) - new Date(b.start);
          });
          // console.log(wtByUser);
          let WTUser = {};
          if (this.yearBtn === true) {
            const wtByWeek = wtByUser.filter((wt) => {
              return moment(wt.start).isBetween(moment().startOf('year'), moment().endOf('year'))
            });
            WTUser = wtByWeek.map((element) => {
              return {
                ...element,
                day: moment(element.start).format("MMMM - YYYY"),
                wt: calculWT(element),
              };
            });
            // group day by month
            console.log(curet, 'curet22222222222222222222222222222222222');
            this.btn = document.getElementById("year").value;
          } else if (this.monthBtn === true) {
            const wtByWeek = wtByUser.filter((wt) => {
              return moment(wt.start).isBetween(moment().startOf('month'), moment().endOf('month'))
            });
            WTUser = wtByWeek.map((element) => {
              return {
                ...element,
                day: moment(element.start).format("DD - MMMM"),
                wt: calculWT(element),
              };
            });
            this.btn = document.getElementById("month").value;
          } else {
            const wtByWeek = wtByUser.filter((wt) => {
              return moment(wt.start).isBetween(moment().startOf('week'), moment().endOf('week'))
            })
            WTUser = wtByWeek.map((element) => {
              return {
                ...element,
                day: moment(element.start).format("dddd"),
                wt: calculWT(element),
              };
            });
            this.btn = document.getElementById("week").value;
          };
          // console.log(WTUser, "WTUser");
          const totalminutes = WTUser.map((a) => {
            return a['wt'];
          })
          // console.log(totalminutes, "totalminutes");
          // console.log("totalminutes", totalminutes);
          const splitTime = totalminutes.map((b) => {
            return moment.duration(b, 'minutes').asMinutes();
          })
          // console.log("splitTime", splitTime);
          const totalminutesvalues = splitTime.reduce((a, b) => a + b, 0);
          // console.log("totalminutesvalues", totalminutesvalues);
          const hours = Math.floor(totalminutesvalues / 60);
          const minutes = (totalminutesvalues % 60 < 10 ? '0' : '') + totalminutesvalues % 60;
          this.result = `${hours} H ${minutes} min worked this ${this.btn}`;
          // console.log(result, "result");

          let wtGraphDaily = WTUser.map(({ day, wt }) => {
            return {
              x: day,
              y: wt,
              fillolor: "#fff",

              goals: [
                {
                  name: "Expected",
                  value: 7,
                  strokeHeight: 5,
                  colors: ["#d6b888"],
                },

              ],
            };
          });



          this.series = [
            {
              name: "Actual",
              data: wtGraphDaily,
              type: "bar",
            },
            // {
            //   name: "hello",
            //   type: "line",
            //   data: this.averageByDay,
            // },

          ];
          // console.log(this.series, "seriesdddddddddd");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAverageForUsers() {
      service
        .getAllWorkingTimes()
        .then((response) => {
          // console.log(this.workingtimesByUser, "thisworkingtimesByUser");
          if (response.status === 200) {
            // console.log("response.data.data", response.data.data);
            this.averageAllUsers = response.data.data.map((element) => {
              return {
                ...element,
                day: moment(element.start).format("dddd"),
                wt: calculAverage(element),
              };
            });
            // console.log(this.averageAllUsers, "this.averageAllUsers");
            const byDay = this.averageAllUsers.reduce((acc, a) => {
              const { day, wt } = a;
              if (!acc[day]) {
                acc[day] = {
                  day,
                  wt: 0,
                  count: 0,
                };
              };
              acc[day].wt += wt;
              acc[day].count++;
              return acc;
            }, {});
            // console.log(byDay, "byDay");
            const average = Object.values(byDay).map((a) => {
              return {
                ...a,
                average: Math.floor((a.wt / a.count) / 60),
              };
            });
            // console.log(average, "average fdgrdsytsreysetrhyestryhrtuhrthydujvgjfdghuijytgujydtruyt");
            this.averageByDay = average.map((i) => {
              return {
                x: i.day,
                y: i.average,
              };
            })
            // console.log(this.averageByDay, "averageByDayrftgtdsfytrdyghd");
          }
        });
    },
    clickWeek() {
      this.weekBtn = true;
      this.monthBtn = false;
      this.yearBtn = false;
      this.getWTByUserId();
    },
    clickMonth() {
      this.weekBtn = false;
      this.monthBtn = true;
      this.yearBtn = false;
      this.getWTByUserId();
    },
    clickYear() {
      this.weekBtn = false;
      this.monthBtn = false;
      this.yearBtn = true;
      this.getWTByUserId();
    },
  },
  mounted() {
    this.getWTByUserId();
    this.getAverageForUsers();
  },  
    
  }
  
    
    
    
    //     series: [{
    //       name: 'Working Time',
    //       data: [],
    //     }, {
    //       name: 'Break Time',
    //       data: [],
    //     }],
    //     chartOptions: {
    //       chart: {
    //         type: 'bar',
    //         height: 350,
    //         stacked: true,
    //         toolbar: {
    //           show: true
    //         },
    //         zoom: {
    //           enabled: true
    //         }
    //       },
    //       colors: [
    //         function ({ value }) {
    //           if (value < 7) {
    //             return "#dd3e3e";
    //           } else {
    //             return "#5bdd3e";
    //           }
    //         }
    //       ],
    //       responsive: [{
    //         breakpoint: 480,
    //         options: {
    //           legend: {
    //             position: 'bottom',
    //             offsetX: -10,
    //             offsetY: 0
    //           }
    //         }
    //       }],
    //       plotOptions: {
    //         bar: {
    //           horizontal: false,
    //           borderRadius: 10,
    //           dataLabels: {
    //             total: {
    //               enabled: true,
    //               style: {
    //                 fontSize: '13px',
    //                 fontWeight: 900
    //               }
    //             }
    //           }
    //         },
    //       },
    //       xaxis: {
    //         type: 'datetime',
    //         categories: [],
    //         legend: {
    //           position: 'right',
    //           offsetY: 40
    //         },
    //         fill: {
    //           opacity: 1
    //         }
    //       },
    //     },
    //     weekBtn: true,
    //     monthBtn: false,
    //     yearBtn: false,
    //     averageAllUsers: [],
    //     workingtimesByUser: [],
    //     averageByDay: [],
    //     userInTeam: "",
    //     currentTeam: "",
    //     resultArr: [],
    //     result: "",
    //     btn: "",
    //     usernameForWT: "",
    //   }
    // },
    // computed: {
    //   wtResult() {
    //     return this.$store.state.workingTimes
    //   },
    //   currentUser() {
    //     return this.$store.getters.getCurrentUser
    //   },
    // },
    // methods: {
  
    //   async getWTByUserId() {
    //     service
    //       .getAllWorkingTimesUser(
    //         "?start=2019-10-25T13:08:11Z&end=2045-10-25T20:08:11Z",
    //         this.currentUser.id
    //       )
    //       .then((response) => {
    //         this.workingtimesByUser = response.data.data;
    //         console.log(this.workingtimesByUser);
    //         let WTUser = {};
    //         if (this.yearBtn === true) {
    //           const wtByWeek = this.workingtimesByUser.filter((wt) => {
    //             return moment(wt.start).isBetween(moment().startOf('year'), moment().endOf('year'))
    //           });
    //           WTUser = wtByWeek.map((element) => {
    //             return {
    //               ...element,
    //               day: moment(element.start).format("MM - YYYY"),
    //               wt: calculWT(element),
    //             };
    //           });
  
    //           this.btn = document.getElementById("year").value;
    //         } else if (this.monthBtn === true) {
    //           const wtByWeek = this.workingtimesByUser.filter((wt) => {
    //             return moment(wt.start).isBetween(moment().startOf('month'), moment().endOf('month'))
    //           });
  
    //           WTUser = wtByWeek.map((element) => {
    //             return {
    //               ...element,
    //               day: moment(element.start).format("Do - MM -YYYY "),
    //               wt: calculWT(element),
    //             };
    //           });
    //           // console.log(WTUser, "wtBymonth");
    //           this.btn = document.getElementById("month").value;
    //         } else {
    //           const wtByWeek = this.workingtimesByUser.filter((wt) => {
    //             return moment(wt.start).isBetween(moment().startOf('week'), moment().endOf('week'))
    //           })
  
    //           WTUser = wtByWeek.map((element) => {
    //             return {
    //               ...element,
    //               day: moment(element.start).format("dddd"),
    //               wt: calculWT(element),
    //             };
    //           });
    //           this.btn = document.getElementById("week").value;
    //         };
    //         let dAndB = WTUser.map((element) => {
    //           return {
    //             duration: (element.duration / 3600).toFixed(0),
    //             breaked: (element.break / 3600).toFixed(0),
    //             day: element.day,
  
    //           };
    //         });
  
    //         let wtGraphDaily = dAndB.map(({ duration, day }) => {
    //           return {
    //             x: day,
    //             y: duration,
    //           };
    //         });
    //         let breakGraphDaily = dAndB.map(({ breaked, day }) => {
    //           return {
    //             x: day,
    //             y: breaked,
    //           };
    //         });
    //         this.series = [
    //           {
    //             name: "Working Times",
    //             data: wtGraphDaily,
    //             type: "bar",
  
    //           },
    //           {
    //             name: "Break",
    //             data: breakGraphDaily,
    //             type: "bar",
    //           },
    //         ];
    //         console.log(wtGraphDaily, "wtGraphDaily");
    //         console.log(this.series, "series");
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   },
  
  
  
    //   clickWeek() {
    //     this.weekBtn = true;
    //     this.monthBtn = false;
    //     this.yearBtn = false;
    //     this.getWTByUserId();
    //   },
    //   clickMonth() {
    //     this.weekBtn = false;
    //     this.monthBtn = true;
    //     this.yearBtn = false;
    //     this.getWTByUserId();
    //   },
    //   clickYear() {
    //     this.weekBtn = false;
    //     this.monthBtn = false;
    //     this.yearBtn = true;
    //     this.getWTByUserId();
    //   },
    // },
    // mounted() {
    //   this.getWTByUserId();
    //   this.getUserInTeam();
    // },

// };


</script>