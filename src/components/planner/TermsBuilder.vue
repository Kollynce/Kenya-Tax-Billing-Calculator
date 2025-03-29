<template>
    <div class="space-y-6">
      <h3 class="text-xl font-semibold text-gray-900">Terms & Conditions</h3>
      
      <div class="grid gap-4 md:grid-cols-2">
        <div
          v-for="(clause, index) in clauses"
          :key="index"
          class="p-6 rounded-xl border border-gray-200 bg-white hover:border-green-200 transition-colors"
          :class="{ 'border-green-300 bg-green-50': clause.selected }"
        >
          <label class="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              v-model="clause.selected"
              class="mt-1 form-checkbox h-5 w-5 text-green-500"
            >
            <div class="flex-1">
              <h4 class="font-medium text-gray-900 mb-2">{{ clause.title }}</h4>
              <p class="text-sm text-gray-600">{{ clause.content }}</p>
            </div>
          </label>
        </div>
      </div>
  
      <div class="mt-6">
        <h4 class="text-lg font-medium mb-4">Additional Notes</h4>
        <textarea
          v-model="customTerms"
          class="w-full p-4 rounded-xl border border-gray-200 focus:border-green-500 outline-none"
          rows="4"
          placeholder="Add custom terms or special conditions..."
        ></textarea>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      value: Array
    },
    data() {
      return {
        customTerms: '',
        clauses: [
          {
            title: 'Payment Schedule',
            content: '50% deposit required before work begins',
            selected: true
          },
          {
            title: 'Revisions',
            content: '2 free revisions included, additional revisions at KES 1,500/hour',
            selected: true
          },
          {
            title: 'Late Payments',
            content: '5% late fee applied weekly on overdue balances',
            selected: false
          },
          {
            title: 'Ownership Rights',
            content: 'Full rights transfer upon final payment',
            selected: true
          }
        ]
      }
    },
    computed: {
      selectedClauses() {
        return [
          ...this.clauses.filter(c => c.selected).map(c => c.content),
          this.customTerms
        ]
      }
    },
    watch: {
      selectedClauses(newVal) {
        this.$emit('input', newVal)
      }
    }
  }
  </script>