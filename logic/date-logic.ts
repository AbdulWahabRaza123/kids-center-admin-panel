export function iSOFormattedDate(dateString: string) {
    const date = new Date(dateString);

    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getUTCFullYear();

    // Get the ordinal suffix for the day
    const ordinalSuffix = (n: number) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return (s[(v - 20) % 10] || s[v] || s[0]);
    };

    return `${day}${ordinalSuffix(day)} ${month} ${year}`;
}
export function removeSeconds(timeString: string) {
    if (!timeString) return null;

    // Split the time string by colon
    const timeParts = timeString.split(':');

    if (timeParts.length < 2) {
        return null; // Invalid time format
    }

    // Return the time in HH:MM format
    return `${timeParts[0]}:${timeParts[1]}`;
}