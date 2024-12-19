import React, { useState } from 'react';

export default function Form({ onSubmit }) {
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [interval, setInterval] = useState('');
  const [startTime, setStartTime] = useState('');
  const [days, setDays] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]); // Data inicial padrão: hoje

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!medicineName || !interval || !startTime) {
      alert('Por favor, preencha os campos obrigatórios.');
      return;
    }

    onSubmit({ medicineName, dosage, interval, startTime, days, startDate });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-green-600 mb-6">MediCalc</h1>
      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="medicineName">Nome do Remédio</label>
        <input
          type="text"
          id="medicineName"
          placeholder="Nome do remédio"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="dosage">Dosagem (opcional)</label>
        <input
          type="text"
          id="dosage"
          placeholder="Dosagem"
          value={dosage}
          onChange={(e) => setDosage(e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="interval">Intervalo (em horas)</label>
        <input
          type="number"
          id="interval"
          placeholder="Intervalo (em horas)"
          value={interval}
          onChange={(e) => setInterval(e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="startTime">Horário Inicial</label>
        <input
          type="time"
          id="startTime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="startDate">Data Inicial</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div>
        <label className="block text-lg font-medium text-gray-700 mb-2" htmlFor="days">Quantidade de Dias (opcional)</label>
        <input
          type="number"
          id="days"
          placeholder="Quantidade de dias"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="border border-gray-300 rounded-lg w-full p-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <button type="submit" className="bg-blue-500 text-white w-full py-4 rounded-lg hover:bg-blue-600 transition duration-200">
        Calcular Horários
      </button>
    </form>
  );
}
