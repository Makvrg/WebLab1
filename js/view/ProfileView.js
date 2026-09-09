// js/view/ProfileView.js
export class ProfileView {
    /**
     * Отображает досье студента
     * @param {Student|null} student
     */
    render(student) {
        if (!student) {
            const fioEl = document.getElementById("profile-fio");
            if (fioEl) fioEl.textContent = "Студент не найден";
            return;
        }

        document.getElementById("profile-fio").textContent = student.fio;
        document.getElementById("profile-isu").textContent = student.isuId;
        document.getElementById("profile-stGroup").textContent = student.stGroup;
        document.getElementById("profile-dorm").textContent = student.dormitoryNumber;

        // Форматируем дату в привычный формат DD.MM.YYYY
        if (student.dateOfPlacement) {
            const dateObj = new Date(student.dateOfPlacement);
            document.getElementById("profile-date").textContent = dateObj.toLocaleDateString("ru-RU");
        } else {
            document.getElementById("profile-date").textContent = "-";
        }

        document.getElementById("profile-foreigner").textContent = student.isNotRussian ? "Да" : "Нет";
        document.getElementById("profile-notes").textContent = student.notes ? student.notes : "Нет заметок";
    }
}
