<template>
  <div class="leading-relaxed text-gray-800 whitespace-pre-line">
    <span>{{ shown }}</span><span class="cursor" v-if="cursorOn">|</span>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from "vue";

const props = defineProps({
  text: { type: String, required: true },
  speed: { type: Number, default: 22 }, // меньше = быстрее
});

const shown = ref("");
const cursorOn = ref(true);
let timer = null;
let cursorTimer = null;

function start(){
  clearInterval(timer);
  shown.value = "";
  let i = 0;
  timer = setInterval(() => {
    shown.value += props.text[i] ?? "";
    i++;
    if (i >= props.text.length) clearInterval(timer);
  }, props.speed);

  cursorTimer = setInterval(()=> (cursorOn.value = !cursorOn.value), 450);
}

watch(() => props.text, start);

onMounted(start);
onBeforeUnmount(() => {
  clearInterval(timer);
  clearInterval(cursorTimer);
});
</script>

<style scoped>
.cursor{ opacity: 0.7; }
</style>