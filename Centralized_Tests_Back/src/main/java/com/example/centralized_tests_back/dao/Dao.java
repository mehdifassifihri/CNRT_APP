package com.example.centralized_tests_back.dao;

import java.util.List;

public interface Dao<T> {
    public T add(T o);

    public T update(int id, T o);

    public T delete(int id);

    public T findById(int id);

    public List<T> findAll();
}
