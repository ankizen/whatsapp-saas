import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  MoreVertical, 
  CheckCircle, 
  XCircle, 
  Clock 
} from 'lucide-react';

// Template type
interface Template {
  id: string;
  name: string;
  category: string;
  status: 'approved' | 'pending' | 'rejected';
  language: string;
  createdAt: string;
}

// Mock data
const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Welcome Message',
    category: 'MARKETING',
    status: 'approved',
    language: 'English',
    createdAt: '2025-05-10',
  },
  {
    id: '2',
    name: 'Order Confirmation',
    category: 'UTILITY',
    status: 'approved',
    language: 'English',
    createdAt: '2025-05-08',
  },
  {
    id: '3',
    name: 'Special Promotion',
    category: 'MARKETING',
    status: 'pending',
    language: 'English',
    createdAt: '2025-05-12',
  },
  {
    id: '4',
    name: 'Appointment Reminder',
    category: 'UTILITY',
    status: 'rejected',
    language: 'English',
    createdAt: '2025-05-05',
  },
  {
    id: '5',
    name: 'Payment Confirmation',
    category: 'UTILITY',
    status: 'approved',
    language: 'English',
    createdAt: '2025-05-02',
  },
  {
    id: '6',
    name: 'Feedback Request',
    category: 'MARKETING',
    status: 'approved',
    language: 'English',
    createdAt: '2025-04-28',
  },
  {
    id: '7',
    name: 'Shipping Update',
    category: 'UTILITY',
    status: 'pending',
    language: 'English',
    createdAt: '2025-05-11',
  },
];

const Templates: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>(mockTemplates);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Filter templates based on search term and filters
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || template.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });
  
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Templates</h1>
          <p className="mt-2 text-sm text-gray-500">
            Create and manage your WhatsApp message templates
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            to="/dashboard/templates/new"
            className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <Plus className="-ml-1 mr-2 h-4 w-4" />
            New Template
          </Link>
        </div>
      </div>
      
      {/* Filters and search */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="mt-4 sm:mt-0">
          <div className="flex rounded-md shadow-sm">
            <div className="relative flex flex-grow items-stretch focus-within:z-10">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                placeholder="Search templates"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex sm:mt-0">
          <div className="ml-4 flex items-center">
            <Filter className="mr-2 h-5 w-5 text-gray-400" />
            <select
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          
          <div className="ml-4 flex items-center">
            <select
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="MARKETING">Marketing</option>
              <option value="UTILITY">Utility</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Templates table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Template
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Language
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              >
                Created
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredTemplates.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  No templates found. Create a new template to get started.
                </td>
              </tr>
            ) : (
              filteredTemplates.map((template) => (
                <tr key={template.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          <Link to={`/dashboard/templates/edit/${template.id}`} className="hover:text-emerald-600">
                            {template.name}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {template.category === 'UTILITY' ? (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                        Utility
                      </span>
                    ) : (
                      <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                        Marketing
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {template.status === 'approved' && (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Approved
                      </span>
                    )}
                    {template.status === 'pending' && (
                      <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                        <Clock className="mr-1 h-3 w-3" />
                        Pending
                      </span>
                    )}
                    {template.status === 'rejected' && (
                      <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                        <XCircle className="mr-1 h-3 w-3" />
                        Rejected
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {template.language}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(template.createdAt).toLocaleDateString()}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Templates;