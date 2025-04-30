export const formatDate = (rawDate) => {
    const dateObj = new Date(rawDate);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        });
    return formattedDate
}

export const formatTime = (timeStr) => {
    const [hour, minute] = timeStr.split(':');
    const hourNum = parseInt(hour, 10);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${period}`;
}

export const formatDateToPicker = (date) => {
    const newDate = new Date(date);
    const yyyy = newDate.getFullYear();
    const mm = String(newDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const dd = String(newDate.getDate()).padStart(2, '0');
    const formatted = `${yyyy}-${mm}-${dd}`
    return formatted;
}
