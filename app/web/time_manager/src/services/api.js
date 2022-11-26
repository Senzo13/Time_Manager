import axios from "axios";
export default class ApiServices {
  url = "";
  constructor() {
    this.url = "http://localhost:4000/api";
  }
  // USER SERVICES
  getUsersById(id) {
    return axios.get(this.url + "/users/" + id);
  }
  getUsersByUsernameAndEmail(username, email) {
    return axios.get(
      this.url + "/users?username=" + username + "&email=" + email
    );
  }
  editUser(id, user) {
    return axios.put(this.url + "/users/" + id, user);
  }
  deleteUser(id) {
    return axios.delete(this.url + "/users/" + id);
  }
  createUser(user) {
    return axios.post(this.url + "/users", user);
  }
  // WORKING TIME SERVICES
  createWorkingTime(workingTime) {
    return axios.post(this.url + "/workingtimes", workingTime);
  }
  getAllByIdAndStartDateAndEndDate(id, startDate, endDate) {
    return axios.get(
      this.url +
        "/workingtimes/" +
        id +
        "?start=" +
        startDate +
        "&end=" +
        endDate
    );
  }
  getOneWorkingTimeByUserIdAndId(userId, id) {
    return axios.get(this.url + "/workingtimes/" + userId + "/" + id);
  }
  editWordkingTimeById(id) {
    return axios.put(this.url + "/workingtimes/" + id);
  }
  deleteWorkingTimeById(id) {
    return axios.delete(this.url + "/workingtimes/" + id);
  }
  // CLOCKS SERVICES
  createClock(clock) {
    return axios.post(this.url + "/clocks", clock);
  }
  getAllClocksByUserId(id) {
    return axios.get(this.url + "/clocks/" + id);
  }
}
