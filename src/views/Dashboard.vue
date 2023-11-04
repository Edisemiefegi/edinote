<template>
  <main class="flex flex-col gap-10 px-4 md:px-14">
    <nav class="flex justify-between py-4">
      <div class="">
        <h2 class="text-primary font-semibold text-lg capitalize">
          <span class="text-[#76BDC1]"> Hello,</span>
          {{ user && user.username }}
        </h2>
        <p class="text-lg font-thin">
          Welcome to <span class="text-primary">EdiNotes</span>
        </p>
      </div>
      <button class="text-primary text-sm font-medium" @click="logout">
        Logout
      </button>
    </nav>

    <add
      v-if="showadd"
      @close="showadd = false"
      @save="showadd = false"
      :email="user.email"
    />
    <note v-else @add="showadd = true" />
  </main>
</template>

<script setup>
import add from "../components/add.vue";
import note from "../components/note.vue";

import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = computed(() => {
  const userLoggedin = localStorage.getItem("loginUser");
  return userLoggedin ? JSON.parse(userLoggedin) : null;
});
const showadd = ref(false);

const logout = () => {
  router.push({ name: "Auth" });
  localStorage.removeItem("loginUser");
};

onMounted(() => {
  if (!user.value) {
    router.push({ name: "Auth" });
  }
});
</script>

<style></style>
