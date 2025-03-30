<template>
  <div class="space-y-6">
    <h3 class="text-lg font-medium text-gray-900">Choose a Package</h3>
    <p class="text-gray-600">Select a pricing package that best fits your project</p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div 
        v-for="(pricing, index) in availablePackages" 
        :key="index"
        class="relative bg-white p-6 rounded-lg border transition-all duration-300 transform hover:scale-105"
        :class="[
          selectedPackage === pricing ? 'border-green-500 ring-2 ring-green-500 ring-opacity-50' : 'border-gray-200'
        ]"
        role="button"
        tabindex="0"
        @click="selectPackage(pricing)"
        @keyup.enter="selectPackage(pricing)"
      >
        <!-- Popular Badge -->
        <div 
          v-if="pricing.popular"
          class="absolute -top-2 -right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium"
        >
          Popular
        </div>

        <div class="space-y-4">
          <!-- Package Header -->
          <div>
            <h4 class="text-lg font-semibold text-gray-900">{{ pricing.name }}</h4>
            <p class="text-sm text-gray-500">{{ pricing.description }}</p>
          </div>

          <!-- Price -->
          <div class="flex items-baseline">
            <span class="text-2xl font-bold text-gray-900">{{ formatCurrency(pricing.basePrice) }}</span>
            <span class="text-gray-500 text-sm ml-1">{{ pricing.priceLabel }}</span>
          </div>

          <!-- Features -->
          <ul class="space-y-3">
            <li 
              v-for="(feature, featureIndex) in pricing.features" 
              :key="featureIndex"
              class="flex items-start"
            >
              <svg 
                class="h-5 w-5 text-green-500 mt-1 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span class="text-gray-600">{{ feature }}</span>
            </li>
          </ul>

          <!-- Package Options -->
          <div v-if="pricing.options" class="space-y-3">
            <div 
              v-for="(option, optionIndex) in pricing.options" 
              :key="optionIndex"
              class="flex items-center justify-between"
            >
              <div class="flex items-center">
                <input
                  :id="'option-' + index + '-' + optionIndex"
                  type="checkbox"
                  v-model="selectedOptions[pricing.name][option.name]"
                  class="h-4 w-4 text-green-600 rounded focus:ring-green-500"
                  @change="calculateTotal(pricing)"
                />
                <label 
                  :for="'option-' + index + '-' + optionIndex"
                  class="ml-2 text-sm text-gray-700"
                >
                  {{ option.name }}
                </label>
              </div>
              <span class="text-sm text-gray-500">+{{ formatCurrency(option.price) }}</span>
            </div>
          </div>

          <!-- Total Price -->
          <div class="pt-4 border-t border-gray-100">
            <div class="flex justify-between items-baseline">
              <span class="text-sm text-gray-500">Total:</span>
              <span class="text-xl font-bold text-gray-900">{{ formatCurrency(packageTotals[pricing.name] || pricing.basePrice) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue'
import { formatCurrency } from '@/utils/taxUtils'

export default {
  name: 'TieredPricing',
  props: {
    profession: {
      type: String,
      required: true
    }
  },
  emits: ['select'],
  setup(props, { emit }) {
    const selectedPackage = ref(null)
    const selectedOptions = reactive({})
    const packageTotals = reactive({})

    const availablePackages = computed(() => {
      // Define packages based on profession
      const packages = {
        designer: [
          {
            name: 'Basic',
            description: 'Perfect for simple design projects',
            basePrice: 15000,
            priceLabel: 'starting from',
            features: [
              'One design concept',
              '2 revisions',
              'Source files included',
              'Basic support'
            ],
            options: [
              { name: 'Additional concept', price: 5000 },
              { name: 'Rush delivery (24h)', price: 7500 }
            ]
          },
          {
            name: 'Professional',
            description: 'For businesses needing more options',
            basePrice: 30000,
            priceLabel: 'most value',
            popular: true,
            features: [
              'Three design concepts',
              'Unlimited revisions',
              'Source files included',
              'Priority support',
              'Social media files'
            ],
            options: [
              { name: 'Brand guidelines', price: 10000 },
              { name: 'Rush delivery (24h)', price: 10000 }
            ]
          },
          {
            name: 'Enterprise',
            description: 'Complete branding solution',
            basePrice: 50000,
            priceLabel: 'full package',
            features: [
              'Five design concepts',
              'Unlimited revisions',
              'All source files',
              '24/7 support',
              'Brand guidelines',
              'Social media kit',
              'Print-ready files'
            ],
            options: [
              { name: 'Website design', price: 25000 },
              { name: 'Marketing materials', price: 15000 }
            ]
          }
        ],
        writer: [
          // Define writer packages similarly
          {
            name: 'Basic',
            description: 'For simple content needs',
            basePrice: 10000,
            priceLabel: 'per 1000 words',
            features: [
              'SEO-optimized content',
              '1 revision',
              'Basic research',
              'Blog post format'
            ],
            options: [
              { name: 'Additional revision', price: 2000 },
              { name: 'Rush delivery (24h)', price: 5000 }
            ]
          },
          // Add more packages for other professions
        ]
      }

      return packages[props.profession] || []
    })

    const initializeSelectedOptions = (pkg) => {
      if (!selectedOptions[pkg.name]) {
        selectedOptions[pkg.name] = {}
        pkg.options?.forEach(option => {
          selectedOptions[pkg.name][option.name] = false
        })
      }
    }

    const calculateTotal = (pkg) => {
      let total = pkg.basePrice
      if (selectedOptions[pkg.name]) {
        pkg.options?.forEach(option => {
          if (selectedOptions[pkg.name][option.name]) {
            total += option.price
          }
        })
      }
      packageTotals[pkg.name] = total
    }

    const selectPackage = (pkg) => {
      selectedPackage.value = pkg
      initializeSelectedOptions(pkg)
      calculateTotal(pkg)
      
      emit('select', {
        package: pkg,
        selectedOptions: selectedOptions[pkg.name],
        total: packageTotals[pkg.name]
      })
    }

    return {
      selectedPackage,
      selectedOptions,
      packageTotals,
      availablePackages,
      selectPackage,
      calculateTotal,
      formatCurrency
    }
  }
}
</script>