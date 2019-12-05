import React, { useEffect, useReducer } from "react";
import axios from 'axios';

import "components/Application.scss";


export default function useApplicationData(props) {


  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day }
      case SET_APPLICATION_DATA:
        return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
      case SET_INTERVIEW: {
        const { id, interview } = action;
        return {
          ...state,
          days: state.days.map((day) => {
            let spotCounter = 0;
            if (day.name === state.day) {
              if (interview && state.appointments[id].interview) {
                spotCounter = 0;
              } else if (interview) {
                spotCounter = -1;
              } else {
                spotCounter = 1;
              }
            }
            return {
              ...day,
              spots: day.spots + spotCounter
            };
          }),
          appointments: {
            ...state.appointments,
            [id]: {
              ...state.appointments[action.id],
              interview: action.interview ? { ...interview } : null
            }
          }
        }
      }

      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        )
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviews: {}
  });

  const setDay = day => dispatch(({ type: SET_DAY, day }))

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ]).then((all) => {
      dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data })
    })
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    dispatch(
      {type: SET_INTERVIEW, id, interview, appointments}
    );
  }

  function cancelInterview(id) {
    let newAppointments = { ...state.appointments }
    newAppointments[id].interview = null
    dispatch({
      type: SET_INTERVIEW,
      appointments: newAppointments
    });
  }
  return { state, setDay, bookInterview, cancelInterview }
}