<template>
  <section class="mb-16">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Billing Planner Example</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <!-- Logo Design Proposal Example -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden p-6">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Sample Proposal</h3>
        <div class="mb-4">
          <h4 class="font-medium text-gray-800 mb-2">Project Details</h4>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p><strong>Service:</strong> Logo Design</p>
            <p><strong>Package:</strong> Premium (KES 50,000)</p>
            <p><strong>Timeline:</strong> 2 weeks</p>
          </div>
        </div>

        <div class="border-t pt-4">
          <h4 class="font-medium text-gray-800 mb-2">Total Investment</h4>
          <div class="text-right">
            <p class="text-gray-600">Design Fee: KES 50,000</p>
            <p class="text-gray-600">Font License: KES 5,000</p>
            <p class="text-gray-600">VAT (16%): KES 8,800</p>
            <p class="font-bold text-lg">Total: KES 63,800</p>
          </div>
        </div>
      </div>

      <!-- Blog Post Invoice Example -->
      <div class="bg-white rounded-lg shadow-lg overflow-hidden p-6">
        <h3 class="text-xl font-semibold text-gray-900 mb-4">Sample Invoice</h3>
        <div class="mb-4">
          <h4 class="font-medium text-gray-800 mb-2">Service Details</h4>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p><strong>Service:</strong> Blog Post Writing</p>
            <p><strong>Rate:</strong> KES 10 per word</p>
            <p><strong>Words:</strong> 5,000</p>
          </div>
        </div>

        <div class="border-t pt-4">
          <h4 class="font-medium text-gray-800 mb-2">Total Due</h4>
          <div class="text-right">
            <p class="text-gray-600">Writing Fee: KES 50,000</p>
            <p class="text-gray-600">Research: KES 2,000</p>
            <p class="text-gray-600">VAT (16%): KES 8,320</p>
            <p class="font-bold text-lg">Total: KES 60,320</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Feature Highlights -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-blue-50 p-4 rounded-lg">
        <h4 class="font-medium text-gray-900 mb-2">Professional Templates</h4>
        <p class="text-sm text-gray-600">Industry-specific templates for proposals and invoices, tailored for Kenyan creatives.</p>
      </div>
      
      <div class="bg-blue-50 p-4 rounded-lg">
        <h4 class="font-medium text-gray-900 mb-2">Tax Integration</h4>
        <p class="text-sm text-gray-600">Automatic VAT and Digital Service Tax calculations based on your registration status.</p>
      </div>
      
      <div class="bg-blue-50 p-4 rounded-lg">
        <h4 class="font-medium text-gray-900 mb-2">Expense Tracking</h4>
        <p class="text-sm text-gray-600">Track project-specific expenses and include them in your proposals and invoices.</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'BillingPlannerExample'
}
</script>