import axios from "axios";
import URL from "../../values/constants";
import store from "../../store";

export default {
  // Get working times by ID and user ID
  async getWorkingTimesWithIdAndUserId(many_id) {
    const token = await store.getters.getToken;
    const config = {
      method: "get",
      url: `${URL.AUTH_WORKINGTIMES}/${many_id.workingTimes_id}/${many_id.user_ID}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await axios(config);
  },

  // Get all  working times
  async getAllWorkingTimes() {
    const token = await store.getters.getToken;
    const config = {
      method: "get",
      url: URL.AUTH_WORKINGTIMES,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await axios(config);
  },

  // Get working times by ID
  async getWorkingTimeWithId(id) {
    const token = await store.getters.getToken;
    const config = {
      method: "get",
      url: `${URL.AUTH_WORKINGTIME}/${id}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await axios(config);
  },

  // Get working times by user ID
  async getAllWorkingTimesUser(workingTimes, id) {
    const token = await store.getters.getToken;
    const config = {
      method: "get",
      url: `${URL.AUTH_WORKINGTIMES}/${id}` + workingTimes,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await axios(config);
  },

  // Create new working time
  async createWorkingTimes(workingTimes, id) {
    const token = await store.getters.getToken;
    const data = {
      workingtimes: {
        start: workingTimes.start,
        end: workingTimes.end,
        duration: workingTimes.duration,
        break: workingTimes.break,
      },
    };
    const config = {
      method: "post",
      url: `${URL.AUTH_WORKINGTIMES}/${id}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(data),
    };
    return await axios(config);
  },

  // Delete working time
  async deleteWorkingTimesById(id) {
    const token = await store.getters.getToken;
    const config = {
      method: "delete",
      url: `${URL.AUTH_WORKINGTIMES}/${id}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await axios(config);
  },

  // Update working time
  async updateWorkingTimes(workingtimes, id) {
    const token = await store.getters.getToken;
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
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(data),
    };
    return await axios(config);
  },
};
