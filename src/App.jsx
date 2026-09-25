import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { FacilityProvider } from './context/FacilityContext';
import { DashboardLayout } from './components/layout/DashboardLayout';

// View Imports
import { LoginView } from './views/Auth/LoginView';
import { OverviewView } from './views/Overview/OverviewView';
import { MembersListView } from './views/Members/MembersListView';
import { CoachesView } from './views/Coaches/CoachesView';
import { WorkoutsView } from './views/Workouts/WorkoutsView';
import { ExercisesView } from './views/Exercises/ExercisesView';
import { ProgramsView } from './views/Programs/ProgramsView';
import { ClassesView } from './views/Classes/ClassesView';
import { ScheduleCalendarView } from './views/Schedule/ScheduleCalendarView';
import { BookingsView } from './views/Bookings/BookingsView';
import { AttendanceView } from './views/Attendance/AttendanceView';
import { MembershipsView } from './views/Memberships/MembershipsView';
import { NutritionView } from './views/Nutrition/NutritionView';
import { ProgressPerformanceView } from './views/Progress/ProgressPerformanceView';
import { ContentManagementView } from './views/Content/ContentManagementView';
import { NotificationsView } from './views/Notifications/NotificationsView';
import { PaymentsView } from './views/Payments/PaymentsView';
import { ReportsView } from './views/Reports/ReportsView';
import { RolesPermissionsView } from './views/Roles/RolesPermissionsView';
import { AuditLogView } from './views/AuditLog/AuditLogView';

function DashboardRouter() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [triggerAction, setTriggerAction] = useState(null);

  if (!isAuthenticated) {
    return <LoginView />;
  }

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewView onNavigate={(tab) => setActiveTab(tab)} />;
      case 'members':
        return <MembersListView triggerAction={triggerAction} />;
      case 'coaches':
        return <CoachesView triggerAction={triggerAction} />;
      case 'workouts':
        return <WorkoutsView triggerAction={triggerAction} />;
      case 'exercises':
        return <ExercisesView />;
      case 'programs':
        return <ProgramsView />;
      case 'classes':
        return <ClassesView triggerAction={triggerAction} />;
      case 'schedule':
        return <ScheduleCalendarView />;
      case 'bookings':
        return <BookingsView />;
      case 'attendance':
        return <AttendanceView />;
      case 'memberships':
        return <MembershipsView />;
      case 'nutrition':
        return <NutritionView triggerAction={triggerAction} />;
      case 'progress':
        return <ProgressPerformanceView />;
      case 'content':
        return <ContentManagementView />;
      case 'notifications':
        return <NotificationsView triggerAction={triggerAction} />;
      case 'payments':
        return <PaymentsView />;
      case 'reports':
        return <ReportsView />;
      case 'roles':
        return <RolesPermissionsView />;
      case 'audit':
        return <AuditLogView />;
      default:
        return <OverviewView onNavigate={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      onSelectTab={(tab) => {
        setActiveTab(tab);
        setTriggerAction(null);
      }}
      triggerAction={triggerAction}
      setTriggerAction={setTriggerAction}
    >
      {renderActiveView()}
    </DashboardLayout>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FacilityProvider>
          <ToastProvider>
            <DashboardRouter />
          </ToastProvider>
        </FacilityProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
