package org.techhub.expensetrackerrestapi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.techhub.expensetrackerrestapi.dto.LoginRequest;
import org.techhub.expensetrackerrestapi.dto.LoginResponse;
import org.techhub.expensetrackerrestapi.dto.RegisterRequest;
import org.techhub.expensetrackerrestapi.service.AuthService;

@RestController
@RequestMapping("/api/auth")

public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping
    public String register(@RequestBody RegisterRequest request){
        return authService.register(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request){
        return authService.login(request);
    }

}
