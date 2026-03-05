<template>
  <div>
    <h2 class="text-2xl font-black text-gray-800">{{ t.letterTitle }}</h2>

    <div class="mt-5 rounded-3xl bg-white/75 border border-white/60 p-5">
      <TypewriterText :text="text" :speed="18" />
    </div>

    <div class="mt-6 flex flex-col sm:flex-row gap-3">
      <button class="cta" @click="goGallery">{{ t.galleryBtn }}</button>
      <button class="soft" @click="goReasons">{{ t.reasonsBtn }}</button>
    </div>
  </div>
</template>

<script setup>
import { computed, inject } from "vue";
import { useRouter } from "vue-router";
import TypewriterText from "../components/TypewriterText.vue";
import { letterRu, letterUz } from "../content/letter";

const { lang, t } = inject("i18n");
const router = useRouter();

const text = computed(() => (lang.value === "uz" ? letterUz : letterRu));

function goGallery(){ router.push("/gallery"); }
function goReasons(){ router.push("/reasons"); }
</script>

<style scoped>
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