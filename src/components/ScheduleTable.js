export default function ScheduleTable({ schedule }) {
  return (
    <div className="mt-4">
      <h2 className="font-semibold mb-2">Horários Calculados</h2>
      {schedule.map(({ day, times }) => (
        <div key={day} className="mb-4">
          <h3 className="font-bold">Dia {day}</h3>
          <ul className="list-disc list-inside">
            {times.map((time, index) => (
              <li key={index}>{time}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
