<template>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h3 class="text-xl font-semibold text-gray-900">Services & Pricing</h3>
        <button
          @click="addService"
          class="btn-primary flex items-center px-4 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <PlusIcon class="w-4 h-4 mr-2" />
          Add Service
        </button>
      </div>
  
      <div class="space-y-4">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="p-6 rounded-xl border border-gray-200 bg-white shadow-sm"
        >
          <div class="flex gap-4 mb-4">
            <input
              v-model="service.name"
              placeholder="Service name"
              class="flex-1 p-2 border-b-2 border-gray-200 focus:border-green-500 outline-none"
            >
            <select
              v-model="service.type"
              class="p-2 border-b-2 border-gray-200 focus:border-green-500 outline-none"
            >
              <option value="hourly">Hourly</option>
              <option value="fixed">Fixed</option>
            </select>
            <input
              v-model="service.rate"
              type="number"
              placeholder="Price"
              class="w-24 p-2 border-b-2 border-gray-200 focus:border-green-500 outline-none"
            >
          </div>
          
          <textarea
            v-model="service.description"
            placeholder="Service description"
            class="w-full p-2 border-b-2 border-gray-200 focus:border-green-500 outline-none"
          ></textarea>
          
          <button
            @click="removeService(index)"
            class="mt-4 text-red-600 hover:text-red-700 flex items-center text-sm"
          >
            <TrashIcon class="w-4 h-4 mr-1" />
            Remove Service
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { PlusIcon, TrashIcon } from '@heroicons/vue/24/outline'
  
  export default {
    components: {
      PlusIcon,
      TrashIcon
    },
    props: {
      modelValue: Array
    },
    emits: ['update:modelValue'],
    data() {
      return {
        services: this.modelValue || []
      }
    },
    watch: {
      modelValue(newVal) {
        this.services = newVal
      },
      services: {
        handler(newVal) {
          this.$emit('update:modelValue', newVal)
        },
        deep: true
      }
    },
    methods: {
      addService() {
        this.services.push({
          name: '',
          type: 'hourly',
          rate: null,
          description: ''
        })
      },
      removeService(index) {
        this.services.splice(index, 1)
      }
    }
  }
  </script>