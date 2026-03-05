<template>
  <div v-if="show" class="gate">
    <div class="box">
      <div class="txt">Loading surprise for <b>Guli</b>… 💗</div>
      <div class="heart" :class="{ open: open }"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const show = ref(false);
const open = ref(false);

function start() {
  show.value = true;
  open.value = false;
  setTimeout(() => (open.value = true), 150);
}

function stop() {
  open.value = false;
  setTimeout(() => (show.value = false), 250);
}

defineExpose({ start, stop });
</script>

<style scoped>
.gate{
  position: fixed;
  inset: 0;
  z-index: 60;
  display: grid;
  place-items: center;
  background: radial-gradient(closest-side, rgba(255,255,255,0.55), rgba(255,255,255,0.92));
  backdrop-filter: blur(10px);
}
.box{ text-align:center; }
.txt{
  font-weight: 900;
  color: rgb(55,65,81);
  margin-bottom: 18px;
}
.heart{
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, rgb(236,72,153), rgb(168,85,247));
  transform: rotate(45deg) scale(0.85);
  border-radius: 18px;
  position: relative;
  box-shadow: 0 18px 60px rgba(236,72,153,0.35);
  transition: transform 900ms cubic-bezier(.2,.9,.2,1), filter 900ms;
  filter: blur(0px);
}
.heart::before, .heart::after{
  content:"";
  position:absolute;
  width: 120px;
  height: 120px;
  background: inherit;
  border-radius: 999px;
}
.heart::before{ left: -60px; top: 0; }
.heart::after{ top: -60px; left: 0; }

.heart.open{
  transform: rotate(45deg) scale(10);
  filter: blur(1px);
}
</style>