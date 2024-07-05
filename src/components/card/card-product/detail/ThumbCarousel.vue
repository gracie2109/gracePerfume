<template>
  <div>
    <div ref="container" class="keen-slider">
      <div class="keen-slider__slide" v-for="(i,j) in props.data.media" :key="j">
        <img :src="i" :alt="props.data.name">
      </div>
    </div>
    <div ref="thumbnail" class="keen-slider thumbnail">
      <div class="keen-slider__slide " v-for="(i,j) in props.data.media" :key="j">
        <img :src="i" :alt="props.data.name">
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


[class^="number-slide"],
[class*=" number-slide"] {
  background: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  color: #fff;
  font-weight: 500;
  height: 200px;
  max-height: 100vh;
}


.thumbnail .keen-slider__slide {
  font-size: 30px;
  margin-top: 10px;
  height: 100px;
}
.thumbnail .keen-slider__slide {
  cursor: pointer;
}
.thumbnail .keen-slider__slide.active {
  border: 1px solid #ff8906;
}


.dots {
  display: flex;
  padding: 10px 0;
  justify-content: center;
}
.dot {
  border: none;
  width: 10px;
  height: 10px;
  background: #c5c5c5;
  border-radius: 50%;
  margin: 0 5px;
  padding: 5px;
  cursor: pointer;
}
.dot:focus {
  outline: none;
}
.dot.active {
  background: #000;
}
.arrow {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  fill: #fff;
  cursor: pointer;
}
.arrow--left {
  left: 5px;
}
.arrow--right {
  left: auto;
  right: 5px;
}
.arrow--disabled {
  fill: rgba(255, 255, 255, 0.5);
}
</style>

