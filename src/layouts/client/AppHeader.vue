<template>
  <header
      class="fixed left-0 top-0 z-40 w-full transition-transform duration-300"
      :class="clsx({
       'translate-y-0' : isShow,
       '-translate-y-96': !isShow,
       'xl:p-3 border-b py-3': route.name !== 'home',
        'py-10': route.name === 'home'
      })"
  >
    <div
        class="absolute inset-0 w-full bg-gradient-to-b from-custom-bg from-0% to-transparent transition-opacity duration-200 opacity-0"
        :class="clsx({
         'opacity-100':isShow,
          'hidden': route.name !== 'home'
        })"
    ></div>
    <div class="relative container md:px-12 lg:px-20">
      <div class="flex items-center justify-between">
        <AppLogo />
        <nav class="hidden lg:block">
          <MenuLinks type="desktop" />
        </nav>

        <MenuExtras @toggle-menu="toggleMenu" />
        <div
            class="bg-custom-foreground-secondary/10 fixed right-0 top-0 w-full backdrop-blur transition-transform duration-500 md:w-2/4 lg:hidden"
            :class="[isOpen ? 'translate-x-0' : 'translate-x-full']"
        >
          <MenuLinks />
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, provide, ref, watch} from "vue";
import {clsx} from "clsx"
import MenuLinks from "@/components/menu/Links.vue";
import MenuExtras from "@/components/menu/Extras.vue";
import AppLogo from "@/components/AppLogo.vue";
import {useRoute} from "vue-router"
const isOpen = ref<boolean>(false)
const isShow = ref<boolean>(true)
const lastScrollTop = ref<number>(0)
let timeout: ReturnType<typeof setTimeout>

provide('isOpen', isOpen)
const route = useRoute()


watch(isOpen, (value) => {
  if (value) document.addEventListener('click', detectClickOutside)
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function toggleMenu() {
  isOpen.value = !isOpen.value
  document.body.classList.toggle('overflow-y-hidden')
}

function detectClickOutside(event: Event) {
  if (!(event.target as HTMLElement).closest('.hamburger')) {
    isOpen.value = false
    document.body.classList.remove('overflow-y-hidden')
  }
}

function handleScroll() {
  clearTimeout(timeout)

  if (window.scrollY > lastScrollTop.value) {
    isShow.value = false
  } else if (window.scrollY < lastScrollTop.value) {
    isShow.value = true
  }
  lastScrollTop.value = window.scrollY <= 0 ? 0 : window.scrollY

  timeout = setTimeout(() => {
    isShow.value = true
  }, 500)
}
</script>