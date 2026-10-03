package com.medihub.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public class DoctorRequestDTO {
    //Basic Information for Doctor Details
    @NotBlank(message="Name is mandatory")
    private String name;

    private LocalDate dateOfBirth;

    private String gender;

    // Contact Information
    @NotBlank(message = "Mobile number is required")
    private String mobileNumber;

    @Email(message = "Invalid email format")
    private String email;

    private String address;

    private String city;

    private String state;

    private String pinCode;

    // Professional Information
    @NotBlank(message = "Specialization is required")
    private String specialization;

    private String qualification;

    private Integer experienceYears;

    @NotBlank(message = "License number is required")
    private String licenseNumber;

    private String department;

    // Professional / Business Information
    private Double consultationFee;

    private LocalDate joiningDate;

    private String status;


    // Getters
    public String getName() {
        return name;
    }

    public LocalDate getDateOfBirth() {
        return dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public String getPhone() {
        return mobileNumber;
    }

    public String getEmail() {
        return email;
    }
    public String getAddress() {
        return address;
    }

    public String getCity() {
        return city;
    }

    public String getState() {
        return state;
    }

    public String getPinCode() {
        return pinCode;
    }

    public String getSpecialization() {
        return specialization;
    }

    public String getQualification() {
        return qualification;
    }

    public Integer getExperienceYears() {
        return experienceYears;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public String getDepartment() {
        return department;
    }

    public Double getConsultationFee() {
        return consultationFee;
    }

    public LocalDate getJoiningDate() {
        return joiningDate;
    }

    public String getStatus() {
        return status;
    }


    // Setters

    public void setName(String name) {
        this.name = name;
    }

    public void setDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setState(String state) {
        this.state = state;
    }

    public void setPinCode(String pinCode) {
        this.pinCode = pinCode;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public void setExperienceYears(Integer experienceYears) {
        this.experienceYears = experienceYears;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setConsultationFee(Double consultationFee) {
        this.consultationFee = consultationFee;
    }

    public void setJoiningDate(LocalDate joiningDate) {
        this.joiningDate = joiningDate;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
