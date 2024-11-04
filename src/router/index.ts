import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalizedGeneric, RouteLocationNormalizedLoadedGeneric } from 'vue-router';
import MainLayout from '../layouts/MainLayout.vue';
import AuthLayout from '../layouts/AuthLayout.vue';
import DashboardPage from '../pages/DashboardPage.vue';
import ProfilePage from '../pages/ProfilePage.vue';
import CustomersPage from '../pages/CustomersPage.vue';
import EmployeesPage from '../pages/EmployeesPage.vue';
import SuppliersPage from '../pages/SuppliersPage.vue';
import InventoryPage from '../pages/InventoryPage.vue';
import TransactionsPage from '../pages/TransactionsPage.vue';
import ActivityLogsPage from '../pages/ActivityLogsPage.vue';
import SignInPage from '../pages/SignInPage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';
import BookingsPage from '../pages/BookingsPage.vue';
import EmployeeDetailsPage from '../pages/EmployeeDetailsPage.vue';
import CustomerDetailsPage from '../pages/CustomerDetailsPage.vue';
import SupplierDetailsPage from '../pages/SupplierDetailsPage.vue';
import CustomerCreatePage from '../pages/CustomerCreatePage.vue';
import SupplierCreatePage from '../pages/SupplierCreatePage.vue';
import EmployeeCreatePage from '../pages/EmployeeCreatePage.vue';
import MessagesPage from '../pages/MessagesPage.vue';
import ForgotPasswordPage from '../pages/ForgotPasswordPage.vue';
import ServiceCreatePage from '../pages/ServiceCreatePage.vue';
import ServicePage from '../pages/ServicePage.vue';
import ServiceAddonPage from '../pages/ServiceAddonPage.vue';

const routes = [
    {
        path: '/',
        component: MainLayout,
        name: 'main-layout',
        meta: { requiresAuth: true },
        children: [
            {
                path: '',
                name: 'dashboard',
                component: DashboardPage
            },
            {
                path: 'customers',
                name: 'customer',
                component: CustomersPage
            },
            {
                path: 'employees',
                name: 'employee',
                component: EmployeesPage
            },
            {
                path: 'suppliers',
                name: 'supplier',
                component: SuppliersPage
            },
            {
                path: 'profile/:id',
                name: 'profile',
                component: ProfilePage
            },
            {
                path: 'bookings',
                name: 'bookings',
                component: BookingsPage
            },
            {
                path: 'service',
                name: 'service',
                component: ServicePage
            },
            {
                path: 'service/:id',
                name: 'Addon',
                component: ServiceAddonPage
            },
            {
                path: 'inventory',
                name: 'inventory',
                component: InventoryPage
            },
            {
                path: 'product-create',
                name: 'product-create',
                component: ServiceCreatePage
            },
            {
                path: 'service-create',
                name: 'service-create',
                component: ServiceCreatePage
            },
            {
                path: 'transactions',
                name: 'transaction',
                component: TransactionsPage
            },
            {
                path: 'activity-logs',
                name: 'activity_logs',
                component: ActivityLogsPage
            },
            {
                path: 'employee/:id',
                name: 'employee_details',
                component: EmployeeDetailsPage
            },
            {
                path: 'customer/:id',
                name: 'customer_details',
                component: CustomerDetailsPage
            },
            {
                path: 'supplier/:id',
                name: 'supplier_details',
                component: SupplierDetailsPage
            },
            {
                path: 'customer/create',
                name: 'customer_create',
                component: CustomerCreatePage
            },
            {
                path: 'supplier/create',
                name: 'supplier_create',
                component: SupplierCreatePage
            },
            {
                path: 'employee/create',
                name: 'employee_create',
                component: EmployeeCreatePage
            },
            {
                path: 'messages',
                name: 'messages',
                component: MessagesPage
            },
        ]
    },
    {
        path: '/auth',
        name: 'auth',
        component: AuthLayout,
        children: [
            {
                path: 'signin',
                name: 'sign-in',
                component: SignInPage
            },
            {
                path: 'forgot-password',
                name: 'ForgotPassword',
                component: ForgotPasswordPage
            },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach((to: RouteLocationNormalizedGeneric, from: RouteLocationNormalizedLoadedGeneric, next: NavigationGuardNext) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = localStorage.getItem('token');

    if (requiresAuth && !isAuthenticated) {
        next({name: 'sign-in'});
    } else {
        next();
    }
})

export default router;