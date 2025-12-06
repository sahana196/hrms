package com.hrms.repository;

import com.hrms.model.LeaveRequest;
import com.hrms.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LeaveRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByUserOrderByStartDateDesc(UserEntity user);

    List<LeaveRequest> findAllByOrderByStartDateDesc(); // For Admin view
}
