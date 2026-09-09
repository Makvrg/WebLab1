// js/view/FormView.js
import { Student } from "../entity/Student.js";

export class FormView {
    /**
     * @param {string} formSelector 
     * @param {Function} onSubmitCallback (student: Student, isEditMode: boolean) => void
     */
    constructor(formSelector, onSubmitCallback) {
        this.form = document.querySelector(formSelector);
        this.onSubmitCallback = onSubmitCallback;
        this.isEditMode = false;

        if (this.form) {
            this.#initEvents();
        }
    }

    /**
     * Собирает данные полей и возвращает новый объект Student
     * @returns {Student}
     */
    getFormData() {
        return new Student(
            document.getElementById("isu").value,
            document.getElementById("fio").value,
            document.getElementById("group").value,
            document.getElementById("dorm").value,
            document.getElementById("date").value,
            document.getElementById("foreigner").checked,
            document.getElementById("notes").value
        );
    }

    /**
     * Заполняет форму данными студента
     * @param {Student} student 
     */
    fillForm(student) {
        this.isEditMode = true;
        
        document.getElementById("isu").value = student.isuId;
        document.getElementById("isu").readOnly = true; // Запрещаем редактировать ИСУ
        document.getElementById("fio").value = student.fio;
        document.getElementById("group").value = student.stGroup;
        document.getElementById("dorm").value = student.dormitoryNumber;
        document.getElementById("date").value = student.dateOfPlacement;
        document.getElementById("foreigner").checked = student.isNotRussian;
        document.getElementById("notes").value = student.notes || "";

        const titleEl = document.getElementById("form-title");
        const submitBtn = document.getElementById("submit-btn");

        if (titleEl) titleEl.textContent = "Редактирование студента";
        if (submitBtn) submitBtn.textContent = "Сохранить изменения";
    }

    #initEvents() {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            const student = this.getFormData();
            this.onSubmitCallback(student, this.isEditMode);
        });
    }
}
