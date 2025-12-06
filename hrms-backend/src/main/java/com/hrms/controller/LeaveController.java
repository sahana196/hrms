package com.hrms.controller;

import com.hrms.model.LeaveRequest;
import com.hrms.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/leaves")
public class LeaveController {

    private final LeaveService leaveService;

    @Autowired
    public LeaveController(LeaveService leaveService) {
        this.leaveService = leaveService;
    }

    @PostMapping("/apply")
    public ResponseEntity<LeaveRequest> applyForLeave(Authentication authentication,
            @RequestBody LeaveRequest leaveRequest) {
        try {
            LeaveRequest createdLeave = leaveService.applyForLeave(authentication.getName(), leaveRequest);
            return new ResponseEntity<>(createdLeave, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/my-leaves")
    public ResponseEntity<List<LeaveRequest>> getMyLeaves(Authentication authentication) {
        return new ResponseEntity<>(leaveService.getMyLeaves(authentication.getName()), HttpStatus.OK);
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN') or hasRole('HR')")
    public ResponseEntity<List<LeaveRequest>> getAllLeaves() {
        return new ResponseEntity<>(leaveService.getAllLeaves(), HttpStatus.OK);
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN') or hasRole('HR')")
    public ResponseEntity<LeaveRequest> updateStatus(@PathVariable Long id,
            @RequestBody Map<String, String> statusUpdate) {
        try {
            String status = statusUpdate.get("status");
            LeaveRequest updatedLeave = leaveService.updateLeaveStatus(id, status);
            return new ResponseEntity<>(updatedLeave, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
