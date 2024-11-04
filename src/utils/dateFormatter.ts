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