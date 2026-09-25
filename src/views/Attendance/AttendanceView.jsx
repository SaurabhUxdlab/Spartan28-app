import React, { useState, useEffect } from 'react';
import { attendanceService } from '../../services/attendanceService';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { TurnstileScannerModal } from '../../components/layout/TurnstileScannerModal';
import { 
  QrCode, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  UserCheck 
} from 'lucide-react';

export const AttendanceView = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    setLoading(true);
    try {
      const data = await attendanceService.getAttendanceLogs();
      setLogs(data);
    } catch (e) {
      addToast({ title: 'Error', message: 'Failed to load attendance logs', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, nextStatus) => {
    try {
      await attendanceService.updateAttendanceStatus(id, nextStatus);
      addToast({ title: 'Attendance Updated', message: `Marked athlete as ${nextStatus}`, type: 'success' });
      loadAttendance();
    } catch (e) {
      addToast({ title: 'Error', message: e.message, type: 'error' });
    }
  };

  const columns = [
    {
      header: 'Spartan Athlete',
      key: 'memberName',
      sortable: true,
      render: (_, row) => (
        <div>
          <div style={{ fontWeight: 700, color: '#FFF', fontSize: '0.88rem' }}>{row.memberName}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)', fontFamily: 'var(--font-mono)' }}>
            Pass ID: {row.scanId || row.memberId}
          </div>
        </div>
      )
    },
    {
      header: 'Class / Protocol',
      key: 'className',
      sortable: true,
      render: (val) => <span style={{ color: '#FFF', fontWeight: 600 }}>{val || 'Open Facility Access'}</span>
    },
    {
      header: 'Gate / Location',
      key: 'turnstileLocation',
      render: (val) => (
        <span style={{ fontSize: '0.8rem', color: 'var(--spartan-cyan)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPin size={12} /> {val}
        </span>
      )
    },
    {
      header: 'Timestamp',
      key: 'checkInTime',
      sortable: true,
      render: (val) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#FFF' }}>
          ⏱️ {val}
        </span>
      )
    },
    {
      header: 'Verification Vector',
      key: 'verifiedBy',
      render: (val) => (
        <span style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)' }}>
          {val}
        </span>
      )
    },
    {
      header: 'Status',
      key: 'status',
      sortable: true,
      render: (val) => <StatusBadge status={val} />
    },
    {
      header: 'Action Controls',
      key: 'actions',
      align: 'right',
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }} onClick={(e) => e.stopPropagation()}>
          {row.status !== 'Present' && (
            <Button
              variant="ghost"
              size="sm"
              icon={CheckCircle2}
              onClick={() => handleUpdateStatus(row.id, 'Present')}
              title="Mark Present"
              style={{ color: 'var(--spartan-green)' }}
            />
          )}
          {row.status !== 'No-Show' && (
            <Button
              variant="ghost"
              size="sm"
              icon={XCircle}
              onClick={() => handleUpdateStatus(row.id, 'No-Show')}
              title="Mark No-Show"
              style={{ color: 'var(--spartan-red)' }}
            />
          )}
        </div>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Attendance Stats Cards */}
      <div className="grid-3">
        <div className="spartan-card" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--spartan-green-dim)', color: 'var(--spartan-green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <UserCheck size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)', fontFamily: 'var(--font-mono)' }}>PRESENT ATHLETES TODAY</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF' }}>
              {logs.filter(l => l.status === 'Present').length} Checked-In
            </div>
          </div>
        </div>

        <div className="spartan-card" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--spartan-red-dim)', color: 'var(--spartan-red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <XCircle size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)', fontFamily: 'var(--font-mono)' }}>NO-SHOW RATE</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF' }}>
              {logs.filter(l => l.status === 'No-Show').length} Records (3.2%)
            </div>
          </div>
        </div>

        <div className="spartan-card" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: 'var(--spartan-cyan-dim)', color: 'var(--spartan-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <QrCode size={22} />
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)', fontFamily: 'var(--font-mono)' }}>TURNSTILE SCANNERS</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--spartan-cyan)' }}>
              All 3 Gates Online
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Table */}
      <DataTable
        columns={columns}
        data={logs}
        loading={loading}
        searchKey="memberName"
        searchPlaceholder="Search athlete name or pass barcode ID..."
        filterOptions={[
          {
            key: 'status',
            label: 'Status',
            options: ['Present', 'No-Show']
          }
        ]}
        onAddClick={() => setIsScannerOpen(true)}
        addLabel="Launch Gate Scanner"
      />

      {/* Turnstile Scanner Modal */}
      <TurnstileScannerModal
        isOpen={isScannerOpen}
        onClose={() => {
          setIsScannerOpen(false);
          loadAttendance();
        }}
      />
    </div>
  );
};

export default AttendanceView;
