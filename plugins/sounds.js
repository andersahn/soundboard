import SOUNDS from '../static/sounds.json';

export default ({ app }) => {
  app.store.commit('setSounds', SOUNDS);
};
