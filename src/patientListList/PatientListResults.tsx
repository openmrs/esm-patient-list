import React, { CSSProperties } from 'react';
import { usePatientListData } from '../patientListData';
import PatientListTable from './patientListTable';

const PatientListResults: React.FC<{
  nameFilter?: string;
  setListStarred: (listUuid: string, star: boolean) => void;
  style?: CSSProperties;
  enter: Object;
}> = ({ nameFilter, setListStarred, style, enter }) => {
  const [filter, setFilter] = React.useState<string>();
  const { data: data, loading } = usePatientListData(undefined, undefined, undefined, filter);

  React.useEffect(() => {
    setFilter(nameFilter);
  }, [enter]);

  return (
    <div style={{ ...style }}>
      <h3 style={{ padding: '1rem' }}>Search results</h3>
      {data !== undefined && (
        <p style={{ color: '#525252', borderBottom: 'solid 1px #e0e0e0', margin: '0rem 1rem', fontSize: '0.75rem' }}>
          Found {data.length} lists
        </p>
      )}
      <PatientListTable
        loading={loading}
        patientData={data}
        setListStarred={setListStarred}
        style={{ paddingTop: '0.5rem' }}
      />
    </div>
  );
};

export default PatientListResults;
