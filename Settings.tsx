
import React, { useState } from 'react';
import { generatePlayStoreMetadata } from '../services/geminiService';

const Settings: React.FC = () => {
  const [checklist, setChecklist] = useState({
    hosting: false,
    googleAccount: false,
    assets: false,
    twaPackage: false,
    privacyPolicy: true,
  });

  const [metadata, setMetadata] = useState<string | null>(null);
  const [loadingMetadata, setLoadingMetadata] = useState(false);

  const toggleItem = (item: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [item]: !prev[item] }));
  };

  const handleGenerateMetadata = async () => {
    setLoadingMetadata(true);
    try {
      const res = await generatePlayStoreMetadata();
      setMetadata(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMetadata(false);
    }
  };

  const completed = Object.values(checklist).filter(Boolean).length;
  const total = Object.keys(checklist).length;
  const progress = (completed / total) * 100;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-24 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900">Publishing Center</h2>
          <p className="text-gray-500">Gawing totoong Android App ang iyong Sikat project.</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-4">
          <div className="text-right">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Readiness</p>
            <p className="text-xl font-black text-emerald-600">{Math.round(progress)}%</p>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-emerald-100 border-t-emerald-500 flex items-center justify-center font-bold text-emerald-700">
             {completed}/{total}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Step 1: Checklist */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-sm">1</span>
              Submission Checklist
            </h3>
            <div className="space-y-4">
              {[
                { id: 'hosting', label: 'Web Hosting (Vercel/Netlify)', sub: 'Dapat live ang website URL mo (HTTPS).' },
                { id: 'googleAccount', label: 'Google Play Console ($25)', sub: 'Isang beses lang na bayad para sa lifetime account.' },
                { id: 'assets', label: 'Visual Assets', sub: 'Icon (512px), Feature Graphic (1024x500).' },
                { id: 'twaPackage', label: 'Generate .AAB File', sub: 'Gagamit tayo ng Bubblewrap o PWABuilder.' },
              ].map((item) => (
                <label key={item.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-2xl cursor-pointer transition-all border border-transparent hover:border-gray-100">
                  <input 
                    type="checkbox" 
                    checked={checklist[item.id as keyof typeof checklist]} 
                    onChange={() => toggleItem(item.id as keyof typeof checklist)}
                    className="mt-1 w-6 h-6 rounded-lg border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <div>
                    <p className="font-bold text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-500">{item.sub}</p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Step 2: AI Metadata Generator */}
          <section className="bg-emerald-900 text-white p-8 rounded-3xl shadow-xl overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-3">
                <span className="w-8 h-8 bg-emerald-700 text-white rounded-lg flex items-center justify-center text-sm">2</span>
                Store Listing Generator
              </h3>
              <p className="text-emerald-200 text-sm mb-6">Gamitin ang AI para isulat ang iyong App Description.</p>
              
              {metadata ? (
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 mb-4 max-h-96 overflow-y-auto">
                   <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{metadata}</pre>
                </div>
              ) : null}

              <button 
                onClick={handleGenerateMetadata}
                disabled={loadingMetadata}
                className="bg-amber-400 text-emerald-900 font-black px-8 py-4 rounded-xl hover:bg-amber-300 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {loadingMetadata ? <i className="fa-solid fa-circle-notch animate-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
                {metadata ? "Regenerate Description" : "Generate Store Metadata"}
              </button>
            </div>
            <i className="fa-solid fa-store absolute -bottom-10 -right-10 text-[12rem] text-emerald-800/20 rotate-12"></i>
          </section>
        </div>

        {/* Sidebar: Technical Guide */}
        <div className="space-y-6">
          <section className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-code text-blue-500"></i>
              Technical Setup
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-xs font-bold text-blue-800 mb-1 uppercase">Step A: PWABuilder</p>
                <p className="text-xs text-blue-700">Punta sa <span className="font-mono">pwabuilder.com</span>, ilagay ang iyong live URL, at i-click ang 'Package for Store'.</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100">
                <p className="text-xs font-bold text-purple-800 mb-1 uppercase">Step B: Digital Asset Links</p>
                <p className="text-xs text-purple-700">Ito ang nagpapatunay na ikaw ang may-ari ng website. I-upload ang <span className="font-mono">assetlinks.json</span> sa iyong server.</p>
              </div>
            </div>
          </section>

          <section className="bg-amber-50 p-6 rounded-3xl border border-amber-200">
            <h3 className="font-bold text-amber-900 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-circle-info"></i>
              Pro Tip para sa Pinoy
            </h3>
            <p className="text-sm text-amber-800 leading-relaxed">
              Google loves local impact. Sa iyong <strong>Full Description</strong>, lagyan ng words gaya ng "Tulungang Pinoy", "Micro-entrepreneur focus", at "Localized Suppliers". Mas mabilis ma-approve ang app na may malinaw na benepisyo sa komunidad.
            </p>
          </section>

          <section className="bg-gray-100 p-6 rounded-3xl">
             <h4 className="font-bold text-xs uppercase tracking-widest text-gray-400 mb-4">Privacy Link</h4>
             <p className="text-[10px] text-gray-500 break-all mb-4">
               Dapat kang magkaroon ng Privacy Policy URL. Gamitin ang text sa Dashboard at i-host sa isang simpleng Google Doc o website page.
             </p>
             <button className="w-full py-2 border-2 border-gray-300 rounded-lg text-xs font-bold text-gray-500 hover:bg-white transition-all">
                Copy Policy Text
             </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
