export function getAppointmentsForDay(state, day) {
  let result = [];
  state.days.forEach((weekDay) => {
    if (weekDay.name === day) {
      let dayApps = weekDay.appointments;
      dayApps.forEach((app) => {
        result.push(state.appointments[app]);
      }
      )
    }
  }
  )
  return result;
}

export function getInterview(state, interview) {
  if (!interview) return null
  return {
    interviewer: state.interviewers[interview.interviewer],
    student: interview.student
  }
}

export function getInterviewersForDay(state, day) {
  let result = [];
  state.days.forEach((weekDay) => {
    if (weekDay.name === day) {
      let dayApps = weekDay.appointments;

      dayApps.forEach((appointmentID) => {
        let appointment = state.appointments[appointmentID];

        if (appointment.interview) {
          let interviewerID = appointment.interview.interviewer
          if (!result.includes(state.interviewers[interviewerID]))
          result.push(state.interviewers[interviewerID]);
        }
      })
    }
  })
  return result;
}
