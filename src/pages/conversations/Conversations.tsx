import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Star, 
  CheckCircle, 
  ArrowUp, 
  ArrowDown 
} from 'lucide-react';

// Conversation interface
interface Conversation {
  id: string;
  contactName: string;
  contactPhone: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  starred: boolean;
  status: 'new' | 'active' | 'resolved';
}

// Mock data
const mockConversations: Conversation[] = [
  {
    id: '1',
    contactName: 'John Smith',
    contactPhone: '+1234567890',
    lastMessage: "I'm interested in your services. Can you provide more information?",
    timestamp: '2025-05-18T10:30:00',
    unread: true,
    starred: false,
    status: 'new'
  },
  {
    id: '2',
    contactName: 'Sarah Johnson',
    contactPhone: '+1987654321',
    lastMessage: "Thanks for the quick response! I'll get back to you soon.",
    timestamp: '2025-05-18T09:15:00',
    unread: false,
    starred: true,
    status: 'active'
  },
  {
    id: '3',
    contactName: 'Michael Brown',
    contactPhone: '+1122334455',
    lastMessage: "Is the special discount still available?",
    timestamp: '2025-05-17T16:45:00',
    unread: false,
    starred: false,
    status: 'active'
  },
  {
    id: '4',
    contactName: 'Emily Davis',
    contactPhone: '+1555666777',
    lastMessage: "I need help with my recent order #12345",
    timestamp: '2025-05-17T14:20:00',
    unread: true,
    starred: false,
    status: 'new'
  },
  {
    id: '5',
    contactName: 'David Wilson',
    contactPhone: '+1888999000',
    lastMessage: "The issue has been resolved. Thank you for your help!",
    timestamp: '2025-05-16T11:10:00',
    unread: false,
    starred: false,
    status: 'resolved'
  },
  {
    id: '6',
    contactName: 'Jennifer Lee',
    contactPhone: '+1222333444',
    lastMessage: "I'd like to schedule a consultation for next week.",
    timestamp: '2025-05-16T09:30:00',
    unread: false,
    starred: true,
    status: 'active'
  },
  {
    id: '7',
    contactName: 'Robert Taylor',
    contactPhone: '+1777888999',
    lastMessage: "Can you send me the product catalog?",
    timestamp: '2025-05-15T15:45:00',
    unread: false,
    starred: false,
    status: 'resolved'
  }
];

const Conversations: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  
  // Filter and sort conversations
  const filteredConversations = conversations
    .filter((conversation) => {
      const matchesSearch = 
        conversation.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conversation.contactPhone.includes(searchTerm) ||
        conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || conversation.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });
  
  const toggleStar = (id: string) => {
    setConversations(conversations.map(convo => 
      convo.id === id ? { ...convo, starred: !convo.starred } : convo
    ));
  };
  
  const markAsRead = (id: string) => {
    setConversations(conversations.map(convo => 
      convo.id === id ? { ...convo, unread: false } : convo
    ));
  };
  
  const updateStatus = (id: string, status: 'new' | 'active' | 'resolved') => {
    setConversations(conversations.map(convo => 
      convo.id === id ? { ...convo, status } : convo
    ));
  };
  
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Conversations</h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage and respond to customer messages
          </p>
        </div>
      </div>
      
      {/* Search and filters */}
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
                placeholder="Search conversations"
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
              <option value="all">All Conversations</option>
              <option value="new">New</option>
              <option value="active">Active</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
          
          <button
            type="button"
            onClick={() => setSortBy(sortBy === 'newest' ? 'oldest' : 'newest')}
            className="ml-4 inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
          >
            {sortBy === 'newest' ? (
              <>
                <ArrowDown className="mr-1 h-4 w-4" />
                Newest
              </>
            ) : (
              <>
                <ArrowUp className="mr-1 h-4 w-4" />
                Oldest
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Conversations list */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
        <ul className="divide-y divide-gray-200">
          {filteredConversations.length === 0 ? (
            <li className="p-4 text-center text-gray-500">
              No conversations found
            </li>
          ) : (
            filteredConversations.map((conversation) => (
              <li key={conversation.id} className={`hover:bg-gray-50 ${conversation.unread ? 'bg-emerald-50' : ''}`}>
                <div className="flex items-center px-4 py-4 sm:px-6">
                  <div className="min-w-0 flex-1">
                    <Link to={`/dashboard/conversations/${conversation.id}`} className="block">
                      <div className="flex items-center justify-between">
                        <div className="truncate">
                          <div className="flex items-center">
                            <p className={`truncate text-sm font-medium ${conversation.unread ? 'text-emerald-700' : 'text-gray-700'}`}>
                              {conversation.contactName}
                            </p>
                            {conversation.status === 'new' && (
                              <span className="ml-2 inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                                New
                              </span>
                            )}
                            {conversation.status === 'resolved' && (
                              <span className="ml-2 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Resolved
                              </span>
                            )}
                          </div>
                          <p className="mt-1 flex items-center text-sm text-gray-500">
                            <MessageSquare className="mr-1 h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{conversation.contactPhone}</span>
                          </p>
                        </div>
                        <div className="ml-2 flex flex-shrink-0">
                          <p className="text-sm text-gray-500">{formatDate(conversation.timestamp)}</p>
                        </div>
                      </div>
                      <p className={`mt-1 truncate text-sm ${conversation.unread ? 'font-medium text-emerald-900' : 'text-gray-600'}`}>
                        {conversation.lastMessage}
                      </p>
                    </Link>
                  </div>
                  <div className="ml-5 flex flex-shrink-0 space-x-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleStar(conversation.id);
                      }}
                      className={`rounded-full p-1 ${
                        conversation.starred ? 'bg-yellow-100 text-yellow-500' : 'text-gray-400 hover:text-gray-500'
                      }`}
                    >
                      <Star className="h-5 w-5" />
                    </button>
                    {conversation.unread && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          markAsRead(conversation.id);
                        }}
                        className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                      >
                        <CheckCircle className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Conversations;