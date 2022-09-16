<template>
  <Spotlight
    :items="items"
    :open-key="['Meta', 'Shift']"
    :close-key="['Escape']"
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
    description: "Jon Doe",
    onSelect: () => alert("Current user"),
  },
  {
    name: "Logout",
    description: "Logout from the app",
    onSelect: () => alert("Logout"),
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
