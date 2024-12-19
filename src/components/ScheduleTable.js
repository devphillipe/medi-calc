export default function ScheduleTable({ schedule, startDate }) {
  if (!schedule || schedule.length === 0) {
    return null;
  }

  const initialDate = new Date(startDate);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-bold mb-4">Horários Calculados</h2>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Data</th>
            <th className="border border-gray-300 px-4 py-2 bg-gray-100">Horários</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map(({ day, times }, index) => {
            const eventDate = new Date(initialDate);
            eventDate.setDate(initialDate.getDate() + day);

            const formattedDate = eventDate.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            });

            return (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2 text-center font-medium text-green-600">
                  {formattedDate}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {times.map((time, idx) => (
                    <span key={idx} className="block text-gray-700">
                      {time}
                    </span>
                  ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
