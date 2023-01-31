import { defineStore, acceptHMRUpdate } from 'pinia'

export const useQuoteStore = defineStore('useQuoteStore', {
  state: () => {
    return {
      loading: false,
      quotes: null,
    }
  },
  actions: {
    async getQuotes() {
      try {
        const data = await $fetch('/api/get-quotes')
        this.loading = true
        this.quotes = data
        console.log('Quotes:', this.quotes)
        this.loading = false
      } catch (error) {
        alert(error)
      }
    },
    async deleteQuote(id: string) {
      try {
        await $fetch('/api/delete-quote', {
          method: 'POST',
          body: JSON.stringify({ id }),
        })
        //@ts-ignore
        this.quotes = this.quotes?.filter((quote: any) => quote.id !== id)
      } catch (error) {
        alert(error)
      }
    },
    async bookOrder(row: any) {
      try {
        await $fetch('/api/book-order', {
          method: 'POST',
          body: JSON.stringify({ row }),
        })
        await this.getQuotes()
      } catch (error) {
        alert(error)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuoteStore, import.meta.hot))
}
