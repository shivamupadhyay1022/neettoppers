"use client"
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { User, Mail, School, Calendar, Settings, LogOut } from 'lucide-react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Arjun Patel',
    email: 'arjun.patel@email.com',
    class: '12',
    targetExam: 'NEET 2025',
    joinDate: 'January 2024',
    subscription: 'Premium'
  });

  const stats = [
    { label: 'Tests Completed', value: '47', color: 'text-purple-400' },
    { label: 'Questions Solved', value: '1,250', color: 'text-amber-400' },
    { label: 'Study Hours', value: '142', color: 'text-green-400' },
    { label: 'Current Rank', value: '#23', color: 'text-blue-400' }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
    console.log('Profile saved:', profile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-amber-500 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              
              <div className="text-center md:text-left flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="text-2xl font-bold text-white bg-slate-700/50 border border-purple-500/30 rounded-lg px-3 py-2 mb-2"
                  />
                ) : (
                  <h1 className="text-3xl font-bold text-white mb-2">{profile.name}</h1>
                )}
                
                <div className="flex flex-col md:flex-row gap-4 text-purple-200">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <School className="w-4 h-4" />
                    <span>Class {profile.class}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Since {profile.joinDate}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <span className="bg-gradient-to-r from-purple-600 to-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {profile.subscription} Member
                  </span>
                </div>
              </div>
              
              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6 text-center">
                <div className={`text-2xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-purple-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Settings Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Account Settings */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-purple-200 text-sm font-medium mb-2">Target Exam</label>
                  {isEditing ? (
                    <select
                      value={profile.targetExam}
                      onChange={(e) => setProfile({...profile, targetExam: e.target.value})}
                      className="w-full bg-slate-700/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="NEET 2025">NEET 2025</option>
                      <option value="JEE Main 2025">JEE Main 2025</option>
                      <option value="JEE Advanced 2025">JEE Advanced 2025</option>
                    </select>
                  ) : (
                    <div className="text-white">{profile.targetExam}</div>
                  )}
                </div>
                
                <div>
                  <label className="block text-purple-200 text-sm font-medium mb-2">Class</label>
                  {isEditing ? (
                    <select
                      value={profile.class}
                      onChange={(e) => setProfile({...profile, class: e.target.value})}
                      className="w-full bg-slate-700/50 border border-purple-500/30 rounded-lg px-3 py-2 text-white"
                    >
                      <option value="11">Class 11</option>
                      <option value="12">Class 12</option>
                    </select>
                  ) : (
                    <div className="text-white">Class {profile.class}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Subscription & Actions */}
            <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-6">Subscription</h2>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-600/20 to-amber-500/20 border border-purple-500/30 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-white font-semibold">Premium Plan</div>
                      <div className="text-purple-200 text-sm">Active until Dec 2024</div>
                    </div>
                    <div className="text-amber-400 font-bold">₹999/month</div>
                  </div>
                </div>
                
                <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition-colors">
                  Manage Subscription
                </button>
                
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
