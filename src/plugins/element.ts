import "element-plus/theme-chalk/index.css";
import { zhCn } from "element-plus/es/locale/index";
import ElementPlus from "element-plus";
import * as components from "@element-plus/icons-vue";

export default {
  install(app: any) {
    app.use(ElementPlus, { locale: zhCn, size: "normal" });
    for (const key in components) {
      const componentConfig = (components as any)[key];
      app.component(componentConfig.name, componentConfig);
    }
  },
};
