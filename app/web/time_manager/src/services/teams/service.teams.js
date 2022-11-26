import axios from "axios";
import URL from "../../values/constants";
import store from "../../store";

export default {
  // Create new team
  async createTeam(team) {
    const token = await store.getters.getToken;
    const data = {
      team: {
        name: team.name,
        manager: team.manager,
        users: team.users,
      },
    };
    const config = {
      method: "post",
      url: URL.AUTH_TEAM,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(data),
    };
    return await axios(config);
  },

  // Get all teams
  async getAllTeams() {
    const token = await store.getters.getToken;
    const config = {
      method: "get",
      url: URL.AUTH_TEAM,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await axios(config);
  },

  async getUsersInTeam(teamId) {
    const token = await store.getters.getToken;
    const config = {
      method: "get",
      url: `${URL.AUTH_TEAM}/${teamId}/users`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await axios(config);
  
  },

  // Get WT by user in team

  async getWTUsersInTeam(team_id) {
    const token = await store.getters.getToken;
    const config = {
      method: "get",
      url: `${URL.AUTH_TEAM}/${team_id}/workingtimes`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await axios(config);
  
  },

  // Get Team by id
  async getTeamById(id) {
    const token = await store.getters.getToken;
    const config = {
      method: "get",
      url: `${URL.AUTH_TEAM}/${id}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await axios(config);
  },

  // Update team
  async updateTeamById(team, id) {
    const token = await store.getters.getToken;
    const data = {
      team: {
        name: team.name,
        manager: team.manager,
        users: team.users,
      },
    };
    const config = {
      method: "put",
      url: `${URL.AUTH_TEAM}/${id}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(data),
    };
    return await axios(config);
  },

  // Delete team
  async deleteTeam(id) {
    const token = await store.getters.getToken;
    const config = {
      method: "delete",
      url: `${URL.AUTH_TEAM}/${id}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await axios(config);
  },

  async removeUserFromTeam(userId) {
    const token = await store.getters.getToken;
    const config = {
      method: "delete",
      url: `${URL.AUTH_TEAM}/users/${userId}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await axios(config);
  },
};
