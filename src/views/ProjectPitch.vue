<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Planner Hero Section -->
      <section class="bg-gradient-to-b from-white to-gray-50 py-20 my-16 rounded-2xl border border-gray-100 shadow-xl">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-5xl font-bold mb-6 gradient-heading">
            Craft Proposals That Win Work
          </h1>
          <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Kenyan creators using our tool earn 30% more on average. Build professional proposals in minutes.
          </p>
          
          <div class="inline-flex gap-4 mb-12">
            <button 
              @click="startNewProposal"
              class="btn-primary px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-green-500 rounded-lg shadow-lg hover:from-green-500 hover:to-green-400 transform transition-all duration-200 hover:scale-105"
            >
              Start New Proposal
            </button>
          </div>
  
          <!-- Interactive Demo -->
          <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div class="mb-8">
              <h3 class="text-xl font-semibold mb-4">Try Our Interactive Demo</h3>
              <ProfessionSelector @profession-selected="updateDemoProposal" />
            </div>
            
            <ProposalPreview v-if="demoProposal" :proposal="demoProposal" />
          </div>
        </div>
      </section>
  
      <!-- Proposal Builder Section (shown when building a proposal) -->
      <div v-if="isBuilding">
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

        <!-- Navigation Controls -->
        <div class="flex justify-between mt-12">
          <button
            v-if="currentStep > 1"
            @click="currentStep--"
            class="btn-secondary px-6 py-3 text-gray-700 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:border-green-300"
          >
            Previous
          </button>
          
          <button
            v-if="currentStep < steps.length"
            @click="currentStep++"
            class="btn-primary ml-auto px-6 py-3 text-white bg-gradient-to-r from-green-600 to-green-500 rounded-lg shadow-lg hover:from-green-500 hover:to-green-400"
          >
            Continue
          </button>
          
          <button
            v-else
            @click="generateProposal"
            class="btn-primary ml-auto px-6 py-3 text-white bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg shadow-lg hover:from-purple-500 hover:to-purple-400"
          >
            Generate Proposal
          </button>
        </div>
      </div>

      <!-- Preview Section -->
      <section v-if="proposalPreview" class="bg-white rounded-2xl border border-gray-100 shadow-xl p-8 mb-16">
        <h2 class="text-3xl font-bold mb-8">Proposal Preview</h2>
        <ProposalPreview :proposal="proposalPreview" />
        
        <div class="mt-8 flex gap-4">
          <button
            @click="saveDraft"
            class="btn-secondary px-6 py-3 text-gray-700 bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:border-green-300"
          >
            Save Draft
          </button>
          
          <button
            @click="downloadPDF"
            class="btn-primary px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg shadow-lg hover:from-blue-500 hover:to-blue-400"
          >
            Download PDF
          </button>
        </div>
      </section>
    </div>
  </template>
  
  <script>
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
    data() {
      return {
        isBuilding: false,
        currentStep: 1,
        steps: ['Profession', 'Services', 'Timeline', 'Terms'],
        proposal: {
          profession: null,
          title: 'Professional Services Proposal',
          client: '',
          services: [],
          timeline: [],
          terms: []
        },
        demoProposal: null,
        proposalPreview: null
      }
    },
    methods: {
      startNewProposal() {
        this.isBuilding = true
        this.currentStep = 1
        this.proposal = {
          profession: null,
          title: 'Professional Services Proposal',
          client: '',
          services: [],
          timeline: [],
          terms: []
        }
      },
      updateDemoProposal(profession) {
        // Load sample proposal based on profession
        this.demoProposal = this.getSampleProposal(profession)
      },
      generateProposal() {
        // Generate final proposal
        this.proposalPreview = { ...this.proposal }
      },
      saveDraft() {
        // Save to Firestore
      },
      downloadPDF() {
        // PDF generation logic
      },
      getSampleProposal(profession) {
        const samples = {
          designer: {
            profession: 'designer',
            title: 'Logo & Brand Identity Design',
            client: '',
            services: [
              { name: 'Logo Design', type: 'fixed', rate: 50000, description: 'Custom logo with brand guidelines' },
              { name: 'Brand Assets', type: 'fixed', rate: 25000, description: 'Business cards, letterhead, social media assets' }
            ],
            timeline: [
              { name: 'Research & Concepts', duration: 7, description: 'Market research and initial concept development' },
              { name: 'Design & Revisions', duration: 14, description: 'Logo design and refinement with up to 2 revision rounds' },
              { name: 'Brand Assets', duration: 7, description: 'Development of additional brand materials' }
            ],
            terms: [
              'Payment: 50% deposit required to begin work',
              'Includes up to 2 rounds of revisions',
              'Full copyright transfer upon final payment',
              'Final files delivered in all required formats'
            ]
          },
          writer: {
            profession: 'writer',
            title: 'Content Writing Project',
            client: '',
            services: [
              { name: 'Blog Articles', type: 'fixed', rate: 15000, description: 'SEO-optimized blog posts (1500 words)' },
              { name: 'Content Strategy', type: 'hourly', rate: 2500, description: 'Content planning and keyword research' }
            ],
            timeline: [
              { name: 'Research', duration: 3, description: 'Topic research and outline development' },
              { name: 'Writing', duration: 7, description: 'Content creation and SEO optimization' },
              { name: 'Revisions', duration: 4, description: 'Editing and final refinements' }
            ],
            terms: [
              'Payment schedule: 40% upfront, 60% upon completion',
              'Two rounds of revisions included',
              'All content will be original and plagiarism-free',
              'Includes meta descriptions and SEO elements'
            ]
          }
        };
        
        return samples[profession] || {
          profession,
          title: 'Professional Services Proposal',
          client: '',
          services: [],
          timeline: [],
          terms: [
            'Standard payment terms: 50% deposit',
            'Work begins upon receipt of deposit',
            'Final deliverables upon completion of payment'
          ]
        };
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