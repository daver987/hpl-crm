type AnyObject = Record<string, unknown>

export const toSnakeCase = <T extends AnyObject>(data: T[]): T[] => {
  const toSnakeCaseRecursive = (value: any): any => {
    if (value === null || value === undefined) {
      return value
    }
    if (typeof value === 'object' && !Array.isArray(value)) {
      return toSnakeCase(
        Object.entries(value).reduce((acc: AnyObject[], [key, val]) => {
          //@ts-ignore
          acc[snakeCase(key)] = toSnakeCaseRecursive(val)
          return acc
        }, {} as AnyObject[])
      )
    }
    if (Array.isArray(value)) {
      return value.map(toSnakeCaseRecursive)
    }
    return value
  }

  const snakeCase = (str: string): string => {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
  }

  return data.map((obj) => {
    const newObj = {} as AnyObject
    Object.entries(obj).forEach(([key, value]) => {
      newObj[snakeCase(key)] = toSnakeCaseRecursive(value)
    })
    return newObj as T
  })
}

// const formattedUsers = toSnakeCase({})
// const formatPhoneInt = (phoneNumber: string) => {
//   const phone = parsePhoneNumber(phoneNumber, 'CA')
//   return phone?.formatInternational()
// }
// const formatPhoneCountry = (phoneNumber: string) => {
//   const phone = parsePhoneNumber(phoneNumber, 'CA')
//   return phone?.country
// }

// const modifiedPeople = formattedUsers.map(
//   ({
//     first_name,
//     last_name,
//     email_address,
//     is_customer,
//     phone_number,
//     ...item
//   }) => ({
//     ...item,
//     first_name: _.capitalize(first_name),
//     last_name: _.capitalize(last_name),
//     full_name: `${_.capitalize(first_name)} ${_.capitalize(last_name)}`,
//     email_address: _.trim(_.toLower(email_address)),
//     is_customer: !!item.stripe_customer_id,
//     phone_number: formatPhoneInt(phone_number),
//     phone_number_country: formatPhoneCountry(phone_number),
//     meta_data: [],
//   })
// )

// console.log('Users:', modifiedPeople)
// const sendUsersToDb = async () => {
//   const response = await $fetch('/api/user', {
//     method: 'POST',
//     body: modifiedPeople,
//   })
//   console.log('Users Submitted:', response)
// }
