<script setup lang="ts">
import { ref } from 'vue'
import { useDatePicker } from './vue-datepicker/use-date-picker'

const { type } = defineProps<{
  type?: 'primary'
}>()

const selectedDates = ref([])

const { data, propGetters } = useDatePicker({
  selectedDates: selectedDates.value,
  onDatesChange: () => {},
})

function subtract() {
  propGetters.subtractOffset({ months: 1 }).onClick?.()
}

function add() {
  propGetters.addOffset({ months: 1 }).onClick?.()
}
</script>

<template>
  <button @click="subtract">
    min
  </button>
  <button @click="add">
    add
  </button>
  <div style="width: 100vw; text-align: start;">
    <pre>
<!--    {{ JSON.stringify(propGetters, null, 2) }} -->
    {{ JSON.stringify(data.calendars, null, 2) }}
  </pre>
    <!--    <div style="width: 100vw; text-align: start;"> -->
    <!--      <pre> -->
    <!--    {{ JSON.stringify(tes, null, 2) }} -->
    <!--  </pre> -->
    <!--    </div> -->
    <button class="my-button">
      ss my button: type {{ type }}
    </button>
  </div>
</template>
