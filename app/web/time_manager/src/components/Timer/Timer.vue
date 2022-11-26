<template>

    <!-- <SuccessSnackBar message="You have successfully clocked in" /> -->
    <div v-if="this.modal" class="modal-main">
        <div class="modalClock">
            <p class="modal-title" v-if="!this.isActive">Are you sure to clock ?</p>
            <p class="modal-title" v-else>Are you sure to stop clock ?</p>
            <div class="modal-footerClock timer">
                <button class="modal-buttonClock" v-if="!isActive" @click="toggle(), showModal(), startTimer();">Start
                    my
                    work</button>
                <button class="modal-buttonClock" v-else @click="toggle(), showModal(), stopTimer();">Break my
                    work</button>
                <button class="modal-buttonClock" @click="showModal">Cancel</button>
            </div>
        </div>
    </div>
    <div class="clocking">
        <div class="content-mainClock">

            <!-- COMPONENT CLOCKING -->
            <button id="clock" @click="showModal()">
                <input type="button" id="inpClock" value="Let's go" />
                <div class="timer">
                    <span class="hours">{{ hours }}</span>
                    <span>:</span>
                    <span class="minute">{{ minutes }}</span>
                    <span>:</span>
                    <span class="seconds">{{ seconds }}</span>
                </div>
            </button>
      <!--      <input type="button" value="Go Home" id="reset" @click="toggle(), resetTimer()" />-->
      
      
      
    </div>

      </div>

</template>

<script>
import serviceWorkingtimes from "../../services/workingtimes/service.workingTimes";
import SuccessSnackBar from "../SnackBar/success.vue";
import serviceClocks from "../../services/clock/service.clocks";
import utils_dateformat from "../../utils/utils.dateformatter";
import { SET_WORKINGTIMES } from "../../store/WorkingTime";
import store from "../../store";
import moment from "moment";

const currentWTstore = store.getters.getTime;


