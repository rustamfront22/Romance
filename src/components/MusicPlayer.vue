<template>
  <button class="player" @click="toggle" :title="isPlaying ? 'Pause' : 'Play'">
    <span class="icon">{{ isPlaying ? "⏸" : "▶️" }}</span>
    <span class="txt">
      {{ isPlaying ? (lang.value === "ru" ? "Музыка" : "Musiqa") : (lang.value === "ru" ? "Включить" : "Yoqish") }}
    </span>
    <span class="dot" :class="{ on: isPlaying }"></span>
  </button>

  <audio ref="audio" src="/music.mp3" preload="auto" loop></audio>
</template>

<script setup>
import { inject, onMounted, onBeforeUnmount, ref } from "vue";

const { lang } = inject("i18n");
const audio = ref(null);
const isPlaying = ref(false);

function fadeTo(target, ms = 700) {
  const a = audio.value;
  if (!a) return;
  const start = a.volume ?? 0;
  const steps = 20;
  const stepMs = ms / steps;
  let i = 0;

  const timer = setInterval(() => {
    i++;
    const v = start + ((target - start) * i) / steps;
    a.volume = Math.max(0, Math.min(1, v));
    if (i >= steps) clearInterval(timer);
  }, stepMs);
}

async function play() {
  const a = audio.value;
  if (!a) return;

  a.volume = 0;
  try {
    await a.play();
    isPlaying.value = true;
    fadeTo(0.25, 800);
    localStorage.setItem("gift_music", "on");
  } catch (e) {
    console.error("Music play blocked or file missing:", e);
    isPlaying.value = false;
    localStorage.setItem("gift_music", "off");
  }
}

function pause() {
  const a = audio.value;
  if (!a) return;

  fadeTo(0, 250);
  setTimeout(() => {
    a.pause();
    isPlaying.value = false;
    localStorage.setItem("gift_music", "off");
  }, 280);
}

function toggle() {
  if (isPlaying.value) pause();
  else play();
}

function onExternalPlay() { play(); }
function onExternalToggle() { toggle(); }
function onExternalPause() { pause(); }

onMounted(() => {
  // 1) глобальные хелперы, чтобы IntroPage мог включить музыку после клика
  window.__giftMusic = { play, pause, toggle };

  // 2) если раньше было включено — попробуем запустить
  const saved = localStorage.getItem("gift_music");
  if (saved === "on") play();
});

onBeforeUnmount(() => {
  if (window.__giftMusic) delete window.__giftMusic;
});
</script>

<style scoped>
.player{
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 50;

  display:flex;
  align-items:center;
  gap:10px;

  padding: 10px 14px;
  border-radius: 999px;

  background: rgba(255,255,255,0.72);
  border: 1px solid rgba(209,213,219,0.9);
  backdrop-filter: blur(10px);

  font-weight: 900;
  color: rgb(55,65,81);
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
}

.icon{ font-size: 16px; }
.txt{ font-size: 13px; }

.dot{
  width:10px;
  height:10px;
  border-radius:999px;
  background: rgba(107,114,128,0.35);
}
.dot.on{
  background: linear-gradient(90deg, rgb(236,72,153), rgb(168,85,247));
}
</style>