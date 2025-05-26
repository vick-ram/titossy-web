import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
} from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";
import DashboardPage from "../pages/DashboardPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import CustomersPage from "../pages/CustomersPage.vue";
import EmployeesPage from "../pages/EmployeesPage.vue";
import SuppliersPage from "../pages/SuppliersPage.vue";
import InventoryPage from "../pages/InventoryPage.vue";
import TransactionsPage from "../pages/TransactionsPage.vue";
import ActivityLogsPage from "../pages/ActivityLogsPage.vue";
import SignInPage from "../pages/SignInPage.vue";
import NotFoundPage from "../pages/NotFoundPage.vue";
import BookingsPage from "../pages/BookingsPage.vue";
import MessagesPage from "../pages/MessagesPage.vue";
import ForgotPasswordPage from "../pages/ForgotPasswordPage.vue";
import ServicePage from "../pages/ServicePage.vue";
import ServiceAddonPage from "../pages/ServiceAddonPage.vue";

const routes = [
  {
    path: "/",
    component: MainLayout,
    name: "main-layout",
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        name: "dashboard",
        component: DashboardPage,
      },
      {
        path: "customers",
        name: "customer",
        component: CustomersPage,
      },
      {
        path: "employees",
        name: "employee",
        component: EmployeesPage,
      },
      {
        path: "suppliers",
        name: "supplier",
        component: SuppliersPage,
      },
      {
        path: "profile/:id",
        name: "profile",
        component: ProfilePage,
      },
      {
        path: "bookings",
        name: "bookings",
        component: BookingsPage,
      },
      {
        path: "service",
        name: "service",
        component: ServicePage,
      },
      {
        path: "service/:id",
        name: "Addon",
        component: ServiceAddonPage,
      },
      {
        path: "inventory",
        name: "inventory",
        component: InventoryPage,
      },
      {
        path: "transactions",
        name: "transaction",
        component: TransactionsPage,
      },
      {
        path: "activity-logs",
        name: "activity_logs",
        component: ActivityLogsPage,
      },
      {
        path: "messages",
        name: "messages",
        component: MessagesPage,
      },
      {
        path: "purchase-orders",
        name: "purchase_orders",
        component: () => import("../pages/PurchaseOrdersPage.vue"),
      },
    ],
  },
  {
    path: "/auth",
    name: "auth",
    component: AuthLayout,
    children: [
      {
        path: "signin",
        name: "sign-in",
        component: SignInPage,
      },
      {
        path: "forgot-password",
        name: "ForgotPassword",
        component: ForgotPasswordPage,
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(
  (
    to: RouteLocationNormalizedGeneric,
    from: RouteLocationNormalizedLoadedGeneric,
    next: NavigationGuardNext
  ) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const isAuthenticated = localStorage.getItem("token");

    console.log("Navigating from", from.fullPath, "to", to.fullPath);

    if (requiresAuth && !isAuthenticated) {
      next({ name: "sign-in" });
    } else {
      next();
    }
  }
);

export default router;
