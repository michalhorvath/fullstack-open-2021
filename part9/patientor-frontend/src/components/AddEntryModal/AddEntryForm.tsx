import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { EntryFormValues, HealthCheckRating } from "../../types";

import moment from "moment";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

enum TypeOption {
    HealthCheck = "Health check",
    Hospital = "Hospital",
    OccupationalHealthcare = "Occupational healthcare"
}

const typeOptions = [
  {value: TypeOption.HealthCheck, label: "Health check"},
  {value: TypeOption.Hospital, label: "Hospital"},
  {value: TypeOption.OccupationalHealthcare, label: "Occupational healthcare"}
];

const healthCheckRatingOptions = [
  {value: HealthCheckRating.Healthy, label: "Healthy"},
  {value: HealthCheckRating.LowRisk, label: "Low risk"},
  {value: HealthCheckRating.HighRisk, label: "High risk"},
  {value: HealthCheckRating.CriticalRisk, label: "Critical risk"}
];


const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');
  const [type, setType] = useState(TypeOption.HealthCheck);

  const [healthCheckRating, setHealthCheckRating] = useState(HealthCheckRating.Healthy);

  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const [employerName, setEmployerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "number") {
      const value = event.target.value;
      const newHealthCheckRating = 
        Object.values(HealthCheckRating).find(g => g === value);
      if (newHealthCheckRating && typeof newHealthCheckRating !== "string") {
        setHealthCheckRating(newHealthCheckRating);
      }
      if (newHealthCheckRating === 0){
        setHealthCheckRating(newHealthCheckRating);
      }
    }
  };

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      const value = event.target.value;
      const newType = 
        Object.values(TypeOption).find(g => g.toString() === value);
      if (newType) {
        setType(newType);
      }
    }
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    switch (type) {
    case TypeOption.HealthCheck:
      const newHealhCheckEntry: EntryFormValues = {
        description,
        date: moment(date).format("YYYY-MM-DD"),
        specialist,
        diagnosisCodes: diagnosisCodes.split(" "),
        type: "HealthCheck",
        healthCheckRating,
      };
      onSubmit(newHealhCheckEntry);
      break;
    case TypeOption.Hospital:
      const newHospitalEntry: EntryFormValues = {
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes.split(" "),
        type: "Hospital",
        discharge: {
          date: moment(dischargeDate).format("YYYY-MM-DD"),
          criteria: dischargeCriteria
        }
      };
      onSubmit(newHospitalEntry);
      break;
    case TypeOption.OccupationalHealthcare:
      const newOccupationalHealthcareEntry: EntryFormValues = {
        description,
        date,
        specialist,
        diagnosisCodes: diagnosisCodes.split(" "),
        type: "OccupationalHealthcare",
        employerName,
        sickLeave: {
          startDate: moment(startDate).format("YYYY-MM-DD"),
          endDate: moment(startDate).format("YYYY-MM-DD")
        }
      };
      onSubmit(newOccupationalHealthcareEntry);
      break;
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
        <Select
          label="Entry type"
          fullWidth
          value={type}
          onChange={onTypeChange}
          style={{ marginBottom: 5 }}
        >
          {typeOptions.map(option =>
            <MenuItem
              key={option.label}
              value={option.value}
            >
              {option.label
              }</MenuItem>
          )}
        </Select>

        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          style={{ marginTop: 5, marginBottom: 5 }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date"
            value={date}
            onChange={(value) => {
              if (value){
                setDate(value);
              }
            }}
          />
        </LocalizationProvider>
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          style={{ marginTop: 5, marginBottom: 5 }}
        />
        <TextField
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value)}
          style={{ marginTop: 5, marginBottom: 5 }}
        />
        { type === TypeOption.HealthCheck ? (<div>
          <InputLabel style={{ marginTop: 20 }}>Health check rating</InputLabel>
          <Select
            label="Health check rating"
            fullWidth
            value={healthCheckRating.toString()}
            onChange={onHealthCheckRatingChange}
            style={{ marginBottom: 5 }}
          >
            {healthCheckRatingOptions.map(option =>
              <MenuItem
                key={option.label}
                value={option.value}
              >
                {option.label
                }</MenuItem>
            )}
          </Select>
        </div>) : undefined}

        { type === TypeOption.Hospital ? (<div>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Discharge date"
              value={dischargeDate}
              onChange={(value) => {
                if (value){
                  setDischargeDate(value);
                }
              }}
            />
          </LocalizationProvider>
          <TextField
            label="Discharge criteria"
            fullWidth
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
            style={{ marginTop: 5, marginBottom: 5 }}
          />
        </div>) : undefined}


        { type === TypeOption.OccupationalHealthcare ? (<div>
          <TextField
            label="Employer name"
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
            style={{ marginTop: 5, marginBottom: 5 }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start date"
              value={startDate}
              onChange={(value) => {
                if (value){
                  setStartDate(value);
                }
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End date"
              value={endDate}
              onChange={(value) => {
                if (value){
                  setEndDate(value);
                }
              }}
            />
          </LocalizationProvider>
        </div>) : undefined}

        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
