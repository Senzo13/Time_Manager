export const getToken = (state) => {
  return state.jwt.token;
};

export const setTokenMutation = (state, token) => {
  state.jwt.token = token;
};

export const setTokenAction = ({ commit }, token) => {
  commit(SET_TOKEN, token);
}

export const SET_TOKEN = 'setToken';

