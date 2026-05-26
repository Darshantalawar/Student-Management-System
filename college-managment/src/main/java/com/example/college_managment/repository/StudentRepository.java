package com.example.college_managment.repository;

import com.example.college_managment.entity.Student;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository

        extends JpaRepository<Student, Long> {

}
