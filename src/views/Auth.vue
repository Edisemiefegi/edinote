<template>
  <div
    class="w-screen py-10 min-h-screen bg-primary flex justify-center items-center"
  >
    <div class="relative le">
      <div
        class="w-40 h-40 bg-white/80 rounded-full absolute -top-14 -left-16 blur-sm"
      ></div>

      <div
        class="w-80 h-auto bg-white/30 backdrop-blur-lg rounded-lg p-8 flex flex-col gap-6"
      >
        <div
          class="w-full h-12 mx-auto border border-white rounded-2xl flex justify-between items-center relative"
        >
          <div class="absolute top-0 z-20 left-0 right-0 flex items-center">
            <h3
              @click="display = 'login'"
              :class="display == 'login' ? 'text-primary' : 'text-white'"
              class="w-6/12 text-center cursor-pointer font-semibold p-3"
            >
              Login
            </h3>
            <h3
              @click="display = 'signup'"
              :class="display == 'signup' ? 'text-primary' : 'text-white'"
              class="w-6/12 text-center cursor-pointer font-semibold p-3"
            >
              Sign up
            </h3>
          </div>
          <div
            :class="
              display == 'login' ? 'translate-x-0' : 'translate-x-[123px]'
            "
            class="w-32 transform m-0.5 h-11 bg-white z-10 rounded-2xl transition-all duration-300 ease-in-out"
          ></div>
        </div>

        <form class="flex flex-col gap-3" @submit.prevent="handlesubmit">
          <div v-if="display == 'signup'">
            <label class="text-white font-semibold">Username</label>
            <input
              v-model="data.username"
              type="text"
              name="username"
              placeholder="Username"
              class="w-full rounded-lg bg-white/20 text-white p-3 text-sm outline-none mt-2 placeholder:text-white/60 placeholder:text-sm"
            />
          </div>

          <div>
            <label class="text-white font-semibold">Email</label>
            <input
              v-model="data.email"
              placeholder="Email"
              type="email"
              name="email"
              inputmode="email"
              class="w-full rounded-lg bg-white/20 text-white p-3 text-sm outline-none mt-2 placeholder:text-white/60 placeholder:text-sm"
            />
          </div>

          <div>
            <label class="text-white font-semibold">Password</label>
            <input
              v-model="data.password"
              type="password"
              name="password"
              placeholder="Password"
              inputmode="password"
              class="w-full rounded-lg bg-white/20 text-white p-3 text-sm outline-none mt-2 placeholder:text-white/60 placeholder:text-sm"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-white mt-2 p-2 rounded-lg text-primary font-semibold"
          >
            <span v-if="display == 'login'">Login</span>
            <span v-else>Sign up</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const display = ref("login");

const data = reactive({
  username: "",
  email: "",
  password: "",
});
const users = ref([]);

const setUsers = () => {
  const userData = localStorage.getItem("users");
  users.value = userData ? JSON.parse(userData) : [];

  // console.log(users.value);
};

onMounted(() => {
  setUsers();
});

watch(display, () => {
  clearFields();
});

const validity = () => {
  if (data.username.trim() == "" && display.value == "signup") {
    alert("username is required");
    return false;
  } else if (data.email.trim() == "") {
    alert("email is required");
    return false;
  } else if (data.password.trim() == "") {
    alert("password is required");
    return false;
  } else {
    return true;
  }
};

const handlesubmit = () => {
  if (validity()) {
    if (display.value == "signup") {
      signupFN();
    } else {
      loginFN();
    }
  }
};

function clearFields() {
  data.username = "";
  data.email = "";
  data.password = "";
}

const signupFN = () => {
  if (checkEmail()) {
    const payload = { ...data };

    users.value.push(payload);

    localStorage.setItem("users", JSON.stringify(users.value));
    localStorage.setItem("loginUser", JSON.stringify(payload));
    clearFields();
    router.push({ name: "Dashboard" });
  }
};

const checkEmail = () => {
  let result = true;

  users.value.find((e) => {
    if (e.email.trim().toLowerCase() == data.email.trim().toLowerCase()) {
      alert("email already exist");
      result = false;
    } else {
      result = true;
    }
  });

  return result;
};

const loginFN = () => {
  const logginUser = users.value.find((e) => {
    if (e.email.trim().toLowerCase() == data.email.trim().toLocaleLowerCase()) {
      return e;
    }
  });

  // console.log(logginUser);

  if (logginUser) {
    if (logginUser.password.trim() !== data.password.trim()) {
      alert("Incorrect passowrd");
    } else {
      clearFields();
      localStorage.setItem("loginUser", JSON.stringify(logginUser));
      router.push({ name: "Dashboard" });
    }
  } else {
    alert("User does not exist");
  }
};
</script>

<style></style>
