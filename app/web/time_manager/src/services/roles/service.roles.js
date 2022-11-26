import axios from "axios";
import URL from "../../values/constants";
import store from "../../store";

export default {
  async getAllRoles() {
    const token = await store.getters.getToken;
    const config = {
      method: "get",
      url: URL.AUTH_ROLE,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await axios(config);
  },

  async getRoleById(id) {
    const token = await store.getters.getToken;
    const config = {
      method: "get",
      url: `${URL.AUTH_ROLE}/${id}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await axios(config);
  },

  async createRole(role) {
    const token = await store.getters.getToken;
    const data = {
      role: {
        name: role.name,
        users: role.users,
      },
    };
    const config = {
      method: "post",
      url: URL.AUTH_ROLE,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(data),
    };
    return await axios(config);
  },

  async updateRoleById(role, id) {
    const token = await store.getters.getToken;
    const config = {
      method: "put",
      url: `${URL.AUTH_ROLE}/${id}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(role),
    };
    return await axios(config);
  },

  async deleteRoleById(id) {
    const token = await store.getters.getToken;
    const config = {
      method: "delete",
      url: `${URL.AUTH_ROLE}/${id}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await axios(config);
  },  
};
