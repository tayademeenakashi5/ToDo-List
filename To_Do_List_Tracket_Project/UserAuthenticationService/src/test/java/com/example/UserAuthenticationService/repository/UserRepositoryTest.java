package com.example.UserAuthenticationService.repository;

import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.example.UserAuthenticationService.domain.User;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {
    @Autowired
    private UserRepository userRepository;

    private User user;

    @BeforeEach
    public void setUp() throws Exception {
        user = new User("jay@gmail.com", "112");

    }
    @AfterEach
    public void tearDown() throws Exception {
        user = null;

    }


    @Test
    public void testSaveUserSuccess() {
        userRepository.save(user);
        User object = userRepository.findById(user.getEmailId()).get();
        assertEquals(user.getEmailId(), object.getEmailId());
    }

    @Test
    public void testLoginUserSuccess() {
        userRepository.save(user);
        User object = userRepository.findById(user.getEmailId()).get();
        assertEquals(user.getEmailId(), object.getEmailId());
    }
}


