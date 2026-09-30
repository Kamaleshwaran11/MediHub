package com.medihub.service;

import com.medihub.dto.PatientRequestDTO;
import com.medihub.dto.PatientResponseDTO;
import com.medihub.model.Patient;
import com.medihub.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;

    public List<PatientResponseDTO> getAllPatients() {
        List<Patient> patients = patientRepository.findAll();

        return patients.stream()
                .map(this::convertToResponseDTO)
                .toList();
    }
    public PatientResponseDTO getPatientById(Long id) {

        Patient patient = patientRepository.findById(id).orElse(null);

        if (patient != null) {
            return convertToResponseDTO(patient);
        }

        return null;
    }
    public Patient getPatientByIdEntity(Long id) {
        return patientRepository.findById(id).orElse(null);
    }
    public Patient savePatient(Patient patient){
        return patientRepository.save(patient);
    }
    public Patient addPatient(PatientRequestDTO dto) {

        Patient patient = new Patient();

        patient.setFirstName(dto.getFirstName());
        patient.setLastName(dto.getLastName());
        patient.setDateOfBirth(dto.getDateOfBirth());
        patient.setGender(dto.getGender());
        patient.setBloodGroup(dto.getBloodGroup());

        patient.setMobileNumber(dto.getMobileNumber());
        patient.setEmail(dto.getEmail());
        patient.setAddress(dto.getAddress());
        patient.setCity(dto.getCity());
        patient.setState(dto.getState());
        patient.setPinCode(dto.getPinCode());

        patient.setEmergencyContactName(dto.getEmergencyContactName());
        patient.setEmergencyContactRelation(dto.getEmergencyContactRelation());
        patient.setEmergencyContactNumber(dto.getEmergencyContactNumber());

        patient.setMedicalHistory(dto.getMedicalHistory());
        patient.setAllergies(dto.getAllergies());
        patient.setCurrentMedications(dto.getCurrentMedications());

        patient.setInsuranceProvider(dto.getInsuranceProvider());
        patient.setInsurancePolicyNumber(dto.getInsurancePolicyNumber());
        patient.setInsuranceGroupNumber(dto.getInsuranceGroupNumber());

        return patientRepository.save(patient);
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
    public Patient updatePatient(Long id, PatientRequestDTO dto) {

        Patient existing = patientRepository.findById(id).orElse(null);

        if (existing != null) {

            existing.setFirstName(dto.getFirstName());
            existing.setLastName(dto.getLastName());
            existing.setDateOfBirth(dto.getDateOfBirth());
            existing.setGender(dto.getGender());
            existing.setBloodGroup(dto.getBloodGroup());

            existing.setMobileNumber(dto.getMobileNumber());
            existing.setEmail(dto.getEmail());
            existing.setAddress(dto.getAddress());
            existing.setCity(dto.getCity());
            existing.setState(dto.getState());
            existing.setPinCode(dto.getPinCode());

            existing.setEmergencyContactName(dto.getEmergencyContactName());
            existing.setEmergencyContactRelation(dto.getEmergencyContactRelation());
            existing.setEmergencyContactNumber(dto.getEmergencyContactNumber());

            existing.setMedicalHistory(dto.getMedicalHistory());
            existing.setAllergies(dto.getAllergies());
            existing.setCurrentMedications(dto.getCurrentMedications());

            existing.setInsuranceProvider(dto.getInsuranceProvider());
            existing.setInsurancePolicyNumber(dto.getInsurancePolicyNumber());
            existing.setInsuranceGroupNumber(dto.getInsuranceGroupNumber());

            return patientRepository.save(existing);
        }


        return null;
    }
    private PatientResponseDTO convertToResponseDTO(Patient patient) {
        PatientResponseDTO dto = new PatientResponseDTO();

        dto.setId(patient.getId());
        dto.setFirstName(patient.getFirstName());
        dto.setLastName(patient.getLastName());
        dto.setDateOfBirth(patient.getDateOfBirth());
        dto.setGender(patient.getGender());
        dto.setBloodGroup(patient.getBloodGroup());

        dto.setMobileNumber(patient.getMobileNumber());
        dto.setEmail(patient.getEmail());
        dto.setAddress(patient.getAddress());
        dto.setCity(patient.getCity());
        dto.setState(patient.getState());
        dto.setPinCode(patient.getPinCode());

        dto.setEmergencyContactName(patient.getEmergencyContactName());
        dto.setEmergencyContactRelation(patient.getEmergencyContactRelation());
        dto.setEmergencyContactNumber(patient.getEmergencyContactNumber());

        dto.setMedicalHistory(patient.getMedicalHistory());
        dto.setAllergies(patient.getAllergies());
        dto.setCurrentMedications(patient.getCurrentMedications());

        dto.setInsuranceProvider(patient.getInsuranceProvider());
        dto.setInsurancePolicyNumber(patient.getInsurancePolicyNumber());
        dto.setInsuranceGroupNumber(patient.getInsuranceGroupNumber());

        return dto;
    }
}
