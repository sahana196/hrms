package com.hrms.service;

import com.hrms.model.Employee;
import com.hrms.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final EmailService emailService;

    @Autowired
    public EmployeeService(EmployeeRepository employeeRepository, EmailService emailService) {
        this.employeeRepository = employeeRepository;
        this.emailService = emailService;
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Employee createEmployee(Employee employee) {
        // Validation for existing email
        if (employeeRepository.existsByEmail(employee.getEmail())) {
            throw new RuntimeException("Email already exists: " + employee.getEmail());
        }

        // Fix for "Field 'position' doesn't have a default value"
        // If position is not sent by frontend, default it to designation
        if (employee.getPosition() == null || employee.getPosition().isEmpty()) {
            employee.setPosition(employee.getDesignation());
        }

        Employee savedEmployee = employeeRepository.save(employee);

        // Send email notification
        String subject = "Welcome to HRMS";
        String body = "Dear " + savedEmployee.getFirstName() + ",\n\n" +
                "Welcome to the team! Your employee account has been successfully created.\n\n" +
                "Best Regards,\nHR Team";
        emailService.sendEmail(savedEmployee.getEmail(), subject, body);

        return savedEmployee;
    }

    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        // Check if email is being changed to one that already exists
        if (!employee.getEmail().equals(employeeDetails.getEmail()) &&
                employeeRepository.existsByEmail(employeeDetails.getEmail())) {
            throw new RuntimeException("Email already exists: " + employeeDetails.getEmail());
        }
        employee.setEmail(employeeDetails.getEmail());
        employee.setDepartment(employeeDetails.getDepartment());
        employee.setDesignation(employeeDetails.getDesignation());
        employee.setSalary(employeeDetails.getSalary());
        employee.setDateOfJoining(employeeDetails.getDateOfJoining());

        return employeeRepository.save(employee);
    }

    public void deleteEmployee(Long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id: " + id));
        employeeRepository.delete(employee);
    }
}
