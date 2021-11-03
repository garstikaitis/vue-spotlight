<template>
  <div class="vue-spotlight--wrapper-list">
    <div
      class="vue-spotlight--wrapper-list-item"
      @click="selectItem"
      @mouseenter="addActiveClass(index)"
      @mouseleave="removeActiveClass"
      :class="{ active: index === hoveredIndex }"
      v-for="(item, index) in items"
      :key="index"
      :id="`item_${index}`"
    >
      <div class="vue-spotlight--wrapper-list-item-header">{{ item.name }}</div>
      <div class="vue-spotlight--wrapper-list-item-subheader">
        {{ item.description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  items: SpotlightItem[];
  arrowDownPressed: Boolean;
  arrowUpPressed: Boolean;
}

import { ref, watch, onMounted, onUnmounted, defineEmits } from "vue";
import { SpotlightItem } from "../types";

const props = withDefaults(defineProps<Props>(), {});
const emits = defineEmits(["hover-item", "select-item"]);

const hoveredIndex = ref<number | null>(null);

const addActiveClass = (index: number) => {
  hoveredIndex.value = index;
};

watch(
  () => props.arrowUpPressed,
  () => {
    if (hoveredIndex.value === null) {
      addActiveClass(props.items.length);
    }
  }
);

watch(
  () => props.arrowDownPressed,
  () => {
    if (hoveredIndex.value === null) {
      addActiveClass(-1);
    }
  }
);

const removeActiveClass = () => {
  hoveredIndex.value = null;
};

const handleKeyUp = (e: KeyboardEvent) => {
  const input = document.getElementsByClassName("vue-spotlight--input")[0];
  if (e.key === "ArrowDown") {
    if (hoveredIndex.value !== null) {
      const newHoveredIndex = hoveredIndex.value + 1;
      if (newHoveredIndex === props.items?.length) {
        input!.scrollIntoView(true);
        emits("hover-item", props.items[0]);
        addActiveClass(0);
      } else {
        const { visibleListArea, scrollableAreaHeight } =
          getListDimensions(newHoveredIndex);
        if (visibleListArea < scrollableAreaHeight) {
          const item = document.getElementById(`item_${newHoveredIndex}`);
          item?.scrollIntoView(false);
        }
        emits("hover-item", props.items[newHoveredIndex]);
        addActiveClass(newHoveredIndex);
      }
    }
  }
  if (e.key === "ArrowUp") {
    if (hoveredIndex.value !== null) {
      const newHoveredIndex = hoveredIndex.value - 1;
      if (newHoveredIndex === 0) {
        input!.scrollIntoView(true);
        addActiveClass(0);
      } else if (newHoveredIndex === -1) {
        const lastListItem = document.getElementById(
          `item_${props.items.length - 1}`
        );
        lastListItem!.scrollIntoView(true);
        emits("hover-item", props.items[props.items.length - 1]);
        addActiveClass(props.items.length - 1);
      } else {
        const { visibleListArea, scrollableAreaHeight } =
          getListDimensions(newHoveredIndex);
        if (visibleListArea > scrollableAreaHeight) {
          const item = document.getElementById(`item_${newHoveredIndex}`);
          item!.scrollIntoView(true);
        }
        emits("hover-item", props.items[newHoveredIndex]);
        addActiveClass(newHoveredIndex);
      }
    }
  }
  if (e.key === "Enter") {
    selectItem();
  }
};

const selectItem = () => {
  if (hoveredIndex.value !== null) {
    emits("select-item", props.items[hoveredIndex.value]);
    props.items[hoveredIndex.value].onSelect();
  }
};

const getListDimensions = (newHoveredIndex: number) => {
  const input = document.getElementsByClassName("vue-spotlight--input")[0];
  const currentActiveElement = document.getElementById(
    `item_${newHoveredIndex}`
  );

  const currentActiveElementOffsetTop = currentActiveElement!.offsetTop;
  const currentActiveElementHeight = currentActiveElement!.offsetHeight;
  const inputHeight = input.clientHeight;
  const scrollableAreaHeight =
    currentActiveElementOffsetTop - currentActiveElementHeight - inputHeight;
  const visibleListArea = currentActiveElementHeight * 5;

  return {
    visibleListArea,
    scrollableAreaHeight,
  };
};

onMounted(() => {
  window.addEventListener("keyup", handleKeyUp);
  addActiveClass(0);
});
onUnmounted(() => window.removeEventListener("keyup", handleKeyUp));
</script>

<style scoped>
.vue-spotlight--wrapper-list {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
}
.vue-spotlight--wrapper-list-item {
  display: flex;
  flex-direction: column;
  color: white;
  margin: 10px 0;
  padding: 4px 10px;
  border-radius: 4px;
  cursor: pointer;
}
.vue-spotlight--wrapper-list-item-header {
  font-size: 1.5rem;
}
.vue-spotlight--wrapper-list-item-subheader {
  font-size: 1rem;
  color: var(--input-placeholder-color);
}
.vue-spotlight--wrapper-list-item.active {
  background-color: #a4036f;
}
</style>
