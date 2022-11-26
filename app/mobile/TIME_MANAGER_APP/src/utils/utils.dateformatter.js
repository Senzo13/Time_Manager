export default {
  formatDate(date) {
    return `${addZero(date.getFullYear())}-${addZero(
      date.getMonth() + 1
    )}-${addZero(date.getDate())}T${addZero(date.getHours())}:${addZero(
      date.getMinutes()
    )}:${addZero(date.getSeconds())}Z`;
  },
};
function addZero(date) {
  return date < 10 ? `0${date}` : date;
}