package com.medihub.controller;

import com.medihub.model.EHRRecord;
import com.medihub.service.EHRRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMethod;
import java.util.List;

@RestController
@RequestMapping("/api/ehr")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class EHRRecordController {

    @Autowired
    private EHRRecordService ehrRecordService;

    @GetMapping
    public ResponseEntity<List<EHRRecord>> getAllEHRRecords() {
        try {
            List<EHRRecord> records = ehrRecordService.getAllEHRRecords();
            return ResponseEntity.ok(records);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<EHRRecord> getEHRRecordById(@PathVariable Long id) {
        try {
            EHRRecord record = ehrRecordService.getEHRRecordById(id);
            return record != null ? ResponseEntity.ok(record) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<EHRRecord> createEHRRecord(@RequestBody EHRRecord ehrRecord) {
        try {
            if (ehrRecord.getPatient() == null || ehrRecord.getPatient().getId() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
            if (ehrRecord.getDoctor() == null || ehrRecord.getDoctor().getId() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
            if (ehrRecord.getVisitDate() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }
            EHRRecord created = ehrRecordService.createEHRRecord(ehrRecord);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<EHRRecord> updateEHRRecord(@PathVariable Long id, @RequestBody EHRRecord ehrRecord) {
        try {
            EHRRecord updated = ehrRecordService.updateEHRRecord(id, ehrRecord);
            return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEHRRecord(@PathVariable Long id) {
        try {
            EHRRecord existing = ehrRecordService.getEHRRecordById(id);
            if (existing == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
            ehrRecordService.deleteEHRRecord(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
