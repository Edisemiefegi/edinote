<template>
  <div
    class="rounded-lg text-left w-64 h-40 border flex flex-col justify-between gap-3 border-primary bg-primary-light p-4"
  >
    <div class="flex flex-col relative">
      <div
        class="p-2 w-18 bg-white rounded-lg absolute right-0 z-20"
        v-if="showDropdown"
      >
        <button
          @click="editNote"
          class="text-primary p-1 text-sm text-left w-full hover:bg-primary hover:text-white hover:rounded"
        >
          Edit
        </button>
        <button
          class="w-full p-1 text-left text-sm text-primary hover:bg-primary hover:text-white hover:rounded"
          @click="deleteNote"
        >
          Delete
        </button>
      </div>

      <div class="flex justify-between items-center">
        <h3 class="text-xl text-primary font-semibold truncate">
          {{ note.title }}
        </h3>
        <i
          @click="showDropdown = !showDropdown"
          class="pi pi-ellipsis-v text-primary text-sm cursor-pointer"
        ></i>
      </div>
      <p class="line-clamp-2 text-[#595959]">{{ note.text }}</p>
    </div>

    <div
      class="text-primary font-semibold text-sm flex justify-between items-center"
    >
      {{ new Date(note.date).toDateString() }}
      <span class="text-xs opacity-60">
        {{ new Date(note.date).toLocaleTimeString() }}
      </span>
    </div>
  </div>
  <div
    v-if="showDropdown"
    @click.self="showDropdown = false"
    class="fixed inset-0"
  ></div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  note: Object,
});

const router = useRouter();

const emit = defineEmits(["setNotes", "openEdit"]);

const deleteNote = () => {
  let allNotes = JSON.parse(localStorage.getItem("notes")); //get all notes and convert it to an array
  allNotes = allNotes.filter((el) => el.id !== props.note.id);
  localStorage.setItem("notes", JSON.stringify(allNotes));

  showDropdown.value = false;

  emit("setNotes");
};

const editNote = () => {
  router.push({ query: { id: props.note.id } });
  emit("openEdit");
};

const showDropdown = ref(false);
</script>
