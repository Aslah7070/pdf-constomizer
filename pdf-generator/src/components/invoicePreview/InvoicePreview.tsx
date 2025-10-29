import React from 'react'
import { useInvoice } from '../../contexts/InvoiceContext';
import EditableField from './EditableField';
import type { InvoiceData, InvoiceSettings } from '../../type';
import { Button } from '../ui/button';
import { Plus, Trash2 } from 'lucide-react';



// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const AddressSection: React.FC<{ data: InvoiceData; settings: InvoiceSettings; handleDataChange: Function; }> = ({ data, settings, handleDataChange }) => (
  <section className="grid grid-cols-2 gap-8" style={{ paddingBottom: `${settings.verticalSpacing}px` }}>
    <div>
      <h3 className="font-bold text-slate-500 uppercase tracking-wide text-xs mb-2">From</h3>
      <EditableField value={data.fromName} onChange={(val: string) => handleDataChange('fromName', val)} className="font-bold text-lg" />
      <EditableField value={data.fromAddress} onChange={(val: string) => handleDataChange('fromAddress', val)} className="text-slate-600 whitespace-pre-line" multiline />
    </div>
    <div>
      <h3 className="font-bold text-slate-500 uppercase tracking-wide text-xs mb-2">To</h3>
      <EditableField value={data.toName} onChange={(val: string) => handleDataChange('toName', val)} className="font-bold text-lg" />
      <EditableField value={data.toAddress} onChange={(val: string) => handleDataChange('toAddress', val)} className="text-slate-600 whitespace-pre-line" multiline />
    </div>
  </section>
);

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const DatesSection: React.FC<{ data: InvoiceData; settings: InvoiceSettings; handleDataChange: Function; }> = ({ data, settings, handleDataChange }) => (
  <section className="grid grid-cols-2 gap-8" style={{ paddingBottom: `${settings.verticalSpacing}px` }}>
    <div>
      <h3 className="font-bold text-slate-500 uppercase tracking-wide text-xs mb-2">Date</h3>
      <EditableField type="date" value={data.date} onChange={(val: string) => handleDataChange('date', val)} />
    </div>
    <div>
      <h3 className="font-bold text-slate-500 uppercase tracking-wide text-xs mb-2">Due Date</h3>
      <EditableField type="date" value={data.dueDate} onChange={(val: string) => handleDataChange('dueDate', val)} />
    </div>
  </section>
);

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const ItemsSection: React.FC<{ data: InvoiceData; settings: InvoiceSettings; handleItemChange: Function; removeItem: Function; addItem: Function; }> = ({ data, settings, handleItemChange, removeItem, addItem }) => (
  <section style={{ paddingBottom: `${settings.verticalSpacing}px` }}>
    <div className="flow-root">
      <table className="min-w-full">
        <thead className="border-b-2" style={{ borderColor: settings.accentColor }}>
          <tr>
            <th className="text-left font-bold uppercase tracking-wide text-xs py-2">Description</th>
            <th className="text-right font-bold uppercase tracking-wide text-xs py-2 w-24">Quantity</th>
            <th className="text-right font-bold uppercase tracking-wide text-xs py-2 w-24">Price</th>
            <th className="text-right font-bold uppercase tracking-wide text-xs py-2 w-24">Amount</th>
            <th className="w-10"></th>
          </tr>
        </thead>
        <tbody>
          {data.items.map(item => (
            <tr key={item.id} className="border-b border-slate-100 ">
              <td className="py-3 pr-2 "><EditableField value={item.description} onChange={(val: string) => handleItemChange(item.id, 'description', val)} /></td>
              <td className="py-3 px-2 text-right"><EditableField type="number" value={String(item.quantity)} onChange={(val: string) => handleItemChange(item.id, 'quantity', val)} /></td>
              <td className="py-3 px-2 text-right"><EditableField type="number" value={String(item.unitPrice)} onChange={(val: string) => handleItemChange(item.id, 'unitPrice', val)} /></td>
              <td className="py-3 pl-2 text-right text-slate-700">${(item.quantity * item.unitPrice).toFixed(2)}</td>
              <td className="text-right ">
                {/* <div className='bg-amber-400'>d</div> */}
                <button onClick={() => removeItem(item.id)} className="text-slate-400 bg-transparent hover:text-red-500 p-1  rounded-full"><Trash2 size={16}/></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="flex justify-end mt-4">
      <Button size="sm" variant="secondary" onClick={() => addItem()} className="flex items-center">
        <Plus size={16} className="mr-1"/> Add Item
      </Button>
    </div>
  </section>
);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const SummarySection: React.FC<{ data: InvoiceData; settings: InvoiceSettings; handleDataChange: Function; subtotal: number; tax: number; total: number; }> = ({ data, settings, handleDataChange, subtotal, tax, total }) => (
  <section className="flex justify-end" style={{ paddingBottom: `${settings.verticalSpacing}px` }}>
    <div className="w-full max-w-xs space-y-2">
      <div className="flex justify-between"><span>Subtotal:</span> <span>${subtotal.toFixed(2)}</span></div>
      <div className="flex justify-between items-center">
        <span>Tax (%):</span>
        <EditableField value={String(data.taxRate)} onChange={(val: string) => handleDataChange('taxRate', val)} className="w-16 text-right"/>
      </div>
      <div className="flex justify-between"><span>Tax Amount:</span> <span>${tax.toFixed(2)}</span></div>
      <div className="flex justify-between font-bold text-lg pt-2 border-t border-slate-300" style={{ color: settings.accentColor }}>
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  </section>
);

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
const NotesSection: React.FC<{ data: InvoiceData; settings: InvoiceSettings; handleDataChange: Function; }> = ({ data, handleDataChange }) => (
  <section className="mt-8">
    <h3 className="font-bold text-slate-500 uppercase tracking-wide text-xs mb-2">Notes</h3>
    <EditableField value={data.notes} onChange={(val: string) => handleDataChange('notes', val)} className="text-slate-600" multiline />
  </section>
);


const InvoicePreview = () => {
      const { state, dispatch } = useInvoice();
  const { data, settings } = state;

    const handleDataChange = (field: keyof typeof data, value: string) => {
    dispatch({ type: 'UPDATE_DATA', payload: { [field]: value } });
  };

    const handleItemChange = (id: string, field: 'description' | 'quantity' | 'unitPrice', value: string | number) => {
    const updates = { [field]: field === 'description' ? value : Number(value) };
    dispatch({ type: 'UPDATE_ITEM', payload: { id, updates } });
  };

    const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

    const addItem = () => {
    const newItem = { id: Date.now().toString(), description: 'New Item', quantity: 1, unitPrice: 0 };
    dispatch({ type: 'ADD_ITEM', payload: newItem });
  };

   const subtotal = data.items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const tax = (subtotal * data.taxRate) / 100;
  const total = subtotal + tax;

    const sectionComponents = {
    addresses: <AddressSection key="addresses" data={data} settings={settings} handleDataChange={handleDataChange} />,
    dates: <DatesSection key="dates" data={data} settings={settings} handleDataChange={handleDataChange} />,
    items: <ItemsSection key="items" data={data} settings={settings} handleItemChange={handleItemChange} removeItem={removeItem} addItem={addItem} />,  
    summary: <SummarySection key="summary" data={data} settings={settings} handleDataChange={handleDataChange} subtotal={subtotal} tax={tax} total={total} />,
    notes: <NotesSection key="notes" data={data} settings={settings} handleDataChange={handleDataChange} />,
  };


  const alignmentClasses = { left: 'text-left', center: 'text-center', right: 'text-right' };
   const logoAlignmentClasses = { left: 'justify-start', center: 'justify-center', right: 'justify-end' };
    const flexAlignmentClasses = { left: 'items-start', center: 'items-center', right: 'items-end' };
  return (
<div className={`p-8 md:p-12 bg-white shadow-lg rounded-lg ${settings.fontFamily}`} style={{ fontSize: `${settings.bodyFontSize}px` }}>
      <header className="mb-8" style={{ paddingBottom: `${settings.verticalSpacing}px` }}>
        <div className={`flex ${settings.logoPosition === 'center' ? 'flex-col' : 'flex-row justify-between'} ${flexAlignmentClasses[settings.logoPosition]}`}>
          {data.logo && (
            <div className={`flex ${logoAlignmentClasses[settings.logoPosition]} w-full mb-4`}>
              <img src={data.logo} alt="logo" className="h-20 object-contain" />
            </div>
          )}
          <div className={`flex flex-col w-full ${alignmentClasses[settings.headerAlignment]}`}>
            <h1 className="font-bold uppercase tracking-wider" style={{ color: settings.accentColor, fontSize: `${settings.headerFontSize}px` }}>
              Invoice
            </h1>
            <EditableField
              value={data.invoiceNumber}
              onChange={(val) => handleDataChange('invoiceNumber', val)}
              className="text-slate-500"
            />
          </div>
        </div>
      </header>

      <main className="space-y-8">
        {settings.sectionOrder.map(sectionKey => sectionComponents[sectionKey])}
      </main>

      <footer className="mt-12 pt-6 border-t border-slate-200">
        <EditableField value={data.footerText} onChange={(val: string) => handleDataChange('footerText', val)} className="text-slate-500 text-sm text-center" />
      </footer>
    </div>
  )
}

export default InvoicePreview
