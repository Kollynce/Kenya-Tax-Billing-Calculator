<template>
  <div class="space-y-8">
    <!-- Tax Insights Section -->
    <section class="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-xl">
      <h3 class="text-xl font-medium text-gray-900 mb-4 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Tax Insights for {{ professionLabel }}
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Monthly Income Card -->
        <div class="relative overflow-hidden bg-white rounded-xl shadow-md border border-green-100 p-5 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
          <div class="absolute -right-4 -top-4 bg-gradient-to-br from-green-400 to-green-600 w-16 h-16 rounded-full opacity-10"></div>
          <h4 class="text-lg font-medium text-gray-900 mb-2">Monthly Income</h4>
          <div class="flex items-end space-x-2">
            <span class="text-2xl font-bold text-green-600">{{ monthlyIncome }}</span>
            <span class="text-sm text-gray-500 pb-1">per month</span>
          </div>
          <div class="mt-3 text-sm text-gray-600">
            <p>Based on 1 similar project completed each month</p>
          </div>
        </div>
        
        <!-- Tax Breakdown Card -->
        <div class="relative overflow-hidden bg-white rounded-xl shadow-md border border-blue-100 p-5 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
          <div class="absolute -right-4 -top-4 bg-gradient-to-br from-blue-400 to-blue-600 w-16 h-16 rounded-full opacity-10"></div>
          <h4 class="text-lg font-medium text-gray-900 mb-2">Tax Breakdown</h4>
          
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">VAT (16%)</span>
              <span class="font-medium text-blue-600">{{ vatAmount }}</span>
            </div>
            <div class="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style="width: 16%"></div>
            </div>
            
            <div class="flex justify-between">
              <span class="text-gray-600">Digital Service Tax</span>
              <span class="font-medium text-blue-600">{{ dstAmount }}</span>
            </div>
            <div class="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full" style="width: 1.5%"></div>
            </div>
          </div>
        </div>
        
        <!-- Annual Projection Card -->
        <div class="relative overflow-hidden bg-white rounded-xl shadow-md border border-purple-100 p-5 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
          <div class="absolute -right-4 -top-4 bg-gradient-to-br from-purple-400 to-purple-600 w-16 h-16 rounded-full opacity-10"></div>
          <h4 class="text-lg font-medium text-gray-900 mb-2">Annual Projection</h4>
          <div class="flex items-end space-x-2">
            <span class="text-2xl font-bold text-purple-600">{{ annualIncome }}</span>
            <span class="text-sm text-gray-500 pb-1">per year</span>
          </div>
          <div class="mt-3 grid grid-cols-12 gap-1">
            <div v-for="i in 12" :key="i" class="h-8 bg-gradient-to-t from-purple-500 to-purple-300 rounded-sm" :style="`opacity: ${0.4 + (i * 0.05)}`"></div>
          </div>
          <div class="mt-2 text-xs text-gray-500 text-center">Jan - Dec estimated income</div>
        </div>
      </div>
    </section>

    <!-- Tax Calendar Section -->
    <section class="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Tax Calendar for {{ professionLabel }}</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="quarter in quarters" :key="quarter.period" 
             :class="`flex items-start space-x-3 p-3 border rounded-lg ${quarter.bgClass}`">
          <div class="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center" :class="quarter.iconBg">
            <span :class="quarter.textColor">{{ quarter.period }}</span>
          </div>
          <div>
            <h5 class="font-medium text-gray-800">{{ quarter.months }}</h5>
            <p class="text-sm text-gray-600 mt-1">{{ quarter.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Tax Planning Guide -->
    <section class="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Tax Planning Guide</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-for="(tip, index) in taxTips" :key="index" 
             class="p-4 bg-gradient-to-br rounded-lg border transition-all duration-200"
             :class="tip.classes">
          <div class="flex items-start space-x-3">
            <div class="p-2 rounded-lg" :class="tip.iconBg">
              <svg class="w-5 h-5" :class="tip.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tip.icon" />
              </svg>
            </div>
            <div>
              <h5 class="font-medium text-gray-900">{{ tip.title }}</h5>
              <p class="text-sm text-gray-600 mt-1">{{ tip.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'TaxGuidePanel',
  
  props: {
    profession: {
      type: String,
      default: 'designer'
    },
    monthlyIncome: {
      type: String,
      default: 'KES 51,300'
    },
    vatAmount: {
      type: String,
      default: 'KES 8,208'
    },
    dstAmount: {
      type: String,
      default: 'KES 770'
    },
    annualIncome: {
      type: String,
      default: 'KES 615,600'
    }
  },

  computed: {
    professionLabel() {
      const labels = {
        designer: 'Designers',
        writer: 'Writers',
        photographer: 'Photographers',
        general: 'Creatives'
      };
      return labels[this.profession] || 'Professionals';
    },

    quarters() {
      return [
        {
          period: 'Q1',
          months: 'January - March',
          description: 'File VAT returns by 20th of each month',
          bgClass: 'bg-green-50 border-green-100',
          iconBg: 'bg-green-100',
          textColor: 'text-green-600'
        },
        {
          period: 'Q2',
          months: 'April - June',
          description: 'Income tax installment due by June 20th',
          bgClass: 'bg-blue-50 border-blue-100',
          iconBg: 'bg-blue-100',
          textColor: 'text-blue-600'
        },
        {
          period: 'Q3',
          months: 'July - September',
          description: 'Digital Service Tax due quarterly',
          bgClass: 'bg-orange-50 border-orange-100',
          iconBg: 'bg-orange-100',
          textColor: 'text-orange-600'
        },
        {
          period: 'Q4',
          months: 'October - December',
          description: 'Prepare for annual tax filing',
          bgClass: 'bg-purple-50 border-purple-100',
          iconBg: 'bg-purple-100',
          textColor: 'text-purple-600'
        }
      ];
    },

    taxTips() {
      return [
        {
          title: 'Record Keeping',
          description: 'Keep all receipts and invoices for 5 years',
          icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
          classes: 'from-green-50 to-emerald-100 border-green-200 hover:border-green-300',
          iconBg: 'bg-green-50',
          iconColor: 'text-green-600'
        },
        {
          title: 'Tax Deadlines',
          description: 'Submit returns by the specified due dates',
          icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
          classes: 'from-blue-50 to-indigo-100 border-blue-200 hover:border-blue-300',
          iconBg: 'bg-blue-50',
          iconColor: 'text-blue-600'
        },
        {
          title: 'Deductions',
          description: 'Track all business-related expenses',
          icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
          classes: 'from-purple-50 to-pink-100 border-purple-200 hover:border-purple-300',
          iconBg: 'bg-purple-50',
          iconColor: 'text-purple-600'
        },
        {
          title: 'Digital Records',
          description: 'Maintain digital copies of all transactions',
          icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
          classes: 'from-teal-50 to-cyan-100 border-teal-200 hover:border-teal-300',
          iconBg: 'bg-teal-50',
          iconColor: 'text-teal-600'
        }
      ];
    }
  }
};
</script>
