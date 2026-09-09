// js/view/TableView.js
export class TableView {
    /**
     * @param {string} tbodySelector 
     * @param {Function} onDeleteCallback (isuId: string|number) => void
     */
    constructor(tbodySelector, onDeleteCallback) {
        this.tbody = document.querySelector(tbodySelector);
        this.onDeleteCallback = onDeleteCallback;

        if (this.tbody) {
            this.#initEvents();
        }
    }

    render(students) {
        if (!this.tbody) return;
        this.tbody.innerHTML = "";

        if (students.length === 0) {
            this.tbody.innerHTML = `<tr><td colspan="5" style="text-align: center;">Студентов пока нет</td></tr>`;
            return;
        }

        students.forEach(student => {
            const tr = document.createElement("tr");
            tr.dataset.isuId = student.isuId;

            tr.innerHTML = `
                <td>${student.isuId}</td>
                <td>${student.fio}</td>
                <td>${student.stGroup}</td>
                <td>${student.dormitoryNumber}</td>
                <td class="actions">
                    <a href="student.html?id=${student.isuId}" class="btn btn-small">Просмотр</a>
                    <a href="form.html?id=${student.isuId}" class="btn btn-small btn-primary">Изменить</a>
                    <button class="btn btn-small btn-danger btn-delete">Удалить</button>
                </td>
            `;
            this.tbody.appendChild(tr);
        });
    }

    #initEvents() {
        this.tbody.addEventListener("click", (event) => {
            if (event.target.classList.contains("btn-delete")) {
                const tr = event.target.closest("tr");
                if (tr && tr.dataset.isuId) {
                    this.onDeleteCallback(tr.dataset.isuId);
                }
            }
        });
    }
}
