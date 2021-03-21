export default function formatDate(dateValue){
    return `${dateValue.getFullYear()}-${(dateValue.getMonth()+1)<10?'0'+(dateValue.getMonth()+1):dateValue.getMonth()+1}-${dateValue.getDate()}`
}