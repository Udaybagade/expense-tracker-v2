package org.techhub.expensetrackerrestapi.service;

import org.techhub.expensetrackerrestapi.dto.LoginRequest;
import org.techhub.expensetrackerrestapi.dto.LoginResponse;
import org.techhub.expensetrackerrestapi.dto.RegisterRequest;

public interface AuthService {

    String register(RegisterRequest request);

    LoginResponse login(LoginRequest request);

}
