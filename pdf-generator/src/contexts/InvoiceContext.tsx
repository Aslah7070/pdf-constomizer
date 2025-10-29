
import type { ReactNode } from "react";
import  { createContext, useContext, useReducer } from 'react';
import type { InvoiceData, InvoiceSettings, Action, InvoiceContextType } from '../type';
import { FONT_OPTIONS, ACCENT_COLORS } from '../constants/invoice';

const initialState: { data: InvoiceData; settings: InvoiceSettings } = {
  data: {
    logo: null,
    invoiceNumber: 'INV-001',
    fromName: 'Your Company',
    fromAddress: '123 Main St, Anytown, USA',
    toName: 'Client Name',
    toAddress: '456 Client Ave, Othertown, USA',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: [
      { id: '1', description: 'Web Design Services', quantity: 1, unitPrice: 2000 },
      { id: '2', description: 'Domain Name Registration', quantity: 1, unitPrice: 15 },
    ],
    notes: 'Thank you for your business!',
    footerText: 'Payment is due within 30 days.',
    taxRate: 8.0,
  },
  settings: {
    accentColor: ACCENT_COLORS[0],
    fontFamily: FONT_OPTIONS[0].value,
    headerAlignment: 'left',
    logoPosition: 'left',
    headerFontSize: 24,
    bodyFontSize: 12,
    verticalSpacing: 16,
    sectionOrder: ['addresses', 'dates', 'items', 'summary', 'notes'],
  },
};

const invoiceReducer = (state: typeof initialState, action: Action): typeof initialState => {
  switch (action.type) {
    case 'UPDATE_DATA':
      return { ...state, data: { ...state.data, ...action.payload } };
    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };
    case 'ADD_ITEM':
      return { ...state, data: { ...state.data, items: [...state.data.items, action.payload] } };
    case 'UPDATE_ITEM':
      return {
        ...state,
        data: {
          ...state.data,
          items: state.data.items.map((item) =>
            item.id === action.payload.id ? { ...item, ...action.payload.updates } : item
          ),
        },
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        data: {
          ...state.data,
          items: state.data.items.filter((item) => item.id !== action.payload),
        },
      };
    case 'REORDER_SECTIONS':
      return { ...state, settings: { ...state.settings, sectionOrder: action.payload } };
    default:
      return state;
  }
};

const InvoiceContext = createContext<InvoiceContextType | undefined>(undefined);

export const InvoiceProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(invoiceReducer, initialState);

  return (
    <InvoiceContext.Provider value={{ state, dispatch }}>
      {children}
    </InvoiceContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useInvoice = (): InvoiceContextType => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error('useInvoice must be used within an InvoiceProvider');
  }
  return context;
};