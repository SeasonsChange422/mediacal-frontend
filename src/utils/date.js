export function parseDate2String (value) {
    const year = value.getFullYear()
    const month = String(value.getMonth() + 1).padStart(2, '0')
    const day = String(value.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}
export function parseString2Date (dateString) {
    const parts = dateString.split(/[T.:+-]/); // 使用正则表达式分割日期字符串
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // 月份是从0开始的，所以要减1
    const day = parseInt(parts[2]);

    return new Date(year, month, day); // 使用UTC时间创建Date对象
}
export function parseString2Time (dateString) {
    const parts = dateString.split(/[T.:+-]/); // 使用正则表达式分割日期字符串
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // 月份是从0开始的，所以要减1
    const day = parseInt(parts[2]);
    const hour = parseInt(parts[3]);
    const minute = parseInt(parts[4]);
    const second = parseInt(parts[5]);
    return new Date(year, month, day, hour, minute, second); // 使用UTC时间创建Date对象
}
export function parseTime2String (value) {
    const year = value.getFullYear()
    const month = String(value.getMonth() + 1).padStart(2, '0')
    const day = String(value.getDate()).padStart(2, '0')
    const hours = String(value.getHours()).padStart(2, '0')
    const minutes = String(value.getMinutes()).padStart(2, '0')
    const seconds = String(value.getSeconds()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
