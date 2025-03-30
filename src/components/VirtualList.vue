<template>
  <div 
    class="virtual-list-container" 
    :style="{ height: containerHeight + 'px' }"
    @scroll="handleScroll"
    ref="container"
  >
    <div 
      class="virtual-list-content" 
      :style="{ height: totalHeight + 'px' }"
    >
      <div 
        class="virtual-list-items"
        :style="{ transform: `translateY(${offsetY}px)` }"
      >
        <slot
          v-for="item in visibleItems"
          :key="item.id"
          :item="item"
        ></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useThrottleFn } from '@vueuse/core'

export default {
  name: 'VirtualList',
  props: {
    items: {
      type: Array,
      required: true
    },
    itemHeight: {
      type: Number,
      required: true
    },
    containerHeight: {
      type: Number,
      default: 400
    },
    buffer: {
      type: Number,
      default: 5
    }
  },
  setup(props) {
    const container = ref(null)
    const scrollTop = ref(0)

    // Calculate the range of visible items
    const visibleRange = computed(() => {
      const start = Math.floor(scrollTop.value / props.itemHeight)
      const visibleCount = Math.ceil(props.containerHeight / props.itemHeight)
      const bufferCount = props.buffer
      
      return {
        start: Math.max(0, start - bufferCount),
        end: Math.min(props.items.length, start + visibleCount + bufferCount)
      }
    })

    // Get only the visible items
    const visibleItems = computed(() => {
      return props.items.slice(visibleRange.value.start, visibleRange.value.end)
    })

    // Calculate total content height
    const totalHeight = computed(() => {
      return props.items.length * props.itemHeight
    })

    // Calculate offset for visible items
    const offsetY = computed(() => {
      return visibleRange.value.start * props.itemHeight
    })

    // Handle scroll events with throttling for better performance
    const handleScroll = useThrottleFn((e) => {
      scrollTop.value = e.target.scrollTop
    }, 16) // Throttle to ~60fps

    // Clean up
    onUnmounted(() => {
      if (container.value) {
        container.value.removeEventListener('scroll', handleScroll)
      }
    })

    onMounted(() => {
      if (container.value) {
        container.value.addEventListener('scroll', handleScroll)
      }
    })

    return {
      container,
      visibleItems,
      totalHeight,
      offsetY,
      handleScroll
    }
  }
}
</script>

<style scoped>
.virtual-list-container {
  overflow-y: auto;
  position: relative;
  border: 1px solid #eee;
  border-radius: 0.5rem;
}

.virtual-list-content {
  position: relative;
}

.virtual-list-items {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  will-change: transform;
}
</style>