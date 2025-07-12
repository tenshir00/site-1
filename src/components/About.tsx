import React from 'react';

const About = () => {
  return (
    <div className="space-y-8">

      {/* Desktop Two Column Layout */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-16">
        {/* Left Column - Details */}
        <div className="space-y-6 md:-ml-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Location:
            </h3>
            <p className="text-gray-700">
              Austin, Texas
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Interests:
            </h3>
            <ul className="text-gray-700 space-y-1">
              <li>Market Analysis</li>
              <li>Startups</li>
              <li>Machine Learning & AI</li>
              <li>Climate Tech</li>
              <li>Behavioral Economics</li>
              <li>Triathlon Training</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Currently Reading:
            </h3>
            <p className="text-gray-700 italic">
              "Steppenwolf" by Hermann Hesse
            </p>
          </div>
        </div>

        {/* Right Column - About Section for Desktop */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            About
          </h3>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              I'm an undergraduate at UT Austin studying economics and computer science. Growing up in a single-parent household sparked my interest in business early on and eventually led me to start my own.
            </p>
            
            <p>
              I first got involved in Austin's startup scene by building an app that solved a problem on campus. What began as a side project turned into a platform with over 50,000 users and a crash course in product development, growth strategy, and go-to-market execution. That experience deepened my interest in how businesses scale and led to roles in venture scouting, climate tech, and financial modeling, where I've worked on everything from investor diligence to public-private funding strategies.
            </p>
            
            <p>
              Outside of work, I spend my time endurance training, running with my dog, or watching films. I am drawn to long-form challenges, whether in sport, entrepreneurship, or storytelling, that reward focus, iteration, and creativity.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Single Column Layout */}
      <div className="md:hidden space-y-8">
        {/* About Section - First on mobile */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            About
          </h3>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              I'm an undergraduate at UT Austin studying economics and computer science. Growing up in a single-parent household sparked my interest in business early on and eventually led me to start my own.
            </p>
            
            <p>
              I first got involved in Austin's startup scene by building an app that solved a problem on campus. What began as a side project turned into a platform with over 50,000 users and a crash course in product development, growth strategy, and go-to-market execution. That experience deepened my interest in how businesses scale and led to roles in venture scouting, climate tech, and financial modeling, where I've worked on everything from investor diligence to public-private funding strategies.
            </p>
            
            <p>
              Outside of work, I spend my time endurance training, running with my dog, or watching films. I am drawn to long-form challenges, whether in sport, entrepreneurship, or storytelling, that reward focus, iteration, and creativity.
            </p>
          </div>
        </div>

        {/* Location - Second on mobile */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Location:
          </h3>
          <p className="text-gray-700">
            Austin, Texas
          </p>
        </div>
        
        {/* Interests - Third on mobile */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Interests:
          </h3>
          <ul className="text-gray-700 space-y-1">
            <li>Market Analysis</li>
            <li>Startups</li>
            <li>Machine Learning & AI</li>
            <li>Climate Tech</li>
            <li>Behavioral Economics</li>
            <li>Triathlon Training</li>
          </ul>
        </div>
        
        {/* Currently Reading - Fourth on mobile */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Currently Reading:
          </h3>
          <p className="text-gray-700 italic">
            "Steppenwolf" by Hermann Hesse
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;