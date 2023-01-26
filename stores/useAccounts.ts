// noinspection ES6PreferShortImport

import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAccounts = defineStore({
  id: 'accounts',
  state: () => ({
    isOpen: false,
    rows: [],
    accountIsCorporate: true,
    selectedAccountType: 'corporate',
    combinedContactAccountNumber: null,
    companyName: '',
    companyAddress: '',
    companyPhone: '',
    companyEmail: '',
    companyNotes: '',
    companyPaymentMethod: '',
    companyPaymentTerms: '',
    companyPaymentInfo: '',
    companyAccountNumber: null,

    individualPrefix: '',
    individualFirstName: '',
    individualLastName: '',
    individualAddress: '',
    individualEmail: '',
    individualPhone: '',
    individualNotes: '',
    individualCompanyName: '',

    selectedContactType: [],
    selectedContactNamePrefix: '',
    contactFirstName: '',
    contactLastName: '',
    contactPhone: '',
    contactEmail: '',
    contactNotes: '',
    contactPaymentMethod: '',
    contactPaymentTerms: '',
    contactPaymentInfo: '',
    contactAddFinancialDetails: false,
    billingContact: '',
    accountInfo: {},
    contactInfo: {},
    loading: false,
    user: null,
  }),
  actions: {
    // openAddAccountModal() {
    //   this.isOpen = true
    // },

    // async incrementAccountNumber() {
    //   const { data } = await supabase.rpc('increment_account_number')
    //   this.companyAccountNumber = data
    //   console.log(data)
    // },

    // async saveAccount() {
    //   const { id } = supabase.auth.user()
    //   this.accountInfo = {
    //     user_id: id,
    //     company_account_number: this.companyAccountNumber++,
    //     company_account_type: this.selectedAccountType,
    //     company_name: this.companyName,
    //     company_address: this.companyAddress,
    //     company_phone: this.companyPhone,
    //     company_email: this.companyEmail,
    //     company_notes: this.companyNotes,
    //     company_payment_method: this.companyPaymentMethod,
    //     company_payment_terms: this.companyPaymentTerms,
    //     contact_account_number: 10,
    //   }
    //   if (this.accountIsCorporate) {
    //     const { error } = await supabase
    //       .from('accounts')
    //       .insert([this.accountInfo])
    //     await this.incrementAccountNumber()
    //     await this.getRows()
    //     console.error(error)
    //   }
    // },

    // async getRows() {
    //   try {
    //     this.loading = true
    //     this.user = supabase.auth.user()
    //     const { data, error, status } = await supabase
    //       .from('accounts')
    //       .select(
    //         'id, company_name, company_address, company_phone, company_email, company_account_number'
    //       )
    //       .eq('user_id', this.user.id)
    //
    //     if (error && status !== 406) {
    //       console.log(error)
    //       return
    //     }
    //
    //     if (data) {
    //       this.rows = data
    //       console.log(this.rows)
    //     }
    //   } catch (error) {
    //     alert(error.message)
    //   } finally {
    //     this.loading = false
    //   }
    // },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAccounts, import.meta.hot))
}
