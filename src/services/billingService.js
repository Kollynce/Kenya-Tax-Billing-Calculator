import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { createError } from '../utils/errorHandler';
import { TAX_CONSTANTS, calculateDigitalServiceTax } from '../utils/taxUtils';

/**
 * Default rates and templates for Kenyan freelancers based on market research
 */
export const BILLING_CONSTANTS = {
  MINIMUM_HOURLY_RATES: {
    designer: 2500, // KES per hour
    writer: 2000,
    musician: 3000,
    general: 1500
  },
  RETAINER_SUGGESTIONS: {
    designer: 50000, // Monthly retainer in KES
    writer: 40000,
    musician: 60000,
    general: 35000
  },
  PAYMENT_METHODS: [
    {
      name: 'M-PESA',
      instructions: 'Send payment to Business Number: {TILL_NUMBER}'
    },
    {
      name: 'Bank Transfer',
      instructions: 'Account Name: {NAME}\nBank: {BANK}\nAccount Number: {ACCOUNT}\nBranch Code: {BRANCH}'
    }
  ]
};

/**
 * Templates for profession-specific pricing models
 */
export const PROJECT_PRICING_MODELS = {
  designer: [
    { 
      name: 'Logo Design', 
      description: 'Custom logo design with brand guidelines',
      pricingOptions: [
        { type: 'fixed', label: 'Basic Package', defaultRate: 30000 },
        { type: 'fixed', label: 'Premium Package', defaultRate: 50000 },
        { type: 'hourly', label: 'Hourly Rate', defaultRate: 2500, defaultHours: 15 }
      ],
      commonExpenses: [
        { name: 'Font Licensing', defaultCost: 5000 },
        { name: 'Stock Images', defaultCost: 2000 }
      ],
    },
    { 
      name: 'Website UI Design', 
      description: 'User interface design for websites',
      pricingOptions: [
        { type: 'fixed', label: 'Landing Page', defaultRate: 25000 },
        { type: 'fixed', label: 'Full Website (5 pages)', defaultRate: 75000 },
        { type: 'hourly', label: 'Hourly Rate', defaultRate: 2500, defaultHours: 30 }
      ],
      commonExpenses: [
        { name: 'UI Kit/Template', defaultCost: 8000 },
        { name: 'Prototyping Tools', defaultCost: 5000 }
      ],
    },
    { 
      name: 'Brand Identity', 
      description: 'Complete brand identity package',
      pricingOptions: [
        { type: 'fixed', label: 'Standard Package', defaultRate: 100000 },
        { type: 'fixed', label: 'Premium Package', defaultRate: 150000 },
        { type: 'hourly', label: 'Hourly Rate', defaultRate: 2500, defaultHours: 50 }
      ],
      commonExpenses: [
        { name: 'Print Mockups', defaultCost: 15000 },
        { name: 'Client Presentation', defaultCost: 5000 }
      ],
    }
  ],
  writer: [
    { 
      name: 'Blog Post', 
      description: 'SEO-optimized blog content',
      pricingOptions: [
        { type: 'fixed', label: 'Standard (1000 words)', defaultRate: 10000 },
        { type: 'fixed', label: 'Long-form (2500+ words)', defaultRate: 25000 },
        { type: 'wordCount', label: 'Per Word', defaultRate: 10, defaultCount: 1000 }
      ],
      commonExpenses: [
        { name: 'Research Materials', defaultCost: 2000 },
        { name: 'SEO Tools', defaultCost: 3000 }
      ],
    },
    { 
      name: 'Website Copy', 
      description: 'Conversion-focused website content',
      pricingOptions: [
        { type: 'fixed', label: 'Per Page', defaultRate: 15000 },
        { type: 'fixed', label: 'Full Website Package', defaultRate: 60000 },
        { type: 'hourly', label: 'Hourly Rate', defaultRate: 2000, defaultHours: 30 }
      ],
      commonExpenses: [
        { name: 'Competitor Analysis', defaultCost: 5000 },
        { name: 'Client Revisions', defaultCost: 5000 }
      ],
    },
    { 
      name: 'Technical Writing', 
      description: 'Documentation, guides, and manuals',
      pricingOptions: [
        { type: 'fixed', label: 'User Guide', defaultRate: 30000 },
        { type: 'fixed', label: 'Technical Manual', defaultRate: 50000 },
        { type: 'hourly', label: 'Hourly Rate', defaultRate: 2500, defaultHours: 20 }
      ],
      commonExpenses: [
        { name: 'Specialized Research', defaultCost: 8000 },
        { name: 'Technical Editing', defaultCost: 10000 }
      ],
    }
  ],
  musician: [
    { 
      name: 'Custom Composition', 
      description: 'Original music composition',
      pricingOptions: [
        { type: 'fixed', label: 'Short Piece (1-2 min)', defaultRate: 20000 },
        { type: 'fixed', label: 'Full Track (3-5 min)', defaultRate: 50000 },
        { type: 'hourly', label: 'Hourly Rate', defaultRate: 3000, defaultHours: 15 }
      ],
      commonExpenses: [
        { name: 'Studio Time', defaultCost: 10000 },
        { name: 'Session Musicians', defaultCost: 15000 }
      ],
    },
    { 
      name: 'Production Service', 
      description: 'Music production and mixing',
      pricingOptions: [
        { type: 'fixed', label: 'Single Track', defaultRate: 30000 },
        { type: 'fixed', label: 'EP (4-6 Tracks)', defaultRate: 120000 },
        { type: 'hourly', label: 'Hourly Rate', defaultRate: 3000, defaultHours: 40 }
      ],
      commonExpenses: [
        { name: 'Mixing', defaultCost: 15000 },
        { name: 'Mastering', defaultCost: 10000 }
      ],
    },
    { 
      name: 'Live Performance', 
      description: 'Live music performance',
      pricingOptions: [
        { type: 'fixed', label: 'Solo Performance (2hrs)', defaultRate: 30000 },
        { type: 'fixed', label: 'Band Performance (2hrs)', defaultRate: 80000 },
        { type: 'hourly', label: 'Hourly Rate', defaultRate: 15000, defaultHours: 3 }
      ],
      commonExpenses: [
        { name: 'Transport', defaultCost: 5000 },
        { name: 'Equipment Rental', defaultCost: 10000 }
      ],
    }
  ],
  general: [
    { 
      name: 'Consulting Service', 
      description: 'Professional consulting services',
      pricingOptions: [
        { type: 'fixed', label: 'Single Session', defaultRate: 15000 },
        { type: 'fixed', label: 'Package (5 Sessions)', defaultRate: 60000 },
        { type: 'hourly', label: 'Hourly Rate', defaultRate: 5000, defaultHours: 10 }
      ],
      commonExpenses: [
        { name: 'Research Materials', defaultCost: 5000 },
        { name: 'Travel Expenses', defaultCost: 3000 }
      ],
    },
    { 
      name: 'Project Management', 
      description: 'Professional project management',
      pricingOptions: [
        { type: 'fixed', label: 'Small Project', defaultRate: 50000 },
        { type: 'fixed', label: 'Large Project', defaultRate: 150000 },
        { type: 'hourly', label: 'Hourly Rate', defaultRate: 2500, defaultHours: 40 }
      ],
      commonExpenses: [
        { name: 'Project Tools', defaultCost: 8000 },
        { name: 'Team Coordination', defaultCost: 5000 }
      ],
    },
    { 
      name: 'Custom Service', 
      description: 'Custom freelance service',
      pricingOptions: [
        { type: 'fixed', label: 'Basic Package', defaultRate: 20000 },
        { type: 'fixed', label: 'Premium Package', defaultRate: 50000 },
        { type: 'hourly', label: 'Hourly Rate', defaultRate: 2000, defaultHours: 20 }
      ],
      commonExpenses: [
        { name: 'Materials', defaultCost: 5000 },
        { name: 'Additional Tools', defaultCost: 3000 }
      ],
    }
  ]
};

