package com.medihub.service;

import com.medihub.model.EHRRecord;
import com.medihub.repository.EHRRecordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EHRRecordService {

    @Autowired
    private EHRRecordRepository ehrRecordRepository;

    public List<EHRRecord> getAllEHRRecords() {
        return ehrRecordRepository.findAll();
    }

    public EHRRecord getEHRRecordById(Long id) {
        return ehrRecordRepository.findById(id).orElse(null);
    }

    public EHRRecord createEHRRecord(EHRRecord ehrRecord) {
        return ehrRecordRepository.save(ehrRecord);
    }

    public EHRRecord updateEHRRecord(Long id, EHRRecord updatedEHRRecord) {
        EHRRecord existing = ehrRecordRepository.findById(id).orElse(null);
        if (existing != null) {
            if (updatedEHRRecord.getPatient() != null) {
                existing.setPatient(updatedEHRRecord.getPatient());
            }
            if (updatedEHRRecord.getDoctor() != null) {
                existing.setDoctor(updatedEHRRecord.getDoctor());
            }
            if (updatedEHRRecord.getVisitDate() != null) {
                existing.setVisitDate(updatedEHRRecord.getVisitDate());
            }
            if (updatedEHRRecord.getDiagnosis() != null) {
                existing.setDiagnosis(updatedEHRRecord.getDiagnosis());
            }
            if (updatedEHRRecord.getTreatment() != null) {
                existing.setTreatment(updatedEHRRecord.getTreatment());
            }
            return ehrRecordRepository.save(existing);
        }
        return null;
    }

    public void deleteEHRRecord(Long id) {
        ehrRecordRepository.deleteById(id);
    }
}