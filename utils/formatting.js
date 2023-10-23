export const toHumanReadable = (dateString) => {
    const dateObj = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date =  dateObj.toLocaleDateString('fr', options);
    return date.charAt(0).toUpperCase() + date.slice(1); ///capitalize
}
export const toHumanReadableTime = ( dateString ) => {
    const date = new Date(dateString);
    const options = { hour: "numeric", minute: "numeric", hour12: false };
    return date.toLocaleTimeString("en-US", options);
}
export const formatMultiple = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: 'long', year: '2-digit', month: 'long', day: 'numeric' };
    const formatter = new Intl.DateTimeFormat('fr-FR', options);
    const formattedDate = formatter.format(date);
    const formattedTime = date.toLocaleTimeString('fr-FR');
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString();
    const numericDate = `${day}/${month}/${year}`;
    return [numericDate, formattedDate, formattedTime];
}
export function resizeImage(width, height, url, resizeOption = 'scale') {
    return `https://media.graphassets.com/resize=fit:${resizeOption},height:${height},width:${width}/${url.split('/').pop()}`;
  }