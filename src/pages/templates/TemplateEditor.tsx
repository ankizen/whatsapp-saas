import React, { useState } from 'react';
import { FileEdit, Plus, Trash2, Image, Video, Tent as Document, Phone, Globe, Eye, Save } from 'lucide-react';

type ButtonType = 'URL' | 'PHONE_NUMBER';
type HeaderType = 'TEXT' | 'IMAGE' | 'VIDEO' | 'DOCUMENT' | 'NONE';
type TemplateCategory = 'MARKETING' | 'UTILITY' | 'AUTHENTICATION';
type TemplateLanguage = 'en' | 'es' | 'pt' | 'fr' | 'de' | 'it';
type TemplateStatus = 'draft' | 'pending' | 'approved' | 'rejected';

interface TemplateButton {
  type: ButtonType;
  text: string;
  url?: string;
  phone_number?: string;
}

interface Template {
  name: string;
  category: TemplateCategory;
  language: TemplateLanguage;
  status: TemplateStatus;
  header: {
    type: HeaderType;
    text?: string;
    example?: string;
  };
  body: {
    text: string;
  };
  footer?: {
    text: string;
  };
  buttons: TemplateButton[];
}

const TemplateEditor: React.FC = () => {
  const [template, setTemplate] = useState<Template>({
    name: '',
    category: 'MARKETING',
    language: 'en',
    status: 'draft',
    header: {
      type: 'NONE'
    },
    body: {
      text: ''
    },
    buttons: []
  });

  const [headerFile, setHeaderFile] = useState<File | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleHeaderTypeChange = (type: HeaderType) => {
    setTemplate(prev => ({
      ...prev,
      header: {
        type,
        text: type === 'TEXT' ? '' : undefined,
        example: type !== 'TEXT' && type !== 'NONE' ? '' : undefined
      }
    }));
    setHeaderFile(null);
  };

  const handleAddButton = () => {
    if (template.buttons.length < 2) {
      setTemplate(prev => ({
        ...prev,
        buttons: [...prev.buttons, { type: 'URL', text: '', url: '' }]
      }));
    }
  };

  const handleRemoveButton = (index: number) => {
    setTemplate(prev => ({
      ...prev,
      buttons: prev.buttons.filter((_, i) => i !== index)
    }));
  };

  const handleButtonChange = (index: number, changes: Partial<TemplateButton>) => {
    setTemplate(prev => ({
      ...prev,
      buttons: prev.buttons.map((button, i) => 
        i === index ? { ...button, ...changes } : button
      )
    }));
  };

  const handleSubmit = async () => {
    // In a real implementation, this would call the WhatsApp Cloud API
    console.log('Submitting template:', template);
    setTemplate(prev => ({ ...prev, status: 'pending' }));
  };

  const renderHeaderInput = () => {
    switch (template.header.type) {
      case 'TEXT':
        return (
          <input
            type="text"
            value={template.header.text || ''}
            onChange={e => setTemplate(prev => ({
              ...prev,
              header: { ...prev.header, text: e.target.value }
            }))}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Enter header text"
          />
        );
      case 'IMAGE':
      case 'VIDEO':
      case 'DOCUMENT':
        return (
          <div className="space-y-3">
            <input
              type="file"
              onChange={e => setHeaderFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
            <input
              type="text"
              value={template.header.example || ''}
              onChange={e => setTemplate(prev => ({
                ...prev,
                header: { ...prev.header, example: e.target.value }
              }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Example URL for WhatsApp review"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <FileEdit className="h-6 w-6 text-emerald-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            {template.name ? `Edit Template: ${template.name}` : 'Create New Template'}
          </h1>
        </div>
        <div className="mt-4 flex space-x-3 sm:mt-0">
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <Eye className="mr-2 h-4 w-4" />
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <Save className="mr-2 h-4 w-4" />
            Submit for Approval
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-lg border border-gray-200 bg-white shadow">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">Template Details</h2>
              <div className="mt-6 space-y-6">
                <div>
                  <label htmlFor="templateName" className="block text-sm font-medium text-gray-700">
                    Template Name
                  </label>
                  <input
                    type="text"
                    id="templateName"
                    value={template.name}
                    onChange={e => setTemplate(prev => ({ ...prev, name: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    placeholder="e.g., welcome_message"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Use lowercase letters, numbers, and underscores only
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      id="category"
                      value={template.category}
                      onChange={e => setTemplate(prev => ({ 
                        ...prev, 
                        category: e.target.value as TemplateCategory 
                      }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    >
                      <option value="MARKETING">Marketing</option>
                      <option value="UTILITY">Utility</option>
                      <option value="AUTHENTICATION">Authentication</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                      Language
                    </label>
                    <select
                      id="language"
                      value={template.language}
                      onChange={e => setTemplate(prev => ({ 
                        ...prev, 
                        language: e.target.value as TemplateLanguage 
                      }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="pt">Portuguese</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                      <option value="it">Italian</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-white shadow">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">Message Content</h2>
              
              <div className="mt-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Header (Optional)</label>
                  <div className="mt-2 grid grid-cols-5 gap-2">
                    <button
                      type="button"
                      onClick={() => handleHeaderTypeChange('NONE')}
                      className={`flex flex-col items-center justify-center rounded-md border p-2 text-xs ${
                        template.header.type === 'NONE'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      None
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHeaderTypeChange('TEXT')}
                      className={`flex flex-col items-center justify-center rounded-md border p-2 text-xs ${
                        template.header.type === 'TEXT'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <FileEdit className="mb-1 h-4 w-4" />
                      Text
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHeaderTypeChange('IMAGE')}
                      className={`flex flex-col items-center justify-center rounded-md border p-2 text-xs ${
                        template.header.type === 'IMAGE'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Image className="mb-1 h-4 w-4" />
                      Image
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHeaderTypeChange('VIDEO')}
                      className={`flex flex-col items-center justify-center rounded-md border p-2 text-xs ${
                        template.header.type === 'VIDEO'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Video className="mb-1 h-4 w-4" />
                      Video
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHeaderTypeChange('DOCUMENT')}
                      className={`flex flex-col items-center justify-center rounded-md border p-2 text-xs ${
                        template.header.type === 'DOCUMENT'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Document className="mb-1 h-4 w-4" />
                      Document
                    </button>
                  </div>
                  {template.header.type !== 'NONE' && (
                    <div className="mt-3">
                      {renderHeaderInput()}
                    </div>
                  )}
                </div>

                <div>
                  <label htmlFor="body" className="block text-sm font-medium text-gray-700">
                    Body
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="body"
                      rows={4}
                      value={template.body.text}
                      onChange={e => setTemplate(prev => ({ 
                        ...prev, 
                        body: { text: e.target.value } 
                      }))}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                      placeholder="Enter your message here. Use {{1}}, {{2}}, etc. for variables"
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Use {{1}}, {{2}}, etc. for variables that will be replaced with actual values
                  </p>
                </div>

                <div>
                  <label htmlFor="footer" className="block text-sm font-medium text-gray-700">
                    Footer (Optional)
                  </label>
                  <input
                    type="text"
                    id="footer"
                    value={template.footer?.text || ''}
                    onChange={e => setTemplate(prev => ({ 
                      ...prev, 
                      footer: { text: e.target.value } 
                    }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    placeholder="Enter footer text"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">
                      Buttons (Optional)
                    </label>
                    {template.buttons.length < 2 && (
                      <button
                        type="button"
                        onClick={handleAddButton}
                        className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-500"
                      >
                        <Plus className="mr-1 h-4 w-4" />
                        Add Button
                      </button>
                    )}
                  </div>
                  <div className="mt-2 space-y-3">
                    {template.buttons.map((button, index) => (
                      <div key={index} className="rounded-md border border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">Button {index + 1}</h4>
                          <button
                            type="button"
                            onClick={() => handleRemoveButton(index)}
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-3 grid gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Button Type
                            </label>
                            <select
                              value={button.type}
                              onChange={e => handleButtonChange(index, { 
                                type: e.target.value as ButtonType,
                                url: e.target.value === 'URL' ? '' : undefined,
                                phone_number: e.target.value === 'PHONE_NUMBER' ? '' : undefined
                              })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                            >
                              <option value="URL">Visit Website</option>
                              <option value="PHONE_NUMBER">Call Phone Number</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Button Text
                            </label>
                            <input
                              type="text"
                              value={button.text}
                              onChange={e => handleButtonChange(index, { text: e.target.value })}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                              placeholder="e.g., Learn More"
                            />
                          </div>
                          {button.type === 'URL' && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                URL
                              </label>
                              <input
                                type="url"
                                value={button.url}
                                onChange={e => handleButtonChange(index, { url: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                                placeholder="https://example.com/{{1}}"
                              />
                              <p className="mt-1 text-xs text-gray-500">
                                You can use {{1}} for dynamic URLs
                              </p>
                            </div>
                          )}
                          {button.type === 'PHONE_NUMBER' && (
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Phone Number
                              </label>
                              <input
                                type="tel"
                                value={button.phone_number}
                                onChange={e => handleButtonChange(index, { phone_number: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                                placeholder="+1234567890"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Panel */}
        {showPreview && (
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow">
            <h2 className="text-lg font-medium text-gray-900">Message Preview</h2>
            <div className="mt-6">
              <div className="mx-auto max-w-sm overflow-hidden rounded-lg border border-gray-200 bg-gray-50 shadow">
                <div className="p-4">
                  {/* Header Preview */}
                  {template.header.type !== 'NONE' && (
                    <div className="mb-3">
                      {template.header.type === 'TEXT' && (
                        <p className="font-medium text-gray-900">{template.header.text}</p>
                      )}
                      {template.header.type === 'IMAGE' && (
                        <div className="aspect-w-16 aspect-h-9 rounded-lg bg-gray-200">
                          {headerFile && (
                            <img
                              src={URL.createObjectURL(headerFile)}
                              alt="Header"
                              className="object-cover"
                            />
                          )}
                        </div>
                      )}
                      {template.header.type === 'VIDEO' && (
                        <div className="aspect-w-16 aspect-h-9 rounded-lg bg-gray-200 flex items-center justify-center">
                          <Video className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      {template.header.type === 'DOCUMENT' && (
                        <div className="rounded-lg bg-gray-200 p-4 flex items-center">
                          <Document className="h-6 w-6 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-600">
                            {headerFile?.name || 'Document'}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Body Preview */}
                  <div className="space-y-2">
                    <p className="text-gray-900 whitespace-pre-wrap">{template.body.text}</p>
                    {template.footer && (
                      <p className="text-sm text-gray-500">{template.footer.text}</p>
                    )}
                  </div>

                  {/* Buttons Preview */}
                  {template.buttons.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {template.buttons.map((button, index) => (
                        <button
                          key={index}
                          className="w-full rounded-md bg-gray-100 py-2 px-4 text-sm font-medium text-gray-900 hover:bg-gray-200 flex items-center justify-center"
                        >
                          {button.type === 'URL' && <Globe className="mr-2 h-4 w-4" />}
                          {button.type === 'PHONE_NUMBER' && <Phone className="mr-2 h-4 w-4" />}
                          {button.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateEditor;