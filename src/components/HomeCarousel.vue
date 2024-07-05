<template>
  <div class="relative">
    <div class="navigation-wrapper relative">
      <div ref="container" class="keen-slider  h-full">
        <div class="keen-slider__slide h-full w-full relative" v-for="(i,ii) in carouselImages" :key="ii">
          <img :alt="i" :src="i"  class="w-full max-h-[700px]  overflow-hidden object-cover  ">
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import {useKeenSlider} from 'keen-slider/vue.es'
import 'keen-slider/keen-slider.min.css'
import {carouselImages} from "@/lib/constant.ts";
import {ref} from "vue"

const loaded = ref([true]);

const [container] = useKeenSlider(
    {
      loop: true,
      initial: 0,
      animationEnded: (s) => {
        const idx = s.track.details.rel;
        loaded.value[idx] = true;
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false

        function clearNextTimeout() {
          clearTimeout(timeout)
        }
        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 3000)
        }

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })
        slider.on("dragStarted", clearNextTimeout)
        slider.on("animationEnded", nextTimeout)
        slider.on("updated", nextTimeout)
      },
    ]
)
</script>

<style scoped>

.navigation-wrapper {
  position: relative;
}

</style>
