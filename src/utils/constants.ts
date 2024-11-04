export enum BookingStatus {
    PENDING,
    APPROVED,
    IN_PROGRESS,
    CANCELLED,
    COMPLETED
}

export enum Frequency {
    ONE_TIME,
    WEEKLY,
    BIWEEKLY,
    MONTHLY
}

export enum ApprovalStatus {
    PENDING, APPROVED, REJECTED
}

export enum Gender {
    MALE, FEMALE, OTHER, NOT_SPECIFIED
}

export enum Roles {
    ADMIN, MANAGER, INVENTORY, FINANCE, SUPERVISOR, CLEANER
}
export enum Availability {
    AVAILABLE, UNAVAILABLE, ON_LEAVE
}

export enum NotificationState{ READ, UNREAD }

export enum PaymentMethod {
    CASH, MOBILE, CARD
}
export enum PaymentStatus {
    PENDING, CONFIRMED, REFUNDED, CANCELLED
}

export enum OrderStatus {
    PENDING,
    REVIEWED,
    APPROVED,
    ACKNOWLEDGED,
    RECEIVED,
    COMPLETED,
    CANCELLED
}

export enum EventType {
    REGISTRATION,
    LOGIN,
    LOGOUT,
    SERVICE_ADDED_TO_CART,
    BOOKING_MADE,
    PURCHASE_ORDER_PLACED,
    BOOKING_CANCELLED,
    PAYMENT_SUCCESS,
    BOOKING_STATUS_CHANGE,
    BOOKING_ASSIGNMENT
}

