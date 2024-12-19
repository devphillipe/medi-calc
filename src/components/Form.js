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
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-4">MediCalc</h1>
      <input
        type="text"
        placeholder="Nome do remédio"
        value={medicineName}
        onChange={(e) => setMedicineName(e.target.value)}
        className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="text"
        placeholder="Dosagem (opcional)"
        value={dosage}
        onChange={(e) => setDosage(e.target.value)}
        className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="number"
        placeholder="Intervalo (em horas)"
        value={interval}
        onChange={(e) => setInterval(e.target.value)}
        className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="time"
        placeholder="Horário inicial"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <input
        type="number"
        placeholder="Quantidade de dias (opcional)"
        value={days}
        onChange={(e) => setDays(e.target.value)}
        className="border border-gray-300 rounded-lg w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button type="submit" className="bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600 transition duration-200">
        Calcular Horários
      </button>
    </form>
  );
}
