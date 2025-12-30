import React, { useState, useEffect, useRef } from 'react';
import { Instagram, Linkedin, Heart, Sparkles, Coffee } from 'lucide-react';
import Resume from './Resume';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'resume'>('home');
  const [weatherEmoji, setWeatherEmoji] = useState('✨');
  
  // Refs for cursor animation
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  // Handle loading screen timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Increased slightly to show off animation
    return () => clearTimeout(timer);
  }, []);

  // Handle weather logic with Fallback
  useEffect(() => {
    // Shared function to fetch weather based on coords
    const fetchWeather = async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const data = await response.json();
        
        if (data && data.current_weather) {
          const { temperature, weathercode, windspeed, is_day } = data.current_weather;
          
          let mood = '✨';

          // Priority 1: Time Check (Night)
          if (is_day === 0) {
            mood = '😴'; // Sleeping Face (Off duty)
          } else {
            // Daytime Logic
            
            // Priority 2: Extreme Weather
            if ([95, 96, 99].includes(weathercode)) {
              mood = '😱'; // Thunderstorm
            } else if ([71, 73, 75, 77, 85, 86].includes(weathercode)) {
              mood = '☃️'; // Snowing
            } else if ([45, 48].includes(weathercode)) {
              mood = '😶‍🌫️'; // Foggy
            } 
            // Priority 3: Wind Check (> 20km/h)
            else if (windspeed > 20) {
              mood = '🌬️'; // Wind Blowing Face
            }
            // Priority 4: Temperature Nuances
            else if (temperature > 30) {
              mood = '🫠'; // Melting Face (Too hot)
            } else if (temperature < 10) {
              mood = '🥶'; // Freezing Face (Chilly)
            } else if (temperature >= 20 && temperature <= 29 && weathercode === 0) {
              mood = '😎'; // Sunglasses (Pleasant & Clear Sky)
            }
            // Priority 5: Precipitation / Cloud Cover
            // Rain codes: Drizzle (51-57), Rain (61-67), Showers (80-82)
            else if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(weathercode)) {
              mood = '😒'; // Irritated Face (Rain)
            } 
            // Cloudy/Overcast codes: 2 (Partly cloudy), 3 (Overcast)
            else if ([2, 3].includes(weathercode)) {
              mood = '😔'; // Pensive Face
            }
          }
          
          setWeatherEmoji(mood);
        }
      } catch (error) {
        console.error("Failed to fetch weather data", error);
      }
    };

    // Fallback function using IP Geolocation
    const fetchLocationByIP = async () => {
      try {
        const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
        const data = await response.json();
        if (data.latitude && data.longitude) {
          console.log("Using IP-based location fallback");
          fetchWeather(parseFloat(data.latitude), parseFloat(data.longitude));
        }
      } catch (error) {
        console.error("Failed to fetch IP location", error);
      }
    };

    // Main execution flow
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success: Use precise location
          fetchWeather(position.coords.latitude, position.coords.longitude);
        }, 
        (error) => {
          // Failure: Use Fallback
          console.log("Geolocation permission denied or error, switching to IP fallback", error);
          fetchLocationByIP();
        }
      );
    } else {
      // Browser doesn't support Geolocation: Use Fallback
      fetchLocationByIP();
    }
  }, []);

  // Handle cursor logic
  useEffect(() => {
    // Helper function to check if the cursor is currently over a clickable element
    const checkHoverState = (x: number, y: number) => {
      // Get the element at the current coordinates (cursor element itself has pointer-events-none)
      const element = document.elementFromPoint(x, y) as HTMLElement;
      if (element) {
        // Check for common clickable selectors
        const isClickable = element.closest('a, button, .group, input, select, textarea, [role="button"]');
        setIsHovering(!!isClickable);
      } else {
        setIsHovering(false);
      }
    };

    // Update mouse position on move
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      checkHoverState(e.clientX, e.clientY);
    };

    // Update hover state on scroll (since elements move under the cursor)
    const handleScroll = () => {
      checkHoverState(mousePos.current.x, mousePos.current.y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation loop for smooth trailing effect
    let animationFrameId: number;
    
    const animateCursor = () => {
      // Linear interpolation (lerp) for the lag effect
      // 0.1 determines the "heaviness" or lag of the cursor. Lower = more lag.
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };

      cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.15);
      cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.15);

      if (cursorRef.current) {
        // Use translate3d for better performance
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animationFrameId = requestAnimationFrame(animateCursor);
    };

    animationFrameId = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className={`fixed top-0 left-0 w-8 h-8 rounded-full bg-[#FFC1E3]/70 pointer-events-none z-[100] mix-blend-multiply transition-all duration-300 ease-out ${
          isHovering ? 'scale-150 bg-coral/60' : 'scale-100'
        } ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        style={{ willChange: 'transform' }}
      />

      {/* Loading Screen Overlay */}
      <div 
        className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#FFC1E3] transition-transform duration-1000 ease-in-out ${
          isLoading ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="relative mb-8 animate-bounce-squish">
          {/* Happy Tooth Container */}
          <div className="happy-tooth w-32 h-32 relative">
             
             {/* Main Body */}
             <div className="absolute inset-0 bg-white rounded-t-[2.5rem] rounded-b-[1.5rem] shadow-xl overflow-hidden">
                {/* Shine */}
                <div className="absolute top-4 right-5 w-5 h-5 bg-white rounded-full opacity-60 z-10"></div>
                
                {/* Face Container */}
                {/* Eyes */}
                <div className="absolute top-12 left-8 w-3 h-3 bg-gray-800 rounded-full shadow-[40px_0_0_#1f2937]"></div>
                
                {/* Cheeks */}
                <div className="absolute top-16 left-6 w-5 h-2.5 bg-pink-300 rounded-full shadow-[45px_0_0_#f9a8d4] opacity-80"></div>

                {/* Mouth */}
                <div className="absolute top-16 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-gray-800 rounded-full"></div>
             </div>

             {/* Root Gap (Visual trick: colored circle at bottom center matching bg) */}
             <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-[#FFC1E3] rounded-full z-10"></div>
          </div>
        </div>

        <p className="text-2xl font-bold text-white tracking-widest drop-shadow-sm flex items-center gap-2">
          Gathering Sparkles... <Sparkles className="animate-spin-slow" />
        </p>
      </div>

      <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 md:p-8">
        
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-lavender rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-mint rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob translate-x-1/3 -translate-y-1/4" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-32 left-20 w-80 h-80 bg-soft-pink rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-coral rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob" style={{ animationDelay: '1s' }}></div>

        {/* Main Container */}
        <main className="relative z-10 w-full max-w-2xl">
          
          {currentView === 'home' ? (
            <div className="animate-float">
              {/* Navigation Bar */}
              <nav className="flex justify-end items-center gap-6 mb-4 px-2">
                <button 
                  onClick={() => setCurrentView('home')}
                  className="font-bold text-gray-500 hover:text-coral transition-colors"
                >
                  Home
                </button>
                <button 
                  onClick={() => setCurrentView('resume')}
                  className="px-6 py-2 rounded-full border-2 border-[#FFC1E3] text-gray-500 font-bold bg-transparent transition-all duration-300 hover:bg-[#FFC1E3] hover:text-white"
                >
                  My CV
                </button>
              </nav>

              {/* Header Section */}
              <div className="text-center mb-8">
                <div className="relative inline-block group">
                  <div className="w-40 h-40 mx-auto rounded-full border-4 border-soft-pink overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105">
                    <img 
                      src="https://media.licdn.com/dms/image/v2/D4E03AQH8gErh5MtHAQ/profile-displayphoto-shrink_800_800/B4EZds1cF1HsAc-/0/1749877639261?e=1768435200&v=beta&t=YGIvxLph2WxUDXQfeK-kpUhwBuw0I4ns2uAKCD_aihs" 
                      alt="Dr. Astha Pokhrel" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Weather Mood Widget */}
                  <span id="weather-mood" className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-md text-2xl animate-bounce-slow transition-all duration-300 hover:scale-110 cursor-help" title="My Mood based on your Weather">
                    {weatherEmoji}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mt-6 text-text-dark tracking-tight">
                  Hi there! I'm Dr. Astha Pokhrel <span className="inline-block animate-pulse">✨</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-500 mt-2 font-medium">
                  Dentist by day, foodie by night.
                </p>
              </div>

              {/* Content Wrapper */}
              <div className="bg-white/80 backdrop-blur-sm rounded-card border-2 border-soft-pink shadow-xl p-6 md:p-10 space-y-8">
                
                {/* About Me */}
                <section className="text-center">
                  <h2 className="text-2xl font-bold text-coral mb-4 flex items-center justify-center gap-2">
                    <Sparkles size={24} className="text-lavender fill-lavender" />
                    About Me
                    <Sparkles size={24} className="text-lavender fill-lavender" />
                  </h2>
                  <p className="text-lg leading-relaxed text-gray-600">
                    Welcome to my digital diary! I believe dentistry isn't just about teeth, it's about people. 
                    My goal is to make every visit feel like a chat with a friend. 
                    I treat every smile with gentleness and kindness, ensuring you leave happier than you arrived. 
                    Let's make dental care cozy! 🦷 🌸 ✨
                  </p>
                </section>

                {/* Fun Facts */}
                <section>
                  <h2 className="text-center text-xl font-bold text-mint mb-6">Fun Facts</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    
                    <div className="bg-cream border-2 border-lavender rounded-card p-4 text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group cursor-default">
                      <div className="text-3xl mb-2 group-hover:animate-bounce">🍓</div>
                      <h3 className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-1">Fave Toothpaste</h3>
                      <p className="text-text-dark font-semibold">Strawberry Mint</p>
                    </div>

                    <div className="bg-cream border-2 border-mint rounded-card p-4 text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group cursor-default">
                      <div className="text-3xl mb-2 group-hover:animate-bounce">🧵</div>
                      <h3 className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-1">Years Flossing</h3>
                      <p className="text-text-dark font-semibold">10+ Years</p>
                    </div>

                    <div className="bg-cream border-2 border-coral rounded-card p-4 text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group cursor-default">
                      <div className="text-3xl mb-2 group-hover:animate-bounce">🍵</div>
                      <h3 className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-1">Coffee or Tea?</h3>
                      <p className="text-text-dark font-semibold">Green Tea</p>
                    </div>

                  </div>
                </section>

                {/* Philosophy */}
                <section className="bg-lavender/30 rounded-card p-6 text-center relative overflow-hidden">
                   {/* Decorative circles inside card */}
                   <div className="absolute top-2 left-2 w-4 h-4 bg-white rounded-full opacity-50"></div>
                   <div className="absolute bottom-2 right-2 w-6 h-6 bg-white rounded-full opacity-50"></div>
                   
                   <h3 className="text-lg font-bold text-text-dark italic">"Teeth are jewels, treat them kindly."</h3>
                </section>

              </div>

              {/* Footer */}
              <footer className="mt-12 text-center pb-8">
                <div className="flex justify-center gap-6 mb-6">
                  <a 
                    href="https://www.instagram.com/asthapokhrell" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-coral shadow-md border-2 border-coral transition-all duration-300 hover:scale-110 hover:rotate-6 hover:bg-coral hover:text-white group"
                    aria-label="Instagram"
                  >
                    <Instagram size={24} className="group-hover:animate-wiggle" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/dr-astha-pokhrel-ds" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-lavender shadow-md border-2 border-lavender transition-all duration-300 hover:scale-110 hover:-rotate-6 hover:bg-lavender hover:text-white group"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={24} className="group-hover:animate-wiggle" />
                  </a>
                </div>
                
                <p className="text-gray-500 font-medium flex items-center justify-center gap-2">
                  Made with <Heart size={16} className="text-coral fill-coral animate-pulse" /> and Floss.
                </p>
                <p className="mt-2 text-sm text-gray-500 font-medium">
                  © 2025 Dr. Astha Pokhrel
                </p>
                <p className="mt-1 text-[0.8rem] text-[#888888]">
                  NMC Registration No: 39705
                </p>
              </footer>
            </div>
          ) : (
            <Resume onBack={() => setCurrentView('home')} />
          )}

        </main>
      </div>
    </>
  );
};

export default App;