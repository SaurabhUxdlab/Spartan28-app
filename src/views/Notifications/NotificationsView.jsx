import React, { useState, useEffect } from 'react';
import { notificationsService } from '../../services/notificationsService';
import { BroadcastNotificationModal } from './BroadcastNotificationModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { Bell, Send, Trash2, Smartphone, Users, CheckCircle2 } from 'lucide-react';

export const NotificationsView = ({ triggerAction }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingNotif, setDeletingNotif] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    if (triggerAction === 'broadcast_alert') {
      setIsModalOpen(true);
    }
  }, [triggerAction]);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const data = await notificationsService.getNotifications();
      setNotifications(data);
    } catch (e) {
      addToast({ title: 'Error', message: 'Failed to load notifications', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingNotif) return;
    try {
      await notificationsService.deleteNotification(deletingNotif.id);
      addToast({ title: 'Notification Log Cleared', message: `Deleted ${deletingNotif.title}`, type: 'success' });
      setDeletingNotif(null);
      loadNotifications();
    } catch (e) {
      addToast({ title: 'Error', message: e.message, type: 'error' });
    }
  };

  const columns = [
    {
      header: 'Notification Title & Message',
      key: 'title',
      sortable: true,
      render: (_, row) => (
        <div>
          <div style={{ fontWeight: 700, color: '#FFF', fontSize: '0.88rem' }}>{row.title}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)', maxWidth: '320px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            {row.message}
          </div>
        </div>
      )
    },
    {
      header: 'Category',
      key: 'type',
      sortable: true,
      render: (val) => <span className="spartan-badge spartan-badge-cyan">{val}</span>
    },
    {
      header: 'Audience Group',
      key: 'targetGroup',
      sortable: true,
      render: (val) => (
        <span style={{ fontSize: '0.78rem', color: 'var(--spartan-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Users size={12} style={{ color: 'var(--spartan-green)' }} /> {val}
        </span>
      )
    },
    {
      header: 'Delivery Timestamp',
      key: 'sentTime',
      sortable: true,
      render: (val) => <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#FFF' }}>{val}</span>
    },
    {
      header: 'Delivered',
      key: 'deliveredCount',
      sortable: true,
      render: (val) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--spartan-green)' }}>
          {val || 0} Devices
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
      header: 'Actions',
      key: 'actions',
      align: 'right',
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }} onClick={(e) => e.stopPropagation()}>
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={() => setDeletingNotif(row)}
            style={{ color: 'var(--spartan-red)' }}
          />
        </div>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <DataTable
        columns={columns}
        data={notifications}
        loading={loading}
        searchKey="title"
        searchPlaceholder="Search notification title or body..."
        filterOptions={[
          {
            key: 'type',
            label: 'Type',
            options: ['Workout Alert', 'Class Reminder', 'Billing', 'Announcement']
          }
        ]}
        onAddClick={() => setIsModalOpen(true)}
        addLabel="Broadcast Mobile Alert"
      />

      {/* Broadcast Modal */}
      <BroadcastNotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadNotifications}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deletingNotif)}
        onClose={() => setDeletingNotif(null)}
        onConfirm={handleDelete}
        title="Delete Notification Log"
        message={`Are you sure you want to delete the broadcast log for "${deletingNotif?.title}"?`}
      />
    </div>
  );
};

export default NotificationsView;
