export default function SaveToCalendarButton({ schedule }) {
  const handleShare = async () => {
    if (!schedule || schedule.length === 0) {
      alert('Nenhum horário para compartilhar.');
      return;
    }

    // Data atual para calcular os dias
    const currentDate = new Date();
    let shareText = 'Horários para tomar o remédio:\n\n';

    schedule.forEach(({ day, times }) => {
      // Incrementa a data inicial com base no número do dia (0 = hoje)
      const eventDate = new Date(currentDate);
      eventDate.setDate(currentDate.getDate() + day);

      // Formata a data (Ex: 19/12/2024)
      const formattedDate = eventDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      shareText += `Data: ${formattedDate}:\n`;
      times.forEach((time) => {
        shareText += `- ${time}\n`;
      });
      shareText += '\n';
    });

    // Verifica se a API é suportada pelo navegador
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Horários de Medicamento',
          text: shareText,
        });
        alert('Horários compartilhados com sucesso!');
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
        alert('Falha ao compartilhar.');
      }
    } else {
      alert('Compartilhamento não suportado no seu navegador.');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600 mt-4"
    >
      Compartilhar na Agenda
    </button>
  );
}
