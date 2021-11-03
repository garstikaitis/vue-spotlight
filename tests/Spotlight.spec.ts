import { mount } from "@vue/test-utils";
import Spotlight from "../src/components/Spotlight.vue";
import { SpotlightItem } from "../src/types";

interface Dic {
  [key: string]: EventListenerOrEventListenerObject;
}

let events: Dic = {};

beforeEach(() => {
  document.addEventListener = jest.fn((event, callback) => {
    events[event] = callback;
  });
  document.removeEventListener = jest.fn((event, callback) => {
    delete events[event];
  });
});

describe("HelloWorld", () => {
  it("should display header text", () => {
    const props = {
      items: [
        {
          name: "Test",
          description: "TEST",
          onSelect: () => {},
        },
      ] as SpotlightItem[],
    };
    const wrapper = mount(Spotlight, { props });
    // @ts-ignore
    events.keyup({ key: "s" });
  });
});
