module.exports.generateScheduleTable = function (classSubjects) {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const timetable = [['subject', ...days]];

    classSubjects.forEach(subject => {
        const row = [subject.name];

        days.forEach(day => {
            const schedule = subject.schedule.find(s => s.day === day);
            if (schedule) {
                const teacherName = subject.teacher ? subject.teacher.userInfo.fullName : '';
                row.push(`${schedule.slot}  (${teacherName}`);
            } else {
                row.push('-');
            }
        });

        timetable.push(row);
    });

    return timetable;
}