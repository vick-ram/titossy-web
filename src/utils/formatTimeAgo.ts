export function formatTimeAgo(date: string | Date): string {
    const now = new Date()
    const then = new Date(date)

    const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30.44);
    const diffInYears = Math.floor(diffInMonths / 12);

    if (diffInSeconds < 60) {
        if (diffInSeconds === 1) {
            return 'a second ago';
        } else {
            return `${diffInSeconds} seconds ago`;
        }
    } else if (diffInMinutes < 60) {
        if (diffInMinutes === 1) {
      return 'a minute ago';
    } else {
      return `${diffInMinutes} minutes ago`;
    }
  } else if (diffInHours < 24) {
    if (diffInHours === 1) {
      return 'an hour ago';
    } else {
      return `${diffInHours} hours ago`;
    }
  } else if (diffInDays < 30) {
    if (diffInDays === 1) {
      return 'yesterday';
    } else {
      return `${diffInDays} days ago`;
    }
  } else if (diffInMonths < 12) {
    if (diffInMonths === 1) {
      return 'a month ago';
    } else {
      return `${diffInMonths} months ago`;
    }
  } else {
    if (diffInYears === 1) {
      return 'a year ago';
    } else {
      return `${diffInYears} years ago`;
    }
    }
};