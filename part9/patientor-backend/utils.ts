import { NewPatient, NewEntry, Gender, Discharge,
  HealthCheckRating, SickLeave, DiagnosisCodes } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String ;
};

const isNumber = (n: unknown): n is number => {
  return typeof n === 'number';
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing dateOfBirth');
  }
  return dateOfBirth;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object'){
    throw new Error('Incorrect or missing data');
  }
  if ('name' in object
            && 'dateOfBirth' in object
            && 'ssn' in object
            && 'gender' in object
            && 'occupation' in object
  ){
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };
    return newPatient;
  }
  throw new Error('Incorrect data: some fields are missing');
};

const parseDescription = (s: unknown): string => {
  if (!s || !isString(s)) {
    throw new Error('Incorrect or missing description');
  }
  return s;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};

const parseSpecialist = (s: unknown): string => {
  if (!s || !isString(s)) {
    throw new Error('Incorrect or missing specialist');
  }
  return s;
};

const isDischarge = (discharge: unknown): discharge is Discharge => {
  if (!discharge || typeof discharge !== 'object' ||
            !('date' in discharge) || !('criteria' in discharge) ){
    return false;
  }
  return isString(discharge.date) && 
        isDate(discharge.date) && isString(discharge.criteria);
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing discharge');
  }
  return discharge;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (healthCheckRating === 0){
    return healthCheckRating;
  }
  if (!healthCheckRating || !isNumber(healthCheckRating) 
            || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthCheckRating');
  }
  return healthCheckRating;
};

const parseEmployerName = (s: unknown): string => {
  if (!s || !isString(s)) {
    throw new Error('Incorrect or missing employerName');
  }
  return s;
};

const isSickLeave = (param: unknown): param is SickLeave => {
  if (!param || typeof param !== 'object' ||
            !('startDate' in param) || !('endDate' in param) ){
    return false;
  }
  return isString(param.startDate) && isString(param.endDate)
        && isDate(param.startDate) && isDate(param.endDate);
};

const parseSickLeave = (s: unknown): SickLeave => {
  if (!s || !isSickLeave(s)) {
    throw new Error('Incorrect or missing sickLeave');
  }
  return s;
};

const isDiagnosisCode = (param: unknown): param is {code: string} => {
  if (!param) {
    return false;
  }
  return isString(param);
};

const isDiagnosisCodes = (param: unknown): param is DiagnosisCodes => {
  if (!param || !Array.isArray(param)) {
    return false;
  }
  return param.every(e => isDiagnosisCode(e));
};

const parseDiagnosisCodes = (s: unknown): DiagnosisCodes => {
  if (!s || !isDiagnosisCodes(s)) {
    throw new Error('Incorrect or missing diagnosisCodes');
  }
  return s;
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object'){
    throw new Error('Incorrect or missing data');
  }
  if ('description' in object
            && 'date' in object
            && 'specialist' in object
            && 'type' in object
  ){
    switch (object.type){
    case 'Hospital':
      if ('discharge' in object){
        const newEntry: NewEntry = {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          type: 'Hospital',
          discharge: parseDischarge(object.discharge)
        };
        return newEntry;
      }
      break;
    case 'HealthCheck':
      if ('healthCheckRating' in object){
        const newEntry: NewEntry = {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          type: 'HealthCheck',
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
        };
        return newEntry;
      }
      break;
    case 'OccupationalHealthcare':
      if ('employerName' in object){
        const newEntry: NewEntry = {
          description: parseDescription(object.description),
          date: parseDate(object.date),
          specialist: parseSpecialist(object.specialist),
          type: 'OccupationalHealthcare',
          employerName: parseEmployerName(object.employerName)
        };
        if ('diagnosisCodes' in object){
          newEntry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
        }
        if ('sickLeave' in object){
          newEntry.sickLeave = parseSickLeave(object.sickLeave);
        }
        return newEntry;
      }
      break;
    }
  }
  throw new Error('Incorrect data: some fields are missing');
};
