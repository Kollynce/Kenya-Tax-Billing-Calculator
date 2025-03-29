<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold text-gray-900 flex items-center">
        <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        Dashboard
      </h2>
      <div class="flex space-x-2">
        <button 
          @click="viewMode = 'chart'"
          :class="[
            'px-3 py-1 text-sm font-medium rounded-md transition-colors', 
            viewMode === 'chart' 
              ? 'bg-green-600 text-white shadow-sm' 
              : 'bg-white text-gray-600 hover:text-gray-800 border border-gray-300'
          ]"
        >
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Dashboard
          </div>
        </button>
        <button 
          @click="viewMode = 'list'" 
          :class="[
            'px-3 py-1 text-sm font-medium rounded-md transition-colors', 
            viewMode === 'list' 
              ? 'bg-green-600 text-white shadow-sm' 
              : 'bg-white text-gray-600 hover:text-gray-800 border border-gray-300'
          ]"
        >
          <div class="flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            List View
          </div>
        </button>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
    
    <!-- Dashboard View -->
    <div v-else-if="viewMode === 'chart'">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div class="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <h4 class="text-sm font-medium text-gray-700 mb-2">Total Saved Items</h4>
          <p class="text-2xl font-bold text-green-600">{{ items.length }}</p>
          <p class="text-xs text-gray-500 mt-1">Across all categories</p>
        </div>

        <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <h4 class="text-sm font-medium text-gray-700 mb-2">Total Value</h4>
          <p class="text-2xl font-bold text-blue-600">{{ formatCurrency(calculateTotalValue) }}</p>
          <p class="text-xs text-gray-500 mt-1">Combined project value</p>
        </div>

        <div class="bg-gradient-to-br from-purple-50 to-pink-100 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
          <h4 class="text-sm font-medium text-gray-700 mb-2">Latest Activity</h4>
          <p class="text-xl font-bold text-purple-600">{{ getLatestActivityDate }}</p>
          <p class="text-xs text-gray-500 mt-1">Last item saved</p>
        </div>
      </div>
      
      <!-- Item Type Distribution Chart -->
      <div class="bg-white p-6 rounded-lg border border-gray-200 mb-8">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Item Type Distribution</h3>
          <div v-if="items.length === 0" class="text-sm text-gray-500">No data available</div>
        </div>
        <div v-if="items.length === 0" class="flex flex-col items-center justify-center h-64">
          <svg class="h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <p class="mt-3 text-sm text-gray-500">
            Start saving items to see data visualization
          </p>
          <div class="mt-4 grid grid-cols-3 gap-2 w-full max-w-md">
            <div class="flex items-center">
              <span class="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
              <span class="text-xs text-gray-600">Tax Calculations</span>
            </div>
            <div class="flex items-center">
              <span class="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
              <span class="text-xs text-gray-600">Invoices</span>
            </div>
            <div class="flex items-center">
              <span class="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
              <span class="text-xs text-gray-600">Proposals</span>
            </div>
          </div>
        </div>
        <div v-else class="h-64">
          <canvas ref="typeChart"></canvas>
        </div>
      </div>
      
      <!-- Activity Timeline -->
      <div class="bg-white p-6 rounded-lg border border-gray-200 mb-8">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Activity Timeline</h3>
          <div v-if="items.length === 0" class="text-sm text-gray-500">No data available</div>
        </div>
        <div v-if="items.length === 0" class="flex flex-col items-center justify-center h-64">
          <svg class="h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p class="mt-3 text-sm text-gray-500">
            Your activity history will appear here
          </p>
          <div class="mt-4 w-full max-w-md">
            <div class="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-full" style="width: 10%"></div>
            </div>
            <div class="flex justify-between mt-1">
              <span class="text-xs text-gray-500">Jan</span>
              <span class="text-xs text-gray-500">Dec</span>
            </div>
          </div>
        </div>
        <div v-else class="h-64">
          <canvas ref="timelineChart"></canvas>
        </div>
      </div>

      <!-- Value Breakdown -->
      <div class="bg-white p-6 rounded-lg border border-gray-200 mb-8">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Value Breakdown</h3>
          <div v-if="calculateTotalValue === 0" class="text-sm text-gray-500">No data available</div>
        </div>
        <div v-if="calculateTotalValue === 0" class="flex flex-col items-center justify-center py-8">
          <svg class="h-12 w-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="mt-3 text-sm text-gray-500">
            Value breakdown will be shown here
          </p>
          <div class="mt-4 grid grid-cols-1 gap-4 w-full max-w-md">
            <div class="mb-2">
              <div class="flex justify-between text-sm mb-1">
                <span class="font-medium text-green-600">Tax Calculations</span>
                <span class="font-medium">{{ formatCurrency(0) }}</span>
              </div>
              <div class="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-green-500 rounded-full" style="width: 0%"></div>
              </div>
            </div>
            <div class="mb-2">
              <div class="flex justify-between text-sm mb-1">
                <span class="font-medium text-blue-600">Invoices</span>
                <span class="font-medium">{{ formatCurrency(0) }}</span>
              </div>
              <div class="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-blue-500 rounded-full" style="width: 0%"></div>
              </div>
            </div>
            <div class="mb-2">
              <div class="flex justify-between text-sm mb-1">
                <span class="font-medium text-purple-600">Proposals</span>
                <span class="font-medium">{{ formatCurrency(0) }}</span>
              </div>
              <div class="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div class="h-full bg-purple-500 rounded-full" style="width: 0%"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="grid grid-cols-1 gap-4">
          <div v-for="(value, type) in valueByType" :key="type" class="mb-2">
            <div class="flex justify-between text-sm mb-1">
              <span class="font-medium" :class="getTypeTextColor(type)">{{ getItemTypeLabel(type) }}</span>
              <span class="font-medium">{{ formatCurrency(value) }}</span>
            </div>
            <div class="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full rounded-full" 
                   :class="getTypeBarColor(type)"
                   :style="{ width: `${(value / calculateTotalValue) * 100}%` }"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Recent Items Preview or Call to Action -->
      <div class="bg-white p-6 rounded-lg border border-gray-200">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">Recent Items</h3>
          <button 
            v-if="items.length > 0"
            @click="viewMode = 'list'"
            class="text-sm text-green-600 hover:text-green-700 flex items-center"
          >
            View all
            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        <div v-if="items.length === 0" class="text-center py-8">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No saved items</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by saving your tax calculations, invoices, or proposals.</p>
          <div class="mt-6">
            <router-link to="/tax-calculator" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none">
              <svg class="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create calculation
            </router-link>
          </div>
        </div>
        <div v-else class="grid grid-cols-1 gap-4">
          <div 
            v-for="(item, index) in recentItems" 
            :key="index"
            class="p-3 border rounded-lg hover:shadow-sm transition-all duration-200"
            :class="getBorderClass(item.type)"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="p-2 mr-3" :class="getItemTypeClasses(item.type)">
                  <svg v-if="item.type === 'tax'" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <svg v-else-if="item.type === 'invoice'" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <svg v-else-if="item.type === 'proposal'" class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 class="text-sm font-medium text-gray-900">{{ item.title || getDefaultTitle(item) }}</h3>
                  <p class="text-xs text-gray-500">{{ formatDate(item.date) }}</p>
                </div>
              </div>
              <span class="font-medium text-sm">
                {{ getItemValue(item) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state outside of dashboard view -->
    <div v-else-if="items.length === 0" class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No saved items</h3>
      <p class="mt-1 text-sm text-gray-500">Get started by saving your tax calculations, invoices, or proposals.</p>
      <div class="mt-6">
        <router-link to="/tax-calculator" class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none">
          <svg class="mr-2 -ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create calculation
        </router-link>
      </div>
    </div>
    
    <!-- List View -->
    <div v-else-if="viewMode === 'list'" class="grid grid-cols-1 gap-6">
      <div 
        v-for="(item, index) in items" 
        :key="index"
        class="bg-white p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="p-2 mr-4" :class="getItemTypeClasses(item.type)">
              <svg v-if="item.type === 'tax'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <svg v-else-if="item.type === 'invoice'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <svg v-else-if="item.type === 'proposal'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            
            <div>
              <h3 class="text-sm font-medium text-gray-900">{{ item.title || getDefaultTitle(item) }}</h3>
              <p class="text-xs text-gray-500">
                {{ formatDate(item.date) }} · {{ getItemTypeLabel(item.type) }}
              </p>
            </div>
          </div>
          
          <div class="flex space-x-2">
            <button @click="$emit('view', item)" class="text-gray-400 hover:text-gray-600">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button @click="$emit('delete', item)" class="text-gray-400 hover:text-red-600">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <div class="mt-3 border-t border-gray-100 pt-3">
          <div v-if="item.type === 'tax'" class="flex justify-between text-sm">
            <span class="text-gray-600">Annual Income:</span>
            <span class="font-medium">{{ formatCurrency(Number(item.grossIncome) || 0) }}</span>
          </div>
          <div v-else-if="item.type === 'invoice'" class="flex justify-between text-sm">
            <span class="text-gray-600">Amount:</span>
            <span class="font-medium">{{ getItemValue(item) }}</span>
          </div>
          <div v-else-if="item.type === 'proposal'" class="flex justify-between text-sm">
            <span class="text-gray-600">Project Value:</span>
            <span class="font-medium">{{ formatCurrency(Number(item.projectValue) || 0) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { formatCurrency } from '@/utils/taxUtils';
import Chart from 'chart.js/auto';

export default {
  name: 'SavedItemsList',
  props: {
    items: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['view', 'delete'],
  setup(props) {
    const viewMode = ref('chart');
    const typeChart = ref(null);
    const timelineChart = ref(null);
    let chartInstances = { typeChart: null, timelineChart: null };

    const getItemTypeClasses = (type) => {
      switch (type) {
        case 'tax':
          return 'bg-green-100 rounded-lg text-green-700';
        case 'invoice':
          return 'bg-blue-100 rounded-lg text-blue-700';
        case 'proposal':
          return 'bg-purple-100 rounded-lg text-purple-700';
        default:
          return 'bg-gray-100 rounded-lg text-gray-700';
      }
    };

    const getTypeBarColor = (type) => {
      switch (type) {
        case 'tax':
          return 'bg-green-500';
        case 'invoice':
          return 'bg-blue-500';
        case 'proposal':
          return 'bg-purple-500';
        default:
          return 'bg-gray-500';
      }
    };

    const getTypeTextColor = (type) => {
      switch (type) {
        case 'tax':
          return 'text-green-600';
        case 'invoice':
          return 'text-blue-600';
        case 'proposal':
          return 'text-purple-600';
        default:
          return 'text-gray-600';
      }
    };

    const getBorderClass = (type) => {
      switch (type) {
        case 'tax':
          return 'border-green-200';
        case 'invoice':
          return 'border-blue-200';
        case 'proposal':
          return 'border-purple-200';
        default:
          return 'border-gray-200';
      }
    };

    const getItemTypeLabel = (type) => {
      switch (type) {
        case 'tax':
          return 'Tax Calculation';
        case 'invoice':
          return 'Invoice';
        case 'proposal':
          return 'Proposal';
        default:
          return 'Item';
      }
    };

    const getDefaultTitle = (item) => {
      switch (item.type) {
        case 'tax':
          return `Tax Calculation - ${formatCurrency(item.grossIncome)}`;
        case 'invoice':
          return `Invoice ${item.invoiceNumber || ''}`;
        case 'proposal':
          return `Proposal for ${item.clientName || 'Client'}`;
        default:
          return 'Untitled Item';
      }
    };

    const formatDate = (date) => {
      if (!date) return 'N/A';
      
      if (typeof date === 'string') {
        date = new Date(date);
      }
      
      if (date instanceof Date && !isNaN(date)) {
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      }
      
      return 'N/A';
    };

    const getItemValue = (item) => {
      if (!item) return formatCurrency(0);

      if (item.type === 'tax') {
        const income = Number(item.grossIncome) || 0;
        return formatCurrency(income);
      } else if (item.type === 'invoice') {
        if (!item.items || !Array.isArray(item.items)) {
          // Handle case where totalAmount might be directly on the invoice
          if (item.totalAmount) {
            return formatCurrency(Number(item.totalAmount));
          }
          return formatCurrency(0);
        }
        
        const subtotal = item.items.reduce((sum, lineItem) => {
          const quantity = Number(lineItem.quantity) || 0;
          const rate = Number(lineItem.rate) || 0;
          return sum + (quantity * rate);
        }, 0);

        let total = subtotal;
        
        if (item.includeVAT) {
          total += subtotal * 0.16; // 16% VAT
        }
        
        if (item.includeDigitalServiceTax) {
          total += subtotal * 0.015; // 1.5% DST
        }
        
        return formatCurrency(Math.round(total * 100) / 100);
      } else if (item.type === 'proposal') {
        const value = Number(item.projectValue) || 0;
        return formatCurrency(value);
      }
      return formatCurrency(0);
    };

    // Computed Properties
    const itemsByType = computed(() => {
      const result = { tax: 0, invoice: 0, proposal: 0 };
      props.items.forEach(item => {
        if (result[item.type] !== undefined) {
          result[item.type]++;
        }
      });
      return result;
    });

    const valueByType = computed(() => {
      const result = { tax: 0, invoice: 0, proposal: 0 };
      props.items.forEach(item => {
        if (item.type === 'tax' && item.grossIncome) {
          result.tax += Number(item.grossIncome) || 0;
        } else if (item.type === 'invoice') {
          if (item.items && Array.isArray(item.items)) {
            const subtotal = item.items.reduce((sum, lineItem) => {
              const quantity = Number(lineItem.quantity) || 0;
              const rate = Number(lineItem.rate) || 0;
              return sum + (quantity * rate);
            }, 0);

            let total = subtotal;
            if (item.includeVAT) {
              total += subtotal * 0.16;
            }
            if (item.includeDigitalServiceTax) {
              total += subtotal * 0.015;
            }
            result.invoice += Math.round(total * 100) / 100;
          }
        } else if (item.type === 'proposal' && item.projectValue) {
          result.proposal += Number(item.projectValue) || 0;
        }
      });
      return result;
    });

    const calculateTotalValue = computed(() => {
      return props.items.reduce((total, item) => {
        if (item.type === 'invoice') {
          // Calculate invoice total including VAT and DST if applicable
          if (!item.items || !Array.isArray(item.items)) return total;
          
          const subtotal = item.items.reduce((sum, lineItem) => {
            const quantity = Number(lineItem.quantity) || 0;
            const rate = Number(lineItem.rate) || 0;
            return sum + (quantity * rate);
          }, 0);

          let itemTotal = subtotal;
          if (item.includeVAT) {
            itemTotal += subtotal * 0.16;
          }
          if (item.includeDigitalServiceTax) {
            itemTotal += subtotal * 0.015;
          }
          return total + itemTotal;
        }
        return total;
      }, 0);
    });

    const getLatestActivityDate = computed(() => {
      if (!props.items.length) return 'No activity';
      
      const sortedItems = [...props.items].sort((a, b) => {
        const dateA = a.date ? new Date(a.date) : new Date(0);
        const dateB = b.date ? new Date(b.date) : new Date(0);
        return dateB - dateA;
      });
      
      return formatDate(sortedItems[0].date);
    });

    const recentItems = computed(() => {
      return [...props.items]
        .sort((a, b) => {
          const dateA = a.date ? new Date(a.date) : new Date(0);
          const dateB = b.date ? new Date(b.date) : new Date(0);
          return dateB - dateA;
        })
        .slice(0, 3);
    });

    const itemsByMonth = computed(() => {
      const months = {};
      const now = new Date();
      const sixMonthsAgo = new Date();
      sixMonthsAgo.setMonth(now.getMonth() - 5);
      
      // Initialize the last 6 months
      for (let i = 0; i < 6; i++) {
        const date = new Date(now);
        date.setMonth(now.getMonth() - i);
        const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
        const monthLabel = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        months[monthKey] = { label: monthLabel, tax: 0, invoice: 0, proposal: 0 };
      }
      
      // Count items by month and type
      props.items.forEach(item => {
        if (!item.date) return;
        
        const date = new Date(item.date);
        const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
        
        if (months[monthKey] && item.type) {
          months[monthKey][item.type] = (months[monthKey][item.type] || 0) + 1;
        }
      });
      
      return Object.values(months).reverse();
    });

    // Chart creation
    const createCharts = () => {
      if (!props.items.length) return;
      
      // Destroy previous charts if they exist
      if (chartInstances.typeChart) {
        chartInstances.typeChart.destroy();
      }
      
      if (chartInstances.timelineChart) {
        chartInstances.timelineChart.destroy();
      }
      
      // Create Type Distribution Chart
      if (typeChart.value) {
        const ctx = typeChart.value.getContext('2d');
        chartInstances.typeChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Tax Calculations', 'Invoices', 'Proposals'],
            datasets: [{
              data: [itemsByType.value.tax, itemsByType.value.invoice, itemsByType.value.proposal],
              backgroundColor: [
                'rgba(16, 185, 129, 0.7)', // green
                'rgba(59, 130, 246, 0.7)', // blue
                'rgba(139, 92, 246, 0.7)'  // purple
              ],
              borderColor: [
                'rgba(16, 185, 129, 1)',
                'rgba(59, 130, 246, 1)',
                'rgba(139, 92, 246, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }
        });
      }
      
      // Create Timeline Chart
      if (timelineChart.value) {
        const ctx = timelineChart.value.getContext('2d');
        chartInstances.timelineChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: itemsByMonth.value.map(month => month.label),
            datasets: [
              {
                label: 'Tax Calculations',
                data: itemsByMonth.value.map(month => month.tax),
                backgroundColor: 'rgba(16, 185, 129, 0.7)',
                borderColor: 'rgba(16, 185, 129, 1)',
                borderWidth: 1
              },
              {
                label: 'Invoices',
                data: itemsByMonth.value.map(month => month.invoice),
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1
              },
              {
                label: 'Proposals',
                data: itemsByMonth.value.map(month => month.proposal),
                backgroundColor: 'rgba(139, 92, 246, 0.7)',
                borderColor: 'rgba(139, 92, 246, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
                beginAtZero: true,
                ticks: {
                  stepSize: 1
                }
              }
            },
            plugins: {
              legend: {
                position: 'bottom'
              }
            }
          }
        });
      }
    };

    // Watch for changes in items or viewMode to update charts
    watch(
      [() => props.items, viewMode],
      () => {
        if (viewMode.value === 'chart' && props.items.length > 0) {
          // Use nextTick to ensure DOM is updated before creating charts
          setTimeout(() => {
            createCharts();
          }, 50);
        }
      },
      { deep: true }
    );

    onMounted(() => {
      if (viewMode.value === 'chart' && props.items.length > 0) {
        setTimeout(() => {
          createCharts();
        }, 100);
      }
    });

    return {
      viewMode,
      typeChart,
      timelineChart,
      formatCurrency,
      formatDate,
      getItemTypeClasses,
      getItemTypeLabel,
      getDefaultTitle,
      itemsByType,
      valueByType,
      calculateTotalValue,
      getLatestActivityDate,
      recentItems,
      getItemValue,
      getTypeBarColor,
      getTypeTextColor,
      getBorderClass
    };
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}

canvas {
  max-width: 100%;
  max-height: 100%;
}
</style>