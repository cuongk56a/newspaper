import moment from 'moment';

export const timeAgo = (fromDate: string) => {
  const now = moment();
  const duration = moment.duration(now.diff(fromDate));

  const seconds = Math.floor(duration.asSeconds());
  const minutes = Math.floor(duration.asMinutes());
  const hours = Math.floor(duration.asHours());
  const days = Math.floor(duration.asDays());
  const months = Math.floor(duration.asMonths());
  const years = Math.floor(duration.asYears());

  if (seconds < 60) {
    return `${seconds} giây trước`;
  } else if (minutes < 60) {
    return `${minutes} phút trước`;
  } else if (hours < 24) {
    return `${hours} giờ trước`;
  } else if (days < 30) {
    return `${days} ngày trước`;
  } else if (months < 12) {
    return `${months} tháng trước`;
  } else {
    return `${years} năm trước`;
  }
}

export const formmatPublishTime = (fromDate: string | Date | undefined) => {
  if(!fromDate) return null;
  const data = moment(fromDate).format('HH:mm DD/MM/YYYY')
  return data;
}

