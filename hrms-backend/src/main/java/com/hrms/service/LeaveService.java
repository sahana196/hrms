package com.hrms.service;

import com.hrms.model.LeaveRequest;
import com.hrms.model.UserEntity;
import com.hrms.repository.LeaveRepository;
import com.hrms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveService {

    private final LeaveRepository leaveRepository;
    private final UserRepository userRepository;
    private final EmailService emailService;

    @Autowired
    public LeaveService(LeaveRepository leaveRepository, UserRepository userRepository, EmailService emailService) {
        this.leaveRepository = leaveRepository;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    public LeaveRequest applyForLeave(String username, LeaveRequest leaveRequest) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        leaveRequest.setUser(user);
        leaveRequest.setStatus("PENDING");

        return leaveRepository.save(leaveRequest);
    }

    public List<LeaveRequest> getMyLeaves(String username) {
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return leaveRepository.findByUserOrderByStartDateDesc(user);
    }

    public List<LeaveRequest> getAllLeaves() {
        return leaveRepository.findAllByOrderByStartDateDesc();
    }

    public LeaveRequest updateLeaveStatus(Long id, String status) {
        LeaveRequest leave = leaveRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leave request not found"));

        leave.setStatus(status.toUpperCase());
        // Here we can trigger email notification later

        return leaveRepository.save(leave);
    }
}
