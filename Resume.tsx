import React from 'react';
import { ArrowLeft, Download, GraduationCap, Briefcase, Star, Instagram, Linkedin, Heart, Award, HeartHandshake, Ambulance } from 'lucide-react';

interface ResumeProps {
  onBack: () => void;
}

const Resume: React.FC<ResumeProps> = ({ onBack }) => {
  const skills = [
    'Patient Care', 
    'Oral Prophylaxis', 
    'Four-handed Dentistry',
    'Infection Control & Sterilization Protocols', 
    'Extractions & Fluoride Treatment',
    'Restorative Procedures & Endodontic Treatment', 
    'Patient Education & Counseling',
    'Emergency Management', 
    'Teamwork & Adaptability'
  ];

  return (
    <div className="w-full max-w-4xl mx-auto animate-float">
      
      {/* Header */}
      <header className="flex justify-between items-center mb-12 px-2">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 px-6 py-2 rounded-full border-2 border-soft-pink bg-white/50 hover:bg-soft-pink hover:text-white transition-all duration-300 font-bold text-gray-500"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
        <button 
          className="group flex items-center gap-2 px-6 py-2 rounded-full border-2 border-mint bg-white/50 hover:bg-mint hover:text-[#2E7D32] transition-all duration-300 font-bold text-gray-500"
        >
          Download PDF
          <Download size={20} className="group-hover:translate-y-1 transition-transform" />
        </button>
      </header>

      <h2 className="text-4xl font-bold text-center text-text-dark mb-16 tracking-tight">
        My Journey <span className="inline-block animate-spin-slow ml-2">🌸</span>
      </h2>

      {/* Timeline Section: Education & Experience */}
      <div className="relative mb-20 px-4">
        {/* Central Dashed Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-[#FFC1E3] transform md:-translate-x-1/2"></div>

        {/* Education Card (Left on Desktop) */}
        <div className="relative flex flex-col md:flex-row items-center mb-16">
          <div className="flex-1 w-full md:text-right md:pr-16 pl-20 md:pl-0 mb-4 md:mb-0">
            <div className="bg-cream p-6 rounded-card border-2 border-lavender shadow-[0_10px_20px_-5px_rgba(230,230,250,0.7)] transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group relative">
               <h3 className="text-xl font-bold text-gray-700 mb-2 group-hover:text-lavender transition-colors">BDS</h3>
               <p className="text-gray-500 font-medium">Kantipur Dental College Teaching Hospital and Research Center</p>
               {/* Decorative dot */}
               <div className="hidden md:block absolute top-1/2 -right-3 w-4 h-4 bg-lavender rounded-full transform -translate-y-1/2"></div>
            </div>
          </div>
          
          {/* Icon */}
          <div className="absolute left-8 md:left-1/2 w-12 h-12 bg-lavender rounded-full border-4 border-white shadow-md transform -translate-x-1/2 flex items-center justify-center z-10">
            <GraduationCap size={20} className="text-white" />
          </div>

          <div className="flex-1 w-full md:block hidden"></div>
        </div>

        {/* Experience Card 1 (Right on Desktop) */}
        <div className="relative flex flex-col md:flex-row items-center mb-16">
          <div className="flex-1 w-full md:block hidden"></div>
          
          {/* Icon */}
          <div className="absolute left-8 md:left-1/2 w-12 h-12 bg-mint rounded-full border-4 border-white shadow-md transform -translate-x-1/2 flex items-center justify-center z-10">
             <Briefcase size={20} className="text-white" />
          </div>

          <div className="flex-1 w-full pl-20 md:pl-16">
            <div className="bg-cream p-6 rounded-card border-2 border-mint shadow-[0_10px_20px_-5px_rgba(203,243,210,0.7)] transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group relative">
               <h3 className="text-xl font-bold text-gray-700 mb-2 group-hover:text-mint transition-colors">Clinical Experience</h3>
               <p className="text-sm font-bold text-gray-400 mb-1 uppercase tracking-wider">Rotatory Internship</p>
               <p className="text-gray-500 font-medium">Kantipur Dental College Teaching Hospital and Research Center</p>
               {/* Decorative dot */}
               <div className="hidden md:block absolute top-1/2 -left-3 w-4 h-4 bg-mint rounded-full transform -translate-y-1/2"></div>
            </div>
          </div>
        </div>

        {/* Experience Card 2 (Left on Desktop) */}
        <div className="relative flex flex-col md:flex-row items-center">
          <div className="flex-1 w-full md:text-right md:pr-16 pl-20 md:pl-0 mb-4 md:mb-0">
            <div className="bg-cream p-6 rounded-card border-2 border-coral shadow-[0_10px_20px_-5px_rgba(255,183,178,0.7)] transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group relative">
               <h3 className="text-xl font-bold text-gray-700 mb-2 group-hover:text-coral transition-colors">Dental Surgeon</h3>
               <p className="text-gray-500 font-medium">Harmony Dental Care, Pokhara</p>
               {/* Decorative dot */}
               <div className="hidden md:block absolute top-1/2 -right-3 w-4 h-4 bg-coral rounded-full transform -translate-y-1/2"></div>
            </div>
          </div>
          
          {/* Icon */}
          <div className="absolute left-8 md:left-1/2 w-12 h-12 bg-coral rounded-full border-4 border-white shadow-md transform -translate-x-1/2 flex items-center justify-center z-10">
            <Briefcase size={20} className="text-white" />
          </div>

          <div className="flex-1 w-full md:block hidden"></div>
        </div>
      </div>

      {/* Volunteering Section */}
      <h2 className="text-3xl font-bold text-center text-text-dark mb-12 tracking-tight flex items-center justify-center gap-3">
        Volunteering & Community <HeartHandshake className="text-soft-pink" size={32} />
      </h2>

      <div className="relative mb-20 px-4">
        {/* Central Dashed Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-[#FFC1E3] transform md:-translate-x-1/2"></div>

        {/* Volunteering 1 (Right on Desktop) */}
        <div className="relative flex flex-col md:flex-row items-center mb-16">
          <div className="flex-1 w-full md:block hidden"></div>
          
          {/* Icon */}
          <div className="absolute left-8 md:left-1/2 w-12 h-12 bg-lavender rounded-full border-4 border-white shadow-md transform -translate-x-1/2 flex items-center justify-center z-10">
             <span className="text-2xl">🏥</span>
          </div>

          <div className="flex-1 w-full pl-20 md:pl-16">
            <div className="bg-cream p-6 rounded-card border-2 border-lavender shadow-[0_10px_20px_-5px_rgba(230,230,250,0.7)] transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group relative">
               <h3 className="text-xl font-bold text-gray-700 mb-2 group-hover:text-lavender transition-colors">Dental Camp 2082</h3>
               <p className="text-gray-500 font-medium">Paragon Public School, Kathmandu</p>
               {/* Decorative dot */}
               <div className="hidden md:block absolute top-1/2 -left-3 w-4 h-4 bg-lavender rounded-full transform -translate-y-1/2"></div>
            </div>
          </div>
        </div>

        {/* Volunteering 2 (Left on Desktop) */}
        <div className="relative flex flex-col md:flex-row items-center">
          <div className="flex-1 w-full md:text-right md:pr-16 pl-20 md:pl-0 mb-4 md:mb-0">
            <div className="bg-cream p-6 rounded-card border-2 border-mint shadow-[0_10px_20px_-5px_rgba(203,243,210,0.7)] transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group relative">
               <h3 className="text-xl font-bold text-gray-700 mb-2 group-hover:text-mint transition-colors">School Health Programme 2078</h3>
               <p className="text-gray-500 font-medium">Nabin Aadharbhut Vidyalaya, Bhaktapur</p>
               {/* Decorative dot */}
               <div className="hidden md:block absolute top-1/2 -right-3 w-4 h-4 bg-mint rounded-full transform -translate-y-1/2"></div>
            </div>
          </div>
          
          {/* Icon */}
          <div className="absolute left-8 md:left-1/2 w-12 h-12 bg-mint rounded-full border-4 border-white shadow-md transform -translate-x-1/2 flex items-center justify-center z-10">
            <span className="text-2xl">🏫</span>
          </div>

          <div className="flex-1 w-full md:block hidden"></div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="max-w-4xl mx-auto mb-20 px-4">
        <h2 className="text-3xl font-bold text-center text-text-dark mb-10 tracking-tight">
          Certifications & Workshops 📜
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1 */}
          <div className="bg-cream p-6 rounded-[15px] border-2 border-mint hover:bg-mint/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg flex gap-4 items-start group">
             <div className="p-3 bg-mint/20 rounded-full text-mint group-hover:bg-mint group-hover:text-white transition-colors">
               <Award size={24} />
             </div>
             <div>
               <h3 className="text-lg font-bold text-gray-700">Rotary Endodontics Simplified</h3>
               <p className="text-gray-500 text-sm">Hands-on Workshop</p>
             </div>
          </div>

          {/* Card 2 */}
          <div className="bg-cream p-6 rounded-[15px] border-2 border-lavender hover:bg-lavender/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg flex gap-4 items-start group">
             <div className="p-3 bg-lavender/20 rounded-full text-lavender group-hover:bg-lavender group-hover:text-white transition-colors">
               <Award size={24} />
             </div>
             <div>
               <h3 className="text-lg font-bold text-gray-700">Mastering Bio Ceramic Techniques</h3>
               <p className="text-gray-500 text-sm">Ratna International</p>
             </div>
          </div>

          {/* Card 3 */}
          <div className="bg-cream p-6 rounded-[15px] border-2 border-soft-pink hover:bg-soft-pink/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg flex gap-4 items-start group">
             <div className="p-3 bg-soft-pink/20 rounded-full text-soft-pink group-hover:bg-soft-pink group-hover:text-white transition-colors">
               <Award size={24} />
             </div>
             <div>
               <h3 className="text-lg font-bold text-gray-700">Japan-Nepal Joint Forum of Oral Health 2025</h3>
               <p className="text-gray-500 text-sm">ADCN & Well-being Nepal</p>
             </div>
          </div>

          {/* Card 4 */}
          <div className="bg-cream p-6 rounded-[15px] border-2 border-coral hover:bg-coral/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg flex gap-4 items-start group">
             <div className="p-3 bg-coral/20 rounded-full text-coral group-hover:bg-coral group-hover:text-white transition-colors">
               <Ambulance size={24} />
             </div>
             <div>
               <h3 className="text-lg font-bold text-gray-700">Basic Life Support (BLS)</h3>
               <p className="text-gray-500 text-sm">Nepal Mediciti, Lalitpur</p>
             </div>
          </div>

        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-card border-2 border-soft-pink p-8 md:p-10 shadow-xl mb-12">
         <h3 className="text-2xl font-bold text-center text-coral mb-8 flex justify-center items-center gap-2">
            <Star className="fill-coral text-coral" /> 
            Clinical Superpowers 
            <Star className="fill-coral text-coral" />
         </h3>
         <div className="flex flex-wrap justify-center gap-3">
           {skills.map((skill, index) => (
             <span key={index} className={`
                px-5 py-2.5 rounded-btn text-sm font-bold text-gray-600 shadow-sm border-2
                ${index % 3 === 0 ? 'bg-lavender/20 border-lavender hover:bg-lavender hover:text-white' : 
                  index % 3 === 1 ? 'bg-mint/20 border-mint hover:bg-mint hover:text-[#2E7D32]' : 'bg-soft-pink/20 border-soft-pink hover:bg-soft-pink hover:text-white'}
                transform hover:scale-105 transition-all duration-300 cursor-none
             `}>
               {skill}
             </span>
           ))}
         </div>
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
  );
};

export default Resume;