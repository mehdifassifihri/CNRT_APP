package com.example.centralized_tests_back.repositories;

import com.example.centralized_tests_back.entities.Parameter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParameterRepository extends JpaRepository<Parameter,Integer> {
}
