<template>
  <main class="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 px-4">
    <div class="w-full max-w-xl">
      <div class="rounded-3xl bg-white/70 backdrop-blur-md shadow-xl border border-white/60 overflow-hidden">
        
        <!-- top line -->
        <div class="h-2 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400"></div>

        <div class="p-6 sm:p-8">

          <!-- HEADER -->
          <div class="flex justify-between items-start">

            <div>
              <p class="text-sm text-gray-500">
                {{ t.mini }}
              </p>
              <h1 class="text-2xl sm:text-3xl font-semibold text-gray-800">
                {{ t.title }}
              </h1>
            </div>

            <!-- LANGUAGE SWITCH -->
            <div class="flex gap-2">
              <button
                @click="lang = 'ru'"
                :class="langBtnClass('ru')"
              >
                RU
              </button>
              <button
                @click="lang = 'uz'"
                :class="langBtnClass('uz')"
              >
                UZ
              </button>
            </div>

          </div>

          <!-- QUESTION -->
          <div class="mt-6">
            <transition name="pop" mode="out-in">
              <div :key="step">

                <p class="text-lg font-medium text-gray-800">
                  {{ currentQuestion.text }}
                </p>

                <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    v-for="(opt, idx) in currentQuestion.options"
                    :key="idx"
                    class="rounded-2xl px-4 py-3 text-left font-medium
                           bg-white shadow-sm border border-gray-200
                           hover:shadow-md hover:-translate-y-0.5
                           transition-all duration-200"
                    @click="pick(opt)"
                  >
                    {{ opt }}
                  </button>
                </div>

                <div class="mt-5 min-h-[56px]">
                  <transition name="fade">
                    <div
                      v-if="feedback"
                      class="rounded-2xl px-4 py-3 border bg-pink-50 border-pink-200 text-gray-800"
                    >
                      {{ feedback }}
                    </div>
                  </transition>
                </div>

                <div class="mt-4 flex justify-end">
                  <button
                    class="rounded-2xl px-4 py-2 text-sm font-semibold text-white
                           bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500"
                    @click="next"
                    :disabled="!feedback"
                  >
                    {{ step < questions.length - 1 ? t.next : t.finish }}
                  </button>
                </div>

              </div>
            </transition>
          </div>

        </div>
      </div>

      <!-- FINAL -->
      <transition name="fade">
        <div v-if="showFinal" class="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div class="w-full max-w-md rounded-3xl bg-white shadow-2xl overflow-hidden">
            <div class="h-2 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400"></div>
            <div class="p-6 text-center">
              <div class="text-4xl">💞</div>
              <h2 class="mt-2 text-2xl font-semibold text-gray-800">
                {{ t.finalTitle }}
              </h2>
              <p class="mt-2 text-gray-600">
                {{ t.finalText }}
              </p>

              <button
                class="mt-5 w-full rounded-2xl px-4 py-3 font-semibold text-white
                       bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500"
                @click="reset"
              >
                {{ t.playAgain }}
              </button>
            </div>
          </div>
        </div>
      </transition>

    </div>
  </main>
</template>

<script setup>
import { computed, ref } from "vue";

const lang = ref("ru");

// TRANSLATIONS
const translations = {
  ru: {
    mini: "Мини-игра",
    title: "Выбери правильный ответ 🌸",
    next: "Дальше",
    finish: "Финал",
    finalTitle: "Правильный ответ: Ты 💞",
    finalText: "Сегодня, завтра и всегда — самая милая это ты ✨",
    playAgain: "Пройти ещё раз",
    questions: [
      {
        text: "Кто самый милый человек сегодня?",
        options: ["Ты", "Котик", "Я", "Никто"],
      },
      {
        text: "Что делает день лучше?",
        options: ["Твоя улыбка", "Сладкое", "Музыка", "Сон"],
      },
      {
        text: "Кто самая красивая?",
        options: ["Ты", "Принцесса", "Модель", "Все вместе"],
      },
    ],
  },
  uz: {
    mini: "Kichkina o‘yin",
    title: "To‘g‘ri javobni tanla 🌸",
    next: "Keyingi",
    finish: "Yakunlash",
    finalTitle: "To‘g‘ri javob: Sen 💞",
    finalText: "Bugun ham, ertaga ham — eng yoqimli inson sensan ✨",
    playAgain: "Yana o‘ynash",
    questions: [
      {
        text: "Bugun eng yoqimli inson kim?",
        options: ["Sen", "Mushukcha", "Men", "Hech kim"],
      },
      {
        text: "Kunimni nima chiroyli qiladi?",
        options: ["Sening tabassuming", "Shirinlik", "Musiqa", "Uyqu"],
      },
      {
        text: "Eng chiroyli kim?",
        options: ["Sen", "Malika", "Model", "Hammasi"],
      },
    ],
  },
};

const step = ref(0);
const feedback = ref("");
const showFinal = ref(false);

const t = computed(() => translations[lang.value]);
const questions = computed(() => t.value.questions);
const currentQuestion = computed(() => questions.value[step.value]);

function pick(option) {
  if (lang.value === "ru") {
    feedback.value = `"${option}" — хороший выбор 😉 Но правильный ответ: Ты 💞`;
  } else {
    feedback.value = `"${option}" yaxshi tanlov 😉 Lekin to‘g‘ri javob: Sen 💞`;
  }
}

function next() {
  if (step.value < questions.value.length - 1) {
    step.value++;
    feedback.value = "";
  } else {
    showFinal.value = true;
  }
}

function reset() {
  step.value = 0;
  feedback.value = "";
  showFinal.value = false;
}

function langBtnClass(code) {
  return `
    px-3 py-1 rounded-full text-sm font-medium border transition
    ${lang.value === code
      ? "bg-pink-500 text-white border-pink-500"
      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}
  `;
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 180ms ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.pop-enter-active, .pop-leave-active {
  transition: transform 220ms ease, opacity 220ms ease;
}
.pop-enter-from, .pop-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
</style>