<template>
  <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-20 space-y-6">
    <!-- User Profile Summary -->
    <div class="flex flex-col items-center text-center p-6 border-b border-gray-100">
      <div class="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-semibold mb-4">
        {{ userInitials }}
      </div>
      <h2 class="text-xl font-bold text-gray-800">{{ userName || 'User' }}</h2>
      <p class="text-gray-500 mt-1">{{ userEmail }}</p>
      <div class="mt-4">
        <button @click="$emit('logout')" class="text-sm font-medium text-red-600 hover:text-red-800 transition-colors">
          Sign out
        </button>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="space-y-1">
      <button 
        v-for="item in navigationItems"
        :key="item.id"
        @click="$emit('update:modelValue', item.id)"
        :class="[
          'w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors',
          modelValue === item.id 
            ? 'bg-green-50 text-green-700 border-l-4 border-green-600' 
            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
        ]"
      >
        <component 
          :is="item.icon" 
          class="mr-3 h-5 w-5"
        />
        {{ item.label }}
      </button>
    </nav>
  </div>
</template>

<script>
import { computed } from 'vue';
import {
  BookmarkIcon,
  CalculatorIcon,
  DocumentTextIcon,
  UserIcon,
  BuildingOffice2Icon,
  Cog6ToothIcon
} from '@heroicons/vue/24/outline';

export default {
  name: 'ProfileNavigation',
  components: {
    BookmarkIcon,
    CalculatorIcon,
    DocumentTextIcon,
    UserIcon,
    BuildingOffice2Icon,
    Cog6ToothIcon
  },
  props: {
    modelValue: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      default: ''
    },
    userEmail: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue', 'logout'],
  setup(props) {
    const navigationItems = [
      {
        id: 'saved',
        label: 'Saved Items',
        icon: BookmarkIcon
      },
      {
        id: 'billing',
        label: 'Billing History',
        icon: CalculatorIcon
      },
      {
        id: 'proposals',
        label: 'Proposals',
        icon: DocumentTextIcon
      },
      {
        id: 'personal',
        label: 'Personal Info',
        icon: UserIcon
      },
      {
        id: 'company',
        label: 'Company Details',
        icon: BuildingOffice2Icon
      },
      {
        id: 'settings',
        label: 'Tax Settings',
        icon: Cog6ToothIcon
      }
    ];

    const userInitials = computed(() => {
      if (props.userName) {
        return props.userName
          .split(' ')
          .map(name => name.charAt(0))
          .join('')
          .toUpperCase();
      }
      if (props.userEmail) {
        return props.userEmail.charAt(0).toUpperCase();
      }
      return 'U';
    });

    return {
      navigationItems,
      userInitials
    };
  }
};
</script>