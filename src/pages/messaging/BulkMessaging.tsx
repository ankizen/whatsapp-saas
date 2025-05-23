{/* Previous content unchanged until line 310 */}
import React, { useState } from 'react';
import { 
  Upload, 
  Download, 
  Send, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  HelpCircle 
} from 'lucide-react';

// Message template interface
interface Template {
  id: string;
  name: string;
  category: string;
  status: 'approved' | 'pending' | 'rejected';
}

// Campaign interface
interface Campaign {
  id: string;
  name: string;
  template: string;
  sent: number;
  delivered: number;
  read: number;
  failed: number;
  status: 'completed' | 'in_progress' | 'scheduled' | 'failed';
  createdAt: string;
}

// Mock data
const mockTemplates: Template[] = [
  { id: '1', name: 'Welcome Message', category: 'MARKETING', status: 'approved' },
  { id: '2', name: 'Order Confirmation', category: 'UTILITY', status: 'approved' },
  { id: '5', name: 'Payment Confirmation', category: 'UTILITY', status: 'approved' },
  { id: '6', name: 'Feedback Request', category: 'MARKETING', status: 'approved' },
];

const mockCampaigns: Campaign[] = [
  { 
    id: '1', 
    name: 'Welcome Campaign May 2025', 
    template: 'Welcome Message',
    sent: 500, 
    delivered: 485, 
    read: 350, 
    failed: 15,
    status: 'completed',
    createdAt: '2025-05-15'
  },
  { 
    id: '2', 
    name: 'Order Updates May 2025', 
    template: 'Order Confirmation',
    sent: 250, 
    delivered: 248, 
    read: 200, 
    failed: 2,
    status: 'completed',
    createdAt: '2025-05-10'
  },
  { 
    id: '3', 
    name: 'Feedback Campaign May 2025', 
    template: 'Feedback Request',
    sent: 100, 
    delivered: 20, 
    read: 10, 
    failed: 0,
    status: 'in_progress',
    createdAt: '2025-05-18'
  }
];

