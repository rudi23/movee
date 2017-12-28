import scheduleConstants from '../constants/scheduleContants';
import scheduleRepository from '../../repository/scheduleRepository';

export const fetchSchedule = () => (dispatch, getState) => {
  dispatch({
    type: scheduleConstants.FETCH_SCHEDULE_PENDING,
  });

  const { date, country, channel: filterChannel } = getState().schedule.filter;

  return scheduleRepository.findForDate(date, country, filterChannel)
    .then(
      ([schedule, channelOptions]) => dispatch({
        type: scheduleConstants.FETCH_SCHEDULE_SUCCESS,
        schedule,
        channelOptions,
      })
    )
    .catch(
      error => dispatch({
        type: scheduleConstants.FETCH_SCHEDULE_FAILED,
        error,
      })
    );
};

export const setCountryFilter = country => (dispatch) => {
  dispatch({
    type: scheduleConstants.SET_COUNTRY_FILTER,
    country,
  });
};

export const setChannelFilter = (channel = '') => (dispatch) => {
  dispatch({
    type: scheduleConstants.SET_CHANNEL_FILTER,
    channel,
  });
};