export default {
    name: "Timer",
    components: {
        SuccessSnackBar,
    },
    data() {
        return {
            workingtimes: [],
            isActive: false,
            modal: false,
            timer: null,
            totalTime: (0 * 160),
            resetButton: false,
            title: "Working time!",
            edit: false,
            userTime: 0,
            neoDate: "",
            startDateTime: "",
            array: [],
            arrayTimer: "",
            newDate: "",
            reset: {},
            breakTime: "00",
        };
    },
    methods: {
        // DISPLAY MODAL
        showModal() {
            this.modal = !this.modal;
        },

        // TOGGLE CLOCK
        toggle() {
            let elem = document.getElementById("clock");
            let element = document.getElementById("inpClock");
            if (!this.isActive) {
                this.isActive = true;
                element.value = "Clocking";
                elem.style.backgroundColor = "#d7ba8b";
                this.startDateTime = utils_dateformat.formatDate(new Date()).toString();
                this.array.push(this.startDateTime);
                this.arrayTimer = this.array.length-1
                this.numberBreak = window.localStorage.setItem("breakNum", this.arrayTimer);
                if (this.startDateTime === this.array[0] ) {

                    serviceClocks
                        .createClockByUserId(
                            {
                                clocks: {
                                    time: this.startDateTime,
                                    status: true,
                                },
                            },
                            this.currentUser.id
                        )
                        .catch((error) => {
                            console.log("error", error);
                        });
                }
            } else {
                this.isActive = false;
                element.value = "Break";
                elem.style.backgroundColor = "#292e39";
                serviceClocks
                    .getClocksById(this.currentUser.id)
                    .then((response) => {

                        const temp = response.data.data;
                        const result = temp[temp.length - 1];
                        const resultTime = parseInt(moment(result.time).format("YYYYMMDDmm"));
                        this.newDate = parseInt(moment(new Date()).format("YYYYMMDDmm"));
                        if (resultTime < this.newDate) {
                            this.reset = setTimeout(() => {
                                serviceWorkingtimes
                                    .createWorkingTimes(
                                        {
                                            start: result.time,
                                            end: this.neoDate,
                                            duration: `${this.totalTime}`,
                                            break: `${moment.duration(moment(this.neoDate).diff(moment(result.time))).asSeconds() - this.totalTime}`,
                                            
                                        },
                                        this.currentUser.id
                                    )
                                    .then((response) => {
                                        console.log("response", response.data.data);
                                        this.modal = false;
                                        element.value = "See you tomorrow";
                                        document.querySelector(".hours").style.color = "#fff";
                                        document.querySelector(".minute").style.color = "#fff";
                                        document.querySelector(".seconds").style.color = "#fff";
                                        const workingTime = response.data.data;
                                        const workTime = workingTime.duration;
                                        const endT = moment(workingTime.end);
                                        const startT = moment(workingTime.start);
                                        const duration = moment.duration(endT.diff(startT)).asSeconds();
                                        this.breakTime = duration - workTime;
                                        this.dureeBreak = window.localStorage.setItem("breakDuration", this.breakTime);
                                    })
                                    .catch((error) => {
                                        console.log("error", error);
                                    });
                            }, 1000);
                        }

                    })
                    .catch((error) => {
                        console.log("error", error);
                    });
            }
        },

        startTimer() {
            document.querySelector(".hours").style.color = "#4ba84d";
            document.querySelector(".minute").style.color = "#4ba84d";
            document.querySelector(".seconds").style.color = "#4ba84d";
            this.timer = setInterval(() => this.countup(), 1000);
            this.resetButton = true;
        },

        stopTimer() {
            document.querySelector(".hours").style.color = "#ed3636";
            document.querySelector(".minute").style.color = "#ed3636";
            document.querySelector(".seconds").style.color = "#ed3636";
            store.dispatch(SET_WORKINGTIMES, this.totalTime);
            clearInterval(this.timer);
            this.resetButton = true;
            this.timer = null;
            this.neoDate = utils_dateformat.formatDate(new Date()).toString();

        },

        resetTimer() {

            this.resetButton = false;
            this.reset
            this.totalTime = (this.userTime * 30);
            clearInterval(this.timer);
            this.timer = null;
            this.neoDate = utils_dateformat.formatDate(new Date()).toString();
            this.$store.dispatch(SET_WORKINGTIMES, this.totalTime);
            this.newDate = parseInt(moment(new Date()).format("YYYYMMDDmm")) + 6;
            document.querySelector(".hours").style.color = "#fff";
            document.querySelector(".minute").style.color = "#fff";
            document.querySelector(".seconds").style.color = "#fff";

        },

        padTime(time) {
            return  (time < 10 ? '0' : '') + (time && time < 0 ? 0 : '') + time;
        },

        countup() {
            let elem = document.getElementById("clock");
            if (this.totalTime < 5000) {
                this.totalTime++;
                this.$store.dispatch(SET_WORKINGTIMES, {
                    workingTime: currentWTstore,
                });
            } else {
                this.resetTimer();
                this.isActive = false;
                elem.value = "Not clocking";
                elem.style.backgroundColor = "#292e39";
            }
        }

    },

    // Get current user from store
    computed: {
        currentUser() {
            return this.$store.getters.getCurrentUser;
        },
        getTime() {
            return this.$store.getters.getTime;
        },
        hours() {
            const hours = Math.floor(this.totalTime / 3600);
            return this.padTime(hours);
        },
        minutes() {
            const minutes = Math.floor(this.totalTime / 60);
            return this.padTime(minutes);
        },
        seconds() {
            const seconds = this.totalTime - (this.minutes * 60);
            return this.padTime(seconds);
        }
    },
};
</script>

<style>
#clock {
    width: 100%;
    height: 100%;
    cursor: pointer;
    padding: 15px 15px 10px 15px;
    border-radius: 10px;
    background-color: #292e39;
    box-shadow: 0 0 1px 2px rgba(0, 0, 0, 0.3);
    opacity: 0.8;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

}

#inpClock {
    color: white;
    border: none;
    background-color: transparent;
    padding-bottom: 10px;
    font-size: 1rem;
    font-weight: 600;
}

.content-mainClock {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
}
.content-mainClock p{
    position: absolute;
    bottom: 0;
    left: 0;
}

.content-mainClock:hover {
    opacity: 1;
}

/* .timer {
    position: relative;
    bottom: 50px;
} */

.timer span {
    font-weight: 700;
    text-shadow: .5px .5px 0px #292e39;
    color: rgb(201, 201, 201);
}

/* MODAL */
.modal-main {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

.modalClock {
    width: 60vw;
    height: 40vh;
    background-color: #171a21;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 10px 30px rgba(0, 0, 0, 0.3);
    align-items: center;
    justify-content: space-between;
    padding: 7% 5%;
}

.modal-header {
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.modal-buttonClock {
    width: 30%;
    height: 40px;
    border-radius: 15px;
    background-color: #d7ba8b;
    opacity: 0.8;
    color: #2b3241;
    border: none;
    cursor: pointer;
}

.modal-buttonClock:hover {
    opacity: 1;
}

.modal-button span {
    font-size: 1rem;
}

.modal-title {
    font-size: 24px;
    color: #fff;
    display: flex;
}

.modal-footerClock {
    width: 80%;
    height: 10%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
}
</style>

