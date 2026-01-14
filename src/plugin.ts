import type { App } from 'vue';
import * as components from './components'

export default {
  install(app: App) {
    for (const key in components) {
      const component = (components as any)[key];
      if (component?.name) {
        app.component(component.name, component);
      }
    }
  }
};
