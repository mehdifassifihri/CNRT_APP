package com.example.centralized_tests_back.repositories;

import com.example.centralized_tests_back.entities.TestCase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TestCaseRepository extends JpaRepository<TestCase,Integer> {
}
