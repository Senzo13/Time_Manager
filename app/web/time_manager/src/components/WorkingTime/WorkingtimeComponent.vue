<template>
  <div class="workingtime">
    <SuccessSnackBar :message="this.message" :isActive="this.isActive" />
    <div class="workingtime-header">
      <div class="workingtime-goback">
        <BIconChevronLeft @click="goBack()" class="workingtime-goback-icon" />
        <p>Back</p>
      </div>
      <div class="workingtime-header-content">
        <p class="workingtime-header-title">Working Time</p>
        <p class="workingtime-header-text">
          Your working time, you can edit and delete.
        </p>
      </div>
    </div>
    <div class="workingtime-body">
      <div class="workingtime-body-top">
        <button @click="deleteWorkingTime" class="workingtime-body-top-delete">
          Delete
        </button>
      </div>
      <div class="workingtime-body-middle">
        <div class="workingtime-form-box">
          <label for="start" class="workingtime-label"
            >Start Working time</label
          >

          <Datepicker
            v-model="this.workingtime.start"
            class="workingtime-datepicker"
          />
        </div>
        <div class="workingtime-form-box">
          <label for="end" class="workingtime-label">End Working time</label>
          <Datepicker
            v-model="this.workingtime.end"
            class="workingtime-datepicker"
          />
        </div>
        <div class="workingtime-form-box">
          <label for="list" class="workingtime-label">Choose a User</label>
          <select
            name="user"
            id="users-select"
            class="workingtime-select"
            @change="handleChange"
            :placeholder="this.currentUser.username"
          >
            <option
              v-for="user in users"
              :value="user.id"
              class="workingtime-option"
            >
              {{ user.username }}
            </option>
          </select>
        </div>
      </div>
      <div class="workingtime-body-footer">
        <button class="workingtime-body-top-cancel" @click="goBack">
          Cancel
        </button>
        <button class="workingtime-body-top-edit" @click="updateWorkingTime">
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import serviceWorkingTimes from "../../services/workingtimes/service.workingTimes";
import serviceUser from "../../services/user/service.user";
import moment from "moment";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import SuccessSnackBar from "../SnackBar/success.vue";
import ErrorSnackBar from "../SnackBar/error.vue";

export default {
  name: "WorkingtimeComponent",
  components: {
    Datepicker,
    SuccessSnackBar,
    ErrorSnackBar,
  },
  data() {
    return {
      workingtime: {},
      users: [],
      user: {},
      workingtimes: {},
      message: "",
      isActive: false,
    };
  },
  methods: {
    getWorkingTime() {
      serviceWorkingTimes
        .getWorkingTimeWithId(this.$route.params.id)
        .then((response) => {
          this.workingtime = response.data.data;
        })
        .then(() => {
          const id = this.workingtime.user;
          serviceUser
            .getUserById(id)
            .then((response) => {
              this.user = response.data.data;
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getAllUsers() {
      serviceUser
        .getAllUsers()
        .then((response) => {
          this.users = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteWorkingTime() {
      serviceWorkingTimes
        .deleteWorkingTimesById(this.$route.params.id)
        .then(() => {
          this.$router.push(`/workingtimes`);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateWorkingTime() {
      if (this.workingtime.start != null) {
        const start = moment(
          this.workingtime.start,
          "YYYY/MM/DD-hh-mm-ss"
        ).format("YYYY-MM-DD hh:mm:ss");
        this.workingtime.start = start;
      }

      if (this.workingtime.end != null) {
        const end = moment(this.workingtime.end, "YYYY/MM/DD-hh-mm-ss").format(
          "YYYY-MM-DD hh:mm:ss"
        );
        this.workingtime.end = end;
      }

      delete this.workingtime["id"];

      serviceWorkingTimes
        .updateWorkingTimes(this.workingtime, this.$route.params.id)
        .then((response) => {
          this.isActive = true;
          this.message = "Update success";
          setTimeout(() => {
            this.isActive = false;
          }, 3000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleChange(event) {
      this.workingtime[event.target.name] = event.target.value;
    },
    goBack() {
      this.$router.push(`/workingtimes`);
    },
  },
  created() {
    this.getWorkingTime();
    this.getAllUsers();
  },
  computed: {
    currentUser() {
      return this.$store.getters.getCurrentUser;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Work+Sans&display=swap");
.workingtime {
  width: 100%;
  padding: 50px;
  font-family: "Work Sans", sans-serif;
}

.workingtime-header {
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 2px solid #5f6f90;
  transition: 0.5s;
}

.workingtime-goback {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  color: #fff;
}

.workingtime-goback-icon {
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
}

.workingtime-header-content {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.workingtime-header-title {
  font-size: 40px;
  color: #fff;
  font-weight: bold;
}

/* BODY */

.workingtime-body {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.workingtime-body-top {
  display: flex;
  justify-content: flex-end;
  height: 50px;
}

.workingtime-body-top-delete {
  width: 150px;
  height: 100%;
  background-color: rgb(112, 21, 21);
  border: 2px solid rgb(112, 21, 21);
  border-radius: 10px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  transition: 0.5s;
}

.workingtime-body-top-delete:hover {
  background-color: red;
  border: 2px solid red;
  transition: 0.5s;
}

.workingtime-body-middle {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.workingtime-form-box {
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 20px;
}

.workingtime-label {
  font-size: 16px;
  color: #fff;
}

.workingtime-select {
  width: 100%;
  height: 50px;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  border: 2px solid #5f6f90;
  background-color: #2b3241;
  outline: none;
  font-family: "Work Sans", sans-serif;
  transition: 0.5s;
}

.workingtime-select:focus {
  border: 2px solid #d7ba8b;
  transition: 0.5s;
}

.workingtime-option {
  font-size: 16px;
  color: #929292;
}

.workingtime-datepicker {
  width: 100%;
  height: 50px;
  margin-top: 10px;
  border-bottom: 2px solid #5f6f90;
}

.workingtime-body-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
}

.workingtime-body-top-cancel {
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

.workingtime-body-top-cancel:hover {
  background-color: #3b4251;
  border: 2px solid #5f6f90;
  transition: 0.5s;
}

.workingtime-body-top-edit {
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

.workingtime-body-top-edit:hover {
  background-color: #d7ba8b;
  border: 2px solid #d7ba8b;
  transition: 0.5s;
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
</style>
