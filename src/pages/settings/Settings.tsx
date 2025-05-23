import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  User, 
  Building, 
  Bell, 
  CreditCard, 
  Key, 
  Shield, 
  CheckCircle, 
  XCircle, 
  Phone, 
  Mail, 
  Globe
} from 'lucide-react';

// Mock data
const mockSubscription = {
  plan: 'Business Pro',
  price: '$49.99',
  billingCycle: 'monthly',
  nextBilling: '2025-06-15',
  paymentMethod: 'Visa ending in 4242',
};

const mockBillingHistory = [
  { date: '2025-05-15', amount: '$49.99', status: 'paid', invoice: 'INV-2025-05' },
  { date: '2025-04-15', amount: '$49.99', status: 'paid', invoice: 'INV-2025-04' },
  { date: '2025-03-15', amount: '$49.99', status: 'paid', invoice: 'INV-2025-03' },
];

const mockNotificationSettings = {
  email: {
    newMessage: true,
    templateStatus: true,
    bulkMessagingCompleted: true,
    accountUpdates: true,
  },
  browser: {
    newMessage: true,
    templateStatus: false,
    bulkMessagingCompleted: true,
    accountUpdates: false,
  },
};

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    businessName: user?.businessName || '',
    phone: '',
    website: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [notifications, setNotifications] = useState(mockNotificationSettings);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleNotificationChange = (channel: 'email' | 'browser', setting: string, value: boolean) => {
    setNotifications({
      ...notifications,
      [channel]: {
        ...notifications[channel],
        [setting]: value,
      },
    });
  };
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the profile data to your backend
    console.log('Save profile:', formData);
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <div className="mb-8">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Information</h3>
              <p className="mt-1 text-sm text-gray-500">
                Update your personal and business information
              </p>
            </div>
            
            <form onSubmit={handleSaveProfile}>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    id="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <input
                    type="text"
                    name="website"
                    id="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                    State / Province
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                    ZIP / Postal Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        );
        
      case 'billing':
        return (
          <div>
            <div className="mb-8">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Billing & Subscription</h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage your subscription and billing information
              </p>
            </div>
            
            <div className="mb-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
              <div className="px-4 py-5 sm:p-6">
                <h4 className="text-base font-medium text-gray-900">Current Plan</h4>
                <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Plan</p>
                    <p className="text-lg font-semibold text-gray-900">{mockSubscription.plan}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Price</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {mockSubscription.price} / {mockSubscription.billingCycle}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Next Billing Date</p>
                    <p className="text-base text-gray-900">
                      {new Date(mockSubscription.nextBilling).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Payment Method</p>
                    <p className="text-base text-gray-900">{mockSubscription.paymentMethod}</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Change Plan
                  </button>
                  <button
                    type="button"
                    className="ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Update Payment Method
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="mb-4 text-base font-medium text-gray-900">Billing History</h4>
              <div className="overflow-hidden rounded-lg border border-gray-200 shadow">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        Invoice
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {mockBillingHistory.map((item, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {new Date(item.date).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                          {item.amount}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            {item.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                          <a href="#" className="text-emerald-600 hover:text-emerald-900">
                            Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
        
      case 'notifications':
        return (
          <div>
            <div className="mb-8">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Notification Settings</h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage how and when you receive notifications
              </p>
            </div>
            
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow">
              <div className="px-4 py-5 sm:p-6">
                <h4 className="text-base font-medium text-gray-900">Email Notifications</h4>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">New Message Received</p>
                      <p className="text-xs text-gray-500">Get notified when a customer sends you a new message</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNotificationChange('email', 'newMessage', !notifications.email.newMessage)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                        notifications.email.newMessage ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          notifications.email.newMessage ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Template Status Updates</p>
                      <p className="text-xs text-gray-500">Get notified when your template status changes</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNotificationChange('email', 'templateStatus', !notifications.email.templateStatus)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                        notifications.email.templateStatus ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          notifications.email.templateStatus ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Bulk Messaging Completed</p>
                      <p className="text-xs text-gray-500">Get notified when your bulk messaging campaign is completed</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNotificationChange('email', 'bulkMessagingCompleted', !notifications.email.bulkMessagingCompleted)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                        notifications.email.bulkMessagingCompleted ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          notifications.email.bulkMessagingCompleted ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Account Updates</p>
                      <p className="text-xs text-gray-500">Get notified about important account and billing updates</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNotificationChange('email', 'accountUpdates', !notifications.email.accountUpdates)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                        notifications.email.accountUpdates ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          notifications.email.accountUpdates ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                <h4 className="text-base font-medium text-gray-900">Browser Notifications</h4>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">New Message Received</p>
                      <p className="text-xs text-gray-500">Get browser notifications when a customer sends you a new message</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNotificationChange('browser', 'newMessage', !notifications.browser.newMessage)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                        notifications.browser.newMessage ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          notifications.browser.newMessage ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Template Status Updates</p>
                      <p className="text-xs text-gray-500">Get browser notifications when your template status changes</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNotificationChange('browser', 'templateStatus', !notifications.browser.templateStatus)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                        notifications.browser.templateStatus ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          notifications.browser.templateStatus ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Bulk Messaging Completed</p>
                      <p className="text-xs text-gray-500">Get browser notifications when your bulk messaging campaign is completed</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNotificationChange('browser', 'bulkMessagingCompleted', !notifications.browser.bulkMessagingCompleted)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                        notifications.browser.bulkMessagingCompleted ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          notifications.browser.bulkMessagingCompleted ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Account Updates</p>
                      <p className="text-xs text-gray-500">Get browser notifications about important account and billing updates</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNotificationChange('browser', 'accountUpdates', !notifications.browser.accountUpdates)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${
                        notifications.browser.accountUpdates ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          notifications.browser.accountUpdates ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );
        
      case 'security':
        return (
          <div>
            <div className="mb-8">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Security Settings</h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage your password and security preferences
              </p>
            </div>
            
            <div className="mb-8 overflow-hidden rounded-lg border border-gray-200 shadow">
              <div className="px-4 py-5 sm:p-6">
                <h4 className="text-base font-medium text-gray-900">Change Password</h4>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="current-password"
                      id="current-password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                  </div>
                  <div></div>
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="new-password"
                      id="new-password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mb-8 overflow-hidden rounded-lg border border-gray-200 shadow">
              <div className="px-4 py-5 sm:p-6">
                <h4 className="text-base font-medium text-gray-900">Two-Factor Authentication</h4>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    Enable Two-Factor Authentication
                  </button>
                </div>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow">
              <div className="px-4 py-5 sm:p-6">
                <h4 className="text-base font-medium text-gray-900">Session Management</h4>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    View and manage your active sessions across different devices.
                  </p>
                </div>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between rounded-md border border-gray-200 p-4">
                    <div className="flex items-center">
                      <div className="rounded-md bg-emerald-100 p-2 text-emerald-700">
                        <Globe className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Chrome on Windows</p>
                        <p className="text-xs text-gray-500">Current session • Last active just now</p>
                      </div>
                    </div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                        Current
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-md border border-gray-200 p-4">
                    <div className="flex items-center">
                      <div className="rounded-md bg-emerald-100 p-2 text-emerald-700">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Safari on iPhone</p>
                        <p className="text-xs text-gray-500">Last active 2 days ago</p>
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                      >
                        Revoke
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                  >
                    <XCircle className="mr-2 h-4 w-4 text-gray-500" />
                    Sign Out All Other Sessions
                  </button>
                </div>
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
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your account and preferences
          </p>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
              activeTab === 'profile'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('profile')}
          >
            <User className="mr-2 -mt-1 inline h-5 w-5" />
            Profile
          </button>
          <button
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
              activeTab === 'billing'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('billing')}
          >
            <CreditCard className="mr-2 -mt-1 inline h-5 w-5" />
            Billing
          </button>
          <button
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
              activeTab === 'notifications'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell className="mr-2 -mt-1 inline h-5 w-5" />
            Notifications
          </button>
          <button
            className={`whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium ${
              activeTab === 'security'
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('security')}
          >
            <Shield className="mr-2 -mt-1 inline h-5 w-5" />
            Security
          </button>
        </nav>
      </div>
      
      {/* Tab content */}
      {renderTabContent()}
    </div>
  );
};

export default Settings;