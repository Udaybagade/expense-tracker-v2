package org.techhub.expensetrackerrestapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.techhub.expensetrackerrestapi.config.JwtUtil;
import org.techhub.expensetrackerrestapi.dto.LoginRequest;
import org.techhub.expensetrackerrestapi.dto.LoginResponse;
import org.techhub.expensetrackerrestapi.dto.RegisterRequest;
import org.techhub.expensetrackerrestapi.entity.User;
import org.techhub.expensetrackerrestapi.repository.UserRepository;
@Service
public class AuthServiceImpl implements AuthService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String register(RegisterRequest request) {
        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new RuntimeException("Email already exists");
        }

        User user= User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(
                        passwordEncoder.encode( request.getPassword()))
                .role("USER")
                .build();
        userRepository.save(user);
        return "User Registered Successfully";
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getUsername())
                .orElseThrow(()->new RuntimeException("User Not Found"));

        if(! passwordEncoder.matches(request.getPassword(),user.getPassword())){
                throw new RuntimeException("Invalid Password");
        }

        String token = jwtUtil.generateToken(user.getEmail());
        return LoginResponse.builder().token(token).build();

    }


//    @Override
//    public String login(LoginRequest request) {
//        User user = userRepository
//                .findByEmail(request.getUsername())
//                .orElseThrow(()->new RuntimeException("User Not found"));
//
//        boolean matches= passwordEncoder.matches(request.getPassword(),user.getPassword());
//        if(!matches){
//            throw new RuntimeException("Invalid Password");
//        }
//        return "Login Successful";
//    }
}
