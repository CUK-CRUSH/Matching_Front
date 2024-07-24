const FormatTimeAgo = (date? : string) : string => {
  
  // 날짜까 없으면 빈칸 리턴
  if(!date) return '';

  const currentDate = new Date();
  const targetDate = new Date(String(date));

  const timeDiff = currentDate.getTime() - targetDate.getTime();

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 60) {
    return `${minutes} 분전`;
  } else if (hours < 24) {
    return `${hours} 시간전`;
  } else if (days < 15) {
    return `${days} 일전`;
  } else {
    return targetDate.toISOString().slice(0, 19).replace('T', ' ');
  }
}

export default FormatTimeAgo