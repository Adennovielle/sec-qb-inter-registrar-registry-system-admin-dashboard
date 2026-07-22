export const printTable = (tableId) => {
  const table = document.getElementById(tableId);

  if (!table) return;

  const printWindow = window.open("", "", "width=900,height=650");

  printWindow.document.write(`
    <html>
      <head>
        <title>Print</title>

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css"
        >

        <style>
          body{
            padding:20px;
          }

          table{
            width:100%;
            border-collapse:collapse;
          }

          th,td{
            border:1px solid #dee2e6;
            padding:8px;
            text-align:left;
          }

          thead{
            background:#198754;
            color:white;
          }
        </style>

      </head>

      <body>

        ${table.outerHTML}

      </body>
    </html>
  `);

  printWindow.document.close();

  printWindow.focus();

  printWindow.print();

  printWindow.close();
};
