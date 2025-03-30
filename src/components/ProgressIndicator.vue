<template>
  <div class="space-y-4">
    <!-- Progress Bar -->
    <div class="relative pt-1">
      <div class="flex mb-2 items-center justify-between">
        <div>
          <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full"
                :class="[percentage === 100 ? 'text-green-600 bg-green-200' : 'text-blue-600 bg-blue-200']">
            {{ status }}
          </span>
        </div>
        <div class="text-right">
          <span class="text-xs font-semibold inline-block text-blue-600">
            {{ percentage }}%
          </span>
        </div>
      </div>
      <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-50">
        <div :style="{ width: percentage + '%' }"
             class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500"
             :class="[percentage === 100 ? 'bg-green-500' : 'bg-blue-500']">
        </div>
      </div>
    </div>

    <!-- Steps List -->
    <div class="space-y-2">
      <div v-for="(step, index) in steps" :key="index"
           class="flex items-center p-2 rounded-lg transition-colors duration-200"
           :class="[
             currentStep >= index ? 'bg-blue-50' : 'bg-gray-50',
             currentStep === index ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
           ]">
        <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full"
             :class="[
               currentStep > index ? 'bg-green-500' : currentStep === index ? 'bg-blue-500' : 'bg-gray-300'
             ]">
          <CheckIcon v-if="currentStep > index" class="w-5 h-5 text-white" />
          <span v-else class="text-white text-sm font-medium">{{ index + 1 }}</span>
        </div>
        <div class="ml-4 flex-1">
          <p class="text-sm font-medium"
             :class="[
               currentStep > index ? 'text-green-600' : 
               currentStep === index ? 'text-blue-600' : 
               'text-gray-500'
             ]">
            {{ step.name }}
          </p>
          <p class="text-xs text-gray-500">{{ step.description }}</p>
        </div>
        <div v-if="currentStep >= index" class="ml-4">
          <div v-if="step.error" class="text-red-500 text-xs">{{ step.error }}</div>
          <div v-else-if="step.complete" class="text-green-500 text-xs">Complete</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import CheckIcon from './icons/CheckIcon.vue'

export default {
  name: 'ProgressIndicator',
  components: {
    CheckIcon
  },
  props: {
    steps: {
      type: Array,
      required: true,
      validator: (steps) => steps.every(step => 
        typeof step.name === 'string' && 
        typeof step.description === 'string' &&
        (!step.error || typeof step.error === 'string') &&
        typeof step.complete === 'boolean'
      )
    },
    currentStep: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const percentage = computed(() => {
      const completedSteps = props.steps.filter(step => step.complete).length
      return Math.round((completedSteps / props.steps.length) * 100)
    })

    const status = computed(() => {
      if (percentage.value === 100) return 'Complete'
      if (percentage.value > 0) return 'In Progress'
      return 'Not Started'
    })

    return {
      percentage,
      status
    }
  }
}
</script>