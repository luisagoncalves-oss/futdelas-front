export const formatDateToBrazilian = (dateString: string | number): string => {
  if (!dateString) return 'Data não disponível';
  
  try {
    const date = new Date(dateString);
  
    if (isNaN(date.getTime())) {
      return 'Data inválida';
    }
    
    return date.toLocaleDateString('pt-BR');
  } catch (error) {
    return 'Erro ao formatar data';
  }
};

export const getDaysUntilDate = (dateString: string | number): number => {
  if (!dateString) return 0;
  
  try {
    const targetDate = new Date(dateString);
    const now = new Date();
    const diffTime = targetDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  } catch (error) {
    return 0;
  }
};

export const formatDateWithStatus = (dateString: string | number) => {
  if (!dateString) {
    return {
      formattedDate: 'Data não disponível',
      status: 'unknown',
      statusText: 'Desconhecido'
    };
  }
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    const formattedDate = formatDateToBrazilian(dateString);
    const daysUntil = getDaysUntilDate(dateString);
    
    let status: 'past' | 'current';
    let statusText: string;
    
    if (daysUntil < 0) {
      status = 'past';
      statusText = 'Finalizado';
    } else {
      status = 'current';
      statusText = `Em andamento`;
    }
    return {
      formattedDate,
      status,
      statusText,
      daysUntil
    };
  } catch (error) {
    return {
      formattedDate: 'Erro ao formatar',
      status: 'error',
      statusText: 'Erro'
    };
  }
};