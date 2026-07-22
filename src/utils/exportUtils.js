import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export const exportExcel = (columns, data, filename) => {
  const exportData = data.map((row) => {
    const obj = {};

    columns.forEach((col) => {
      obj[col.header] = row[col.accessor] ?? "-";
    });

    return obj;
  });

  const worksheet = XLSX.utils.json_to_sheet(exportData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Registry");

  XLSX.writeFile(workbook, `${filename}.xlsx`);
};

export const exportPDF = (columns, data, filename) => {
  const doc = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });
  autoTable(doc, {
    head: [columns.map((col) => col.header)],
    body: data.map((row) => columns.map((col) => row[col.accessor] ?? "-")),

    // Header Style
    headStyles: {
      fillColor: [1, 71, 47], // RGB
      textColor: [255, 255, 255], // White
      fontStyle: "bold",
      halign: "center",
      valign: "middle",
      fontSize: 10,
    },

    // Body Style
    bodyStyles: {
      fontSize: 9,
      textColor: [40, 40, 40],
      lineColor: [220, 220, 220],
      lineWidth: 0.2,
    },

    // Alternate row color
    alternateRowStyles: {
      fillColor: [245, 250, 245],
    },

    // Borders
    styles: {
      lineColor: [200, 200, 200],
      lineWidth: 0.2,
      cellPadding: 3,
    },

    theme: "grid",
  });

  doc.save(`${filename}.pdf`);
};

export const printTable = (tableId) => {
  const table = document.getElementById(tableId);

  if (!table) {
    console.error(`Table with id "${tableId}" not found.`);
    return;
  }

  const printWindow = window.open("", "_blank", "width=1000,height=700");

  printWindow.document.write(`
    <html>
      <head>
        <title>Print Table</title>

        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        />

        <style>
          body {
            padding: 20px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          th,
          td {
            border: 1px solid #ddd;
            padding: 8px;
          }

          thead {
            background: #198754;
            color: white;
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
