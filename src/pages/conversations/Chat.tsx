import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Send, 
  Star, 
  CheckCircle, 
  Paperclip, 
  Image, 
  Smile, 
  Info, 
  User,
  Phone,
  FileText 
} from 'lucide-react';

// Message interface
interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'document';
  media?: string;
}

// Contact interface
interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  lastSeen?: string;
  notes?: string;
  tags?: string[];
  starred: boolean;
  status: 'new' | 'active' | 'resolved';
}

// Mock data
const mockContacts: Record<string, Contact> = {
  '1': {
    id: '1',
    name: 'John Smith',
    phone: '+1234567890',
    email: 'john.smith@example.com',
    lastSeen: '2025-05-18T10:30:00',
    notes: 'Interested in premium plan',
    tags: ['lead', 'premium'],
    starred: false,
    status: 'new'
  },
  '2': {
    id: '2',
    name: 'Sarah Johnson',
    phone: '+1987654321',
    email: 'sarah.j@example.com',
    lastSeen: '2025-05-18T09:15:00',
    notes: 'Current customer, occasional support inquiries',
    tags: ['customer', 'support'],
    starred: true,
    status: 'active'
  }
};

const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1-1',
      senderId: '1',
      text: "Hello, I'm interested in your services. Can you provide more information?",
      timestamp: '2025-05-18T10:15:00',
      status: 'read',
      type: 'text'
    },
    {
      id: '1-2',
      senderId: 'me',
      text: "Hi John! Thank you for your interest. We offer a range of services including template creation, bulk messaging, and conversation management for WhatsApp Business. What specific aspect are you interested in?",
      timestamp: '2025-05-18T10:20:00',
      status: 'read',
      type: 'text'
    },
    {
      id: '1-3',
      senderId: '1',
      text: "I'm mainly looking for bulk messaging capabilities. Do you have pricing details?",
      timestamp: '2025-05-18T10:25:00',
      status: 'read',
      type: 'text'
    },
    {
      id: '1-4',
      senderId: 'me',
      text: "Of course! Our bulk messaging starts at $0.05 per message with volume discounts available. I'd be happy to share our complete pricing guide.",
      timestamp: '2025-05-18T10:28:00',
      status: 'delivered',
      type: 'text'
    },
    {
      id: '1-5',
      senderId: 'me',
      text: "Here's our pricing guide for your reference.",
      timestamp: '2025-05-18T10:29:00',
      status: 'delivered',
      type: 'document',
      media: 'pricing_guide.pdf'
    },
    {
      id: '1-6',
      senderId: '1',
      text: "Thanks for the information. I'm comparing a few options and will get back to you soon.",
      timestamp: '2025-05-18T10:30:00',
      status: 'read',
      type: 'text'
    }
  ],
  '2': [
    {
      id: '2-1',
      senderId: '2',
      text: "Hi, I've been using your service for a few months now. I'm wondering if there are any new features coming soon?",
      timestamp: '2025-05-18T09:00:00',
      status: 'read',
      type: 'text'
    },
    {
      id: '2-2',
      senderId: 'me',
      text: "Hello Sarah! Thanks for being a valued customer. We're actually launching a new analytics dashboard next month that will provide deeper insights into message performance.",
      timestamp: '2025-05-18T09:05:00',
      status: 'read',
      type: 'text'
    },
    {
      id: '2-3',
      senderId: 'me',
      text: "Here's a preview of what it will look like:",
      timestamp: '2025-05-18T09:06:00',
      status: 'read',
      type: 'image',
      media: 'analytics_preview.jpg'
    },
    {
      id: '2-4',
      senderId: '2',
      text: "That looks impressive! Will it be included in my current subscription or is it a premium feature?",
      timestamp: '2025-05-18T09:10:00',
      status: 'read',
      type: 'text'
    },
    {
      id: '2-5',
      senderId: 'me',
      text: "Good news! It will be included in all existing subscriptions at no additional cost. We value our customers and are constantly working to improve our service.",
      timestamp: '2025-05-18T09:12:00',
      status: 'read',
      type: 'text'
    },
    {
      id: '2-6',
      senderId: '2',
      text: "Thanks for the quick response! I'll get back to you soon.",
      timestamp: '2025-05-18T09:15:00',
      status: 'read',
      type: 'text'
    }
  ]
};

