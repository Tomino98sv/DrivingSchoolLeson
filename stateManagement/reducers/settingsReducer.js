import {RATE_ANSWERS_IMMEDIATELY, SCHEDULE_NOTIFICATIONS} from '../actions/types';

const initialState = {
      rate_answer_immidiately: false,
      schedule_notifications: false
}

const settingsReducer = (state = initialState, action) => {
      switch(action.type){
          case RATE_ANSWERS_IMMEDIATELY:  
            return {...state,
            rate_answer_immidiately: action.data};
          case SCHEDULE_NOTIFICATIONS:  
            return {...state,
            schedule_notifications: action.data};
          default:
            return state;      
      }
}

export default settingsReducer;