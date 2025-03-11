import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data } = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });
      
      login(data);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      setIsLoading(false);
    }
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
      
      {/* Metal texture and grid overlays */}
      <div className="absolute inset-0 bg-metal-texture opacity-10"></div>
      <div className="absolute inset-0 bg-locker-grid opacity-20"></div>
      
      {/* Splash Screen */}
      <div 
        className={`absolute inset-0 z-20 bg-gray-900 flex items-center justify-center transition-transform duration-100 ease-in-out ${
          showSplash ? 'transform translate-y-0' : 'transform -translate-y-full'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        
        {/* Cyan themed background bubbles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 bg-cyan-500 orbit-bubble orbit-1"></div>
          <div className="absolute w-80 h-80 rounded-full blur-3xl opacity-20 bg-cyan-600 orbit-bubble orbit-2"></div>
          <div className="absolute w-64 h-64 rounded-full blur-3xl opacity-15 bg-cyan-400 orbit-bubble orbit-3"></div>
          <div className="absolute w-48 h-48 rounded-full blur-3xl opacity-20 bg-cyan-500 orbit-bubble orbit-4"></div>
        </div>
        
        {/* Company name */}
        <div className="relative z-10 text-center">
          <h1 className="text-2xl md:text-5xl lg:text-6xl md font-bold text-cyan-500 tracking-wider">BRANDSMASHERS TECH</h1>
          <div className="mt-4 h-1 w-48 bg-cyan-500 mx-auto"></div>
        </div>
      </div>
      
      {/* Main login content */}
      <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl border border-gray-700 w-full max-w-sm sm:max-w-md p-6 z-10 backdrop-blur-sm bg-opacity-80">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-yellow-500">LOGIN</h2>
          <p className="text-gray-400 text-sm">Password Management System</p>
        </div>
        
        {error && (
          <div className="mb-6 bg-red-900 bg-opacity-30 border-l-4 border-red-600 text-red-200 p-3 rounded-md text-sm">
            <p className="font-medium">Access Denied</p>
            <p>{error}</p>
          </div>
        )}
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Access ID
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-700 text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Security Key
              </label>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded border border-gray-600 bg-gray-700 text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded bg-gradient-to-r from-yellow-600 to-yellow-500 text-gray-900 font-medium text-sm shadow-md hover:shadow-lg transition duration-300 ${
              isLoading ? 'opacity-80 cursor-not-allowed' : 'hover:from-yellow-500 hover:to-yellow-400'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Authenticating...
              </span>
            ) : (
              'Access System'
            )}
          </button>
          
          <div className="text-center pt-2">
            <p className="text-xs text-gray-400">
              Need vault access?{' '}
              <a href="/register" className="text-yellow-500 hover:text-yellow-400">
                Register Here
              </a>
            </p>
          </div>
        </form>
      </div>
      
      {/* Style injection for animations */}
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

export default Login;