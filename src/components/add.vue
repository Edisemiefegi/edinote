<template>
  <div>
    <div class="flex flex-col gap-2">
      <input
        type="text"
        placeholder="Title"
        class="outline-none text-xl text-primary"
        v-model="note.title"
      />
      <div class="w-96 border"></div>
      <textarea
        v-model="note.text"
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="What's on your mind"
        class="outline-none text-[#595959]"
      ></textarea>
    </div>
    <div class="flex gap-5">
      <button
        class="border border-red-500 text-red-600 font-medium w-40 p-2 rounded-lg"
        @click="close"
      >
        Discard
      </button>
      <button
        class="bg-primary text-white w-36 p-2 rounded-lg"
        @click="editID ? update() : save()"
      >
        {{ editID ? "Update" : "Save" }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const props = defineProps({
  email: String,
});

const emit = defineEmits(["close", "save"]);

const editID = computed(() => {
  return route.query.id;
});

const note = ref({
  title: "",
  text: "",
  userid: "",
  id: "",
  date: "",
});

const allNotes = ref([]);

const close = () => {
  router.push({ query: {} });
  emit("close");
};

const setnotes = () => {
  const Data = localStorage.getItem("notes");
  allNotes.value = Data ? JSON.parse(Data) : [];
};

const save = () => {
  const payload = { ...note.value };
  payload.id = Math.floor(Math.random() * 100) + payload.title;
  payload.date = getDate();
  payload.userid = props.email;

  allNotes.value.push(payload);
  localStorage.setItem("notes", JSON.stringify(allNotes.value));

  clearnote();
  emit("save");
};

const update = () => {
  const payload = { ...note.value };
  payload.date = getDate();

  allNotes.value = allNotes.value.map((el) => {
    if (el.id == editID.value) {
      el = payload;
    }
    return el;
  });

  localStorage.setItem("notes", JSON.stringify(allNotes.value));
  clearnote();
  close();
};

const assignEditNote = () => {
  if (editID.value) {
    const editNote = allNotes.value.find((el) => el.id == editID.value);

    note.value.title = editNote.title;
    note.value.text = editNote.text;
    note.value.userid = editNote.userid;
    note.value.id = editNote.id;
    note.value.date = editNote.date;
  }
};

const clearnote = () => {
  (note.value.title = ""),
    (note.value.text = ""),
    (note.value.userid = ""),
    (note.value.id = ""),
    (note.value.date = "");
};

watch(editID, () => {
  assignEditNote();
});

onMounted(() => {
  setnotes();
  assignEditNote();
});

const getDate = () => {
  return new Date().toISOString();
  // return d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();
};
</script>

<style></style>
