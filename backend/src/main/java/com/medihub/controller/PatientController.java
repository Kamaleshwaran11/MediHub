package com.medihub.controller;

import java.util.List;

import com.medihub.dto.PatientRequestDTO;
import com.medihub.dto.PatientResponseDTO;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

import com.medihub.model.Patient;
import com.medihub.service.PatientService;

@RestController
@RequestMapping("/api/patients")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class PatientController {
    @Autowired
    private PatientService patientService;

    @GetMapping
    public ResponseEntity<List<PatientResponseDTO>> getAllPatients() {
        try {
            List<PatientResponseDTO> patients = patientService.getAllPatients();
            return ResponseEntity.ok(patients);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientResponseDTO> getPatient(@PathVariable Long id) {
        try {
            PatientResponseDTO patient = patientService.getPatientById(id);

            if (patient != null) {
                return ResponseEntity.ok(patient);
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<Patient> addPatient(@Valid @RequestBody PatientRequestDTO patientRequestDTO) {
        try {
            Patient createdPatient = patientService.addPatient(patientRequestDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPatient);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(
            @PathVariable Long id,
            @Valid @RequestBody PatientRequestDTO patientRequestDTO) {

        try {
            Patient updatedPatient = patientService.updatePatient(id, patientRequestDTO);

            if (updatedPatient != null) {
                return ResponseEntity.ok(updatedPatient);
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        try {
            Patient patient = patientService.getPatientByIdEntity(id);

            if (patient != null) {
                patientService.deletePatient(id);
                return ResponseEntity.noContent().build();
            }

            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
