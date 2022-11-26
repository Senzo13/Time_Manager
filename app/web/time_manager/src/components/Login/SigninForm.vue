<template>
  <div class="signinform-main">
    <!-- HEADER -->
    <section class="sectionSign">
      <h1>Welcome to Time Manager</h1>
      <h2>Log to your account</h2>
      <form class="LoginAccount">
        <!-- EMAIL -->
        <label for="email">Email</label>
        <div class="input">
          <input
            type="text"
            class="account-input"
            required="required"
            id="email"
            @change="handleChange"
            name="email"
            placeholder="Enter your e-mail"
          />
          <BIconEnvelope class="form_icons" />
        </div>

        <!-- PASSWORD -->
        <label for="password">Password</label>
        <div class="input">
          <input
            type="password"
            class="account-input"
            required="required"
            id="password"
            @change="handleChange"
            name="password"
            placeholder="Enter your email"
          />
          <BIconShieldLock class="form_icons" />
        </div>

        <!-- LiINK FOR REGISTER -->
        <RouterLink to="/signup" class="register"
          >Never registered ?</RouterLink
        >

        <!-- LOGIN -->
        <input
          type="button"
          id="LoginUser"
          value="Log in"
          v-on:click="getUserByMailPassword()"
        />
      </form>
    </section>

    <!-- IMAGE RIGHT -->
    <div class="background"></div>
  </div>
</template>

<script>
import service from "../../services/user/service.user";
import { SET_CURRENT_USER } from "../../store/User";
import { SET_TOKEN } from "../../store/Token";
import { BIconEnvelope, BIconShieldLock } from "bootstrap-icons-vue";
import JWT from "../../utils/utils.decodeToken";

document.getElementsByClassName("clocking")[0].style.display = "none";

export default {
  name: "SigninForm",

  // Icons
  components: {
    BIconEnvelope,
    BIconShieldLock,
  },
  data() {
    return {
      user: {},
    };
  },

  methods: {
    getUserByMailPassword() {
      service.getUserByMailAndPassword(this.user).then(
        (response) => {
          const jwt = response.data.access.substring(7);
          const decode_jwt = JWT.parseJwt(jwt);
          console.log(decode_jwt);
          this.$store.dispatch(SET_TOKEN, jwt);
          this.$store.dispatch(SET_CURRENT_USER, {
            id: decode_jwt.sub,
            email: decode_jwt.email,
            username: decode_jwt.username,
            role: decode_jwt.role,
            team_id: decode_jwt.team_id,
          });
          this.$router.push("/");
        },
        (error) => {
          console.log("error", error);
        }
      );
    },
    handleChange(event) {
      this.user[event.target.name] = event.target.value;
    },
  },
};
</script>
