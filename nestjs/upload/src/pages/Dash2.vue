<template>
  <div class="dashboard">
    <q-card class="card" ontouchstart="this.classList.toggle('hover');">
      <div class="flipper">
        <div class="front">
          <div class="top">topo</div>
          <div class="content">meio</div>
          <div class="bottom">baixo</div>
        </div>
        <div class="back">
          <!-- back content -->
          fundo
        </div>
      </div>
    </q-card >
    <q-card class="card" ontouchstart="this.classList.toggle('hover');">
      <div class="flipper">
        <div class="front">
          <div class="top">topo</div>
          <div class="content">meio</div>
          <div class="bottom">baixo</div>
        </div>
        <div class="back">
          <!-- back content -->
          fundo
        </div>
      </div>
    </q-card >
    <q-card class="card" ontouchstart="this.classList.toggle('hover');">
      <div class="flipper">
        <div class="front">
          <div class="top">topo</div>
          <div class="content">meio</div>
          <div class="bottom">baixo</div>
        </div>
        <div class="back">
          <!-- back content -->
          fundo
        </div>
      </div>
    </q-card >
    <q-card class="card" ontouchstart="this.classList.toggle('hover');">
      <div class="flipper">
        <div class="front">
          <div class="top">topo</div>
          <div class="content">meio</div>
          <div class="bottom">baixo</div>
        </div>
        <div class="back">
          <!-- back content -->
          fundo
        </div>
      </div>
    </q-card >
    <q-card class="card" ontouchstart="this.classList.toggle('hover');">
      <div class="flipper">
        <div class="front">
          <div class="top">topo</div>
          <div class="content">meio</div>
          <div class="bottom">baixo</div>
        </div>
        <div class="back">
          <!-- back content -->
          fundo
        </div>
      </div>
    </q-card >
    <q-card class="card" ontouchstart="this.classList.toggle('hover');">
      <div class="flipper">
        <div class="front">
          <div class="top">topo</div>
          <div class="content">meio</div>
          <div class="bottom">baixo</div>
        </div>
        <div class="back">
          <!-- back content -->
          fundo
        </div>
      </div>
    </q-card >
    <q-card class="card" ontouchstart="this.classList.toggle('hover');">
      <div class="flipper">
        <div class="front">
          <div class="top">topo</div>
          <div class="content">meio</div>
          <div class="bottom">baixo</div>
        </div>
        <div class="back">
          <!-- back content -->
          fundo
        </div>
      </div>
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

  /* entire container, keeps perspective */
  .card {
    perspective: 0;
  }
  /* flip the pane when hovered */
  .card:hover .flipper, .card.hover .flipper {
    transform: rotateY(180deg);
  }

  .card {
    padding: 10;
    /*justify-content: space-between;*/
  }
  .top {
    display: flex;
    flex: 1 1 100%;
    justify-content: center;
  }
  .content {
    display: flex;
    flex: 1 1 100%;
    justify-content: center;
  }
  .bottom {
    flex: 1 1 100%;
  }

  /* flip speed goes here */
  .flipper {
    transition: 0.6s;
    transform-style: preserve-3d;
    position: relative;
  }

  /* hide back of pane during swap */
  .front, .back {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }

  /* front pane, placed above back */
  .front {
    z-index: 2;
    /* for firefox 31 */
    transform: rotateY(0deg);
    background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);
  }

  /* back, initially hidden pane */
  .back {
    transform: rotateY(180deg);
    background-color: grey;
  }

  .card, .flipper, .front, .back {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }
</style>

<script>
// https://medium.com/mtholla/build-a-responsive-modern-dashboard-layout-with-css-grid-and-flexbox-bd343776a97e
// https://codepen.io/trooperandz/pen/YRpKjo
export default {
  name: 'PageIndex'
}
</script>
