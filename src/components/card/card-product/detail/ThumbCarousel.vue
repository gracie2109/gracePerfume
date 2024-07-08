<template>
  <div>
    <div ref="container" class="keen-slider w-full max-h-96 h-96 pb-5">
      <div class="keen-slider__slide" v-for="(i,j) in props.data.images" :key="j">
        <img :src="i" :alt="props.data.name" class="w-full h-full object-cover" />
      </div>
    </div>
    <div ref="thumbnail" class="keen-slider thumbnail max-h-20 h-20 w-full cursor-pointer">
      <div class="keen-slider__slide " v-for="(i,j) in props.data.images" :key="j">
        <img :src="i" :alt="props.data.name" class="w-full h-full object-cover">
      </div>


    </div>
  </div>
</template>


<script setup lang="js">
import { useKeenSlider } from "keen-slider/vue"
import "keen-slider/keen-slider.min.css"
import {computed} from "vue";

const props = defineProps({
  data:{type: Object}
})


const [container, slider] = useKeenSlider()
const [thumbnail] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(slider)]
)
const dotHelper = computed(() => slider.value ? [...Array(slider.value.track.details.slides.length).keys()] : [])



function ThumbnailPlugin(main) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active")
      })
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active")
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          main.value.moveToIdx(idx)
        })
      })
    }

    slider.on("created", () => {
      addActive(slider.track.details.rel)
      addClickEvents()
      main.value.on("animationStarted", () => {
        removeActive()
        const next = main.value.animator.targetIdx || 0
        addActive(main.value.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}
</script>

<style scoped>
.thumbnail .keen-slider__slide.active {
  border: 1px solid #ff8906;
  padding: 2px
}
</style>

