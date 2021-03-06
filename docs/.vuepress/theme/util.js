function getDateInfoFromPath(path = '') {
  const res = path.match(/\/(\d{4})\/(\d{2})\//);

  if (!res) {
    return null;
  } else {
    return { year: Number(res[1]), day: Number(res[2]) };
  }
}

function getDateStringFromPath(path = '') {
  const dateInfo = getDateInfoFromPath(path);
  if (dateInfo) {
    return dateInfo.year + '/' + dateInfo.day;
  } else {
    return 'N/A';
  }
}

function getPostDateString(str) {
  const date = new Date(str);
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/');
}

export {
  getDateInfoFromPath,
  getDateStringFromPath,
  getPostDateString,
};