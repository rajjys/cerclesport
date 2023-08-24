function toLocalString(dateString){
    const dateObj = new Date(dateString);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString('fr', options);
}

export default toLocalString;