<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Create Invoice</h1>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Invoice Form -->
      <div class="space-y-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold mb-4">Invoice Details</h2>
          
          <!-- Basic Details -->
          <div class="space-y-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700">Invoice Title</label>
              <input
                v-model="invoice.title"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                placeholder="Professional Services"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Invoice Number</label>
              <input
                v-model="invoice.invoiceNumber"
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                placeholder="INV-001"
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Date</label>
                <input
                  v-model="invoice.date"
                  type="date"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Due Date</label>
                <input
                  v-model="invoice.dueDate"
                  type="date"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                />
              </div>
            </div>
          </div>

          <!-- Your Details -->
          <div class="mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Your Details</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Business Name</label>
                <input
                  v-model="invoice.from.name"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  v-model="invoice.from.address"
                  rows="2"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input
                  v-model="invoice.from.email"
                  type="email"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  v-model="invoice.from.phone"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                />
              </div>
            </div>
          </div>

          <!-- Client Details -->
          <div class="mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Client Details</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Client Name</label>
                <input
                  v-model="invoice.client.name"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Address</label>
                <textarea
                  v-model="invoice.client.address"
                  rows="2"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                ></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input
                  v-model="invoice.client.email"
                  type="email"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  v-model="invoice.client.phone"
                  type="text"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                />
              </div>
            </div>
          </div>

          <!-- Invoice Items -->
          <div class="mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Items</h3>
            <div class="space-y-4">
              <div v-for="(item, index) in invoice.items" :key="index" class="border-b pb-4">
                <div class="grid grid-cols-12 gap-4">
                  <div class="col-span-6">
                    <label class="block text-sm font-medium text-gray-700">Description</label>
                    <input
                      v-model="item.description"
                      type="text"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                    />
                  </div>
                  <div class="col-span-2">
                    <label class="block text-sm font-medium text-gray-700">Quantity</label>
                    <input
                      v-model.number="item.quantity"
                      type="number"
                      min="1"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                    />
                  </div>
                  <div class="col-span-3">
                    <label class="block text-sm font-medium text-gray-700">Rate</label>
                    <input
                      v-model.number="item.rate"
                      type="number"
                      :min="defaultRate"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                    />
                  </div>
                  <div class="col-span-1 flex items-end">
                    <button
                      @click="removeItem(index)"
                      class="text-red-600 hover:text-red-800"
                    >
                      <span class="sr-only">Remove item</span>
                      ×
                    </button>
                  </div>
                </div>
              </div>
              <button
                @click="addItem"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
              >
                Add Item
              </button>
            </div>
          </div>

          <!-- Tax Settings -->
          <div class="mb-6">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Tax Settings</h3>
            <div class="space-y-4">
              <div class="flex items-center">
                <input
                  v-model="invoice.includeVAT"
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <label class="ml-2 block text-sm text-gray-700">Include VAT (16%)</label>
              </div>
            </div>
          </div>

          <!-- Payment Information -->
          <div>
            <h3 class="text-lg font-medium text-gray-900 mb-4">Payment Information</h3>
            <div class="space-y-4">
              <div v-for="(info, index) in invoice.paymentInfo" :key="index" class="flex items-center gap-2">
                <input
                  v-model="invoice.paymentInfo[index]"
                  type="text"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                />
                <button
                  @click="removePaymentInfo(index)"
                  class="text-red-600 hover:text-red-800"
                >
                  <span class="sr-only">Remove payment info</span>
                  ×
                </button>
              </div>
              <button
                @click="addPaymentInfo"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
              >
                Add Payment Info
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Invoice Preview -->
      <div class="lg:sticky lg:top-8">
        <InvoiceDisplay
          :invoice="invoice"
          :profession-type="profession"
          :include-digital-service-tax="isDigitalProfession"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import InvoiceDisplay from '../components/InvoiceDisplay.vue';

export default {
  name: 'InvoiceCreate',
  components: {
    InvoiceDisplay
  },

  setup() {
    const route = useRoute();
    const profession = route.query.profession || 'general';
    const defaultRate = Number(route.query.rate) || 3000;

    const invoice = ref({
      title: '',
      invoiceNumber: `INV-${new Date().getTime().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      from: {
        name: '',
        address: '',
        email: '',
        phone: ''
      },
      client: {
        name: '',
        address: '',
        email: '',
        phone: ''
      },
      items: [
        {
          description: 'Professional Services',
          quantity: 1,
          rate: defaultRate
        }
      ],
      includeVAT: false,
      paymentInfo: [
        'Bank: Your Bank Name',
        'Account Number: Your Account Number',
        'Branch: Your Branch'
      ]
    });

    const isDigitalProfession = computed(() => {
      return ['designer', 'writer'].includes(profession);
    });

    const addItem = () => {
      invoice.value.items.push({
        description: '',
        quantity: 1,
        rate: defaultRate
      });
    };

    const removeItem = (index) => {
      invoice.value.items.splice(index, 1);
    };

    const addPaymentInfo = () => {
      invoice.value.paymentInfo.push('');
    };

    const removePaymentInfo = (index) => {
      invoice.value.paymentInfo.splice(index, 1);
    };

    return {
      invoice,
      profession,
      defaultRate,
      isDigitalProfession,
      addItem,
      removeItem,
      addPaymentInfo,
      removePaymentInfo
    };
  }
};
</script>