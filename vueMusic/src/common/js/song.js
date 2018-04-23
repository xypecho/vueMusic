export default class Song{
	constructor({ id, mid, singer, name, album, duration, image, url }){
    this.id =id;
    this.mid =mid;
    this.singer =singer;
    this.name =name;
    this.album =album;
    this.duration =duration;
    this.image =image;
    this.url =url;
  }
}

export function formatterSong(data){
  return new Song({
    id :data.songid,
    mid :data.songmid,
    singer :formatterSinger(data.singer),
    name :data.songname,
    album :data.albumname,
    duration :data.interval,
    image :`https://y.gtimg.cn/music/photo_new/T002R300x300M000${data.albummid}.jpg?max_age=2592000`,
    url:`http://dl.stream.qqmusic.qq.com/C400${data.songmid}.m4a?vkey=87A45A439867CBBD8345BE04C970599CF499C11635198219CE48A072174890C6AB33135D52F0F070CB1D6199B629FEAC10E8809DAD7EBBF7&guid=3655047200&fromtag=66`
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