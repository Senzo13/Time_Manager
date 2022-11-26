<template>
  <div class="teams-main">
    <div class="teams-top">
      <div class="teams-top-left">
        <p class="teams-top-title">Dashboard Team</p>
        <p class="teams-top-text">
          Team fully dedicated to improve the dashboard on both sides.
        </p>
      </div>
      <div class="teams-top-right">
        <div class="teams-top-right-teams">
          <p class="teams-top-subtext">Teams</p>
          <p class="teams-top-title">{{ this.teamsLength }}</p>
        </div>
        <div class="teams-top-right-members">
          <p class="teams-top-subtext">Members</p>
          <p class="teams-top-title">{{ this.usersOfTeamsLenght }}</p>
        </div>
      </div>
    </div>
    <div class="teams-layout">
      <div class="teams-layout-left">
        <BIconKanbanFill class="layout-icons" />
        <p class="teams-layout-text">Your favorite manager space</p>
      </div>
      <div class="teams-layout-right">
        <button class="teams-button" @click="handleModal">
          <BIconPlusLg class="teams-button-icons" />Create new Team
        </button>
      </div>
    </div>
    <div class="teams-middle">
      <draggable
        :list="teams"
        item-key="id"
        class="teams-draggable"
      >
        <template #item="{ element }">
          <CardTeams
            :key="element.id"
            :team="element"
            @click="goToTeam(element.id)"
          />
        </template>
        <template #header>
          <div class="teams-middle-create" @click="handleModal">
            <BIconPlusLg class="teams-create-icons" />
            <p class="teams-create-text">Create a new team</p>
          </div>
        </template>
      </draggable>
    </div>
    <div class="teams-modal" v-if="this.showModal">
      <SuccessSnackBar
        :message="this.message"
        :isActive="this.isActiveSuccess"
      />
      <ErrorSnackBar :message="this.message" :isActive="this.isActiveError" />
      <div class="teams-modal-main">
        <div class="teams-modal-header">
          <div class="teams-modal-header-left">
            <BIconPencilSquare class="teams-modal-header-icons" />
            <p>Create new Team</p>
          </div>
          <BIconX class="teams-modal-header-cross" @click="handleModal" />
        </div>
        <div class="teams-modal-content">
          <div class="teams-modal-content-form">
            <label class="teams-label" for="teamName">Team Name</label>
            <input
              type="text"
              id="teamName"
              name="name"
              placeholder="Team Name"
              class="teams-input"
              @change="handleChange"
            />
          </div>
          <div class="teams-modal-content-form">
            <label class="teams-label" for="teamName">Team Manager</label>
            <select
              name="manager"
              id="manager-select"
              class="teams-select"
              @change="handleChange"
            >
              <option
                v-for="user in users"
                :value="user.id"
                class="teams-option"
              >
                {{ user.username }}
              </option>
            </select>
          </div>
          <div class="teams-modal-content-form-users">
            <label for="teamName" class="teams-label">Team Members</label>
            <div class="teams-modal-content-form-middle">
              <select name="users" id="users-select" class="teams-select">
                <option
                  v-for="user in users"
                  :value="user.id"
                  class="teams-option"
                >
                  {{ user.username }}
                </option>
              </select>
              <button class="teams-modal-button" @click="handleAddUser">
                <BIconPlusLg class="teams-modal-button-icons" />
              </button>
            </div>
          </div>
        </div>
        <div class="teams-modal-footer">
          <button class="teams-button-cancel" @click="handleModal">
            Cancel</button
          ><button  v-if="this.currentUser.role != 'Manager'" class="teams-button-create" @click="createTeam">
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardTeams from "./CardTeams.vue";
import {
  BIconKanbanFill,
  BIconPlusLg,
  BIconX,
  BIconPencilSquare,
} from "bootstrap-icons-vue";
import serviceTeams from "../../services/teams/service.teams";
import serviceUser from "../../services/user/service.user";
import SuccessSnackBar from "../SnackBar/success.vue";
import ErrorSnackBar from "../SnackBar/error.vue";
import draggable from "vuedraggable";

