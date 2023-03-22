import patients from '../data/patients';
import { NewEntry, Entry, NewPatient, NonSensitivePatient, Patient } from '../types';

import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensiblePatients = (): NonSensitivePatient[] => {
  return patients.map( ({id, name, dateOfBirth, gender, occupation, entries}) => ({
    id, name, dateOfBirth, gender, occupation, entries
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

const getPatient = (id: string) => {
  const patient = patients.find(p => p.id === id);
  return patient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  const patient = patients.find(p => p.id === patientId);
  if (!patient) {
    throw new Error('No patient with given ID found.');
  }
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getNonSensiblePatients,
  addPatient,
  getPatient,
  addEntry
};
