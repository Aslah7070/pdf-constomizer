/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef } from 'react'

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  multiline?: boolean;
  type?: 'text' | 'number' | 'date';
}
const EditableField = ({value,onChange,className,multiline = false, type = 'text' }:EditableFieldProps) => {

    const elementRef=useRef<HTMLDivElement>(null)

    useEffect(()=>{
          const element=elementRef.current
          if(element&&element.innerHTML!==value){
            element.innerHTML=value
          }
    },[value])

      const handleBlur = () => {
    const element = elementRef.current;
    if (element && element.innerHTML !== value) {
      onChange(element.innerHTML);
    }
  };

    const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };


    const Tag=multiline?"div":"span"
  return (
  <Tag
      ref={elementRef}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      onPaste={handlePaste}
      className={`outline-none focus:bg-blue-50 focus:ring-1 focus:ring-blue-300 rounded-sm -m-1 p-1 ${className}`}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  )
}

export default EditableField
