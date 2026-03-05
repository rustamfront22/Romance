<template>
  <div class="absolute inset-0">
    <div class="absolute inset-0 animated-bg"></div>

    <div class="absolute inset-0 pointer-events-none">
      <span
        v-for="p in particles"
        :key="p.id"
        class="particle"
        :style="{
          left: p.x + '%',
          top: p.y + '%',
          animationDuration: p.d + 's',
          animationDelay: p.delay + 's',
          transform: `scale(${p.s})`,
          opacity: p.o
        }"
      >
        {{ p.char }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
const { t } = inject("i18n");

const particles = ref([]);

onMounted(() => {
  const chars = ["🌸", "✨", "💫", `${t.value.girlName} 💞`];
  const arr = [];
  for (let i = 0; i < 22; i++) {
    arr.push({
      id: crypto.randomUUID?.() ?? String(Math.random()),
      x: Math.random() * 100,
      y: Math.random() * 100,
      d: 10 + Math.random() * 14,
      delay: Math.random() * 6,
      s: 0.55 + Math.random() * 1.2,
      o: 0.18 + Math.random() * 0.35,
      char: chars[Math.floor(Math.random() * chars.length)],
    });
  }
  particles.value = arr;
});
</script>

<style scoped>
.animated-bg{
  background: linear-gradient(120deg, rgba(255, 182, 193, 0.65), rgba(255, 228, 225, 0.55), rgba(216, 180, 254, 0.55));
  background-size: 260% 260%;
  animation: bgMove 12s ease-in-out infinite;
}
@keyframes bgMove {
  0% { background-position: 0% 30%; }
  50% { background-position: 100% 70%; }
  100% { background-position: 0% 30%; }
}
.particle{
  position:absolute;
  font-size:18px;
  white-space:nowrap;
  animation: floatUp ease-in-out infinite;
  user-select:none;
  will-change: transform, opacity;
}
@keyframes floatUp{
  0% { transform: translateY(0) scale(1); opacity: 0.15; }
  50% { transform: translateY(-18px) scale(1.05); opacity: 0.55; }
  100% { transform: translateY(0) scale(1); opacity: 0.15; }
}
</style>