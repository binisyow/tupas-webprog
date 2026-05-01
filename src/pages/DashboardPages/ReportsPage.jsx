import { useRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { PieChart } from '@mui/x-charts/PieChart';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'report', headerName: 'Report', width: 180 },
  { field: 'category', headerName: 'Category', width: 150 },
  { field: 'generated', headerName: 'Generated', width: 150 },
];

const rows = [
  { id: 1, report: 'Monthly Summary', category: 'Sales', generated: 'January' },
  { id: 2, report: 'User Activity', category: 'Users', generated: 'February' },
  { id: 3, report: 'Inventory Status', category: 'Inventory', generated: 'March' },
  { id: 4, report: 'Finance Review', category: 'Finance', generated: 'April' },
];

const ReportsPage = () => {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;

    if (!printContent) {
      return;
    }

    const printWindow = window.open('', '_blank', 'width=1280,height=980');

    if (!printWindow) {
      return;
    }

    const exportedAt = new Intl.DateTimeFormat('en-US', {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Vixtory Reports</title>
          <style>
            @page { size: A4; margin: 16mm; }
            * { box-sizing: border-box; }
            body { margin: 0; font-family: Arial, Helvetica, sans-serif; color: #172033; background: #fff; }
            .report-shell { padding: 24px; }
            .report-header { margin-bottom: 24px; padding-bottom: 14px; border-bottom: 2px solid #1976d2; }
            .report-header h1 { margin: 0 0 6px; font-size: 28px; font-weight: 800; }
            .report-header p { margin: 0; color: #64748b; line-height: 1.5; }
            .report-content .MuiCard-root { box-shadow: none !important; border: 1px solid #e2e8f0; break-inside: avoid; page-break-inside: avoid; }
            .report-content .MuiCardContent-root { padding: 20px; }
            .report-content svg { max-width: 100%; }
          </style>
        </head>
        <body>
          <main class="report-shell">
            <header class="report-header">
              <h1>Reports Summary</h1>
              <p>Printable overview of generated reports, category breakdown, and completion performance.</p>
              <p>Prepared on ${exportedAt}</p>
            </header>
            <section class="report-content">
              ${printContent.outerHTML}
            </section>
          </main>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Box>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2} sx={{ mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Reports
          </Typography>
          <Typography color="text.secondary">
            Prepare a printable report based on the Lab Activity 5 reports dashboard.
          </Typography>
        </Box>
        <Button variant="contained" onClick={handlePrint}>
          Print / Export to PDF
        </Button>
      </Stack>

      <Stack ref={printRef} className="report-print-area" spacing={3}>
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Monthly Report Output
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              This chart compares generated reports against completed reports for each month.
            </Typography>
            <BarChart
              height={320}
              xAxis={[{ scaleType: 'band', data: ['January', 'February', 'March', 'April'] }]}
              series={[
                { data: [18, 24, 29, 28], label: 'Generated' },
                { data: [12, 19, 21, 23], label: 'Completed' },
              ]}
            />
          </CardContent>
        </Card>

        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3}>
          <Card sx={{ flex: 1, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Report Category Share
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Distribution of report requests by category.
              </Typography>
              <PieChart
                height={280}
                series={[
                  {
                    data: [
                      { id: 0, value: 34, label: 'Sales' },
                      { id: 1, value: 24, label: 'Users' },
                      { id: 2, value: 18, label: 'Inventory' },
                      { id: 3, value: 24, label: 'Finance' },
                    ],
                  },
                ]}
              />
            </CardContent>
          </Card>

          <Card sx={{ flex: 1, borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Completion Rate
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Current percentage of completed report requests.
              </Typography>
              <Gauge width={280} height={180} value={78} />
            </CardContent>
          </Card>
        </Stack>

        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Generated Reports Table
            </Typography>
            <Box sx={{ height: 360 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
              />
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default ReportsPage;
