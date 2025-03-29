<template>
  <div class="space-y-6">
    <h3 class="text-xl font-semibold text-gray-900">Project Timeline</h3>
    
    <draggable 
      v-model="phases"
      :component-data="{
        tag: 'div',
        type: 'transition-group',
        name: !drag ? 'flip-list' : null
      }"
      handle=".handle"
      item-key="id"
      class="space-y-4"
      @start="drag=true"
      @end="drag=false"
    >
      <template #item="{element: phase, index}">
        <div class="p-6 rounded-xl border border-gray-200 bg-white shadow-sm">
          <div class="flex items-center gap-4 mb-4">
            <button class="handle cursor-move text-gray-400 hover:text-gray-600">
              <MenuIcon class="w-5 h-5" />
            </button>
            <input
              v-model="phase.name"
              placeholder="Phase name"
              class="flex-1 p-2 border-b-2 border-gray-200 focus:border-green-500 outline-none"
            >
            <input
              v-model="phase.duration"
              type="number"
              placeholder="Days"
              class="w-24 p-2 border-b-2 border-gray-200 focus:border-green-500 outline-none"
            >
            <button
              @click="removePhase(index)"
              class="text-red-600 hover:text-red-700"
            >
              <TrashIcon class="w-5 h-5" />
            </button>
          </div>
          <textarea
            v-model="phase.description"
            placeholder="Phase details"
            class="w-full p-2 border-b-2 border-gray-200 focus:border-green-500 outline-none"
          ></textarea>
        </div>
      </template>
    </draggable>

    <button
      @click="addPhase"
      class="btn-primary flex items-center px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"
    >
      <PlusIcon class="w-4 h-4 mr-2" />
      Add Phase
    </button>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { PlusIcon, TrashIcon, Bars3Icon } from '@heroicons/vue/24/outline'

export default {
  components: { 
    draggable,
    PlusIcon,
    TrashIcon,
    MenuIcon: Bars3Icon
  },
  props: {
    modelValue: Array
  },
  emits: ['update:modelValue'],
  data() {
    return {
      internalPhases: this.modelValue?.map(phase => ({
        ...phase,
        id: phase.id || Math.random()
      })) || [],
      drag: false
    }
  },
  computed: {
    phases: {
      get() {
        return this.internalPhases
      },
      set(value) {
        this.internalPhases = value
        this.$emit('update:modelValue', value)
      }
    }
  },
  watch: {
    modelValue: {
      handler(newVal) {
        if (!newVal) return
        if (JSON.stringify(newVal) !== JSON.stringify(this.internalPhases)) {
          this.internalPhases = newVal.map(phase => ({
            ...phase,
            id: phase.id || Math.random()
          }))
        }
      },
      deep: true
    }
  },
  methods: {
    addPhase() {
      const newPhase = {
        id: Math.random(),
        name: '',
        duration: 7,
        description: ''
      }
      this.internalPhases = [...this.internalPhases, newPhase]
      this.$emit('update:modelValue', this.internalPhases)
    },
    removePhase(index) {
      const updatedPhases = [...this.internalPhases]
      updatedPhases.splice(index, 1)
      this.internalPhases = updatedPhases
      this.$emit('update:modelValue', updatedPhases)
    }
  }
}
</script>