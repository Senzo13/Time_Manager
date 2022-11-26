import axios from "axios";
import URL from "../../values/constants";
export default {
  // Get working times by ID and user ID
  async getWorkingTimesWithIdAndUserId(many_id) {
    const config = {
      method: "get",
      url: `${URL.AUTH_WORKINGTIMES}/${many_id.workingTimes_id}/${many_id.user_ID}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return await axios(config);
  },

  // Get all  working times
  async getAllWorkingTimes(token) {
    const config = {
      method: "get",
      url: URL.AUTH_WORKINGTIMES,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios(config);
  },

  // Get working times by ID
  async getWorkingTimeWithId(id, token) {
    const config = {
      method: "get",
      url: `${URL.AUTH_WORKINGTIMES}/${id}?start=2018-12-10T13:47:51Z&end=2088-12-10T13:47:51Z`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await axios(config);
  },

  // Get working times by user ID
  async getAllWorkingTimesUser(workingTimes, id) {
    const config = {
      method: "get",
      url: `${URL.AUTH_WORKINGTIMES}/${id}` + workingTimes,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return await axios(config);
  },

  // Create new working time
  async createWorkingTimes(workingTimes, id, token) {
    const data = {
      workingtimes: {
        start: workingTimes.start,
        end: workingTimes.end,
      },
    };
    const config = {
      method: "post",
      url: `${URL.AUTH_WORKINGTIMES}/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(data),
    };
    return await axios(config);
  },

  // Delete working time
  async deleteWorkingTimesById(id) {
    const config = {
      method: "delete",
      url: `${URL.AUTH_WORKINGTIMES}/${id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    };
    return await axios(config);
  },

  // Update working time
  async updateWorkingTimes(workingtimes, id) {
    const data = {
      workingtimes: {
        user: workingtimes.user,
        start: workingtimes.start,
        end: workingtimes.end,
      },
    };
    console.log(data);
    const config = {
      method: "put",
      url: `${URL.AUTH_WORKINGTIMES}/${id}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      data: JSON.stringify(data),
    };
    return await axios(config);
  },
};
