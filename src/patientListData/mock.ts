import {
  PatientListBase,
  PatientListDetails,
  PatientListMember,
  PatientListOption,
  PATIENT_LIST_TYPE,
  PatientListMemberFilter,
} from './types';
const sleep = time => new Promise<void>(res => setTimeout(() => res(), time));
export const newUuid = () =>
  Math.random()
    .toString(36)
    .split('.')[1] +
  Math.random()
    .toString(36)
    .split('.')[1];
const DELAY = 1;

type PatientUuid = string;
type PatientListUuid = string;

const patientLists = new Map<PatientListUuid, PatientListDetails>();

const patientListMembers = new Map<string, Array<PatientListMember>>();

// use async iterator for pagination?
export const getAllPatientLists = (filter?: PATIENT_LIST_TYPE, stared?: boolean, nameFilter?: string) =>
  sleep(DELAY).then(() => {
    const res: Array<PatientListBase> = [];
    for (const pl of patientLists.values()) {
      if (filter ?? filter !== pl.type) continue;
      if (stared ?? stared !== pl.isStared) continue;
      if (nameFilter ?? !pl.display.startsWith(nameFilter)) continue;

      res.push(pl);
    }
    return res;
  });

// might be directly part of getAllPatientLists, depends on how options are fetched
export const getPatientListDetails = (listUuid: PatientListUuid) =>
  sleep(DELAY).then(() => patientLists.get(listUuid)) as Promise<PatientListDetails>;

// when adding a patient to new lists, we need to know which lists the patient is already on
export const getAllPatientListsWithPatient = (
  patientUuid: PatientUuid,
  filter?: PATIENT_LIST_TYPE,
  stared?: boolean,
  nameFilter?: string,
) =>
  sleep(DELAY).then(() => {
    const res: Array<PatientListDetails> = [];
    for (const pl of patientLists.values()) {
      if (filter ?? filter !== pl.type) continue;
      if (stared ?? stared !== pl.isStared) continue;
      if (nameFilter ?? !pl.display.startsWith(nameFilter)) continue;
      if (!patientListMembers.get(pl.uuid).find(patient => patient.patientUuid === patientUuid)) continue;

      res.push(pl);
    }
    return res;
  });

export const getPatientListMembers = (listUuid: PatientListUuid, filters?: Array<PatientListMemberFilter>) =>
  sleep(DELAY).then(() => patientListMembers.get(listUuid)) as Promise<Array<PatientListMember>>;

export const createPatientList = (name: string, type? = PATIENT_LIST_TYPE.USER, options?: Array<PatientListOption>) =>
  sleep(DELAY).then(() => {
    const uuid = newUuid();
    patientLists.set(uuid, {
      display: name,
      description: '',
      isStared: false,
      type,
      uuid,
      memberCount: 0,
      options,
    });

    patientListMembers.set(uuid, []);

    return uuid;
  });

export const updatePatientListDetails = (
  listUuid: PatientListUuid,
  details: Omit<Partial<PatientListDetails>, 'uuid'>,
) =>
  sleep(DELAY).then(() => {
    const patientList = patientLists.get(listUuid);
    if (!patientList) throw new Error('list does not exist');

    patientLists.set(listUuid, {
      ...patientList,
      ...details,
    });
  });

export const deletePatientList = (uuid: PatientListUuid) =>
  sleep(DELAY).then(() => {
    patientLists.delete(uuid);
    patientListMembers.delete(uuid);
  });

export const addPatientToPatientList = (patientUuid: PatientUuid, listUuid: PatientListUuid) =>
  sleep(DELAY).then(() => {
    const members = patientListMembers.get(listUuid);
    if (!members) throw new Error('list does not exist');

    members.push({
      patientUuid,
      properies: [],
    });

    patientLists.get(listUuid).memberCount++;
  });

export const deletePatientFromPatientList = (patientUuid: PatientUuid, listUuid: PatientListUuid) =>
  sleep(DELAY).then(() => {
    const members = patientListMembers.get(listUuid);

    const toBeDeleted = members.findIndex(x => x.patientUuid === patientUuid);

    if (toBeDeleted !== -1) {
      members.splice(toBeDeleted, 1);
      patientLists.get(listUuid).memberCount--;
    }
  });
