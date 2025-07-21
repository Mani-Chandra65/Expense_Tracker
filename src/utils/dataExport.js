// utils/dataExport.js
export const exportToCSV = (expenses) => {
  const headers = ['Date', 'Amount', 'Category', 'Description'];
  const csvContent = [
    headers.join(','),
    ...expenses.map(expense => [
      new Date(expense.date).toLocaleDateString(),
      expense.amount,
      expense.category,
      expense.description || ''
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `expenses_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const importFromCSV = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target.result;
        const lines = csv.split('\n');
        const headers = lines[0].split(',');
        
        const expenses = lines.slice(1)
          .filter(line => line.trim())
          .map(line => {
            const values = line.split(',');
            return {
              date: new Date(values[0]),
              amount: parseFloat(values[1]) || 0,
              category: values[2] || 'Others',
              description: values[3] || ''
            };
          })
          .filter(expense => !isNaN(expense.amount) && expense.amount > 0);
        
        resolve(expenses);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};
