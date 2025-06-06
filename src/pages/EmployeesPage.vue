<template>
  <ElevatedCard class="mt-5">
    <div
      class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4"
    >
      <div>
        <button
          @click="toggleDrawer"
          type="button"
          class="bg-blue-700 hover:bg-blue-800 text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
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
            v-model="searchQuery"
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
            <th scope="col" class="px-6 py-3">username</th>
            <th scope="col" class="px-6 py-3">fullName</th>
            <th scope="col" class="px-6 py-3">gender</th>
            <th scope="col" class="px-6 py-3">email</th>
            <th scope="col" class="px-6 py-3">phone</th>
            <th scope="col" class="px-6 py-3">role</th>
            <th scope="col" class="px-6 py-3">status</th>
            <th scope="col" class="px-6 py-3">create_at</th>
            <th scope="col" class="px-6 py-3">updated_at</th>
            <th scope="col" class="px-6 py-3">action</th>
          </tr>
        </thead>
        <tbody v-if="employeeStore.employees.length === 0">
          <tr>
            <td :colspan="12" class="py-20">
              <div class="flex items-center justify-center w-full">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr
            v-for="employee in filteredEmployees"
            :key="employee.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <td class="px-6 py-4">
              {{ employeeStore.employees.indexOf(employee) + 1 }}
            </td>
            <td class="px-6 py-4">{{ employee.id }}</td>
            <td class="px-6 py-4">{{ employee.username }}</td>
            <td class="px-6 py-4">{{ employee.fullName }}</td>
            <td class="px-6 py-4">{{ employee.gender }}</td>
            <td class="px-6 py-4">{{ employee.email }}</td>
            <td class="px-6 py-4">{{ employee.phone }}</td>
            <td class="px-6 py-4">{{ employee.role }}</td>
            <td class="px-6 py-4">
              <span class="text-green-400 font-medium">{{
                employee.approvalStatus
              }}</span>
            </td>
            <td class="px-6 py-4">
              {{ formatDateTime(employee.createdAt) }}
            </td>
            <td class="px-6 py-4">
              {{ formatDateTime(employee.updatedAt) }}
            </td>
            <td
              class="px-6 py-4 flex flex-row items-center justify-center gap-2"
            >
              <span
                data-modal-target="edit-employee-modal"
                data-modal-toggle="edit-employee-modal"
                @click="showEmployeeDetails(employee)"
                class="material-symbols-outlined cursor-pointer text-blue-600"
                >visibility</span
              >
              <span
                @click="deleteEmployee(employee.id)"
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
        >Showing
        <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of
        <span class="font-semibold text-gray-900 dark:text-white">{{
          employeeStore.employees.length
        }}</span></span
      >
      <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <a
            href="#"
            class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >Previous</a
          >
        </li>
        <li>
          <a
            href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >1</a
          >
        </li>
        <li>
          <a
            href="#"
            class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </ElevatedCard>
  <RightDrawer :drawer-open="isDrawerOpen" @toggle="toggleDrawer">
    <div class="flex justify-center">
      <h5
        class="mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        Enter Employee Data
      </h5>
    </div>
    <form @submit.prevent="createEmployee">
      <div class="mb-3">
        <label
          for="first_name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >First Name</label
        >
        <input
          v-model="employeeStore.employeeData.firstName"
          type="text"
          id="first_name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="John"
          required
        />
      </div>

      <div class="mb-3">
        <label
          for="last_name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Last name</label
        >
        <input
          v-model="employeeStore.employeeData.lastName"
          type="text"
          id="last_name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Doe"
          required
        />
      </div>

      <div class="mb-3">
        <label
          for="gender"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Gender</label
        >
        <select
          v-model="employeeStore.employeeData.gender"
          id="gender"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option v-for="(value, key) in gender" :key="key" :value="value">
            {{ value }}
          </option>
        </select>
      </div>

      <div>
        <label
          for="phone"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Phone number</label
        >
        <input
          v-model="employeeStore.employeeData.phone"
          type="tel"
          id="phone"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="0712345678"
          required
        />
      </div>

      <div class="mb-3">
        <label
          for="role"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Role</label
        >
        <select
          v-model="employeeStore.employeeData.role"
          id="role"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option v-for="(role, key) in roles" :key="key" :value="role">
            {{ role }}
          </option>
        </select>
      </div>

      <div class="mb-3">
        <label
          for="email"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Email</label
        >
        <input
          v-model="employeeStore.employeeData.email"
          type="email"
          id="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="johndoe@gmail.com"
          required
        />
      </div>

      <div class="mb-3">
        <label
          for="password"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >Password</label
        >
        <input
          v-model="employeeStore.employeeData.password"
          type="password"
          id="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="•••••••••"
          required
        />
      </div>

      <LoadingButton label="Submit" :loading="employeeStore.loading" />
    </form>
  </RightDrawer>

  <!-- Modal to show employee details -->
  <div
    id="edit-employee-modal"
    tabindex="-1"
    aria-hidden="true"
    class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200"
        >
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Employee Details
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="edit-employee-modal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="p-4 md:p-5 space-y-4">
          <EmployeeDetails v-if="selectedEmployee" :employee="selectedEmployee" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useEmployeeStore } from "../store/employeeStore";
