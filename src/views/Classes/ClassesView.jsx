import React, { useState, useEffect } from 'react';
import { classesService } from '../../services/classesService';
import { ClassFormModal } from './ClassFormModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { 
  CalendarDays, 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Flame 
} from 'lucide-react';

export const ClassesView = ({ triggerAction }) => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [deletingClass, setDeletingClass] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    loadClasses();
  }, []);

  useEffect(() => {
    if (triggerAction === 'new_class') {
      setEditingClass(null);
      setIsFormOpen(true);
    }
  }, [triggerAction]);

  const loadClasses = async () => {
    setLoading(true);
    try {
      const data = await classesService.getClasses();
      setClasses(data);
    } catch (e) {
      addToast({ title: 'Error', message: 'Failed to load classes', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cls) => {
    setEditingClass(cls);
    setIsFormOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingClass) return;
    try {
      await classesService.deleteClass(deletingClass.id);
      addToast({ title: 'Class Cancelled', message: `Deleted ${deletingClass.name}`, type: 'success' });
      setDeletingClass(null);
      loadClasses();
    } catch (e) {
      addToast({ title: 'Error', message: e.message, type: 'error' });
    }
  };

  const columns = [
    {
      header: 'Class / Session',
      key: 'name',
      sortable: true,
      render: (_, row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--spartan-text-primary)', fontSize: '0.9rem' }}>{row.name}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)' }}>{row.category}</div>
        </div>
      )
    },
    {
      header: 'Schedule & Time',
      key: 'time',
      render: (_, row) => (
        <div>
          <div style={{ fontSize: '0.82rem', color: 'var(--spartan-text-primary)', fontWeight: 600 }}>
            {row.dayOfWeek} • {row.startTime}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)' }}>
            {row.durationMinutes} Minutes
          </div>
        </div>
      )
    },
    {
      header: 'Facility Location',
      key: 'location',
      sortable: true,
      render: (val) => (
        <span style={{ fontSize: '0.82rem', color: 'var(--spartan-cyan)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <MapPin size={12} /> {val}
        </span>
      )
    },
    {
      header: 'Coach Lead',
      key: 'coachName',
      sortable: true,
      render: (val) => (
        <div style={{ fontSize: '0.82rem', color: 'var(--spartan-text-primary)', fontWeight: 600 }}>
          {val}
        </div>
      )
    },
    {
      header: 'Capacity & Roster',
      key: 'capacity',
      render: (_, row) => {
        const isFull = row.bookedCount >= row.capacity;
        return (
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 700, color: isFull ? 'var(--spartan-red)' : 'var(--spartan-green)' }}>
              {row.bookedCount} / {row.capacity} SPOTS
            </div>
            {row.waitlistCount > 0 && (
              <div style={{ fontSize: '0.68rem', color: 'var(--spartan-amber)', fontFamily: 'var(--font-mono)' }}>
                +{row.waitlistCount} Waitlisted
              </div>
            )}
          </div>
        );
      }
    },
    {
      header: 'Intensity',
      key: 'intensity',
      render: (val) => <StatusBadge status={val} />
    },
    {
      header: 'Entry Rate',
      key: 'entryRate',
      render: (val) => (
        <div style={{ fontSize: '0.75rem', color: 'var(--spartan-text-muted)' }}>
          {val || 'Standard Pass'}
        </div>
      )
    },
    {
      header: 'Status',
      key: 'status',
      sortable: true,
      render: (val) => <StatusBadge status={val} />
    },
    {
      header: 'Actions',
      key: 'actions',
      align: 'right',
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }} onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="sm" icon={Edit} onClick={() => handleEdit(row)} title="Edit Class" />
          <Button variant="ghost" size="sm" icon={Trash2} onClick={() => setDeletingClass(row)} title="Delete Class" style={{ color: 'var(--spartan-red)' }} />
        </div>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <DataTable
        columns={columns}
        data={classes}
        loading={loading}
        searchKey="name"
        searchPlaceholder="Search class name, location, or coach lead..."
        filterOptions={[
          {
            key: 'location',
            label: 'Location',
            options: ['South Campus Turf', 'Ron\'s Private Facility', 'Downtown Studio']
          },
          {
            key: 'category',
            label: 'Category',
            options: ['Bootcamp & Conditioning', 'HIIT & Conditioning', 'Strength & Iron', '1-on-1 Protocol', 'Group Protocol']
          }
        ]}
        onAddClick={() => {
          setEditingClass(null);
          setIsFormOpen(true);
        }}
        addLabel="Schedule New Class"
      />

      {/* Class Form Modal */}
      <ClassFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={editingClass}
        onSuccess={loadClasses}
      />

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={Boolean(deletingClass)}
        onClose={() => setDeletingClass(null)}
        onConfirm={handleDelete}
        title="Cancel Scheduled Class"
        message={`Are you sure you want to cancel "${deletingClass?.name}"? All booked athletes will be notified and their class credits automatically restored.`}
      />
    </div>
  );
};

export default ClassesView;
