interface PatientListResponse {
  display: string;
  uuid: string;
}

const fetchLists = (): Promise<Array<PatientListResponse>> =>
  fetch(`${window.openmrsBase}/ws/rest/v1/cohort`)
    .then(res => res.json())
    .then(({ results }) => results);
