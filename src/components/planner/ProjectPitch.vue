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
    const steps = ref(['Profession', 'Services', 'Timeline', 'Terms', 'Client'])
    const demoProposal = ref(null)
    const proposalPreview = ref(null)
    
    const proposal = ref({
      profession: null,
      title: 'Professional Services Proposal',
      client: {
        name: '',
        email: '',
        phone: '',
        address: ''
      },
      services: [],
      timeline: [],
      terms: [],
      enableMpesa: false,
      mpesaTillNumber: '',
      depositAmount: 0
    })

    // ...rest of existing setup code...
    
    return {
      v$,
      loading,
      currentStep,
      proposal,
      validateAndProceed,
      isBuilding,
      steps,
      demoProposal,
      proposalPreview
    }
  },
  methods: {
    // ...existing methods...
  }
}