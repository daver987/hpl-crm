let auth = null
let lastUpdated = null

export function setToken(token: string) {
  auth = token
  lastUpdated = new Date()
}

export function getToken() {
  return auth
}

export function getLastUpdated() {
  return lastUpdated
}
