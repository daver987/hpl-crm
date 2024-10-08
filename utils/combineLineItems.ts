interface LineItem {
  label: string
  tax: number
  total: number
}

interface Trip {
  line_items_list: LineItem[]
}

interface Quote {
  trips: Trip[]
}

interface LineItem {
  label: string
  tax: number
  total: number
}

interface Trip {
  line_items_list: LineItem[]
}

interface Quote {
  trips: Trip[]
}

export function combineLineItemsTwo(quote: Quote): LineItem[] {
  const combinedItems: { [label: string]: LineItem } = {}

  for (const item of quote.trips[0].line_items_list) {
    if (!combinedItems[item.label]) {
      combinedItems[item.label] = { ...item }
    } else {
      combinedItems[item.label].total += item.total
      combinedItems[item.label].tax += item.tax
    }
  }

  if (quote.trips[1]) {
    for (const item of quote.trips[1].line_items_list) {
      if (!combinedItems[item.label]) {
        combinedItems[item.label] = { ...item }
      } else {
        combinedItems[item.label].total += item.total
        combinedItems[item.label].tax += item.tax
      }
    }
  }

  let totalAmount = 0
  let totalTax = 0
  for (const item of Object.values(combinedItems)) {
    totalAmount += item.total
    totalTax += item.tax
  }

  const result = Object.values(combinedItems)
  result.push({ label: 'HST', total: totalTax, tax: totalTax })
  result.push({ label: 'Total', total: totalAmount + totalTax, tax: 0 })

  return result
}

export function combineLineItems(lineItems: LineItem[]): LineItem[] {
  const combinedItems = lineItems.reduce<{ [label: string]: LineItem }>(
    (acc, item) => {
      acc[item.label] = acc[item.label]
        ? {
            ...item,
            total: acc[item.label].total + item.total,
            tax: acc[item.label].tax + item.tax,
          }
        : { ...item }
      return acc
    },
    {}
  )

  const totalAmount = lineItems.reduce((sum, item) => sum + item.total, 0)
  const totalTax = lineItems.reduce((sum, item) => sum + item.tax, 0)

  return [
    ...Object.values(combinedItems),
    {
      label: 'Tax',
      total: parseFloat(totalTax.toFixed(2)),
      tax: parseFloat(totalTax.toFixed(2)),
    },
    {
      label: 'Total',
      total: parseFloat((totalAmount + totalTax).toFixed(2)),
      tax: parseFloat(totalTax.toFixed(2)),
    },
  ]
}

export function combineTwoLineItems(
  lineItems1: LineItem[],
  lineItems2: LineItem[]
): LineItem[] {
  const combinedItems: { [label: string]: LineItem } = {}

  for (const item of lineItems1) {
    if (!combinedItems[item.label]) {
      combinedItems[item.label] = { ...item }
    } else {
      combinedItems[item.label].total += item.total
      combinedItems[item.label].tax += item.tax
    }
  }

  for (const item of lineItems2) {
    if (!combinedItems[item.label]) {
      combinedItems[item.label] = { ...item }
    } else {
      combinedItems[item.label].total += item.total
      combinedItems[item.label].tax += item.tax
    }
  }

  return Object.values(combinedItems)
}

export function removeLastObject(arr: any) {
  if (arr.length === 0) {
    return null
  }
  return arr.pop()
}
