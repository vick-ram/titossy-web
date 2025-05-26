export function formatDateTime(
    dateTimeStr: string
): string {
    const date = new Date(dateTimeStr)

    const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

    return date.toLocaleString('en-US', options).toUpperCase()
}

export function formatDate(
    dateStr: string
): string {
    const date = new Date(dateStr)

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    return date.toLocaleDateString('en-US', options).toUpperCase()
}