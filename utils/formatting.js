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
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString();
    const numericDate = `${day}/${month}/${year}`;
    return numericDate;
}
export function resizeImage(width, height, url, resizeOption = 'scale') {
    return `https://media.graphassets.com/resize=fit:${resizeOption},height:${height},width:${width}/output=format:webp/${url.split('/').pop()}`;
  }