/**
 * Save a new invoice
 * @param {string} userId User ID
 * @param {Object} invoice Invoice data
 * @returns {Promise<string>} Document ID of saved invoice
 */
export async function saveInvoice(userId, invoice) {
  try {
    const userInvoicesRef = collection(db, 'users', userId, 'invoices');
    
    // Add invoice metadata
    const invoiceWithMetadata = {
      ...invoice,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      status: 'draft',
      number: await generateInvoiceNumber(userId)
    };

    const docRef = await addDoc(userInvoicesRef, invoiceWithMetadata);
    return docRef.id;
  } catch (error) {
    console.error('Error saving invoice:', error);
    throw error;
  }
}

/**
 * Get an invoice by ID
 * @param {string} userId User ID
 * @param {string} invoiceId Invoice ID
 * @returns {Promise<Object>} Invoice data
 */
export async function getInvoice(userId, invoiceId) {
  try {
    const docRef = doc(db, 'users', userId, 'invoices', invoiceId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw createError('Invoice not found', 'INVOICE_NOT_FOUND');
    }

    return {
      id: docSnap.id,
      ...docSnap.data()
    };
  } catch (error) {
    console.error('Error getting invoice:', error);
    throw error;
  }
}

/**
 * Update an existing invoice
 * @param {string} userId User ID
 * @param {string} invoiceId Invoice ID
 * @param {Object} updates Invoice updates
 * @returns {Promise<void>}
 */
