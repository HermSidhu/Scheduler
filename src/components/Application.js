import React, { useState, useEffect } from "react";

import axios from 'axios';

import "components/Application.scss";

import DayList from 'components/DayList';

import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

export default function Application(props) {
  const [day, setDay] = useState('');
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8001/api/days').then((response) => {
      console.log(response);
      setDays(response.data);
    })
  }, [] );

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
            {...{ day, days, setDay }}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointments.map(appointment => {
          if (appointment.interview) {
            return <Appointment key={appointment.id} {...appointment} />
          } else 
            return <Appointment key={appointment.id} time={appointment.time} />
        }
        )
        }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}