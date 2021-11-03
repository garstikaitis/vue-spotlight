<template>
  <input
    class="vue-spotlight--input"
    v-model="inputValue"
    placeholder="What do you want to do?"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
const inputValue = ref("");
const emits = defineEmits(["arrow-down-pressed", "arrow-up-pressed"]);
const handleKeyUp = (e: KeyboardEvent) => {
  if (e.key === "ArrowDown") {
    emits("arrow-down-pressed");
  }
  if (e.key === "ArrowUp") {
    emits("arrow-up-pressed");
  }
};
onMounted(() => {
  window.addEventListener("keyup", handleKeyUp);
  const input = document.getElementsByClassName(
    "vue-spotlight--input"
  )[0] as HTMLElement;
  input.focus();
});
onUnmounted(() => {
  window.removeEventListener("keyup", handleKeyUp);
});
</script>

<style scoped>
:root {
  --input-text-color: #fff;
  --input-font-size: 2rem;
  --input-placeholder-color: #adb6c4;
}
.vue-spotlight--input {
  width: 100%;
  background: transparent;
  outline: none;
  border: none;
  padding: 20px;
  color: var(--input-text-color);
  font-size: var(--input-font-size);
}
.vue-spotlight--input::placeholder {
  color: var(--input-placeholder-color);
}
</style>
