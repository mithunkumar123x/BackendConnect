export const convertToCSV = (expenses) => {
    const headers = ['Amount', 'Description', 'Category'];
    const rows = expenses.map(expense => [expense.amount, expense.description, expense.category]);
  
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.join(',') + '\n';
    });
  
    return encodeURI(csvContent);
  };
  