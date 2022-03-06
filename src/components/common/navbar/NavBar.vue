<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="rigth"></slot></div>
  </div>
</template>
<script>
export default {
  name: "NavBar",
};
</script>
<style scoped>
.nav-bar {
  display: flex;
  text-align: center;
  line-height: 44px;
  box-shadow: 0 1px 1px rgba(100, 100, 100, 1);
  /* height: 44px; */
}

.left,
.right {
  width: 60px;
  /* background-color: red; */
}

.center {
  flex: 1;
  /* background-color: green; */
}
</style>
