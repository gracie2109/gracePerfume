<script setup >
import { computed, ref, watchEffect, reactive } from "vue";
import {formatPrice} from "@/lib/utils.ts";

const { min, max, step, minValue, maxValue } = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
  minValue: {
    type: Number,
    default: 50,
  },
  maxValue: {
    type: Number,
    default: 80,
  },
});

const emit = defineEmits(["update:minValue", "update:maxValue"]);

const slider = ref(null);
const inputMin = ref(null);
const inputMax = ref(null);
const sliderMinValue = ref(minValue);
const sliderMaxValue = ref(maxValue);


const getPercent = (value, min, max) => {
  return ((value - min) / (max - min)) * 100;
};



const setCSSProps = (left, right) => {
  slider.value.style.setProperty("--progressLeft", `${left}%`);
  slider.value.style.setProperty("--progressRight", `${right}%`);
};

watchEffect(() => {
  if (slider.value) {

    emit("update:minValue", sliderMinValue.value);
    emit("update:maxValue", sliderMaxValue.value);


    const leftPercent = getPercent(sliderMinValue.value, min, max);
    const rightPercent = 100 - getPercent(sliderMaxValue.value, min, max);


    setCSSProps(leftPercent, rightPercent);
  }
});

const onInput = ({ target }) => {
  if (target.name === 'min') {
    target.value > sliderMaxValue.value
        ? target.value = sliderMaxValue.value
        : sliderMinValue.value = parseFloat(target.value);
  }

  if (target.name === 'max') {
    target.value < sliderMinValue.value
        ? target.value = sliderMinValue.value
        : sliderMaxValue.value = parseFloat(target.value);
  }
};

</script>
<template>
  <div ref="slider" class="custom-slider minmax">
    <div class="minmax-indicator relative"></div>
    <div class="relative">
      <input
          class="top-[2px]"
          ref="inputMin"
          type="range"
          name="min"
          id="min"
          :min="min"
          :max="max"
          :value="minValue"
          :step="step"
          @input="onInput"
      />
      <div class="absolute -top-9">
        {{ formatPrice(sliderMinValue) }}
      </div>
    </div>
    <div class="relative">
        <input
            class="top-[2px]"
            ref="inputMax"
            type="range"
            name="max"
            id="max"
            :min="min"
            :max="max"
            :value="maxValue"
            :step="step"
            @input="onInput"
        />
      <div class="absolute -top-9 right-0">
        {{ formatPrice(sliderMaxValue) }}
      </div>

    </div>
  </div>

</template>


<style scoped>

.custom-slider {
  --trackHeight: 0.35rem;
  --thumbRadius: 1rem;
}

/* style the input element with type "range" */
.custom-slider input[type="range"] {
  position: relative;
  appearance: none;
  background: none;
  border-radius: 999px;
  z-index: 0;
  height: 100%;
  pointer-events: none;
}

/* ::before element to replace the slider track */
.custom-slider input[type="range"]::before {
  content: "";
  display: block;
  position: absolute;

  height: 100%;
  background: #ffffff;
  border-radius: 999px;
}

/* `::-webkit-slider-runnable-track` targets the track (background) of a range slider in chrome and safari browsers. */
.custom-slider input[type="range"]::-webkit-slider-runnable-track {
  appearance: none;
  background: #ffffff;;
  height: var(--trackHeight);
  border-radius: 999px;
}

.custom-slider input[type="range"]::-webkit-slider-thumb {
  position: relative;
  width: var(--thumbRadius);
  height: var(--thumbRadius);
  margin-top: calc((var(--trackHeight) - var(--thumbRadius)) / 2);
  background: #0f0e17;
  border: 1px solid  #0f0e17;
  border-radius: 999px;
  pointer-events: all;
  appearance: none;
  z-index: 1;
}


.custom-slider.minmax {
  position: relative;
  height: var(--trackHeight);
  background: #bbcdc7;
  border-radius: 999px;
  margin: 0.5rem 0;
  --progressLeft: 0%;
  --progressRight: 0%;
}

.custom-slider .minmax-indicator {
  position: absolute;
  height: 100%;
  pointer-events: none;
  left: var(--thumbRadius);
  right: var(--thumbRadius);
}

.custom-slider .minmax-indicator::before {
  content: "";
  position: absolute;
  background: #0f0e17;
  height: 100%;
  left: var(--progressLeft);
  right: var(--progressRight);
}

.custom-slider.minmax input[type="range"] {
  position: absolute;
  width: calc(100% - var(--thumbRadius));
}

.custom-slider.minmax input[type="range"][name="max"] {
  left: var(--thumbRadius);
}

.custom-slider.minmax input[type="range"]::-webkit-slider-runnable-track {
  background: none;
}

.custom-slider.minmax input[type="range"]::before {
  display: none;
}

.minmax-inputs {
  display: flex;
  justify-content: space-between;
}

.minmax-inputs input {
  width: 50px;
}
</style>