import { defineStore } from 'pinia'
import {post, get, del, patch, put} from '../boot'
import { ApiResponse, Employee } from '../models/constants'
import { Gender, Roles } from '../utils/constants'

export const useEmployeeStore = defineStore('employee', {
    state: () => ({
        employee: {} as Employee,
        employees: [] as Employee[],
        errorMessage: '',
        successMessage: '',
        employeeData: {
            firstName: '',
            lastName: '',
            gender: Gender.NOT_SPECIFIED as Gender,
            email: '',
            password: '',
            phone: '',
            role: Roles.CLEANER as Roles,
        },
        employeeLoginData: {
            email: '',
            password: ''
        }
    }),
    actions: {
        updateNewStatus(newRole: Roles) {
            this.employeeData.role = newRole
        },

        async signup() {
            try {
                const res = await post<ApiResponse<Employee>>('/employee/auth/sign_up', this.employeeData)
                if (res.data.status === 'success') {
                    if (res.data.data) {
                        this.employee = res.data.data
                        this.successMessage = res.data.message as string
                       this.getAll()
                    }
                }
                if (res.data.status === 'error') {
                        throw new Error(res.data.error)
                }
            } catch (error) {
                this.errorMessage = String(error)
            }
        },

        async signin() {
            try {
                const res = await post<ApiResponse<String>>('/employee/auth/sign_in', this.employeeLoginData)
                if (res.data.status === 'success') {
                    if (res.data.data) {
                        this.successMessage = res.data.message as string
                        localStorage.setItem('token', String(res.data.data))
                    }
                }
                if (res.data.status === 'error') {
                    throw new Error(res.data.error)
                }
            } catch (error) {
                this.errorMessage = String(error)
            }
        },

        async signout() {
            localStorage.removeItem('token')
        },

        async getAll() {
            try {
                const res = await get<ApiResponse<Employee[]>>('/employee')
                if (res.data.status === 'success') {
                    if (res.data.data) {
                        this.employees = res.data.data
                    }
                }
            } catch (error) {
                this.errorMessage = String(error)
            }
        },
        
        async getOne(id: string) { 
            try {
                const res = await get<ApiResponse<Employee>>(`/employee/${id}`)
                if (res.data.status === 'success') {
                    if (res.data.data) {
                        this.employee = res.data.data
                    }
                }
                if (res.data.status === 'error') {
                    throw new Error(res.data.error)
                }
            } catch (error) {
                if (error instanceof Error) {
                    this.errorMessage = error.message
                } else {
                    this.errorMessage = String(error)
                }
            }
        },

        async update(id: string) {
            try {
                const res = await put<ApiResponse<null>>(`/employee/${id}`, this.employeeData)
                if (res.data.status === 'success') {
                    this.successMessage = res.data.message as string
                    this.getOne(id)
                }
                if (res.data.status === 'error') {
                    throw new Error(res.data.error)
                }
            } catch (error) {
                this.errorMessage = String(error)
            }
        },

        async updateStatus(id: string, status: string) {
            try {
                const res = await patch<ApiResponse<null>>(`/employee/${id}/status`, { status })
                if (res.data.status === 'success') {
                    this.successMessage = res.data.message as string
                    this.getOne(id)
                }
                if (res.data.status === 'error') {
                    throw new Error(res.data.error)
                }
            } catch (error) {
                this.errorMessage = String(error)
            }
        },

        async delete(id: string) {
            try {
                const res = await del<ApiResponse<null>>(`/employee/${id}`)
                if (res.data.status === 'success') {
                    this.successMessage = res.data.message as string
                    this.getAll()
                }
                if (res.data.status === 'error') {
                    throw new Error(res.data.error)
                }
            } catch (error) {
                this.errorMessage = String(error)
            }
        }
    }
})