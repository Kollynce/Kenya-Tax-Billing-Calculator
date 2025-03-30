<template>
  <div class="space-y-4">
    <h4 class="text-lg font-medium text-gray-900">Tax Settings</h4>
    
    <div class="bg-white p-6 rounded-lg border border-gray-200">
      <!-- VAT Registration -->
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="vatRegistered"
              v-model="taxSettings.isVatRegistered"
              class="h-4 w-4 text-green-600 rounded border-gray-300"
              @change="updateTaxSettings"
            />
            <label for="vatRegistered" class="ml-2 text-sm text-gray-700">
              VAT Registered Business
            </label>
          </div>
          <span class="text-sm text-gray-500">+16% VAT</span>
        </div>
        
        <div v-if="taxSettings.isVatRegistered" class="mt-4">
          <label class="block text-sm font-medium text-gray-700">VAT Number</label>
          <input
            v-model="taxSettings.vatNumber"
            type="text"
            class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., P051234567X"
            @input="updateTaxSettings"
          />
        </div>
      </div>

      <!-- Digital Service Tax -->
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="digitalServiceTax"
              v-model="taxSettings.hasDigitalServiceTax"
              class="h-4 w-4 text-green-600 rounded border-gray-300"
              @change="updateTaxSettings"
              :disabled="!isDigitalService"
            />
            <label for="digitalServiceTax" class="ml-2 text-sm text-gray-700">
              Digital Service Tax
              <span v-if="!isDigitalService" class="text-gray-500">(Not applicable)</span>
            </label>
          </div>
          <span class="text-sm text-gray-500">+1.5% DST</span>
        </div>
      </div>

      <!-- Withholding Tax -->
      <div class="mb-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              type="checkbox"
              id="withholdingTax"
              v-model="taxSettings.hasWithholdingTax"
              class="h-4 w-4 text-green-600 rounded border-gray-300"
              @change="updateTaxSettings"
            />
            <label for="withholdingTax" class="ml-2 text-sm text-gray-700">
              Withholding Tax
            </label>
          </div>
          <span class="text-sm text-gray-500">-5% WHT</span>
        </div>
      </div>

      <!-- Tax Summary -->
      <div class="mt-6 pt-6 border-t border-gray-200">
        <h5 class="text-sm font-medium text-gray-900 mb-4">Tax Summary</h5>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-600">Subtotal:</span>
            <span class="font-medium">KES {{ formatCurrency(subtotal) }}</span>
          </div>
          
          <div v-if="taxSettings.isVatRegistered" class="flex justify-between">
            <span class="text-gray-600">VAT (16%):</span>
            <span class="font-medium">KES {{ formatCurrency(vatAmount) }}</span>
          </div>
          
          <div v-if="taxSettings.hasDigitalServiceTax" class="flex justify-between">
            <span class="text-gray-600">Digital Service Tax (1.5%):</span>
            <span class="font-medium">KES {{ formatCurrency(dstAmount) }}</span>
          </div>
          
          <div v-if="taxSettings.hasWithholdingTax" class="flex justify-between">
            <span class="text-gray-600">Withholding Tax (5%):</span>
            <span class="font-medium text-red-600">-KES {{ formatCurrency(whtAmount) }}</span>
          </div>
          
          <div class="flex justify-between pt-2 border-t border-gray-200 text-base font-semibold">
            <span>Total:</span>
            <span>KES {{ formatCurrency(total) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue'
import { formatCurrency } from '@/utils/taxUtils'

export default {
  name: 'TaxSettings',
  props: {
    baseAmount: {
      type: Number,
      required: true
    },
    profession: {
      type: String,
      required: true
    }
  },
  emits: ['update'],
  setup(props, { emit }) {
    const taxSettings = reactive({
      isVatRegistered: false,
      vatNumber: '',
      hasDigitalServiceTax: false,
      hasWithholdingTax: false
    })

    const isDigitalService = computed(() => {
      return ['designer', 'writer', 'developer'].includes(props.profession)
    })

    const subtotal = computed(() => props.baseAmount)

    const vatAmount = computed(() => {
      if (!taxSettings.isVatRegistered) return 0
      return subtotal.value * 0.16
    })

    const dstAmount = computed(() => {
      if (!taxSettings.hasDigitalServiceTax || !isDigitalService.value) return 0
      return subtotal.value * 0.015
    })

    const whtAmount = computed(() => {
      if (!taxSettings.hasWithholdingTax) return 0
      return subtotal.value * 0.05
    })

    const total = computed(() => {
      return subtotal.value + vatAmount.value + dstAmount.value - whtAmount.value
    })

    const updateTaxSettings = () => {
      emit('update', {
        ...taxSettings,
        summary: {
          subtotal: subtotal.value,
          vat: vatAmount.value,
          dst: dstAmount.value,
          wht: whtAmount.value,
          total: total.value
        }
      })
    }

    return {
      taxSettings,
      isDigitalService,
      subtotal,
      vatAmount,
      dstAmount,
      whtAmount,
      total,
      formatCurrency,
      updateTaxSettings
    }
  }
}
</script>