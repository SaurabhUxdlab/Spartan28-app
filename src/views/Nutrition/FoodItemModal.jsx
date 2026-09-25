import React, { useState, useEffect } from 'react';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { FormField } from '../../components/common/FormField';
import { nutritionService } from '../../services/nutritionService';
import { useToast } from '../../context/ToastContext';

export const FoodItemModal = ({
  isOpen,
  onClose,
  initialData,
  onSuccess
}) => {
  const [formData, setFormData] = useState({
    name: '',
    servingSize: '1 serving (150g)',
    calories: 250,
    proteinG: 40,
    carbsG: 10,
    fatsG: 5,
    category: 'Proteins'
  });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        servingSize: initialData.servingSize || '',
        calories: initialData.calories || 0,
        proteinG: initialData.proteinG || 0,
        carbsG: initialData.carbsG || 0,
        fatsG: initialData.fatsG || 0,
        category: initialData.category || 'Proteins'
      });
    } else {
      setFormData({
        name: '',
        servingSize: '1 serving (150g)',
        calories: 250,
        proteinG: 40,
        carbsG: 10,
        fatsG: 5,
        category: 'Proteins'
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return;

    setLoading(true);
    try {
      if (initialData?.id) {
        await nutritionService.updateFood(initialData.id, formData);
        addToast({ title: 'Food Item Updated', message: `Saved ${formData.name}`, type: 'success' });
      } else {
        await nutritionService.createFood(formData);
        addToast({ title: 'Food Item Added', message: `Added ${formData.name} to food library`, type: 'success' });
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
      title={initialData ? 'Edit Food / Meal Item' : 'Add Food to Macro Library'}
      subtitle="Define macronutrient distribution per serving size"
      maxWidth="520px"
      footer={
        <>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} loading={loading}>
            {initialData ? 'Save Item' : 'Add Food'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit}>
        <FormField label="Food / Meal Name" required>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Grilled Chicken Breast"
            required
            className="form-control"
          />
        </FormField>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          <FormField label="Serving Size">
            <input
              type="text"
              value={formData.servingSize}
              onChange={(e) => setFormData({ ...formData, servingSize: e.target.value })}
              placeholder="e.g. 1 cup (195g) / 1 breast"
              className="form-control"
            />
          </FormField>

          <FormField label="Category">
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="form-control"
            >
              <option value="Proteins">Proteins</option>
              <option value="Carbs">Carbs</option>
              <option value="Healthy Fats">Healthy Fats</option>
              <option value="Greens & Veggies">Greens & Veggies</option>
              <option value="Pre/Post Workout Meals">Pre/Post Workout Meals</option>
            </select>
          </FormField>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          <FormField label="Calories (kcal)">
            <input
              type="number"
              value={formData.calories}
              onChange={(e) => setFormData({ ...formData, calories: Number(e.target.value) })}
              className="form-control font-mono"
            />
          </FormField>

          <FormField label="Protein (g)">
            <input
              type="number"
              value={formData.proteinG}
              onChange={(e) => setFormData({ ...formData, proteinG: Number(e.target.value) })}
              className="form-control font-mono"
            />
          </FormField>

          <FormField label="Carbs (g)">
            <input
              type="number"
              value={formData.carbsG}
              onChange={(e) => setFormData({ ...formData, carbsG: Number(e.target.value) })}
              className="form-control font-mono"
            />
          </FormField>

          <FormField label="Fats (g)">
            <input
              type="number"
              value={formData.fatsG}
              onChange={(e) => setFormData({ ...formData, fatsG: Number(e.target.value) })}
              className="form-control font-mono"
            />
          </FormField>
        </div>
      </form>
    </Modal>
  );
};

export default FoodItemModal;
