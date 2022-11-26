<template>
  <div class="carduser-main">
    <BIconXLg class="carduser-icon" @click="removeUserFromTeam" />
    <div class="carduser-body">
      <p class="carduser-title">{{ this.user.email }}</p>
      <p class="carduser-text">{{ this.roleName }}</p>
    </div>
  </div>
</template>

<script>
import { BIconXLg } from "bootstrap-icons-vue";
import serviceRoles from "../../services/roles/service.roles";
import serviceTeams from "../../services/teams/service.teams";

export default {
  name: "CardUser",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      roleName: "",
    };
  },
  methods: {
    getRoleOfTeamUsers() {
      serviceRoles
        .getRoleById(this.user.role_id)
        .then((response) => {
          this.roleName = response.data.data.name;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    removeUserFromTeam() {
      serviceTeams
        .removeUserFromTeam(this.user.id)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getRoleOfTeamUsers();
  },
  components: { BIconXLg },
};
</script>

<style scoped>
.carduser-main {
  width: 250px;
  display: flex;
  flex-direction: column;
  background-color: #2b3241;
  border-radius: 10px;
  border: 2px solid #2b3241;
  transition: 1s;
  padding: 20px;
  position: relative;
}

.carduser-main:hover {
  border: 2px solid #d7ba8b;
  transition: 1s;
}

.carduser-icon {
  font-size: 15px;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
  position: absolute;
  top: 10px;
  right: 10px;
}

.carduser-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.carduser-title {
  font-size: 16px;
  color: #fff;
}

.carduser-text {
  font-size: 15px;
  color: #929292;
}
</style>
