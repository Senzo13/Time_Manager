<template>
  <div v-bind:class="{ 'main-blur': this.isActive, 'none': !this.isActive }">
    <div class="success">
      <BIconCheckCircle class="icon" />
      <p class="text">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import { BIconCheckCircle } from "bootstrap-icons-vue";

export default {
  name: "Success",
  components: {
    BIconCheckCircle,
  },
  props: {
    message: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.none {
  display: none;
}

.main-blur {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
}

.success {
  position: absolute;
  bottom: 2%;
  left: 1%;
  width: 100%;
  background-color: #2b3241;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 350px;
  gap: 10px;	
}

.text {
  color: green;
  font-size: 18px;
  margin: 0;
  font-weight: bold;
}

.icon {
  color: green;
  font-size: 25px;
  font-weight: bold;
}
</style>
