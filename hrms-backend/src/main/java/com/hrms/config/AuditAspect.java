package com.hrms.config;

import com.hrms.model.AuditLog;
import com.hrms.repository.AuditLogRepository;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Aspect
@Component
public class AuditAspect {

    private final AuditLogRepository auditLogRepository;

    @Autowired
    public AuditAspect(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    // Log Employee Creation/Update
    @AfterReturning(pointcut = "execution(* com.hrms.service.EmployeeService.create*(..)) || execution(* com.hrms.service.EmployeeService.update*(..))")
    public void logEmployeeChanges(JoinPoint joinPoint) {
        saveLog(joinPoint.getSignature().getName(), "Employee modified");
    }

    // Log Leave Application
    @AfterReturning(pointcut = "execution(* com.hrms.service.LeaveService.apply*(..))")
    public void logLeaveApplication(JoinPoint joinPoint) {
        saveLog("Apply Leave", "Leave request submitted");
    }

    // Log Attendance
    @AfterReturning(pointcut = "execution(* com.hrms.service.AttendanceService.clock*(..))")
    public void logAttendance(JoinPoint joinPoint) {
        saveLog(joinPoint.getSignature().getName(), "Attendance action recorded");
    }

    // Log Login
    // Note: Logins are harder to catch with AOP on service if handled by
    // AuthManager directly,
    // but we can catch successful authentication if we wrapped it or use events.
    // For simplicity, let's stick to business actions for now.

    private void saveLog(String action, String details) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = (auth != null && auth.isAuthenticated()) ? auth.getName() : "Anonymous";

        AuditLog log = new AuditLog(username, action, details, LocalDateTime.now());
        auditLogRepository.save(log);
    }
}
