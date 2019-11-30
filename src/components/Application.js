import React, { useState, useEffect } from "react";

import axios from 'axios';

import "components/Application.scss";

import DayList from 'components/DayList';

import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterview } from '../helpers/selectors'

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviews: {}
  });

  const setDay = day => setState(state => ({ ...state, day }))

  const appointments = getAppointmentsForDay(state, state.day);

  const schedule = appointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id} 
        {...appointment} 
        interview={interview}
      />
    );
  });

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ]).then(([dayResponse, apptResponse, interResponse]) => {
      console.log(interResponse);
      setState(preState => ({
        ...preState,
        days: dayResponse.data,
        appointments: apptResponse.data,
        interviewers: interResponse.data
      }));
    })
  }, []);

  console.log(state.interviewers)

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            {...{ day: state.day, days: state.days, setDay }}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}