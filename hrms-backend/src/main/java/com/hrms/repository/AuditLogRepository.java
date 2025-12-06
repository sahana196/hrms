package com.hrms.repository;

import com.hrms.model.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    // Can add methods to find logs by user or date
}
