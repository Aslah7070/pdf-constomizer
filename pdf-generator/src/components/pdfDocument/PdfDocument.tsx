import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import React from 'react'
import type { InvoiceData, InvoiceSettings } from '../../type';




const fontMapping = {
  'font-inter': 'Helvetica',
  'font-roboto': 'Times-Roman',
  'font-lato': 'Courier',
  'font-montserrat': 'Helvetica-Bold',
  'font-open-sans': 'Times-Roman',
};
const PdfDocument: React.FC<{ data: InvoiceData, settings: InvoiceSettings }> = ({ data, settings }) => {
const font = fontMapping[settings.fontFamily as keyof typeof fontMapping] || 'Helvetica';
  console.log("sS",settings)

    const styles = StyleSheet.create({
    page: {
      padding: 40,
      fontFamily: font,
      fontSize: settings.bodyFontSize,
      color: '#334155', 
      backgroundColor: '',
    },
    header: {
      marginBottom: 20,
      paddingBottom: settings.verticalSpacing,
    },
    headerFlex: {
      flexDirection: settings.logoPosition === 'center' ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: settings.logoPosition === 'left' ? 'flex-start' : settings.logoPosition === 'right' ? 'flex-end' : 'center',
    },
    logoContainer: {
        width: '100%',
        marginBottom: settings.logoPosition === 'center' ? 10 : 0,
        flexDirection: 'row',
        justifyContent: settings.logoPosition === 'left' ? 'flex-start' : settings.logoPosition === 'right' ? 'flex-end' : 'center',
    },
    logo: {
      height: 60,
      objectFit: 'contain',
    },
    headerText: {
       width: '100%',
       textAlign: settings.headerAlignment,
    },
    invoiceTitle: {
      fontSize: settings.headerFontSize,
      fontWeight: 'bold',
      color: settings.accentColor,
      textTransform: 'uppercase',
    },
    invoiceNumber: {
      color: '#64748b',
    },
    addressSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      paddingBottom: settings.verticalSpacing,
    },
    address: {
        width: '45%'
    },
    sectionTitle: {
      fontSize: 8,
      fontWeight: 'bold',
      color: '#64748b',
      textTransform: 'uppercase',
      marginBottom: 4,
    },
    boldText: {
      fontWeight: 'bold',
      fontSize: 11,
    },
    dateSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      paddingBottom: settings.verticalSpacing,
    },
    table: {
      width: '100%',
    },
    tableHeader: {
      flexDirection: 'row',
      borderBottomWidth: 2,
      borderBottomColor: settings.accentColor,
      paddingBottom: 4,
      marginBottom: 4,
    },
    tableHeaderCell: {
      fontWeight: 'bold',
      fontSize: 8,
      textTransform: 'uppercase',
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#f1f5f9',
      paddingVertical: 6,
    },
    tableCell: {
      paddingRight: 4,
    },
    totalSection: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 20,
    },
    totalContainer: {
        width: '35%',
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 2,
    },
    totalLabel: {},
    totalValue: {},
    totalAmountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 6,
        paddingTop: 6,
        borderTopWidth: 1,
        borderTopColor: '#cbd5e1',
    },
    totalAmountLabel: {
        fontWeight: 'bold',
        fontSize: 12,
        color: settings.accentColor,
    },
    totalAmountValue: {
        fontWeight: 'bold',
        fontSize: 12,
        color: settings.accentColor,
    },
    footer: {
      position: 'absolute',
      bottom: 40,
      left: 40,
      right: 40,
      textAlign: 'center',
      borderTopWidth: 1,
      borderTopColor: '#e2e8f0',
      paddingTop: 8,
    },
    notes: {
        marginTop: 30,
    },
    notesText: {
        color: '#475569',
    },
    footerText: {
        color: '#64748b',
        fontSize: 9,    
        textAlign: 'center',
        width: '100%',
    }
  });

//     const subtotal = data.items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
//   const tax = (subtotal * data.taxRate) / 100;
//   const total = subtotal + tax;
return (
    <Document>
      <Page size="A4" style={styles.page}>
  {/* Header stays fixed */}
  <View style={styles.header}>
    <View style={styles.headerFlex}>
      {data.logo && (
        <View style={styles.logoContainer}>
          <Image src={data.logo} style={styles.logo} />
        </View>
      )}
      <View style={styles.headerText}>
        <Text style={styles.invoiceTitle}>Invoice</Text>
        <Text style={styles.invoiceNumber}>{data.invoiceNumber}</Text>
      </View>
    </View>
  </View>

  {/* Dynamic Sections */}
  {settings.sectionOrder.map((section) => {
    switch (section) {
      case "addresses":
        return (
          <View key="addresses" style={styles.addressSection}>
            <View style={styles.address}>
              <Text style={styles.sectionTitle}>From</Text>
              <Text style={styles.boldText}>{data.fromName}</Text>
              <Text>{data.fromAddress}</Text>
            </View>
            <View style={styles.address}>
              <Text style={styles.sectionTitle}>To</Text>
              <Text style={styles.boldText}>{data.toName}</Text>
              <Text>{data.toAddress}</Text>
            </View>
          </View>
        );

      case "dates":
        return (
          <View key="dates" style={styles.dateSection}>
            <View style={{ width: "45%" }}>
              <Text style={styles.sectionTitle}>Date</Text>
              <Text>{data.date}</Text>
            </View>
            <View style={{ width: "45%" }}>
              <Text style={styles.sectionTitle}>Due Date</Text>
              <Text>{data.dueDate}</Text>
            </View>
          </View>
        );

      case "items":
        return (
          <View key="items" style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { flex: 3 }]}>Description</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1, textAlign: "right" }]}>Quantity</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1, textAlign: "right" }]}>Price</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1, textAlign: "right" }]}>Amount</Text>
            </View>
            {data.items.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 3 }]}>{item.description}</Text>
                <Text style={[styles.tableCell, { flex: 1, textAlign: "right" }]}>{item.quantity}</Text>
                <Text style={[styles.tableCell, { flex: 1, textAlign: "right" }]}>${item.unitPrice.toFixed(2)}</Text>
                <Text style={[styles.tableCell, { flex: 1, textAlign: "right" }]}>${(item.quantity * item.unitPrice).toFixed(2)}</Text>
              </View>
            ))}
          </View>
        );

      case "summary":
        { const subtotal = data.items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
        const tax = (subtotal * data.taxRate) / 100;
        const total = subtotal + tax;
        return (
          <View key="summary" style={styles.totalSection}>
            <View style={styles.totalContainer}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal:</Text>
                <Text style={styles.totalValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Tax ({data.taxRate}%):</Text>
                <Text style={styles.totalValue}>${tax.toFixed(2)}</Text>
              </View>
              <View style={styles.totalAmountRow}>
                <Text style={styles.totalAmountLabel}>Total:</Text>
                <Text style={styles.totalAmountValue}>${total.toFixed(2)}</Text>
              </View>
            </View>
          </View>
        ); }

      case "notes":
        return (
          <View key="notes" style={styles.notes}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.notesText}>{data.notes}</Text>
          </View>
        );

      default:
        return null;
    }
  })}

  {/* Footer (fixed) */}
  <View style={styles.footer} fixed>
    <Text style={styles.footerText}>{data.footerText}</Text>
  </View>
</Page>

    </Document>
)
}

export default PdfDocument
    