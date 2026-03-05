<template>
  <main class="min-h-screen w-full relative overflow-hidden px-4">
    <!-- Animated gradient background -->
    <div class="absolute inset-0 animated-bg"></div>

    <!-- Floating background particles -->
    <div class="absolute inset-0 pointer-events-none">
      <span
        v-for="p in bgParticles"
        :key="p.id"
        class="bg-particle"
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

    <!-- Hearts burst particles -->
    <div class="absolute inset-0 pointer-events-none">
      <span
        v-for="h in burstHearts"
        :key="h.id"
        class="burst-heart"
        :style="{
          left: h.x + 'px',
          top: h.y + 'px',
          '--dx': h.dx + 'px',
          '--dy': h.dy + 'px',
          '--dur': h.dur + 'ms',
          '--rot': h.rot + 'deg',
          '--scale': h.scale
        }"
      >
        💗
      </span>
    </div>

    <!-- Confetti -->
    <div class="absolute inset-0 pointer-events-none" v-if="confettiOn">
      <span
        v-for="c in confetti"
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

    <!-- Content -->
    <div class="relative min-h-screen flex items-center justify-center">
      <div class="w-full max-w-xl">
        <div class="rounded-3xl bg-white/70 backdrop-blur-md shadow-2xl border border-white/60 overflow-hidden">
          <div class="h-2 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400"></div>

          <div class="p-6 sm:p-8">
            <!-- Header -->
            <div class="flex items-start justify-between gap-3">
              <div class="min-w-0">
                <p class="text-sm text-gray-500">{{ t.mini }}</p>

                <button
                  class="text-left w-full"
                  @click="titleClick"
                  title="😉"
                >
                  <h1 class="text-2xl sm:text-3xl font-semibold text-gray-800 leading-tight">
                    {{ t.title }}
                  </h1>
                </button>

                <p class="mt-2 text-sm text-gray-600">
                  {{ t.helloPrefix }}
                  <span class="font-semibold text-gray-800">{{ girlName }}</span>
                  <span class="text-gray-600"> — </span>
                  {{ t.helloSuffix }}
                </p>
              </div>

              <!-- Controls -->
              <div class="shrink-0 flex flex-col gap-2 items-end">
                <div class="flex gap-2">
                  <button @click="lang = 'ru'" :class="langBtnClass('ru')">RU</button>
                  <button @click="lang = 'uz'" :class="langBtnClass('uz')">UZ</button>
                </div>

                <div class="flex gap-2">
                  <button
                    class="pill"
                    @click="copyLink"
                  >
                    {{ copied ? t.copied : t.copy }}
                  </button>

                  <button class="pill" @click="soundOn = !soundOn">
                    {{ soundOn ? t.soundOn : t.soundOff }}
                  </button>
                </div>

                <div class="text-right">
                  <p class="text-xs text-gray-500">{{ t.qLabel }}</p>
                  <p class="text-sm font-medium text-gray-800">
                    {{ Math.min(step + 1, questions.length) }} / {{ questions.length }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Question -->
            <div class="mt-6">
              <transition name="pop" mode="out-in">
                <div :key="step" class="select-none">
                  <p class="text-base sm:text-lg text-gray-800 font-semibold">
                    {{ currentQuestion.text }}
                  </p>

                  <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      v-for="(opt, idx) in currentQuestion.options"
                      :key="idx"
                      class="option"
                      @click="pick(opt, $event)"
                      :disabled="locked"
                    >
                      <span class="optionGlow"></span>
                      <span class="relative flex items-center justify-between">
                        <span class="text-gray-800">{{ opt }}</span>
                        <span class="text-gray-400 group-hover:text-gray-600 transition-colors">→</span>
                      </span>
                    </button>
                  </div>

                  <!-- Feedback -->
                  <div class="mt-5 min-h-[62px]">
                    <transition name="fade">
                      <div
                        v-if="feedback"
                        class="rounded-2xl px-4 py-3 border bg-pink-50 border-pink-200 text-gray-800"
                      >
                        <span class="font-semibold">{{ t.note }}</span> {{ feedback }}
                      </div>
                    </transition>
                  </div>

                  <!-- Next -->
                  <div class="mt-3 flex items-center justify-between">
                    <button
                      class="text-sm text-gray-500 hover:text-gray-800 transition-colors"
                      @click="reset"
                    >
                      {{ t.reset }}
                    </button>

                    <button
                      class="cta"
                      @click="next"
                      :disabled="!canGoNext"
                    >
                      {{ step < questions.length - 1 ? t.next : t.finish }}
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>

          <div class="px-6 sm:px-8 pb-6">
            <div class="rounded-2xl bg-white/60 border border-white/60 px-4 py-3 text-xs sm:text-sm text-gray-700">
              ✨ {{ t.tip }}
            </div>
          </div>
        </div>

        <!-- Secret toast -->
        <transition name="fade">
          <div
            v-if="secretToast"
            class="mt-4 rounded-2xl bg-white/70 backdrop-blur border border-white/60 shadow-lg px-4 py-3 text-sm text-gray-800"
          >
            {{ secretToast }}
          </div>
        </transition>
      </div>

      <!-- Final modal -->
      <transition name="fade">
        <div v-if="showFinal" class="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div class="w-full max-w-md rounded-3xl bg-white shadow-2xl border border-white/60 overflow-hidden">
            <div class="h-2 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400"></div>

            <div class="p-6 sm:p-7 text-center">
              <div class="text-5xl">💞</div>
              <h2 class="mt-2 text-2xl font-semibold text-gray-800">
                {{ t.finalTitle }}
              </h2>

              <p class="mt-3 text-gray-700 leading-relaxed">
                <span class="font-semibold">{{ girlName }}</span>,
                <span> </span>
                <span class="typewriter">{{ finalTyped }}</span>
                <span class="cursor" v-if="typing"></span>
              </p>

              <div class="mt-6 grid grid-cols-1 gap-3">
                <button class="cta w-full" @click="resetFromFinal">
                  {{ t.playAgain }}
                </button>

                <button
                  class="w-full rounded-2xl px-4 py-3 font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                  @click="showFinal = false"
                >
                  {{ t.close }}
                </button>
              </div>

              <p class="mt-4 text-xs text-gray-500">
                {{ t.small }}
              </p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

/** Personalization (меняй тут) */
const girlName = "Мадина"; // ← поменяй имя как нужно

const lang = ref("ru");
const soundOn = ref(true);

const translations = {
  ru: {
    mini: "Мини-игра",
    title: "Выбери правильный ответ 🌸",
    helloPrefix: "Для тебя,",
    helloSuffix: "— нажми любой вариант 😉",
    qLabel: "вопрос",
    note: "Секрет:",
    tip: "Подсказка: тут нет неправильных ответов 😌",
    next: "Дальше",
    finish: "Финал",
    reset: "Сначала",
    copy: "Ссылка",
    copied: "Скопировано ✅",
    soundOn: "Звук: ON",
    soundOff: "Звук: OFF",
    finalTitle: "Правильный ответ: Ты 💞",
    finalText: "ты реально самая милая. Я просто хотел(а) сделать тебе настроение ✨",
    playAgain: "Пройти ещё раз 💗",
    close: "Закрыть",
    small: "P.S. Нажми 3 раза на заголовок 😉",
    secret1: "Опа… ты нашла секрет 😄",
    secret2: "Если ты улыбаешься — миссия выполнена 💗",
    questions: [
      { text: "Кто самый милый человек сегодня?", options: ["Ты", "Котик", "Я", "Никто"] },
      { text: "Что делает день лучше всего?", options: ["Твоя улыбка", "Сладкое", "Музыка", "Сон"] },
      { text: "Какой режим тебе подходит?", options: ["Принцесса ✨", "Кошечка 🐾", "Босс 💼", "Ниндзя 🥷"] },
      { text: "Главный факт на сегодня:", options: ["Ты лучшая", "Ты прекрасная", "Ты умница", "Ты всё вместе 💗"] },
    ],
    pickPhrases: [
      (opt) => `“${opt}” — хороший выбор 😄`,
      (opt) => `Записал: “${opt}” ✍️`,
      (opt) => `Проверяю вариант: “${opt}”… ✅`,
    ],
    correct: "Но правильный ответ всё равно: Ты 💞",
  },
  uz: {
    mini: "Kichkina o‘yin",
    title: "To‘g‘ri javobni tanla 🌸",
    helloPrefix: "Senga,",
    helloSuffix: "— istalganini bos 😉",
    qLabel: "savol",
    note: "Sir:",
    tip: "Maslahat: bu yerda noto‘g‘ri javob yo‘q 😌",
    next: "Keyingi",
    finish: "Yakun",
    reset: "Boshidan",
    copy: "Link",
    copied: "Nusxa olindi ✅",
    soundOn: "Ovoz: ON",
    soundOff: "Ovoz: OFF",
    finalTitle: "To‘g‘ri javob: Sen 💞",
    finalText: "sen rostdan ham eng yoqimlisan. Kayfiyating uchun shunaqa kichkina narsa qildim ✨",
    playAgain: "Yana o‘ynash 💗",
    close: "Yopish",
    small: "P.S. Sarlavhani 3 marta bos 😉",
    secret1: "Voy… sirni topding 😄",
    secret2: "Agar jilmaygan bo‘lsang — maqsad bajarildi 💗",
    questions: [
      { text: "Bugun eng yoqimli inson kim?", options: ["Sen", "Mushukcha", "Men", "Hech kim"] },
      { text: "Kunimni nima chiroyli qiladi?", options: ["Sening tabassuming", "Shirinlik", "Musiqa", "Uyqu"] },
      { text: "Qaysi rol senga mos?", options: ["Malika ✨", "Mushukcha 🐾", "Boss 💼", "Ninja 🥷"] },
      { text: "Bugungi eng katta fakt:", options: ["Sen zo‘rsan", "Sen chiroylisan", "Sen aqllisan", "Barchasi 💗"] },
    ],
    pickPhrases: [
      (opt) => `“${opt}” — zo‘r tanlov 😄`,
      (opt) => `Yozib oldim: “${opt}” ✍️`,
      (opt) => `Tekshiryapman: “${opt}”… ✅`,
    ],
    correct: "Lekin baribir to‘g‘ri javob: Sen 💞",
  },
};

const t = computed(() => translations[lang.value]);
const questions = computed(() => t.value.questions);

const step = ref(0);
const feedback = ref("");
const locked = ref(false);
const showFinal = ref(false);
const copied = ref(false);

// Typewriter
const finalTyped = ref("");
const typing = ref(false);

// Secret
const titleClicks = ref([]);
const secretToast = ref("");

const currentQuestion = computed(() => questions.value[step.value]);
const canGoNext = computed(() => !!feedback.value && !locked.value);

// ===== Background particles =====
const bgParticles = ref([]);
function makeBgParticles() {
  const chars = ["✨", "🌸", "💫", "💗"];
  const arr = [];
  for (let i = 0; i < 24; i++) {
    arr.push({
      id: crypto.randomUUID?.() ?? String(Math.random()),
      x: Math.random() * 100,
      y: Math.random() * 100,
      d: 10 + Math.random() * 14,
      delay: Math.random() * 6,
      s: 0.6 + Math.random() * 1.2,
      o: 0.25 + Math.random() * 0.35,
      char: chars[Math.floor(Math.random() * chars.length)],
    });
  }
  bgParticles.value = arr;
}

// ===== Hearts burst =====
const burstHearts = ref([]);
function addBurst(x, y) {
  const count = 12;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
    const power = 40 + Math.random() * 70;
    const dx = Math.cos(angle) * power;
    const dy = Math.sin(angle) * power - (30 + Math.random() * 30);
    const h = {
      id: crypto.randomUUID?.() ?? String(Math.random()),
      x,
      y,
      dx,
      dy,
      dur: 700 + Math.floor(Math.random() * 500),
      rot: -30 + Math.random() * 60,
      scale: 0.8 + Math.random() * 0.8,
    };
    burstHearts.value.push(h);
    setTimeout(() => {
      burstHearts.value = burstHearts.value.filter((z) => z.id !== h.id);
    }, h.dur + 50);
  }
}

