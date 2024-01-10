<template>
  <header class="bg-white dark:bg-gray-900 border-solid border-b dark:border-gray-500">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8 text-gray-700 dark:text-white dark:bg-gray-900"
      aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">MoMusic</span>
          <img class="mx-auto h-10 w-auto hidden dark:block" src="@/assets/img/welcome/logo-white.png"
            alt="MoMusic Logo" />
          <img class="mx-auto h-10 w-auto dark:hidden" src="@/assets/img/welcome/logo-black.png" alt="MoMusic Logo" />
        </a>
      </div>
      <div class="flex lg:hidden">
        <!--深色模式切换-->
        <div class="mr-2">
          <button class="w-8 h-8 rounded-full border-gray-800 p-2 dark:border-gray-400" @click="darkMode">
            <svg v-if="store.theme.themeMode == 'dark'" t="1693224239075" class="icon" viewBox="0 0 1024 1024"
              version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5378" width="90%" height="90%"
              style="margin-top: 5%; margin-left: 5%">
              <path
                d="M185.335 178.178l-2.742-2.384c-13.39-11.534-14.895-31.74-3.36-45.13a32 32 0 0 1 4.324-4.158C249.354 74.17 337.575 48 448.22 48 704.358 48 912 255.74 912 512l-0.062 7.673C907.842 772.394 701.797 976 448.22 976c-110.645 0-198.866-26.169-264.663-78.506a32 32 0 0 1-4.325-4.159c-11.419-13.256-10.058-33.192 2.962-44.78l0.399-0.35 2.742-2.383c89.13-78.201 134.016-188.043 134.66-329.525L320 512c0.253-143.557-44.635-254.831-134.665-333.822z"
                fill="#828282" p-id="5379"></path>
            </svg>
            <svg v-if="store.theme.themeMode == 'light'" t="1693224341430" class="icon" viewBox="0 0 1024 1024"
              version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1424">
              <path
                d="M512 224c159.058 0 288 128.942 288 288S671.058 800 512 800 224 671.058 224 512s128.942-288 288-288z m0 640c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32zM263.098 760.902c12.497 12.496 12.497 32.758 0 45.254l-45.254 45.255c-12.497 12.497-32.758 12.497-45.255 0s-12.497-32.758 0-45.255l45.255-45.254c12.496-12.497 32.758-12.497 45.254 0z m543.058 0l45.255 45.254c12.497 12.497 12.497 32.758 0 45.255s-32.758 12.497-45.255 0l-45.254-45.255c-12.497-12.496-12.497-32.758 0-45.254 12.496-12.497 32.758-12.497 45.254 0zM128 480c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32H64c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32h64z m832 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32h-64c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32h64zM217.844 172.589l45.254 45.255c12.497 12.496 12.497 32.758 0 45.254-12.496 12.497-32.758 12.497-45.254 0l-45.255-45.254c-12.497-12.497-12.497-32.758 0-45.255s32.758-12.497 45.255 0z m633.567 0c12.497 12.497 12.497 32.758 0 45.255l-45.255 45.254c-12.496 12.497-32.758 12.497-45.254 0-12.497-12.496-12.497-32.758 0-45.254l45.254-45.255c12.497-12.497 32.758-12.497 45.255 0zM512 32c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32-17.673 0-32-14.327-32-32V64c0-17.673 14.327-32 32-32z"
                fill="#000000" p-id="1425"></path>
            </svg>
            <svg v-if="store.theme.themeMode == 'auto'" t="1693224438999" class="icon" viewBox="0 0 1024 1024"
              version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8129">
              <path
                d="M462.933333 539.733333l98.133333 0-49.066667-155.733333-49.066667 155.733333zM853.333333 370.56l0-199.893333-199.893333 0-141.44-141.44-141.44 141.44-199.893333 0 0 199.893333-141.44 141.44 141.44 141.44 0 199.893333 199.893333 0 141.44 141.44 141.44-141.44 199.893333 0 0-199.893333 141.44-141.44-141.44-141.44zM610.133333 682.666667l-29.866667-85.333333-136.533333 0-29.866667 85.333333-81.066667 0 136.533333-384 85.333333 0 136.533333 384-81.066667 0z"
                fill="#747474" p-id="8130"></path>
            </svg>
          </button>
        </div>
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
          @click="mobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <PopoverGroup class="hidden lg:flex lg:gap-x-12">
        <Popover class="relative">
          <PopoverButton class="flex items-center gap-x-1 text-sm font-semibold leading-6 focus:outline-none">
            音乐广场
            <ChevronDownIcon class="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
          </PopoverButton>

          <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
            <PopoverPanel
              class="dark:bg-gray-700 absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
              <div class="p-4">
                <div v-for="item in products" :key="item.name"
                  class="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <div
                    class="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <component :is="item.icon" class="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                      aria-hidden="true" />
                  </div>
                  <div class="flex-auto">
                    <a :href="item.href" class="block font-semibold">
                      {{ item.name }}
                      <span class="absolute inset-0" />
                    </a>
                    <p class="mt-1 text-gray-600 dark:text-gray-200">
                      {{ item.description }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 dark:bg-gray-500">
                <a v-for="item in callsToAction" :key="item.name" :href="item.href"
                  class="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 hover:bg-gray-100 dark:hover:bg-gray-400">
                  <component :is="item.icon" class="h-5 w-5 flex-none text-gray-400 dark:text-gray-100"
                    aria-hidden="true" />
                  {{ item.name }}
                </a>
              </div>
            </PopoverPanel>
          </transition>
        </Popover>

        <a href="#" class="text-sm font-semibold leading-6">分类专区</a>
        <a href="#" class="text-sm font-semibold leading-6">音乐人</a>
        <a href="#" class="text-sm font-semibold leading-6">乐评</a>
      </PopoverGroup>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <!--深色模式切换-->
        <div class="mr-2">
          <button class="w-8 h-8 rounded-full border-gray-800 p-2 dark:border-gray-400" @click="darkMode">
            <svg v-if="store.theme.themeMode == 'dark'" t="1693224239075" class="icon" viewBox="0 0 1024 1024"
              version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5378" width="90%" height="90%"
              style="margin-top: 5%; margin-left: 5%">
              <path
                d="M185.335 178.178l-2.742-2.384c-13.39-11.534-14.895-31.74-3.36-45.13a32 32 0 0 1 4.324-4.158C249.354 74.17 337.575 48 448.22 48 704.358 48 912 255.74 912 512l-0.062 7.673C907.842 772.394 701.797 976 448.22 976c-110.645 0-198.866-26.169-264.663-78.506a32 32 0 0 1-4.325-4.159c-11.419-13.256-10.058-33.192 2.962-44.78l0.399-0.35 2.742-2.383c89.13-78.201 134.016-188.043 134.66-329.525L320 512c0.253-143.557-44.635-254.831-134.665-333.822z"
                fill="#828282" p-id="5379"></path>
            </svg>
            <svg v-if="store.theme.themeMode == 'light'" t="1693224341430" class="icon" viewBox="0 0 1024 1024"
              version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1424">
              <path
                d="M512 224c159.058 0 288 128.942 288 288S671.058 800 512 800 224 671.058 224 512s128.942-288 288-288z m0 640c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32-17.673 0-32-14.327-32-32v-64c0-17.673 14.327-32 32-32zM263.098 760.902c12.497 12.496 12.497 32.758 0 45.254l-45.254 45.255c-12.497 12.497-32.758 12.497-45.255 0s-12.497-32.758 0-45.255l45.255-45.254c12.496-12.497 32.758-12.497 45.254 0z m543.058 0l45.255 45.254c12.497 12.497 12.497 32.758 0 45.255s-32.758 12.497-45.255 0l-45.254-45.255c-12.497-12.496-12.497-32.758 0-45.254 12.496-12.497 32.758-12.497 45.254 0zM128 480c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32H64c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32h64z m832 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32h-64c-17.673 0-32-14.327-32-32 0-17.673 14.327-32 32-32h64zM217.844 172.589l45.254 45.255c12.497 12.496 12.497 32.758 0 45.254-12.496 12.497-32.758 12.497-45.254 0l-45.255-45.254c-12.497-12.497-12.497-32.758 0-45.255s32.758-12.497 45.255 0z m633.567 0c12.497 12.497 12.497 32.758 0 45.255l-45.255 45.254c-12.496 12.497-32.758 12.497-45.254 0-12.497-12.496-12.497-32.758 0-45.254l45.254-45.255c12.497-12.497 32.758-12.497 45.255 0zM512 32c17.673 0 32 14.327 32 32v64c0 17.673-14.327 32-32 32-17.673 0-32-14.327-32-32V64c0-17.673 14.327-32 32-32z"
                fill="#000000" p-id="1425"></path>
            </svg>
            <svg v-if="store.theme.themeMode == 'auto'" t="1693224438999" class="icon" viewBox="0 0 1024 1024"
              version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8129">
              <path
                d="M462.933333 539.733333l98.133333 0-49.066667-155.733333-49.066667 155.733333zM853.333333 370.56l0-199.893333-199.893333 0-141.44-141.44-141.44 141.44-199.893333 0 0 199.893333-141.44 141.44 141.44 141.44 0 199.893333 199.893333 0 141.44 141.44 141.44-141.44 199.893333 0 0-199.893333 141.44-141.44-141.44-141.44zM610.133333 682.666667l-29.866667-85.333333-136.533333 0-29.866667 85.333333-81.066667 0 136.533333-384 85.333333 0 136.533333 384-81.066667 0z"
                fill="#747474" p-id="8130"></path>
            </svg>
          </button>
        </div>
        <!-- Profile dropdown -->
        <Menu as="div" class="relative ml-3">
          <div>
            <MenuButton
              class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary_coml">
              <span class="absolute -inset-1.5" />
              <span class="sr-only">用户资料</span>
              <img class="h-8 w-8 rounded-full" src="/yevhenii-aihubov-x6Ls9sg6cmk-unsplash.jpg" alt="" />
            </MenuButton>
          </div>
          <transition enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95">
            <MenuItems
              class="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-slate-500 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <MenuItem v-slot="{ active }">
              <a href="#" :class="[
                active ? 'bg-gray-100 dark:bg-gray-400' : '',
                'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200',
              ]">个人主页</a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
              <a href="#" :class="[
                active ? 'bg-gray-100 dark:bg-gray-400' : '',
                'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200',
              ]">设置</a>
              </MenuItem>
              <MenuItem v-slot="{ active }">
              <a href="javascript:void(0);" @click="logout()" :class="[
                active ? 'bg-gray-100 dark:bg-gray-400' : '',
                'block px-4 py-2 text-sm text-gray-700 dark:text-gray-200',
              ]">登出</a>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </nav>
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:text-white dark:bg-gray-900">
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">MoMusic</span>
            <img class="mx-auto h-10 w-auto hidden dark:block" src="@/assets/img/welcome/logo-white.png"
              alt="MoMusic Logo" />
            <img class="mx-auto h-10 w-auto dark:hidden" src="@/assets/img/welcome/logo-black.png" alt="MoMusic Logo" />
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5" @click="mobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10 dark:divide-gray-200/50">
            <div class="space-y-2 py-6">
              <Disclosure as="div" class="-mx-3" v-slot="{ open }">
                <DisclosureButton
                  class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-gray-500">
                  音乐广场
                  <ChevronDownIcon :class="[open ? 'rotate-180' : '', 'h-5 w-5 flex-none']" aria-hidden="true" />
                </DisclosureButton>
                <DisclosurePanel class="mt-2 space-y-2">
                  <DisclosureButton v-for="item in [...products, ...callsToAction]" :key="item.name" as="a"
                    :href="item.href"
                    class="block rounded-lg py-2 pl-6 pr-3 text-sm font-medium leading-7 hover:bg-gray-50 dark:hover:bg-gray-500">
                    {{ item.name }}</DisclosureButton>
                </DisclosurePanel>
              </Disclosure>
              <a href="/MusicPlayback"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-gray-500">分类专区</a>
              <a href="#"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-gray-500">音乐人</a>
              <a href="#"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-gray-500">乐评</a>
            </div>
            <div class="py-6">
              <a href="#"
                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 hover:bg-gray-50 dark:hover:bg-gray-500">用户</a>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

<script setup>
import { ref } from "vue";

import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/vue/20/solid";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

import { ElMessage } from "element-plus"
import { useStore } from "@/stores/index.js";
import { get, post } from "@/axios/index.js"
import router from "@/router/index.js";

const store = useStore();
const logout = () => {
  get('/api/auth/logout', (message) => {
    ElMessage.success(message)
    store.auth.user = null
    router.push('/')
  })
}

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

const mobileMenuOpen = ref(false);

const darkMode = () => {
  if (store.theme.themeMode == "light") {
    store.theme.themeMode = "dark";
  } else if (store.theme.themeMode == "auto") {
    store.theme.themeMode = "light";
  } else {
    store.theme.themeMode = "auto";
  }
  changeTheme();
};

const changeTheme = () => {
  if (
    store.theme.themeMode == "dark" ||
    (store.theme.themeMode == "auto" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

changeTheme();
</script>
