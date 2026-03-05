<template>
  <div class="relative inline-flex items-center justify-center">
    <span class="crown">👑</span>
    <span class="name">{{ name }}</span>
  </div>
</template>

<script setup>
defineProps({ name: { type: String, required: true } });
</script>

<style scoped>
.name{
  font-weight: 900;
  font-size: clamp(36px, 6vw, 56px);
  letter-spacing: -0.02em;
  background: linear-gradient(90deg, rgb(236,72,153), rgb(244,63,94), rgb(168,85,247));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: popIn 480ms ease-out both;
}
.crown{
  position:absolute;
  top:-18px;
  left:50%;
  transform: translateX(-50%);
  filter: drop-shadow(0 8px 18px rgba(0,0,0,0.12));
  animation: crownFloat 2.2s ease-in-out infinite;
}
@keyframes popIn{
  0%{ transform: translateY(10px) scale(0.92); opacity:0; }
  100%{ transform: translateY(0) scale(1); opacity:1; }
}
@keyframes crownFloat{
  0%,100%{ transform: translateX(-50%) translateY(0); }
  50%{ transform: translateX(-50%) translateY(-6px); }
}
</style>