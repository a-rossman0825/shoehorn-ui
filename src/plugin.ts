import type { App, Component } from "vue";
import * as components from "./components";

export default {
  install(app: App) {
    for (const [name, component] of Object.entries(components)) {
      app.component(name, component as Component);
    }
  },
};
