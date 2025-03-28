import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebase';

// Lazy load route components for better performance
const HomePage = () => import('../views/Home.vue');
const TaxCalculator = () => import('../views/TaxCalculator.vue');
const BillingGenerator = () => import('../views/BillingGenerator.vue');
const BillingPlanner = () => import('../views/BillingPlanner.vue');
const Proposal = () => import('../views/Proposal.vue');
const Examples = () => import('../views/Examples.vue');
const Auth = () => import('../views/Auth.vue');
const Settings = () => import('../views/Settings.vue');
const Profile = () => import('../views/Profile.vue');
const InvoiceCreate = () => import('../views/InvoiceCreate.vue');
const TaxGuide = () => import('../views/TaxGuide.vue');
const BlogPage = () => import('../views/Blog.vue');

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/tax-calculator',
    name: 'TaxCalculator',
    component: TaxCalculator
  },
  {
    path: '/billing',
    name: 'BillingGenerator',
    component: BillingGenerator
  },
  {
    path: '/billing-planner',
    name: 'BillingPlanner',
    component: BillingPlanner
  },
  {
    path: '/proposal',
    name: 'Proposal',
    component: Proposal
  },
  {
    path: '/examples',
    name: 'Examples',
    component: Examples
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: {
      requiresGuest: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/invoice/create',
    name: 'InvoiceCreate',
    component: InvoiceCreate
  },
  {
    path: '/tax-guide',
    name: 'TaxGuide',
    component: TaxGuide
  },
  {
    path: '/blog',
    name: 'Blog',
    component: BlogPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // Always scroll to top
    return { top: 0 }
  }
});

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);

  // Wait for Firebase Auth to initialize
  const user = await new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    });
  });

  const isAuthenticated = !!user;

  if (requiresAuth && !isAuthenticated) {
    next('/auth');
  } else if (requiresGuest && isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;