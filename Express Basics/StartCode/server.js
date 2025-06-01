// server.js
import express from "express";
import courses from "./course.js";
import loggerMiddleware from "../middleWare/logger-middleware.js";
import validateQueryMiddleware from "../middleWare/validateQuery.js";
const app = express();
const PORT = 3000;

app.use(loggerMiddleware);

// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses',validateQueryMiddleware, (req, res) => {   
    const { dept } = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;
    // Implementing the filter logic
    // Hint: Use the filter method to filter the courses array based on the provided criteria
    
    let filteredCourses = courses.filter(course => course.department === dept);
    if(level) {
        filteredCourses = filteredCourses.filter(course => course.level === level);
    }
    if(minCredits) {
        filteredCourses = filteredCourses.filter(course => course.credits >= minCredits);
    }
    if(maxCredits) {
        filteredCourses = filteredCourses.filter(course => course.credits <= maxCredits);
    }
    if(semester) {
        filteredCourses = filteredCourses.filter(course => course.semester === semester);
    }
    if(instructor) {
        filteredCourses = filteredCourses.filter(course => course.instructor === instructor);
    }

    console.log(dept);
    console.log(level, minCredits, maxCredits, semester, instructor);

    res.json(filteredCourses);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
