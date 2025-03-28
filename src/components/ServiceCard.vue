<template>
  <div class="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl hover:scale-102 hover:border-green-200 flex flex-col h-full">
    <!-- Card Header with Icon -->
    <div class="p-6 pb-0 relative">
      <!-- Decorative corner -->
      <div 
        :class="`absolute top-0 right-0 w-20 h-20 rounded-bl-full opacity-70`"
        :style="`background: ${bgGradient}`"
      ></div>
      
      <div class="relative z-10">
        <div :class="`p-4 rounded-2xl inline-block mb-4 shadow-sm ${bgClass}`">
          <component 
            :is="iconComponent" 
            :class="`w-8 h-8 ${textClass}`"
          />
        </div>
        <h3 class="text-2xl font-bold text-gray-900">{{ title }}</h3>
        <p class="text-gray-500 mt-2">{{ subtitle }}</p>
      </div>
    </div>
    
    <!-- Card Body -->
    <div v-if="!preview" class="p-6 pt-4 flex-grow">
      <ul class="text-gray-600 mb-6 space-y-3">
        <li v-for="(feature, index) in features" :key="index" class="flex items-start">
          <svg :class="`w-5 h-5 ${textClass} mr-2 mt-0.5 flex-shrink-0`" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span>{{ feature }}</span>
        </li>
      </ul>
    </div>

    <!-- Preview Image for preview cards -->
    <div v-else class="p-6 pt-4 flex-grow">
      <div class="rounded-lg mb-6 w-full h-36 bg-gradient-to-br from-teal-50 to-blue-50 border border-gray-100 flex items-center justify-center shadow-inner p-3 group-hover:shadow-md transition-all duration-300 relative">
        <img src="https://placeholder.pics/svg/300x150/DEDEDE/555555/Billing%20Planner%20Preview" alt="Billing Planner Preview" class="max-h-full rounded shadow" />
        
        <!-- Tooltip that appears on hover -->
        <div class="absolute invisible group-hover:visible bg-gray-800 text-white text-xs p-2 rounded -top-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-200 opacity-0 group-hover:opacity-100 z-10 whitespace-nowrap">
          Preview of Billing Planner Template
        </div>
      </div>
    </div>
    
    <!-- Card Footer -->
    <div class="p-6 pt-0 mt-auto">
      <router-link 
        :to="link"
        :class="`btn-primary w-full inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${buttonClass}`"
      >
        {{ linkText }}
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H3a1 1 0 110-2h9.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script>
const icons = {
  calculator: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    `
  },
  billing: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
    `
  },
  planner: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5h6m-6 4h6m-6 4h6m-6 4h6" />
      </svg>
    `
  },
  document: {
    template: `
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    `
  }
};

export default {
  name: 'ServiceCard',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: 'green'
    },
    features: {
      type: Array,
      default: () => []
    },
    preview: {
      type: Boolean,
      default: false
    },
    link: {
      type: String,
      required: true
    },
    linkText: {
      type: String,
      required: true
    }
  },
  computed: {
    iconComponent() {
      return icons[this.icon] || icons.document;
    },
    bgClass() {
      return `bg-${this.color}-50`;
    },
    textClass() {
      return `text-${this.color}-600`;
    },
    buttonClass() {
      return `bg-${this.color}-600 hover:bg-${this.color}-500`;
    },
    bgGradient() {
      const colors = {
        green: '#10B981',
        blue: '#3B82F6',
        purple: '#8B5CF6',
        teal: '#14B8A6'
      };
      const color = colors[this.color] || colors.green;
      return `linear-gradient(to bottom right, ${color}20, ${color}10)`;
    }
  }
}
</script>