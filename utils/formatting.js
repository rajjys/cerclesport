export const getHumanReadable = (dateString) => {
    const dateObj = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date =  dateObj.toLocaleDateString('fr', options);
    return date.charAt(0).toUpperCase() + date.slice(1); ///capitalize
}
export const getHumanReadableTime = ( dateString ) => {
    const date = new Date(dateString);
    const options = { hour: "numeric", minute: "numeric", hour12: false };
    return date.toLocaleTimeString("en-US", options);
}
export const getNumericDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date(); // Get today's date
    // Check if the date is today, yesterday, or tomorrow
    if (isSameDay(date, today)) {
        return "Aujourd'hui";
    } else if (isSameDay(date, new Date(today.getTime() - 24 * 60 * 60 * 1000))) {
        return "Hier";
    } else if (isSameDay(date, new Date(today.getTime() + 24 * 60 * 60 * 1000))) {
        return "Demain";
    } else {
        // For other dates, return the numeric format
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear().toString();
        return `${day}/${month}/${year}`;
    }
};

// Helper function to check if two dates are the same day
function isSameDay(date1, date2) {
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    );
}
export function resizeImage(width, height, url, resizeOption = 'scale') {
    return `https://media.graphassets.com/resize=fit:${resizeOption},height:${height},width:${width}/output=format:webp/${url.split('/').pop()}`;
  }