import React, { useState, useEffect } from 'react';
import { contentService } from '../../services/contentService';
import { ContentItemModal } from './ContentItemModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Quote, 
  Megaphone, 
  Smartphone, 
  CheckCircle2 
} from 'lucide-react';

export const ContentManagementView = () => {
  const [contentItems, setContentItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      const data = await contentService.getContentItems();
      setContentItems(data);
    } catch (e) {
      addToast({ title: 'Error', message: 'Failed to load CMS items', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!deletingItem) return;
    try {
      await contentService.deleteContentItem(deletingItem.id);
      addToast({ title: 'Content Removed', message: `Deleted ${deletingItem.title}`, type: 'success' });
      setDeletingItem(null);
      loadContent();
    } catch (e) {
      addToast({ title: 'Error', message: e.message, type: 'error' });
    }
  };

  const columns = [
    {
      header: 'Title & Summary',
      key: 'title',
      sortable: true,
      render: (_, row) => (
        <div>
          <div style={{ fontWeight: 700, color: 'var(--spartan-text-primary)', fontSize: '0.88rem' }}>{row.title}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)', maxWidth: '320px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
            "{row.body}"
          </div>
        </div>
      )
    },
    {
      header: 'Type',
      key: 'type',
      sortable: true,
      render: (val) => (
        <span className="spartan-badge spartan-badge-cyan">
          {val}
        </span>
      )
    },
    {
      header: 'App Placement',
      key: 'placement',
      render: (val) => (
        <span style={{ fontSize: '0.78rem', color: 'var(--spartan-text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Smartphone size={12} style={{ color: 'var(--spartan-green)' }} /> {val}
        </span>
      )
    },
    {
      header: 'Author',
      key: 'author',
      render: (val) => <span style={{ fontSize: '0.8rem', color: 'var(--spartan-text-primary)' }}>{val}</span>
    },
    {
      header: 'Published Date',
      key: 'publishedAt',
      sortable: true,
      render: (val) => <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>{val}</span>
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
          <Button variant="ghost" size="sm" icon={Edit} onClick={() => handleEdit(row)} title="Edit Content" />
          <Button variant="ghost" size="sm" icon={Trash2} onClick={() => setDeletingItem(row)} title="Delete Content" style={{ color: 'var(--spartan-red)' }} />
        </div>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <DataTable
        columns={columns}
        data={contentItems}
        loading={loading}
        searchKey="title"
        searchPlaceholder="Search app content, announcements, or coach tips..."
        filterOptions={[
          {
            key: 'type',
            label: 'Type',
            options: ['Coach Tip', 'Announcement', 'Protocol Guide', 'Promotional Banner']
          }
        ]}
        onAddClick={() => {
          setEditingItem(null);
          setIsModalOpen(true);
        }}
        addLabel="Publish App Content"
      />

      {/* Content Form Modal */}
      <ContentItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingItem}
        onSuccess={loadContent}
      />

      {/* Confirm Delete */}
      <ConfirmDialog
        isOpen={Boolean(deletingItem)}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDelete}
        title="Remove App Content"
        message={`Are you sure you want to delete "${deletingItem?.title}"? It will disappear from athlete mobile devices.`}
      />
    </div>
  );
};

export default ContentManagementView;
