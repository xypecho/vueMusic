import jsonp from 'common/js/jsonp'
import {commonParam, options} from './config'

export function getRecommend () {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParam, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}
export function getSongList () {
  const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
  const data = {
    // callback: recom36907488756300766
    g_tk: 5381,
    // jsonpCallback: recom36907488756300766
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  }
  return jsonp(url, data, options)
}
export function getTopList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  }
  return jsonp(url, data, options)
}
export function getSingerDateil (id) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const param = {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: id,
    order: 'listen',
    begin: 0,
    num: 50,
    songstatus: 1
  }
  return jsonp(url, param, options)
}
