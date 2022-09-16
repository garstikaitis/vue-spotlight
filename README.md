# vue-spotlight

### Vue spotlight allows you to spawn MacOS spotlight search inspired UI element controllable with keyboard.

Currently only vue v3 is supported.

![Vue-spotlight](https://raw.githubusercontent.com/garstikaitis/vue-spotlight/main/src/assets/spotlight.png)

## Requirements

- vue3

## Instalation

Run `npm install vue3-spotlight`

In your main app entry file add:

```typescript
import VueSpotlight from "vue-spotlight";

// app initialization code
// const app = createApp()

app.use(VueSpotlight);

// app run code
```

## Props

| Name      | Description                      | Type            | Default           |     |
| --------- | -------------------------------- | --------------- | ----------------- | --- |
| items     | List items to render             | SpotlightItem[] | []                |     |
| open-key  | Keys to press to open spotlight  | string[]        | ['Meta', 'Shift'] |     |
| close-key | Keys to press to close spotlight | string[]        | ['Escape']        |     |

## SpotlightItem API

SpotlightItem is the core controller to say how your items should be rendered.
| Name | Description | Type | | |
| --------- | -------------------------------- | --------------- | ----------------- | --- |
| name | List item title | string | | |
| description | List item description | string | | |
| onSelect | Function to run when item is selected | () => void | | |

## Contributing

Refer to [Contributing.md](https://github.com/garstikaitis/vue-spotlight/blob/main/CONTRIBUTING.md)
