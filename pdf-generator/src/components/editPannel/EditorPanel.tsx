
import EditorSection from './EditorSection'
import LayoutControlls from './LayoutControlls'
import LogoUploader from './LogoUploader'
import PdfDownloader from './PdfDownloader'

const EditorPanel = () => {
  return (
  <div className="p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Invoice Customizer</h1>
        <p className="text-sm text-slate-500">Modify the design and content of your invoice.</p>
      </header>
      
      <div className="space-y-4">
        <EditorSection title="Company Logo">
          <LogoUploader/>
        </EditorSection>

        <EditorSection title="Layout & Spacing">
          <LayoutControlls />
        </EditorSection>
        
        {/* <EditorSection title="Appearance">
          <AppearanceControls />
        </EditorSection> */}
      </div>

      <div className="pt-6 border-t border-slate-200">
        <PdfDownloader />
      </div>
    </div>
  )
}

export default EditorPanel
