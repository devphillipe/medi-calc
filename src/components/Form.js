import { useState } from 'react';
import ScheduleTable from './ScheduleTable';
import SaveToCalendarButton from './SaveToCalendarButton';
import generateSchedule from '@/utils/generateSchedule';

export default function Form() {
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    interval: '',
    firstDose: '',
    days: '', // Agora opcional
  });

  const [schedule, setSchedule] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, interval, firstDose, days } = formData;

    if (!name || !interval || !firstDose) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const generatedSchedule = generateSchedule(interval, firstDose, days || 1);
    setSchedule(generatedSchedule);
  };

  return (
    <div className="bg-white p-6 rounded shadow-md w-96">
      <h1 className="text-3xl font-semibold text-center mb-6 text-green-600">
        <span className="text-red-600">Medi</span>Calc
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 font-semibold">
            Nome do Remédio
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="w-full border rounded p-2"
            onChange={handleChange}
            placeholder="Nome do remédio"
            aria-label="Nome do remédio"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dosage" className="block mb-1 font-semibold">
            Dosagem (opcional)
          </label>
          <input
            id="dosage"
            type="text"
            name="dosage"
            className="w-full border rounded p-2"
            onChange={handleChange}
            placeholder="Ex: 500mg"
            aria-label="Dosagem do remédio"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="interval" className="block mb-1 font-semibold">
            Intervalo (em horas)
          </label>
          <input
            id="interval"
            type="number"
            name="interval"
            className="w-full border rounded p-2"
            onChange={handleChange}
            placeholder="Ex: 6"
            aria-label="Intervalo entre as doses"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="firstDose" className="block mb-1 font-semibold">
            Primeira Dose
          </label>
          <input
            id="firstDose"
            type="time"
            name="firstDose"
            className="w-full border rounded p-2"
            onChange={handleChange}
            aria-label="Hora da primeira dose"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="days" className="block mb-1 font-semibold">
            Quantos dias? (opcional)
          </label>
          <input
            id="days"
            type="number"
            name="days"
            className="w-full border rounded p-2"
            onChange={handleChange}
            placeholder="Ex: 7"
            aria-label="Quantidade de dias de tratamento"
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
