<template>
  <main class="min-h-screen relative overflow-hidden">
    <AmbientBg />
    <MusicPlayer />


    <div class="relative min-h-screen flex items-center justify-center px-4 py-10">
      <div class="w-full max-w-3xl">
        <div class="rounded-3xl bg-white/70 backdrop-blur-md shadow-2xl border border-white/60 overflow-hidden">
          <div class="h-2 bg-gradient-to-r from-pink-400 via-rose-400 to-purple-400"></div>

          <div class="p-6 sm:p-8">
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-sm text-gray-500">{{ t.mini }}</p>
                <p class="text-xs text-gray-500 mt-1">RU / UZ</p>
              </div>
              <LangSwitch />
            </div>

            <div class="mt-6">
              <router-view />
            </div>

            <div class="mt-8 rounded-2xl bg-white/60 border border-white/60 px-4 py-3 text-sm text-gray-700">
              ✨ {{ t.tip }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <HeartBurst />
    <ConfettiLayer />
  </main>
</template>

<script setup>
import MusicPlayer from "./components/MusicPlayer.vue";
import AmbientBg from "./components/AmbientBg.vue";
import LangSwitch from "./components/LangSwitch.vue";
import HeartBurst from "./components/HeartBurst.vue";
import ConfettiLayer from "./components/ConfettiLayer.vue";
import { useI18n } from "./composables/useI18n";
import { provide, onMounted } from "vue";

const i18n = useI18n();
provide("i18n", i18n);

const { t, initLang } = i18n;
onMounted(() => initLang());
</script>