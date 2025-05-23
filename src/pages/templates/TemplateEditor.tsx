import React from 'react';
import { FileEdit } from 'lucide-react';

const TemplateEditor: React.FC = () => {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center gap-3">
        <FileEdit className="h-6 w-6 text-blue-600" />
        <h1 className="text-2xl font-semibold text-gray-900">Template Editor</h1>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="templateName" className="block text-sm font-medium text-gray-700 mb-1">
              Template Name
            </label>
            <input
              type="text"
              id="templateName"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter template name"
            />
          </div>
          
          <div>
            <label htmlFor="templateContent" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="templateContent"
              rows={6}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your template content here..."
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
              Cancel
            </button>
            <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors">
              Save Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateEditor;