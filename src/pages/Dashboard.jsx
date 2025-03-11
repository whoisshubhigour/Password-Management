import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [hoveredCategory, setHoveredCategory] = useState(null);

  
 
  const categories = [
    {
      id: 'mails',
      title: 'Mails',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Manage your company and client email accounts',
    },
    {
      id: 'devices',
      title: 'Devices',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description: 'Track all your devices and network information',
    },
    {
      id: 'github',
      title: 'GitHub',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
        </svg>
      ),
      description: 'Manage your GitHub account credentials',
    },
    {
      id: 'social-media',
      title: 'Social Media',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      description: 'Keep track of your social media accounts',
    },
  ];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="absolute inset-0 bg-metal-texture opacity-20 z-0"></div>
        <div className="absolute inset-0 bg-locker-grid opacity-30 z-0"></div>
        
        <div className="relative z-10 text-center p-8 bg-gray-800 border border-gray-700 shadow-2xl rounded-lg max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-yellow-500 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h2 className="text-2xl font-bold mb-4 text-gray-100"> Access Restricted</h2>
          <p className="text-gray-300 mb-6">Please authenticate to access your Password Management</p>
          <Link
            to="/login"
            className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-gray-900 px-6 py-3 rounded-lg shadow-md hover:from-yellow-500 hover:to-yellow-400 transition duration-300 font-medium inline-block"
          >
            Login to Password Management System
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-900 min-h-screen flex items-center justify-center relative overflow-hidden p-4">
    {/* Dark base background */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
    
    {/* Orbiting bubble gradients */}
    <div className="absolute inset-0 overflow-hidden">
      {/* Bubble 1 - orbits around the center */}
      <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 bg-yellow-500 orbit-bubble orbit-1"></div>
      
      {/* Bubble 2 - orbits in opposite direction */}
      <div className="absolute w-80 h-80 rounded-full blur-3xl opacity-20 bg-yellow-600 orbit-bubble orbit-2"></div>
      
      {/* Bubble 3 - follows a figure-8 pattern */}
      <div className="absolute w-64 h-64 rounded-full blur-3xl opacity-15 bg-yellow-400 orbit-bubble orbit-3"></div>
      
      {/* Bubble 4 - smaller, faster orbit */}
      <div className="absolute w-48 h-48 rounded-full blur-3xl opacity-20 bg-yellow-500 orbit-bubble orbit-4"></div>
    </div>
      {/* Metal texture background with grid */}
      <div className="absolute inset-0 bg-metal-texture opacity-20 z-0"></div>
      <div className="absolute inset-0 bg-locker-grid opacity-30 z-0"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        
        
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 p-2 rounded-full bg-gray-800 border-2 border-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100 mb-2">
            Welcome to Your <span className="text-yellow-500">Secure Vault</span>, {user.name}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            All your credentials are encrypted and securely stored. Select a category below to manage your accounts.
          </p>
        </div>
        
        {/* Security Status */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-lg border border-gray-700 p-4 mb-12 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-green-900 bg-opacity-30 rounded-full p-2 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-100">Vault Status: <span className="text-green-400">Secure</span></h2>
              <p className="text-gray-400 text-sm">Your vault is protected with end-to-end encryption</p>
            </div>
          </div>
          <div>
            <button className="text-yellow-500 hover:text-yellow-400 text-sm font-medium flex items-center transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Security Details
            </button>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-lg border border-gray-700 overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-gray-500 bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg`}></div>
              
              {/* Content */}
              <div className="p-6 relative z-10">
                <div className={`text-gray-300 group-hover:text-yellow-500 mb-4 transition-colors duration-300`}>
                  {category.icon}
                </div>
                <h2 className="text-xl font-bold mb-2 text-gray-100 group-hover:text-yellow-400 transition-colors duration-300">
                  {category.title}
                </h2>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  {category.description}
                </p>
                
                {/* Arrow indicator */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
              
              {/* Border glow on hover */}
              <div className={`absolute inset-0 border-2 border-yellow-500 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
            </Link>
          ))}
        </div>
        
        {/* Quick Tips Section */}
        <div className="mt-12 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-lg border border-gray-700 p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-100 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Security Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-yellow-500 text-sm font-medium mb-2">Use Strong Passwords</h3>
              <p className="text-gray-400 text-sm">Combine letters, numbers, and symbols to create strong, unique passwords for each account.</p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-yellow-500 text-sm font-medium mb-2">Enable 2FA When Possible</h3>
              <p className="text-gray-400 text-sm">Two-factor authentication adds an extra layer of security to your accounts.</p>
            </div>
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 border border-gray-700">
              <h3 className="text-yellow-500 text-sm font-medium mb-2">Regular Security Checks</h3>
              <p className="text-gray-400 text-sm">Review your accounts regularly for any suspicious activity or unauthorized access.</p>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        /* Circular orbit animation */
        @keyframes orbit-1 {
          0% { transform: translate(-50%, -50%) rotate(0deg) translateX(150px) rotate(0deg) scale(1); }
          50% { transform: translate(-50%, -50%) rotate(180deg) translateX(150px) rotate(-180deg) scale(1.1); }
          100% { transform: translate(-50%, -50%) rotate(360deg) translateX(150px) rotate(-360deg) scale(1); }
        }
        
        /* Reverse orbit animation */
        @keyframes orbit-2 {
          0% { transform: translate(-50%, -50%) rotate(0deg) translateX(200px) rotate(0deg) scale(0.9); }
          50% { transform: translate(-50%, -50%) rotate(-180deg) translateX(200px) rotate(180deg) scale(1.1); }
          100% { transform: translate(-50%, -50%) rotate(-360deg) translateX(200px) rotate(360deg) scale(0.9); }
        }
        
        /* Figure-8 orbit animation */
        @keyframes orbit-3 {
          0% { transform: translate(-50%, -50%) translateX(-120px) translateY(0px) scale(1); }
          25% { transform: translate(-50%, -50%) translateX(0px) translateY(-80px) scale(1.05); }
          50% { transform: translate(-50%, -50%) translateX(120px) translateY(0px) scale(1.1); }
          75% { transform: translate(-50%, -50%) translateX(0px) translateY(80px) scale(1.05); }
          100% { transform: translate(-50%, -50%) translateX(-120px) translateY(0px) scale(1); }
        }
        
        /* Small fast orbit animation */
        @keyframes orbit-4 {
          0% { transform: translate(-50%, -50%) rotate(0deg) translateX(100px) translateY(50px) rotate(0deg) scale(0.9); }
          50% { transform: translate(-50%, -50%) rotate(180deg) translateX(100px) translateY(50px) rotate(-180deg) scale(1.1); }
          100% { transform: translate(-50%, -50%) rotate(360deg) translateX(100px) translateY(50px) rotate(-360deg) scale(0.9); }
        }
        
        .orbit-bubble {
          will-change: transform;
          position: absolute;
          top: 50%;
          left: 50%;
          transform-origin: center center;
        }
        
        .orbit-1 {
          animation: orbit-1 10s infinite linear;
        }
        
        .orbit-2 {
          animation: orbit-2 10s infinite linear;
        }
        
        .orbit-3 {
          animation: orbit-3 10s infinite ease-in-out;
        }
        
        .orbit-4 {
          animation: orbit-4 10s infinite linear;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;