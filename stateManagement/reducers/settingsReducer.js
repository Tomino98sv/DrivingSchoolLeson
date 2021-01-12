import {RATE_ANSWERS_IMMEDIATELY} from '../actions/types';

const initialState = {
      rate_answer_immidiately: false
}

const settingsReducer = (state = initialState, action) => {
      switch(action.type){
          case RATE_ANSWERS_IMMEDIATELY:  
            return {...state,
            rate_answer_immidiately: action.data};
          default:
            return state;      
      }
}

export default settingsReducer;