// ===== Confetti =====
const confettiOn = ref(false);
const confetti = ref([]);
function startConfetti() {
  confettiOn.value = true;
  const arr = [];
  for (let i = 0; i < 90; i++) {
    arr.push({
      id: crypto.randomUUID?.() ?? String(Math.random()),
      x: Math.random() * 100,
      w: 4 + Math.random() * 8,
      h: 8 + Math.random() * 14,
      d: 2.8 + Math.random() * 2.8,
      delay: Math.random() * 0.8,
      r: Math.random() * 360,
      o: 0.6 + Math.random() * 0.4,
    });
  }
  confetti.value = arr;
  setTimeout(() => (confettiOn.value = false), 4200);
}

// ===== Tiny sound (no music, just cute pop) =====
let audioCtx;
function popSound() {
  if (!soundOn.value) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = "triangle";
    o.frequency.setValueAtTime(640, audioCtx.currentTime);
    o.frequency.exponentialRampToValueAtTime(320, audioCtx.currentTime + 0.08);

    g.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.12);

    o.connect(g);
    g.connect(audioCtx.destination);
    o.start();
    o.stop(audioCtx.currentTime + 0.13);
  } catch {
    // ignore
  }
}

// ===== Actions =====
function pick(option, evt) {
  if (locked.value) return;

  // burst hearts from click position
  const rect = evt.currentTarget.getBoundingClientRect();
  addBurst(rect.left + rect.width * 0.5, rect.top + rect.height * 0.5);
  popSound();

  locked.value = true;

  const phrases = t.value.pickPhrases;
  const first = phrases[Math.floor(Math.random() * phrases.length)](option);
  feedback.value = first;

  setTimeout(() => {
    feedback.value = `${first}. ${t.value.correct}`;
    locked.value = false;
  }, 650);
}

