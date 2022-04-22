export const tinyPngOptions = {
  method: 'POST',
  hostname: 'tinypng.com',
  path: '/web/shrink',
  headers: {
    rejectUnauthorized: false,
    'Postman-Token': Date.now(),
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
  },
}

// 生成随机IP， 赋值给 X-Forwarded-For
export function getRandomIP() {
  return Array.from(Array(4))
    .map(() => Math.floor(Math.random() * 255))
    .join('.')
}
