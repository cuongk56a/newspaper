import moment from "moment"

export const formatDateValue = (date: string) =>{
  return moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD')
}

export const formatDate = (date: string) =>{
  return moment(date, 'YYYY-MM-DD').format('DD-MM-YYYY')
}