<template>
  <div 
    :class="[
      'flex items-center justify-center',
      overlay ? 'fixed inset-0 bg-gray-900 bg-opacity-50 z-50' : ''
    ]"
  >
    <div class="relative">
      <div 
        class="animate-spin rounded-full border-4 border-gray-200"
        :class="[
          size === 'sm' ? 'h-6 w-6' : size === 'lg' ? 'h-12 w-12' : 'h-8 w-8',
          `border-t-${color}`
        ]"
      ></div>
      <span v-if="label" class="mt-2 block text-sm text-center" :class="`text-${color}`">
        {{ label }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    size: {
      type: String,
      default: 'md',
      validator: (value) => ['sm', 'md', 'lg'].includes(value)
    },
    color: {
      type: String,
      default: 'green-600'
    },
    label: {
      type: String,
      default: ''
    },
    overlay: {
      type: Boolean,
      default: false
    }
  }
}
</script>