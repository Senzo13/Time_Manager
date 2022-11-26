import axios from "axios";
import URL from "../../values/constants";

export default {
  // Create new user
  async createUser({ user }) {
    const data = {
      user: {
        username: user.username,
        email: user.email,
        password: user.password,
        role_id: 1,
      },
    };
    const config = {
      method: "post",
      url: URL.API_USER_PC,
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 6000,

      data: JSON.stringify(data),
    };
    return await axios(config);
  },

  // Gett all users
  async getAllUsers() {
    const config = {
      method: "get",
      url: URL.AUTH_USER,
      headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return await axios(config);
  },

  // Update user
  async updateUserById(userGet, id, token) {
    const user = {
      user: {
        username: userGet.username,
        email: userGet.email,
        password: userGet.password,
      },
    };
    const config = {
      method: "put",
      url: `${URL.AUTH_USER}/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(user),
    };
    return await axios(config);
  },

  // Delete user
  async deleteUser(id, token) {
    const config = {
      method: "delete",
      url: `${URL.AUTH_USER}/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      timeout: 6000,
    };
    return await axios(config);
  },

  // Get user Email and Password
  async getUserByMailAndPassword(email, password) {
    const config = {
      method: "get",
      // url: `${URL.API_USER}/?email=${email}&password=${password}`,
      url: `http://10.0.2.2:4000/api/users?email=${email}&password=${password}`,
      headers: {
        "Content-Type": "application/json",
      },
      // check if timeout is necessary
      timeout: 5000,
    };
    return await axios(config);
  },

  // Get user by ID
  async getUserById(id) {
    const config = {
      method: "get",
      url: `${URL.AUTH_USER}/${id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return await axios(config);
  },
};