import { genericFilter } from "../utils/genericFilter";
import { formatDateTime } from "../utils/dateFormatter";
import { Employee } from "../models/constants";
import { useToastStore } from "../store/toastStore";
import ElevatedCard from "../components/ElevatedCard.vue";
import RightDrawer from "../components/RightDrawer.vue";
import LoadingButton from "../components/LoadingButton.vue";
import { Roles, Gender } from "../utils/constants";
import EmployeeDetails from "./EmployeeDetails.vue";
import { initFlowbite, Modal } from "flowbite";

const employeeStore = useEmployeeStore();
const searchQuery = ref("");
const toastStore = useToastStore();
const isDrawerOpen = ref(false);
const roles = Object.values(Roles).filter((key) => isNaN(Number(key)));
const gender = Object.values(Gender).filter((key) => isNaN(Number(key)));

const employeeDetailModalRef = ref<HTMLElement | null>(null);
let modal: Modal | null = null;
const selectedEmployee = ref<Employee | null>(null);

const filteredEmployees = computed(() => {
  return genericFilter(employeeStore.getFilteredEmployees, searchQuery.value, [
    "id",
    "fullName",
    "role",
    "approvalStatus",
    "email",
    "phone",
  ]);
});

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const createEmployee = async () => {
  await employeeStore.signup();

  if (employeeStore.successMessage) {
    isDrawerOpen.value = false;
    toastStore.showToast(employeeStore.successMessage, "success");
  }

  if (employeeStore.errorMessage) {
    toastStore.showToast(employeeStore.errorMessage, "error");
  }
};

const deleteEmployee = async (id: string) => {
  confirm("Are you sure u ant to delete this employee?");
  await employeeStore.delete(id);
  if (employeeStore.successMessage) {
    employeeStore.employees = employeeStore.employees.filter(
      (employee: Employee) => employee.id !== id
    );
    employeeStore.getAll();
    toastStore.showToast(employeeStore.successMessage, "success");
  }

  if (employeeStore.errorMessage) {
    toastStore.showToast(employeeStore.errorMessage, "error");
  }
};

const showEmployeeDetails = (customer: Employee) => {
  selectedEmployee.value = { ...customer };
  modal?.show();
};

const exportToCSV = () => {
  const employees = employeeStore.employees;

  const headers = [
    "ID",
    "Full Name",
    "Phone",
    "Gender",
    "Role",
    "Email",
    "Status",
    "Created At",
    "Updated At",
  ];

  const rows = employees.map((employee) => {
    return [
      employee.id,
      employee.fullName,
      employee.phone,
      employee.gender,
      employee.role,
      employee.email,
      employee.approvalStatus,
      formatDateTime(employee.createdAt),
      formatDateTime(employee.updatedAt),
    ];
  });

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "employee.csv";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

onMounted(async () => {
  await employeeStore.getAll();
  initFlowbite();

  if (employeeDetailModalRef.value) {
    modal = new Modal(employeeDetailModalRef.value);
  }
});
</script>

<style scoped>
/* Custom table styling */
table {
  border-spacing: 0;
}
th,
td {
  text-align: left;
}
</style>
