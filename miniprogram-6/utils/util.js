const formatMonth = date => {
  const month = date.getMonth() + 1
  return month
}
const formatDay = date => {
  const day = date.getDate()
  return day
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatMonth: formatMonth,
  formatDay: formatDay
}
