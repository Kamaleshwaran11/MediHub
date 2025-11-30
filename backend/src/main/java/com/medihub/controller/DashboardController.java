package com.medihub.controller;

import com.medihub.model.Appointment;
import com.medihub.model.Billing;
import com.medihub.repository.AppointmentRepository;
import com.medihub.repository.BillingRepository;
import com.medihub.repository.DoctorRepository;
import com.medihub.repository.PatientRepository;
import com.medihub.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET})
public class DashboardController {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private DoctorRepository doctorRepository;

    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private BillingRepository billingRepository;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> out = new HashMap<>();

        long totalPatients = patientRepository.count();
        long totalDoctors = doctorRepository.count();
        long totalStaff = staffRepository.count();

        // Today's appointments
        LocalDate today = LocalDate.now();
        long todayAppointments = appointmentRepository.findAll().stream()
                .filter(a -> a.getAppointmentDate() != null && a.getAppointmentDate().toLocalDate().equals(today))
                .count();

        // Monthly revenue (current month)
        YearMonth currentMonth = YearMonth.now();
        BigDecimal monthlyRevenue = billingRepository.findAll().stream()
                .filter(b -> b.getBillDate() != null && YearMonth.from(b.getBillDate()).equals(currentMonth))
                .map(Billing::getAmount)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        out.put("totalPatients", totalPatients);
        out.put("totalDoctors", totalDoctors);
        out.put("totalStaff", totalStaff);
        out.put("todayAppointments", todayAppointments);
        out.put("monthlyRevenue", monthlyRevenue);

        // Patient activity and revenue over last 6 months
        List<String> labels = new ArrayList<>();
        List<Long> patientActivityData = new ArrayList<>();
        List<BigDecimal> revenueData = new ArrayList<>();

        YearMonth cursor = YearMonth.now().minusMonths(5);
        for (int i = 0; i < 6; i++) {
            final YearMonth ym = cursor.plusMonths(i);
            labels.add(ym.getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH));

            final YearMonth finalYm = ym;
            long appointmentsCount = appointmentRepository.findAll().stream()
                    .filter(a -> a.getAppointmentDate() != null && YearMonth.from(a.getAppointmentDate().toLocalDate()).equals(finalYm))
                    .count();
            patientActivityData.add(appointmentsCount);

            BigDecimal revenueSum = billingRepository.findAll().stream()
                    .filter(b -> b.getBillDate() != null && YearMonth.from(b.getBillDate()).equals(finalYm))
                    .map(Billing::getAmount)
                    .filter(Objects::nonNull)
                    .reduce(BigDecimal.ZERO, BigDecimal::add);
            revenueData.add(revenueSum);
        }

        Map<String, Object> patientActivity = new HashMap<>();
        patientActivity.put("labels", labels);
        patientActivity.put("data", patientActivityData);

        Map<String, Object> revenue = new HashMap<>();
        revenue.put("labels", labels);
        revenue.put("data", revenueData);

        out.put("patientActivity", patientActivity);
        out.put("revenue", revenue);

        // Appointments breakdown: upcoming vs past vs cancelled (no cancelled field -> assume 0)
        long upcoming = appointmentRepository.findAll().stream()
                .filter(a -> a.getAppointmentDate() != null && a.getAppointmentDate().toLocalDate().isAfter(today))
                .count();
        long completed = appointmentRepository.findAll().stream()
                .filter(a -> a.getAppointmentDate() != null && a.getAppointmentDate().toLocalDate().isBefore(today))
                .count();
        long cancelled = 0L;
        Map<String, Long> appointments = new HashMap<>();
        appointments.put("scheduled", upcoming);
        appointments.put("completed", completed);
        appointments.put("cancelled", cancelled);

        out.put("appointments", appointments);

        return ResponseEntity.ok(out);
    }

    @GetMapping("/activity")
    public ResponseEntity<List<Map<String,Object>>> getActivity() {
        List<Map<String,Object>> activity = new ArrayList<>();

        // Recent appointments
        List<Map<String,Object>> appts = appointmentRepository.findAll().stream()
                .sorted(Comparator.comparing(Appointment::getAppointmentDate).reversed())
                .limit(8)
                .map(a -> {
                    Map<String,Object> m = new HashMap<>();
                    m.put("type", "APPOINTMENT");
                    m.put("title", "Appointment: " + a.getPatientName());
                    m.put("timestamp", a.getAppointmentDate());
                    m.put("description", "With Dr. " + (a.getDoctor() != null ? a.getDoctor().getName() : "N/A"));
                    return m;
                })
                .collect(Collectors.toList());

        activity.addAll(appts);

        // Recent bills
        List<Map<String,Object>> bills = billingRepository.findAll().stream()
                .sorted(Comparator.comparing(Billing::getBillDate).reversed())
                .limit(6)
                .map(b -> {
                    Map<String,Object> m = new HashMap<>();
                    m.put("type", "BILLING");
                    m.put("title", "Invoice: " + b.getInvoiceNumber());
                    m.put("timestamp", b.getBillDate());
                    m.put("description", "Amount: " + (b.getAmount() != null ? b.getAmount().toString() : "0"));
                    return m;
                })
                .collect(Collectors.toList());

        activity.addAll(bills);

        // Trim to 12 items and sort by timestamp desc
        List<Map<String,Object>> finalActivity = activity.stream()
                .sorted((a,b) -> {
                    Object ta = a.get("timestamp");
                    Object tb = b.get("timestamp");
                    if (ta == null && tb == null) return 0;
                    if (ta == null) return 1;
                    if (tb == null) return -1;
                    return -((Comparable)ta).compareTo(tb);
                })
                .limit(12)
                .collect(Collectors.toList());

        return ResponseEntity.ok(finalActivity);
    }
}
