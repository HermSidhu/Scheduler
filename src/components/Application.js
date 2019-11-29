import React, { useState, useEffect } from "react";

import axios from 'axios';

import "components/Application.scss";

import DayList from 'components/DayList';

import Appointment from "components/Appointment";

import { getAppointmentsForDay } from '../helpers/selectors'

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const setDay = day => setState(state => ({ ...state, day }))

  const appointmentObj = getAppointmentsForDay(state, state.day);

  const appointmentComponents = appointmentObj.map(appointment => {
    if (appointment.interview) {
      return <Appointment key={appointment.id} {...appointment} />
    } else
      return <Appointment key={appointment.id} time={appointment.time} />
  }
  );

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
    ]).then(([dayResponse, apptResponse]) => {
      console.log(dayResponse);
      setState(preState => ({
        ...preState,
        days: dayResponse.data,
        appointments: apptResponse.data
      }));
    })
  }, []);

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
        {appointmentComponents}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}