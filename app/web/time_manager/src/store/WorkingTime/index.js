

export const getTime = (state) => {
    return state.workingTimes;
  };
  
  export const setWorkingTimesMutation = (state, workingTimes) => {
      state.workingTimes = workingTimes;
      };
  
  export const setWorkingTimesAction = ({ commit }, workingTimes) => {
      commit(SET_WORKINGTIMES, workingTimes);
  };
  
  export const SET_WORKINGTIMES = 'setWorkingTimes';