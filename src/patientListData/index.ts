export * from './mock';
import React from 'react';
import { getAllPatientLists } from './mock';
import setup from './setupMockState';
import { PatientListBase } from './types';

const s = setup();
// const fetchLists = (): Promise<Array<PatientListResponse>> =>
//   fetch(`${window.openmrsBase}/ws/rest/v1/cohort`)
//     .then(res => res.json())
//     .then(({ results }) => results);

export const usePatientListData = (redo: any, ...args: Parameters<typeof getAllPatientLists>) => {
  const [data, setData] = React.useState<Array<PatientListBase & { id: string }>>([]);

  React.useEffect(() => {
    s.then(() => getAllPatientLists(...args)).then(y => {
      setData(y.map(x => ({ ...x, id: x.uuid })));
    });
  }, [redo, ...args]);

  return data;
};
