<template>
  <div id="check-button">
    <div class="check-button" :class="{ check: value }" @click="btnClick">
      <img src="~assets/img/cart/tick.svg" alt="" />
    </div>
  </div>
</template>
<script>
export default {
  name: "CheckButton",
  props: {
    value: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  methods: {
    btnClick() {
      this.$emit("btnClick");
    },
  },
  watch: {
    value: function (newValue) {
      this.checked = newValue;
    },
  },
};
</script>
<style scoped>
.check-button {
  border-radius: 50%;
  border: 2px solid #aaa;
}
.check {
  border-color: red;
  background-color: red;
}
</style>
