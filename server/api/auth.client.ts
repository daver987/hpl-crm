import clerk from '@clerk/clerk-sdk-node'
import chalk from 'chalk'

export default defineEventHandler(async (event) => {
  const cookie = getCookie(event, '__session')
  const userList = await clerk.users.getUserList()
  console.log(chalk.bgGreenBright('[CLERK_AUTH]:user-list and cookie'), {
    userList,
    cookie,
  })
  return userList
})
