function getAppointmentsForDay(state, day) {
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
};

function getInterview(state, interview) {
  if (!interview) return null
  return {
    interviewer: state.interviewers[interview.interviewer],
    student: interview.student
  }
};

export { getAppointmentsForDay, getInterview };