<script setup lang="ts">
import { ref } from "vue";
import {
  ShButton,
  ShCombobox,
  ShDialog,
  ShField,
  ShInput,
  ShTabs,
  ShTooltip,
} from "../src/components";

const activeTab = ref("profile");
const city = ref<string | number>();
const dialogOpen = ref(false);
const name = ref("");
const submitted = ref("");
function submit(event: SubmitEvent) {
  event.preventDefault();
  submitted.value = String(
    new FormData(event.currentTarget as HTMLFormElement).get("name") ?? "",
  );
}
</script>

<template>
  <main>
    <h1>ShoeHorn UI browser fixture</h1>

    <ShTabs
      v-model="activeTab"
      label="Settings"
      :tabs="[
        { id: 'profile', label: 'Profile' },
        { id: 'security', label: 'Security' },
      ]"
    >
      <template #profile>Profile panel</template>
      <template #security>Security panel</template>
    </ShTabs>

    <ShCombobox
      v-model="city"
      label="City"
      name="city"
      :options="[
        { value: 'boise', label: 'Boise' },
        { value: 'seattle', label: 'Seattle' },
      ]"
    />

    <ShButton @click="dialogOpen = true">Open dialog</ShButton>
    <ShDialog v-model:open="dialogOpen" title="Example dialog">
      <p>Dialog content</p>
      <template #footer
        ><ShButton @click="dialogOpen = false">Done</ShButton></template
      >
    </ShDialog>

    <form @submit="submit">
      <ShField id="browser-name" label="Name" required
        ><ShInput v-model="name" name="name"
      /></ShField>
      <ShButton type="submit">Submit</ShButton>
    </form>
    <output aria-live="polite">{{ submitted }}</output>

    <ShTooltip v-slot="{ triggerProps }" text="Helpful details" :open-delay="0">
      <button v-bind="triggerProps" type="button">Tooltip trigger</button>
    </ShTooltip>
  </main>
</template>
