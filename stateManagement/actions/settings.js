import {RATE_ANSWERS_IMMEDIATELY} from './types';

export const change_immediately_answer_rating = (value) => (
      {
            type: RATE_ANSWERS_IMMEDIATELY,
            data: value
      }
);