export default function SaveToCalendarButton({ schedule }) {
    const handleSave = () => {
      const calendarData = schedule.map((time, index) => {
        return `BEGIN:VEVENT
  SUMMARY:Dose ${index + 1}
  DTSTART;TZID=UTC:${time.replace(':', '')}Z
  END:VEVENT`;
      }).join('\n');
  
      const calendarFile = `BEGIN:VCALENDAR
  VERSION:2.0
  ${calendarData}
  END:VCALENDAR`;
  
      const blob = new Blob([calendarFile], { type: 'text/calendar' });
      const url = URL.createObjectURL(blob);
  
      const a = document.createElement('a');
      a.href = url;
      a.download = 'medication_schedule.ics';
      a.click();
  
      URL.revokeObjectURL(url);
    };
  
    return (
      <button
        onClick={handleSave}
        className="bg-green-500 text-white w-full py-2 rounded mt-4 hover:bg-green-600"
      >
        Salvar na Agenda
      </button>
    );
  }
  