interface Subscription {
  id: number
  monthlySubInCents: number
}

interface User {
  id: number
  activatedOn: Date
  deactivatedOn: Date | null
}

function calculateInvoice (monthYear: string, sub: Subscription | null, users: User[]): number {
  if (sub === null) {
    return 0
  }

  const billingMonthDate: Date = new Date(monthYear + '-01')
  let monthlyTotal: number = 0

  users.forEach((user) => {
    monthlyTotal += getSubForUser(billingMonthDate, sub, user)
  })

  return monthlyTotal
}

function getSubForUser (billingMonthDate: Date, sub: Subscription, user: User): number {
  const firstDayOfBillingMonth = billingMonthDate
  const lastDayOfBillingMonth = getLastDay(billingMonthDate)
  const totalDaysInMonth = lastDayOfBillingMonth.getDate()

  if (user.activatedOn > lastDayOfBillingMonth) {
    return 0
  }

  if (user.deactivatedOn !== null && user.deactivatedOn < firstDayOfBillingMonth) {
    return 0
  }

  let firstBillingDate: Date
  let lastBillingDate: Date

  if (user.activatedOn < firstDayOfBillingMonth) {
    firstBillingDate = firstDayOfBillingMonth
  } else {
    firstBillingDate = user.activatedOn
  }

  if ((user.deactivatedOn === null) || user.deactivatedOn > lastDayOfBillingMonth) {
    lastBillingDate = lastDayOfBillingMonth
  } else {
    lastBillingDate = user.deactivatedOn
  }

  const subbedDays = lastBillingDate.getDate() - firstBillingDate.getDate() + 1

  return Math.round((subbedDays / totalDaysInMonth) * sub.monthlySubInCents)
}

function getLastDay (date: Date): Date {
  const nextMonth = date.getMonth() + 1
  const newDate = new Date(date.getFullYear(), nextMonth, 0)

  return newDate
}

export { calculateInvoice }
