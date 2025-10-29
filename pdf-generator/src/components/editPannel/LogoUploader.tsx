import { UploadCloud} from 'lucide-react';
import React from 'react';

import { useInvoice } from '../../contexts/InvoiceContext';

const LogoUploader = () => {
  const { state, dispatch } = useInvoice();
  const { data } = state;

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Logo = event.target?.result as string;
      dispatch({
        type: 'UPDATE_DATA',
        payload: { logo: base64Logo },
      });


      e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    dispatch({
      type: 'UPDATE_DATA',
      payload: { logo: '' },
    });
  };

  return (
  <div className="flex items-center space-x-4">
    
  <div className="w-20 h-20 rounded-md border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 overflow-hidden">
    {data.logo ? (
      <img src={data.logo} alt="Company Logo" className="object-contain h-full w-full" />
    ) : (
      <UploadCloud className="w-8 h-8 text-slate-400" />
    )}
  </div>
  

  <div className="flex flex-col space-y-2">
  <label className="cursor-pointer px-3 py-1 bg-gray-200 rounded text-sm hover:bg-gray-300 inline-flex items-center justify-center">
    Upload Logo
    <input
      type="file"
      accept="image/*"
      onChange={handleLogoUpload}
      className="hidden"
    />
  </label>

    {data.logo && (
      <button
        type="button"
        onClick={removeLogo}
        className="text-red-500 text-sm hover:underline"
      >
        Remove
      </button>
    )}
  </div>
</div>

  );
};

export default LogoUploader;
