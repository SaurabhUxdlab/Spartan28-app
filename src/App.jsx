import React, { useState } from 'react';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { GoalsScreen } from './components/screens/GoalsScreen';
import { PlansScreen } from './components/screens/PlansScreen';
import { SquadSuccessScreen } from './components/screens/SquadSuccessScreen';
import { LoginScreen } from './components/screens/LoginScreen';
import { RegisterScreen } from './components/screens/RegisterScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { CoachChatScreen } from './components/screens/CoachChatScreen';
import { WorkoutsScreen } from './components/screens/WorkoutsScreen';
import { WorkoutActiveScreen } from './components/screens/WorkoutActiveScreen';
import { ScheduleScreen } from './components/screens/ScheduleScreen';
import { ClassDetailsScreen } from './components/screens/ClassDetailsScreen';
import { BookedSuccessScreen } from './components/screens/BookedSuccessScreen';
import { CheckoutScreen } from './components/screens/CheckoutScreen';
import { ProtocolUnlockedScreen } from './components/screens/ProtocolUnlockedScreen';
import { ProgressScreen } from './components/screens/ProgressScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { BottomNav } from './components/BottomNav';
import { Layers } from 'lucide-react';

export function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [activeTab, setActiveTab] = useState('home');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showScreenPicker, setShowScreenPicker] = useState(false);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'home') setCurrentScreen('home');
    if (tabId === 'workouts') setCurrentScreen('workouts');
    if (tabId === 'schedule') setCurrentScreen('schedule');
    if (tabId === 'progress') setCurrentScreen('progress');
    if (tabId === 'profile') setCurrentScreen('profile');
  };

  const isMainTabScreen = ['home', 'workouts', 'schedule', 'progress', 'profile'].includes(currentScreen);

  const screenList = [
    { id: 'welcome', label: '1. Welcome Splash' },
    { id: 'goals', label: '2. Goals Onboarding' },
    { id: 'plans', label: '3. Select Path (Plans)' },
    { id: 'squad_success', label: '4. Squad Unlocked' },
    { id: 'login', label: '5. Login (Welcome Back)' },
    { id: 'register', label: '6. Create Account' },
    { id: 'home', label: '7. Home (Good Morning)' },
    { id: 'coach_chat', label: '8. Coach Ron Chat' },
    { id: 'workouts', label: '9. My Workouts' },
    { id: 'workout_active', label: '10. Dumbbell Row (Active)' },
    { id: 'schedule', label: '11. Your Schedule' },
    { id: 'class_details', label: '12. Saturday Bootcamp' },
    { id: 'booked_success', label: '13. Booked Success' },
    { id: 'checkout', label: '14. Confirm & Pay' },
    { id: 'protocol_unlocked', label: '15. Protocol Unlocked' },
    { id: 'progress', label: '16. Spartan Progress' },
    { id: 'profile', label: '17. Athlete Profile' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#08090a] flex items-center justify-center p-0 sm:p-4 text-white font-body selection:bg-[#00E676] selection:text-black overflow-hidden">
      {/* Quick Screen Switcher for Testing & Review */}
      <aside aria-label="Screen Switcher Navigation" className="fixed bottom-3 right-3 sm:bottom-4 sm:left-4 sm:right-auto z-50 flex items-center gap-2">
        <button
          onClick={() => setShowScreenPicker(!showScreenPicker)}
          className="bg-[#14171a]/90 hover:bg-[#1f242a] text-[#00E676] border border-[#00E676]/40 px-3.5 py-2 rounded-full text-[11px] font-headline font-bold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md shadow-2xl transition-all cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Switch Screen</span>
        </button>

        {showScreenPicker && (
          <div className="absolute left-0 bottom-12 w-64 bg-[#14171a] border border-[#272d34] rounded-xl shadow-2xl p-2 max-h-[80vh] overflow-y-auto z-50 flex flex-col gap-1">
            <div className="px-2 py-1 text-[10px] font-headline font-bold uppercase text-gray-400 tracking-wider border-b border-[#22272d] mb-1">
              Select Screen to Preview
            </div>
            {screenList.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentScreen(s.id);
                  if (['home', 'workouts', 'schedule', 'progress', 'profile'].includes(s.id)) {
                    setActiveTab(s.id);
                  }
                  setShowScreenPicker(false);
                }}
                className={`text-left px-2.5 py-1.5 rounded text-[12px] font-medium transition-colors cursor-pointer ${
                  currentScreen === s.id
                    ? 'bg-[#00E676] text-black font-bold'
                    : 'text-gray-300 hover:bg-[#1d2228] hover:text-white'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}
      </aside>

      {/* Realistic Mobile Viewport Device Frame */}
      <main className="w-full sm:w-[375px] h-[100dvh] sm:h-[730px] sm:max-h-[96vh] bg-[#121416] relative shadow-[0_0_60px_rgba(0,0,0,0.9)] sm:rounded-[28px] sm:border-[5px] sm:border-[#20252b] overflow-hidden flex flex-col">
        {/* Mobile Status Bar */}
        <header className="w-full h-8 px-6 pt-2 flex items-center justify-between text-[11px] font-semibold text-white/90 select-none z-30 flex-shrink-0 bg-[#121416]">
          <span className="font-semibold tracking-tight">9:41</span>
          <div className="w-20 h-3.5 bg-black rounded-full" />
          <div className="flex items-center gap-1.5">
            {/* Cellular Signal Icon */}
            <svg className="w-3.5 h-3" viewBox="0 0 17 11" fill="none">
              <rect x="0" y="8" width="2.5" height="3" rx="0.5" fill="white" />
              <rect x="4.5" y="5.5" width="2.5" height="5.5" rx="0.5" fill="white" />
              <rect x="9" y="3" width="2.5" height="8" rx="0.5" fill="white" />
              <rect x="13.5" y="0" width="2.5" height="11" rx="0.5" fill="white" />
            </svg>
            {/* WiFi Icon */}
            <svg className="w-3.5 h-3" viewBox="0 0 16 12" fill="none">
              <path d="M8 11.5a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4z" fill="white" />
              <path d="M4.5 7.5a4.95 4.95 0 017 0" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M2 4.5a8.5 8.5 0 0112 0" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            {/* Battery Icon */}
            <svg className="w-5 h-2.5" viewBox="0 0 24 12" fill="none">
              <rect x="0.5" y="0.5" width="20" height="11" rx="2.5" stroke="white" strokeWidth="1" />
              <rect x="2" y="2" width="14" height="8" rx="1.5" fill="white" />
              <path d="M22 4.5v3" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto hide-scrollbar relative flex flex-col h-full">
          {/* Render Active Screen */}
          {currentScreen === 'welcome' && (
            <WelcomeScreen
              onGetStarted={() => setCurrentScreen('goals')}
              onLogin={() => setCurrentScreen('login')}
            />
          )}

          {currentScreen === 'goals' && (
            <GoalsScreen
              onContinue={(goals) => setCurrentScreen('plans')}
              onBack={() => setCurrentScreen('welcome')}
            />
          )}

          {currentScreen === 'plans' && (
            <PlansScreen
              onSelectPlan={(plan) => {
                setSelectedPlan(plan);
                setCurrentScreen('squad_success');
              }}
              onBack={() => setCurrentScreen('goals')}
            />
          )}

          {currentScreen === 'squad_success' && (
            <SquadSuccessScreen
              selectedPlan={selectedPlan}
              onStartTraining={() => {
                setActiveTab('home');
                setCurrentScreen('home');
              }}
            />
          )}

          {currentScreen === 'login' && (
            <LoginScreen
              onLoginSuccess={() => {
                setActiveTab('home');
                setCurrentScreen('home');
              }}
              onGoToRegister={() => setCurrentScreen('register')}
              onBack={() => setCurrentScreen('welcome')}
            />
          )}

          {currentScreen === 'register' && (
            <RegisterScreen
              onRegisterSuccess={() => setCurrentScreen('goals')}
              onGoToLogin={() => setCurrentScreen('login')}
              onBack={() => setCurrentScreen('login')}
            />
          )}

          {currentScreen === 'home' && (
            <HomeScreen
              onStartWorkout={() => setCurrentScreen('workout_active')}
              onViewClassDetails={() => setCurrentScreen('class_details')}
              onOpenChat={() => setCurrentScreen('coach_chat')}
            />
          )}

          {currentScreen === 'coach_chat' && (
            <CoachChatScreen
              onBack={() => {
                setActiveTab('home');
                setCurrentScreen('home');
              }}
            />
          )}

          {currentScreen === 'workouts' && (
            <WorkoutsScreen
              onSelectWorkout={(workout) => {
                setSelectedWorkout(workout);
                setCurrentScreen('workout_active');
              }}
            />
          )}

          {currentScreen === 'workout_active' && (
            <WorkoutActiveScreen
              workout={selectedWorkout}
              onClose={() => setCurrentScreen('workouts')}
              onFinish={() => {
                setActiveTab('progress');
                setCurrentScreen('progress');
              }}
            />
          )}

          {currentScreen === 'schedule' && (
            <ScheduleScreen
              onSelectClass={(cls) => {
                setSelectedClass(cls);
                setCurrentScreen('class_details');
              }}
              onOpenPacks={() => setCurrentScreen('checkout')}
            />
          )}

          {currentScreen === 'class_details' && (
            <ClassDetailsScreen
              classData={selectedClass}
              onBack={() => setCurrentScreen('schedule')}
              onBookClass={(cls) => {
                setSelectedClass(cls);
                setCurrentScreen('booked_success');
              }}
            />
          )}

          {currentScreen === 'booked_success' && (
            <BookedSuccessScreen
              classData={selectedClass}
              onDone={() => {
                setActiveTab('schedule');
                setCurrentScreen('schedule');
              }}
              onAddToCalendar={() => {
                setCurrentScreen('protocol_unlocked');
              }}
            />
          )}

          {currentScreen === 'checkout' && (
            <CheckoutScreen
              onAuthorizePay={() => setCurrentScreen('protocol_unlocked')}
              onBack={() => setCurrentScreen('schedule')}
            />
          )}

          {currentScreen === 'protocol_unlocked' && (
            <ProtocolUnlockedScreen
              onBrowseSchedule={() => {
                setActiveTab('schedule');
                setCurrentScreen('schedule');
              }}
              onViewWallet={() => {
                setActiveTab('progress');
                setCurrentScreen('progress');
              }}
            />
          )}

          {currentScreen === 'progress' && (
            <ProgressScreen
              onBrowseSchedule={() => {
                setActiveTab('schedule');
                setCurrentScreen('schedule');
              }}
              onViewWallet={() => {
                setActiveTab('schedule');
                setCurrentScreen('schedule');
              }}
              onOpenWorkout={() => {
                setActiveTab('workouts');
                setCurrentScreen('workouts');
              }}
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileScreen
              onLogout={() => setCurrentScreen('welcome')}
              onManageMembership={() => setCurrentScreen('plans')}
            />
          )}
        </div>

        {/* Global Bottom Navigation for Authenticated Tabs */}
        {isMainTabScreen && (
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        )}
      </main>
    </div>
  );
}

export default App;
