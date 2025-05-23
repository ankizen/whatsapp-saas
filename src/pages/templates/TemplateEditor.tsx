import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, 
  ArrowLeft, 
  Plus, 
  Trash, 
  HelpCircle, 
  AlertCircle, 
  CheckCircle,
  Image,
  Video,
  File,
  MessageSquare 
} from 'lucide-react';

interface TemplateContent {
  type: 'header' | 'body' | 'footer' | 'buttons';
  text?: string;
  format?: 'text' | 'image' | 'video' | 'document';
  buttonType?: 'quick_reply' | 'url';
  urlType?: 'static' | 'dynamic';
  buttons?: Array<{ text: string; url?: string }>;
}

interface Template {
  id: string;
  name: string;
  category: string;
  language: string;
  status: 'draft' | 'approved' | 'pending' | 'rejected';
  content: TemplateContent[];
}

const mockTemplates: Record<string, Template> = {
  '1': {
    id: '1',
    name: 'Welcome Message',
    category: 'MARKETING',
    language: 'English',
    status: 'approved',
    content: [
      { type: 'header', format: 'text', text: 'Welcome to Our Business!' },
      { type: 'body', text: 'Hello {{1}}, thank you for connecting with us. We\'re excited to help you with your {{2}} needs. Let us know how we can assist you today.' },
      { type: 'footer', text: 'Reply to this message to start a conversation.' },
      { 
        type: 'buttons', 
        buttonType: 'quick_reply',
        buttons: [
          { text: 'View Products' },
          { text: 'Talk to Support' }
        ]
      }
    ]
  }
};

