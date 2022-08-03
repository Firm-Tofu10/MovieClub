module.exports = {
  format_date: (date) => {
    let newDate = new Date(date)
    // Format date as MM/DD/YYYY
    return newDate.toLocaleDateString();
  }
};