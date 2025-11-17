<script setup lang="ts">
import useVuelidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";

definePageMeta({
  layout: "auth",
});
const rules = {
  email: { required, email }, // Matches state.firstName
  password: { required }, // Matches state.lastName
};
const registerInput = ref({
  email: "ben@gmail.com",
  password: "",
});
const v$ = useVuelidate(rules, registerInput);
const loading = ref(false);
const router = useRouter();
async function handleSubmit() {
  const isValid = await v$.value.$validate();
  if (!isValid) return;
  try {
    loading.value = true;
    const res = await $fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(registerInput.value),
    });
    loading.value = false;
    router.push("/auth/email-verification");
    console.log(res);
  } catch (error) {
    loading.value = false;
    console.log(error);
  }
}
</script>
<template>
  <div class="bg-white h-screen">
    <div class="flex justify-between">
      <div></div>
      <div class="w-[300px] mt-20">
        <div class="flex flex-col gap-2">
          <h1 class="text-2xl mb-3">Sign Up</h1>
          {{ registerInput.email }}
          <FormError :errors="v$.email.$errors">
            <BaseInput
              v-model="registerInput.email"
              type="text"
              placeholder="info@gmail.com"
            />
          </FormError>
          <FormError :errors="v$.password.$errors">
            <BaseInput
              v-model="registerInput.password"
              type="password"
              placeholder="Password"
            />
          </FormError>
          <BaseBtn @click="handleSubmit" :loading="loading" label="Sign Up" />
          <p
            class="text-sm font-normal text-center text-gray-700 dark:text-gray-500 sm:text-start"
          >
            Already have an account?
            <NuxtLink
              to="/auth/signin"
              class="text-indigo-500 hover:text-brand-600 font-semibold"
            >
              Sign In
            </NuxtLink>
          </p>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>
