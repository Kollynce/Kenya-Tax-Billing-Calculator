<template>
    <div class="bg-white rounded-2xl shadow-lg p-8 md:p-12">
      <!-- Header -->
      <div class="flex justify-between items-start mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ proposal.title || 'Professional Proposal' }}</h1>
          <p class="text-gray-600">Prepared for: {{ proposal.client || '[Client Name]' }}</p>
        </div>
        <div class="text-right">
          <div class="text-2xl font-bold text-green-600">
            Total: {{ formattedTotal }}
          </div>
          <p class="text-sm text-gray-600">Valid until: {{ validUntil }}</p>
        </div>
      </div>
  
      <!-- Services Section -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Services Breakdown</h2>
        <div class="space-y-4">
          <div
            v-for="(service, index) in proposal.services"
            :key="index"
            class="p-4 border-l-4 border-green-500 bg-gray-50 rounded-r"
          >
            <div class="flex justify-between items-center">
              <div>
                <h3 class="font-medium">{{ service.name }}</h3>
                <p class="text-sm text-gray-600">{{ service.description }}</p>
              </div>
              <span class="font-medium">
                {{ service.type === 'hourly' ? `${service.rate}/hr` : `KES ${service.rate}` }}
              </span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Timeline -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Project Timeline</h2>
        <div class="space-y-2">
          <div
            v-for="(phase, index) in proposal.timeline"
            :key="index"
            class="flex items-center justify-between p-3 border-b border-gray-200"
          >
            <div>
              <h3 class="font-medium">{{ phase.name }}</h3>
              <p class="text-sm text-gray-600">{{ phase.description }}</p>
            </div>
            <span class="text-gray-600">{{ phase.duration }} days</span>
          </div>
        </div>
      </div>
  
      <!-- Terms -->
      <div>
        <h2 class="text-xl font-semibold mb-4">Terms & Conditions</h2>
        <ul class="list-disc pl-6 space-y-2 text-gray-700">
          <li v-for="(term, index) in proposal.terms" :key="index">
            {{ term }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      proposal: {
        type: Object,
        default: () => ({
          title: 'Professional Proposal',
          client: '',
          services: [],
          timeline: [],
          terms: []
        })
      }
    },
    computed: {
      formattedTotal() {
        const total = this.proposal.services?.reduce((sum, s) => sum + Number(s.rate), 0) || 0
        return `KES ${total.toLocaleString()}`
      },
      validUntil() {
        const date = new Date()
        date.setDate(date.getDate() + 30)
        return date.toLocaleDateString('en-KE', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }
    }
  }
  </script>