const TemplateSection: React.FC<{
  section: TemplateContent;
  index: number;
  updateSection: (index: number, content: TemplateContent) => void;
  removeSection: (index: number) => void;
  showRemove: boolean;
}> = ({ section, index, updateSection, removeSection, showRemove }) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateSection(index, { ...section, text: e.target.value });
  };

  const handleFormatChange = (format: 'text' | 'image' | 'video' | 'document') => {
    updateSection(index, { ...section, format });
  };
  
  const handleButtonTextChange = (buttonIndex: number, text: string) => {
    if (section.type === 'buttons' && section.buttons) {
      const newButtons = [...section.buttons];
      newButtons[buttonIndex] = { ...newButtons[buttonIndex], text };
      updateSection(index, { ...section, buttons: newButtons });
    }
  };
  
  const handleButtonUrlChange = (buttonIndex: number, url: string) => {
    if (section.type === 'buttons' && section.buttons) {
      const newButtons = [...section.buttons];
      newButtons[buttonIndex] = { ...newButtons[buttonIndex], url };
      updateSection(index, { ...section, buttons: newButtons });
    }
  };
  
  const handleButtonTypeChange = (buttonType: 'quick_reply' | 'url') => {
    updateSection(index, { 
      ...section, 
      buttonType, 
      buttons: section.type === 'buttons' && section.buttons 
        ? section.buttons.map(button => ({ 
            text: button.text, 
            ...(buttonType === 'url' ? { url: button.url || '' } : {}) 
          })) 
        : []
    });
  };

  const handleUrlTypeChange = (urlType: 'static' | 'dynamic') => {
    if (section.type === 'buttons' && section.buttonType === 'url') {
      updateSection(index, { ...section, urlType });
    }
  };
  
  const addButton = () => {
    if (section.type === 'buttons') {
      const newButtons = [...(section.buttons || [])];
      if (section.buttonType === 'url') {
        newButtons.push({ text: '', url: '' });
      } else {
        newButtons.push({ text: '' });
      }
      updateSection(index, { ...section, buttons: newButtons });
    }
  };
  
  const removeButton = (buttonIndex: number) => {
    if (section.type === 'buttons' && section.buttons) {
      const newButtons = [...section.buttons];
      newButtons.splice(buttonIndex, 1);
      updateSection(index, { ...section, buttons: newButtons });
    }
  };
  
  return (
    <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="rounded bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 capitalize">
            {section.type}
          </span>
          {section.type === 'header' && section.format && (
            <span className="ml-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 capitalize">
              {section.format}
            </span>
          )}
          {section.type === 'buttons' && section.buttonType && (
            <span className="ml-2 rounded bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800 capitalize">
              {section.buttonType === 'quick_reply' ? 'Quick Reply' : 'URL'}
            </span>
          )}
        </div>
        
        {showRemove && (
          <button 
            type="button"
            onClick={() => removeSection(index)}
            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
          >
            <Trash className="h-4 w-4" />
          </button>
        )}
      </div>
      
      {section.type === 'header' && (
        <div>
          <div className="mb-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleFormatChange('text')}
              className={`flex items-center rounded-md px-3 py-1.5 text-sm ${
                section.format === 'text' 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <MessageSquare className="mr-1.5 h-4 w-4" />
              Text
            </button>
            <button
              type="button"
              onClick={() => handleFormatChange('image')}
              className={`flex items-center rounded-md px-3 py-1.5 text-sm ${
                section.format === 'image' 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Image className="mr-1.5 h-4 w-4" />
              Image
            </button>
            <button
              type="button"
              onClick={() => handleFormatChange('video')}
              className={`flex items-center rounded-md px-3 py-1.5 text-sm ${
                section.format === 'video' 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Video className="mr-1.5 h-4 w-4" />
              Video
            </button>
            <button
              type="button"
              onClick={() => handleFormatChange('document')}
              className={`flex items-center rounded-md px-3 py-1.5 text-sm ${
                section.format === 'document' 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <File className="mr-1.5 h-4 w-4" />
              Document
            </button>
          </div>
          
          {section.format === 'text' && (
            <div>
              <label htmlFor={`header-text-${index}`} className="block text-sm font-medium text-gray-700">
                Header Text
              </label>
              <div className="mt-1">
                <textarea
                  id={`header-text-${index}`}
                  rows={2}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  placeholder="Enter header text"
                  value={section.text || ''}
                  onChange={handleTextChange}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Maximum 60 characters. No formatting allowed.
              </p>
            </div>
          )}
          
          {(section.format === 'image' || section.format === 'video' || section.format === 'document') && (
            <div className="mt-2 rounded-md border-2 border-dashed border-gray-300 p-6 text-center">
              <div className="flex flex-col items-center">
                {section.format === 'image' && <Image className="mx-auto h-12 w-12 text-gray-400" />}
                {section.format === 'video' && <Video className="mx-auto h-12 w-12 text-gray-400" />}
                {section.format === 'document' && <File className="mx-auto h-12 w-12 text-gray-400" />}
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  Upload a {section.format}
                </span>
                <span className="mt-1 block text-xs text-gray-500">
                  {section.format === 'image' && 'PNG, JPG up to 5MB'}
                  {section.format === 'video' && 'MP4 up to 16MB'}
                  {section.format === 'document' && 'PDF up to 100MB'}
                </span>
                <button
                  type="button"
                  className="mt-4 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Upload
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      
      {(section.type === 'body' || section.type === 'footer') && (
        <div>
          <label htmlFor={`${section.type}-text-${index}`} className="block text-sm font-medium text-gray-700 capitalize">
            {section.type} Text
          </label>
          <div className="mt-1">
            <textarea
              id={`${section.type}-text-${index}`}
              rows={section.type === 'body' ? 4 : 2}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              placeholder={`Enter ${section.type} text`}
              value={section.text || ''}
              onChange={handleTextChange}
            />
          </div>
          {section.type === 'body' && (
            <p className="mt-1 text-xs text-gray-500">
              Use &#123;&#123;1&#125;&#125;, &#123;&#123;2&#125;&#125;, etc. for variables. Maximum 1024 characters.
            </p>
          )}
          {section.type === 'footer' && (
            <p className="mt-1 text-xs text-gray-500">
              Maximum 60 characters. No formatting or variables allowed.
            </p>
          )}
        </div>
      )}
      
      {section.type === 'buttons' && (
        <div>
          <div className="mb-4">
            <span className="block text-sm font-medium text-gray-700">Button Type</span>
            <div className="mt-2 flex gap-3">
              <button
                type="button"
                onClick={() => handleButtonTypeChange('quick_reply')}
                className={`rounded-md px-3 py-1.5 text-sm ${
                  section.buttonType === 'quick_reply' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Quick Reply
              </button>
              <button
                type="button"
                onClick={() => handleButtonTypeChange('url')}
                className={`rounded-md px-3 py-1.5 text-sm ${
                  section.buttonType === 'url' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                URL Button
              </button>
            </div>
          </div>

          {section.buttonType === 'url' && (
            <div className="mb-4">
              <span className="block text-sm font-medium text-gray-700">URL Type</span>
              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => handleUrlTypeChange('static')}
                  className={`rounded-md px-3 py-1.5 text-sm ${
                    section.urlType === 'static' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Static URL
                </button>
                <button
                  type="button"
                  onClick={() => handleUrlTypeChange('dynamic')}
                  className={`rounded-md px-3 py-1.5 text-sm ${
                    section.urlType === 'dynamic' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Dynamic URL
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                {section.urlType === 'dynamic' 
                  ? 'Dynamic URLs can include variables like &#123;&#123;1&#125;&#125;, &#123;&#123;2&#125;&#125;, etc.'
                  : 'Static URLs remain the same for all messages'}
              </p>
            </div>
          )}
          
          {section.buttons && section.buttons.map((button, buttonIndex) => (
            <div key={buttonIndex} className="mb-3 rounded border border-gray-200 p-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-500">Button {buttonIndex + 1}</span>
                {section.buttons && section.buttons.length > 1 && (
                  <button 
                    type="button"
                    onClick={() => removeButton(buttonIndex)}
                    className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="mt-2">
                <label htmlFor={`button-text-${index}-${buttonIndex}`} className="block text-sm font-medium text-gray-700">
                  Button Text
                </label>
                <input
                  type="text"
                  id={`button-text-${index}-${buttonIndex}`}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  placeholder="Enter button text"
                  value={button.text || ''}
                  onChange={(e) => handleButtonTextChange(buttonIndex, e.target.value)}
                />
                <p className="mt-1 text-xs text-gray-500">Maximum 20 characters</p>
              </div>
              
              {section.buttonType === 'url' && (
                <div className="mt-2">
                  <label htmlFor={`button-url-${index}-${buttonIndex}`} className="block text-sm font-medium text-gray-700">
                    URL {section.urlType === 'dynamic' && '(supports variables)'}
                  </label>
                  <input
                    type="url"
                    id={`button-url-${index}-${buttonIndex}`}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    placeholder={section.urlType === 'dynamic' ? 'https://example.com/&#123;&#123;1&#125;&#125;' : 'https://example.com'}
                    value={button.url || ''}
                    onChange={(e) => handleButtonUrlChange(buttonIndex, e.target.value)}
                  />
                  {section.urlType === 'dynamic' && (
                    <p className="mt-1 text-xs text-gray-500">
                      Use &#123;&#123;1&#125;&#125;, &#123;&#123;2&#125;&#125;, etc. to include variables in the URL
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
          
          {section.buttons && section.buttons.length < 3 && (
            <button
              type="button"
              onClick={addButton}
              className="mt-2 flex items-center rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              <Plus className="-ml-1 mr-2 h-4 w-4" />
              Add Button
            </button>
          )}
          
          <p className="mt-3 text-xs text-gray-500">
            Maximum 3 buttons allowed. Text limited to 20 characters per button.
          </p>
        </div>
      )}
    </div>
  );
};

const TemplateEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [name, setName] = useState('');
  const [category, setCategory] = useState('UTILITY');
  const [language, setLanguage] = useState('English');
  const [content, setContent] = useState<TemplateContent[]>([
    { type: 'body', text: '' }
  ]);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  
  useEffect(() => {
    if (isEditing && id && mockTemplates[id]) {
      const template = mockTemplates[id];
      setName(template.name);
      setCategory(template.category);
      setLanguage(template.language);
      setContent(template.content);
    }
  }, [isEditing, id]);
  
  const addSection = (type: 'header' | 'body' | 'footer' | 'buttons') => {
    let newSection: TemplateContent;
    
    switch (type) {
      case 'header':
        newSection = { type: 'header', format: 'text', text: '' };
        break;
      case 'footer':
        newSection = { type: 'footer', text: '' };
        break;
      case 'buttons':
        newSection = { 
          type: 'buttons', 
          buttonType: 'quick_reply',
          buttons: [{ text: '' }]
        };
        break;
      default:
        newSection = { type: 'body', text: '' };
    }
    
    setContent([...content, newSection]);
  };
  
  const updateSection = (index: number, updatedSection: TemplateContent) => {
    const newContent = [...content];
    newContent[index] = updatedSection;
    setContent(newContent);
  };
  
  const removeSection = (index: number) => {
    const newContent = [...content];
    newContent.splice(index, 1);
    setContent(newContent);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setSaveStatus('saving');
    
    // Simulate API call
    setTimeout(() => {
      console.log({
        id: isEditing ? id : Date.now().toString(),
        name,
        category,
        language,
        content,
        status: 'draft'
      });
      
      setSaveStatus('saved');
      
      // Reset after 2 seconds
      setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    }, 1000);
  };
  
  const canAddHeader = !content.some(section => section.type === 'header');
  const canAddFooter = !content.some(section => section.type === 'footer');
  const canAddButtons = !content.some(section => section.type === 'buttons');
  
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => navigate('/dashboard/templates')}
            className="mr-4 rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {isEditing ? 'Edit Template' : 'Create Template'}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {isEditing 
                ? 'Make changes to your existing template' 
                : 'Create a new WhatsApp message template for your business'
              }
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex items-center sm:mt-0">
          {saveStatus === 'saved' && (
            <span className="mr-4 flex items-center text-sm text-green-600">
              <CheckCircle className="mr-1 h-4 w-4" />
              Saved
            </span>
          )}
          {saveStatus === 'error' && (
            <span className="mr-4 flex items-center text-sm text-red-600">
              <AlertCircle className="mr-1 h-4 w-4" />
              Error saving
            </span>
          )}
          
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saveStatus === 'saving'}
            className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-75"
          >
            <Save className="-ml-1 mr-2 h-4 w-4" />
            {saveStatus === 'saving' ? 'Saving...' : 'Save Template'}
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Template Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                      placeholder="e.g. Welcome Message"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    This name is for your reference only
                  </p>
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <div className="mt-1">
                    <select
                      id="category"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                    >
                      <option value="UTILITY">Utility</option>
                      <option value="MARKETING">Marketing</option>
                    </select>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Marketing templates have more restrictions
                  </p>
                </div>
                
                <div>
                  <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                    Language
                  </label>
                  <div className="mt-1">
                    <select
                      id="language"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      required
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                      <option value="Portuguese">Portuguese</option>
                      <option value="Arabic">Arabic</option>
                      <option value="Hindi">Hindi</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Template Content</h3>
                <div className="flex space-x-2">
                  <button
                    type="button"
                    disabled={!canAddHeader}
                    onClick={() => addSection('header')}
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white py-1.5 px-3 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Add Header
                  </button>
                  <button
                    type="button"
                    onClick={() => addSection('body')}
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white py-1.5 px-3 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    Add Body
                  </button>
                  <button
                    type="button"
                    disabled={!canAddFooter}
                    onClick={() => addSection('footer')}
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white py-1.5 px-3 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Add Footer
                  </button>
                  <button
                    type="button"
                    disabled={!canAddButtons}
                    onClick={() => addSection('buttons')}
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white py-1.5 px-3 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Add Buttons
                  </button>
                </div>
              </div>
              
              {content.map((section, index) => (
                <TemplateSection
                  key={index}
                  section={section}
                  index={index}
                  updateSection={updateSection}
                  removeSection={removeSection}
                  showRemove={content.length > 1}
                />
              ))}
            </div>
          </form>
        </div>
        
        <div>
          <div className="sticky top-6 space-y-6">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">Template Preview</h3>
              <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <div className="bg-emerald-500 px-4 py-2 text-white">
                  <div className="text-sm font-medium">WhatsApp Message</div>
                </div>
                <div className="p-4">
                  {content.map((section, index) => (
                    <div key={index} className="mb-3">
                      {section.type === 'header' && section.format === 'text' && (
                        <div className="text-lg font-semibold text-gray-900">{section.text || 'Header Text'}</div>
                      )}
                      {section.type === 'header' && section.format !== 'text' && (
                        <div className="mb-2 h-40 w-full rounded-lg bg-gray-200 flex items-center justify-center">
                          {section.format === '
image' && <Image className="h-8 w-8 text-gray-400" />}
                          {section.format === 'video' && <Video className="h-8 w-8 text-gray-400" />}
                          {section.format === 'document' && <File className="h-8 w-8 text-gray-400" />}
                        </div>
                      )}
                      {section.type === 'body' && (
                        <div className="whitespace-pre-wrap text-gray-800">
                          {section.text || 'Body text goes here. Add &#123;&#123;1&#125;&#125; variables if needed.'}
                        </div>
                      )}
                      {section.type === 'footer' && (
                        <div className="mt-2 text-sm text-gray-500">
                          {section.text || 'Footer text goes here'}
                        </div>
                      )}
                      {section.type === 'buttons' && section.buttons && (
                        <div className="mt-3 space-y-2">
                          {section.buttons.map((button, buttonIndex) => (
                            <button
                              key={buttonIndex}
                              type="button"
                              className="w-full rounded-md border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-700"
                            >
                              {button.text || `Button ${buttonIndex + 1}`}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center">
                <HelpCircle className="mr-2 h-5 w-5 text-emerald-500" />
                <h3 className="text-lg font-medium text-gray-900">Template Guidelines</h3>
              </div>
              <div className="mt-4 space-y-3 text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-900">Structure:</span> Templates can include a header, body, footer, and buttons.
                </p>
                <p>
                  <span className="font-medium text-gray-900">Variables:</span> Use &#123;&#123;1&#125;&#125;, &#123;&#123;2&#125;&#125;, etc. to personalize messages.
                </p>
                <p>
                  <span className="font-medium text-gray-900">Approval:</span> All templates must be approved by WhatsApp before use.
                </p>
                <p>
                  <span className="font-medium text-gray-900">Marketing restrictions:</span> Marketing templates have stricter approval criteria.
                </p>
                <a
                  href="#"
                  className="mt-2 inline-flex text-sm font-medium text-emerald-600 hover:text-emerald-500"
                >
                  View full guidelines
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;