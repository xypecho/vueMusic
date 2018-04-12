import {playMode} from 'common/js/config';
const state = {
	singer: {},
	playing: false, //歌曲是否在播放
	fullScreen: false,//歌曲是否全屏播放
	playList: [],//播放的歌单(可能是随机)
	sequenceList: [],//顺序的歌单
	mode: playMode.sequence,//歌单的播放模式
	currentIndex: -1 //当前播放的歌曲的索引
}

export default state;