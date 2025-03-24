<template>
  <section class="mb-16">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Tax Calculator Example</h2>
    
    <div class="bg-white rounded-lg shadow-lg overflow-hidden p-6 mb-8">
      <h3 class="text-xl font-semibold text-gray-900 mb-4">Income Tax Calculation</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h4 class="font-medium text-gray-800 mb-2">Sample Input:</h4>
          <div class="bg-gray-50 p-4 rounded-lg mb-4">
            <p><strong>Annual Income:</strong> KES 2,160,000</p>
            <p><strong>Include NSSF:</strong> Yes</p>
            <p><strong>Include SHIF:</strong> Yes</p>
            <p><strong>Include Housing Levy:</strong> Yes</p>
          </div>
          
          <p class="text-gray-600 text-sm">
            The calculator automatically applies the latest 2025 tax rates and reliefs:
          </p>
          <ul class="mt-2 space-y-2 text-sm text-gray-600">
            <li>• Personal Relief: KES 2,400 monthly</li>
            <li>• NSSF: 2.4% of gross pay (new rates from Feb 2025)</li>
            <li>• SHIF: 2.75% of gross pay</li>
            <li>• Housing Levy: 1.5% of gross pay</li>
          </ul>
        </div>
        
        <div>
          <h4 class="font-medium text-gray-800 mb-2">Sample Result:</h4>
          <div class="bg-blue-50 p-4 rounded-lg">
            <div class="grid grid-cols-2 gap-2 mb-3">
              <div class="text-gray-600">Monthly Gross:</div>
              <div class="font-medium text-right">KES 180,000</div>
              
              <div class="text-gray-600">NSSF (2.4%):</div>
              <div class="font-medium text-right">KES 4,320</div>
              
              <div class="text-gray-600">SHIF (2.75%):</div>
              <div class="font-medium text-right">KES 4,950</div>
              
              <div class="text-gray-600">Housing Levy (1.5%):</div>
              <div class="font-medium text-right">KES 2,700</div>
              
              <div class="text-gray-600">Taxable Pay:</div>
              <div class="font-medium text-right">KES 168,030</div>
              
              <div class="text-gray-600">PAYE:</div>
              <div class="font-medium text-right">KES 45,193</div>
              
              <div class="text-gray-600">Personal Relief:</div>
              <div class="font-medium text-right">-KES 2,400</div>
              
              <div class="text-gray-600">Total Deductions:</div>
              <div class="font-medium text-right">KES 54,763</div>
              
              <div class="text-gray-600 font-medium">Net Monthly:</div>
              <div class="font-bold text-right text-blue-600">KES 125,237</div>
            </div>
            <div class="text-xs text-gray-500">
              Effective Tax Rate: 30.42%
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-lg overflow-hidden p-6">
      <h3 class="text-xl font-semibold text-gray-900 mb-4">Current Tax Brackets (2025)</h3>
      
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Income (KES)</th>
              <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Tax Rate</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">0 - 24,000</td>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">10%</td>
            </tr>
            <tr>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">24,001 - 32,333</td>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">25%</td>
            </tr>
            <tr>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">32,334 - 500,000</td>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">30%</td>
            </tr>
            <tr>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">500,001 - 800,000</td>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">32.5%</td>
            </tr>
            <tr>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900">Above 800,000</td>
              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">35%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4 text-sm text-gray-600">
        <p>Important Notes:</p>
        <ul class="list-disc pl-5 space-y-1 mt-2">
          <li>Personal Relief: KES 2,400 per month (KES 28,800 annually)</li>
          <li>SHIF and Housing Levy are now tax-deductible (effective December 2024)</li>
          <li>New NSSF rates effective February 2025</li>
          <li>Tax returns deadline is 9th of the following month</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TaxCalculatorExample'
};
</script>