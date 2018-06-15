import axios from 'axios';
export function getLyrics(mid) {
  const url = '/api/lyric';
  const param = {
    g_tk: 1928093487,
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    format: 'json',
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date()
  };
  return axios.get(url, {
    params:param
  }).then((res) => {
  return Promise.resolve(res.data);
})
}