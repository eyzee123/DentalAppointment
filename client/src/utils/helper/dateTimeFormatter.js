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

