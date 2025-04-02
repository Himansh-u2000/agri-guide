import React, { useState } from 'react';
import { ArrowUpIcon, ArrowDownIcon, Users, Leaf, TrendingUp } from 'lucide-react';
import logo from '../../assets/AgriGuideLogo.png';

const AboutUs = () => {

  // Team member data
  const teamMembers = [
    {
      name: "Himanshu Haldar",
      role: "Project Lead",
      bio: "Skilled in React, Node.js and cloud infrastructure. Passionate about using technology to solve real-world problems.",
      image: "/api/placeholder/400/400" 
    },
    {
      name: "Prem Raj",
      role: "Full Stack Developer",
      bio: "data expert in crop analysis and machine learning model development.",
      image: "/api/placeholder/400/400" 
    },
    {
      name: "Akriti",
      role: "Agricultural Specialist",
      bio: "Graduate in Agricultural Sciences with expertise in crop patterns across different regions of India.",
      image: "/api/placeholder/400/400" 
    },
    {
      name: "Kanisha Kumari",
      role: "UI/UX Designer",
      bio: "Creating user-friendly interfaces that help farmers easily access and understand crop recommendations.",
      image: "/api/placeholder/400/400" 
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-secondary">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">About Agri Guide</h1>
          <p className="text-xl text-center max-w-3xl mx-auto">
            Empowering Indian farmers with data-driven crop recommendations for sustainable agriculture
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-green-700 mb-6">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              At KisanCrop, we combine agricultural expertise with cutting-edge technology to provide Indian farmers with personalized crop recommendations based on soil conditions, weather patterns, and market trends.
            </p>
            <p className="text-gray-700 mb-4">
              Our goal is to increase agricultural yields, promote sustainable farming practices, and improve farmers' livelihoods across India by making data-driven farming accessible to all.
            </p>
            <div className="flex items-center gap-4 text-green-700 font-medium mt-8">
              <Leaf size={24} />
              <span>AI-Powered Agricultural Advisory/ Recommendation System</span>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src={logo}
              alt="Indian farming landscape"
              className="rounded-lg shadow-lg bg-secondary w-full"
            />
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-center justify-center gap-3 mb-12">
          <Users size={28} className="text-green-600" />
          <h2 className="text-3xl font-bold text-green-700 text-center">Meet Our Team</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-green-700">{member.name}</h3>
                <p className="text-green-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AboutUs;