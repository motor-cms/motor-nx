<template>
  <div>
    <a
        class="text-blueGray-500 block"
        href="#pablo"
        ref="btnDropdownRef"
        v-on:click="toggleDropdown($event)"
    >
      <div class="items-center flex">
        <span
            class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
        >
          <img v-if="avatar"
              :alt="userName"
              class="w-full rounded-full align-middle border-none shadow-lg"
              :src="avatar"
          />
        </span>
      </div>
    </a>
    <div
        ref="popoverDropdownRef"
        class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <a
          @click="logout" href="javascript:void(0);"
          class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Logout
      </a>
    </div>
  </div>
</template>

<script>
import {createPopper} from "@popperjs/core";

import defaultAvatar from "@/assets/img/motor-logo-small.png";

export default {
  data() {
    return {
      dropdownPopoverShow: false,
      image: defaultAvatar,
    };
  },
  computed: {
    avatar() {
      const me = JSON.parse(localStorage.getItem('me'));
      if (me.data.data.avatar) {
        return me.data.data.avatar.conversions.preview;
      }
      return this.image;
    },
    userName() {
      const me = JSON.parse(localStorage.getItem('me'));
      return me.data.data.name;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push({path: '/auth/login'})
    },
    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
  },
};
</script>