const BulkMessaging: React.FC = () => {
  const [step, setStep] = useState<'template' | 'upload' | 'review'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [campaignName, setCampaignName] = useState('');
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<string[][]>([]);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setCsvFile(file);
    
    // Read and preview CSV
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const lines = text.split('\n').filter(line => line.trim());
      const parsedData = lines.map(line => line.split(',').map(cell => cell.trim()));
      
      setCsvPreview(parsedData.slice(0, 5)); // Preview first 5 rows
    };
    reader.readAsText(file);
  };
  
  const handleNextStep = () => {
    if (step === 'template' && selectedTemplate) {
      setStep('upload');
    } else if (step === 'upload' && csvFile) {
      setStep('review');
    }
  };
  
  const handlePrevStep = () => {
    if (step === 'upload') {
      setStep('template');
    } else if (step === 'review') {
      setStep('upload');
    }
  };
  
  const handleSubmit = () => {
    if (!selectedTemplate || !csvFile || !campaignName) return;
    
    setSubmitStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      console.log({
        templateId: selectedTemplate,
        campaignName,
        csvFile
      });
      
      setSubmitStatus('success');
      
      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setStep('template');
        setSelectedTemplate('');
        setCampaignName('');
        setCsvFile(null);
        setCsvPreview([]);
      }, 3000);
    }, 2000);
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 'template':
        return (
          <div className="space-y-6">
            <div>
              <label htmlFor="campaign-name" className="block text-sm font-medium text-gray-700">
                Campaign Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="campaign-name"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  placeholder="e.g. May 2025 Promotion"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-700">Select a Template</h3>
              <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mockTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`relative cursor-pointer rounded-lg border p-4 ${
                      selectedTemplate === template.id
                        ? 'border-emerald-500 ring-2 ring-emerald-500'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <FileText className="mr-2 h-5 w-5 text-gray-400" />
                        <span className="font-medium text-gray-900">{template.name}</span>
                      </div>
                      {template.status === 'approved' && (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Approved
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {template.category === 'UTILITY' ? 'Utility' : 'Marketing'}
                    </p>
                    {selectedTemplate === template.id && (
                      <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'upload':
        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-medium text-gray-900">Upload Contact List</h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload a CSV file with phone numbers and variables for your template
              </p>
              
              <div className="mt-4">
                <label htmlFor="csv-file" className="block text-sm font-medium text-gray-700">
                  CSV File
                </label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="csv-file"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-emerald-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-emerald-500 focus-within:ring-offset-2 hover:text-emerald-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="csv-file"
                          name="csv-file"
                          type="file"
                          accept=".csv"
                          className="sr-only"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">CSV file up to 10MB</p>
                  </div>
                </div>
              </div>
              
              {csvFile && (
                <div className="mt-4">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-emerald-500" />
                    <span className="font-medium text-gray-900">{csvFile.name}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({Math.round(csvFile.size / 1024)} KB)
                    </span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <div className="flex items-center">
                <Info className="mr-2 h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-medium text-gray-900">CSV Format Requirements</h3>
              </div>
              
              <div className="mt-4 space-y-3">
                <p className="text-sm text-gray-600">
                  Your CSV file must follow this structure:
                </p>
                
                <div className="overflow-x-auto rounded border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          phone
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          variable1
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          variable2
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                          variable3
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      <tr>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          1234567890
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          John
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          Smith
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          Order #12345
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <ul className="ml-5 list-disc space-y-1 text-sm text-gray-600">
                  <li>The first column must be named "phone" with phone numbers in international format</li>
                  <li>Additional columns should match the variables in your template (&#123;&#123;1&#125;&#125;, &#123;&#123;2&#125;&#125;, etc.)</li>
                  <li>No special characters or formatting in the header row</li>
                  <li>Phone numbers should not include spaces or special characters</li>
                </ul>
                
                <div className="flex items-center">
                  <Download className="mr-2 h-4 w-4 text-emerald-600" />
                  <a href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
                    Download sample CSV template
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'review':
        return (
          <div className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <h3 className="text-lg font-medium text-gray-900">Review Campaign</h3>
              
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Campaign Name</p>
                  <p className="text-base font-medium text-gray-900">{campaignName}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Template</p>
                  <p className="text-base font-medium text-gray-900">
                    {mockTemplates.find(t => t.id === selectedTemplate)?.name}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">File</p>
                  <p className="text-base font-medium text-gray-900">{csvFile?.name}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Estimated Recipients</p>
                  <p className="text-base font-medium text-gray-900">
                    {csvPreview.length > 1 ? csvPreview.length - 1 : 0}+
                  </p>
                </div>
              </div>
              
              {csvPreview.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-700">Data Preview</h4>
                  <div className="mt-2 overflow-x-auto rounded border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          {csvPreview[0].map((header, index) => (
                            <th
                              key={index}
                              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {csvPreview.slice(1).map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex} className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
            
            <div className="rounded-lg border border-gray-200 bg-white p-6">
              <div className="flex items-center">
                <HelpCircle className="mr-2 h-5 w-5 text-yellow-500" />
                <h3 className="text-lg font-medium text-gray-900">Important Notes</h3>
              </div>
              
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>
                  1. Messages will be sent to all numbers in your CSV file.
                </p>
                <p>
                  2. Your WhatsApp Business account will be charged for each message sent.
                </p>
                <p>
                  3. Ensure all phone numbers are in the correct format and have opted in to receive messages.
                </p>
                <p>
                  4. Campaign progress can be monitored in the "Campaign History" section.
                </p>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bulk Messaging</h1>
          <p className="mt-2 text-sm text-gray-500">
            Send personalized messages to multiple recipients at once
          </p>
        </div>
      </div>
      
      {/* Step indicator */}
      <div className="sm:hidden">
        <p className="text-sm font-medium text-gray-700">
          Step {step === 'template' ? '1' : step === 'upload' ? '2' : '3'} of 3
        </p>
      </div>
      <nav className="hidden sm:block" aria-label="Progress">
        <ol className="flex space-x-4 rounded-md bg-white p-2 shadow-sm">
          <li className="flex-1">
            <button
              onClick={() => step !== 'template' && setStep('template')}
              className={`group flex w-full flex-col border-t-4 pt-4 pb-2 ${
                step === 'template'
                  ? 'border-emerald-500'
                  : step === 'upload' || step === 'review'
                  ? 'border-emerald-600 hover:border-emerald-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="text-xs font-semibold uppercase tracking-wide">
                Step 1
              </span>
              <span className="text-sm font-medium">Select Template</span>
            </button>
          </li>
          
          <li className="flex-1">
            <button
              onClick={() => step === 'review' && setStep('upload')}
              className={`group flex w-full flex-col border-t-4 pt-4 pb-2 ${
                step === 'upload'
                  ? 'border-emerald-500'
                  : step === 'review'
                  ? 'border-emerald-600 hover:border-emerald-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              disabled={step === 'template'}
            >
              <span className="text-xs font-semibold uppercase tracking-wide">
                Step 2
              </span>
              <span className="text-sm font-medium">Upload Contacts</span>
            </button>
          </li>
          
          <li className="flex-1">
            <button
              className={`group flex w-full flex-col border-t-4 pt-4 pb-2 ${
                step === 'review'
                  ? 'border-emerald-500'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              disabled={step === 'template' || step === 'upload'}
            >
              <span className="text-xs font-semibold uppercase tracking-wide">
                Step 3
              </span>
              <span className="text-sm font-medium">Review & Send</span>
            </button>
          </li>
        </ol>
      </nav>
      
      {/* Success message */}
      {submitStatus === 'success' && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Campaign successfully created</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>Your campaign has been created and messages are being sent. You can monitor the progress in the Campaign History section.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Error message */}
      {submitStatus === 'error' && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">There was an error creating your campaign</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>Please check your file format and try again. If the problem persists, contact support.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {renderStepContent()}
        </div>
        
        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Campaign History</h3>
            <div className="mt-4 space-y-4">
              {mockCampaigns.map((campaign) => (
                <div key={campaign.id} className="rounded-lg border border-gray-200 p-4">
                  <div className="flex justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{campaign.name}</h4>
                    {campaign.status === 'completed' && (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Completed
                      </span>
                    )}
                    {campaign.status === 'in_progress' && (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                        In Progress
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Template: {campaign.template}
                  </p>
                  <div className="mt-2 grid grid-cols-4 gap-2 text-center">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Sent</p>
                      <p className="text-sm font-semibold text-gray-900">{campaign.sent}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Delivered</p>
                      <p className="text-sm font-semibold text-gray-900">{campaign.delivered}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Read</p>
                      <p className="text-sm font-semibold text-gray-900">{campaign.read}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-500">Failed</p>
                      <p className="text-sm font-semibold text-gray-900">{campaign.failed}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-sm font-medium text-emerald-600 hover:text-emerald-500">
                View all campaigns
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="mt-8 flex justify-between">
        {step !== 'template' ? (
          <button
            type="button"
            onClick={handlePrevStep}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Back
          </button>
        ) : (
          <div></div>
        )}
        
        {step !== 'review' ? (
          <button
            type="button"
            onClick={handleNextStep}
            disabled={
              (step === 'template' && (!selectedTemplate || !campaignName)) ||
              (step === 'upload' && !csvFile)
            }
            className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-75"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitStatus === 'loading'}
            className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-75"
          >
            <Send className="-ml-1 mr-2 h-4 w-4" />
            {submitStatus === 'loading' ? 'Sending...' : 'Send Messages'}
          </button>
        )}
      </div>
    </div>
  );
};

export default BulkMessaging;