export default {
  name: "Teams",
  components: {
    CardTeams,
    BIconKanbanFill,
    BIconPlusLg,
    BIconX,
    BIconPencilSquare,
    SuccessSnackBar,
    ErrorSnackBar,
    draggable,
  },
  data() {
    return {
      teams: [],
      users: [],
      team: {
        name: "",
        manager: "",
        users: [],
      },
      showModal: false,
      message: "",
      isActiveError: false,
      isActiveSuccess: false,
    };
  },
  methods: {
    getAllTeams() {
      serviceTeams
        .getAllTeams()
        .then((response) => {
          this.teams = response.data.data;
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
    createTeam() {
      serviceTeams
        .createTeam(this.team)
        .then(() => {
          this.handleModal();
          this.getAllTeams();
        })
        .catch(() => {
          this.message = "Error on creating team";
          this.isActiveError = true;
          setTimeout(() => {
            this.isActiveError = false;
          }, 2000);
        });
    },
    goToTeam(id) {
      this.$router.push({ name: "team", params: { id: id } });
    },
    handleModal() {
      this.showModal = !this.showModal;
    },
    handleChange(e) {
      this.team[e.target.name] = e.target.value;
      console.log(this.team);
    },
    getValueSelected() {
      const select = document.getElementById("users-select");
      const value = select.options[select.selectedIndex].value;
      return value;
    },
    handleAddUser() {
      const value = this.getValueSelected();
      if (!this.team.users.includes(value)) {
        this.team.users.push(value);
        this.isActiveSuccess = true;
        this.message = "User added successfully";
        setTimeout(() => {
          this.isActiveSuccess = false;
        }, 2000);
      } else {
        this.message = "User already added";
        this.isActiveError = true;
        setTimeout(() => {
          this.isActiveError = false;
        }, 2000);
      }
    },
  },
  created() {
    this.getAllTeams();
    this.getAllUsers();
  },
  computed: {
    teamsLength() {
      return this.teams.length;
    },
    usersOfTeamsLenght() {
      let users = 0;
      this.teams.forEach((team) => {
        users += team.users.length;
      });
      return users;
    },
    currentUser() {
      return this.$store.getters.getCurrentUser;
    },
  
  },
};
</script>

<style scoped>
.teams-main {
  width: 100%;
  height: 100%;
  padding: 50px;
}

/* TOP */
.teams-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.teams-top-left {
  display: flex;
  flex-direction: column;
}

.teams-top-right {
  display: flex;
  flex-direction: row;
  gap: 50px;
}

.teams-top-right-teams {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.teams-top-right-members {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.teams-top-title {
  font-size: 40px;
  font-weight: 600;
  color: #ffffff;
}

.teams-top-subtext {
  font-size: 16px;
  color: #929292;
}

.teams-top-text {
  font-size: 16px;
  color: #929292;
}

/* ######################################################## */

/* LAYOUT */
.teams-layout {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: 50px;
}

.teams-layout-left {
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 20px;
}

.teams-layout-text {
  font-size: 18px;
  font-weight: 400;
  color: #ffffff;
}

.layout-icons {
  font-size: 25px;
  color: #d7ba8b;
}

.teams-layout-right {
  display: flex;
  align-items: center;
  justify-content: center;
}

.teams-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 250px;
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
}

.teams-button:hover {
  background-color: #3b4251;
  transition: 0.5s;
}

.teams-button-icons {
  font-size: 20px;
  color: #ffffff;
}

/* ######################################################## */

/* MIDDLE */

.teams-middle {
  width: 100%;
  margin-top: 50px;
  height: 575px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-row-gap: 25px;
  overflow-x: auto;
}

.teams-draggable {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-row-gap: 25px;
  grid-column-gap: 25px;
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

.teams-middle-create {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 325px;
  height: 325px;
  background-color: transparent;
  border: 2px solid #2b3241;
  border-radius: 10px;
  gap: 20px;
  cursor: pointer;
  transition: 1s;
}

.teams-middle-create:hover {
  background-color: #2b3241;
  border: 2px solid #5f6f90;
  transition: 1s;
}

.teams-create-icons {
  font-size: 45px;
  color: #fff;
}

.teams-create-text {
  font-size: 16px;
  color: #fff;
}

/* ######################################################## */

/* MODAL */

.teams-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  backdrop-filter: blur(5px);
  top: 0;
  left: 0;
  z-index: 999;
}

.teams-modal-main {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 500px;
  background-color: #2b3241;
  border-radius: 10px;
  padding: 20px;
}

.teams-modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  border-bottom: 2px solid #5f6f90;
}

.teams-modal-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 100%;
}

.teams-modal-header-left > p {
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
}

.teams-modal-header-icons {
  font-size: 20px;
  color: #d7ba8b;
  margin: 0;
}

.teams-modal-header-cross {
  font-size: 30px;
  color: #d7ba8b;
  cursor: pointer;
}

.teams-modal-content {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 20px;
  margin-top: 20px;
}

.teams-modal-content-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
}

.teams-modal-content-form-users {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
}

.teams-modal-content-form-middle {
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
}

.teams-modal-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
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

.teams-modal-button:hover {
  background-color: #d7ba8b;
  border: 2px solid #d7ba8b;
  transition: 0.5s;
}

.teams-modal-button-icons {
  font-size: 20px;
}

.teams-label {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
}

.teams-input,
.teams-select {
  width: 100%;
  height: 50px;
  background-color: #2b3241;
  border: 2px solid #5f6f90;
  border-radius: 10px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 400;
  padding: 10px;
  outline: none;
  transition: 0.5s;
}

.teams-input:focus,
.teams-select:focus {
  border: 2px solid #d7ba8b;
  transition: 0.5s;
}

.teams-input::placeholder {
  color: gray;
  font-size: 14px;
  font-weight: 400;
}

.teams-option {
  width: 100%;
  color: gray;
  font-size: 14px;
  text-transform: uppercase;
}

.teams-modal-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  gap: 10px;
}

.teams-button-cancel {
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

.teams-button-cancel:hover {
  background-color: #3b4251;
  border: 2px solid #5f6f90;
  transition: 0.5s;
}

.teams-button-create {
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

.teams-button-create:hover {
  background-color: #d7ba8b;
  border: 2px solid #d7ba8b;
  transition: 0.5s;
}

/* ######################################################## */
</style>
