package com.example.college_managment.controller;

import com.example.college_managment.entity.Student;
import com.example.college_managment.repository.StudentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin("*")
@RestController
public class StudentController {

    @Autowired
    private StudentRepository studentRepository;

    @PostMapping("/students")
    public Student addStudent(@RequestBody Student student) {

        return studentRepository.save(student);
    }

    @GetMapping("/students")
    public List<Student> getStudents() {

        return studentRepository.findAll();
    }

    @PutMapping("/students/{id}")
    public Student updateStudent(
            @PathVariable Long id,
            @RequestBody Student student) {

        Student existingStudent =
                studentRepository.findById(id).get();

        existingStudent.setName(student.getName());

        existingStudent.setAge(student.getAge());

        return studentRepository.save(existingStudent);
    }

    @DeleteMapping("/students/{id}")
    public String deleteStudent(@PathVariable Long id) {

        studentRepository.deleteById(id);

        return "Student Deleted Successfully";
    }
}