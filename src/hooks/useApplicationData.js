import React, { useEffect, useReducer } from "react";
import axios from 'axios';

import "components/Application.scss";

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData(props) {

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