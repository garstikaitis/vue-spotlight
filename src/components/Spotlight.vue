<template>
  <div id="vue-spotlight">
    <div class="vue-spotlight" v-if="isVisible">
      <div class="vue-spotlight--bg" :class="{ active: isVisible }"></div>
      <div class="vue-spotlight--wrapper">
        <SpotlightInput
          @update:modelValue="handleFilterSpotlightItems"
          ref="input"
          v-model="inputValue"
          @arrow-up-pressed="handleArrowUpPressed"
          @arrow-down-pressed="handleArrowDownPressed"
        />
        <SpotlightList
          @select-item="handleSelectItem"
          @hover-item="handleHoverItem"
          :items="itemsToRender"
          :arrow-down-pressed="isArrowDownPressed"
          :arrow-up-pressed="isArrowUpPressed"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  items: SpotlightItem[];
  openKey: string[];
  closeKey: string[];
}

import { ref, onUnmounted, onMounted } from "vue";
import { arraysMatch } from "../helpers/areArraysEqual";
import { SpotlightItem } from "../types";

import SpotlightInput from "./SpotlightInput.vue";
import SpotlightList from "./SpotlightList.vue";

const inputValue = ref("");
const isVisible = ref(false);
const pressedKeys = ref<string[]>([]);
const isArrowDownPressed = ref(false);
const isArrowUpPressed = ref(false);

const props = withDefaults(defineProps<Props>(), {});
const emits = defineEmits(["select-item", "hover-item"]);

const initialItems = props.items;
const itemsToRender = ref<SpotlightItem[]>(initialItems);

const handleHoverItem = (item: SpotlightItem) => {
  emits("hover-item", item);
};

const handleSelectItem = (item: SpotlightItem) => {
  emits("select-item", item);
};

const handleFilterSpotlightItems = (inputValue: string) => {
  if (inputValue.length) {
    itemsToRender.value = props.items.filter((item) => {
      return (
        item.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        item.description.toLowerCase().includes(inputValue.toLowerCase())
      );
    });
  } else {
    itemsToRender.value = initialItems;
  }
};

const handleArrowUpPressed = () => {
  isArrowUpPressed.value = true;
  setTimeout(() => {
    isArrowUpPressed.value = false;
  }, 100);
};

const handleArrowDownPressed = () => {
  isArrowDownPressed.value = true;
  setTimeout(() => {
    isArrowDownPressed.value = false;
  }, 100);
};
const handleKeyUp = (e: KeyboardEvent) => {
  if (!pressedKeys.value.includes(e.key) && props.openKey.includes(e.key)) {
    pressedKeys.value.push(e.key);
  }
  const uniqPressedKeys = [...new Set(pressedKeys.value)].sort();
  if (arraysMatch(uniqPressedKeys, props.openKey)) {
    isVisible.value = true;
  }
  if (props.closeKey.includes(e.key)) {
    isVisible.value = false;
    inputValue.value = "";
    itemsToRender.value = initialItems;
  }
};
onMounted(() => {
  document.addEventListener("keyup", handleKeyUp, false);
});
onUnmounted(() => {
  document.removeEventListener("keyup", handleKeyUp);
});
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
:root {
  --overlay-color: rgba(0, 0, 0, 0.1);
  --spotlight-bg-color: #001b2e;
  --input-text-color: #fff;
  --input-font-size: 2rem;
  --input-placeholder-color: #adb6c4;
}
.vue-spotlight {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  font-family: "Poppins", sans-serif;
}
.vue-spotlight--bg {
  position: absolute;
  top: 0;
  left: 0;
  position: fixed;
  width: 100vw;
  height: 100vw;
  z-index: 1;
}
.vue-spotlight--bg.active {
  background-color: var(--overlay-color);
}
.vue-spotlight--wrapper {
  position: absolute;
  top: 150px;
  left: calc(50% - 300px);
  background-color: var(--spotlight-bg-color);
  min-width: 600px;
  max-height: 500px;
  overflow: scroll;
  z-index: 2;
  border-radius: 4px;
  opacity: 0.9;
  padding-bottom: 10px;
  box-shadow: rgba(17, 12, 46, 0.2) 0px 48px 100px 0px;
}
</style>
