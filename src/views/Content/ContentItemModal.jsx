import React, { useState, useEffect } from 'react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { FormField } from '../../components/common/FormField';
import { contentService } from '../../services/contentService';
import { useToast } from '../../context/ToastContext';

export const ContentItemModal = ({
  isOpen,
  onClose,
  initialData,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Coach Tip',
    author: 'Ron Brezzell',
    body: '',
    placement: 'Mobile Home Hero Tip',
    status: 'Published'
  });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        type: initialData.type || 'Coach Tip',
        author: initialData.author || 'Ron Brezzell',
        body: initialData.body || '',
        placement: initialData.placement || 'Mobile Home Hero Tip',
        status: initialData.status || 'Published'
      });
    } else {
      setFormData({
        title: '',
        type: 'Coach Tip',
        author: 'Ron Brezzell',
        body: 'Focus on your eccentric movements today. Slow down the negative phase to maximize muscle time under tension.',
        placement: 'Mobile Home Hero Tip',
        status: 'Published'
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.body) return;

    setLoading(true);
    try {
      if (initialData?.id) {
        await contentService.updateContentItem(initialData.id, formData);
        addToast({ title: 'Content Updated', message: `Saved changes to ${formData.title}`, type: 'success' });
      } else {
        await contentService.createContentItem(formData);
        addToast({ title: 'Content Published', message: `Published to mobile feed: ${formData.title}`, type: 'success' });
      }
      if (onSuccess) onSuccess();
      onClose();
    } catch (e) {
      addToast({ title: 'Error', message: e.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit App Content' : 'Publish App Content & Tips'}
      subtitle="Push daily coach cues, facility announcements, and banners to the mobile app"
      maxWidth="580px"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading}>
            {initialData ? 'Save Changes' : 'Publish to App'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <FormField label="Content Title / Headline" required>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Focus On Eccentric Tempo"
            required
            className="form-control"
          />
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          <FormField label="Content Type">
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="form-control"
            >
              <option value="Coach Tip">Coach Tip</option>
              <option value="Announcement">Announcement</option>
              <option value="Protocol Guide">Protocol Guide</option>
              <option value="Promotional Banner">Promotional Banner</option>
            </select>
          </FormField>

          <FormField label="Author / Attribution">
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="form-control"
            />
          </FormField>

          <FormField label="App Placement">
            <select
              value={formData.placement}
              onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
              className="form-control"
            >
              <option value="Mobile Home Hero Tip">Mobile Home Hero Tip</option>
              <option value="App Banner">App Banner</option>
              <option value="Hydration Widget Note">Hydration Widget Note</option>
              <option value="Workout Hub">Workout Hub</option>
            </select>
          </FormField>
        </div>

        <FormField label="Body Content / Coach Advice" required>
          <textarea
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            rows={4}
            required
            className="form-control"
            placeholder="Type guidance visible to athletes..."
          />
        </FormField>
      </form>
    </Modal>
  );
};

export default ContentItemModal;
