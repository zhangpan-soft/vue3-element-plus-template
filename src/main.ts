import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css/normalize.css";
import element from "@/plugins/element";
import { mockXHR } from "../mock";
import axios from "@/plugins/axios";
import "@/styles/index.scss";
import icons from "@/plugins/icons";
import i18n from "@/plugins/lang";

if (process.env.NODE_ENV === "development") {
  mockXHR();
}

createApp(App).use(element).use(store).use(i18n).use(router).use(axios).use(icons).mount("#app");
