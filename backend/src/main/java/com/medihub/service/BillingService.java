package com.medihub.service;

import com.medihub.model.Billing;
import com.medihub.repository.BillingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class BillingService {

    @Autowired
    private BillingRepository billingRepository;

    // Generate invoice number
    private String generateInvoiceNumber() {
        return "INV-" + LocalDate.now().format(java.time.format.DateTimeFormatter.BASIC_ISO_DATE) + 
               "-" + String.format("%04d", billingRepository.count() + 1);
    }

    // Get all bills
    public List<Billing> getAllBills() {
        return billingRepository.findAll();
    }

    // Get bill by id
    public Billing getBillById(Long id) {
        return billingRepository.findById(id).orElse(null);
    }

    // Create new bill
    public Billing createBill(Billing billing) {
        billing.setInvoiceNumber(generateInvoiceNumber());
        billing.setBillDate(LocalDate.now());
        return billingRepository.save(billing);
    }

    // Update bill
    public Billing updateBill(Long id, Billing billing) {
        if (!billingRepository.existsById(id)) {
            return null;
        }
        billing.setId(id);
        return billingRepository.save(billing);
    }

    // Delete bill
    public boolean deleteBill(Long id) {
        if (billingRepository.existsById(id)) {
            billingRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Search bills by patient name
    public List<Billing> searchBillsByPatientName(String patientName) {
        return billingRepository.findByPatientNameContainingIgnoreCase(patientName);
    }

    // Get bills by status
    public List<Billing> getBillsByStatus(String status) {
        return billingRepository.findByStatus(status);
    }
}
