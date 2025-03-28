<!-- Invoice Preview Component -->
<template>
  <div class="invoice-preview">
    <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
         :class="{'border-green-200': selectedTheme === 'green',
                 'border-blue-200': selectedTheme === 'blue',
                 'border-purple-200': selectedTheme === 'purple',
                 'border-pink-200': selectedTheme === 'pink',
                 'border-yellow-200': selectedTheme === 'yellow'}">
      <!-- Preview Header -->
      <div class="p-4 bg-gray-50 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h4 class="font-medium text-gray-800">Invoice Preview</h4>
          <span class="px-3 py-1 text-sm font-medium rounded-full" 
                :class="{'bg-green-100 text-green-800': selectedTheme === 'green',
                        'bg-blue-100 text-blue-800': selectedTheme === 'blue',
                        'bg-purple-100 text-purple-800': selectedTheme === 'purple',
                        'bg-pink-100 text-pink-800': selectedTheme === 'pink',
                        'bg-yellow-100 text-yellow-800': selectedTheme === 'yellow'}">
            Live Preview
          </span>
        </div>
      </div>
      
      <!-- Preview Content -->
      <div class="p-4" :class="{'p-2': invoice.compactLayout, 'p-6': invoice.detailedLayout}">
        <div class="mb-6" :class="{'mb-3': invoice.compactLayout, 'mb-8': invoice.detailedLayout}">
          <div class="flex justify-between items-start mb-4" 
               :class="{'flex-col space-y-3': invoice.detailedLayout}">
            <div>
              <!-- Logo Section -->
              <div v-if="addLogo && logoUrl" class="mb-3">
                <img :src="logoUrl" alt="Business Logo" 
                     :class="{'h-16': !invoice.compactLayout, 'h-10': invoice.compactLayout, 'h-20': invoice.detailedLayout}" 
                     class="object-contain mb-2" />
              </div>
              <div class="font-medium" 
                   :class="{'text-lg': !invoice.compactLayout, 'text-base': invoice.compactLayout, 'text-xl': invoice.detailedLayout,
                           'text-green-800': selectedTheme === 'green',
                           'text-blue-800': selectedTheme === 'blue',
                           'text-purple-800': selectedTheme === 'purple',
                           'text-pink-800': selectedTheme === 'pink',
                           'text-yellow-800': selectedTheme === 'yellow'}">
                {{ invoice.from.name || 'Your Business Name' }}
              </div>
              <div class="text-gray-600"
                   :class="{'text-sm': !invoice.compactLayout || invoice.compactLayout, 'text-base': invoice.detailedLayout}">
                {{ invoice.from.address || 'Your Address' }}
              </div>
            </div>
            <div :class="{'text-right': !invoice.detailedLayout}">
              <div class="font-medium text-gray-800" 
                   :class="{'text-lg': !invoice.compactLayout, 'text-base': invoice.compactLayout, 'text-xl': invoice.detailedLayout}">
                {{ invoice.title || 'INVOICE' }}
              </div>
              <div :class="{'text-sm': !invoice.detailedLayout, 'text-base': invoice.detailedLayout, 
                           'text-green-600': selectedTheme === 'green',
                           'text-blue-600': selectedTheme === 'blue',
                           'text-purple-600': selectedTheme === 'purple',
                           'text-pink-600': selectedTheme === 'pink',
                           'text-yellow-600': selectedTheme === 'yellow'}">#{{ invoice.invoiceNumber }}</div>
            </div>
          </div>
          
          <div class="flex justify-between text-gray-600 mb-4" 
               :class="{'text-sm': !invoice.detailedLayout, 'text-base': invoice.detailedLayout, 
                        'flex-col space-y-3': invoice.detailedLayout}">
            <div>
              <div class="font-medium" v-if="invoice.detailedLayout">To:</div>
              <div>{{ invoice.detailedLayout ? '' : 'To: ' }}{{ invoice.client.name || 'Client Name' }}</div>
              <div>{{ invoice.client.email || 'client@email.com' }}</div>
              <div>{{ invoice.client.address || 'Client Address' }}</div>
            </div>
            <div :class="{'text-right': !invoice.detailedLayout}">
              <div class="font-medium" v-if="invoice.detailedLayout">Dates:</div>
              <div>Issue Date: {{ invoice.date }}</div>
              <div>Due Date: {{ invoice.dueDate }}</div>
            </div>
          </div>
        </div>
        
        <!-- Items Table -->
        <table class="w-full mb-4" :class="{'text-sm': !invoice.detailedLayout, 'text-base': invoice.detailedLayout}">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-2 font-medium text-gray-600">Description</th>
              <th class="text-right py-2 font-medium text-gray-600">Qty</th>
              <th class="text-right py-2 font-medium text-gray-600">Rate</th>
              <th class="text-right py-2 font-medium text-gray-600">Tax</th>
              <th class="text-right py-2 font-medium text-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in invoice.items" :key="index" class="border-b border-gray-100">
              <td class="py-2 text-gray-800">{{ item.description || 'Item Description' }}</td>
              <td class="py-2 text-gray-800 text-right">{{ item.quantity || 1 }}</td>
              <td class="py-2 text-gray-800 text-right">KES {{ item.rate }}</td>
              <td class="py-2 text-gray-800 text-right">{{ item.tax || 0 }}%</td>
              <td class="py-2 text-gray-800 text-right">KES {{ item.rate * (item.quantity || 1) }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td class="pt-2 text-right font-medium" colspan="4">Subtotal</td>
              <td class="pt-2 text-right font-medium">KES {{ calculateSubtotal() }}</td>
            </tr>
            <tr v-if="invoice.includeVAT">
              <td class="py-1 text-right text-gray-600" colspan="4">VAT (16%)</td>
              <td class="py-1 text-right text-gray-600">KES {{ calculateVAT() }}</td>
            </tr>
            <tr v-if="includeDigitalServiceTax">
              <td class="py-1 text-right text-gray-600" colspan="4">Digital Service Tax (1.5%)</td>
              <td class="py-1 text-right text-gray-600">KES {{ calculateDST() }}</td>
            </tr>
            <tr>
              <td class="py-2 text-right font-medium" colspan="4"
                  :class="{'text-green-700': selectedTheme === 'green',
                          'text-blue-700': selectedTheme === 'blue',
                          'text-purple-700': selectedTheme === 'purple',
                          'text-pink-700': selectedTheme === 'pink',
                          'text-yellow-700': selectedTheme === 'yellow'}">Total</td>
              <td class="py-2 text-right font-medium"
                  :class="{'text-green-700': selectedTheme === 'green',
                          'text-blue-700': selectedTheme === 'blue',
                          'text-purple-700': selectedTheme === 'purple',
                          'text-pink-700': selectedTheme === 'pink',
                          'text-yellow-700': selectedTheme === 'yellow'}">
                KES {{ calculateTotal() }}
              </td>
            </tr>
          </tfoot>
        </table>
        
        <!-- Payment Info with themed border -->
        <div v-if="invoice.paymentInfo.length > 0" 
             class="mt-6 text-gray-600 pt-4"
             :class="{'text-sm': !invoice.detailedLayout, 'text-base': invoice.detailedLayout,
                     'mt-3': invoice.compactLayout, 'mt-8': invoice.detailedLayout,
                     'border-t border-green-100': selectedTheme === 'green',
                     'border-t border-blue-100': selectedTheme === 'blue',
                     'border-t border-purple-100': selectedTheme === 'purple',
                     'border-t border-pink-100': selectedTheme === 'pink',
                     'border-t border-yellow-100': selectedTheme === 'yellow'}">
          <div class="font-medium text-gray-700 mb-1">Payment Details:</div>
          <div v-for="(info, index) in invoice.paymentInfo" :key="index">{{ info }}</div>
        </div>

        <!-- Notes section for detailed layout -->
        <div v-if="invoice.notes && invoice.detailedLayout" 
             class="mt-6 text-gray-600 pt-4 border-t border-gray-100">
          <div class="font-medium text-gray-700 mb-1">Notes:</div>
          <div>{{ invoice.notes }}</div>
        </div>

        <!-- Footer with themed border -->
        <div v-if="invoice.footer" 
             class="mt-6 text-gray-600 text-center pt-4"
             :class="{'text-sm': !invoice.detailedLayout, 'text-base': invoice.detailedLayout,
                     'mt-3': invoice.compactLayout, 'mt-8': invoice.detailedLayout,
                     'border-t border-green-100': selectedTheme === 'green',
                     'border-t border-blue-100': selectedTheme === 'blue',
                     'border-t border-purple-100': selectedTheme === 'purple',
                     'border-t border-pink-100': selectedTheme === 'pink',
                     'border-t border-yellow-100': selectedTheme === 'yellow'}">
          {{ invoice.footer }}
        </div>

        <!-- Template identifier for detailed layout -->
        <div v-if="invoice.detailedLayout" class="mt-8 text-xs text-gray-400 text-right">
          Created with My Tax Calculator
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InvoicePreview',
  props: {
    invoice: {
      type: Object,
      required: true
    },
    selectedTheme: {
      type: String,
      required: true
    },
    addLogo: {
      type: Boolean,
      required: true
    },
    logoUrl: {
      type: String,
      default: ''
    },
    includeDigitalServiceTax: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    calculateSubtotal() {
      const itemsTotal = this.invoice.items.reduce((total, item) => {
        return total + (item.rate * (item.quantity || 1));
      }, 0);
      
      const expensesTotal = this.invoice.expenses?.reduce((total, expense) => {
        return total + (expense.amount || 0);
      }, 0) || 0;
      
      return itemsTotal + expensesTotal;
    },
    calculateVAT() {
      return this.invoice.includeVAT ? this.calculateSubtotal() * 0.16 : 0;
    },
    calculateDST() {
      return this.includeDigitalServiceTax ? this.calculateSubtotal() * 0.015 : 0;
    },
    calculateTotal() {
      return this.calculateSubtotal() + this.calculateVAT() + this.calculateDST();
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-KE', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  }
};
</script>

<style scoped>
.invoice-preview {
  width: 100%;
  height: auto;
  min-height: 100%;
  transition: all 0.3s ease-in-out;
}

/* Remove any fixed positioning or height constraints */
.invoice-preview > div {
  height: auto;
  position: relative;
}

/* Smooth content transitions */
.invoice-preview :deep(*) {
  transition: all 0.2s ease-in-out;
}

/* Custom scrollbar styles */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 9999px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 9999px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}

@keyframes pulse-animation {
  0% {
    box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(251, 191, 36, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(251, 191, 36, 0);
  }
}

.invoice-preview.highlight-preview {
  animation: pulse-animation 1.5s;
}

/* Smooth height transitions */
.invoice-preview {
  transition: max-height 0.3s ease-in-out;
}

/* Remove sticky positioning as it's handled by parent */
:deep(.sticky) {
  position: relative;
}
</style>