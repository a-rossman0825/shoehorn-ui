import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      include: ["src/**/*.ts", "src/**/*.vue"],
      exclude: ["src/**/*.test.ts"],
    }),
  ],

  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ShoehornUI",
      fileName: (format) => `index.${format}.js`,
      formats: ["es", "umd"],
    },
    cssCodeSplit: false,
    rollupOptions: {
      // Vue must NOT be bundled
      external: ["vue"],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return "style.css";
          }
          return assetInfo.name || "";
        },
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
  },
});
