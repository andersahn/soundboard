import Vuex from 'vuex';

const createStore = () => {
	return new Vuex.Store({
		state: {
			sounds: [],
		},
		mutations: {
			setSounds(state, sounds) {
				state.sounds = sounds;
			},
		},
		actions: {
			// nuxtServerInit({ commit, state }) {
			// },
		},
	});
};

export default createStore;
