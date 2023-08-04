import SvgIcon from "@/components/SvgIcon/index.vue";
export default {
  install(app: any) {
    app.component("SvgIcon", SvgIcon);
    const req = require.context("@/icons/svg", false, /\.svg$/);
    // req.keys().forEach(req);
    const requireAll = (requireContext: any) =>
      requireContext.keys().map(requireContext);
    requireAll(req);
  },
};
