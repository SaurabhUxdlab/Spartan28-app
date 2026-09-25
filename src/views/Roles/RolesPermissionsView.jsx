import React, { useState, useEffect } from 'react';
import { rolesService } from '../../services/rolesService';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { useToast } from '../../context/ToastContext';
import { 
  ShieldCheck, 
  Lock, 
  Check, 
  Save, 
  Users, 
  Sparkles 
} from 'lucide-react';

export const RolesPermissionsView = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [permissionsState, setPermissionsState] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    setLoading(true);
    try {
      const data = await rolesService.getRoles();
      setRoles(data);
      if (data.length > 0) {
        setSelectedRole(data[0]);
        setPermissionsState(data[0].permissions || {});
      }
    } catch (e) {
      addToast({ title: 'Error', message: 'Failed to load roles', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setPermissionsState(role.permissions || {});
  };

  const handleTogglePermission = (permKey) => {
    setPermissionsState(prev => ({
      ...prev,
      [permKey]: !prev[permKey]
    }));
  };

  const handleSavePermissions = async () => {
    if (!selectedRole) return;
    setSaving(true);
    try {
      await rolesService.updateRolePermissions(selectedRole.id, permissionsState);
      addToast({
        title: 'Permissions Saved',
        message: `Updated RBAC matrix for ${selectedRole.name}`,
        type: 'success'
      });
      loadRoles();
    } catch (e) {
      addToast({ title: 'Error', message: e.message, type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const permissionCategories = [
    {
      title: 'PEOPLE & MEMBERS',
      items: [
        { key: 'members_view', label: 'View Athlete Directory & Telemetry' },
        { key: 'members_edit', label: 'Register & Edit Athlete Profiles' },
        { key: 'members_delete', label: 'Archive / Delete Athlete Records' }
      ]
    },
    {
      title: 'MEMBERSHIPS & COMMERCE',
      items: [
        { key: 'memberships_manage', label: 'Configure Membership Plans & Pricing' },
        { key: 'finance_transactions', label: 'Access Financial Ledger & Receipts' }
      ]
    },
    {
      title: 'FITNESS & PROTOCOLS',
      items: [
        { key: 'fitness_workouts', label: 'Build & Publish Workouts / Exercises' },
        { key: 'fitness_classes', label: 'Schedule Classes & Assign Coaches' }
      ]
    },
    {
      title: 'OPERATIONS & FACILITY',
      items: [
        { key: 'operations_bookings', label: 'Manage Reservations & Waitlists' },
        { key: 'operations_attendance', label: 'Operate Gate Scanners & Check-Ins' }
      ]
    },
    {
      title: 'ANALYTICS & CMS',
      items: [
        { key: 'cms_manage', label: 'Publish App Tips, Guides & Banners' },
        { key: 'reports_export', label: 'Export Intelligence & Revenue Reports' }
      ]
    },
    {
      title: 'SYSTEM SECURITY',
      items: [
        { key: 'roles_permissions', label: 'Modify Role Capabilities Matrix' },
        { key: 'audit_view', label: 'Inspect Audit Logs & Admin Actions' },
        { key: 'system_settings', label: 'Configure Global Facility Policies' }
      ]
    }
  ];

  if (loading) {
    return <LoadingSpinner text="Retrieving Role Based Access Matrix..." />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Notice Banner */}
      <div
        className="spartan-card"
        style={{
          background: 'var(--spartan-bg-surface)',
          borderLeft: '4px solid var(--spartan-green)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ShieldCheck size={20} style={{ color: 'var(--spartan-green)' }} />
          <div>
            <div style={{ fontWeight: 700, color: '#FFF', fontSize: '0.9rem' }}>
              Configurable Role-Based Access Control (RBAC)
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)' }}>
              Permissions can be fine-tuned per role without hardcoded business constraints.
            </div>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Save}
          onClick={handleSavePermissions}
          loading={saving}
        >
          Save Permissions Matrix
        </Button>
      </div>

      {/* Two Column Layout: Roles List + Permissions Config */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '1.5rem' }}>
        {/* Roles List */}
        <div className="spartan-card" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="spartan-card-title" style={{ marginBottom: '6px' }}>
            <Users size={16} style={{ color: 'var(--spartan-green)' }} />
            <span>Defined Administrative Roles</span>
          </div>

          {roles.map((role) => {
            const isSelected = selectedRole?.id === role.id;
            return (
              <div
                key={role.id}
                onClick={() => handleSelectRole(role)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--spartan-green-dim)' : 'var(--spartan-bg-surface)',
                  border: `1px solid ${isSelected ? 'var(--spartan-green)' : 'var(--spartan-border-subtle)'}`,
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 800, color: '#FFF', fontSize: '0.95rem' }}>{role.name}</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--spartan-text-muted)' }}>
                    {role.usersCount} Staff
                  </span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--spartan-text-secondary)', lineHeight: 1.3 }}>
                  {role.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Selected Role Permissions Checklist */}
        {selectedRole && (
          <div className="spartan-card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ borderBottom: '1px solid var(--spartan-border-subtle)', paddingBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF' }}>
                  {selectedRole.name} Permissions
                </h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)' }}>
                  Toggle capability switches below
                </div>
              </div>
              <Button variant="primary" size="sm" icon={Save} onClick={handleSavePermissions} loading={saving}>
                Apply
              </Button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {permissionCategories.map((cat) => (
                <div key={cat.title}>
                  <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--spartan-text-dim)', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    {cat.title}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {cat.items.map((item) => {
                      const enabled = Boolean(permissionsState[item.key]);
                      return (
                        <label
                          key={item.key}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 12px',
                            borderRadius: 'var(--radius-sm)',
                            background: enabled ? 'rgba(0, 229, 117, 0.04)' : 'var(--spartan-bg-surface)',
                            border: `1px solid ${enabled ? 'var(--spartan-green-border)' : 'var(--spartan-border-subtle)'}`,
                            cursor: 'pointer'
                          }}
                        >
                          <span style={{ fontSize: '0.82rem', color: enabled ? '#FFF' : 'var(--spartan-text-secondary)', fontWeight: enabled ? 600 : 400 }}>
                            {item.label}
                          </span>
                          <input
                            type="checkbox"
                            checked={enabled}
                            onChange={() => handleTogglePermission(item.key)}
                            style={{ accentColor: 'var(--spartan-green)', transform: 'scale(1.1)', cursor: 'pointer' }}
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RolesPermissionsView;
