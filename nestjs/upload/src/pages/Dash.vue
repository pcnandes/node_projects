<template>
  <div class="main-overview">
    <div class="overviewcard">
      <div>Overview</div>
      <div>Card</div>
    </div>
    <div class="overviewcard">
      <div>Overview</div>
      <div>Card</div>
    </div>
    <div class="overviewcard">
      <div>Overview</div>
      <div>Card</div>
    </div>
    <div class="overviewcard">
      <div>Overview</div>
      <div>Card</div>
    </div>
    <div class="overviewcard">
      <div>Overview</div>
      <div>Card</div>
    </div>
    <div class="overviewcard">
      <div>Overview</div>
      <div>Card</div>
    </div>
  </div>
</template>

<style>
.main-overview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(365px, 1fr));
  grid-auto-rows: 220px;
  grid-gap: 10px;
  margin: 10px;
}
.overviewcard {
  display: flex;
  align-items: center;
  padding: 10;
  background-color: #d3d3;
}
</style>

<script>
// https://medium.com/mtholla/build-a-responsive-modern-dashboard-layout-with-css-grid-and-flexbox-bd343776a97e
// https://codepen.io/trooperandz/pen/YRpKjo
export default {
  name: 'PageIndex'
}
</script>
