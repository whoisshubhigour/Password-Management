import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Display splash screen for 10 seconds
    const timer = setTimeout(() => {
      // Start slide up animation
      setIsVisible(false);

      // Navigate to login page after animation completes
      const navigationTimer = setTimeout(() => {
        navigate('/login');
      }, 1000); // Animation duration

      return () => clearTimeout(navigationTimer);
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`w-full bg-gray-900 min-h-screen flex items-center justify-center transition-transform duration-1000 ease-in-out ${
      isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'
    }`}>
      {/* Dark base background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
      
      {/* Subtle animated background effects similar to login page */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 bg-cyan-500 orbit-bubble orbit-1"></div>
        <div className="absolute w-80 h-80 rounded-full blur-3xl opacity-20 bg-cyan-600 orbit-bubble orbit-2"></div>
        <div className="absolute w-64 h-64 rounded-full blur-3xl opacity-15 bg-cyan-400 orbit-bubble orbit-3"></div>
        <div className="absolute w-48 h-48 rounded-full blur-3xl opacity-20 bg-cyan-500 orbit-bubble orbit-4"></div>
      </div>
      
      {/* Company name */}
      <div className="relative z-10 text-center">
        <h1 className="text-6xl font-bold text-cyan-500 tracking-wider">BRANDSMASHERS</h1>
        <div className="mt-4 h-1 w-48 bg-cyan-500 mx-auto"></div>
      </div>
      
      {/* Style for animations */}
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

export default SplashScreen;