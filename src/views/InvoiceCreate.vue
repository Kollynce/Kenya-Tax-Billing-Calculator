<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <!-- Enhanced Header Section -->
    <div class="mb-8">
      <div class="flex items-center space-x-3 mb-4">
        <span class="inline-block px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
          Professional Invoice
        </span>
        <span class="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
          KRA Compliant
        </span>
      </div>
      <h1 class="text-3xl font-bold text-gray-900 mb-3 gradient-heading">Create Professional Invoice</h1>
      <p class="text-lg text-gray-600">Generate detailed invoices that reflect your expertise</p>
    </div>

    <!-- Replace tab navigation with accordion grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Left Column: Accordion Sections -->
      <div class="space-y-4">
        <!-- Branding Section -->
        <div class="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl border border-green-100 hover:border-green-200 transition-all duration-300">
          <button 
            @click="activeSection = activeSection === 'branding' ? '' : 'branding'"
            class="w-full p-4 flex items-start space-x-3 text-left"
          >
            <div class="p-2 bg-white rounded-lg shadow-sm">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-gray-900">Invoice Branding</h3>
              <p class="text-sm text-gray-600 mt-1">Customize your invoice appearance and branding</p>
            </div>
          </button>
          <div v-show="activeSection === 'branding'" class="p-4 pt-0">
            <div class="border-t border-green-200 pt-4">
              <!-- Existing branding form content -->
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Invoice Title</label>
                  <input v-model="invoice.title" type="text" placeholder="Professional Invoice / Service Invoice" 
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 transition-all duration-200"/>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Invoice Number</label>
                    <input v-model="invoice.invoiceNumber" type="text" 
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 transition-all duration-200"/>
                    <p class="mt-1 text-xs text-gray-500">Automatically generated</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Color Theme</label>
                    <div class="mt-1 flex space-x-2">
                      <div v-for="(color, index) in colorThemes" :key="index"
                           @click="selectedTheme = color.value"
                           class="w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110"
                           :class="[selectedTheme === color.value ? 'ring-2 ring-offset-2 ring-gray-500' : '']"
                           :style="{ backgroundColor: color.color }">
                      </div>
                    </div>
                  </div>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Issue Date</label>
                    <input v-model="invoice.date" type="date" 
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 transition-all duration-200"/>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Due Date</label>
                    <input v-model="invoice.dueDate" type="date" 
                          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 transition-all duration-200"/>
                  </div>
                </div>
                
                <div class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="addLogo"
                    v-model="addLogo"
                    class="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                  />
                  <label for="addLogo" class="text-sm text-gray-700">Include Logo</label>
                  <input
                    v-if="addLogo"
                    ref="logoUpload"
                    type="file"
                    accept="image/*"
                    class="hidden"
                    @change="onLogoUpload"
                  />
                  <button 
                    v-if="addLogo"
                    @click="$refs.logoUpload.click()"
                    type="button"
                    class="ml-2 inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200"
                  >
                    {{ logoUrl ? 'Change Logo' : 'Upload Logo' }}
                  </button>
                </div>
                <div v-if="addLogo && logoUrl" class="mt-2">
                  <img :src="logoUrl" alt="Logo Preview" class="h-16 object-contain" />
                </div>
              </div>

              <!-- Section navigation -->
              <div class="flex justify-end mt-6">
                <button @click="nextSection('business')" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center">
                  Next: Your Details
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Business Details Section -->
        <div class="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border border-blue-100 hover:border-blue-200 transition-all duration-300">
          <button 
            @click="activeSection = activeSection === 'business' ? '' : 'business'"
            class="w-full p-4 flex items-start space-x-3 text-left"
          >
            <div class="p-2 bg-white rounded-lg shadow-sm">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-gray-900">Business Details</h3>
              <p class="text-sm text-gray-600 mt-1">Add your business information and contact details</p>
            </div>
          </button>
          <div v-show="activeSection === 'business'" class="p-4 pt-0">
            <div class="border-t border-blue-200 pt-4">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700">Business Name</label>
                  <input v-model="invoice.from.name" type="text" 
                         class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 transition-all duration-200"/>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    v-model="invoice.from.address"
                    rows="2"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 transition-all duration-200"
                  ></textarea>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      v-model="invoice.from.email"
                      type="email"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      v-model="invoice.from.phone"
                      type="tel"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600 transition-all duration-200"
                    />
                  </div>
                </div>
              </div>

              <!-- Section navigation -->
              <div class="flex justify-between mt-6">
                <button @click="nextSection('branding')" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <button @click="nextSection('client')" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center">
                  Next: Client Details
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Client Section -->
        <div class="bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl border border-purple-100 hover:border-purple-200 transition-all duration-300">
          <button 
            @click="activeSection = activeSection === 'client' ? '' : 'client'"
            class="w-full p-4 flex items-start space-x-3 text-left"
          >
            <div class="p-2 bg-white rounded-lg shadow-sm">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-gray-900">Client Details</h3>
              <p class="text-sm text-gray-600 mt-1">Add your client's information and contact details</p>
            </div>
          </button>
          <div v-show="activeSection === 'client'" class="p-4 pt-0">
            <div class="border-t border-purple-200 pt-4">
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
                <div class="grid grid-cols-2 gap-4">
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
                      type="tel"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                    />
                  </div>
                </div>
              </div>

              <!-- Section navigation -->
              <div class="flex justify-between mt-6">
                <button @click="nextSection('business')" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <button @click="nextSection('items')" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center">
                  Next: Invoice Items
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Items Section -->
        <div class="bg-gradient-to-br from-teal-50 to-cyan-100 rounded-xl border border-teal-100 hover:border-teal-200 transition-all duration-300">
          <button 
            @click="activeSection = activeSection === 'items' ? '' : 'items'"
            class="w-full p-4 flex items-start space-x-3 text-left"
          >
            <div class="p-2 bg-white rounded-lg shadow-sm">
              <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-gray-900">Invoice Items</h3>
              <p class="text-sm text-gray-600 mt-1">Add and manage your invoice line items</p>
            </div>
          </button>
          <div v-show="activeSection === 'items'" class="p-4 pt-0">
            <div class="border-t border-teal-200 pt-4">
              <div class="space-y-4">
                <div v-for="(item, index) in invoice.items" :key="index" class="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200">
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
                        min="0"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-600 focus:ring-green-600"
                      />
                    </div>
                    <div class="col-span-1 flex items-end justify-end">
                      <button @click="removeItem(index)" class="text-red-600 hover:text-red-800 focus:outline-none">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  @click="addItem"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 transition-all duration-200"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Add Item
                </button>
              </div>

              <!-- Section navigation -->
              <div class="flex justify-between mt-6">
                <button @click="nextSection('client')" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <button @click="nextSection('additional')" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center">
                  Next: Additional Info
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Info Section -->
        <div class="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-xl border border-amber-100 hover:border-amber-200 transition-all duration-300">
          <button 
            @click="activeSection = activeSection === 'additional' ? '' : 'additional'"
            class="w-full p-4 flex items-start space-x-3 text-left"
          >
            <div class="p-2 bg-white rounded-lg shadow-sm">
              <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-gray-900">Additional Information</h3>
              <p class="text-sm text-gray-600 mt-1">Add payment details and other information</p>
            </div>
          </button>
          <div v-show="activeSection === 'additional'" class="p-4 pt-0">
            <div class="border-t border-amber-200 pt-4">
              <div class="space-y-4">
                <div v-for="(info, index) in invoice.paymentInfo" :key="index" class="flex items-center space-x-2">
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
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 transition-all duration-200"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Payment Info
                </button>
              </div>

              <!-- Section navigation -->
              <div class="flex justify-between mt-6">
                <button @click="nextSection('items')" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <button @click="nextSection('taxes')" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center">
                  Next: Tax Settings
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Tax Settings Section -->
        <div class="bg-gradient-to-br from-red-50 to-rose-100 rounded-xl border border-red-100 hover:border-red-200 transition-all duration-300">
          <button 
            @click="activeSection = activeSection === 'taxes' ? '' : 'taxes'"
            class="w-full p-4 flex items-start space-x-3 text-left"
          >
            <div class="p-2 bg-white rounded-lg shadow-sm">
              <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-gray-900">Tax Settings</h3>
              <p class="text-sm text-gray-600 mt-1">Configure VAT and other tax settings</p>
            </div>
          </button>
          <div v-show="activeSection === 'taxes'" class="p-4 pt-0">
            <div class="border-t border-red-200 pt-4">
              <div class="space-y-4">
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div class="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="includeVAT"
                      v-model="invoice.includeVAT"
                      class="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <label for="includeVAT" class="text-sm text-gray-700">Include VAT (16%)</label>
                  </div>
                  <span class="text-xs px-2 py-1 bg-indigo-100 text-indigo-600 font-medium rounded-full">Required if registered</span>
                </div>
                
                <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div class="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="includeDigitalServiceTax"
                      v-model="includeDigitalServiceTax"
                      class="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                    />
                    <label for="includeDigitalServiceTax" class="text-sm text-gray-700">Include Digital Service Tax (1.5%)</label>
                  </div>
                  <span class="text-xs px-2 py-1 bg-indigo-100 text-indigo-600 font-medium rounded-full">For digital services</span>
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">VAT Number (if registered)</label>
                  <input
                    v-model="vatNumber"
                    type="text"
                    placeholder="e.g., P051234567T"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600"
                  />
                </div>
              </div>

              <!-- Section navigation -->
              <div class="flex justify-between mt-6">
                <button @click="nextSection('additional')" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                <button @click="nextSection('templates')" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 flex items-center">
                  Next: Templates
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Templates Section -->
        <div class="bg-gradient-to-br from-gray-50 to-slate-100 rounded-xl border border-gray-100 hover:border-gray-200 transition-all duration-300">
          <button 
            @click="activeSection = activeSection === 'templates' ? '' : 'templates'"
            class="w-full p-4 flex items-start space-x-3 text-left"
          >
            <div class="p-2 bg-white rounded-lg shadow-sm">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
              </svg>
            </div>
            <div>
              <h3 class="font-medium text-gray-900">Templates</h3>
              <p class="text-sm text-gray-600 mt-1">Choose and customize invoice templates</p>
            </div>
          </button>
          <div v-show="activeSection === 'templates'" class="p-4 pt-0">
            <div class="border-t border-gray-200 pt-4">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Choose Template</label>
                  <div class="grid grid-cols-2 gap-3">
                    <div 
                      v-for="template in invoiceTemplates" 
                      :key="template.id"
                      @click="applyTemplate(template)"
                      class="p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md"
                      :class="selectedTemplate === template.id ? 'border-amber-400 bg-amber-50' : 'border-gray-200'"
                    >
                      <p class="font-medium" :class="selectedTemplate === template.id ? 'text-amber-700' : 'text-gray-700'">{{ template.name }}</p>
                      <p class="text-xs text-gray-500">{{ template.description }}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Custom Footer Text</label>
                  <input
                    v-model="invoice.footer"
                    type="text"
                    placeholder="Thank you for your business"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Reference Number (Optional)</label>
                  <input
                    v-model="invoice.reference"
                    type="text"
                    placeholder="e.g., Project ID or PO number"
                    class="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-600 focus:ring-amber-600"
                  />
                </div>
              </div>

              <!-- Section navigation -->
              <div class="flex justify-between mt-6">
                <button @click="nextSection('taxes')" class="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Preview -->
      <div class="lg:sticky lg:top-8">
        <InvoicePreview 
          :invoice="invoice"
          :selectedTheme="selectedTheme"
          :addLogo="addLogo"
          :logoUrl="logoUrl"
          :includeDigitalServiceTax="includeDigitalServiceTax"
        />
        
        <!-- New Action Buttons -->
        <div class="mt-6 bg-white rounded-xl border border-gray-200 shadow-lg p-4">
          <div class="flex flex-col space-y-4">
            <!-- Navigation Buttons -->
            <div class="flex justify-between items-center">
              <button 
                v-if="activeSection !== 'branding'"
                @click="navigateToPrevious" 
                class="group flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <svg class="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                <span>Previous Section</span>
              </button>
              <button 
                v-if="activeSection !== 'templates'"
                @click="navigateToNext"
                class="group flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
              >
                <span>Next Section</span>
                <svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <!-- Action Buttons -->
            <div class="grid grid-cols-2 gap-4">
              <button 
                @click="saveDraft"
                class="flex items-center justify-center px-6 py-3 bg-gradient-to-br from-gray-50 to-gray-100 text-gray-700 rounded-xl border border-gray-200 hover:border-gray-300 hover:from-white hover:to-gray-50 transition-all duration-200 group"
              >
                <svg class="w-5 h-5 mr-2 text-gray-500 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                Save Draft
              </button>
              <button 
                @click="downloadPDF"
                class="flex items-center justify-center px-6 py-3 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-400 hover:to-emerald-500 transition-all duration-200 transform hover:scale-[1.02] group shadow-md hover:shadow-lg"
              >
                <svg class="w-5 h-5 mr-2 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </button>
            </div>

            <!-- Additional Actions -->
            <div class="flex justify-end">
              <button 
                @click="sendInvoice"
                class="flex items-center px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import InvoicePreview from '@/components/InvoicePreview.vue';

