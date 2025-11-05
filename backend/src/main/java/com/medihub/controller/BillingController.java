package com.medihub.controller;

import com.medihub.model.Billing;
import com.medihub.service.BillingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/billing")
@CrossOrigin(origins = "*")
public class BillingController {

    @Autowired
    private BillingService billingService;

    // Get all bills
    @GetMapping
    public ResponseEntity<List<Billing>> getAllBills() {
        return ResponseEntity.ok(billingService.getAllBills());
    }

    // Get bill by id
    @GetMapping("/{id}")
    public ResponseEntity<Billing> getBillById(@PathVariable Long id) {
        Billing bill = billingService.getBillById(id);
        return bill != null ? ResponseEntity.ok(bill) : ResponseEntity.notFound().build();
    }

    // Search bills by patient name
    @GetMapping("/search")
    public ResponseEntity<List<Billing>> searchBills(@RequestParam String patientName) {
        return ResponseEntity.ok(billingService.searchBillsByPatientName(patientName));
    }

    // Get bills by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Billing>> getBillsByStatus(@PathVariable String status) {
        return ResponseEntity.ok(billingService.getBillsByStatus(status));
    }

    // Create new bill
    @PostMapping
    public ResponseEntity<Billing> createBill(@RequestBody Billing billing) {
        return ResponseEntity.ok(billingService.createBill(billing));
    }

    // Update bill
    @PutMapping("/{id}")
    public ResponseEntity<Billing> updateBill(@PathVariable Long id, @RequestBody Billing billing) {
        Billing updated = billingService.updateBill(id, billing);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    // Delete bill
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBill(@PathVariable Long id) {
        return billingService.deleteBill(id) 
            ? ResponseEntity.noContent().build()
            : ResponseEntity.notFound().build();
    }
}