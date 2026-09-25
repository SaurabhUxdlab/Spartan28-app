import React, { useState } from 'react';
import { Sidebar, NAV_SECTIONS } from './Sidebar';
import { Header } from './Header';
import { TurnstileScannerModal } from './TurnstileScannerModal';
import { QuickActionModal } from './QuickActionModal';

export const DashboardLayout = ({
  activeTab,
  onSelectTab,
  triggerAction,
  setTriggerAction,
  children
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);

  // Find active navigation item title, category, and subtitle
  let activeTitle = 'Command Dashboard';
  let activeCategory = 'Overview';
  let activeSubtitle = '';

  for (const section of NAV_SECTIONS) {
    const matched = section.items.find(i => i.id === activeTab);
    if (matched) {
      activeTitle = matched.label;
      activeCategory = section.title;
      activeSubtitle = matched.subtitle || '';
      break;
    }
  }

  const handleSelectQuickAction = (targetTab, actionId) => {
    onSelectTab(targetTab);
    if (setTriggerAction) {
      setTriggerAction(actionId);
    }
  };

  const sidebarWidth = isSidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%', backgroundColor: 'var(--spartan-bg-base)' }}>
      {/* Fixed Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={onSelectTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Administrative Canvas */}
      <div
        style={{
          marginLeft: sidebarWidth,
          width: `calc(100% - ${sidebarWidth})`,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          minWidth: 0,
          transition: 'margin-left 0.25s cubic-bezier(0.16, 1, 0.3, 1), width 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        <Header
          activeTitle={activeTitle}
          activeSubtitle={activeSubtitle}
          breadcrumb={activeCategory}
          onOpenQuickAction={() => setIsQuickActionOpen(true)}
          onOpenTurnstileScan={() => setIsScannerOpen(true)}
        />

        <main style={{ flex: 1, padding: '1.75rem' }}>
          {children}
        </main>
      </div>

      {/* Global Turnstile NFC/Barcode Scanner Modal */}
      <TurnstileScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
      />

      {/* Quick Action Hub Modal */}
      <QuickActionModal
        isOpen={isQuickActionOpen}
        onClose={() => setIsQuickActionOpen(false)}
        onSelectAction={handleSelectQuickAction}
      />
    </div>
  );
};

export default DashboardLayout;
