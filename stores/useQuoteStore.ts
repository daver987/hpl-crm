import { acceptHMRUpdate, defineStore } from 'pinia'
import { format, isEqual } from 'date-fns'

export const useQuoteStore = defineStore('useQuoteStore', {
  state: () => {
    return {
      loading: false,
      quotes: null,
      quoteCount: null,
      quoteCountToday: null,
      orderCount: null,
      ordersArray: null,
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
    async getQuoteCount() {
      try {
        await this.getQuotes()
        //@ts-ignore
        this.quoteCount = this?.quotes?.length
        //@ts-ignore
        this.quoteCountToday = this?.quotes?.filter((item: any) =>
          isEqual(
            new Date(format(new Date(item.updatedAt), 'yyyy-MM-dd')),
            new Date(format(new Date(), 'yyyy-MM-dd'))
          )
        ).length
        //@ts-ignore
        this.ordersArray = this.quotes?.filter(
          (item: any) => item.isBooked === true
        )
        //@ts-ignore
        this.orderCount = this?.ordersArray?.reduce(
          (sum: any, trip: any) => sum + trip.roundTripTotal,
          0
        )
        console.log('Quote Count:', this.quoteCount)
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
    async getQuoteCountToday() {
      try {
        this.quoteCountToday = await $fetch('/api/quote-count-24')
        console.log('Quote Count Today:', this.quoteCountToday)
      } catch (error) {
        alert(error)
      }
    },
    getters: {},
  },
})

if (import.meta.hot) {
  // @ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(useQuoteStore, import.meta.hot))
}
