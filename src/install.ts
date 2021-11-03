import { App } from "vue";
import Spotlight from "./components/Spotlight.vue";

export function install(app: App): void {
  app.component("vue-spotlight", Spotlight);
}
