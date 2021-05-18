import { ArrowLeft16 } from '@carbon/icons-react';
import { Button, Header, MultiSelect, TextArea, TextInput } from 'carbon-components-react';
import React, { CSSProperties } from 'react';
import { createPatientList } from '../patientListData';
import { PATIENT_LIST_TYPE } from '../patientListData/types';

const items = [
  {
    id: 'age',
    text: 'Age',
  },
  {
    id: 'gender',
    text: 'Gender',
  },
  {
    id: 'phone-number',
    text: 'Phone number',
  },
];

const CreateNewList: React.FC<{ close: () => void; finished: () => void }> = ({ close, finished }) => {
  const nameInputRef = React.useRef<HTMLInputElement>();
  const decriptionInputRef = React.useRef<HTMLTextAreaElement>();
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'absolute',
        top: '0px',
        left: '0px',
        zIndex: '9001',
        backgroundColor: '#ededed',
        padding: '1rem 2rem',
        marginTop: '48px',
      }}>
      <Header>
        <Button style={{ backgroundColor: 'transparent', padding: '15px' }} onClick={close}>
          <ArrowLeft16 onClick={close} />
        </Button>
        <div>New patient list</div>
      </Header>
      <h2>Configure your patient list using the fields below</h2>
      <TextInput labelText="List name" id="list_name" ref={nameInputRef} />
      <TextArea ref={decriptionInputRef} labelText="Describe the purpose of this list in a few words" />
      <br />
      <MultiSelect
        id="select"
        label={'Chose which information to include in the list'}
        items={items}
        itemToString={item => (item ? item.text : '')}
        onChange={console.log}
      />
      <div>
        <Button onClick={close}>Cancel</Button>
        <Button
          onClick={() => {
            // set loading
            createPatientList(
              nameInputRef.current.value,
              decriptionInputRef.current.value,
              PATIENT_LIST_TYPE.USER,
            ).then(() => {
              finished();
              close();
            });
          }}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default CreateNewList;
