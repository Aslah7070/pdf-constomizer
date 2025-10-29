
import { useInvoice } from '../../contexts/InvoiceContext';
import { AlignCenter, AlignLeft, AlignRight, ArrowDown, ArrowUp } from 'lucide-react';
import type { Alignment } from '../../type';

const LayoutControlls = () => {
      const { state, dispatch } = useInvoice();
  const { settings } = state;

    const handleAlignmentChange = (key: 'headerAlignment' | 'logoPosition', value: Alignment) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { [key]: value } })

     }
     
  const handleSliderChange = (key: 'headerFontSize' | 'bodyFontSize' | 'verticalSpacing', value: number) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: { [key]: value } });
  };

     
  const moveSection = (index: number, direction: -1 | 1) => {
    const newOrder = [...settings.sectionOrder];
    const [movedItem] = newOrder.splice(index, 1);
    newOrder.splice(index + direction, 0, movedItem);
    dispatch({ type: 'REORDER_SECTIONS', payload: newOrder });
  };

    const AlignmentControl = ({ label, value, onChange }: { label: string, value: Alignment, onChange: (val: Alignment) => void }) => (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-2">{label}</label>
      <div className="flex items-center space-x-2">
        {(['left', 'center', 'right'] as Alignment[]).map((align) => (
          <button
            key={align}
            onClick={() => onChange(align)}
            className={`p-2 rounded-md transition-colors ${
              value === align ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {align === 'left' && <AlignLeft size={20} />}
            {align === 'center' && <AlignCenter size={20} />}
            {align === 'right' && <AlignRight size={20} />}
          </button>
        ))}
      </div>
    </div>
  )
    const SliderControl = ({ label, value, min, max, step, onChange, unit }: { label:string, value: number, min: number, max: number, step: number, onChange: (val: number) => void, unit:string }) => (
      <div>
        <label htmlFor={label} className="block text-sm font-medium text-slate-600 mb-1">
          {label} <span className="text-xs text-slate-400">({value}{unit})</span>
        </label>
        <input
          id={label}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    );
  return (
 <div className="space-y-4">
      <AlignmentControl label="Header Alignment" value={settings.headerAlignment} onChange={(val) => handleAlignmentChange('headerAlignment', val)} />
      <AlignmentControl label="Logo Position" value={settings.logoPosition} onChange={(val) => handleAlignmentChange('logoPosition', val)} />
      <SliderControl label="Header Font Size" value={settings.headerFontSize} min={16} max={48} step={1} onChange={(val) => handleSliderChange('headerFontSize', val)} unit="px" />
      <SliderControl label="Body Font Size" value={settings.bodyFontSize} min={8} max={16} step={1} onChange={(val) => handleSliderChange('bodyFontSize', val)} unit="px" />
      <SliderControl label="Vertical Spacing" value={settings.verticalSpacing} min={8} max={32} step={1} onChange={(val) => handleSliderChange('verticalSpacing', val)} unit="px" />
    
      <div className="pt-4 mt-4 border-t border-slate-200">
        <label className="block text-sm font-medium text-slate-600 mb-2">Section Order</label>
        <div className="space-y-2">
          {settings.sectionOrder.map((sectionId, index) => (
            <div key={sectionId} className="flex items-center justify-between bg-slate-50 p-2 rounded-md">
              <span className="text-sm capitalize">{sectionId.replace('_', ' ')}</span>
              <div className="flex items-center">
                <button
                  onClick={() => moveSection(index, -1)}
                  disabled={index === 0}
                  className="p-1 rounded-md text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label={`Move ${sectionId} up`}
                >
                  <ArrowUp size={16} /> 
                </button>
                <button
                  onClick={() => moveSection(index, 1)}
                  disabled={index === settings.sectionOrder.length - 1}
                  className="p-1 rounded-md text-slate-500 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label={`Move ${sectionId} down`}
                >
                  <ArrowDown size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LayoutControlls
