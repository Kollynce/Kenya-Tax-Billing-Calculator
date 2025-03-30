<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Planner Hero Section -->
      <section class="bg-gradient-to-b from-white to-gray-50 py-16 my-12 rounded-2xl border border-gray-100 shadow-xl">
        <div class="max-w-4xl mx-auto text-center px-6">
          <div class="mb-4 flex justify-center space-x-3">
            <span class="inline-block px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-800">
              Kenyan Creatives
            </span>
            <span class="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
              Professional Growth
            </span>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold mb-6 gradient-heading">
            Craft Proposals That Win Work
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Kenyan creators using our tool earn 30% more on average. Build professional proposals that showcase your true value in minutes.
          </p>
          
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <button 
              @click="startNewProposal"
              class="btn-primary px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-green-500 rounded-lg shadow-lg hover:from-green-500 hover:to-green-400"
            >
              Start New Proposal
            </button>
            <button 
              @click="scrollToDemo"
              class="btn-secondary px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-lg shadow-md hover:border-green-300"
            >
              See How It Works
            </button>
          </div>
        </div>
      </section>
  
      <!-- Market Insights Section -->
      <section class="bg-white rounded-2xl border border-gray-100 shadow-xl p-8 mb-12">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 gradient-heading">Proposal Success Metrics</h2>
            <p class="text-gray-600 mt-1">Data from successful Kenyan creatives</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Win Rate</h4>
            <p class="text-2xl font-bold text-green-600">
              78%
            </p>
            <p class="text-sm text-gray-600">Projects won with professional proposals</p>
          </div>

          <div class="bg-gradient-to-br from-blue-50 to-indigo-100 p-4 rounded-xl">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Average Value</h4>
            <p class="text-2xl font-bold text-blue-600">
              KES 85,000
            </p>
            <p class="text-sm text-gray-600">Average project value secured</p>
          </div>

          <div class="bg-gradient-to-br from-purple-50 to-pink-100 p-4 rounded-xl">
            <h4 class="text-sm font-medium text-gray-700 mb-2">Client Retention</h4>
            <p class="text-2xl font-bold text-purple-600">
              92%
            </p>
            <p class="text-sm text-gray-600">Clients who return after first project</p>
          </div>
        </div>
      </section>
  
      <!-- How It Works Section -->
      <div class="relative my-16">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-200"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="pill-gradient px-6 py-1 text-sm rounded-full">How It Works</span>
        </div>
      </div>

      <section class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:border-green-200 transition-all duration-300">
          <div class="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-4">
            <span class="text-green-600 font-bold">1</span>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Choose Your Profession</h3>
          <p class="text-gray-600">Select your creative field and customize service offerings specific to your expertise.</p>
        </div>
        
        <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:border-green-200 transition-all duration-300">
          <div class="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-4">
            <span class="text-green-600 font-bold">2</span>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Outline Your Services</h3>
          <p class="text-gray-600">Detail your services, timeline, and terms to create clarity and build client trust.</p>
        </div>
        
        <div class="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:border-green-200 transition-all duration-300">
          <div class="rounded-full bg-green-100 w-12 h-12 flex items-center justify-center mb-4">
            <span class="text-green-600 font-bold">3</span>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">Generate & Share</h3>
          <p class="text-gray-600">Download a professional PDF to send to clients or share directly via email or WhatsApp.</p>
        </div>
      </section>
  
      <!-- Interactive Demo Section -->
      <div class="demo-section bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-16">
        <div class="mb-8">
          <h3 class="text-xl font-semibold mb-4 flex items-center">
            <svg class="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Try Our Interactive Demo
          </h3>
          <p class="text-gray-600 mb-4">Choose your profession to see a sample proposal tailored for your field</p>
          <ProfessionSelector @profession-selected="updateDemoProposal" />
        </div>
        
        <div v-if="demoProposal" class="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl">
          <h4 class="text-lg font-medium text-gray-900 mb-3">{{ demoProposal.title }}</h4>
          
          <div class="space-y-4 mb-6">
            <div class="flex items-start space-x-3">
              <div class="p-2 bg-green-50 rounded-lg">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-700">Services: <span class="font-medium">{{ demoProposal.services.map(s => s.name).join(', ') }}</span></p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <div class="p-2 bg-blue-50 rounded-lg">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-700">Timeline: <span class="font-medium">{{ demoProposal.timeline.reduce((sum, t) => sum + t.duration, 0) }} days</span></p>
              </div>
            </div>
            
            <div class="flex items-start space-x-3">
              <div class="p-2 bg-purple-50 rounded-lg">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-sm text-gray-700">Total Value: <span class="font-medium">KES {{ demoProposal.services.reduce((sum, s) => sum + Number(s.rate), 0).toLocaleString() }}</span></p>
              </div>
            </div>
          </div>
          
          <button 
            @click="startNewProposal"
            class="btn-primary w-full px-6 py-3 text-white bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg shadow-lg hover:from-purple-500 hover:to-purple-400"
          >
            Create Your Proposal
          </button>
        </div>
      </div>
  
      <!-- Proposal Builder Section (shown when building a proposal) -->
      <div v-if="isBuilding" class="proposal-builder">
        <!-- Progress Steps -->
        <div class="flex justify-between mb-12">
          <div 
            v-for="(step, index) in steps"
            :key="index"
            class="flex flex-col items-center"
          >
            <div 
              class="w-8 h-8 rounded-full flex items-center justify-center"
              :class="currentStep === index + 1 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-100 text-gray-500'"
            >
              {{ index + 1 }}
            </div>
            <span class="mt-2 text-sm">{{ step }}</span>
          </div>
        </div>

        <!-- Step Content -->
        <div v-show="currentStep === 1">
          <ProfessionSelector v-model="proposal.profession" />
        </div>

        <div v-show="currentStep === 2">
          <ServiceList 
            v-model="proposal.services"
            :profession="proposal.profession"
          />
        </div>

        <div v-show="currentStep === 3">
          <TimelineBuilder 
            v-model="proposal.timeline"
            class="mt-6"
          />
        </div>

        <div v-show="currentStep === 4">
          <TermsBuilder 
            v-model="proposal.terms"
            class="mt-6"
          />
        </div>

        <div v-show="currentStep === 5">
          <div class="space-y-6">
            <h3 class="text-xl font-semibold text-gray-900">Client Information</h3>
            <p class="text-gray-600 mb-4">Please provide client details for the proposal</p>
            
            <form @submit.prevent="validateAndProceed" class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Client Name
                    <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <input 
                      v-model="proposal.client.name"
                      type="text"
                      class="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      :class="{'border-red-300': v$.client && v$.client.name && v$.client.name.$error}"
                      placeholder="Company or individual name"
                      aria-required="true"
                      :disabled="loading"
                    />
                    <span v-if="v$.client && v$.client.name && v$.client.name.$error" class="text-xs text-red-500 mt-1 block">
                      {{ v$.client.name.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Client Email
                    <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <input 
                      v-model="proposal.client.email"
                      type="email"
                      class="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      :class="{'border-red-300': v$.client && v$.client.email && v$.client.email.$error}"
                      placeholder="client@example.com"
                      aria-required="true"
                      :disabled="loading"
                    />
                    <span v-if="v$.client && v$.client.email && v$.client.email.$error" class="text-xs text-red-500 mt-1 block">
                      {{ v$.client.email.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Phone Number
                    <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <input 
                      v-model="proposal.client.phone"
                      type="tel"
                      class="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      :class="{'border-red-300': v$.client && v$.client.phone && v$.client.phone.$error}"
                      placeholder="+254 7XX XXX XXX"
                      aria-required="true"
                      :disabled="loading"
                    />
                    <span v-if="v$.client && v$.client.phone && v$.client.phone.$error" class="text-xs text-red-500 mt-1 block">
                      {{ v$.client.phone.$errors[0].$message }}
                    </span>
                  </div>
                </div>

                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Physical Address
                  </label>
                  <div class="relative">
                    <textarea
                      v-model="proposal.client.address"
                      rows="2"
                      class="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      :class="{'border-red-300': v$.client && v$.client.address && v$.client.address.$error}"
                      placeholder="Physical location"
                      :disabled="loading"
                    ></textarea>
                    <span v-if="v$.client && v$.client.address && v$.client.address.$error" class="text-xs text-red-500 mt-1 block">
                      {{ v$.client.address.$errors[0].$message }}
                    </span>
                  </div>
                </div>
                
                <div class="space-y-2 md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Tax Information
                  </label>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input 
                        v-model="proposal.client.isCompany"
                        type="checkbox"
                        id="isCompany"
                        class="h-4 w-4 text-green-600 rounded border-gray-300"
                        :disabled="loading"
                      />
                      <label for="isCompany" class="ml-2 text-sm text-gray-600">
                        This is a registered company
                      </label>
                    </div>
                    
                    <div v-if="proposal.client.isCompany" class="relative">
                      <input 
                        v-model="proposal.client.taxId"
                        type="text"
                        class="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        :class="{'border-red-300': v$.client && v$.client.taxId && v$.client.taxId.$error}"
                        placeholder="Tax PIN/VAT Number"
                        :disabled="loading"
                      />
                      <span v-if="v$.client && v$.client.taxId && v$.client.taxId.$error" class="text-xs text-red-500 mt-1 block">
                        {{ v$.client.taxId.$errors[0].$message }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex justify-between pt-6 border-t border-gray-200">
                <button
                  type="button" 
                  @click="currentStep--"
                  class="btn-secondary px-6 py-3 text-gray-700 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:border-green-300"
                  :disabled="loading"
                >
                  Previous
                </button>

                <button
                  type="submit"
                  class="btn-primary px-6 py-3 text-white bg-gradient-to-r from-green-600 to-green-500 rounded-lg shadow-lg hover:from-green-500 hover:to-green-400 relative"
                  :disabled="loading"
                >
                  <span :class="{ 'opacity-0': loading }">Continue</span>
                  <div v-if="loading" class="absolute inset-0 flex items-center justify-center">
                    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Preview Section -->
      <section v-if="proposalPreview" class="bg-white rounded-2xl border border-gray-100 shadow-xl p-8 mb-16">
        <h2 class="text-3xl font-bold mb-8">Proposal Preview</h2>
        <ProposalPreview :proposal="proposalPreview" />
        
        <!-- M-Pesa Integration -->
        <div class="mt-8 bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-xl border border-green-200">
          <h3 class="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <svg class="w-6 h-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </svg>
            M-Pesa Integration
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p class="text-sm text-gray-600 mb-4">Enable clients to pay deposits directly via M-Pesa to secure the project.</p>
              <div class="flex items-center">
                <input 
                  id="enableMpesa" 
                  v-model="proposalPreview.enableMpesa" 
                  type="checkbox"
                  class="h-4 w-4 text-green-600"
                />
                <label for="enableMpesa" class="ml-2 text-sm font-medium text-gray-700">
                  Add M-Pesa payment option to proposal
                </label>
              </div>
            </div>
            
            <div v-if="proposalPreview.enableMpesa" class="space-y-4">
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">M-Pesa Till Number</label>
                <input 
                  v-model="proposalPreview.mpesaTillNumber"
                  type="text"
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="Your Till Number"
                />
              </div>
              
              <div class="space-y-2">
                <label class="block text-sm font-medium text-gray-700">Deposit Amount (KES)</label>
                <input 
                  v-model="proposalPreview.depositAmount"
                  type="number"
                  class="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="Amount"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <button
            @click="saveDraft"
            class="btn-secondary px-4 py-3 text-gray-700 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:border-green-300 flex items-center justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Save Draft
          </button>
          
          <button
            @click="downloadPDF"
            class="px-4 py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-500 flex items-center justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            Download PDF
          </button>

          <button
            @click="shareViaWhatsApp"
            class="px-4 py-3 text-white bg-green-600 rounded-lg shadow-lg hover:bg-green-500 flex items-center justify-center"
          >
            <svg class="w-5 h-5 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Share via WhatsApp
          </button>
          
          <button
            @click="shareViaEmail"
            class="px-4 py-3 text-white bg-purple-600 rounded-lg shadow-lg hover:bg-purple-500 flex items-center justify-center"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Share via Email
          </button>
        </div>
      </section>

      <!-- Success Stories / Testimonials Section -->
      <div class="relative my-16">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-200"></div>
        </div>
        <div class="relative flex justify-center">
          <span class="pill-gradient px-6 py-1 text-sm rounded-full">Success Stories</span>
        </div>
      </div>

      <section class="mb-16">
        <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl">
              <div class="flex items-center mb-4">
                <div class="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                  JM
                </div>
                <div class="ml-4">
                  <h4 class="font-medium text-gray-900">James Mwangi</h4>
                  <p class="text-sm text-gray-600">Graphic Designer, Nairobi</p>
                </div>
              </div>
              <p class="text-gray-700">"This proposal tool has completely changed how I present my work to clients. I've increased my average project value by 35% since using professional proposals."</p>
              <div class="mt-4 flex items-center space-x-1 text-amber-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            
            <div class="p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl">
              <div class="flex items-center mb-4">
                <div class="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                  WK
                </div>
                <div class="ml-4">
                  <h4 class="font-medium text-gray-900">Wanjiru Kamau</h4>
                  <p class="text-sm text-gray-600">Content Creator, Mombasa</p>
                </div>
              </div>
              <p class="text-gray-700">"My clients appreciate the clarity and professionalism. I used to lose projects because of pricing confusion, but now I close 8 out of 10 proposals I send!"</p>
              <div class="mt-4 flex items-center space-x-1 text-amber-500">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Final CTA Section -->
      <section class="text-center mb-16 bg-gradient-to-br from-gray-800 to-gray-900 text-white p-12 rounded-xl shadow-lg">
        <h2 class="text-3xl font-bold mb-6">
          Ready to Win More Creative Projects?
        </h2>
        <p class="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          Start creating professional proposals that showcase your value and win clients
        </p>
        <button 
          @click="startNewProposal"
          class="btn-primary px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-green-500 rounded-lg shadow-lg hover:from-green-500 hover:to-green-400"
        >
          Create Your First Proposal
        </button>
      </section>
    </div>
  </template>
  
  <script>
  import { useVuelidate } from '@vuelidate/core'
  import { required, email, helpers } from '@vuelidate/validators'
  import { ref, computed } from 'vue'
  import ProfessionSelector from '@/components/planner/ProfessionSelector.vue'
  import ServiceList from '@/components/planner/ServiceList.vue'
  import TimelineBuilder from '@/components/planner/TimelineBuilder.vue'
  import TermsBuilder from '@/components/planner/TermsBuilder.vue'
  import ProposalPreview from '@/components/planner/ProposalPreview.vue'
  
  export default {
    name: 'ProjectPitch',
    components: {
      ProfessionSelector,
      ServiceList,
      TimelineBuilder,
      TermsBuilder,
      ProposalPreview
    },
    setup() {
      const loading = ref(false)
      const currentStep = ref(1)
      const isBuilding = ref(false)
      const proposal = ref({
        profession: null,
        title: 'Professional Services Proposal',
        client: {
          name: '',
          email: '',
          phone: '',
          address: '',
          isCompany: false,
          taxId: ''
        },
        services: [],
        timeline: [],
        terms: [],
        enableMpesa: false,
        mpesaTillNumber: '',
        depositAmount: 0
      })

      const validationRules = computed(() => ({
        client: {
          name: { required: helpers.withMessage('Client name is required', required) },
          email: { 
            required: helpers.withMessage('Email address is required', required),
            email: helpers.withMessage('Please enter a valid email address', email)
          },
          phone: { 
            required: helpers.withMessage('Phone number is required', required),
            validPhone: helpers.withMessage('Please enter a valid phone number', helpers.regex(/^(\+\d{1,3}\s?)?\d{9,15}$/))
          },
          taxId: {
            validPin: helpers.withMessage('Please enter a valid KRA PIN', helpers.regex(/^[A-Z][0-9]{9}[A-Z]$/))
          }
        }
      }))

      const v$ = useVuelidate(validationRules, proposal)

      async function validateAndProceed() {
        loading.value = true
        try {
          const isValid = await v$.value.$validate()
          if (!isValid) {
            return
          }
          // Form is valid, proceed to next step
          currentStep.value++
        } catch (error) {
          console.error('Validation error:', error)
        } finally {
          loading.value = false
        }
      }

      async function startNewProposal() {
        // Safely reset validation first to avoid errors during state changes
        if (v$.value) {
          v$.value.$reset()
        }
        
        // Then reset form state
        isBuilding.value = true
        currentStep.value = 1
        
        // Reset the proposal object with fresh values
        proposal.value = {
          profession: null,
          title: 'Professional Services Proposal',
          client: {
            name: '',
            email: '',
            phone: '',
            address: '',
            isCompany: false,
            taxId: ''
          },
          services: [],
          timeline: [],
          terms: [],
          enableMpesa: false,
          mpesaTillNumber: '',
          depositAmount: 0
        }
      }

      return {
        v$,
        loading,
        currentStep,
        proposal,
        isBuilding,
        validateAndProceed,
        startNewProposal
      }
    },
    data() {
      return {
        steps: ['Profession', 'Services', 'Timeline', 'Terms', 'Client'],
        demoProposal: null,
        proposalPreview: null
      }
    },
    methods: {
      updateDemoProposal(profession) {
        // Create a demo proposal based on selected profession
        this.demoProposal = {
          title: `${profession.name} Services Proposal`,
          services: profession.commonServices || [],
          timeline: [
            { phase: 'Discovery', duration: 5, description: 'Initial consultation and requirements gathering' },
            { phase: 'Implementation', duration: 14, description: 'Core service delivery' },
            { phase: 'Review', duration: 3, description: 'Final review and adjustments' }
          ],
          terms: [
            'Payment Terms: 50% upfront, 50% upon completion',
            'Delivery Timeline: Based on approved project schedule',
            'Revisions: Up to 2 rounds of revisions included'
          ]
        }
      },
      scrollToDemo() {
        const demoSection = document.querySelector('.demo-section')
        if (demoSection) {
          demoSection.scrollIntoView({ behavior: 'smooth' })
        }
      },
      saveDraft() {
        // Implement save draft functionality
        console.log('Saving draft...')
      },
      downloadPDF() {
        // Implement PDF download functionality
        console.log('Downloading PDF...')
      },
      shareViaWhatsApp() {
        // Implement WhatsApp sharing
        console.log('Sharing via WhatsApp...')
      },
      shareViaEmail() {
        // Implement email sharing
        console.log('Sharing via email...')
      }
    }
  }
  </script>
  
  <style scoped>
  .gradient-heading {
    background: linear-gradient(to right, #10B981, #3B82F6);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .btn-primary {
    transition: all 0.3s ease;
    transform: scale(1);
  }
  .btn-primary:hover {
    transform: scale(1.05);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
  
  .btn-secondary {
    transition: all 0.3s ease;
  }
  .btn-secondary:hover {
    background-color: #F9FAFB;
  }
  
  .pill-gradient {
    background: linear-gradient(
      135deg,
      #16A34A 0%,
      #2563EB 20%,
      #8B5CF6 40%,
      #EC4899 60%,
      #EAB308 80%,
      #14B8A6 100%
    );
    color: white;
    font-weight: 500;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    animation: gradientMove 5s ease-in-out infinite;
    background-size: 300% 300%;
  }
  
  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  </style>