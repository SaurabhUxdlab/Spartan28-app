import { dbService } from '../firebase/firestoreHelper';
import { auditService } from './auditService';

export const nutritionService = {
  async getFoods() {
    return await dbService.getCollection('nutritionFoods');
  },

  async createFood(data) {
    const food = await dbService.addDocument('nutritionFoods', {
      ...data,
      calories: Number(data.calories) || 0,
      proteinG: Number(data.proteinG) || 0,
      carbsG: Number(data.carbsG) || 0,
      fatsG: Number(data.fatsG) || 0,
      status: 'Active'
    });

    await auditService.logAction({
      action: 'Created Food Item',
      module: 'Nutrition',
      recordId: food.id,
      details: `Added ${food.name} (${food.calories} kcal) to Food Library`
    });

    return food;
  },

  async updateFood(id, updates) {
    const formatted = { ...updates };
    if (formatted.calories !== undefined) formatted.calories = Number(formatted.calories);
    if (formatted.proteinG !== undefined) formatted.proteinG = Number(formatted.proteinG);
    if (formatted.carbsG !== undefined) formatted.carbsG = Number(formatted.carbsG);
    if (formatted.fatsG !== undefined) formatted.fatsG = Number(formatted.fatsG);

    const result = await dbService.updateDocument('nutritionFoods', id, formatted);
    await auditService.logAction({
      action: 'Updated Food Item',
      module: 'Nutrition',
      recordId: id,
      details: `Updated food specifications for ${id}`
    });
    return result;
  },

  async deleteFood(id) {
    const result = await dbService.deleteDocument('nutritionFoods', id);
    await auditService.logAction({
      action: 'Deleted Food Item',
      module: 'Nutrition',
      recordId: id,
      details: `Removed food item ${id}`
    });
    return result;
  },

  // Nutrition Fuel Plans
  async getPlans() {
    return await dbService.getCollection('nutritionPlans');
  },

  async createPlan(data) {
    const plan = await dbService.addDocument('nutritionPlans', {
      ...data,
      targetCaloriesMin: Number(data.targetCaloriesMin) || 2000,
      targetCaloriesMax: Number(data.targetCaloriesMax) || 2400,
      macroSplit: data.macroSplit || { proteinPercent: 40, carbsPercent: 30, fatPercent: 30 },
      recommendedMealIds: data.recommendedMealIds || [],
      status: 'Active'
    });

    await auditService.logAction({
      action: 'Created Nutrition Fuel Plan',
      module: 'Nutrition',
      recordId: plan.id,
      details: `Created plan "${plan.name}" (${plan.category})`
    });

    return plan;
  },

  async updatePlan(id, updates) {
    const formatted = { ...updates };
    if (formatted.targetCaloriesMin) formatted.targetCaloriesMin = Number(formatted.targetCaloriesMin);
    if (formatted.targetCaloriesMax) formatted.targetCaloriesMax = Number(formatted.targetCaloriesMax);

    const result = await dbService.updateDocument('nutritionPlans', id, formatted);
    await auditService.logAction({
      action: 'Updated Nutrition Plan',
      module: 'Nutrition',
      recordId: id,
      details: `Updated nutritional macros/details for ${id}`
    });
    return result;
  },

  async deletePlan(id) {
    const result = await dbService.deleteDocument('nutritionPlans', id);
    await auditService.logAction({
      action: 'Deleted Nutrition Plan',
      module: 'Nutrition',
      recordId: id,
      details: `Archived nutrition plan ${id}`
    });
    return result;
  }
};