function next() {
  if (!feedback.value) return;
  popSound();

  if (step.value < questions.value.length - 1) {
    step.value += 1;
    feedback.value = "";
    locked.value = false;
  } else {
    showFinal.value = true;
    startConfetti();
    runTypewriter(t.value.finalText);
  }
}

function reset() {
  step.value = 0;
  feedback.value = "";
  locked.value = false;
  showFinal.value = false;
  finalTyped.value = "";
  typing.value = false;
}

function resetFromFinal() {
  reset();
  // small burst for wow
  setTimeout(() => {
    addBurst(window.innerWidth * 0.5, window.innerHeight * 0.35);
  }, 120);
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copied.value = true;
    popSound();
    setTimeout(() => (copied.value = false), 1200);
  } catch {
    // fallback: nothing
    copied.value = true;
    setTimeout(() => (copied.value = false), 1200);
  }
}

function runTypewriter(text) {
  finalTyped.value = "";
  typing.value = true;
  let i = 0;
  const timer = setInterval(() => {
    finalTyped.value += text[i] ?? "";
    i++;
    if (i >= text.length) {
      clearInterval(timer);
      typing.value = false;
      // extra wow
      setTimeout(() => startConfetti(), 500);
    }
  }, 26);
}

function titleClick() {
  const now = Date.now();
  titleClicks.value = titleClicks.value.filter((t) => now - t < 1000);
  titleClicks.value.push(now);

  if (titleClicks.value.length >= 3) {
    // secret unlocked
    secretToast.value = `${t.value.secret1} ${t.value.secret2}`;
    popSound();
    startConfetti();
    setTimeout(() => (secretToast.value = ""), 2500);
    titleClicks.value = [];
  } else {
    // tiny burst each click
    addBurst(window.innerWidth * 0.33 + Math.random() * 40, window.innerHeight * 0.18 + Math.random() * 40);
  }
}

