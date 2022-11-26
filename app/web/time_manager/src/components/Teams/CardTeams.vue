<template>
  <div class="card-main">
    <div class="card-header"><BIconThreeDotsVertical class="card-icons" /></div>
    <div class="card-content">
      <p class="card-content-title">{{ this?.team?.name }}</p>
      <p class="card-content-description">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus quos
        error aperiam rem molestias quis tenetur dolores velit iste possimus.
      </p>
    </div>
    <div class="card-footer">
      <div class="card-footer-content">
        <p>{{ this.usersLength }}</p>
        <p>Members</p>
      </div>
    </div>
  </div>
</template>

<script>
import { BIconThreeDotsVertical } from "bootstrap-icons-vue";

export default {
  name: "CardTeams",
  components: {
    BIconThreeDotsVertical,
  },
  props: {
    team: {
      type: Object,
      required: true,
    },
  },
  computed: {
    usersLength() {
      return this?.team?.users.length;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Work+Sans&display=swap");
.card-main {
  width: 325px;
  height: 325px;
  display: flex;
  flex-direction: column;
  background-color: #2b3241;
  border-radius: 10px;
  border: 2px solid #2b3241;
  transition: 1s;
  padding: 20px;
  cursor: pointer;
}

.card-main:hover {
  border: 2px solid #5f6f90;
  transition: 1s;
}

.card-header {
  display: flex;
  justify-content: flex-end;
}

.card-icons {
  font-size: 20px;
  color: #fff;
  cursor: pointer;
}

.card-content {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 20px;
  gap: 10px;
}

.card-content-title {
  font-size: 30px;
  color: #fff;
  font-weight: bold;
  font-family: "Work Sans", sans-serif;
}
.card-content-description {
  font-family: "Work Sans", sans-serif;
}

.card-footer {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  margin-top: 40px;
}

.card-footer-content {
  display: flex;
  align-items: center;
  flex-direction: row;
  width: 100%;
  gap: 10px;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-size: 16px;
  color: #fff;
}
</style>
