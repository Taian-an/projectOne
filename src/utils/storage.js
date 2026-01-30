export function getTransactions() {
  const data = localStorage.getItem("transactions")
  return data ? JSON.parse(data) : []
}

export function saveTransaction(transaction) {
  const old = getTransactions()
  localStorage.setItem(
    "transactions",
    JSON.stringify([...old, transaction])
  )
}