export async function updateInvoice(userId, invoiceId, updates) {
  try {
    const docRef = doc(db, 'users', userId, 'invoices', invoiceId);
    await setDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now()
    }, { merge: true });
  } catch (error) {
    console.error('Error updating invoice:', error);
    throw error;
  }
}

/**
 * Delete an invoice
 * @param {string} userId User ID
 * @param {string} invoiceId Invoice ID
 * @returns {Promise<void>}
 */
export async function deleteInvoice(userId, invoiceId) {
  try {
    const docRef = doc(db, 'users', userId, 'invoices', invoiceId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting invoice:', error);
    throw error;
  }
}

/**
 * Get all invoices for a user
 * @param {string} userId User ID
 * @param {Object} filters Optional filters
 * @returns {Promise<Array>} Array of invoices
 */
export async function getUserInvoices(userId, filters = {}) {
  try {
    const invoicesRef = collection(db, 'users', userId, 'invoices');
    let q = query(invoicesRef, orderBy('createdAt', 'desc'));

    if (filters.status) {
      q = query(q, where('status', '==', filters.status));
    }

    if (filters.startDate) {
      q = query(q, where('createdAt', '>=', Timestamp.fromDate(filters.startDate)));
    }

    if (filters.endDate) {
      q = query(q, where('createdAt', '<=', Timestamp.fromDate(filters.endDate)));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting user invoices:', error);
    throw error;
  }
}

/**
 * Generate a unique invoice number
 * @param {string} userId User ID
 * @returns {Promise<string>} Generated invoice number
 */
export async function generateInvoiceNumber(userId) {
  if (!userId) {
    throw new Error('Authentication required to generate invoice number');
  }
  
  try {
    const counterRef = doc(db, 'invoiceCounters', userId);
    const counterDoc = await getDoc(counterRef);
    
    let counter = 1;
    if (counterDoc.exists()) {
      counter = counterDoc.data().currentNumber + 1;
    }
    
    await setDoc(counterRef, { currentNumber: counter });
    
    const date = new Date();
    const year = date.getFullYear();
    const counterStr = counter.toString().padStart(4, '0');
    
    return `INV-${year}-${counterStr}`;
  } catch (error) {
    console.error('Error generating invoice number:', error);
    throw error;
  }
}

/**
 * Calculate invoice totals including tax
 * @param {Object} invoice Invoice data
 * @param {number} vatRate VAT rate as decimal
 * @returns {Object} Calculated totals
 */
export function calculateInvoiceTotals(invoice, vatRate = TAX_CONSTANTS.VAT_RATE) {
  const subtotal = invoice.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const vat = invoice.includeVAT ? subtotal * vatRate : 0;
  const dst = invoice.includeDigitalServiceTax ? calculateDigitalServiceTax(subtotal) : 0;
  
  return {
    subtotal,
    vat,
    dst,
    total: subtotal + vat + dst,
    annual: {
      projectedIncome: subtotal * 12, // Estimated annual income if similar invoices monthly
      vatRegistrationAdvised: (subtotal * 12) >= TAX_CONSTANTS.VAT_REGISTRATION_THRESHOLD
    }
  };
}

/**
 * Update invoice status
 * @param {string} userId User ID
 * @param {string} invoiceId Invoice ID
 * @param {string} status New status
 * @returns {Promise<void>}
 */
export async function updateInvoiceStatus(userId, invoiceId, status) {
  try {
    const validStatuses = ['draft', 'sent', 'paid', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw createError('Invalid invoice status', 'INVALID_STATUS');
    }

    await updateInvoice(userId, invoiceId, { status });
  } catch (error) {
    console.error('Error updating invoice status:', error);
    throw error;
  }
}

/**
 * Get invoice statistics
 * @param {string} userId User ID
 * @returns {Promise<Object>} Invoice statistics
 */
export async function getInvoiceStats(userId) {
  try {
    const invoices = await getUserInvoices(userId);
    
    const stats = {
      total: invoices.length,
      totalAmount: 0,
      paid: 0,
      paidAmount: 0,
      pending: 0,
      pendingAmount: 0,
      overdue: 0,
      overdueAmount: 0
    };

    const now = new Date();

    invoices.forEach(invoice => {
      const amount = invoice.total || 0;
      
      if (invoice.status === 'paid') {
        stats.paid++;
        stats.paidAmount += amount;
      } else if (invoice.status === 'sent') {
        stats.pending++;
        stats.pendingAmount += amount;

        // Check if overdue (due date has passed)
        if (invoice.dueDate && invoice.dueDate.toDate() < now) {
          stats.overdue++;
          stats.overdueAmount += amount;
        }
      }

      stats.totalAmount += amount;
    });

    return stats;
  } catch (error) {
    console.error('Error getting invoice statistics:', error);
    throw error;
  }
}

/**
 * Generate profession-specific rate suggestions
 * @param {string} profession Type of creative profession
 * @returns {Object} Rate suggestions
 */
export function generateRateSuggestions(profession) {
  const baseRate = BILLING_CONSTANTS.MINIMUM_HOURLY_RATES[profession] || BILLING_CONSTANTS.MINIMUM_HOURLY_RATES.general;
  const retainer = BILLING_CONSTANTS.RETAINER_SUGGESTIONS[profession] || BILLING_CONSTANTS.RETAINER_SUGGESTIONS.general;

  return {
    hourlyRate: baseRate,
    dayRate: baseRate * 8,
    weeklyRate: baseRate * 40,
    monthlyRetainer: retainer,
    projectMinimum: baseRate * 4, // Minimum 4-hour charge
    rush: baseRate * 1.5 // 50% premium for rush jobs
  };
}

/**
 * Generate invoice templates for different creative professions
 * @param {string} profession Type of creative profession
 * @param {Object} businessDetails Freelancer's business details
 * @returns {Object} Invoice template
 */
export function generateInvoiceTemplate(profession, businessDetails) {
  const templates = {
    designer: {
      items: [
        { description: 'Initial Concept Development', quantity: 1, rate: 0 },
        { description: 'Design Iterations (per round)', quantity: 1, rate: 0 },
        { description: 'Final Artwork Delivery', quantity: 1, rate: 0 }
      ],
      terms: `1. All design work remains property of the designer until full payment is received
2. Initial concept requires 50% deposit
3. Usage rights as specified in project scope
4. Additional revisions billed at hourly rate`
    },
    writer: {
      items: [
        { description: 'Content Research and Planning', quantity: 1, rate: 0 },
        { description: 'Content Writing (per word)', quantity: 0, rate: 0 },
        { description: 'Revisions (up to 2 rounds)', quantity: 1, rate: 0 }
      ],
      terms: `1. Word count based pricing with research billed separately
2. Copyright transfers upon full payment
3. SEO optimization included
4. Additional revisions at standard hourly rate`
    },
    musician: {
      items: [
        { description: 'Composition', quantity: 1, rate: 0 },
        { description: 'Recording Session (per hour)', quantity: 0, rate: 0 },
        { description: 'Mixing and Mastering', quantity: 1, rate: 0 }
      ],
      terms: `1. 50% deposit required for custom compositions
2. Usage rights as per agreement
3. Studio time billed separately
4. Revisions beyond two rounds at additional cost`
    }
  };

  const template = templates[profession] || {
    items: [
      { description: 'Professional Services', quantity: 1, rate: 0 }
    ],
    terms: 'Standard payment terms: 30 days'
  };

  return {
    ...template,
    businessDetails,
    paymentMethods: BILLING_CONSTANTS.PAYMENT_METHODS,
    suggestions: generateRateSuggestions(profession)
  };
}

/**
 * Calculate recommended pricing based on market position
 * @param {Object} params Calculation parameters
 * @returns {Object} Pricing recommendations
 */
export function calculateMarketBasedPricing({
  profession,
  experienceYears,
  isVATRegistered,
  hasPortfolio,
  specialization
}) {
  const baseRate = BILLING_CONSTANTS.MINIMUM_HOURLY_RATES[profession] || BILLING_CONSTANTS.MINIMUM_HOURLY_RATES.general;
  
  // Experience multiplier
  const experienceMultiplier = Math.min(2, 1 + (experienceYears * 0.1)); // Max 2x for experience
  
  // Portfolio and specialization bonuses
  const portfolioBonus = hasPortfolio ? 0.15 : 0;
  const specializationBonus = specialization ? 0.2 : 0;
  
  // Calculate recommended rates
  const recommendedHourlyRate = baseRate * experienceMultiplier * (1 + portfolioBonus + specializationBonus);
  
  // Apply VAT rate adjustment if registered
  const vatAdjustedRate = isVATRegistered ? recommendedHourlyRate * 1.16 : recommendedHourlyRate;
  
  return {
    minimum: baseRate,
    recommended: recommendedHourlyRate,
    recommendedWithVAT: vatAdjustedRate,
    premium: recommendedHourlyRate * 1.5,
    premiumWithVAT: isVATRegistered ? recommendedHourlyRate * 1.5 * 1.16 : recommendedHourlyRate * 1.5,
    daily: recommendedHourlyRate * 8,
    weekly: recommendedHourlyRate * 40,
    monthly: recommendedHourlyRate * 160,
    vatRegistration: {
      shouldRegister: (recommendedHourlyRate * 160 * 12) >= TAX_CONSTANTS.VAT_REGISTRATION_THRESHOLD,
      projectedAnnual: recommendedHourlyRate * 160 * 12,
      isRegistered: isVATRegistered
    }
  };
}

/**
 * Calculate pricing based on pricing model and options
 * @param {Object} params - Pricing parameters
 * @returns {Object} - Calculated pricing details
 */
export function calculateProjectPricing({
  pricingModel,
  quantity = 1,
  rate,
  hours,
  wordCount,
  expenses = [],
  isVATRegistered = false,
  includeDigitalServiceTax = false
}) {
  let subtotal = 0;
  
  // Calculate service fee based on pricing model
  if (pricingModel === 'fixed') {
    subtotal = rate * quantity;
  } else if (pricingModel === 'hourly') {
    subtotal = rate * hours;
  } else if (pricingModel === 'wordCount') {
    subtotal = (rate / 1000) * wordCount; // Rate per 1000 words
  }
  
  // Add expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + (expense.cost || 0), 0);
  
  // Calculate taxes
  const vat = isVATRegistered ? subtotal * TAX_CONSTANTS.VAT_RATE : 0;
  const dst = includeDigitalServiceTax ? calculateDigitalServiceTax(subtotal) : 0;
  
  // Calculate total
  const total = subtotal + totalExpenses + vat + dst;
  
  return {
    serviceSubtotal: subtotal,
    expensesTotal: totalExpenses,
    vat,
    dst,
    total,
    breakdown: {
      services: subtotal,
      expenses: totalExpenses,
      taxes: vat + dst
    }
  };
}

/**
 * Save project billing plan
 * @param {string} userId - User ID
 * @param {Object} project - Project data
 * @returns {Promise<string>} - Document ID of saved project
 */
export async function saveProjectPlan(userId, project) {
  try {
    const userProjectsRef = collection(db, 'users', userId, 'projects');
    
    // Add project metadata
    const projectWithMetadata = {
      ...project,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      status: 'draft'
    };

    const docRef = await addDoc(userProjectsRef, projectWithMetadata);
    return docRef.id;
  } catch (error) {
    console.error('Error saving project plan:', error);
    throw error;
  }
}

/**
 * Get a project plan by ID
 * @param {string} userId - User ID
 * @param {string} projectId - Project ID
 * @returns {Promise<Object>} - Project data
 */
export async function getProjectPlan(userId, projectId) {
  try {
    const docRef = doc(db, 'users', userId, 'projects', projectId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw createError('Project not found', 'PROJECT_NOT_FOUND');
    }

    return {
      id: docSnap.id,
      ...docSnap.data()
    };
  } catch (error) {
    console.error('Error getting project plan:', error);
    throw error;
  }
}

/**
 * Get all project plans for a user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} - Array of project plans
 */
export async function getUserProjects(userId) {
  try {
    const projectsRef = collection(db, 'users', userId, 'projects');
    const q = query(projectsRef, orderBy('createdAt', 'desc'));
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting user projects:', error);
    throw error;
  }
}

/**
 * Update an existing project plan
 * @param {string} userId - User ID
 * @param {string} projectId - Project ID
 * @param {Object} updates - Project updates
 * @returns {Promise<void>}
 */
export async function updateProjectPlan(userId, projectId, updates) {
  try {
    const docRef = doc(db, 'users', userId, 'projects', projectId);
    await setDoc(docRef, {
      ...updates,
      updatedAt: Timestamp.now()
    }, { merge: true });
  } catch (error) {
    console.error('Error updating project plan:', error);
    throw error;
  }
}

/**
 * Convert a project plan to an invoice
 * @param {Object} project - Project plan data
 * @returns {Object} - Invoice data
 */
export function convertProjectToInvoice(project) {
  // Extract client info
  const client = {
    name: project.client?.name || '',
    email: project.client?.email || '',
    address: project.client?.address || '',
    phone: project.client?.phone || ''
  };
  
  // Create invoice items from project services
  const items = [];
  
  // Add main service
  items.push({
    description: `${project.serviceName}: ${project.serviceDescription}`,
    quantity: project.quantity || 1,
    rate: project.rate || 0
  });
  
  // Add expenses as separate items
  if (project.expenses && project.expenses.length > 0) {
    project.expenses.forEach(expense => {
      items.push({
        description: `Expense: ${expense.name}`,
        quantity: 1,
        rate: expense.cost || 0
      });
    });
  }
  
  // Create invoice object
  const invoice = {
    title: `Invoice for ${project.title || 'Project'}`,
    client,
    items,
    date: new Date(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Due in 30 days
    includeVAT: project.isVATRegistered || false,
    includeDigitalServiceTax: project.includeDigitalServiceTax || false,
    notes: project.notes || '',
    terms: project.terms || 'Payment due within 30 days of invoice date.'
  };
  
  return invoice;
}

/**
 * Generate a proposal document from a project plan
 * @param {Object} project - Project plan data
 * @returns {Object} - Proposal data
 */
export function generateProposal(project) {
  const pricing = calculateProjectPricing({
    pricingModel: project.pricingModel,
    quantity: project.quantity || 1,
    rate: project.rate || 0,
    hours: project.hours || 0,
    wordCount: project.wordCount || 0,
    expenses: project.expenses || [],
    isVATRegistered: project.isVATRegistered || false,
    includeDigitalServiceTax: project.includeDigitalServiceTax || false
  });
  
  const proposalSections = {
    designer: [
      {
        title: 'Project Overview',
        content: `This proposal outlines the design services to be provided for ${project.title || 'your project'}. The work includes conceptualization, design development, revisions, and final delivery of all agreed-upon assets.`
      },
      {
        title: 'Process & Timeline',
        content: `Our design process includes the following phases:
1. Research and Conceptualization: 1-2 weeks
2. Design Development: 1-2 weeks
3. Revisions (up to 2 rounds): 1 week
4. Final Delivery: 1 week

Total estimated timeline: ${project.timeline || '4-6 weeks'}`
      },
      {
        title: 'Deliverables',
        content: `Upon completion of this project, you will receive:
- ${project.serviceName} as specified
- All source files in appropriate formats
- Usage rights as outlined in the terms
- Documentation as needed`
      }
    ],
    writer: [
      {
        title: 'Project Overview',
        content: `This proposal outlines the writing services to be provided for ${project.title || 'your project'}. The work includes research, content creation, revisions, and final delivery of all agreed-upon content.`
      },
      {
        title: 'Process & Timeline',
        content: `Our writing process includes the following phases:
1. Research and Outline: ${project.pricingModel === 'wordCount' ? '1-3 days' : '3-5 days'}
2. Initial Draft: ${project.pricingModel === 'wordCount' ? '3-5 days' : '1-2 weeks'}
3. Revisions (up to 2 rounds): 3-5 days
4. Final Delivery: 1-2 days

Total estimated timeline: ${project.timeline || '2-3 weeks'}`
      },
      {
        title: 'Deliverables',
        content: `Upon completion of this project, you will receive:
- ${project.serviceName} as specified${project.pricingModel === 'wordCount' ? ` (${project.wordCount} words)` : ''}
- SEO optimization if applicable
- All content in requested formats
- Copyright transfer upon final payment`
      }
    ],
    musician: [
      {
        title: 'Project Overview',
        content: `This proposal outlines the music services to be provided for ${project.title || 'your project'}. The work includes composition, production, recording, and final delivery of all agreed-upon audio assets.`
      },
      {
        title: 'Process & Timeline',
        content: `Our music production process includes the following phases:
1. Concept and Composition: 1-2 weeks
2. Recording and Production: 1-2 weeks
3. Mixing and Revisions: 1 week
4. Mastering and Final Delivery: 3-5 days

Total estimated timeline: ${project.timeline || '4-6 weeks'}`
      },
      {
        title: 'Deliverables',
        content: `Upon completion of this project, you will receive:
- ${project.serviceName} as specified
- Final audio files in industry-standard formats
- Usage rights as outlined in the terms
- Stems or individual tracks if requested`
      }
    ],
    general: [
      {
        title: 'Project Overview',
        content: `This proposal outlines the professional services to be provided for ${project.title || 'your project'}. The work includes all specified deliverables and consultation as agreed upon.`
      },
      {
        title: 'Process & Timeline',
        content: `Our process includes the following phases:
1. Initial Consultation and Planning: 1 week
2. Project Execution: ${project.timeline || '2-4 weeks'}
3. Review and Adjustments: 1 week
4. Final Delivery: 3-5 days

Total estimated timeline: ${project.timeline || '4-6 weeks'}`
      },
      {
        title: 'Deliverables',
        content: `Upon completion of this project, you will receive:
- ${project.serviceName} as specified
- Documentation and reports as needed
- Follow-up consultation if included
- All deliverables in requested formats`
      }
    ]
  };
  
  const sections = proposalSections[project.profession] || proposalSections.general;
  
  return {
    title: `Proposal: ${project.title || 'Professional Services'}`,
    date: new Date(),
    validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Valid for 30 days
    client: project.client || {},
    provider: project.from || {},
    serviceName: project.serviceName,
    serviceDescription: project.serviceDescription,
    sections,
    pricing,
    terms: project.terms || 'Standard terms apply. Full payment due within 30 days of invoice.',
    notes: project.notes || ''
  };
}