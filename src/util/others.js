import {prependZeroIfNecessary} from './StringManager'

export function formatDate (date, format = 'dd MM yyyy') {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const day = date.getDate()
  const monthIndex = date.getMonth()
  const year = date.getFullYear()

  const formattedDate = {
    'dd MM yyyy': `${prependZeroIfNecessary(day.toString())} ${monthNames[monthIndex]} ${year}`,
    'dd/mm/yyyy': `${prependZeroIfNecessary(day.toString())}/${prependZeroIfNecessary((monthIndex + 1).toString())}/${year}`,
    'dd-mm-yyyy': `${prependZeroIfNecessary(day.toString())}-${prependZeroIfNecessary((monthIndex + 1).toString())}-${year}`,
    'yyyy-mm-dd': `${year}-${prependZeroIfNecessary((monthIndex + 1).toString())}-${prependZeroIfNecessary(day.toString())}`
  }
  return formattedDate[format]
}
