import baseX from 'base-x'

// Use the base58 character set for encoding
const BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
const bs58 = baseX(BASE58)

export function uuidToAccountNumber(uuid: string) {
  // Remove dashes from the UUID
  const strippedUuid = uuid.replace(/-/g, '')

  // Convert the UUID from a hexadecimal string to a buffer
  const buffer = Buffer.from(strippedUuid, 'hex')

  // Encode the buffer using base58
  const encoded = bs58.encode(buffer)

  // Truncate the encoded string to a desired length for the account number
  const accountNumber = encoded.slice(0, 10)

  console.log('UUID Account Number:', accountNumber)

  return accountNumber
}

const uuid = '550e8400-e29b-41d4-a716-446655440000'
const accountNumber = uuidToAccountNumber(uuid)

console.log('Account number:', accountNumber)
