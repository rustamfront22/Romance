<template>
  <div class="fixed inset-0 pointer-events-none" v-if="on">
    <span
      v-for="c in pieces"
      :key="c.id"
      class="confetti"
      :style="{
        left: c.x + '%',
        top: '-10px',
        width: c.w + 'px',
        height: c.h + 'px',
        animationDuration: c.d + 's',
        animationDelay: c.delay + 's',
        transform: `rotate(${c.r}deg)`,
        opacity: c.o
      }"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
const on = ref(false);
const pieces = ref([]);

function startConfetti(){
  on.value = true;
  const arr=[];
  for(let i=0;i<90;i++){
    arr.push({
      id: crypto.randomUUID?.() ?? String(Math.random()),
      x: Math.random()*100,
      w: 4 + Math.random()*8,
      h: 8 + Math.random()*14,
      d: 2.8 + Math.random()*2.8,
      delay: Math.random()*0.8,
      r: Math.random()*360,
      o: 0.6 + Math.random()*0.4
    });
  }
  pieces.value = arr;
  setTimeout(()=> on.value=false, 4200);
}
window.startConfetti = startConfetti;
</script>

<style scoped>
.confetti{
  position:absolute;
  background: linear-gradient(180deg, rgba(236,72,153,0.9), rgba(168,85,247,0.9));
  border-radius: 3px;
  animation: fall linear infinite;
}
@keyframes fall{
  0%{ transform: translateY(0) rotate(0deg); opacity:1; }
  100%{ transform: translateY(110vh) rotate(540deg); opacity:0.12; }
}
</style>