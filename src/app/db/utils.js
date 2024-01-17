"use strict";
exports.__esModule = true;
exports.getCurrentDateTime = void 0;
function getCurrentDateTime() {
    var currentDate = new Date();
    // Get the date components
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Months in JavaScript are zero-based, so we add 1 to get the correct month number
    var year = currentDate.getFullYear();
    // Get the time components
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    // Build the string in the desired format
    var formattedDateTime = "".concat(day.toString().padStart(2, '0'), "/").concat(month.toString().padStart(2, '0'), "/").concat(year, " ").concat(hours.toString().padStart(2, '0'), ":").concat(minutes.toString().padStart(2, '0'), ":").concat(seconds.toString().padStart(2, '0'));
    return formattedDateTime;
}
exports.getCurrentDateTime = getCurrentDateTime;
// Example usage
var currentDateTime = getCurrentDateTime();
console.log('Current date and time:', currentDateTime);
