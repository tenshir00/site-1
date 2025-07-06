import React from 'react';
import { Calendar, MapPin, ChevronRight } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      duration: "2022 - Present",
      description: "Leading frontend development for enterprise applications, mentoring junior developers, and implementing modern React patterns.",
      achievements: [
        "Improved application performance by 40% through code optimization",
        "Led a team of 5 developers on a major product redesign",
        "Implemented automated testing resulting in 50% fewer bugs"
      ]
    },
    {
      title: "Full Stack Developer",
      company: "Digital Solutions Ltd.",
      location: "New York, NY",
      duration: "2020 - 2022",
      description: "Developed and maintained full-stack web applications using React, Node.js, and PostgreSQL.",
      achievements: [
        "Built 3 major client applications from scratch",
        "Reduced server response time by 60% through optimization",
        "Collaborated with designers to create pixel-perfect UIs"
      ]
    },
    {
      title: "Junior Developer",
      company: "StartupCo",
      location: "Remote",
      duration: "2019 - 2020",
      description: "Started my career contributing to various projects, learning best practices, and growing technical skills.",
      achievements: [
        "Contributed to 10+ open-source projects",
        "Learned and implemented modern web technologies",
        "Delivered projects on time and within budget"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Work <span className="text-blue-600">Experience</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              My professional journey and key accomplishments
            </p>
          </div>
          
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="p-8">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{exp.title}</h3>
                      <p className="text-lg text-blue-600 font-semibold">{exp.company}</p>
                    </div>
                    <div className="md:text-right mt-4 md:mt-0">
                      <div className="flex items-center text-gray-600 mb-2">
                        <Calendar size={16} className="mr-2" />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MapPin size={16} className="mr-2" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">{exp.description}</p>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 mb-3">Key Achievements:</h4>
                    {exp.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start space-x-3">
                        <ChevronRight size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;