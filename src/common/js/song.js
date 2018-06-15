import jsonp from 'common/js/jsonp';
import {getLyrics} from 'src/api/lyrics';
import {Base64} from 'js-base64';
export default class Song{
  constructor({ id, mid, singer, name, album, duration, image, url, lyric }){
    this.id =id;
    this.mid =mid;
    this.singer =singer;
    this.name =name;
    this.album =album;
    this.duration =duration;
    this.image =image;
    this.url =url;
  }

  receiveLyric(){
    getLyrics(this.mid).then((res) => {
      this.lyric = Base64.decode(res.lyric);
    });
  }
}

export async function formatterSong(data){
  return new Song({
    id :data.songid,
    mid :data.songmid,
    singer :formatterSinger(data.singer),
    name :data.songname,
    album :data.albumname,
    duration :data.interval,
    image :`https://y.gtimg.cn/music/photo_new/T002R300x300M000${data.albummid}.jpg?max_age=2592000`,
    url:await getSongURL(data.songmid)
  })
}


function formatterSinger(singer){
  if (!singer) {
    return '';
  }else{
    const arr =[];
    singer.forEach((item) => {
      arr.push(item.name);
    })
    return arr.join('/');
  }
}

function getSongVKey(songMid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg';
  const data = {
    format: "jsonp",
    inCharset: "utf-8",
    outCharset: "utf-8",
    notice: 0,
    g_tk: 1278911659,
    hostUin: 0,
    platform: "yqq",
    needNewCode: 0,
    cid: 205361747,
    uin: 0,
    songmid: songMid,
    filename: `C400${songMid}.m4a`,
    guid: 3655047200
  };
  const option = {
    param: "callback",
    prefix: "callback"
  };
  return jsonp(url, data, option);
}

function getSongURL(songMid){
  return getSongVKey(songMid).then((data) => {
    return `http://dl.stream.qqmusic.qq.com/C400${songMid}.m4a?vkey=${data.data.items[0].vkey}&guid=3655047200&fromtag=66`;
  });
}
