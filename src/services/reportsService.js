import { dbService } from '../firebase/firestoreHelper';

export const reportsService = {
  async getOverviewMetrics() {
    const [members, memberships, classes, bookings, transactions, workouts] = await Promise.all([
      dbService.getCollection('members'),
      dbService.getCollection('memberships'),
      dbService.getCollection('classes'),
      dbService.getCollection('bookings'),
      dbService.getCollection('transactions'),
      dbService.getCollection('workouts')
    ]);

    const activeMembers = members.filter(m => m.status === 'Active');
    const totalRevenue = transactions.reduce((sum, t) => sum + (Number(t.amount) || 0), 0);
    const todayBookings = bookings.length;
    const totalWorkoutCompletions = workouts.reduce((sum, w) => sum + (Number(w.completionsCount) || 0), 0);

    return {
      totalMembers: members.length,
      activeMembers: activeMembers.length,
      activeMemberships: memberships.reduce((sum, m) => sum + (Number(m.subscribersCount) || 0), 0),
      upcomingClassesCount: classes.length,
      todayBookingsCount: todayBookings,
      totalRevenue,
      workoutCompletionsCount: totalWorkoutCompletions,
      retentionRate: '94.8%',
      vanguardClubMembersCount: members.filter(m => (m.measurements?.todaySteps || 0) >= 10000).length
    };
  },

  async getRevenueAnalytics() {
    return [
      { month: 'May', revenue: 14200, subscriptions: 9800, packs: 4400 },
      { month: 'Jun', revenue: 18500, subscriptions: 12400, packs: 6100 },
      { month: 'Jul', revenue: 22800, subscriptions: 15200, packs: 7600 },
      { month: 'Aug', revenue: 27400, subscriptions: 18100, packs: 9300 },
      { month: 'Sep', revenue: 32600, subscriptions: 21900, packs: 10700 },
      { month: 'Oct (Proj)', revenue: 38000, subscriptions: 25500, packs: 12500 }
    ];
  },

  async getWorkoutEngagement() {
    return [
      { day: 'Mon', sessions: 84, completionRate: 96 },
      { day: 'Tue', sessions: 92, completionRate: 94 },
      { day: 'Wed', sessions: 78, completionRate: 91 },
      { day: 'Thu', sessions: 89, completionRate: 95 },
      { day: 'Fri', sessions: 95, completionRate: 98 },
      { day: 'Sat', sessions: 110, completionRate: 99 },
      { day: 'Sun', sessions: 65, completionRate: 88 }
    ];
  },

  async getMembershipDistribution() {
    const memberships = await dbService.getCollection('memberships');
    return memberships.map(m => ({
      name: m.name,
      subscribers: m.subscribersCount || 0,
      price: m.price
    }));
  }
};
