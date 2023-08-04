<template>
  <template v-if="elIconName && elIconName.toString().trim().length > 0">
    <CustomIcon class="svg-icon" v-on="$attrs" />
  </template>
  <div
    v-else-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-on="$attrs"
  />
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$attrs">
    <use :href="iconName" />
  </svg>
</template>

<script setup lang="ts">
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal as $isExternal } from "@/utils/validate";
import { computed, defineComponent } from "vue";
import * as components from "@element-plus/icons-vue";
const props = defineProps({
  iconClass: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    default: "",
  },
  elIconName: {
    type: String,
    default: "",
  },
});
console.log("++++++++++");
console.log(props);
const isExternal = computed(() => $isExternal(props.iconClass));
const iconName = computed(() => `#icon-${props.iconClass}`);
const svgClass = computed(() =>
  props.className ? `svg-icon ${props.className}` : `svg-icon`
);
const styleExternalIcon = computed(() => ({
  mask: `url(${props.iconClass}) no-repeat 50% 50%`,
  "-webkit-mask": `url(${props.iconClass}) no-repeat 50% 50%`,
}));
let CustomIcon: any = defineComponent({});
if (props.elIconName && (props.elIconName as string).trim().length > 0) {
  CustomIcon = (components as any)[props.elIconName as string];
}
console.log("++++++++++++++++++++");
console.log(props.elIconName);
console.log(CustomIcon);
console.log((components as any)[props.elIconName as string]);
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
