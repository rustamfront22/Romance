<template>
  <div class="fixed inset-0 pointer-events-none">
    <span
      v-for="h in hearts"
      :key="h.id"
      class="burst"
      :style="{
        left: h.x + 'px',
        top: h.y + 'px',
        '--dx': h.dx + 'px',
        '--dy': h.dy + 'px',
        '--dur': h.dur + 'ms',
        '--rot': h.rot + 'deg',
        '--scale': h.scale
      }"
    >💗</span>
  </div>
</template>

<script setup>
import { ref } from "vue";
const hearts = ref([]);

function burst(x, y){
  const count = 12;
  for(let i=0;i<count;i++){
    const angle = (Math.PI*2*i)/count + Math.random()*0.25;
    const power = 45 + Math.random()*70;
    const h = {
      id: crypto.randomUUID?.() ?? String(Math.random()),
      x, y,
      dx: Math.cos(angle)*power,
      dy: Math.sin(angle)*power - (30+Math.random()*25),
      dur: 700 + Math.floor(Math.random()*500),
      rot: -30 + Math.random()*60,
      scale: 0.8 + Math.random()*0.8
    };
    hearts.value.push(h);
    setTimeout(()=> hearts.value = hearts.value.filter(z=>z.id!==h.id), h.dur+50);
  }
}

// делаем глобальную функцию window.burstHearts(...)
window.burstHearts = burst;
</script>

<style scoped>
.burst{
  position:absolute;
  transform: translate(-50%,-50%) scale(var(--scale)) rotate(var(--rot));
  animation: burst var(--dur) ease-out forwards;
  will-change: transform, opacity;
  font-size: 18px;
}
@keyframes burst{
  0%{ opacity:0; transform: translate(-50%,-50%) scale(var(--scale)) rotate(var(--rot)); }
  10%{ opacity:1; }
  100%{
    opacity:0;
    transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy)))
      scale(calc(var(--scale) * 0.8))
      rotate(calc(var(--rot) + 30deg));
  }
}
</style>