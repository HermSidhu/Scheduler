import React from 'react';
import 'components/Appointment/styles.scss';

import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from 'components/Appointment/Confirm';
import Error from 'components/Appointment/Error';

import useVisualMode from 'hooks/useVisualMode';
import axios from 'axios';

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

const message = {
  saving: 'Saving...',
  deleting: 'Deleting...',
  confirm: 'Are you sure you want to delete?',
  saveError: "Couldn't Save. Please try again later.",
  deleteError: "Couldn't Delete. Please try again later."
}

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    const id = props.id
    return axios.put(`http://localhost:8000/api/appointments/${id}`, { interview })
      .then(() => {
        props.bookInterview(props.id, interview);
        return transition(SHOW);
      })
      .catch(() => transition(ERROR_SAVE, true))
  }

  function confirmDelete() {
    transition(CONFIRM);
  }

  function cancel() {
    transition(DELETING, true);
    const id = props.id
    return axios.delete(`http://localhost:8000/api/appointments/${id}`)
      .then(() => {
        props.cancelInterview(props.id);
        return transition(EMPTY);
      })
      .catch(() => {
        transition(ERROR_DELETE, true);
      })
  }

  function edit() {
    transition(EDIT)
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
          onEdit={edit}
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
          message={message.confirm}
          onCancel={back}
          onConfirm={cancel}
        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={back}
          onSave={save}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message={message.saveError} onClose={back}
        />
      )}

      {mode === ERROR_DELETE && (
        <Error
          message={message.deleteError} onClose={back}
        />
      )}

    </article>
  )
};