export default {
  name: 'InvoiceCreate',
  components: {
    InvoicePreview
  },

  setup() {
    const route = useRoute();
    const profession = route.query.profession || 'general';
    const defaultRate = Number(route.query.rate) || 3000;

    // Form sections for tab navigation
    const formSections = [
      { id: 'branding', name: 'Branding' },
      { id: 'business', name: 'Your Details' },
      { id: 'client', name: 'Client' },
      { id: 'items', name: 'Items' },
      { id: 'additional', name: 'Additional Info' },
      { id: 'taxes', name: 'Taxes' },
      { id: 'templates', name: 'Templates' }
    ];

    // Track active section
    const activeSection = ref('branding');

    // Invoice state with expanded functionality
    const invoice = ref({
      title: '',
      invoiceNumber: `INV-${new Date().getTime().toString().slice(-4)}`,
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      from: {
        name: '',
        address: '',
        email: '',
        phone: '',
        vatNumber: ''
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
          rate: defaultRate,
          details: [] // For breakdown of services
        }
      ],
      expenses: [], // Track additional expenses
      includeVAT: false,
      paymentInfo: [
        'Bank: Your Bank Name',
        'Account Number: Your Account Number',
        'Branch: Your Branch'
      ],
      pricingModel: 'fixed', // fixed, hourly, or per-word
      hoursWorked: 0,
      wordCount: 0,
      reference: '',
      footer: '',
      notes: ''
    });

    const isDigitalProfession = computed(() => {
      return ['designer', 'writer'].includes(profession);
    });

    // Enhanced calculation methods
    const calculateItemSubtotal = (item) => {
      if (invoice.value.pricingModel === 'hourly') {
        return item.rate * invoice.value.hoursWorked;
      } else if (invoice.value.pricingModel === 'per-word') {
        return item.rate * invoice.value.wordCount;
      }
      return item.rate * (item.quantity || 1);
    };

    const calculateSubtotal = () => {
      const itemsTotal = invoice.value.items.reduce((total, item) => {
        return total + calculateItemSubtotal(item);
      }, 0);
      
      const expensesTotal = invoice.value.expenses.reduce((total, expense) => {
        return total + (expense.amount || 0);
      }, 0);
      
      return itemsTotal + expensesTotal;
    };

    const calculateVAT = () => {
      return invoice.value.includeVAT ? calculateSubtotal() * 0.16 : 0;
    };

    const includeDigitalServiceTax = ref(false);
    const calculateDST = () => {
      return includeDigitalServiceTax.value ? calculateSubtotal() * 0.015 : 0;
    };

    const calculateTotal = () => {
      return calculateSubtotal() + calculateVAT() + calculateDST();
    };

    // Enhanced item management
    const addItem = () => {
      invoice.value.items.push({
        description: '',
        quantity: 1,
        rate: defaultRate,
        details: []
      });
    };

    const removeItem = (index) => {
      invoice.value.items.splice(index, 1);
    };

    const addItemDetail = (itemIndex, detail) => {
      invoice.value.items[itemIndex].details.push(detail);
    };

    const removeItemDetail = (itemIndex, detailIndex) => {
      invoice.value.items[itemIndex].details.splice(detailIndex, 1);
    };

    // Expense management
    const addExpense = () => {
      invoice.value.expenses.push({
        description: '',
        amount: 0,
        category: ''
      });
    };

    const removeExpense = (index) => {
      invoice.value.expenses.splice(index, 1);
    };

    // Payment info management
    const addPaymentInfo = () => {
      invoice.value.paymentInfo.push('');
    };

    const removePaymentInfo = (index) => {
      invoice.value.paymentInfo.splice(index, 1);
    };

    // Styling and customization
    const colorThemes = [
      { color: '#10B981', value: 'green' },
      { color: '#3B82F6', value: 'blue' },
      { color: '#8B5CF6', value: 'purple' },
      { color: '#EC4899', value: 'pink' },
      { color: '#F59E0B', value: 'yellow' }
    ];

    const selectedTheme = ref('green');
    const addLogo = ref(false);
    const logoUrl = ref('');

    const onLogoUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          logoUrl.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const vatNumber = ref('');

    const invoiceTemplates = [
      { id: 1, name: 'Classic', description: 'A classic invoice template' },
      { id: 2, name: 'Modern', description: 'A modern invoice template' },
      { id: 3, name: 'Minimal', description: 'A minimal invoice template' }
    ];

    const selectedTemplate = ref(1);

    const applyTemplate = (template) => {
      selectedTemplate.value = template.id;
    };

    // Navigation between sections
    const nextSection = (sectionId) => {
      activeSection.value = sectionId;
      if (window.innerWidth < 1024) {
        window.scrollTo({top: 0, behavior: 'smooth'});
      }
    };

    // Navigation methods
    const navigateToPrevious = () => {
      const currentIndex = formSections.findIndex(section => section.id === activeSection.value);
      if (currentIndex > 0) {
        activeSection.value = formSections[currentIndex - 1].id;
      }
    };

    const navigateToNext = () => {
      const currentIndex = formSections.findIndex(section => section.id === activeSection.value);
      if (currentIndex < formSections.length - 1) {
        activeSection.value = formSections[currentIndex + 1].id;
      }
    };

    // Action methods
    const saveDraft = () => {
      // Implement save draft functionality
      console.log('Saving draft...');
    };

    const downloadPDF = () => {
      // Implement PDF download
      console.log('Downloading PDF...');
    };

    const sendInvoice = () => {
      // Implement send invoice functionality
      console.log('Sending invoice...');
    };

    // Return all the methods and reactive data
    return {
      invoice,
      profession,
      defaultRate,
      isDigitalProfession,
      addItem,
      removeItem,
      addItemDetail,
      removeItemDetail,
      addExpense,
      removeExpense,
      addPaymentInfo,
      removePaymentInfo,
      colorThemes,
      selectedTheme,
      addLogo,
      logoUrl,
      onLogoUpload,
      vatNumber,
      includeDigitalServiceTax,
      invoiceTemplates,
      selectedTemplate,
      applyTemplate,
      formSections,
      activeSection,
      nextSection,
      calculateSubtotal,
      calculateVAT,
      calculateDST,
      calculateTotal,
      calculateItemSubtotal,
      navigateToPrevious,
      navigateToNext,
      saveDraft,
      downloadPDF,
      sendInvoice,
    };
  }
};
</script>

<style scoped>
.gradient-heading {
  background: linear-gradient(to right, #10B981, #3B82F6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.card-hover {
  transition: all 0.3s ease-in-out;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Custom scrollbar styles for webkit browsers */
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
</style>