export interface Supplier {
  id: string;
  fullName: string;
  company: string;
  phone: string;
  address: string;
  email: string;
  password: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  fullName: string;
  phone: string;
  address: string;
  email: string;
  password: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Employee {
  id: string;
  username: string;
  fullName: string;
  gender: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  availability: string;
  approvalStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  productId: string;
  name: string;
  description: string;
  unitPrice: number;
  image: string | null;
  stock: number;
  reorderLevel: number;
  sku: string;
  createdAt: string;
  updatedAt: string;
}

interface BookingServiceAddon {
  service: string | null;
  serviceAddOn: string | null;
  quantity: number;
  subtotal: string;
}

export interface Booking {
  bookingId: string;
  customer: string;
  bookingDateTime: string;
  frequency: string;
  additionalInstructions: string | null;
  address: string | null;
  bookingServiceAddOns: BookingServiceAddon[];
  totalAmount: string;
  paid: boolean;
  bookingStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerPayment {
  paymentId: string;
  bookingId: string;
  amount: string;
  paymentMethod: string | null;
  phoneNumber: string;
  transactionCode: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface JwtPayload {
  sub?: string;
  aud?: string;
  iss?: string;
  email?: string;
  role?: string;
  exp?: number;
}

export interface ApiResponse<T> {
  status: "success" | "error";
  statusCode?: number;
  data?: T;
  message?: string;
  error?: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  timestamp: string;
  eventType: string;
  eventData: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Addon {
  id: string;
  serviceId: string;
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface BookingItem {
  service?: string;
  serviceAddOn?: string;
  quantity: number;
  subtotal: string;
}

export interface CustomerTransaction {
  paymentId: string;
  bookingId: string;
  bookingItems: BookingItem[];
  amount: string;
  paymentMethod: string;
  phoneNumber: string;
  transactionCode: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

interface BookingServiceAddon {
  service: string | null;
  serviceAddOn: string | null;
  quantity: number;
  subtotal: string;
}

export interface Booking {
  bookingId: string;
  customer: string;
  bookingDateTime: string;
  frequency: string;
  additionalInstructions: string | null;
  address: string | null;
  bookingServiceAddOns: BookingServiceAddon[];
  totalAmount: string;
  paid: boolean;
  bookingStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupplierTransaction {
  paymentId: string;
  employee: string;
  orderId: string;
  suplier: string;
  paymentDate: string;
  amount: string;
  method: string;
  paymentReference: string;
  status: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  message: string;
  bookingId: string;
  state: string;
  createdAt: string;
  updatedAt: string;
}

export interface PurchaseOrderItem {
  purchaseOrderItemId: string;
  product: string;
  quantity: number;
  unitPrice: string;
  subtotal: string;
}

export interface PurchaseOrder {
  purchaseOrderId: string;
  employee: string;
  supplier: string;
  expectedDate: string;
  items: PurchaseOrderItem[];
  totalAmount: number;
  paid: boolean;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
}

export type Message = {
  id: string;
  message: string;
  sender: string;
  receiver: string;
  timestamp: string;
};

export type MessageState = {
  loading: boolean;
  messages: Message[];
  error: string;
};

export type Chat = {
  id: string
  name: string
  role: string
  messages: Message[]
}


// Metrics
export interface BookingsMetrics {
  total: number;
  daily: number;
  weekly: number;
  monthly: number;
  yearly: number;
}

export interface PaymentsMetrics {
  customerPayments: number;
  supplierPayments: number;
  net: number;
}

export interface UserRolesMetrics {
  manager: number;
  supervisor: number;
  finance: number;
  cleaner: number;
  inventoryManager: number;
}

export interface UsersMetrics {
  employees: number;
  customers: number;
  suppliers: number;
  activeCleaners: number;
  roles: UserRolesMetrics;
}

export interface MetricsData {
  bookings: BookingsMetrics;
  payments: PaymentsMetrics;
  users: UsersMetrics;
}