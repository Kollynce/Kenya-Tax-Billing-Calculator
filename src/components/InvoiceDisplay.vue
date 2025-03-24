<template>
  <div ref="invoiceContainer" class="bg-white p-8 shadow-lg max-w-4xl mx-auto">
    <!-- Invoice Header -->
    <div class="flex justify-between items-start mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">{{ invoice.title }}</h1>
        <p class="text-gray-600">{{ invoice.invoiceNumber }}</p>
      </div>
      <div class="text-right">
        <p class="text-gray-600">Date: {{ formatDate(invoice.date) }}</p>
        <p class="text-gray-600">Due Date: {{ formatDate(invoice.dueDate) }}</p>
      </div>
    </div>

    <!-- Business and Client Information -->
    <div class="grid grid-cols-2 gap-8 mb-8">
      <!-- From section -->
      <div>
        <h2 class="text-gray-700 font-semibold mb-2">From:</h2>
        <div class="text-gray-600">
          <p class="font-medium">{{ invoice.from.name }}</p>
          <p>{{ invoice.from.address }}</p>
          <p>{{ invoice.from.email }}</p>
          <p>{{ invoice.from.phone }}</p>
          <p v-if="vatNumber">VAT Number: {{ vatNumber }}</p>
        </div>
      </div>

      <!-- To section -->
      <div>
        <h2 class="text-gray-700 font-semibold mb-2">To:</h2>
        <div class="text-gray-600">
          <p class="font-medium">{{ invoice.client.name }}</p>
          <p>{{ invoice.client.address }}</p>
          <p>{{ invoice.client.email }}</p>
          <p>{{ invoice.client.phone }}</p>
        </div>
      </div>
    </div>

    <!-- Items Table -->
    <table class="w-full mb-8">
      <thead>
        <tr class="border-b-2 border-gray-300 text-left">
          <th class="py-2 px-2 text-gray-700">Description</th>
          <th class="py-2 px-2 text-gray-700 text-right">Quantity</th>
          <th class="py-2 px-2 text-gray-700 text-right">Rate</th>
          <th class="py-2 px-2 text-gray-700 text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in invoice.items" :key="index" class="border-b border-gray-200">
          <td class="py-2 px-2 text-gray-600">{{ item.description }}</td>
          <td class="py-2 px-2 text-gray-600 text-right">{{ item.quantity }}</td>
          <td class="py-2 px-2 text-gray-600 text-right">{{ formatCurrency(item.rate) }}</td>
          <td class="py-2 px-2 text-gray-600 text-right">{{ formatCurrency(item.quantity * item.rate) }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Totals -->
    <div class="flex justify-end mb-8">
      <div class="w-64">
        <div class="flex justify-between py-2">
          <span class="text-gray-600">Subtotal:</span>
          <span class="text-gray-800">{{ formatCurrency(totals.subtotal) }}</span>
        </div>
        <div v-if="invoice.includeVAT" class="flex justify-between py-2">
          <span class="text-gray-600">VAT ({{ (vatRate * 100).toFixed(0) }}%):</span>
          <span class="text-gray-800">{{ formatCurrency(totals.vat) }}</span>
        </div>
        <div v-if="includeDigitalServiceTax" class="flex justify-between py-2">
          <span class="text-gray-600">Digital Service Tax (1.5%):</span>
          <span class="text-gray-800">{{ formatCurrency(totals.dst) }}</span>
        </div>
        <div class="flex justify-between py-2 font-semibold border-t border-gray-300">
          <span>Total:</span>
          <span>{{ formatCurrency(totals.total) }}</span>
        </div>
      </div>
    </div>

    <!-- Notes -->
    <div v-if="templateContent.notes" class="mb-8">
      <h3 class="text-gray-700 font-semibold mb-2">Notes:</h3>
      <p class="text-gray-600 whitespace-pre-line">{{ templateContent.notes }}</p>
    </div>

    <!-- Payment Information -->
    <div v-if="invoice.paymentInfo" class="mb-8">
      <h3 class="text-gray-700 font-semibold mb-2">Payment Information:</h3>
      <div class="text-gray-600">
        <p v-for="(line, index) in invoice.paymentInfo" :key="index">{{ line }}</p>
      </div>
    </div>

    <!-- Terms -->
    <div v-if="templateContent" class="text-sm text-gray-500">
      <h3 class="text-gray-700 font-semibold mb-2">Terms and Conditions:</h3>
      <p class="whitespace-pre-line">{{ templateContent.terms }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { formatCurrency } from '../utils/taxUtils';

export default {
  name: 'InvoiceDisplay',
  props: {
    invoice: {
      type: Object,
      required: true
    },
    vatRate: {
      type: Number,
      default: 0.16 // 16% Kenya VAT rate
    },
    companyName: {
      type: String,
      default: ''
    },
    companyAddress: {
      type: String,
      default: ''
    },
    logo: {
      type: String,
      default: ''
    },
    vatNumber: {
      type: String,
      default: ''
    },
    paymentDetails: {
      type: Object,
      default: () => ({})
    },
    professionType: {
      type: String,
      default: 'general' // Options: 'designer', 'writer', 'musician', 'general'
    },
    includeDigitalServiceTax: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const totals = computed(() => {
      const subtotal = props.invoice.items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
      const vat = props.invoice.includeVAT ? subtotal * props.vatRate : 0;
      const dst = props.includeDigitalServiceTax ? subtotal * 0.015 : 0; // 1.5% Digital Service Tax
      return {
        subtotal,
        vat,
        dst,
        total: subtotal + vat + dst
      };
    });

    const professionTemplates = {
      designer: {
        terms: `This design work is protected by copyright laws. Upon full payment, the client will receive agreed-upon usage rights as specified in the project scope.
                
Payment Terms:
- 50% upfront deposit required
- Balance due within 30 days of invoice
- Late payments subject to 2% monthly interest`,
        notes: "All revisions beyond the agreed scope will be billed separately."
      },
      writer: {
        terms: `Content created remains intellectual property of the writer until full payment is received.
                
Payment Terms:
- Word count based pricing
- Additional research charged separately
- 30 days payment terms`,
        notes: "Rates may vary based on research requirements and technical complexity."
      },
      musician: {
        terms: `Music composition and rights remain with the artist until full payment.
                
Payment Terms:
- 50% deposit for custom compositions
- Usage rights as per agreement
- 30 days payment terms`,
        notes: "Additional arrangements or instrumentations will be quoted separately."
      },
      general: {
        terms: "Standard 30-day payment terms apply.",
        notes: "Thank you for your business."
      }
    };

    const templateContent = computed(() => professionTemplates[props.professionType] || professionTemplates.general);

    const formatDate = (date) => {
      if (!date) return '';
      return new Date(date).toLocaleDateString('en-KE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    return {
      totals,
      templateContent,
      formatDate,
      formatCurrency
    };
  }
};
</script>

<style scoped>
@media print {
  .invoice-container {
    padding: 0;
    margin: 0;
    box-shadow: none;
  }
}
</style>