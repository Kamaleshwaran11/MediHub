package com.medihub.service;

import com.medihub.model.Patient;
import com.medihub.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    public List<Patient> getAllPatients(){
        return patientRepository.findAll();
    }
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id).orElse(null);
    }
    public Patient savePatient(Patient patient){
        return patientRepository.save(patient);
    }
    public Patient addPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
    public Patient updatePatient(Long id, Patient updatedPatient) {
        Patient existing = patientRepository.findById(id).orElse(null);
        if (existing != null) {
                        existing.setFirstName(updatedPatient.getFirstName());
                        existing.setLastName(updatedPatient.getLastName());
                        existing.setDateOfBirth(updatedPatient.getDateOfBirth());
                        existing.setGender(updatedPatient.getGender());
                        existing.setBloodGroup(updatedPatient.getBloodGroup());
                        existing.setMobileNumber(updatedPatient.getMobileNumber());
                        existing.setEmail(updatedPatient.getEmail());
                        existing.setAddress(updatedPatient.getAddress());
                        existing.setCity(updatedPatient.getCity());
                        existing.setState(updatedPatient.getState());
                        existing.setPinCode(updatedPatient.getPinCode());
                        existing.setEmergencyContactName(updatedPatient.getEmergencyContactName());
                        existing.setEmergencyContactRelation(updatedPatient.getEmergencyContactRelation());
                        existing.setEmergencyContactNumber(updatedPatient.getEmergencyContactNumber());
                        existing.setMedicalHistory(updatedPatient.getMedicalHistory());
                        existing.setAllergies(updatedPatient.getAllergies());
                        existing.setCurrentMedications(updatedPatient.getCurrentMedications());
                        existing.setInsuranceProvider(updatedPatient.getInsuranceProvider());
                        existing.setInsurancePolicyNumber(updatedPatient.getInsurancePolicyNumber());
                        existing.setInsuranceGroupNumber(updatedPatient.getInsuranceGroupNumber());
            return patientRepository.save(existing);
        }
        return null;
    }
}