function langBtnClass(code) {
  return `
    px-3 py-1 rounded-full text-sm font-semibold border transition
    ${lang.value === code
      ? "bg-pink-500 text-white border-pink-500"
      : "bg-white/80 text-gray-700 border-gray-300 hover:bg-white"}
  `;
}

onMounted(() => {
  makeBgParticles();
});
</script>

<style>
/* Animated background */
.animated-bg {
  background: linear-gradient(120deg, rgba(255, 182, 193, 0.65), rgba(255, 228, 225, 0.55), rgba(216, 180, 254, 0.55));
  background-size: 260% 260%;
  animation: bgMove 12s ease-in-out infinite;
  filter: saturate(1.05);
}
@keyframes bgMove {
  0% { background-position: 0% 30%; }
  50% { background-position: 100% 70%; }
  100% { background-position: 0% 30%; }
}

/* Background particles */
.bg-particle {
  position: absolute;
  font-size: 20px;
  animation: floatUp ease-in-out infinite;
  user-select: none;
  will-change: transform, opacity;
}
@keyframes floatUp {
  0% { transform: translateY(0) scale(1); opacity: 0.15; }
  50% { transform: translateY(-18px) scale(1.05); opacity: 0.55; }
  100% { transform: translateY(0) scale(1); opacity: 0.15; }
}

