<template>
  <div class="text-center">
    <h2 class="text-2xl font-black text-gray-800">{{ t.giftTitle }}</h2>
    <p class="text-gray-600 mt-2">{{ t.finalSmall }}</p>

    <div class="mt-6 rounded-3xl bg-white/75 border border-white/60 p-5">
      <div class="text-3xl font-black">
        {{ t.finalBig }}
      </div>

      <div class="mt-6 text-left">
        <div class="font-extrabold text-gray-800">{{ t.couponsTitle }}</div>

        <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-for="(c, i) in t.coupons" :key="i" class="coupon" @click="boom">
            <div class="font-extrabold text-gray-800">{{ c.title }}</div>
            <div class="text-sm text-gray-600 mt-1">{{ c.desc }}</div>
          </div>
        </div>
      </div>

      <div class="mt-6">
        <button class="cta" @click="finalBoom">🌸 Boom</button>
      </div>
    </div>

    <div class="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
      <button class="soft" @click="goHome">🏠 Home</button>
      <button class="soft" @click="goGallery">📸 Gallery</button>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

const { t } = inject("i18n");
const router = useRouter();

function boom(e){
  window.burstHearts?.(e.clientX, e.clientY);
}
function finalBoom(){
  window.startConfetti?.();
  window.burstHearts?.(window.innerWidth*0.5, window.innerHeight*0.45);
}
function goHome(){ router.push("/"); }
function goGallery(){ router.push("/gallery"); }
</script>

<style scoped>
.coupon{
  border-radius: 22px;
  padding: 14px;
  background: rgba(255,255,255,0.85);
  border: 1px solid rgba(209,213,219,0.8);
  cursor: pointer;
}
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