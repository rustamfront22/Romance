<template>
  <div>
    <h2 class="text-2xl font-black text-gray-800">{{ t.galleryTitle }}</h2>

    <div class="mt-5 rounded-3xl bg-white/75 border border-white/60 p-5">
      <div class="relative overflow-hidden rounded-2xl">
        <img :src="photos[idx]" class="w-full h-[360px] sm:h-[420px] object-cover" />

        <button class="nav left" @click="prev">‹</button>
        <button class="nav right" @click="next">›</button>
      </div>

      <div class="mt-4 flex items-center justify-between">
        <div class="text-sm text-gray-700 font-bold">
          {{ idx + 1 }} / {{ photos.length }}
        </div>

        <div class="flex gap-2">
          <span
            v-for="(p, i) in photos"
            :key="p"
            class="dot"
            :class="{ active: i === idx }"
            @click="idx = i"
          />
        </div>
      </div>
    </div>

    <div class="mt-6 flex flex-col sm:flex-row gap-3">
      <button class="cta" @click="goReasons">{{ t.reasonsBtn }}</button>
      <button class="soft" @click="goGift">{{ t.giftBtn }}</button>
    </div>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
import { useRouter } from "vue-router";

const { t } = inject("i18n");
const router = useRouter();

const photos = [
  "/photos/17.jpg",
  "/photos/17.jpg",
  "/photos/17.jpg",
  "/photos/17.jpg",
  "/photos/17.jpg",
  "/photos/17.jpg",
  "/photos/17.jpg",
  "/photos/17.jpg",
  "/photos/17.jpg",
  "/photos/18.png",
  // "/photos/2.jpg",
  // "/photos/3.jpg",
  // "/photos/4.jpg",
  // "/photos/5.jpg",
  // "/photos/6.jpg",
  // "/photos/7.jpg",
  // "/photos/8.jpg",
  // "/photos/9.jpg",
  // "/photos/10.jpg",
];

const idx = ref(0);

function prev(){
  idx.value = (idx.value - 1 + photos.length) % photos.length;
  window.burstHearts?.(window.innerWidth*0.5, window.innerHeight*0.6);
}
function next(){
  idx.value = (idx.value + 1) % photos.length;
  window.burstHearts?.(window.innerWidth*0.5, window.innerHeight*0.6);
}

function goReasons(){ router.push("/reasons"); }
function goGift(){ router.push("/gift"); }
</script>

<style scoped>
.nav{
  position:absolute;
  top:50%;
  transform: translateY(-50%);
  width:42px;
  height:42px;
  border-radius:999px;
  font-size:28px;
  font-weight:900;
  background: rgba(255,255,255,0.75);
  border: 1px solid rgba(209,213,219,0.9);
  color: rgb(55,65,81);
}
.left{ left:12px; }
.right{ right:12px; }

.dot{
  width:10px;
  height:10px;
  border-radius:999px;
  background: rgba(107,114,128,0.35);
  cursor:pointer;
}
.dot.active{
  background: linear-gradient(90deg, rgb(236,72,153), rgb(168,85,247));
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