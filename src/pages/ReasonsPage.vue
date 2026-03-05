<template>
  <div>
    <h2 class="text-2xl font-black text-gray-800">{{ t.reasonsTitle }}</h2>

    <div class="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="(card, i) in t.reasonsCards"
        :key="i"
        class="card"
        @click="pop"
      >
        <div class="text-2xl">✨</div>
        <div class="mt-2 font-extrabold text-gray-800">{{ card }}</div>
        <div class="mt-2 text-sm text-gray-600">
          {{ t.girlName }} 💞
        </div>
      </div>
    </div>

    <div class="mt-6 flex flex-col sm:flex-row gap-3">
      <button class="cta" @click="goGift">{{ t.giftBtn }}</button>
      <button class="soft" @click="goGallery">{{ t.galleryBtn }}</button>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

const { t } = inject("i18n");
const router = useRouter();

function pop(e){
  window.burstHearts?.(e.clientX, e.clientY);
}
function goGift(){ router.push("/gift"); }
function goGallery(){ router.push("/gallery"); }
</script>

<style scoped>
.card{
  border-radius: 24px;
  padding: 16px;
  background: rgba(255,255,255,0.75);
  border: 1px solid rgba(255,255,255,0.7);
  box-shadow: 0 12px 40px rgba(0,0,0,0.08);
  cursor: pointer;
  transition: transform 160ms ease;
}
.card:hover{ transform: translateY(-2px); }
.card:active{ transform: translateY(0); }

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