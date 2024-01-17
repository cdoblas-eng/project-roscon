export function getCurrentDateTime(): string {
    const currentDate = new Date();
  
    // Get the date components
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months in JavaScript are zero-based, so we add 1 to get the correct month number
    const year = currentDate.getFullYear();
  
    // Get the time components
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
  
    // Build the string in the desired format
    const formattedDateTime = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
    return formattedDateTime;
  }
  
  // Example usage
  const currentDateTime = getCurrentDateTime();
  console.log('Current date and time:', currentDateTime);
  