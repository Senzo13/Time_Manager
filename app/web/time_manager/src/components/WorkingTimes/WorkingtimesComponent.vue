<template>
  <div v-if="this.create" class="modal-main">
    <SnackBarSuccess :isActive="this.isActiveSuccess" :message="this.message" />
    <SnackBarError :isActive="this.isActiveError" :message="this.message" />
    <div class="modal-container">
      <div class="modal-header">
        <div class="modal-header-left">
          <BIconPencilSquare class="modal-header-icon" />
          <p class="modal-title">Create Working Time</p>
        </div>
        <BIconX class="modal-button" @click="handleCreate" />
      </div>
      <div class="modal-content">
        <div class="modal-form-content">
          <label class="modal-label" for="start">Start</label>
          <Datepicker v-model="this.workingtimes.start" class="datepicker" />
        </div>
        <div class="modal-form-content">
          <label class="modal-label" for="end">End</label>
          <Datepicker v-model="this.workingtimes.end" class="datepicker" />
        </div>
      </div>
      <div class="modal-footer">
        <button class="modal-cancel" @click="handleCreate">Cancel</button>
        <button class="modal-create" @click="createWorkingTime">Create</button>
      </div>
    </div>
  </div>
  <div class="workingtimes">
    <!-- HEADER -->
    <div class="workingtimes-top">
      <p class="title">My Working Times</p>
      <p class="text">Here’s your all working times of the moment</p>
    </div>
    <div class="workingtimes-layout">
      <div class="workingtimes-layout-left">
        <BIconKanbanFill class="layout-icons" />
        <p class="workingtimes-layout-text">Your working times space</p>
      </div>
      <div v-if="this.currentUser.role != 'Users'" class="workingtimes-button-box">
        <button @click="handleCreate()" class="workingtime-create">
          <BIconPlusLg class="workingtimes-create-icons" />Create new Working
          Time
        </button>
      </div>
    </div>

    <!-- WORKINGTIMES GRID -->
    <div class="workingtimes-middle">
      <div class="tbl-header">
        <table cellpadding="0" cellspacing="0" border="0">
          <thead>
            <tr>
              <th><BIconListOl class="head_line" /></th>
              <th>Start</th>
              <th>End</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="tbl-content">
        <table cellpadding="0" cellspacing="0" border="0">
          <tbody>
            <tr
              v-for="item in workingtimes"
              @click="handleClickedRow(item.id)"
              :key="item.id"
            >
              <td>{{ item.id }}</td>
              <td>{{ item.start }}</td>
              <td>{{ item.end }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="tbl-footer"></div>
    </div>
  </div>
</template>

<script>
// IMPORTS
import serviceWorkingTimes from "../../services/workingtimes/service.workingTimes";
import moment from "moment";
import { BIconListOl } from "bootstrap-icons-vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import SnackBarSuccess from "../SnackBar/success.vue";
import SnackBarError from "../SnackBar/error.vue";

export default {
  name: "WorkingtimesComponent",
  components: {
    BIconListOl,
    Datepicker,
    SnackBarSuccess,
    SnackBarError,
  },
  data() {
    return {
      workingtimes: [],
      isActiveSuccess: false,
      isActiveError: false,
      create: false,
      message: "",
    };
  },
  methods: {
    getAllWorkingTimesUser() {
      serviceWorkingTimes
        .getAllWorkingTimesUser(
          "?start=2019-10-25T13:08:11Z&end=2045-10-25T20:08:11Z",
          this.currentUser.id
        )
        .then((response) => {
          response.data.data.forEach((element) => {
            element.start = moment(element.start).format("DD/MM/YYYY HH:mm");
            element.end = moment(element.end).format("DD/MM/YYYY HH:mm");
          });
          this.workingtimes = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleCreate() {
      this.create = !this.create;
    },
    handleClickedRow(id) {
      this.$router.push(`/workingtime/${id}`);
    },
    createWorkingTime() {
      if (this.workingtimes.start != null) {
        const start = moment(
          this.workingtimes.start,
          "YYYY/MM/DD-hh-mm-ss"
        ).format("YYYY-MM-DD hh:mm:ss");
        this.workingtimes.start = start;
      }

      if (this.workingtimes.end != null) {
        const end = moment(this.workingtimes.end, "YYYY/MM/DD-hh-mm-ss").format(
          "YYYY-MM-DD hh:mm:ss"
        );
        this.workingtimes.end = end;
      }

      serviceWorkingTimes
        .createWorkingTimes(this.workingtimes, this.currentUser.id)
        .then((response) => {
          console.log(response);
          this.isActiveSuccess = true;
          this.message = "Working Time added successfully";
          setTimeout(() => {
            this.isActiveSuccess = false;
            this.create = false;
          }, 2000);
        })
        .catch((error) => {
          this.isActiveError = true;
          this.message = "Cannot add Working Time";
          setTimeout(() => {
            this.isActiveError = false;
            this.create = false;
          }, 2000);
          console.log(error);
        });
    },
  },
  created() {
    this.getAllWorkingTimesUser();
  },
  computed: {
    currentUser() {
      return this.$store.getters.getCurrentUser;
    },
  },
};
</script>

<style scoped>
.head_line {
  color: #fff;
  font-size: 1.5rem;
  margin-left: 1rem;
}

.workingtimes {
  width: 100%;
  padding: 50px;
}

.title {
  font-size: 40px;
  font-weight: 600;
  color: #fff;
}

.text {
  font-size: 16px;
  color: #929292;
}

.workingtimes-middle {
  width: 100%;
  margin-top: 20px;
}
.workingtime-create {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 300px;
  height: 40px;
  background-color: #2b3241;
  border: none;
  border-radius: 10px;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 1px;
  cursor: pointer;
  outline: none;
  transition: 0.5s;
  z-index: 1;
  margin-top: 50px;
}

/* SCROLL BAR */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #2b3241;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #3b4251;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #4b5261;
}

.workingtimes-create-icons {
  font-size: 20px;
  color: #fff;
}

table {
  width: 100%;
  table-layout: fixed;
}

.tbl-header {
  background-color: #2b3241;
}

.tbl-content {
  height: 500px;
  overflow-x: auto;
  border: 1px solid #292e39;
}

th {
  padding: 20px 15px;
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  color: #fff;
  text-transform: uppercase;
}

td {
  padding: 15px;
  text-align: left;
  vertical-align: middle;
  font-weight: 300;
  font-size: 16px;
  color: #fff;
  border-bottom: solid 1px rgba(255, 255, 255, 0.1);
}

tr:hover {
  background-color: #2b3241;
  transition: 0.3s;
  cursor: pointer;
}

@media screen and (max-width: 900px) {
  .workingtimes {
    height: 80%;
    margin-top: 70px;
  }

  .workingtime {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .workingtimes-middle {
    height: 80%;
  }

  .tbl-content {
    height: 90%;
  }

  .workingtime .right {
    display: none;
  }

  .workingtime .left {
    width: 80%;
  }
}
.workingtimes-layout {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
}

.workingtimes-layout-left {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 20px;
}

.workingtimes-layout-text {
  font-size: 18px;
  font-weight: 400;
  color: #ffffff;
}

.layout-icons {
  font-size: 25px;
  color: #d7ba8b;
}

/* MODAL */
.modal-main {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-container {
  width: 500px;
  background-color: #2b3241;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  gap: 50px;
}

.modal-header {
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #5f6f90;
}

.modal-header-left {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.modal-header-icon {
  font-size: 20px;
  color: #d7ba8b;
  margin: 0;
}

.modal-button {
  font-size: 30px;
  color: #d7ba8b;
  cursor: pointer;
}

.modal-title {
  font-size: 18px;
  color: #fff;
}

.modal-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.modal-form-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.datepicker {
  width: 100%;
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 10px;
  border-bottom: 2px solid #5f6f90;
}

.modal-label {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
}

.modal-cancel {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 40px;
  background-color: #2b3241;
  border: 2px solid #5f6f90;
  border-radius: 10px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  transition: 0.5s;
}

.modal-cancel:hover {
  background-color: #3b4251;
  border: 2px solid #5f6f90;
  transition: 0.5s;
}

.modal-create {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 40px;
  background-color: #5f6f90;
  border: 2px solid #5f6f90;
  border-radius: 10px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  transition: 0.5s;
}

.modal-create:hover {
  background-color: #d7ba8b;
  border: 2px solid #d7ba8b;
  transition: 0.5s;
}
</style>
