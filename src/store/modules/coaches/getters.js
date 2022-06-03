export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some((coach) => coach.id === userId);
  },
  shouldUpdate(state) {
    // check if we should update the requests comming from the DB
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    // else
    const currentTimeStamp = new Date().getTime();

    // check if the difference in time from the lastCheck is more that 1 minute
    return (currentTimeStamp - lastFetch) / 1000 > 60;
  },
};
