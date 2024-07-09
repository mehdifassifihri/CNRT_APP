package com.example.centralized_tests_back.services;

import com.example.centralized_tests_back.dao.Dao;
import com.example.centralized_tests_back.entities.Parameter;
import com.example.centralized_tests_back.entities.TestCase;
import com.example.centralized_tests_back.repositories.ParameterRepository;
import com.example.centralized_tests_back.repositories.TestCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TestCaseServices implements Dao<TestCase> {
    @Autowired
    TestCaseRepository testCaseRepository;
    @Autowired
    ParameterRepository parameterRepository;

    @Override
    public TestCase add(TestCase testCase) {
        List<Parameter> parameters = parameterRepository.saveAll(testCase.getParameters());
        testCase.setParameters(parameters);
        return testCaseRepository.save(testCase);
    }

    @Override
    public TestCase update(int id, TestCase testCase) {
        return null;
    }

    @Override
    public TestCase delete(int id) {
        return null;
    }

    @Override
    public TestCase findById(int id) {
        return null;
    }

    @Override
    public List<TestCase> findAll() {
        return testCaseRepository.findAll();
    }
}
