export default function SaveToCalendarButton({ schedule, startDate }) {
  const handleSaveToCalendar = () => {
    if (!schedule || schedule.length === 0) {
      alert('Nenhum horário para salvar.');
      return;
    }

    const startDateObj = new Date(startDate);  // Usar a data inicial fornecida
    let icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//MediCalc//EN
`;

    schedule.forEach(({ day, times }) => {
      const eventDate = new Date(startDateObj);
      eventDate.setDate(startDateObj.getDate() + day);

      times.forEach((time) => {
        const [hour, minute] = time.split(':');
        const eventStart = new Date(eventDate);
        eventStart.setHours(hour, minute, 0);

        const eventEnd = new Date(eventStart);
        eventEnd.setMinutes(eventEnd.getMinutes() + 30); // 30 minutos de duração

        icsContent += `
BEGIN:VEVENT
UID:${Math.random().toString(36).substring(2)}
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${eventStart.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${eventEnd.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:Tomar Remédio
DESCRIPTION:Lembrete para tomar o remédio conforme horários calculados.
END:VEVENT
`;
      });
    });

    icsContent += `
END:VCALENDAR
`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'medicamento.ics';
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleSaveToCalendar}
      className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600 mt-4"
    >
      Salvar na Agenda
    </button>
  );
}
