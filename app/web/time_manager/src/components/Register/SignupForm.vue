<template>
  <div class="signupform-main">

    <!-- HEADER -->
    <section class="sectionSign">
      <h1>Welcome to Time Manager</h1>
      <h2>Create your account</h2>
      <form class="LoginAccount">

        <!-- EMAIL -->
        <label for="email">Email</label>
        <div class="input">

          <input
            class="account-input"
            type="text"
            id="email"
            required="required"
            name="email"
            placeholder="Enter your email"
            v-model="email"
            @change="handleChange"
          />
          <BIconEnvelope class="form_icons"/>

        </div>

        <!-- USERNAME -->
        <label for="username">Username</label>
        <div class="input">

          <input
            type="text"
            class="account-input"
            v-model="username"
            required="required"
            id="username"
            name="username"
            @change="handleChange"
            placeholder="Enter your username"
          />
          <BIconPerson class="form_icons"/>
        </div>

        <!-- PASSWORD -->
        <label for="password">Password</label>
        <div class="input">

          <input
            type="password"
            class="account-input"
            id="password"
            required="required"
            name="password"
            @change="handleChange"
            placeholder="Enter your password"
            v-model="password"
          />
          <BIconShieldLock class='form_icons'/>
        </div>

        <!-- LINK FOR LOGIN -->
        <RouterLink to="/signin" class="register">Already registered ?</RouterLink>

        <!-- REGISTER -->
        <input type="button" id="LoginUser" value="Create account" v-on:click="handleCreate()" />
      </form>
    </section>

    <!-- IMAGE RIGHT -->
    <div class="background"></div>
  </div>
</template>

<script>
import service from "../../services/user/service.user";
import { SET_CURRENT_USER } from "../../store/User";
import { BIconEnvelope, BIconPerson, BIconShieldLock } from "bootstrap-icons-vue";

document.getElementsByClassName("clocking")[0].style.display = "none";

export default {
  name: "SigninForm",

  // Icons
  components: {
    BIconEnvelope,
    BIconShieldLock,
    BIconPerson
  },
  data() {
    return {
      user: {},
    };
  },

  methods: {

    // CREATE USER
    handleCreate() {
      console.log(this.user);
      service
        .createUser(this.user)
        .then((response) => {
          this.$store.dispatch(SET_CURRENT_USER, response.data.data);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },

    // GET ON CHANGE
    handleChange(event) {
      this.user[event.target.id] = event.target.value;
    },
  },
};
</script>