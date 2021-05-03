import { addPatientToPatientList, createPatientList, newUuid } from './mock';

const setup = async () => {
  const myListUuid = await createPatientList('my favorite patients');
  const myListPatients = Array.from({ length: 20 }, newUuid);
  await Promise.all(
    myListPatients.map(p => {
      return addPatientToPatientList(p, myListUuid);
    }),
  );

  const systemUuid = await createPatientList('waiting list');
  const systemPatients = Array.from({ length: 20 }, newUuid);
  await Promise.all(
    systemPatients.map(p => {
      return addPatientToPatientList(p, systemUuid);
    }),
  );
};

export default setup;
