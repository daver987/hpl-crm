import { acceptHMRUpdate, defineStore } from 'pinia'

export const useQuoteStore = defineStore({
  id: 'quoteStore',

  state: () => ({
    quote: {},
    quotes: [],
    quotesAll: 0,
    quotesDay: 0,
  }),

  actions: {
    setQuote(items: any) {
      this.quote = items.quote
      console.log('Set Quote Fired')
    },
    setQuotes(items: any) {
      this.quotes = items.quote
      console.log('Set Quotes Fired')
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuoteStore, import.meta.hot))
}
