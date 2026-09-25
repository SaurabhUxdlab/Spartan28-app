import React, { useState, useEffect } from 'react';
import { nutritionService } from '../../services/nutritionService';
import { FoodItemModal } from './FoodItemModal';
import { NutritionPlanModal } from './NutritionPlanModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { DataTable } from '../../components/common/DataTable';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Button } from '../../components/common/Button';
import { Tabs } from '../../components/common/Tabs';
import { useToast } from '../../context/ToastContext';
import { 
  Apple, 
  Plus, 
  Edit, 
  Trash2, 
  Flame, 
  PieChart, 
  Layers 
} from 'lucide-react';

export const NutritionView = ({ triggerAction }) => {
  const [activeTab, setActiveTab] = useState('plans'); // 'plans' | 'foods'
  const [plans, setPlans] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [isFoodModalOpen, setIsFoodModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [editingFood, setEditingFood] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (triggerAction === 'new_nutrition') {
      setActiveTab('plans');
      setEditingPlan(null);
      setIsPlanModalOpen(true);
    }
  }, [triggerAction]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pList, fList] = await Promise.all([
        nutritionService.getPlans(),
        nutritionService.getFoods()
      ]);
      setPlans(pList);
      setFoods(fList);
    } catch (e) {
      addToast({ title: 'Error', message: 'Failed to load nutrition datasets', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingItem) return;
    try {
      if (deletingItem.type === 'plan') {
        await nutritionService.deletePlan(deletingItem.id);
        addToast({ title: 'Plan Archived', message: `Deleted ${deletingItem.name}`, type: 'success' });
      } else {
        await nutritionService.deleteFood(deletingItem.id);
        addToast({ title: 'Food Item Removed', message: `Deleted ${deletingItem.name}`, type: 'success' });
      }
      setDeletingItem(null);
      loadData();
    } catch (e) {
      addToast({ title: 'Error', message: e.message, type: 'error' });
    }
  };

  const foodColumns = [
    {
      header: 'Food / Meal',
      key: 'name',
      sortable: true,
      render: (_, row) => (
        <div>
          <div style={{ fontWeight: 700, color: '#FFF' }}>{row.name}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)' }}>{row.servingSize}</div>
        </div>
      )
    },
    {
      header: 'Category',
      key: 'category',
      sortable: true,
      render: (val) => <span className="spartan-badge spartan-badge-cyan">{val}</span>
    },
    {
      header: 'Calories',
      key: 'calories',
      sortable: true,
      render: (val) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--spartan-green)' }}>
          {val} kcal
        </span>
      )
    },
    {
      header: 'Protein',
      key: 'proteinG',
      sortable: true,
      render: (val) => <span style={{ fontFamily: 'var(--font-mono)' }}>{val}g</span>
    },
    {
      header: 'Carbs',
      key: 'carbsG',
      sortable: true,
      render: (val) => <span style={{ fontFamily: 'var(--font-mono)' }}>{val}g</span>
    },
    {
      header: 'Fats',
      key: 'fatsG',
      sortable: true,
      render: (val) => <span style={{ fontFamily: 'var(--font-mono)' }}>{val}g</span>
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
            icon={Edit}
            onClick={() => {
              setEditingFood(row);
              setIsFoodModalOpen(true);
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={() => setDeletingItem({ ...row, type: 'food' })}
            style={{ color: 'var(--spartan-red)' }}
          />
        </div>
      )
    }
  ];

  const planColumns = [
    {
      header: 'Performance Fuel Plan',
      key: 'name',
      sortable: true,
      render: (_, row) => (
        <div>
          <div style={{ fontWeight: 700, color: '#FFF', fontSize: '0.9rem' }}>{row.name}</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--spartan-text-muted)' }}>{row.description}</div>
        </div>
      )
    },
    {
      header: 'Objective',
      key: 'category',
      sortable: true,
      render: (val) => <span className="spartan-badge spartan-badge-green">{val}</span>
    },
    {
      header: 'Target Calories',
      key: 'calories',
      render: (_, row) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#FFF' }}>
          {row.targetCaloriesMin?.toLocaleString()} - {row.targetCaloriesMax?.toLocaleString()} kcal
        </span>
      )
    },
    {
      header: 'Macro Split (% P/C/F)',
      key: 'macros',
      render: (_, row) => (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--spartan-cyan)' }}>
          {row.macroSplit?.proteinPercent}P / {row.macroSplit?.carbsPercent}C / {row.macroSplit?.fatPercent}F
        </span>
      )
    },
    {
      header: 'Author Coach',
      key: 'author',
      render: (val) => <span style={{ fontSize: '0.8rem', color: '#FFF' }}>{val}</span>
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
            icon={Edit}
            onClick={() => {
              setEditingPlan(row);
              setIsPlanModalOpen(true);
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            icon={Trash2}
            onClick={() => setDeletingItem({ ...row, type: 'plan' })}
            style={{ color: 'var(--spartan-red)' }}
          />
        </div>
      )
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Tab Switcher */}
      <Tabs
        tabs={[
          { id: 'plans', label: 'Performance Fuel Plans', icon: PieChart, count: plans.length },
          { id: 'foods', label: 'Food & Meal Database', icon: Apple, count: foods.length }
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {activeTab === 'plans' ? (
        <DataTable
          columns={planColumns}
          data={plans}
          loading={loading}
          searchKey="name"
          searchPlaceholder="Search fuel plans..."
          onAddClick={() => {
            setEditingPlan(null);
            setIsPlanModalOpen(true);
          }}
          addLabel="Create Fuel Plan"
        />
      ) : (
        <DataTable
          columns={foodColumns}
          data={foods}
          loading={loading}
          searchKey="name"
          searchPlaceholder="Search food item or macro category..."
          filterOptions={[
            {
              key: 'category',
              label: 'Category',
              options: ['Proteins', 'Carbs', 'Healthy Fats', 'Greens & Veggies', 'Pre/Post Workout Meals']
            }
          ]}
          onAddClick={() => {
            setEditingFood(null);
            setIsFoodModalOpen(true);
          }}
          addLabel="Add Food Item"
        />
      )}

      {/* Modals */}
      <NutritionPlanModal
        isOpen={isPlanModalOpen}
        onClose={() => setIsPlanModalOpen(false)}
        initialData={editingPlan}
        onSuccess={loadData}
      />

      <FoodItemModal
        isOpen={isFoodModalOpen}
        onClose={() => setIsFoodModalOpen(false)}
        initialData={editingFood}
        onSuccess={loadData}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deletingItem)}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDelete}
        title={`Remove ${deletingItem?.type === 'plan' ? 'Fuel Plan' : 'Food Item'}`}
        message={`Are you sure you want to delete "${deletingItem?.name}"?`}
      />
    </div>
  );
};

export default NutritionView;
