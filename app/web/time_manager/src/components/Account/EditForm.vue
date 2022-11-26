<script>
import service from "../../services/user/service.user";
import router from "../../router/index.js";
import { SET_TOKEN } from "../../store/Token";
import { SET_CURRENT_USER } from "../../store/User";
import {
BIconBoxArrowDownLeft,
  BIconBoxArrowRight,
  BIconCaretDownFill,
  BIconEnvelope,
  BIconPencil,
  BIconPencilSquare,
  BIconPerson,
  BIconShieldLock,
} from "bootstrap-icons-vue";
import JWT from "../../utils/utils.decodeToken";
import SnackBarSuccess from "../SnackBar/success.vue";
import serviceTeams from "../../services/teams/service.teams";
import CardTeams from "../Teams/CardTeams.vue";

export default {
  name: "EditForm",
  components: {
    BIconEnvelope,
    BIconShieldLock,
    BIconPerson,
    SnackBarSuccess,
    BIconCaretDownFill,
    BIconPencil,
    CardTeams,
    BIconPencilSquare,
    BIconBoxArrowDownLeft,
    BIconBoxArrowRight
},

  data() {
    return {
      user: {
        user: {},
      },
      currentUser: {},
      isActiveError: false,
      isActiveSuccess: false,
      message: "",
    };
  },

  methods: {
    handleEdit() {
      service
        .updateUserById(this.user, this.currentUser.id)
        .then((response) => {
          console.log(response);
          const jwt = response.data.access.substring(7);
          const decode_jwt = JWT.parseJwt(jwt);
          console.log(decode_jwt);
          this.$store.dispatch(SET_TOKEN, jwt);
          this.$store.dispatch(SET_CURRENT_USER, {
            id: decode_jwt.sub,
            email: decode_jwt.email,
            username: decode_jwt.username,
            role: decode_jwt.role,
          });
          this.isActiveSuccess = true;
          this.message = "Update success";
          setTimeout(() => {
            this.isActiveSuccess = false;
          }, 3000);
          this.getCurrentUser();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCurrentUser() {
      service
        .getUserById(this.storeUser.id)
        .then((response) => {
          this.currentUser = response.data.data;
          this.getTeamOfUser(response.data.data.team_id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getTeamOfUser(id) {
      serviceTeams
        .getTeamById(id)
        .then((response) => {
          this.currentUser.team = response.data.data;
          console.log(this.currentUser);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // Delete user
    deleteUser() {
      service
        .deleteUser(this.currentUser.id)
        .then(() => {
          this.$store.dispatch(SET_CURRENT_USER, null);
          this.$store.dispatch(SET_TOKEN, null);
          router.push("/signup");
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Logout
    handleLogout() {
      this.$store.dispatch(SET_CURRENT_USER, null);
      this.$store.dispatch(SET_TOKEN, null);
      this.$router.push("/signin");
    },
    handleChange(event) {
      this.user.user[event.target.name] = event.target.value;
    },
  },
  // Return current user from store
  computed: {
    storeUser() {
      return this.$store.getters.getCurrentUser;
    },
  },
  created() {
    this.getCurrentUser();
  },
};
</script>

<template>
  <div class="account-main">
    <SnackBarSuccess :isActive="this.isActiveSuccess" :message="this.message" />
    <div class="account-header">
      <div class="account-header-top">
        <p class="account-header-title">My Account Manager</p>
        <p class="account-header-text">Here is your account on demand</p>
      </div>
      <div class="account-header-middle">
        <div class="account-header-middle-left">
          <BIconKanbanFill class="account-header-middle-icons" />
          <p class="account-header-middle-text">Your account space</p>
        </div>
        <div class="account-header-middle-right">
          <button @click="handleEdit" class="account-header-middle-edit">
            <BIconPencilSquare class="account-header-middle-edit-icons" />Edit
            my Profile
          </button>
          <button @click="handleLogout" class="account-header-middle-logout">
            <BIconBoxArrowRight class="account-header-middle-logout-icons" />Logout
          </button>
        </div>
      </div>
    </div>
    <div class="account-body">
      <div class="account-left">
        <div class="account-details-container">
          <div class="account-details-top">
            <BIconCaretDownFill class="account-details-icon" />
            <p class="account-details-title">Account Details</p>
            <BIconPencil class="account-details-edit" />
          </div>
          <div class="account-details">
            <p class="account-details-text">Email</p>
            <p class="account-details-subtitle">{{ this.currentUser.email }}</p>
          </div>
          <div class="account-details">
            <p class="account-details-text">Username</p>
            <p class="account-details-subtitle">
              {{ this.currentUser.username }}
            </p>
          </div>
          <div class="account-details">
            <p class="account-details-text">Role</p>
            <p class="account-details-subtitle">{{ this.storeUser.role }}</p>
          </div>
          <div class="account-details" v-if="this.currentUser.team">
            <p class="account-details-text">Team</p>
            <p class="account-details-subtitle">
              {{ this?.currentUser?.team?.name }}
            </p>
          </div>
        </div>
        <div class="account-team-container" v-if="this.currentUser.team">
          <div class="account-details-top">
            <BIconCaretDownFill class="account-details-icon" />
            <p class="account-details-title">Team Details</p>
            <BIconPencil class="account-details-edit" />
          </div>
          <div class="account-team">
            <CardTeams :team="this?.currentUser?.team" />
          </div>
        </div>
      </div>
      <div class="account-right">
        <div class="account-right-form-box">
          <label for="start" class="account-label">Email</label>
          <input
            class="account-right-input"
            type="text"
            id="email"
            placeholder="Your email"
            name="email"
            @change="handleChange"
          />
        </div>
        <div class="account-right-form-box">
          <label for="start" class="account-label">Username</label>
          <input
            class="account-right-input"
            type="text"
            id="username"
            placeholder="Your username"
            name="username"
            @change="handleChange"
          />
        </div>
        <div class="account-right-form-box">
          <label for="start" class="account-label">Password</label>
          <input
            class="account-right-input"
            type="password"
            id="password"
            placeholder="Your password"
            name="password"
            @change="handleChange"
          />
        </div>
        <div class="account-right-button-box">
          <button class="account-right-button-delete" @click="deleteUser">
            Delete
          </button>
          <button class="account-right-button-edit" @click="handleEdit">
            Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Work+Sans&display=swap");
.account-main {
  width: 100%;
  padding: 50px;
  font-family: "Work Sans", sans-serif;
}

.account-header {
  width: 100%;
}

.account-header-top {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.account-header-title {
  font-size: 40px;
  font-weight: 600;
  color: #fff;
}

.account-header-text {
  font-size: 16px;
  color: #929292;
}

.account-header-middle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
}

.account-header-middle-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.account-header-middle-icons {
  font-size: 25px;
  color: #d7ba8b;
}

.account-header-middle-text {
  font-size: 18px;
  font-weight: 400;
  color: #ffffff;
}

.account-header-middle-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.account-header-middle-edit {
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

.account-header-middle-logout {
  width: 150px;
  height: 40px;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  background-color: rgb(112, 21, 21);
  border: 2px solid rgb(112, 21, 21);
  border-radius: 10px;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  transition: 0.5s;
  letter-spacing: 1px;
}

.account-header-middle-logout:hover {
  background-color: red;
  border: 2px solid red;
  transition: 0.5s;
}

.account-header-middle-edit:hover {
  background-color: #3b4251;
  transition: 0.5s;
}

.account-header-middle-edit-icons {
  font-size: 20px;
  color: #ffffff;
}

/* BODY */
.account-body {
  width: 100%;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
}

.account-left {
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-right: 2px solid #2b3241;
}

.account-details-top {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
  margin-bottom: 40px;
}

.account-details {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
}

.account-details-icon {
  font-size: 20px;
  color: #5f6f90;
}

.account-details-edit {
  font-size: 20px;
  color: #5f6f90;
}

.account-details-title {
  font-size: 20px;
  color: #fff;
  font-weight: bold;
}

.account-details-text {
  font-size: 20px;
  color: #929292;
  font-weight: bold;
  width: 150px;
}

.account-details-subtitle {
  font-size: 20px;
  color: #fff;
  font-weight: 400;
}

.account-team {
  width: 80%;
  height: 220px;
  overflow-x: auto;
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

/* RIGHT */
.account-right {
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 20px;
}

.account-right-form-box {
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.account-label {
  font-size: 16px;
  color: #fff;
}

.account-right-input {
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

.account-right-input:focus {
  border: 2px solid #d7ba8b;
  transition: 0.5s;
}

.account-right-input::placeholder {
  color: #929292;
  font-size: 14px;
}

.account-right-button-box {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.account-right-button-delete {
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

.account-right-button-delete:hover {
  background-color: #3b4251;
  border: 2px solid #5f6f90;
  transition: 0.5s;
}

.account-right-button-edit {
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

.account-right-button-edit:hover {
  background-color: #d7ba8b;
  border: 2px solid #d7ba8b;
  transition: 0.5s;
}
</style>
