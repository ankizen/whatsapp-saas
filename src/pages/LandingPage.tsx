import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, FileText, Users, BarChart4 } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-emerald-600">WhatsApp Cloud</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">
              Log In
            </Link>
            <Link
              to="/register"
              className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-600"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Streamline Your WhatsApp Business Communication
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-xl text-emerald-50">
              Connect with customers where they are. Create templates, send bulk messages, and manage conversations all in one place.
            </p>
            <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
              <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                <Link
                  to="/register"
                  className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-emerald-600 shadow-sm hover:bg-emerald-50 sm:px-8"
                >
                  Get Started
                </Link>
                <a
                  href="#features"
                  className="flex items-center justify-center rounded-md border border-transparent border-white bg-emerald-600 bg-opacity-60 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Everything You Need for WhatsApp Business
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-xl text-gray-500">
                Our platform makes it easy to connect with customers through WhatsApp and manage all your communications.
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg bg-white p-6 shadow">
                  <div className="mb-4 rounded-md bg-emerald-100 p-3 text-emerald-600">
                    <FileText className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Template Management</h3>
                  <p className="mt-4 text-gray-500">
                    Create, edit and manage WhatsApp message templates that follow WhatsApp's guidelines.
                  </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                  <div className="mb-4 rounded-md bg-emerald-100 p-3 text-emerald-600">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Bulk Messaging</h3>
                  <p className="mt-4 text-gray-500">
                    Upload CSV files and send personalized messages to thousands of contacts at once.
                  </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                  <div className="mb-4 rounded-md bg-emerald-100 p-3 text-emerald-600">
                    <MessageSquare className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Live Chat</h3>
                  <p className="mt-4 text-gray-500">
                    Receive and respond to customer messages in real-time through an intuitive chat interface.
                  </p>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                  <div className="mb-4 rounded-md bg-emerald-100 p-3 text-emerald-600">
                    <BarChart4 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-900">Analytics</h3>
                  <p className="mt-4 text-gray-500">
                    Track message delivery, read receipts, and response rates with detailed analytics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-emerald-50 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-lg bg-white shadow-xl lg:grid lg:grid-cols-2 lg:gap-4">
              <div className="px-6 pt-10 pb-12 sm:px-16 sm:pt-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
                <div className="lg:self-center">
                  <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                    <span className="block">Ready to get started?</span>
                    <span className="block text-emerald-600">Sign up today and connect your WhatsApp Business account.</span>
                  </h2>
                  <p className="mt-4 text-lg leading-6 text-gray-500">
                    Join thousands of businesses already using our platform to engage with customers through WhatsApp.
                  </p>
                  <Link
                    to="/register"
                    className="mt-8 inline-flex items-center rounded-md border border-transparent bg-emerald-500 px-5 py-3 text-base font-medium text-white shadow hover:bg-emerald-600"
                  >
                    Sign Up Free
                  </Link>
                </div>
              </div>
              <div className="aspect-w-5 aspect-h-3 -mt-6 md:aspect-w-2 md:aspect-h-1">
                <img
                  className="translate-x-6 translate-y-6 transform rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20"
                  src="https://images.pexels.com/photos/5429393/pexels-photo-5429393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="App screenshot"
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-white">WhatsApp Cloud</span>
            </div>
            <div className="mt-8 flex space-x-6 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-gray-300">
                Terms
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                Privacy
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                Help Center
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-300">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8">
            <p className="text-base text-gray-400">
              &copy; 2025 WhatsApp Cloud. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;