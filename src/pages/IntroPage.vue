<template>
  <div class="text-center">
    <CrownName :name="t.girlName + ' 💞'" />

    <p class="mt-4 text-gray-700 text-base sm:text-lg">
      {{ t.introSub }}
    </p>

    <div class="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
      <button class="cta" @click="go">
        {{ t.open }}
      </button>
      <button class="soft" @click="secret">
        🌸 Tap / Click
      </button>
    </div>

    <p v-if="toast" class="mt-4 text-sm text-gray-700 bg-white/60 border border-white/60 rounded-2xl px-4 py-3">
      {{ toast }}
    </p>
  </div>
  <HeartGate ref="gate" />
</template>

<script setup>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import CrownName from "../components/CrownName.vue";
import HeartGate from "../components/HeartGate.vue";

const { t, lang } = inject("i18n");
const router = useRouter();
const toast = ref("");
const gate = ref(null);


async function openSurprise(){
  // 1) включаем музыку по клику (точно не блокируется)
  window.__giftMusic?.play?.();

  // 2) вау-портал
  gate.value?.start();

  // 3) конфетти/сердечки (по желанию)
  window.startConfetti?.();

  // 4) ждём анимацию и переходим
  setTimeout(() => {
    router.push("/quiz"); // или куда ты ведёшь после intro
  }, 900);
}

function go(){
  window.startConfetti?.();
  router.push("/quiz");
}

function secret(){
  window.burstHearts?.(window.innerWidth*0.5, window.innerHeight*0.35);
  toast.value = lang.value === "ru"
    ? "Ты только что запустила магию ✨"
    : "Hozirgina sehr ishga tushdi ✨";
  setTimeout(()=> toast.value="", 1600);
}
</script>

<style scoped>
.cta{
  border-radius: 18px;
  padding: 12px 18px;
  font-weight: 900;
  color: white;
  background: linear-gradient(90deg, rgb(236,72,153), rgb(244,63,94), rgb(168,85,247));
  transition: opacity 180ms ease, transform 180ms ease;
}
.cta:hover{ opacity:0.96; }
.cta:active{ transform: translateY(1px); }

.soft{
  border-radius: 18px;
  padding: 12px 18px;
  font-weight: 800;
  background: rgba(255,255,255,0.75);
  border: 1px solid rgba(209,213,219,0.9);
  color: rgb(55,65,81);
}
</style>