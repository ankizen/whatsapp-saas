import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  MessageSquare, 
  FileText, 
  Send, 
  Users, 
  BarChart4, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';

// Stats component
const StatsCard: React.FC<{
  title: string;
  value: string;
  change: string;
  isIncrease: boolean;
}> = ({ title, value, change, isIncrease }) => (
  <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
    <dt className="truncate text-sm font-medium text-gray-500">{title}</dt>
    <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{value}</dd>
    <dd className={`mt-2 flex items-center text-sm ${isIncrease ? 'text-green-600' : 'text-red-600'}`}>
      {isIncrease ? (
        <ArrowUpRight className="mr-1 h-4 w-4 flex-shrink-0" />
      ) : (
        <ArrowUpRight className="mr-1 h-4 w-4 flex-shrink-0 transform rotate-90" />
      )}
      <span>{change}</span>
    </dd>
  </div>
);

// Template status card
const TemplateStatus: React.FC<{
  name: string;
  status: 'approved' | 'pending' | 'rejected';
  date: string;
}> = ({ name, status, date }) => (
  <div className="flex items-center justify-between border-b py-3">
    <div className="flex items-center">
      <FileText className="mr-3 h-5 w-5 text-gray-400" />
      <div>
        <p className="text-sm font-medium text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </div>
    <div className="flex items-center">
      {status === 'approved' && (
        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
          <CheckCircle className="mr-1 h-3 w-3" />
          Approved
        </span>
      )}
      {status === 'pending' && (
        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
          <svg className="mr-1 h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Pending
        </span>
      )}
      {status === 'rejected' && (
        <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
          <XCircle className="mr-1 h-3 w-3" />
          Rejected
        </span>
      )}
    </div>
  </div>
);

// Recent message card
const RecentMessage: React.FC<{
  name: string;
  message: string;
  time: string;
  isUnread?: boolean;
}> = ({ name, message, time, isUnread }) => (
  <Link to="/dashboard/conversations/1" className="block">
    <div className={`flex items-center border-b py-3 ${isUnread ? 'bg-emerald-50' : ''}`}>
      <div className="mr-4 flex-shrink-0">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          {name.charAt(0)}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <p className={`truncate text-sm font-medium ${isUnread ? 'text-emerald-800' : 'text-gray-900'}`}>{name}</p>
        <p className="truncate text-sm text-gray-500">{message}</p>
      </div>
      <div className="text-xs text-gray-500">{time}</div>
      {isUnread && <div className="ml-2 h-2 w-2 rounded-full bg-emerald-500"></div>}
    </div>
  </Link>
);

const Dashboard: React.FC = () => {
  const { user, connectWhatsApp } = useAuth();
  
  return (
    <div className="space-y-6">
      {/* Whatsapp Connection */}
      {!user?.whatsappConnected && (
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Connect your WhatsApp Business Account
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    Connect your WhatsApp Business Account to send messages, create templates, and engage with your customers.
                  </p>
                </div>
              </div>
              <div className="mt-5 sm:mt-0 sm:ml-6 sm:flex sm:flex-shrink-0 sm:items-center">
                <button
                  type="button"
                  onClick={connectWhatsApp}
                  className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:text-sm"
                >
                  Connect WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Stats */}
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Analytics</h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard title="Messages Sent" value="2,892" change="12% from last month" isIncrease={true} />
          <StatsCard title="Conversations" value="562" change="8% from last month" isIncrease={true} />
          <StatsCard title="Read Rate" value="86%" change="3% from last month" isIncrease={true} />
          <StatsCard title="Response Time" value="8 min" change="2 min from last month" isIncrease={false} />
        </dl>
      </div>
      
      {/* Recent activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Template status */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Templates</h3>
              <Link
                to="/dashboard/templates"
                className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="px-4 sm:px-6">
            <TemplateStatus 
              name="Welcome Message" 
              status="approved" 
              date="Approved on May 10, 2025" 
            />
            <TemplateStatus 
              name="Order Confirmation" 
              status="approved" 
              date="Approved on May 8, 2025" 
            />
            <TemplateStatus 
              name="Special Promotion" 
              status="pending" 
              date="Submitted on May 12, 2025" 
            />
            <TemplateStatus 
              name="Appointment Reminder" 
              status="rejected" 
              date="Rejected on May 5, 2025" 
            />
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <Link
              to="/dashboard/templates/new"
              className="flex items-center justify-center text-sm font-medium text-emerald-600 hover:text-emerald-500"
            >
              Create new template
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
        
        {/* Recent conversations */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:px-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Conversations</h3>
              <Link
                to="/dashboard/conversations"
                className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="px-4 sm:px-6">
            <RecentMessage 
              name="John Smith" 
              message="I'm interested in your services. Can you provide more information?" 
              time="10m ago"
              isUnread 
            />
            <RecentMessage 
              name="Sarah Johnson" 
              message="Thanks for the quick response! I'll get back to you soon." 
              time="1h ago" 
            />
            <RecentMessage 
              name="Michael Brown" 
              message="Is the special discount still available?" 
              time="3h ago" 
            />
            <RecentMessage 
              name="Emily Davis" 
              message="I need help with my recent order #12345" 
              time="5h ago"
              isUnread 
            />
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <Link
              to="/dashboard/conversations"
              className="flex items-center justify-center text-sm font-medium text-emerald-600 hover:text-emerald-500"
            >
              View all conversations
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Quick actions */}
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Actions</h3>
        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow hover:bg-gray-50 sm:p-6">
            <Link to="/dashboard/templates/new" className="block">
              <div className="flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-md bg-emerald-100 text-emerald-600">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Create Template</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Design a new message template for your business communications
                  </p>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow hover:bg-gray-50 sm:p-6">
            <Link to="/dashboard/messaging" className="block">
              <div className="flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-md bg-emerald-100 text-emerald-600">
                  <Send className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Send Bulk Messages</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    Upload a CSV and send personalized messages to multiple recipients
                  </p>
                </div>
              </div>
            </Link>
          </div>
          
          <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow hover:bg-gray-50 sm:p-6">
            <Link to="/dashboard/conversations" className="block">
              <div className="flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-md bg-emerald-100 text-emerald-600">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Manage Conversations</h4>
                  <p className="mt-1 text-sm text-gray-500">
                    View and respond to customer messages in a unified inbox
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;