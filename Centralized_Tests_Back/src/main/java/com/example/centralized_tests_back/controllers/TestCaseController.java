package com.example.centralized_tests_back.controllers;

import com.example.centralized_tests_back.entities.TestCase;
import com.example.centralized_tests_back.services.TestCaseServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/testcase")
@CrossOrigin()
public class TestCaseController {
    @Autowired
    TestCaseServices testCaseServices;

    @GetMapping()
    public ResponseEntity<List<TestCase>> getAllTestCases(){
        List<TestCase> testCases = testCaseServices.findAll();
        return new ResponseEntity<>(testCases,HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<TestCase> addTestCase(@RequestBody TestCase testCase){
        TestCase testCase1 = testCaseServices.add(testCase);
        return new ResponseEntity<>(testCase1, HttpStatus.CREATED);
    }
}
