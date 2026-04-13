import type { App } from "vue";
import * as components from "./components";

export default {
  install(app: App) {
    for (const key in components) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const component = (components as any)[key];
      if (component?.name) {
        app.component(component.name, component);
      }
    }
  },
};
