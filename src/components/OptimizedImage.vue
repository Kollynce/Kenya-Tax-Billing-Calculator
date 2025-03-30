<template>
  <div class="relative" :class="{ 'overflow-hidden': rounded }">
    <img
      :src="src"
      :alt="alt"
      :class="[
        'w-full transition-opacity duration-300',
        { 'rounded-lg': rounded },
        { 'opacity-0': !imageLoaded },
        { 'opacity-100': imageLoaded }
      ]"
      :width="width"
      :height="height"
      @load="handleImageLoad"
      @error="handleImageError"
      loading="lazy"
    />
    
    <!-- Loading Placeholder -->
    <div 
      v-if="!imageLoaded && !error"
      class="absolute inset-0 bg-gray-100 animate-pulse"
      :class="{ 'rounded-lg': rounded }"
      role="presentation"
    ></div>
    
    <!-- Error State -->
    <div 
      v-if="error"
      class="absolute inset-0 flex items-center justify-center bg-gray-50 border border-gray-200"
      :class="{ 'rounded-lg': rounded }"
    >
      <div class="text-center p-4">
        <svg 
          class="mx-auto h-8 w-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p class="mt-2 text-sm text-gray-500">Failed to load image</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'OptimizedImage',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    width: {
      type: [Number, String],
      default: 'auto'
    },
    height: {
      type: [Number, String],
      default: 'auto'
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const imageLoaded = ref(false)
    const error = ref(false)

    const handleImageLoad = () => {
      imageLoaded.value = true
      error.value = false
    }

    const handleImageError = () => {
      imageLoaded.value = false
      error.value = true
    }

    return {
      imageLoaded,
      error,
      handleImageLoad,
      handleImageError
    }
  }
}
</script>