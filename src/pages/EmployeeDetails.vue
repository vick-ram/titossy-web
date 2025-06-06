<template>
  <div v-if="employee" class="employee-details-card">
    <div class="header">
      <h2>{{ employee.fullName }}</h2>
      <span :class="roleClass">{{ employee.role }}</span>
    </div>
    <!-- <pre>{{ employee.role }}</pre> -->
    <div class="info-grid">
      <div>
        <label>Username:</label>
        <span>{{ employee.username }}</span>
      </div>
      <div>
        <label>Email:</label>
        <span>{{ employee.email }}</span>
      </div>
      <div>
        <label>Phone:</label>
        <span>{{ employee.phone }}</span>
      </div>
      <div>
        <label>Gender:</label>
        <span>{{ employee.gender }}</span>
      </div>
      <div>
        <label>Availability:</label>
        <span :class="availabilityClass">{{ employee.availability }}</span>
      </div>
      <div>
        <label>Approval Status:</label>
        <span :class="approvalClass">{{ employee.approvalStatus }}</span>
      </div>
      <div>
        <label>Created At:</label>
        <span>{{ formatDate(employee.createdAt) }}</span>
      </div>
      <div>
        <label>Updated At:</label>
        <span>{{ formatDate(employee.updatedAt) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Employee } from "../models/constants";
import { formatDate } from "../utils/dateFormatter";

const props = defineProps<{
  employee: Employee;
}>();

const roleClass = computed(() => `role-${props.employee.role.toLowerCase()}`);
const approvalClass = computed(() => ({
  approved: props.employee.approvalStatus === "Approved",
  pending: props.employee.approvalStatus === "Pending",
  rejected: props.employee.approvalStatus === "Rejected",
}));

const availabilityClass = computed(() => ({
  available: props.employee.availability === "Available",
  unavailable: props.employee.availability === "Unavailable",
}));
</script>

<style scoped>
.employee-details-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  max-width: 480px;
  margin: auto;
}
.header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 1.5rem;
}
.header h2 {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
}
.role {
  display: inline-block;
  padding: 0.3em 1em;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1rem;
  color: #fff;
}
.role-admin {
  background: #d7263d;
}
.role-manager {
  background: #1b98e0;
}
.role-employee {
  background: #16c172;
}
.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem 2rem;
}
label {
  font-weight: 600;
  color: #888;
  font-size: 0.95rem;
}
span {
  display: block;
  font-size: 1.08rem;
  margin-top: 0.2em;
}
.approved {
  color: #16c172;
  font-weight: bold;
}
.pending {
  color: #f7b801;
  font-weight: bold;
}
.rejected {
  color: #d7263d;
  font-weight: bold;
}
.available {
  color: #16c172;
  font-weight: bold;
}
.unavailable {
  color: #d7263d;
  font-weight: bold;
}
</style>
