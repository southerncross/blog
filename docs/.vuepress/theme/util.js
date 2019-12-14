function getDateInfoFromPath(path = '') {
  const res = path.match(/\/(\d{4})\/(\d{2})\//);

  if (!res) {
    return null;
  } else {
    return { year: res[1], day: res[2] };
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

export {
  getDateInfoFromPath,
  getDateStringFromPath,
};