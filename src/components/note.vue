<template>
  <div class="flex justify-between">
    <div class="relative w-60">
      <input
        v-model="search"
        @input="handleSearch"
        type="text"
        placeholder="Search..."
        name=""
        id=""
        class="border outline-none p-2 w-60 placeholder:text-sm rounded-lg"
      />
      <i class="pi pi-search absolute right-2 top-3 text-primary"></i>
    </div>

    <button class="w-36 rounded-lg bg-primary text-white" @click="$emit('add')">
      Add New
    </button>
  </div>

  <div class="flex flex-wrap gap-5 text-center">
    <p v-if="!allNotes.length" class="text-[30px] text-gray-400 w-full">
      You dont have any notes yet
    </p>
    <p
      v-if="!visibleData.length && allNotes.length"
      class="text-[30px] text-gray-400 w-full"
    >
      search not found
    </p>
    <notecard
      v-else
      v-for="note in visibleData"
      :key="note.id"
      :note="note"
      @setNotes="setnotes"
      @openEdit="$emit('add')"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import notecard from "../components/notecard.vue";

const search = ref("");
const allNotes = ref([]);
const visibleData = ref([]);

const emit = defineEmits(["add"]);

const setnotes = () => {
  //Get loggedin user
  const user = JSON.parse(localStorage.getItem("loginUser"));
  if (!user) return false;
  // Set note
  const getnote = localStorage.getItem("notes");
  allNotes.value = getnote ? JSON.parse(getnote) : [];

  //filter note by logged in user
  allNotes.value = allNotes.value.filter((e) => e.userid == user.email);

  //sort note by date
  allNotes.value = allNotes.value.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  visibleData.value = allNotes.value;
};

const handleSearch = () => {
  const text = search.value.toLocaleLowerCase();

  if (text.trim() !== "") {
    visibleData.value = allNotes.value.filter(
      (el) =>
        el.title.toLocaleLowerCase().includes(text) ||
        el.text.toLocaleLowerCase().includes(text)
    );
  } else {
    visibleData.value = allNotes.value;
  }
};

onMounted(() => {
  setnotes();
});
</script>
