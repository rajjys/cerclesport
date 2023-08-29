function toHumanReadable(dateString){
    const dateObj = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date =  dateObj.toLocaleDateString('fr', options);
    return date.charAt(0).toUpperCase() + date.slice(1); ///capitalize
}

export default toHumanReadable;