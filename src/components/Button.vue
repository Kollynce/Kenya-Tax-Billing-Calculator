<template>
  <button
    :type="type"
    :class="[
      'inline-flex items-center justify-center whitespace-nowrap rounded-md text-center',
      'border font-medium shadow-sm w-auto transition-all duration-200 ease-in-out',
      'disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2',
      sizeClasses,
      variantClasses,
      { 'flex-nowrap': !allowWrap }
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <svg
      v-if="loading"
      class="animate-spin flex-shrink-0 mr-2"
      :class="iconSizeClass"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    <span :class="{ 'truncate': truncateText }">
      <slot></slot>
    </span>
    <slot name="right-icon"></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value)
    },
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary', 'gradient', 'white', 'outline', 'kenya'].includes(value)
    },
    size: {
      type: String,
      default: 'default',
      validator: (value) => ['small', 'default', 'large'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    allowWrap: {
      type: Boolean,
      default: false
    },
    truncateText: {
      type: Boolean,
      default: false
    },
    iconPosition: {
      type: String,
      default: 'right',
      validator: (value) => ['left', 'right'].includes(value)
    }
  },
  computed: {
    variantClasses() {
      const variants = {
        primary: 'border-transparent bg-green-600 text-white hover:bg-green-500 focus:ring-green-600',
        secondary: 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-green-500 focus:ring-green-600',
        gradient: 'border-transparent bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-white hover:from-green-500 hover:via-green-400 hover:to-green-500 focus:ring-green-600 rounded-full',
        kenya: 'border-transparent bg-green-600 text-white hover:bg-green-500 focus:ring-green-600',
        white: 'border-transparent bg-white text-gray-900 hover:bg-gray-50 hover:text-green-600 focus:ring-green-600',
        outline: 'border-green-600 bg-transparent text-green-600 hover:bg-green-50 focus:ring-green-600'
      };
      return variants[this.variant];
    },
    sizeClasses() {
      const sizes = {
        small: 'px-3 py-1.5 text-sm gap-1.5',
        default: 'px-4 py-2 text-sm gap-2',
        large: 'px-6 py-3 text-base gap-2.5'
      };
      return sizes[this.size];
    },
    iconSizeClass() {
      const sizes = {
        small: 'h-3.5 w-3.5',
        default: 'h-4 w-4',
        large: 'h-5 w-5'
      };
      return sizes[this.size];
    }
  }
};
</script>

<style scoped>
.flex-nowrap {
  white-space: nowrap;
}

.inline-flex {
  display: inline-flex;
  align-items: center;
}
</style>