const Chat: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [contact, setContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showContactInfo, setShowContactInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (id && mockContacts[id]) {
      setContact(mockContacts[id]);
      setMessages(mockMessages[id] || []);
    }
  }, [id]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !contact) return;
    
    const newMsg: Message = {
      id: `${id}-${messages.length + 1}`,
      senderId: 'me',
      text: newMessage,
      timestamp: new Date().toISOString(),
      status: 'sent',
      type: 'text'
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate message delivery status change
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMsg.id ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 1000);
  };
  
  const formatMessageTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatLastSeen = (timestamp?: string) => {
    if (!timestamp) return 'Unknown';
    
    const lastSeen = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - lastSeen.getTime()) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} hours ago`;
    
    return lastSeen.toLocaleDateString();
  };
  
  const toggleStar = () => {
    if (!contact) return;
    
    const updatedContact = { ...contact, starred: !contact.starred };
    setContact(updatedContact);
    
    // In a real app, you would update this in your backend
    mockContacts[contact.id] = updatedContact;
  };
  
  const updateStatus = (status: 'new' | 'active' | 'resolved') => {
    if (!contact) return;
    
    const updatedContact = { ...contact, status };
    setContact(updatedContact);
    
    // In a real app, you would update this in your backend
    mockContacts[contact.id] = updatedContact;
  };
  
  if (!contact) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-gray-500">Contact not found</p>
      </div>
    );
  }
  
  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
      {/* Chat header */}
      <div className="border-b border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link
              to="/dashboard/conversations"
              className="mr-3 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 sm:mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex min-w-0 flex-1 items-center">
              <div className="mr-3 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                {contact.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <h2 className="text-sm font-medium text-gray-900 sm:text-base">
                  {contact.name}
                </h2>
                <p className="truncate text-xs text-gray-500 sm:text-sm">
                  {contact.phone} • Last seen {formatLastSeen(contact.lastSeen)}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={toggleStar}
              className={`rounded-full p-1 ${
                contact.starred ? 'bg-yellow-100 text-yellow-500' : 'text-gray-400 hover:text-gray-500'
              }`}
            >
              <Star className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setShowContactInfo(!showContactInfo)}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
            >
              <Info className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex flex-1 overflow-hidden">
        <div className={`flex-1 overflow-y-auto bg-gray-50 p-4 ${showContactInfo ? 'hidden md:block' : 'block'}`}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs rounded-lg px-4 py-2 sm:max-w-md ${
                  message.senderId === 'me'
                    ? 'bg-emerald-100 text-emerald-900'
                    : 'bg-white text-gray-900 shadow-sm'
                }`}>
                  {message.type === 'text' && (
                    <p className="text-sm">{message.text}</p>
                  )}
                  
                  {message.type === 'image' && (
                    <div>
                      <div className="overflow-hidden rounded-lg">
                        <img
                          src="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                          alt="Shared image"
                          className="h-auto w-full object-cover"
                        />
                      </div>
                      <p className="mt-1 text-sm">{message.text}</p>
                    </div>
                  )}
                  
                  {message.type === 'document' && (
                    <div className="flex items-center rounded-md bg-gray-50 p-2">
                      <FileText className="mr-2 h-6 w-6 text-blue-500" />
                      <div>
                        <p className="text-xs font-medium text-gray-900">{message.media}</p>
                        <p className="text-xs text-gray-500">PDF Document</p>
                      </div>
                    </div>
                  )}
                  
                  <div className={`mt-1 flex items-center text-xs ${
                    message.senderId === 'me' ? 'justify-end text-emerald-700' : 'text-gray-500'
                  }`}>
                    <span>{formatMessageTime(message.timestamp)}</span>
                    {message.senderId === 'me' && (
                      <span className="ml-1">
                        {message.status === 'sent' && '✓'}
                        {message.status === 'delivered' && '✓✓'}
                        {message.status === 'read' && (
                          <span className="text-blue-500">✓✓</span>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        {/* Contact info sidebar */}
        {showContactInfo && (
          <div className="w-full border-l border-gray-200 bg-white md:w-80">
            <div className="p-6">
              <div className="mb-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <span className="text-2xl font-semibold">{contact.name.charAt(0)}</span>
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">{contact.name}</h3>
                <p className="text-sm text-gray-500">{contact.phone}</p>
              </div>
              
              <div className="mb-6 space-y-4">
                <div>
                  <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Contact Details</h4>
                  {contact.email && (
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-700">{contact.email}</span>
                    </div>
                  )}
                  <div className="mt-2 flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{contact.phone}</span>
                  </div>
                </div>
                
                {contact.notes && (
                  <div>
                    <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Notes</h4>
                    <p className="rounded-md bg-gray-50 p-3 text-sm text-gray-700">{contact.notes}</p>
                  </div>
                )}
                
                {contact.tags && contact.tags.length > 0 && (
                  <div>
                    <h4 className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {contact.tags.map((tag, index) => (
                        <span key={index} className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <h4 className="text-xs font-medium uppercase tracking-wide text-gray-500">Actions</h4>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    className={`inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium ${
                      contact.status === 'new'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => updateStatus('new')}
                  >
                    Mark as New
                  </button>
                  <button
                    type="button"
                    className={`inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium ${
                      contact.status === 'active'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => updateStatus('active')}
                  >
                    Mark as Active
                  </button>
                  <button
                    type="button"
                    className={`inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium ${
                      contact.status === 'resolved'
                        ? 'border-gray-500 bg-gray-50 text-gray-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => updateStatus('resolved')}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Mark as Resolved
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Message input */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex items-center">
          <button
            type="button"
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
          >
            <Image className="h-5 w-5" />
          </button>
          <div className="relative ml-2 flex-1">
            <textarea
              rows={1}
              className="block w-full resize-none rounded-lg border-gray-300 py-2 pl-3 pr-10 focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <button
              type="button"
              className="absolute right-2 top-2 rounded-full p-1 text-gray-400 hover:text-gray-500"
            >
              <Smile className="h-5 w-5" />
            </button>
          </div>
          <button
            type="button"
            className="ml-2 rounded-full bg-emerald-500 p-2 text-white hover:bg-emerald-600"
            onClick={handleSendMessage}
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;