/* Option button */
.option {
  position: relative;
  border-radius: 18px;
  padding: 12px 14px;
  text-align: left;
  font-weight: 700;
  background: rgba(255,255,255,0.92);
  border: 1px solid rgba(209,213,219,0.95);
  transition: transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease;
  overflow: hidden;
}
.option:hover { transform: translateY(-2px); box-shadow: 0 14px 26px rgba(0,0,0,0.08); }
.option:active { transform: translateY(0); }
.option:disabled { opacity: 0.6; cursor: not-allowed; }
.option .optionGlow {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 180ms ease;
  background: linear-gradient(90deg, rgba(251,207,232,0.65), rgba(254,205,211,0.65), rgba(221,214,254,0.65));
}
.option:hover .optionGlow { opacity: 1; }

/* CTA */
.cta {
  border-radius: 18px;
  padding: 10px 16px;
  font-weight: 800;
  font-size: 14px;
  color: white;
  background: linear-gradient(90deg, rgb(236,72,153), rgb(244,63,94), rgb(168,85,247));
  transition: opacity 180ms ease, transform 180ms ease;
}
.cta:hover { opacity: 0.96; }
.cta:active { opacity: 0.9; transform: translateY(1px); }
.cta:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

/* Pills */
.pill {
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid rgba(209,213,219,0.9);
  background: rgba(255,255,255,0.75);
  color: rgb(55,65,81);
  transition: background 160ms ease;
}
.pill:hover { background: rgba(255,255,255,0.95); }

/* Burst hearts */
.burst-heart {
  position: absolute;
  font-size: 18px;
  transform: translate(-50%, -50%) scale(var(--scale)) rotate(var(--rot));
  animation: burst var(--dur) ease-out forwards;
  will-change: transform, opacity;
}
@keyframes burst {
  0% { opacity: 0; transform: translate(-50%, -50%) scale(var(--scale)) rotate(var(--rot)); }
  10% { opacity: 1; }
  100% {
    opacity: 0;
    transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy)))
      scale(calc(var(--scale) * 0.8))
      rotate(calc(var(--rot) + 30deg));
  }
}

/* Confetti (CSS-only, but looks great) */
.confetti {
  position: absolute;
  background: linear-gradient(180deg, rgba(236,72,153,0.9), rgba(168,85,247,0.9));
  border-radius: 3px;
  animation: confettiFall linear infinite;
}
@keyframes confettiFall {
  0% { transform: translateY(0) rotate(0deg); opacity: 1; }
  100% { transform: translateY(110vh) rotate(540deg); opacity: 0.1; }
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 180ms ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.pop-enter-active, .pop-leave-active { transition: transform 220ms ease, opacity 220ms ease; }
.pop-enter-from, .pop-leave-to { opacity: 0; transform: translateY(10px) scale(0.985); }

/* Typewriter cursor */
.cursor {
  display: inline-block;
  width: 10px;
  height: 18px;
  margin-left: 2px;
  background: rgba(236,72,153,0.8);
  animation: blink 0.9s steps(1) infinite;
  border-radius: 2px;
  vertical-align: -3px;
}
@keyframes blink {
  50% { opacity: 0; }
}
</style>