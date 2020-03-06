const fs = require('fs');
const path = require('path');

function determinMIME(pathname) {
  try {
    const ext = pathname.match(/\.([^\.]+)$/)[1].toLowerCase();
    switch (ext) {
      case 'html':
        return 'text/html; charset=utf8';
      case 'js':
        return 'text/javascript; charset=utf8';
      case 'css':
        return 'text/css; charset=utf8';
      case 'png':
        return 'image/png';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      default:
        return 'text/plain';
    }
  } catch (e) {
    return 'text/plain';
  }
}

function getFileInfo(filepath) {
  const fileInfo = {
    mime: determinMIME(filepath),
    content: '',
    isBase64Encoded: false,
  }

  if (/html|javascript|css/.test(fileInfo.mime)) {
    fileInfo.content = fs.readFileSync(filepath, { encoding: 'utf8' });
    fileInfo.isBase64Encoded = false;
  } else if (/png|jpg|jpeg/.test(fileInfo.mime)) {
    fileInfo.content = fs.readFileSync(filepath).toString('base64');
    fileInfo.isBase64Encoded = true;
  }

  return fileInfo;
}

exports.main = async (event) => {
  const result = {
    isBase64Encoded: false,
    headers: { 'X-Content-Type-Options': 'nosniff' },
    body: '',
  };

  try {
    // 腾讯云的path是environment之后的部分，比如test环境，url是test/function/blablabla，event.path就是function/blablabla
    const relativePath = event.path
      .split('/')
      .slice(1)
      .join('/');
    const absolutePath = path.resolve(__dirname, relativePath);

    let filepath = '';
    if (relativePath === '') {
      filepath = path.join(absolutePath, 'index.html');
    } else if (fs.existsSync(absolutePath)) {
      filepath = absolutePath;
    } else {
      filepath = path.join(absolutePath, '404.html');
    }

    const { mime, content, isBase64Encoded } = getFileInfo(filepath);
    result.body = content;
    result.isBase64Encoded = isBase64Encoded;
    result.headers['Content-Type'] = mime;
    result.statusCode = 200;
  } catch (e) {
    console.log(e);
    result.body = 'ERROR';
    result.statusCode = 500;
    result.headers['Content-Type'] = 'text/plain';
  }

  return result;
};
