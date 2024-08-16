import React from 'react'

const ExportExcel = ({fileName , data}) => {

    const exportToExcel = async () => {
    
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet1');
    
        // Add header row
        worksheet.columns = [
          { header: 'Perno No', key: 'pernoNo', width: 10 },
          { header: 'Name', key: 'name', width: 20 },
          { header: 'Email', key: 'email', width: 20 },
          { header: 'Location', key: 'location', width: 20 },
          { header: 'Date & Time', key: 'date', width: 20 },
        ];
    
        // Add rows
        consentData.forEach((item) => {
          const obj ={}
          obj.name=item.name;
          obj.pernoNo =item.pernoNo,
          obj.email = item.email,
          obj.location = item.location;
          obj.date =item.date ? DateConvert((item?.date).substring(0,16)) :"";
          worksheet.addRow(obj);
        });
    
        // Apply styles to header row
        worksheet.getRow(1).eachCell((cell) => {
          cell.font = { bold: true };
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            // fgColor: { argb: 'FFFF00' }, // Yellow background
          };
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });
     
        // Create Excel file and save it
        const buffer = await workbook.xlsx.writeBuffer();
        const dataBlob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(dataBlob, `consent-details${moment().format('DD-MM-YYYY HH:MM:SS')}.xlsx`);
      };

  return (
    <div>ExportExcel</div>
  )
}

export default ExportExcel