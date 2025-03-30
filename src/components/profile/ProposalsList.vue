<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-900">Saved Proposals</h3>
      <div class="flex items-center space-x-3">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search proposals..."
          class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
        />
        <select 
          v-model="sortBy"
          class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
          <option value="client">Sort by Client</option>
        </select>
      </div>
    </div>

    <!-- Loading State -->
    <LoadingSpinner
      v-if="loading"
      size="lg"
      color="green-600"
      :label="'Loading proposals...'"
    />

    <!-- Error State -->
    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-4">
      <p class="text-red-700">{{ error }}</p>
      <button 
        @click="retryLoading"
        class="mt-2 text-sm text-red-600 hover:text-red-500"
      >
        Try again
      </button>
    </div>

    <!-- Empty State -->
    <div 
      v-else-if="!filteredProposals.length" 
      class="text-center py-12 bg-gray-50 rounded-lg"
    >
      <svg
        class="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      <p class="mt-2 text-gray-500">No proposals found</p>
      <button
        @click="createNewProposal"
        class="mt-4 text-sm text-green-600 hover:text-green-500"
      >
        Create your first proposal
      </button>
    </div>

    <!-- Proposals List -->
    <VirtualList
      v-else
      :items="filteredProposals"
      :item-height="180"
      :container-height="600"
      class="bg-white rounded-lg shadow overflow-hidden"
    >
      <template #default="{ item }">
        <div 
          class="p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors relative"
          :class="{ 
            'border-l-4 border-l-green-500': item.status === 'accepted',
            'ring-2 ring-green-500': selectedProposal?.id === item.id
          }"
          @click="selectedProposal = item"
          tabindex="0"
        >
          <div class="flex justify-between items-start">
            <div>
              <h4 class="text-lg font-medium text-gray-900">{{ item.title }}</h4>
              <p class="text-sm text-gray-600">{{ item.client.name }}</p>
              <div class="mt-2 flex items-center space-x-4">
                <span class="text-sm text-gray-500">
                  Created {{ formatDate(item.createdAt) }}
                </span>
                <span 
                  class="px-2 py-1 text-xs rounded-full"
                  :class="getStatusStyles(item.status)"
                >
                  {{ item.status }}
                </span>
              </div>
              <div class="mt-2 flex items-baseline space-x-2">
                <span class="text-xl font-bold text-gray-900">
                  {{ formatCurrency(item.totalAmount) }}
                </span>
                <span class="text-sm text-gray-500">
                  {{ item.pricingLabel }}
                </span>
              </div>
            </div>
            
            <div class="flex items-center space-x-2">
              <button 
                @click="previewProposal(item)"
                class="p-2 text-gray-400 hover:text-gray-500"
                title="Preview proposal (Ctrl/⌘ + P)"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
              <button 
                @click="editProposal(item)"
                class="p-2 text-gray-400 hover:text-gray-500"
                title="Edit proposal (Ctrl/⌘ + I)"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button 
                @click="deleteProposal(item)"
                class="p-2 text-gray-400 hover:text-red-500"
                title="Delete proposal (Ctrl/⌘ + D)"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button 
                @click.stop="exportProposal(item)"
                class="p-2 text-gray-400 hover:text-gray-500"
                title="Export proposal (Ctrl/⌘ + E)"
              >
                <ExportIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </template>
    </VirtualList>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectStore } from '@/store/projectStore'
import { formatCurrency } from '@/utils/taxUtils'
import { format } from 'date-fns'
import VirtualList from '@/components/VirtualList.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ExportIcon from '@/components/icons/ExportIcon.vue'
import { exportToPDF } from '@/utils/exportUtils'
import { useToast } from '@/composables/useToast'
import { useKeyboardShortcuts } from '@/composables/useKeyboardShortcuts'

export default {
  name: 'ProposalsList',
  components: {
    VirtualList,
    LoadingSpinner,
    ExportIcon
  },
  setup() {
    const router = useRouter()
    const projectStore = useProjectStore()
    const loading = ref(true)
    const error = ref(null)
    const searchQuery = ref('')
    const sortBy = ref('date')
    const { showToast } = useToast()
    const proposalRef = ref(null)
    const selectedProposal = ref(null)

    // Keyboard shortcut actions
    const shortcuts = {
      export: () => {
        if (selectedProposal.value) {
          exportProposal(selectedProposal.value)
        }
      },
      preview: () => {
        if (selectedProposal.value) {
          previewProposal(selectedProposal.value)
        }
      },
      edit: () => {
        if (selectedProposal.value) {
          editProposal(selectedProposal.value)
        }
      },
      delete: () => {
        if (selectedProposal.value) {
          deleteProposal(selectedProposal.value)
        }
      }
    }

    useKeyboardShortcuts(shortcuts)

    const exportProposal = async (proposal) => {
      try {
        const filename = `proposal-${proposal.id}-${format(new Date(), 'yyyy-MM-dd')}.pdf`
        await exportToPDF(proposalRef.value, filename)
        showToast('Proposal exported successfully', 'success')
      } catch (error) {
        console.error('Error exporting proposal:', error)
        showToast('Failed to export proposal', 'error')
      }
    }

    const filteredProposals = computed(() => {
      let proposals = [...projectStore.savedProjects]
      
      // Filter by search query
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        proposals = proposals.filter(p => 
          p.title.toLowerCase().includes(query) ||
          p.client.name.toLowerCase().includes(query)
        )
      }

      // Sort proposals
      proposals.sort((a, b) => {
        if (sortBy.value === 'date') {
          return new Date(b.createdAt) - new Date(a.createdAt)
        }
        if (sortBy.value === 'amount') {
          return b.totalAmount - a.totalAmount
        }
        if (sortBy.value === 'client') {
          return a.client.name.localeCompare(b.client.name)
        }
        return 0
      })

      return proposals
    })

    const loadProposals = async () => {
      try {
        loading.value = true
        error.value = null
        await projectStore.loadSavedProjects()
      } catch (err) {
        error.value = 'Failed to load proposals. Please try again.'
        console.error('Error loading proposals:', err)
      } finally {
        loading.value = false
      }
    }

    const retryLoading = () => {
      loadProposals()
    }

    const createNewProposal = () => {
      router.push({ name: 'ProjectCreation' })
    }

    const previewProposal = (proposal) => {
      router.push({ 
        name: 'ProjectPitch', 
        params: { id: proposal.id }
      })
    }

    const editProposal = (proposal) => {
      projectStore.updateProject(proposal)
      router.push({ 
        name: 'ProjectCreation',
        query: { edit: proposal.id }
      })
    }

    const deleteProposal = async (proposal) => {
      if (!confirm('Are you sure you want to delete this proposal?')) return

      try {
        await projectStore.deleteProject(proposal.id)
      } catch (err) {
        console.error('Error deleting proposal:', err)
      }
    }

    const formatDate = (date) => {
      return format(new Date(date), 'MMM d, yyyy')
    }

    const getStatusStyles = (status) => {
      const styles = {
        draft: 'bg-gray-100 text-gray-800',
        pending: 'bg-yellow-100 text-yellow-800',
        accepted: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800'
      }
      return styles[status] || styles.draft
    }

    onMounted(() => {
      loadProposals()
    })

    return {
      loading,
      error,
      searchQuery,
      sortBy,
      filteredProposals,
      retryLoading,
      createNewProposal,
      previewProposal,
      editProposal,
      deleteProposal,
      formatDate,
      formatCurrency,
      getStatusStyles,
      proposalRef,
      exportProposal,
      selectedProposal
    }
  }
}
</script>