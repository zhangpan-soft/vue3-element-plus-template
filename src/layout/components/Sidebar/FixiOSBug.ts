import { computed, defineComponent, onMounted, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const $store = useStore();
    const device = computed(() => $store.getters.device);
    const subMenu = ref();
    onMounted(() => {
      fixBugIniOS();
    });
    const fixBugIniOS = () => {
      const $subMenu = subMenu.value;
      if ($subMenu) {
        const handleMouseleave = $subMenu.handleMouseleave;
        $subMenu.handleMouseleave = (e: any) => {
          if (device.value === "mobile") {
            return;
          }
          handleMouseleave(e);
        };
      }
    };
    return {
      device,
      subMenu,
      fixBugIniOS,
    };
  },
});
