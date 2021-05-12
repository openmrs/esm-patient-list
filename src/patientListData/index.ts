export * from './mock';
import React from 'react';
import { getAllPatientLists } from './mock';
import setup from './setupMockState';
import { PatientListBase } from './types';

const setupPromise = setup();

interface LoadingState {
  loading: true;
  data: undefined;
  error: undefined;
}

interface DataState {
  loading: false;
  data: Array<PatientListBase & { id: string }>;
  error: undefined;
}

interface ErrorState {
  loading: false;
  data: undefined;
  error: Error;
}

type State = LoadingState | DataState | ErrorState;

export const usePatientListData = (redo: any, ...args: Parameters<typeof getAllPatientLists>) => {
  const [data, setData] = React.useState<State>({
    loading: true,
    data: undefined,
    error: undefined,
  });

  React.useEffect(() => {
    setupPromise
      .then(() => {
        setData({
          loading: true,
          data: undefined,
          error: undefined,
        });
        return getAllPatientLists(...args);
      })
      .then(y => {
        setData({
          loading: false,
          data: y.map(x => ({ ...x, id: x.uuid })),
          error: undefined,
        });
      })
      .catch(err => setData({ loading: false, data: undefined, error: err }));
  }, [redo, ...args]);

  return data;
};
