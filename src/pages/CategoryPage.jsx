import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function CategoryPage() {
  const { type } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState([]);
  const [newEntry, setNewEntry] = useState({
    platformName: '',
    username: '',
    password: '',
    phoneNumber: '',
  });
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchPasswords();
  }, [user, type]);

  const fetchPasswords = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get('http://localhost:5000/api/passwords', config);
      // Add showPassword property to each password object
      const passwordsWithShowProperty = data
        .filter((p) => p.category === type)
        .map(password => ({ ...password, showPassword: false }));
      
      setPasswords(passwordsWithShowProperty);
    } catch (error) {
      setError('Failed to fetch passwords');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.post(
        'http://localhost:5000/api/passwords',
        {
          category: type,
          subcategory: type,
          ...newEntry,
        },
        config
      );
      setNewEntry({ platformName: '', username: '', password: '', phoneNumber: '' });
      fetchPasswords();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add password');
    }
  };

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.delete(`http://localhost:5000/api/passwords/${id}`, config);
      fetchPasswords();
    } 
    catch (error) {
      setError(error.response?.data?.message || 'Failed to delete password'); 
    }
  };

  const getCategoryTitle = () => {
    const titles = {
      'mails': 'Mail',
      'devices': 'Device',
      'github': 'GitHub',
      'social-media': 'Social Media'
    };
    return titles[type] || type;
  };

  const getCategoryIcon = () => {
    const icons = {
      'mails': (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      'devices': (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      'github': (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
        </svg>
      ),
      'social-media': (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
    };
    return icons[type] || (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    );
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

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
      
      <div className="container mx-auto relative z-10">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-gray-300 hover:text-yellow-500 transition-all duration-300 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
        </div>

        <div className="flex items-center justify-center mb-10">
          <div className="mr-4 text-yellow-500">
            {getCategoryIcon()}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100">
            {getCategoryTitle()} <span className="text-yellow-500">Password Manager</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add New Entry Panel */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
            <div className="bg-gray-800 px-6 py-4 border-b border-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <h2 className="text-xl font-bold text-gray-100">Add New {getCategoryTitle()}</h2>
            </div>
            
            <div className="p-6">
              {error && (
                <div className="mb-6 bg-red-900 bg-opacity-30 border-l-4 border-red-600 text-red-200 p-3 rounded animate-shake text-sm">
                  <p className="font-medium">Error</p>
                  <p>{error}</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newEntry.platformName}
                    onChange={(e) => setNewEntry({ ...newEntry, platformName: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    
                    required
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Username/Email
                  </label>
                  <input
                    type="text"
                    value={newEntry.username}
                    onChange={(e) => setNewEntry({ ...newEntry, username: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="your.username@example.com"
                    required
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={newEntry.password}
                    onChange={(e) => setNewEntry({ ...newEntry, password: e.target.value })}
                    className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full py-2 px-4 rounded bg-gradient-to-r from-yellow-600 to-yellow-500 text-gray-900 font-medium shadow-md hover:from-yellow-500 hover:to-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-300"
                >
                  Secure in Vault
                </button>
              </form>
            </div>
          </div>

          {/* Stored Credentials Panel */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
            <div className="bg-gray-800 px-6 py-4 border-b border-gray-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h2 className="text-xl font-bold text-gray-100">Stored {getCategoryTitle()} Items</h2>
            </div>
            
            <div className="p-6">
              {passwords.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-10">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <p className="text-gray-400">No credentials stored yet</p>
                  <p className="text-gray-500 text-sm mt-2">Add your first credential using the form</p>
                </div>
              ) : (
                <div className="w-full">
                
                  <div 
                    className="lg:overflow-visible overflow-x-auto" 
                    style={{ 
                      WebkitOverflowScrolling: 'touch',
                      scrollbarWidth: 'thin',
                      msOverflowStyle: 'none'
                    }}
                  >
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead>
                        <tr>
                          <th className="px-2 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Category</th>
                          <th className="px-2 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Username/Email</th>
                          <th className="px-2 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Password</th>
                          <th className="px-2 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-700">
                        {passwords.map((entry) => (
                          <tr key={entry._id} className="hover:bg-gray-800 transition-colors">
                            <td className="px-2 py-3 text-sm text-gray-300 whitespace-nowrap">{entry.platformName}</td>
                            <td className="px-2 py-3 text-sm text-gray-300 whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="mr-2 truncate max-w-xs">{entry.username}</span>
                                <button
                                  onClick={() => copyToClipboard(entry.username, `username-${entry._id}`)}
                                  className="text-gray-500 hover:text-yellow-500 transition-colors flex-shrink-0"
                                  title="Copy to clipboard"
                                >
                                  {copied === `username-${entry._id}` ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                  )}
                                </button>
                              </div>
                            </td>
                            <td className="px-2 py-3 text-sm whitespace-nowrap">
                              <div className="flex items-center">
                                <span className="font-mono text-gray-400">
                                  {entry.showPassword ? entry.password : '••••••••'}
                                </span>
                                <button
                                  onClick={() => {
                                    setPasswords(passwords.map(p => 
                                      p._id === entry._id ? {...p, showPassword: !p.showPassword} : p
                                    ))
                                  }}
                                  className="ml-2 text-gray-500 hover:text-yellow-500 transition-colors flex-shrink-0"
                                  title={entry.showPassword ? "Hide password" : "Show password"}
                                >
                                  {entry.showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>
                                  ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                  )}
                                </button>
                                <button
                                  onClick={() => copyToClipboard(entry.password, `password-${entry._id}`)}
                                  className="ml-2 text-gray-500 hover:text-yellow-500 transition-colors flex-shrink-0"
                                  title="Copy to clipboard"
                                >
                                  {copied === `password-${entry._id}` ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                      <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                  ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                    </svg>
                                  )}
                                </button>
                              </div>
                            </td>
                            <td className="px-2 py-3 text-sm whitespace-nowrap">
                              <div className=''> <button
                                onClick={() => handleDelete(entry._id)}
                                className="text-red-400 hover:text-red-300 transition-colors flex items-center"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                
                              </button>
                              
                              </div>
                             
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
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

export default CategoryPage;