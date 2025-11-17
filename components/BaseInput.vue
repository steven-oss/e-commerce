<script setup lang="ts">
const props = defineProps(["type", "placeholder", "modelValue"]);

const emit = defineEmits(["update:modelValue"]);

function handleInput(event: Event) {
  const val = (event.target as HTMLInputElement).value;
  emit("update:modelValue", val);
}
</script>
<template>
  <input
    @input="handleInput"
    :value="modelValue"
    :type="typeof type === 'undefined' ? type : 'text'"
    name=""
    :placeholder="placeholder"
    id=""
    class="focus:bg-focus-900 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-0 focus:focus:border-brand-800"
  />
</template>
