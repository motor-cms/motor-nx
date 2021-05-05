<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-6/12 px-4">
        <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
        >
          <div class="rounded-t mb-0 px-6 py-6 mt-6">
            <img class="mx-auto" :src="logo">
            <hr class="mt-6 border-b-1 border-blueGray-300"/>
          </div>
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form>
              <div class="relative w-full mb-3">
                <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                  Email
                </label>
                <input v-model="login.email"
                       type="email"
                       class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                       placeholder="Email"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                >
                  Password
                </label>
                <input v-model="login.password"
                       type="password"
                       class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                       placeholder="Password"
                />
              </div>
              <div>
                <label class="inline-flex items-center cursor-pointer">
                  <input v-model="login.remember"
                         id="customCheckLogin"
                         type="checkbox"
                         class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                  />
                  <span class="ml-2 text-sm font-semibold text-blueGray-600">
                    Remember me
                  </span>
                </label>
              </div>

              <div class="text-center mt-6">
                <button
                    class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="button" @click="signIn"
                >
                  Sign In
                </button>
              </div>
              <div v-if="error" class="text-white px-6 py-4 border-0 rounded relative mb-4 bg-red-500">
                <span class="text-xl inline-block mr-5 align-middle">
                  <i class="fas fa-bell"></i>
                </span>
                <span class="inline-block align-middle ml-2">{{ error }}</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="ts">
import logo from "@/assets/img/motor-logo-small.png";
import AuthService from "@/services/AuthService";

export default {
  data() {
    return {
      logo,
      login: {
        email: '',
        password: '',
        remember: false,
      },
      error: false,
    };
  },
  methods: {
    async signIn() {
      this.error = false;
      const response = await this.authService.login(this.login.email, this.login.password);
      switch (response) {
        case 422:
          this.error = 'Data invalid';
          break;
        case 401:
          this.error = 'Incorrect credentials';
          break;
      }
      if (response.status === 200) {
        console.log("Authenticated");
        const me = await this.authService.me();
        localStorage.setItem('me', JSON.stringify(me));
        this.$router.push({ path: '/admin/dashboard' })
      }

    }
  },
  created() {
    this.authService = new AuthService();
  }
};
</script>
