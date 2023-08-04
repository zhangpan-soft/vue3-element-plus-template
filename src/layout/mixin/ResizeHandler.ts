import {
  defineComponent,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const $route = useRoute();
    const $store = useStore();
    const device = ref();
    watch($route, () => {
      if (device.value === "mobile" && $store.getters.sidebar.opened) {
        $store.dispatch("app/closeSideBar", { withoutAnimation: false }).then();
      }
    });
    onBeforeMount(() => {
      window.addEventListener("resize", $_resizeHandler);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("resize", $_resizeHandler);
    });
    onMounted(() => {
      const isMobile = $_isMobile();
      if (isMobile) {
        $store.dispatch("app/toggleDevice", "mobile").then();
        $store.dispatch("app/closeSideBar", { withoutAnimation: true }).then();
      }
    });

    const $_resizeHandler = () => {
      if (!document.hidden) {
        const isMobile = $_isMobile();
        $store
          .dispatch("app/toggleDevice", isMobile ? "mobile" : "desktop")
          .then();
        if (isMobile) {
          $store
            .dispatch("app/closeSideBar", { withoutAnimation: true })
            .then();
        }
      }
    };

    const $_isMobile = () => {
      return document.body.getBoundingClientRect().width < 991;
    };
    return {
      $_isMobile,
      $_resizeHandler,
    };
  },
});
