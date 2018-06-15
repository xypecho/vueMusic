import * as types from './mutation-types';
import {playMode} from 'common/js/config';
import {shuffle} from 'common/js/tool';
function getIndex(list, song) {
	return list.findIndex((item) => {return item.id === song.id;});
}
export const selectPlay = function ({commit, state}, {list, index}) {
	commit(types.SET_PLAYING, true)
	commit(types.SET_FULLSCREEN, true)
	if (state.mode === playMode.random) {
		let randomList = shuffle(list)
		commit(types.SET_PLAYLIST, randomList)
		index = getIndex(randomList, list[index])
	} else {
		commit(types.SET_PLAYLIST, list)
	}
	commit(types.SET_SEQUENCELIST, list)
	commit(types.SET_CURRENTINDEX, index)
}

export const randomPlay = function ({commit},{list}) {
	commit(types.SET_MODE, playMode.random)
	commit(types.SET_SEQUENCELIST, list)
	let randomList = shuffle(list)
	commit(types.SET_PLAYLIST, randomList)
	commit(types.SET_CURRENTINDEX, 0)
	commit(types.SET_PLAYING, true)
	commit(types.SET_FULLSCREEN, true)
}