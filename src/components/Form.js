import { useState } from "react";

export default function Form({ onSubmit }) {
  const [medicationName, setMedicationName] = useState("");
  const [dosage, setDosage] = useState("");
  const [interval, setInterval] = useState("");
  const [startDate, setStartDate] = useState(""); // Novo estado para a data inicial
  const [days, setDays] = useState(1);
  const [schedule, setSchedule] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!medicationName || !interval || !startDate) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    // Converter a data inicial para Date
    const start = new Date(startDate);
    const newSchedule = [];

    for (let i = 0; i < days; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i); // Calcular o dia subsequente

      const times = [];
      let time = start;
      while (time <= day.setHours(23, 59, 59)) {
        times.push(time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
        time = new Date(time).setMinutes(time.getMinutes() + parseInt(interval));
      }

      newSchedule.push({ day: i, times });
    }

    setSchedule(newSchedule);
    onSubmit(newSchedule);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="medicationName" className="block">Nome do Remédio</label>
        <input
          type="text"
          id="medicationName"
          value={medicationName}
          onChange={(e) => setMedicationName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="dosage" className="block">Dosagem (opcional)</label>
        <input
          type="text"
          id="dosage"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="interval" className="block">Intervalo (em horas)</label>
        <input
          type="number"
          id="interval"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="startDate" className="block">Data Inicial</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label htmlFor="days" className="block">Quantidade de dias</label>
        <input
          type="number"
          id="days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          min="1"
          className="w-full px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Calcular Horários
      </button>
    </form>
  );
}
