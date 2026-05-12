import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";

import AdminDashboard from "../pages/Admin/AdminDashboard";
import LecturerDashboard from "../pages/Instructor/LecturerDashboard";

import AdminLayout from "../components/Layout/AdminLayout";
import StudentList from "../pages/Admin/StudentManagement/StudentList";
import AddStudent from "../pages/Admin/StudentManagement/AddStudent";
import EditStudent from "../pages/Admin/StudentManagement/EditStudent";
import LecturerList from "../pages/Admin/LecturerManagement/LecturerList";
import AddLecturer from "../pages/Admin/LecturerManagement/AddLecturer";
import EditLecturer from "../pages/Admin/LecturerManagement/EditLecturer";
import DepartmentList from "../pages/Admin/DepartmentManagement/DepartmentList";
import AddDepartment from "../pages/Admin/DepartmentManagement/AddDepartment";
import EditDepartment from "../pages/Admin/DepartmentManagement/EditDepartment";
import SubjectList from "../pages/Admin/SubjectManagement/SubjectList";
import AddSubject from "../pages/Admin/SubjectManagement/AddSubject";
import EditSubject from "../pages/Admin/SubjectManagement/EditSubject";
import ClassList from "../pages/Admin/ClassManagement/ClassList";
import AddClass from "../pages/Admin/ClassManagement/AddClass";
import EditClass from "../pages/Admin/ClassManagement/EditClass";
import ClassDetails from "../pages/Admin/ClassManagement/ClassDetails";
import AssignStudent from "../pages/Admin/ClassManagement/AssignStudent";

import SystemStatus from "../pages/Admin/SystemStatus";

import StudentLayout from "../components/Layout/StudentLayout";
import StudentDashboard from "../pages/Student/StudentDashboard";
import StudentClasses from "../pages/Student/ClassManagement/StudentClasses";
import ClassMembers from "../pages/Student/ClassManagement/ClassMembers";
import StudentAssignments from "../pages/Student/AssignmentManagement/StudentAssignments";
import AssignmentDetails from "../pages/Student/AssignmentManagement/AssignmentDetails";
import StudentCourses from "../pages/Student/CourseManagement/StudentCourses";
import StudentUpload from "../pages/Student/AssignmentManagement/StudentUpload";
import StudentGrades from "../pages/Student/AssignmentManagement/StudentGrades";
import StudentProfile from "../pages/Student/Profile/StudentProfile";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="status" element={<SystemStatus />} />
        <Route path="students" element={<StudentList />} />
        <Route path="students/add" element={<AddStudent />} />
        <Route path="students/edit/:id" element={<EditStudent />} />
        
        <Route path="lecturers" element={<LecturerList />} />
        <Route path="lecturers/add" element={<AddLecturer />} />
        <Route path="lecturers/edit/:id" element={<EditLecturer />} />

        <Route path="departments" element={<DepartmentList />} />
        <Route path="departments/add" element={<AddDepartment />} />
        <Route path="departments/edit/:id" element={<EditDepartment />} />

        <Route path="subjects" element={<SubjectList />} />
        <Route path="subjects/add" element={<AddSubject />} />
        <Route path="subjects/edit/:id" element={<EditSubject />} />

        <Route path="classes" element={<ClassList />} />
        <Route path="classes/:id" element={<ClassDetails />} />
        <Route path="classes/add" element={<AddClass />} />
        <Route path="classes/edit/:id" element={<EditClass />} />
        <Route path="classes/assign" element={<AssignStudent />} />
      </Route>

      <Route
        path="/student"
        element={<StudentLayout />}
      >
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="class" element={<StudentClasses />} />
        <Route path="class/:classId/members" element={<ClassMembers />} />
        <Route path="assignments" element={<StudentAssignments />} />
        <Route path="assignments/:id" element={<AssignmentDetails />} />
        <Route path="assignments/upload" element={<StudentUpload />} />
        <Route path="assignments/grades" element={<StudentGrades />} />
        <Route path="courses" element={<StudentCourses />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      <Route
        path="/lecturer/*"
        element={<LecturerDashboard />}
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
