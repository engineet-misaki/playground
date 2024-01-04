// nuxt.config.ts
import { createResolver } from "@nuxt/kit";
import vuetify from "vite-plugin-vuetify";

// const { resolve } = createResolver(import.meta.url);

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    "@mdi/font/css/materialdesignicons.min.css",
    "vuetify/lib/styles/main.sass",
  ],
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  hooks: {
    //   "vite:extendConfig": (config) => {
    //     config.plugins?.push(
    //       vuetify({
    //         styles: { configFile: resolve("./settings.scss") },
    //       })
    //     );
    //   },
  },
});
