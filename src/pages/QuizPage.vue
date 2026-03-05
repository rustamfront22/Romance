<template>
  <div>
    <h2 class="text-2xl font-black text-gray-800">{{ t.quizTitle }}</h2>
    <p class="text-gray-600 mt-1">{{ t.quizSub }}</p>

    <div class="mt-6 rounded-3xl bg-white/70 border border-white/60 p-5">
      <p class="text-lg sm:text-xl font-extrabold text-gray-800">
        {{ current.q }}
      </p>

      <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          v-for="(a, idx) in current.a"
          :key="idx"
          class="ans"
          @click="pick"
        >
          {{ a }}
        </button>
      </div>

      <div v-if="revealed" class="mt-5 rounded-2xl bg-pink-50 border border-pink-200 p-4">
        <div class="text-sm text-gray-700">
          <b>{{ t.quizCorrect }}</b> {{ t.girlName }} 💞
        </div>
      </div>

      <div class="mt-6 flex flex-col sm:flex-row gap-3">
        <button class="cta" @click="nextStep">
          {{ step < questions.length - 1 ? t.quizNext : t.quizDone }}
        </button>
        <button class="soft" @click="goLetter">
          {{ t.letterBtn }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, inject, ref } from "vue";
import { useRouter } from "vue-router";

const { t, lang } = inject("i18n");
const router = useRouter();

const step = ref(0);
const revealed = ref(false);

const questions = computed(() => {
  if (lang.value === "uz") {
    return [
      { q: "Bugun eng yoqimli inson kim? 💗", a: ["Sen", "Mushukcha", "Men", "Hech kim"] },
      { q: "Kimning tabassumi eng chiroyli? ✨", a: ["Sen", "Bahor", "Quyosh", "Yulduzlar"] },
      { q: "Kim mening qalbimdagi eng alohida? 🌸", a: ["Sen", "Baxt", "Orzular", "Sevgi"] },
      { q: "Eng chiroyli ism qaysi? 👑", a: ["Guli", "Guli 💞", "Guli ✨", "Baribir Guli"] },
    ];
  }
  return [
    { q: "Кто самый милый человек сегодня? 💗", a: ["Ты", "Котик", "Я", "Никто"] },
    { q: "У кого самая красивая улыбка? ✨", a: ["Ты", "Весна", "Солнце", "Звёзды"] },
    { q: "Кто самый особенный для меня? 🌸", a: ["Ты", "Счастье", "Мечты", "Любовь"] },
    { q: "Какое имя самое красивое? 👑", a: ["Guli", "Guli 💞", "Guli ✨", "Всё равно Guli"] },
  ];
});

const current = computed(() => questions.value[step.value]);

function pick(e){
  revealed.value = true;
  window.burstHearts?.(e.clientX, e.clientY);
  setTimeout(() => window.startConfetti?.(), 120);
}

function nextStep(){
  if (step.value < questions.value.length - 1) {
    step.value++;
    revealed.value = false;
  } else {
    window.startConfetti?.();
    router.push("/letter");
  }
}

function goLetter(){
  router.push("/letter");
}
</script>

<style scoped>
.ans{
  border-radius: 18px;
  padding: 12px 14px;
  font-weight: 800;
  background: rgba(255,255,255,0.85);
  border: 1px solid rgba(209,213,219,0.9);
  color: rgb(55,65,81);
  transition: transform 140ms ease, opacity 140ms ease;
}
.ans:hover{ opacity:0.96; }
.ans:active{ transform: translateY(1px); }

.cta{
  border-radius: 18px;
  padding: 12px 18px;
  font-weight: 900;
  color: white;
  background: linear-gradient(90deg, rgb(236,72,153), rgb(244,63,94), rgb(168,85,247));
}
.soft{
  border-radius: 18px;
  padding: 12px 18px;
  font-weight: 800;
  background: rgba(255,255,255,0.75);
  border: 1px solid rgba(209,213,219,0.9);
  color: rgb(55,65,81);
}
</style>