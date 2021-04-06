import {RATE_ANSWERS_IMMEDIATELY, SCHEDULE_NOTIFICATIONS} from './types';

export const change_immediately_answer_rating = (value) => (
      {
            type: RATE_ANSWERS_IMMEDIATELY,
            data: value
      }
);

export const change_schedule_notifications = (value) => (
      {
            type: SCHEDULE_NOTIFICATIONS,
            data: value
      }
);