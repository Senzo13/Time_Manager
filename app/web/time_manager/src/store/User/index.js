export const getCurrentUser = (state) => {
    return state.user;
};

export const isLogged = (state) => {
    return state.jwt.token !== null;
};

export const setCurrentUserMutation = (state, user) => {
    state.user = user;
};

export const setCurrentUserAction = ({ commit }, user) => {
    commit(SET_CURRENT_USER, user);
};

export const SET_CURRENT_USER = 'setCurrentUser';