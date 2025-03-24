<template>
  <section class="mb-16">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Tax Calculator Example</h2>
    
    <div class="bg-white rounded-lg shadow-lg overflow-hidden p-6 mb-8">
      <h3 class="text-xl font-semibold text-gray-900 mb-4">Income Tax Calculation</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 class="font-medium text-gray-800 mb-2">Sample Input:</h4>
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <p><strong>Annual Income:</strong> KES 1,200,000</p>
            <p><strong>Include NSSF:</strong> Yes</p>
            <p><strong>Include SHIF:</strong> Yes</p>
          </div>
          
          <p class="text-gray-600 text-sm">
            Enter your annual income and select which contributions to include in your calculation.
            The calculator automatically applies the latest 2025 tax rates and relief.
          </p>
        </div>
        
        <div>
          <h4 class="font-medium text-gray-800 mb-2">Sample Result:</h4>
          <div class="bg-blue-50 p-4 rounded-lg">
            <div class="grid grid-cols-2 gap-2 mb-3">
              <div class="text-gray-600">Gross Monthly:</div>
              <div class="font-medium text-right">KES 100,000</div>
              
              <div class="text-gray-600">PAYE:</div>
              <div class="font-medium text-right">KES 17,974</div>
              
              <div class="text-gray-600">NSSF Contribution:</div>
              <div class="font-medium text-right">KES 6,000</div>
              
              <div class="text-gray-600">SHIF Contribution:</div>
              <div class="font-medium text-right">KES 1,700</div>
              
              <div class="text-gray-600">Total Deductions:</div>
              <div class="font-medium text-right">KES 25,674</div>
              
              <div class="text-gray-600 font-medium">Net Monthly:</div>
              <div class="font-bold text-right text-blue-600">KES 74,326</div>
            </div>
            <div class="text-xs text-gray-500">
              Effective Tax Rate: 25.67%
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-lg overflow-hidden p-6">
      <h3 class="text-xl font-semibold text-gray-900 mb-4">Monthly Breakdown</h3>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
              <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Gross</th>
              <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">PAYE</th>
              <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">NSSF</th>
              <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">SHIF</th>
              <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Net</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">January</td>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">100,000</td>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">17,974</td>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">6,000</td>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">1,700</td>
              <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-blue-600 text-right">74,326</td>
            </tr>
            <tr class="bg-gray-50">
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">February</td>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">100,000</td>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">17,974</td>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">6,000</td>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">1,700</td>
              <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-blue-600 text-right">74,326</td>
            </tr>
            <tr>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">...</td>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-right">...</td>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-right">...</td>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-right">...</td>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-right">...</td>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500 text-right">...</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="mt-4 text-sm text-gray-600">
        <p>The calculator provides a month-by-month breakdown of your taxes and deductions, helping you plan your finances for the entire year.</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TaxCalculatorExample'
};
</script>