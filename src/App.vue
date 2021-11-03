<template>
  <Spotlight
    :items="items"
    :open-key="['Meta', 'Shift']"
    :close-key="['Escape']"
    @select-item="handleSelectItem"
  />
</template>

<style>
body {
  overflow: auto;
}
</style>

<script setup lang="ts">
import { SpotlightItem } from "./types";
import { ref } from "vue";
import Spotlight from "./components/Spotlight.vue";

const handleSelectItem = (item: SpotlightItem) => {
  console.log(item);
};

const items = ref<SpotlightItem[]>([
  {
    name: "User profile",
    description: "Navigate to user profile page",
    onSelect: () => alert("User profile"),
    meta: {
      test: 1,
    },
  },
  {
    name: "Restart server",
    description: "Trigger server restart",
    onSelect: () => alert("Restart server"),
  },
  {
    name: "Maintanance mode",
    description: "Trigger maintanance mode",
    onSelect: () => alert("Maintancence mode"),
  },
  {
    name: "Current user",
    description: "Peter Griffin",
    onSelect: () => alert("Current user"),
  },
  {
    name: "7",
    description: "7",
    onSelect: () => alert("7"),
  },
  {
    name: "8",
    description: "8",
    onSelect: () => alert("8"),
  },
  {
    name: "9",
    description: "9",
    onSelect: () => alert("9"),
  },
  {
    name: "10",
    description: "10",
    onSelect: () => alert("10"),
  },
]);
</script>
