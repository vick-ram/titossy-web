<template>
  <ElevatedCard class="mt-5">
    <div
      class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4"
    >
      <div>
        <button
          @click="toggleDrawer"
          type="button"
          class="bg-blue-700 hover:bg-blue-800 text-white ocus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Create
        </button>
      </div>
      <div class="flex flex-row items-center gap-2">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
          <div
            class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            v-model="query"
            type="text"
            id="table-search"
            class="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for items"
          />
        </div>
        <button
          @click="exportToCSV"
          type="button"
          class="bg-green-500 hover:bg-green-600 text-white focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
        >
          Export
        </button>
      </div>
    </div>
    <div class="w-full overflow-x-auto shadow-md rounded-lg">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">#</th>
            <th scope="col" class="px-6 py-3">ID</th>
            <th scope="col" class="px-6 py-3">fullName</th>
            <th scope="col" class="px-6 py-3">phone</th>
            <th scope="col" class="px-6 py-3">address</th>
            <th scope="col" class="px-6 py-3">email</th>
            <th scope="col" class="px-6 py-3">status</th>
            <th scope="col" class="px-6 py-3">create_at</th>
            <th scope="col" class="px-6 py-3">updated_at</th>
            <th scope="col" class="px-6 py-3">action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="customer in filteredCustomers"
            :key="customer.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td class="px-6 py-4">
              {{ customerStore.customers.indexOf(customer) + 1 }}
            </td>
            <td class="px-6 py-4">{{ customer.id }}</td>
            <td class="px-6 py-4">{{ customer.fullName }}</td>
            <td class="px-6 py-4">{{ customer.phone }}</td>
            <td class="px-6 py-4">{{ customer.address }}</td>
            <td class="px-6 py-4">{{ customer.email }}</td>
            <td class="px-6 py-4">
              <button @click="updateStatus(customer)">
                <span
                  :class="{
                    'text-orange-500': customer.status === 'PENDING',
                    'text-green-500': customer.status === 'APPROVED',
                  }"
                  >{{ customer.status }}</span
                >
              </button>
            </td>
            <td class="px-6 py-4">{{ formatDateTime(customer.createdAt) }}</td>
            <td class="px-6 py-4">{{ formatDateTime(customer.updatedAt) }}</td>
            <td
              class="px-6 py-4 flex flex-row items-center justify-center gap-2 relative"
            >
              <button
                data-modal-target="customer-detail-modal"
                data-modal-toggle="customer-detail-modal"
                type="button"
                @click="showCustomerDetails(customer)"
              >
                <span
                  class="material-symbols-outlined cursor-pointer text-blue-600"
                  >visibility</span
                >
              </button>
              <span
                @click="deleteCustomer(customer)"
                class="material-symbols-outlined cursor-pointer text-red-500"
                >delete</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav
      class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
      aria-label="Table navigation"
    >
      <span
        class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto"
      >
        Showing
        <span class="font-semibold text-gray-900 dark:text-white"
          >{{ startIndex }}-{{ endIndex }}</span
        >
        of
        <span class="font-semibold text-gray-900 dark:text-white">{{
          totalCustomers
        }}</span>
      </span>
      <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <!-- Previous Button -->
        <li>
          <a
            href="#"
            @click.prevent="goToPage(currentPage - 1)"
            :class="{
              'text-gray-500 bg-white': currentPage > 1,
              'text-gray-300 bg-gray-100': currentPage <= 1,
            }"
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            :disabled="currentPage <= 1"
            >Previous</a
          >
        </li>

        <!-- Dynamic Page Numbers -->
        <li v-for="page in pages" :key="page">
          <a
            href="#"
            @click.prevent="goToPage(page)"
            :class="{
              'text-gray-900 bg-white': page === currentPage,
              'text-gray-500 bg-white': page !== currentPage,
            }"
            class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            {{ page }}
          </a>
        </li>

        <!-- Next Button -->
        <li>
          <a
            href="#"
            @click.prevent="goToPage(currentPage + 1)"
            :class="{
              'text-gray-500 bg-white': currentPage < totalPages,
              'text-gray-300 bg-gray-100': currentPage >= totalPages,
            }"
            class="flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            :disabled="currentPage >= totalPages"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </ElevatedCard>

  <!-- Right Drawer -->
  <RightDrawer :drawer-open="isDrawerOpen" @toggle="toggleDrawer">
    <div class="flex justify-center">
      <h5
        class="mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        Enter Customer Data
      </h5>
    </div>
    <form @submit.prevent="createCustomer" class="mb-6">
      <div class="mb-5">
        <label
          for="firstName"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >First Name</label
        >
        <input
          v-model="customerStore.customerData.firstName"
          type="firstName"
          id="firstName"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="John"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="lastName"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Last Name</label
        >
        <input
          v-model="customerStore.customerData.lastName"
          type="lastName"
          id="lastName"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Doe"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="phone"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Phone</label
        >
        <input
          v-model="customerStore.customerData.phone"
          type="text"
          id="phone"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="0712345678"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Email</label
        >
        <input
          v-model="customerStore.customerData.email"
          type="email"
          id="email"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="example@gmail.com"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Password</label
        >
        <input
          v-model="customerStore.customerData.password"
          type="password"
          id="password"
          class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder=".*********"
          required
        />
      </div>
      <div class="w-full">
        <LoadingButton
          :loading="customerStore.loading"
          label="Create New Customer"
        />
      </div>
    </form>
  </RightDrawer>

  <!-- Detail modal -->
  <Modal ref="customerDetailModalRef" title="Customer Details">
    <div v-if="selectedCustomer">
      <div class="flex items-center justify-between mb-8">
        <div class="p-2">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            {{ selectedCustomer.fullName }}
          </h1>
          <div class="flex items-center mt-2">
            <span
              class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
              :class="statusClasses(selectedCustomer)"
            >
              {{ selectedCustomer.status }}
            </span>
            <span class="ml-4 text-gray-600 dark:text-gray-400">
              Member since {{ formatDateTime(selectedCustomer.createdAt) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Main Profile Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Personal Information Card -->
        <div
          class="col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
        >
          <div class="p-6">
            <h2
              class="text-xl font-semibold text-gray-800 dark:text-white mb-4"
            >
              Personal Information
            </h2>
            <div class="space-y-4">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Full Name
                </p>
                <p class="text-gray-800 dark:text-white">
                  {{ selectedCustomer.fullName }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <p class="text-gray-800 dark:text-white">
                  {{ selectedCustomer.email }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                <p class="text-gray-800 dark:text-white">
                  {{ selectedCustomer.phone || "Not provided" }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Address Card -->
        <div
          class="col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
        >
          <div class="p-6">
            <h2
              class="text-xl font-semibold text-gray-800 dark:text-white mb-4"
            >
              Address
            </h2>
            <div>
              <p class="text-gray-800 dark:text-white">
                {{ selectedCustomer.address || "No address provided" }}
              </p>
            </div>
          </div>
        </div>

        <!-- Account Details Card -->
        <div
          class="col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
        >
          <div class="p-6">
            <h2
              class="text-xl font-semibold text-gray-800 dark:text-white mb-4"
            >
              Account Details
            </h2>
            <div class="space-y-4">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Customer ID
                </p>
                <p class="text-gray-800 dark:text-white">
                  {{ selectedCustomer.id }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Last Updated
                </p>
                <p class="text-gray-800 dark:text-white">
                  {{ formatDateTime(selectedCustomer.updatedAt) }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  Account Status
                </p>
                <p class="text-gray-800 dark:text-white">
                  {{ selectedCustomer.status }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No customer selected.</p>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useCustomerStore } from "../store/customerStore";
import { useToastStore } from "../store/toastStore";
import { genericFilter } from "../utils/genericFilter";
import { formatDateTime } from "../utils/dateFormatter";
import { Customer } from "../models/constants";
import { del } from "../boot";
import { AxiosResponse } from "axios";
import ElevatedCard from "../components/ElevatedCard.vue";
import RightDrawer from "../components/RightDrawer.vue";
import LoadingButton from "../components/LoadingButton.vue";
import Modal from "../components/Modal.vue";
import { initFlowbite, Modal as FlowbiteModal } from "flowbite";

const customerStore = useCustomerStore();
const toastStore = useToastStore();
const query = ref("");
const isDrawerOpen = ref(false);

const customerDetailModalRef = ref<HTMLElement | null>(null);
let modal: FlowbiteModal | null = null;

const selectedCustomer = ref<Customer | null>(null);

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const createCustomer = async () => {
  await customerStore.create();
  if (customerStore.successMessage) {
    toastStore.showToast(customerStore.successMessage, "success");
    isDrawerOpen.value = false;
    customerStore.getAll();
  }

  if (customerStore.errorMessages) {
    toastStore.showToast(customerStore.errorMessages, "error");
  }
};

const showCustomerDetails = (customer: Customer) => {
  selectedCustomer.value = { ...customer };
  modal?.show();
};

function statusClasses(customer: Customer) {
  return {
    "bg-green-100 text-green-800": customer.status === "active",
    "bg-red-100 text-red-800": customer.status === "inactive",
    "bg-yellow-100 text-yellow-800": customer.status === "pending",
    "bg-gray-100 text-gray-800": !["active", "inactive", "pending"].includes(
      customer.status
    ),
  };
}

const filteredCustomers = computed(() => {
  return genericFilter(customerStore.customers, query.value, [
    "fullName",
    "phone",
    "address",
    "email",
    "status",
  ]);
});

const totalCustomers = computed(() => customerStore.customers.length);
const itemsPerPage = ref(10);
const currentPage = ref(1);

const totalPages = computed(() =>
  Math.ceil(totalCustomers.value / itemsPerPage.value)
);

const pages = computed(() => {
  const numberOfPages = totalPages.value;
  const visiblePages = [];

  for (let i = 1; i <= numberOfPages; i++) {
    visiblePages.push(i);
  }

  return visiblePages;
});

const startIndex = computed(
  () => (currentPage.value - 1) * itemsPerPage.value + 1
);
const endIndex = computed(() =>
  Math.min(currentPage.value * itemsPerPage.value, totalCustomers.value)
);

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const updateStatus = async (customer: Customer) => {
  if (customer.status === "PENDING") {
    await customerStore.updateStatus(customer.id, "APPROVED");
  } else if (customer.status === "APPROVED") {
    await customerStore.updateStatus(customer.id, "PENDING");
  } else {
    await customerStore.updateStatus(customer.id, customer.status);
  }

  if (customerStore.successMessage) {
    customerStore.getAll();
    toastStore.showToast(customerStore.successMessage, "success");
  }

  if (customerStore.errorMessages) {
    toastStore.showToast(customerStore.errorMessages, "error");
  }
};

const deleteCustomer = (customer: Customer) => {
  if (!confirm("Are you sure you want to delete this customer?")) return;
  del(`/customer/${customer.id}`)
    .then((response: AxiosResponse) => {
      if (response.data.status === "success") {
        customerStore.customers = customerStore.customers.filter(
          (cust) =>cust.id !== customer.id
        );
        customerStore.getAll();
        toastStore.showToast(response.data.message, "success");
      }
      if (response.data.status === "error") {
        throw new Error(response.data.error);
      }
    })
    .catch((e) => {
      toastStore.showToast(e.message, "error");
    });
};

const exportToCSV = () => {
  const customers = customerStore.customers;

  const headers = [
    "ID",
    "Full Name",
    "Phone",
    "Address",
    "Email",
    "Status",
    "Created At",
    "Updated At",
  ];

  const rows = customers.map((customer) => {
    return [
      customer.id,
      customer.fullName,
      customer.phone,
      customer.address,
      customer.email,
      customer.status,
      formatDateTime(customer.createdAt),
      formatDateTime(customer.updatedAt),
    ];
  });

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "customers.csv";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

onMounted(async () => {
  await customerStore.getAll();
  initFlowbite();

  if (customerDetailModalRef.value) {
    modal = new FlowbiteModal(customerDetailModalRef.value);
  }
});
</script>
