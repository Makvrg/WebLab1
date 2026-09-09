// js/app.js
import { StorageRepository } from "./repository/StorageRepository.js";
import { TableView } from "./view/TableView.js";
import { FormView } from "./view/FormView.js";
import { ProfileView } from "./view/ProfileView.js";

document.addEventListener("DOMContentLoaded", () => {
    /** @type {StorageRepository} */
    const repo = StorageRepository.getInstance();
    
    // Получаем ID из параметров URL (?id=343434)
    const urlParams = new URLSearchParams(window.location.search);
    const targetId = urlParams.get("id");

    // 1. Страница списка (index.html)
    if (document.getElementById("students-table")) {
        const tableView = new TableView("#table-body", (isuId) => {
            if (confirm("Вы уверены, что хотите удалить студента?")) {
                repo.deleteStudent(isuId);
                tableView.render(repo.readStudents());
            }
        });
        tableView.render(repo.readStudents());
    }

    // 2. Страница формы (form.html)
    if (document.getElementById("student-form")) {
        const formView = new FormView("#student-form", (student, isEditMode) => {
            if (isEditMode) {
                repo.updateStudent(student);
            } else {
                repo.addStudent(student);
            }
            window.location.href = "index.html"; // Возврат к списку
        });

        if (targetId) {
            const student = repo.readStudents().find(s => Number(s.isuId) === Number(targetId));
            if (student) {
                formView.fillForm(student);
            }
        }
    }

    // 3. Страница карточки студента (student.html)
    if (document.querySelector(".profile-card")) {
        const profileView = new ProfileView();
        const student = repo.readStudents().find(s => Number(s.isuId) === Number(targetId));
        profileView.render(student);
    }
});
