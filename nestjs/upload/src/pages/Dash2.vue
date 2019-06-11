<template>
  <div class="dashboard">
    <q-card class="card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)" >
      <div class="top">topo</div>
      <div class="content">meio</div>
      <div class="bottom">baixo</div>
    </q-card >
    <q-card class="card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)" >
      <div class="top">topo</div>
      <div class="content">meio</div>
      <div class="bottom">baixo</div>
    </q-card >
    <q-card class="card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)" >
      <div class="top">topo</div>
      <div class="content">meio</div>
      <div class="bottom">baixo</div>
    </q-card >
    <q-card class="card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)" >
      <div class="top">topo</div>
      <div class="content">meio</div>
      <div class="bottom">baixo</div>
    </q-card >
    <q-card class="card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)" >
      <div class="top">topo</div>
      <div class="content">meio</div>
      <div class="bottom">baixo</div>
    </q-card >
    <q-card class="card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)" >
      <div class="top">topo</div>
      <div class="content">meio</div>
      <div class="bottom">baixo</div>
    </q-card >
    <q-card class="card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)" >
      <div class="top">topo</div>
      <div class="content">meio</div>
      <div class="bottom">baixo</div>
    </q-card >
  </div>
</template>

<style>
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(365px, 1fr));
  grid-auto-rows: 220px;
  grid-gap: 10px;
  margin: 10px;
}
.card {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  padding: 10;
  /*justify-content: space-between;*/
}
.card > .top {
  display: flex;
  flex: 1 1 100%;
  justify-content: center;
}
.card > .content {
  display: flex;
  flex: 1 1 100%;
  justify-content: center;
}
.card > .bottom {
  flex: 1 1 100%;
}
</style>

<script>
// https://medium.com/mtholla/build-a-responsive-modern-dashboard-layout-with-css-grid-and-flexbox-bd343776a97e
// https://codepen.io/trooperandz/pen/YRpKjo
export default {
  name: 'PageIndex'
}
</script>
