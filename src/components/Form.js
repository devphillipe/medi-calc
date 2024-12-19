import { useState } from 'react';
import ScheduleTable from './ScheduleTable';
import SaveToCalendarButton from './SaveToCalendarButton';

export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    interval: '',
    firstDose: '',
    days: '',
  });

  const [schedule, setSchedule] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, interval, firstDose, days } = formData;

    if (!name || !interval || !firstDose || !days) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const generatedSchedule = generateSchedule(interval, firstDose, days);
    setSchedule(generatedSchedule);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-96">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Nome do Remédio</label>
          <input
            type="text"
            name="name"
            className="w-full border rounded p-2"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Dosagem (opcional)</label>
          <input
            type="text"
            name="dosage"
            className="w-full border rounded p-2"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Intervalo (em horas)</label>
          <input
            type="number"
            name="interval"
            className="w-full border rounded p-2"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Primeira Dose</label>
          <input
            type="time"
            name="firstDose"
            className="w-full border rounded p-2"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Quantos dias?</label>
          <input
            type="number"
            name="days"
            className="w-full border rounded p-2"
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
        >
          Calcular Horários
        </button>
      </form>

      {schedule.length > 0 && (
        <>
          <ScheduleTable schedule={schedule} />
          <SaveToCalendarButton schedule={schedule} />
        </>
      )}
    </div>
  );
}

function generateSchedule(interval, firstDose, days) {
  const schedule = [];
  const intervalMs = interval * 60 * 60 * 1000; // Converte para milissegundos
  const startTime = new Date(`1970-01-01T${firstDose}:00`);
  
  for (let i = 0; i < days * 24 / interval; i++) {
    const nextDose = new Date(startTime.getTime() + i * intervalMs);
    schedule.push(nextDose.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }

  return schedule;
}
