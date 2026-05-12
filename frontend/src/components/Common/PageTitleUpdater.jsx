import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const titleMap = {
"/": "Homepage | SIMS",
"/login": "Login | SIMS",
"/admin/dashboard": "Dashboard | Admin",
"/admin/status": "System Status | Admin",
"/admin/students": "Manage Students | Admin",
"/admin/students/add": "Add Student | Admin",
"/admin/lecturers": "Manage Faculty | Admin",
"/admin/lecturers/add": "Add Faculty | Admin",
"/admin/departments": "Manage Departments | Admin",
"/admin/departments/add": "Add Department | Admin",
"/admin/subjects": "Manage Subjects | Admin",
"/admin/subjects/add": "Add Subject | Admin",
"/admin/classes": "Manage Classes | Admin",
"/admin/classes/add": "Add Class | Admin",
"/admin/classes/assign": "Student Assignments | Admin",
"/student/dashboard": "Dashboard | Students",
"/lecturer/dashboard": "Dashboard | Lecturers",
};

const PageTitleUpdater = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Exact match
    if (titleMap[pathname]) {
      document.title = titleMap[pathname];
      return;
    }

    // Dynamic routes handling
    if (pathname.includes("/students/edit/")) {
      document.title = "Sửa sinh viên | Admin";
    } else if (pathname.includes("/lecturers/edit/")) {
      document.title = "Sửa giảng viên | Admin";
    } else if (pathname.includes("/departments/edit/")) {
      document.title = "Sửa khoa | Admin";
    } else if (pathname.includes("/subjects/edit/")) {
      document.title = "Sửa môn học | Admin";
    } else if (pathname.includes("/classes/edit/")) {
      document.title = "Sửa lớp học | Admin";
    } else if (pathname.match(/^\/admin\/classes\/[^/]+$/)) {
      document.title = "Chi tiết lớp học | Admin";
    } else if (pathname.startsWith("/student")) {
      document.title = "Sinh viên | SIMS";
    } else if (pathname.startsWith("/lecturer")) {
      document.title = "Giảng viên | SIMS";
    } else {
      document.title = "SIMS - Student Information Management System";
    }
  }, [pathname]);

  return null;
};

export default PageTitleUpdater;
