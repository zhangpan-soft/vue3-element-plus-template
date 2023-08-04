<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { isExternal as $isExternal } from "@/utils/validate";
import { computed } from "vue";
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
});
const isExternal = computed(() => $isExternal(props.to));
const type = computed(() => (isExternal.value ? "a" : "router-link"));
const linkProps = (to: any) =>
  isExternal.value ? { href: to, target: "_blank", rel: "noopener" } : { to };
</script>
