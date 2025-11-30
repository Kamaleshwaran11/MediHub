package com.medihub.controller;

import com.medihub.model.Billing;
import com.medihub.model.Patient;
import com.medihub.service.BillingService;
import com.medihub.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/billing")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class BillingController {

    @Autowired
    private BillingService billingService;

    @Autowired
    private PatientRepository patientRepository;

    @GetMapping
    public ResponseEntity<List<Billing>> getAllBills() {
        try {
            List<Billing> bills = billingService.getAllBills();
            return ResponseEntity.ok(bills);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Billing> getBillById(@PathVariable Long id) {
        try {
            Billing bill = billingService.getBillById(id);
            return bill != null ? ResponseEntity.ok(bill) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/search")
    public ResponseEntity<List<Billing>> searchBills(@RequestParam String patientName) {
        try {
            List<Billing> results = billingService.searchBillsByPatientName(patientName);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Billing>> getBillsByStatus(@PathVariable String status) {
        try {
            List<Billing> results = billingService.getBillsByStatus(status);
            return ResponseEntity.ok(results);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<Billing> createBill(@RequestBody Billing billing) {
        try {
            if (billing.getPatient() == null || billing.getPatient().getId() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
            if (billing.getAmount() == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
            
            // Validate that patient exists
            Patient patient = patientRepository.findById(billing.getPatient().getId()).orElse(null);
            if (patient == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            
            Billing created = billingService.createBill(billing);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Billing> updateBill(@PathVariable Long id, @RequestBody Billing billing) {
        try {
            Billing updated = billingService.updateBill(id, billing);
            return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBill(@PathVariable Long id) {
        try {
            boolean deleted = billingService.deleteBill(id);
            return deleted ? ResponseEntity.noContent().build() : ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

