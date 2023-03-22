import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';

import { EntryFormValues, Patient, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import diagnosisService from "../../services/diagnoses";

import EntryCell from "./entryCell";

import AddEntryModal from "../AddEntryModal";

const PatientDetails = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | undefined>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (!id || !patient){
        throw new Error('No patient loaded.');
      }
      const newEntry = await patientService.addEntry(id, values);
      if (!patient.entries){
        patient.entries = [];
      }
      const newPatient = {
        ...patient,
        entries: patient.entries.concat(newEntry)
      };
      setPatient(newPatient);
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await patientService.get(id);
        setPatient(patient);
      }
    };
    void fetchPatient();
  }, []);

  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosisService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  if (!patient){
    return (<div>no patient found</div>);
  }

  return (
    <div className="App">
      <Box>
        <Typography variant="h4">
          {patient.name} {(patient.gender === 'female' ? '♀️' : (patient.gender === 'male' ? '♂️' : ''))}
        </Typography>
      </Box>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h2>Entries:</h2>
      {patient.entries ? 
        patient.entries.map((e, i) => <EntryCell key={i} entry={e} diagnoses={diagnoses}/>) : 
        undefined}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
            Add New Entry
      </Button>
    </div>
  );
};

export default PatientDetails;
