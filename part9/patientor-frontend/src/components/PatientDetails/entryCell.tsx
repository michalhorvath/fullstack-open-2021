import { Entry, 
  HospitalEntry, 
  OccupationalHealthcareEntry, 
  HealthCheckEntry,  
  Diagnosis } from '../../types';

import { Box } from '@mui/material';

const sx = {
  border: 1,
  borderRadius: '10px',
  padding: '10px',
  margin: '10px'
};

interface BaseEntryCellProps {
    entry: Entry;
    diagnoses: Diagnosis[];
    children?: JSX.Element;
}

const BaseEntryCell = (props: BaseEntryCellProps) => {
  return (
    <div>
      <div><b>{props.entry.date}</b></div>
      <div><i>{props.entry.description}</i></div>
      <ul>
        {props.entry.diagnosisCodes ? 
          props.entry.diagnosisCodes.map((c, i) => (<li key={i}>
            {c} {props.diagnoses.find(d => d.code === c)?.name}
          </li>)) : undefined}
      </ul>
      {props.children ? props.children : undefined}
      <div>Diagnose by {props.entry.specialist}</div>
    </div>
  );
};

interface OccupationalHealthcareEntryCellProps {
    entry: OccupationalHealthcareEntry;
    diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryCell = (props: OccupationalHealthcareEntryCellProps) => {
  return (
    <Box sx={sx}>
      <BaseEntryCell entry={props.entry} diagnoses={props.diagnoses}>
        <>
          <div>Emoployer: {props.entry.employerName}</div>
          {props.entry.sickLeave ?
            (<div>Sick leave from {props.entry.sickLeave.startDate}
                            to {props.entry.sickLeave.endDate}.</div>) :
            undefined}
        </>
      </BaseEntryCell>
    </Box>
  );
};

interface HealthCheckEntryCellProps {
    entry: HealthCheckEntry;
    diagnoses: Diagnosis[];
}

const HealthCheckEntryCell = (props: HealthCheckEntryCellProps) => {
  return (
    <Box sx={sx}>
      <BaseEntryCell entry={props.entry} diagnoses={props.diagnoses}>
        <>
          <div>Rating: {props.entry.healthCheckRating}</div>
        </>
      </BaseEntryCell>
    </Box>
  );
};

interface HospitalEntryCellProps {
    entry: HospitalEntry;
    diagnoses: Diagnosis[];
}

const HospitalEntryCell = (props: HospitalEntryCellProps) => {
  return (
    <Box sx={sx}>
      <BaseEntryCell entry={props.entry} diagnoses={props.diagnoses}>
        <>
          <div>{props.entry.discharge.date}</div>
          <div><i>{props.entry.discharge.criteria}</i></div>
        </>
      </BaseEntryCell>
    </Box>
  );
};


interface EntryCellProps {
    entry: Entry;
    diagnoses: Diagnosis[];
}

const EntryCell = (props: EntryCellProps) => {
  switch (props.entry.type){
  case 'OccupationalHealthcare':
    return (<OccupationalHealthcareEntryCell 
      entry={props.entry} diagnoses={props.diagnoses} />);
  case 'HealthCheck':
    return (<HealthCheckEntryCell 
      entry={props.entry} diagnoses={props.diagnoses} />);
  case 'Hospital':
    return (<HospitalEntryCell 
      entry={props.entry} diagnoses={props.diagnoses} />);
  default:
    return assertNever(props.entry);
  }   
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default EntryCell;
