import axios from "axios";
import URL from "../../values/constants";
import getDate from "../../utils/dateFormatter";
import store from "../../store";

export default {

  // Get Clocks by User
  async getClocksById(id) {
    const token = await store.getters.getToken;
    const config = {
      method: "get",
      url: `${URL.AUTH_CLOCKS}/${id}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await axios(config);
  },

  // Create end clocks
  async createClockEndTimeByUserId(user_id) {
    const token = await store.getters.getToken;
    const config = {
      method: "post",
      url: `${URL.AUTH_CLOCKS}/${user_id}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({
        clocks: {
          time: getDate.format(new Date(), "yyyy-MM-dd hh:mm:ss"),
          status: false,
        },
      }),
    };
    return await axios(config);
  },

  // Create start clocks
  async createClockArrivingTimeByUserId(user_id) {
    const token = await store.getters.getToken;
    const config = {
      method: "post",
      url: `${URL.AUTH_CLOCKS}/${user_id}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: JSON.stringify({
        clocks: {
          time: getDate.format(new Date(), "yyyy-MM-dd hh:mm:ss"),
          status: true,
        },
      }),
    };
    return await axios(config);
  },

  // Create clocks by user ID
  async createClockByUserId(clock, user_id) {
    const token = await store.getters.getToken;
    const config = {
      method: "post",
      url: `${URL.AUTH_CLOCKS}/${user_id}`,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(clock),
    };
    return await axios(config);
  },
};
