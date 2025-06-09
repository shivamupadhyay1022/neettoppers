
import NavBar from '../components/NavBar';
import DashboardCard from '../components/DashboardCard';
import StatBlock from '../components/StatBlock';

const Dashboard = () => {
  const stats = [
    { label: 'Questions Solved', value: '1,247', icon: '✓' },
    { label: 'Mock Tests', value: '23', icon: '📊' },
    { label: 'Study Streak', value: '12 days', icon: '🔥' },
    { label: 'Accuracy', value: '78%', icon: '🎯' }
  ];

  const quickActions = [
    {
      title: 'Practice Questions',
      description: 'Chapter-wise MCQ practice',
      icon: '📝',
      link: '/neet-practice',
      gradient: 'from-blue-600/20 to-cyan-500/20'
    },
    {
      title: 'Mock Tests',
      description: 'Full-length practice tests',
      icon: '⏱️',
      link: '/neet-mock-tests',
      gradient: 'from-green-600/20 to-emerald-500/20'
    },
    {
      title: 'Flashcards',
      description: 'Quick revision with smart cards',
      icon: '📚',
      link: '/flashcards',
      gradient: 'from-purple-600/20 to-pink-500/20'
    },
    {
      title: 'AI Tutor',
      description: 'Get instant help and explanations',
      icon: '🤖',
      link: '/ai-tutor',
      gradient: 'from-amber-600/20 to-orange-500/20'
    },
    {
      title: 'Progress Report',
      description: 'Track your performance',
      icon: '📈',
      link: '/progress',
      gradient: 'from-red-600/20 to-rose-500/20'
    },
    {
      title: 'Premium Section',
      description: 'Unlock advanced features',
      icon: '⭐',
      link: '/premium',
      gradient: 'from-yellow-600/20 to-amber-500/20'
    }
  ];

  const subjects = [
    { name: 'Physics', icon: '⚛️', chapters: 32, color: 'from-blue-600 to-cyan-500', progress: 78 },
    { name: 'Chemistry', icon: '🧪', chapters: 28, color: 'from-green-600 to-emerald-500', progress: 65 },
    { name: 'Biology', icon: '🧬', chapters: 35, color: 'from-red-600 to-pink-500', progress: 82 }
  ];

  const weakChapters = [
    { subject: 'Physics', chapter: 'Thermodynamics', accuracy: '45%' },
    { subject: 'Chemistry', chapter: 'Organic Chemistry', accuracy: '52%' },
    { subject: 'Biology', chapter: 'Genetics', accuracy: '38%' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <NavBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back, Aspirant</h2>
          <p className="text-purple-300">Continue your journey to medical excellence</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <StatBlock
              key={index}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickActions.map((action, index) => (
              <DashboardCard
                key={index}
                title={action.title}
                description={action.description}
                icon={action.icon}
                link={action.link}
                gradient={action.gradient}
              />
            ))}
          </div>
        </div>

        {/* Subjects Progress */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6">Subject Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subjects.map((subject, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{subject.icon}</span>
                  <div className={`w-12 h-12 bg-gradient-to-br ${subject.color} rounded-full flex items-center justify-center`}>
                    <span className="text-white font-semibold text-sm">{subject.progress}%</span>
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-white mb-2">{subject.name}</h4>
                <p className="text-purple-300 mb-3">{subject.chapters} Chapters</p>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${subject.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${subject.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Content */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-6">Recommended Practice</h3>
          <div className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-6">
            <h4 className="text-lg font-semibold text-white mb-4">Chapters that need attention</h4>
            <div className="space-y-4">
              {weakChapters.map((chapter, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                  <div>
                    <h5 className="text-white font-medium">{chapter.subject} - {chapter.chapter}</h5>
                    <p className="text-purple-300 text-sm">Current accuracy: {chapter.accuracy}</p>
                  </div>
                  <button className="bg-gradient-to-r from-purple-600 to-amber-500 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-amber-600 transition-all">
                    Practice Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
