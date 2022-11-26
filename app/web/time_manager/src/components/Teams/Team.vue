<template>
  <div class="team-main">
    <SuccessSnackBar :message="this.message" :isActive="this.isActiveSuccess" />
    <ErrorSnackBar :message="this.message" :isActive="this.isActiveError" />
    <div class="team-header">
      <div class="team-goback">
        <BIconChevronLeft @click="goBack()" class="team-goback-icon" />
        <p>Back</p>
      </div>
      <div class="team-header-content">
        <p>{{ this.team.name }}</p>
        <div class="team-header-content-right">
          <div class="team-header-content-right-members">
            <p class="teams-header-subtext">Manager</p>
            <p class="teams-header-title">{{ this.manager.username }}</p>
          </div>
          <div class="team-header-content-right-members">
            <p class="teams-header-subtext">Members</p>
            <p class="teams-header-title">{{ this.usersOfTeamLenght }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="team-top">
      <button class="team-top-edit" @click="updateTeam">Edit</button>
      <button @click="deleteTeam" class="team-top-delete">Delete</button>
    </div>
    <div class="team-body">
      <div class="team-form-box">
        <label for="name" class="team-label">Team Name</label>
        <input
          class="team-input"
          type="text"
          id="name"
          placeholder="Team Name"
          name="name"
          @change="handleChange"
        />
      </div>
      <div class="team-form-box">
        <label for="manager" class="team-label">Manager name</label>
        <select
          name="manager"
          id="manager-select"
          class="team-input"
          @change="handleChange"
        >
          <option v-for="user in users" :value="user.id" class="teams-option">
            {{ user.username }}
          </option>
        </select>
      </div>
      <div class="team-form-box">
        <div class="team-form-users">
          <label for="members" class="team-label">Members</label>
          <button
            class="team-members-button"
            v-if="!addActive"
            @click="handleAdd"
          >
            Add
          </button>
          <button
            class="team-members-button"
            v-if="addActive"
            @click="handleAdd"
          >
            Edit
          </button>
        </div>
        <div class="team-form-box-members" v-if="!addActive">
          <CardUser v-for="user in usersOfTeam" :key="user.id" :user="user" />
        </div>
        <div class="team-form-box-select" v-if="addActive">
          <select name="manager" id="users-select" class="team-select">
            <option v-for="user in users" :value="user.id" class="teams-option">
              {{ user.username }}
            </option>
          </select>
          <button class="team-form-box-button" @click="handleAddUser">
            <BIconPlusLg class="team-form-box-button-icons" />
          </button>
        </div>
      </div>
      <button class="team-edit" v-if="addActive" @click="updateTeam">
        Edit
      </button>
    </div>
  </div>
</template>

<script>
import Navbar from "../Navbar/Navbar.vue";
import serviceTeams from "../../services/teams/service.teams";
import serviceUser from "../../services/user/service.user";
import CardUser from "./CardUser.vue";
import ErrorSnackBar from "../SnackBar/error.vue";
import SuccessSnackBar from "../SnackBar/success.vue";

export default {
  name: "Team",
  components: {
    Navbar,
    CardUser,
    ErrorSnackBar,
    SuccessSnackBar,
  },
  data() {
    return {
      team: {},
      manager: {},
      usersOfTeam: [],
      users: [],
      addActive: false,
      message: "",
      isActiveError: false,
      isActiveSuccess: false,
      newTeam: {
        name: "",
        manager: "",
        users: [],
      },
    };
  },
  methods: {
    goBack() {
      this.$router.push("/teams");
    },
    getTeam() {
      serviceTeams
        .getTeamById(this.$route.params.id)
        .then((response) => {
          this.team = response.data.data;
          this.getManager(response.data.data.manager);
          this.getUsersOfTeam(response.data.data.users);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getManager(id) {
      serviceUser
        .getUserById(id)
        .then((response) => {
          this.manager = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getUsersOfTeam(users) {
      this.usersOfTeam = users;
    },
    getUsers() {
      serviceUser
        .getAllUsers()
        .then((response) => {
          this.users = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleAdd() {
      this.addActive = !this.addActive;
    },
    handleChange(e) {
      this.newTeam[e.target.name] = e.target.value;
      console.log(this.newTeam);
    },
    getValueSelected() {
      const select = document.getElementById("users-select");
      const value = select.options[select.selectedIndex].value;
      return value;
    },
    handleAddUser() {
      const value = this.getValueSelected();
      if (!this.team.users.includes(value)) {
        if (!this.newTeam.users.includes(value)) {
          this.newTeam.users.push(value);
          this.isActiveSuccess = true;
          this.message = "User added successfully";
          setTimeout(() => {
            this.isActiveSuccess = false;
          }, 2000);
        } else {
          this.isActiveError = true;
          this.message = "User already added";
          setTimeout(() => {
            this.isActiveError = false;
          }, 2000);
        }
      } else {
        this.message = "User already added";
        this.isActiveError = true;
        setTimeout(() => {
          this.isActiveError = false;
        }, 2000);
      }
    },
    updateTeam() {
      if (this.newTeam.name === "") {
        this.newTeam.name = this.team.name;
      }
      if (this.newTeam.manager === "") {
        this.newTeam.manager = this.team.manager;
      }
      serviceTeams
        .updateTeamById(this.newTeam, this.$route.params.id)
        .then((response) => {
          console.log(response);
          this.getTeam();
          this.isActiveSuccess = true;
          this.message = "Team updated successfully";
          setTimeout(() => {
            this.isActiveSuccess = false;
          }, 2000);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteTeam() {
      serviceTeams
        .deleteTeam(this.$route.params.id)
        .then((response) => {
          console.log(response);
          this.$router.push("/teams");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  computed: {
    usersOfTeamLenght() {
      let users = 0;
      this.team?.users?.forEach(() => {
        users++;
      });
      return users;
    },
  },
  created() {
    this.getTeam();
    this.getUsers();
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Work+Sans&display=swap");
.team-main {
  width: 100%;
  padding: 50px;
  font-family: "Work Sans", sans-serif;
}

.team-header {
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 2px solid #5f6f90;
  transition: 0.5s;
}

.team-header:hover {
  border-bottom: 2px solid #d7ba8b;
  transition: 0.5s;
}

.team-goback {
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  color: #fff;
}

.team-goback-icon {
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;
}

.team-header-content {
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.team-header-content > p {
  font-size: 40px;
  font-weight: bold;
  color: #fff;
}

.team-header-content-right {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50px;
}

.team-header-content-right-members {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.teams-header-subtext {
  font-size: 16px;
  color: #929292;
}

.teams-header-title {
  font-size: 40px;
  font-weight: bold;
  color: #fff;
}

.team-form-box {
  width: 50%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.team-body {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.team-form-box-members {
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  overflow-x: auto;
  margin-top: 20px;
}

.team-form-box-select {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
}

.team-form-box-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 50px;
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

.team-form-box-button-icons {
  font-size: 20px;
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

.team-form-users {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.team-members-button {
  border: 2px solid #5f6f90;
  background-color: #2b3241;
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
}

.team-input,
.team-select {
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

.team-input:focus {
  border: 2px solid #d7ba8b;
  transition: 0.5s;
}

.team-input::placeholder {
  color: #929292;
  font-size: 14px;
}

.team-label {
  font-size: 16px;
  color: #fff;
}

.team-edit {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 50px;
  background-color: #5f6f90;
  border: 2px solid #5f6f90;
  border-radius: 10px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  transition: 1s;
  margin-top: 20px;
}

.team-edit:hover {
  background-color: #d7ba8b;
  border: 2px solid #d7ba8b;
  transition: 1s;
}

.team-top {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 50px;
  margin-top: 20px;
  gap: 10px;
}

.team-top-edit {
  width: 100px;
  height: 100%;
  background-color: #5f6f90;
  border: 2px solid #5f6f90;
  border-radius: 10px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  outline: none;
  transition: 1s;
}

.team-top-edit:hover {
  background-color: #d7ba8b;
  border: 2px solid #d7ba8b;
  transition: 1s;
}

.team-top-delete {
  width: 100px;
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

.team-top-delete:hover {
  background-color: red;
  border: 2px solid red;
  transition: 0.5s;
}
</style>
