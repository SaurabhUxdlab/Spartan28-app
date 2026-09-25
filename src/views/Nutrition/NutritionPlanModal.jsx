import React, { useState, useEffect } from 'react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { FormField } from '../../components/common/FormField';
import { nutritionService } from '../../services/nutritionService';
import { useToast } from '../../context/ToastContext';

export const NutritionPlanModal = ({
  isOpen,
  onClose,
  initialData,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Fat Loss',
    targetCaloriesMin: 1800,
    targetCaloriesMax: 2200,
    macroSplit: { proteinPercent: 40, carbsPercent: 30, fatPercent: 30 },
    description: '',
    author: 'Coach Ron Brezzell'
  });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category || 'Fat Loss',
        targetCaloriesMin: initialData.targetCaloriesMin || 1800,
        targetCaloriesMax: initialData.targetCaloriesMax || 2200,
        macroSplit: initialData.macroSplit || { proteinPercent: 40, carbsPercent: 30, fatPercent: 30 },
        description: initialData.description || '',
        author: initialData.author || 'Coach Ron Brezzell'
      });
    } else {
      setFormData({
        name: '',
        category: 'Fat Loss',
        targetCaloriesMin: 1800,
        targetCaloriesMax: 2200,
        macroSplit: { proteinPercent: 40, carbsPercent: 30, fatPercent: 30 },
        description: 'High protein, moderate carb approach engineered to strip body fat while preserving muscle.',
        author: 'Coach Ron Brezzell'
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return;

    setLoading(true);
    try {
      if (initialData?.id) {
        await nutritionService.updatePlan(initialData.id, formData);
        addToast({ title: 'Plan Updated', message: `Saved ${formData.name}`, type: 'success' });
      } else {
        await nutritionService.createPlan(formData);
        addToast({ title: 'Fuel Plan Created', message: `Published ${formData.name}`, type: 'success' });
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
      title={initialData ? 'Edit Performance Fuel Plan' : 'Create Performance Fuel Plan'}
      subtitle="Define daily caloric target window and macro split breakdown"
      maxWidth="580px"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading}>
            {initialData ? 'Save Plan' : 'Publish Fuel Plan'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
          <FormField label="Plan Name" required>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Spartan Lean & Strong"
              required
              className="form-control"
            />
          </FormField>

          <FormField label="Objective Category">
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="form-control"
            >
              <option value="Fat Loss">Fat Loss</option>
              <option value="Muscle Gain">Muscle Gain</option>
              <option value="Balanced">Balanced</option>
              <option value="Keto">Keto</option>
              <option value="Vegan">Vegan</option>
            </select>
          </FormField>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          <FormField label="Target Calories Min (kcal)">
            <input
              type="number"
              value={formData.targetCaloriesMin}
              onChange={(e) => setFormData({ ...formData, targetCaloriesMin: Number(e.target.value) })}
              className="form-control font-mono"
            />
          </FormField>

          <FormField label="Target Calories Max (kcal)">
            <input
              type="number"
              value={formData.targetCaloriesMax}
              onChange={(e) => setFormData({ ...formData, targetCaloriesMax: Number(e.target.value) })}
              className="form-control font-mono"
            />
          </FormField>
        </div>

        {/* Macro Split (% P / C / F) */}
        <div style={{ background: 'var(--spartan-bg-surface)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--spartan-border-subtle)', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--spartan-text-muted)', marginBottom: '8px' }}>
            TARGET MACRONUTRIENT SPLIT (%):
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--spartan-green)' }}>PROTEIN %</span>
              <input
                type="number"
                value={formData.macroSplit?.proteinPercent || 40}
                onChange={(e) => setFormData({
                  ...formData,
                  macroSplit: { ...formData.macroSplit, proteinPercent: Number(e.target.value) }
                })}
                className="form-control font-mono"
              />
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--spartan-cyan)' }}>CARBS %</span>
              <input
                type="number"
                value={formData.macroSplit?.carbsPercent || 30}
                onChange={(e) => setFormData({
                  ...formData,
                  macroSplit: { ...formData.macroSplit, carbsPercent: Number(e.target.value) }
                })}
                className="form-control font-mono"
              />
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', color: 'var(--spartan-amber)' }}>FATS %</span>
              <input
                type="number"
                value={formData.macroSplit?.fatPercent || 30}
                onChange={(e) => setFormData({
                  ...formData,
                  macroSplit: { ...formData.macroSplit, fatPercent: Number(e.target.value) }
                })}
                className="form-control font-mono"
              />
            </div>
          </div>
        </div>

        <FormField label="Plan Description">
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="form-control"
          />
        </FormField>
      </form>
    </Modal>
  );
};

export default NutritionPlanModal;
