import { saveAs } from 'file-saver'; // Para salvar o arquivo no navegador

export default function SaveToCalendarButton({ schedule }) {
  const handleSaveToCalendar = () => {
    if (!schedule || schedule.length === 0) {
      alert('Nenhum horário para salvar.');
      return;
    }

    // Criação do conteúdo do arquivo ICS
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:-//MediCalc//Calendário//EN\n`;

    schedule.forEach(({ day, times }) => {
      times.forEach((time) => {
        const [hour, minute] = time.split(':');
        const startTime = new Date();
        startTime.setHours(hour, minute, 0);

        const endTime = new Date(startTime.getTime() + 30 * 60 * 1000); // Evento de 30 minutos
        const startDate = startTime.toISOString().replace(/[-:]/g, '').split('.')[0];
        const endDate = endTime.toISOString().replace(/[-:]/g, '').split('.')[0];

        icsContent += `BEGIN:VEVENT
DTSTART:${startDate}Z
DTEND:${endDate}Z
SUMMARY:Dose do Medicamento
DESCRIPTION:Horário para tomar o remédio.
END:VEVENT\n`;
      });
    });

    icsContent += 'END:VCALENDAR';

    // Salvar o arquivo no dispositivo
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    saveAs(blob, 'medication_schedule.ics');
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
