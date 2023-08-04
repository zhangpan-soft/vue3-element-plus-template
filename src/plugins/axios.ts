"use strict";

import request from "@/utils/request";
const install = (app: any) => {
  app.config.globalProperties.$axios = request;
};

export default { install };
