import axios from "axios";
import URL from "../../values/constants";
import store from "../../store";

export default {

  // Create new user
  async createUser(user) {
    const data = {
      user: {
        username: user.username,
        email: user.email,
        password: user.password,
        role_id: 3
      },
    };
    const config = {
      method: "post",
      url: URL.API_USER,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };
    return await axios(config);
  },

  // Gett all users
  async getAllUsers() {
    const token = await store.getters.getToken;
    const config = {
      method: "get",
      url: URL.AUTH_USER,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await axios(config);
  },

  // Update user
  async updateUserById(user, id) {
    const token = await store.getters.getToken;
    const config = {
      method: "put",
      url: `${URL.AUTH_USER}/${id}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(user),
    };
    return await axios(config);
  },

  // Delete user
  async deleteUser(id) {
    const token = await store.getters.getToken;
    const config = {
      method: "delete",
      url: `${URL.AUTH_USER}/${id}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await axios(config);
  },

  // Get user Email and Password
  async getUserByMailAndPassword(user) {
    const email = user.email;
    const password = user.password;
    const config = {
      method: "get",
      url: `${URL.API_USER}/?email=${email}&password=${password}`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    return await axios(config);
  },

  // Get user by ID
  async getUserById(id) {
    const token = await store.getters.getToken;
    const config = {
      method: "get",
      url: `${URL.AUTH_USER}/${id}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await axios(config);
  },
};
