import EditorPanel from "./components/editPannel/EditorPanel"
import InvoicePreview from "./components/invoicePreview/InvoicePreview"
import { InvoiceProvider } from "./contexts/InvoiceContext"

function App() {


  return (
    <>
<InvoiceProvider>

        <div className="min-h-screen bg-slate-100 font-inter text-slate-800">
        <main className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-[380px] lg:min-w-[380px] bg-white lg:h-screen lg:overflow-y-auto">
            <EditorPanel/>
          </div>
          <div className="flex-1 flex justify-center items-start p-4 sm:p-8 bg-slate-50">
             <div className="w-full max-w-4xl">
                 <InvoicePreview />
             </div>
          </div>
        </main>
      </div>
</InvoiceProvider>

    </>
  )
}

export default App
