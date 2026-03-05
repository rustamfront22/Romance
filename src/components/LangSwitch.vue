<template>
  <div class="flex gap-2">
    <button @click="setLang('ru')" :class="btn('ru')">RU</button>
    <button @click="setLang('uz')" :class="btn('uz')">UZ</button>
  </div>
</template>

<script setup>
import { inject } from "vue";
const { lang, setLang } = inject("i18n");

function btn(code){
  return `px-3 py-1 rounded-full text-sm font-bold border transition
  ${lang.value===code ? "bg-pink-500 text-white border-pink-500" : "bg-white/80 text-gray-700 border-gray-300 hover:bg-white"}`;
}
</script>