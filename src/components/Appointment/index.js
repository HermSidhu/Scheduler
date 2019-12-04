import React from 'react';
import 'components/Appointment/styles.scss';

import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';

import useVisualMode from 'hooks/useVisualMode';
import axios from 'axios';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM"

const message = {
  saving: 'Saving...',
  deleting: 'Deleting...',
  confirm: 'Are you sure you want to delete?'
}

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview)
    const id = props.id
    return axios.put(`http://localhost:8000/api/appointments/${id}`, { interview }).then(() => { transition(SHOW) })
  }

  function confirmDelete() {
    transition(CONFIRM);
  }

  function cancel() {
    transition(DELETING);
    props.cancelInterview(props.id)
    const id = props.id
    return axios.delete(`http://localhost:8000/api/appointments/${id}`)
    .then(() => { transition(EMPTY) })
  }

  return (
    <article className='appointment'>
      <Header time={props.time} />

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDelete}
        />
      )}

      {mode === CREATE && (
        <Form interviewers={props.interviewers} onCancel={back} onSave={save}
        />
      )}

      {mode === SAVING && (
        <Status message={message.saving} 
        />
      )}

      {mode === DELETING && (
        <Status message={message.deleting}
        />
      )}

      {mode === CONFIRM && (
        <Confirm 
        message = {message.confirm}
        onCancel = {back}
        onConfirm = {cancel}
        />
      )}

    </article>
  )
};