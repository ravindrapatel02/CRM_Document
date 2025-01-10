export const OnlyDateFormate = (dateString) => {

    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date)) {
        console.log("Invalid date");
    } else {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
        const year = String(date.getFullYear()); // get last 2 digits of the year

        // Format to DD-MM-YY
        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
    }
    if (dateString === null) {
        return "";
    }
}

export const DateTimeFormate = (dateString) => {

    const date = new Date(dateString);

    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,  // 24-hour format
        timeZone: 'Asia/Kolkata'  // IST time zone
    };
    const formattedDate = date.toLocaleString('en-IN', options);

    return formattedDate;

}