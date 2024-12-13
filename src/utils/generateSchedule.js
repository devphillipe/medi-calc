/**
 * Gera os horários com base no intervalo, hora da primeira dose e número de dias.
 *
 * @param {number} interval - Intervalo entre as doses (em horas).
 * @param {string} firstDose - Hora da primeira dose no formato HH:mm.
 * @param {number} days - Número de dias de tratamento (opcional).
 * @returns {object[]} - Lista de objetos agrupados por dia.
 */
export default function generateSchedule(interval, firstDose, days = 1) {
  const schedule = [];
  const intervalMs = interval * 60 * 60 * 1000; // Converte o intervalo para milissegundos
  const startTime = new Date(`1970-01-01T${firstDose}:00`); // Base inicial do horário

  for (let day = 1; day <= days; day++) {
    const daySchedule = [];
    for (let i = 0; i < 24 / interval; i++) {
      const nextDose = new Date(startTime.getTime() + i * intervalMs + (day - 1) * 24 * 60 * 60 * 1000);
      daySchedule.push(nextDose.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
    schedule.push({ day, times: daySchedule });
  }

  return schedule;
}
