import { useCallback, useState } from 'react'
import { useInvoice } from '../../contexts/InvoiceContext';
import { Button } from '../ui/button';
import { Download, Loader2 } from 'lucide-react';
import PdfDocument from '../pdfDocument/PdfDocument';
import { pdf } from '@react-pdf/renderer';

const PdfDownloader = () => {
      const { state } = useInvoice();
  const [loading, setLoading] = useState(false);

   const handleDownload = useCallback(async () => {
    setLoading(true);
    try {
      console.log( "data", state.data)
      console.log( "settings", state.settings)
      const doc = <PdfDocument data={state.data} settings={state.settings} />;
      console.log("dd",doc)
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `invoice-${state.data.invoiceNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to generate PDF", error);
      // You could add user-facing error feedback here
    } finally {
      setLoading(false);
    }
  }, [state.data, state.settings]);
  return (
    <Button
      variant="primary" 
      size="lg" 
      className="w-full flex items-center justify-center"
      onClick={handleDownload}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </>
      )}
    </Button>
  )
}

export default PdfDownloader
