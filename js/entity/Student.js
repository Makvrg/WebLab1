export class Student {

    isuId;
    fio;
    stGroup;
    dormitoryNumber;
    dateOfPlacement;
    isNotRussian;
    notes;

    constructor(isuId, fio, group, dormitoryNumber,
                dateOfPlacement, isNotRussian, notes) {
        this.isuId = isuId;
        this.fio = fio;
        this.stGroup = group;
        this.dormitoryNumber = dormitoryNumber;
        this.dateOfPlacement = dateOfPlacement;
        this.isNotRussian = isNotRussian;
        this.notes = notes;
    }

    static fromJSON(rawData) {
    if (!rawData) return null;

    return new Student(
        rawData.isuId,
        rawData.fio,
        rawData.stGroup,
        rawData.dormitoryNumber,
        rawData.dateOfPlacement,
        rawData.isNotRussian,
        rawData.notes
    );
    }

    toJSON() {
        return {
            isuId: this.isuId,
            fio: this.fio,
            group: this.stGroup,
            dormitoryNumber: this.dormitoryNumber,
            dateOfPlacement: this.dateOfPlacement,
            isNotRussian: this.isNotRussian,
            notes: this.notes
        };
    }
}