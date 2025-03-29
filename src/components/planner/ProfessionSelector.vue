<template>
    <div class="space-y-6">
      <h3 class="text-xl font-semibold text-gray-900">Select Your Creative Profession</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button
          v-for="profession in professions"
          :key="profession.value"
          @click="selectProfession(profession.value)"
          class="p-6 text-center rounded-xl border-2 transition-all duration-300"
          :class="selectedProfession === profession.value 
            ? 'border-green-500 bg-green-50 shadow-lg' 
            : 'border-gray-200 hover:border-green-300'"
        >
          <component :is="profession.icon" class="w-8 h-8 mx-auto mb-2 text-green-600" />
          <span class="font-medium text-gray-900">{{ profession.label }}</span>
          <p class="text-sm text-gray-600 mt-1">{{ profession.hint }}</p>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  import { 
    PaintBrushIcon, 
    MusicalNoteIcon, 
    CodeBracketIcon, 
    CameraIcon, 
    PencilIcon 
  } from '@heroicons/vue/24/outline'
  
  export default {
    name: 'ProfessionSelector',
    components: {
      PaintBrushIcon,
      MusicalNoteIcon,
      CodeBracketIcon,
      CameraIcon,
      PencilIcon
    },
    props: {
      modelValue: String
    },
    emits: ['update:modelValue', 'profession-selected'],
    data() {
      return {
        selectedProfession: this.modelValue,
        professions: [
          { 
            value: 'designer',
            label: 'Graphic Designer',
            hint: 'Logos, branding, UI/UX',
            icon: 'PaintBrushIcon'
          },
          {
            value: 'musician',
            label: 'Musician',
            hint: 'Composition, production',
            icon: 'MusicalNoteIcon'
          },
          {
            value: 'developer',
            label: 'Developer',
            hint: 'Web & mobile apps',
            icon: 'CodeBracketIcon'
          },
          {
            value: 'photographer',
            label: 'Photographer',
            hint: 'Events, portraits',
            icon: 'CameraIcon'
          },
          {
            value: 'writer',
            label: 'Content Writer',
            hint: 'Articles, scripts',
            icon: 'PencilIcon'
          }
        ]
      }
    },
    methods: {
      selectProfession(profession) {
        this.selectedProfession = profession
        this.$emit('update:modelValue', profession)
        this.$emit('profession-selected', profession)
      }
    }
  }
  </script>