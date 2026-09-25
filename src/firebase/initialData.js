// Authentic initial dataset sourced directly from Spartan 28 Design (V3) and Developer Proposal

export const INITIAL_DATA = {
  // 1. Members
  members: [
    {
      id: 'MEM-001',
      name: 'Alex Johnson',
      email: 'alex@spartan28.com',
      phone: '+1 (555) 234-5678',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'Active',
      membershipPlan: 'Group Training',
      membershipStatus: 'Active',
      planRenewalDate: '2026-10-24',
      assignedCoachId: 'COACH-001',
      assignedCoachName: 'Ron Brezzell',
      joinedDate: '2026-06-15',
      lastActive: '12 mins ago',
      scanId: 'SP28-9941',
      credits: 10,
      goals: ['Build Muscle', 'Lose Fat', 'Get Stronger'],
      measurements: {
        weightLbs: 185,
        weightHistory: [189, 188, 186.5, 185],
        streakDays: 7,
        workoutsThisMonth: 12,
        strengthScore: 84,
        dailyStepTarget: 10000,
        todaySteps: 8420,
        hydrationQuotaMl: 3500,
        todayHydrationMl: 2850,
        prs: {
          squat: '365 lbs',
          deadlift: '445 lbs',
          bench: '285 lbs',
          overheadPress: '185 lbs'
        }
      },
      tags: ['Elite Squad', 'Vanguard 10k Club', 'Apple Watch Synced']
    },
    {
      id: 'MEM-002',
      name: 'Sarah Connor',
      email: 'sarah.c@spartan28.com',
      phone: '+1 (555) 987-6543',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      status: 'Active',
      membershipPlan: 'Elite Protocol 10-Pack',
      membershipStatus: 'Active',
      planRenewalDate: '2026-11-10',
      assignedCoachId: 'COACH-002',
      assignedCoachName: 'Marcus Vance',
      joinedDate: '2026-07-01',
      lastActive: '2 hours ago',
      scanId: 'SP28-8832',
      credits: 7,
      goals: ['Athletic Performance', 'Improve Mobility'],
      measurements: {
        weightLbs: 138,
        weightHistory: [142, 140, 139, 138],
        streakDays: 14,
        workoutsThisMonth: 16,
        strengthScore: 91,
        dailyStepTarget: 10000,
        todaySteps: 11200,
        hydrationQuotaMl: 3000,
        todayHydrationMl: 2600,
        prs: {
          squat: '225 lbs',
          deadlift: '275 lbs',
          bench: '155 lbs',
          overheadPress: '105 lbs'
        }
      },
      tags: ['Hyrox Competitor', 'Top Performer']
    },
    {
      id: 'MEM-003',
      name: 'Marcus Reed',
      email: 'm.reed@spartan28.com',
      phone: '+1 (555) 345-6789',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      status: 'Active',
      membershipPlan: 'Annual Pass',
      membershipStatus: 'Active',
      planRenewalDate: '2027-02-14',
      assignedCoachId: 'COACH-001',
      assignedCoachName: 'Ron Brezzell',
      joinedDate: '2026-02-14',
      lastActive: '1 day ago',
      scanId: 'SP28-4411',
      credits: 99,
      goals: ['Get Stronger', 'Build Muscle'],
      measurements: {
        weightLbs: 205,
        weightHistory: [200, 202, 204, 205],
        streakDays: 4,
        workoutsThisMonth: 10,
        strengthScore: 88,
        dailyStepTarget: 10000,
        todaySteps: 7600,
        hydrationQuotaMl: 4000,
        todayHydrationMl: 3100,
        prs: {
          squat: '405 lbs',
          deadlift: '495 lbs',
          bench: '315 lbs',
          overheadPress: '205 lbs'
        }
      },
      tags: ['Powerlifter', 'Annual Member']
    },
    {
      id: 'MEM-004',
      name: 'Elena Ramos',
      email: 'elena.r@spartan28.com',
      phone: '+1 (555) 456-7890',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      status: 'Active',
      membershipPlan: 'Monthly Plan',
      membershipStatus: 'Active',
      planRenewalDate: '2026-10-15',
      assignedCoachId: 'COACH-003',
      assignedCoachName: 'Elena Rostova',
      joinedDate: '2026-08-15',
      lastActive: '3 hours ago',
      scanId: 'SP28-7712',
      credits: 5,
      goals: ['Lose Fat', 'Improve Fitness'],
      measurements: {
        weightLbs: 145,
        weightHistory: [152, 150, 147, 145],
        streakDays: 9,
        workoutsThisMonth: 14,
        strengthScore: 76,
        dailyStepTarget: 8000,
        todaySteps: 9400,
        hydrationQuotaMl: 2800,
        todayHydrationMl: 2400,
        prs: {
          squat: '185 lbs',
          deadlift: '215 lbs',
          bench: '115 lbs',
          overheadPress: '85 lbs'
        }
      },
      tags: ['Fat Loss Sprint']
    },
    {
      id: 'MEM-005',
      name: 'David Miller',
      email: 'david.m@spartan28.com',
      phone: '+1 (555) 567-8901',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      status: 'Paused',
      membershipPlan: 'Monthly Plan',
      membershipStatus: 'Paused',
      planRenewalDate: '2026-10-01',
      assignedCoachId: 'COACH-001',
      assignedCoachName: 'Ron Brezzell',
      joinedDate: '2026-04-10',
      lastActive: '5 days ago',
      scanId: 'SP28-3320',
      credits: 2,
      goals: ['General Health'],
      measurements: {
        weightLbs: 178,
        weightHistory: [178, 178, 178, 178],
        streakDays: 0,
        workoutsThisMonth: 3,
        strengthScore: 68,
        dailyStepTarget: 8000,
        todaySteps: 4200,
        hydrationQuotaMl: 3000,
        todayHydrationMl: 1800,
        prs: {
          squat: '225 lbs',
          deadlift: '275 lbs',
          bench: '185 lbs',
          overheadPress: '115 lbs'
        }
      },
      tags: ['Travel Pause']
    },
    {
      id: 'MEM-006',
      name: 'Chloe Bennett',
      email: 'chloe.b@spartan28.com',
      phone: '+1 (555) 678-9012',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      status: 'Active',
      membershipPlan: 'Group Training',
      membershipStatus: 'Active',
      planRenewalDate: '2026-10-28',
      assignedCoachId: 'COACH-004',
      assignedCoachName: 'Jordan Cole',
      joinedDate: '2026-05-19',
      lastActive: '30 mins ago',
      scanId: 'SP28-6619',
      credits: 12,
      goals: ['Build Muscle', 'Athletic Performance'],
      measurements: {
        weightLbs: 132,
        weightHistory: [130, 131, 132, 132],
        streakDays: 19,
        workoutsThisMonth: 18,
        strengthScore: 89,
        dailyStepTarget: 12000,
        todaySteps: 12800,
        hydrationQuotaMl: 3200,
        todayHydrationMl: 3200,
        prs: {
          squat: '245 lbs',
          deadlift: '315 lbs',
          bench: '165 lbs',
          overheadPress: '110 lbs'
        }
      },
      tags: ['Vanguard 10k Club', 'Streak Master']
    }
  ],

  // 2. Memberships
  memberships: [
    {
      id: 'PLAN-001',
      name: 'Monthly Plan',
      price: 9.99,
      billingFrequency: 'Monthly',
      description: 'First Workout Free. Flexible monthly access to elevate your fitness journey.',
      features: [
        'Full Mobile App Access',
        'Daily Workout Protocols',
        'Step Tracking & Apple Watch Sync',
        'Guided Coaching by Ron Brezzell',
        'Access to Exercise Library'
      ],
      facilityAccess: 'Standard Mobile Only',
      coachingBenefits: 'Community Q&A & Coach Tips',
      nutritionBenefits: 'Standard Fuel Guides',
      subscribersCount: 248,
      status: 'Active',
      badgeText: '7-DAY FREE TRIAL'
    },
    {
      id: 'PLAN-002',
      name: 'Annual Pass',
      price: 99.00,
      billingFrequency: 'Annual',
      description: 'Commit to the full transformation with maximum savings and complete features.',
      features: [
        'Full Access to Ron\'s Custom Workouts',
        'Daily Habit & Step Tracking',
        'Apple Watch & Biometric Device Sync',
        'Spartan 28 Community Access',
        'Sole Trainer: Ron Brezzell Direct Feed',
        '17% Savings on Annual Commitment'
      ],
      facilityAccess: 'All Digital + Open Gym Saturdays',
      coachingBenefits: 'Priority Coach Ron Chat Access',
      nutritionBenefits: 'Full Performance Fuel Plans',
      subscribersCount: 512,
      status: 'Active',
      badgeText: 'BEST VALUE SAVE 17%'
    },
    {
      id: 'PLAN-003',
      name: 'Elite Protocol 10-Pack',
      price: 199.00,
      billingFrequency: 'One-Time Credit Pack',
      description: 'All access 10-class pack across Hyrox, Strength, and High-Intensity Labs. Valid for 90 days.',
      features: [
        '10 Class Credits Allocation',
        'Usable across South Campus Turf & Downtown Studio',
        'Includes Hybrid Iron & Metcon Sessions',
        'Spartan Flex 12h Free Cancellation Guarantee',
        'Tactical Digital Pass & Turnstile Rapid Check-In'
      ],
      facilityAccess: 'South Campus Turf + Downtown Studio',
      coachingBenefits: '1-on-1 Form Check Feedback',
      nutritionBenefits: 'Target Macro Customizer',
      subscribersCount: 129,
      status: 'Active',
      badgeText: 'ELITE ACCESS'
    },
    {
      id: 'PLAN-004',
      name: 'Group Training Tiered',
      price: 149.00,
      billingFrequency: 'Monthly',
      description: 'Unlimited in-person group training classes and weekly progress reviews.',
      features: [
        'Unlimited Group Classes (Bootcamp, HIIT, Strength)',
        'Weekly Progress & Biometric Reviews',
        'Premium Mobile & Web App Access',
        'Reserved Spot Priority for Peak Hours',
        'Spartan Community Squad Roster'
      ],
      facilityAccess: 'Full Facility Access (All Locations)',
      coachingBenefits: 'Weekly 1-on-1 Coach Review',
      nutritionBenefits: 'Full Nutrition & Meal Logging Suite',
      subscribersCount: 84,
      status: 'Active',
      badgeText: 'MOST POPULAR'
    },
    {
      id: 'PLAN-005',
      name: '1-on-1 Personal Training Tiered',
      price: 45.00,
      billingFrequency: 'Per Session ($35 for 5-pk / $30 for 10-pk)',
      description: 'Private 1-on-1 protocol with Coach Ron Brezzell at Ron\'s Private Facility.',
      features: [
        'Custom Tailored Movement Protocol',
        'Biometric Telemetry & PR Tracking',
        'Direct Access to Ron\'s Private Facility',
        'Form Video Analysis',
        'Custom Fuel & Macro Calibration'
      ],
      facilityAccess: 'Ron\'s Private Facility',
      coachingBenefits: 'Dedicated Head Coach 1-on-1',
      nutritionBenefits: 'Customized Macro & Meal Plan',
      subscribersCount: 36,
      status: 'Active',
      badgeText: 'VIP PROTOCOL'
    }
  ],

  // 3. Coaches
  coaches: [
    {
      id: 'COACH-001',
      name: 'Ron Brezzell',
      role: 'Head Coach & Founder',
      email: 'ron@spartan28.com',
      phone: '+1 (555) 111-2828',
      avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&auto=format&fit=crop&q=80',
      bio: 'Former elite conditioning specialist and founder of the Spartan 28 Protocol. Over 15 years forging athletes with discipline, form integrity, and unyielding mindset.',
      specializations: ['Strength & Power', 'Spartan Core Burn', 'Elite Bodybuilding', 'Mindset'],
      assignedAthletesCount: 142,
      activeClasses: 8,
      status: 'Active',
      location: 'Ron\'s Private Facility / South Campus',
      quote: 'Discipline is freedom. Form over speed.'
    },
    {
      id: 'COACH-002',
      name: 'Marcus Vance',
      role: 'Strength & Hyrox Coach',
      email: 'marcus@spartan28.com',
      phone: '+1 (555) 222-3939',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
      bio: 'Hyrox Pro athlete and strength conditioning coach specializing in high-intensity hybrid endurance and compound lifts.',
      specializations: ['Hybrid Iron & Metcon', 'Endurance Rucking', 'Barbell Strength', 'Zone 4/5 Conditioning'],
      assignedAthletesCount: 88,
      activeClasses: 6,
      status: 'Active',
      location: 'Downtown Studio / South Campus Turf',
      quote: 'Work when no one is watching.'
    },
    {
      id: 'COACH-003',
      name: 'Elena Rostova',
      role: 'Mobility & Recovery Specialist',
      email: 'elena@spartan28.com',
      phone: '+1 (555) 333-4040',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      bio: 'Doctor of Physical Therapy and Spartan mobility lead, optimizing joint longevity, flexibility, and post-heavy-load recovery.',
      specializations: ['Functional Mobility', 'Joint Recovery', 'Post-Op Conditioning', 'Breathwork'],
      assignedAthletesCount: 65,
      activeClasses: 5,
      status: 'Active',
      location: 'Downtown Studio',
      quote: 'Longevity is the ultimate strength.'
    },
    {
      id: 'COACH-004',
      name: 'Jordan Cole',
      role: 'Combat & Conditioning Coach',
      email: 'jordan@spartan28.com',
      phone: '+1 (555) 444-5151',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
      bio: 'Combat athlete specializing in explosive boxing conditioning, kettlebell dynamics, and tactical cardiovascular capacity.',
      specializations: ['Combat Conditioning', 'Kettlebells', 'Agility & Speed', 'Core Fortification'],
      assignedAthletesCount: 54,
      activeClasses: 4,
      status: 'Active',
      location: 'South Campus Turf',
      quote: 'Pace yourself for victory.'
    }
  ],

  // 4. Exercises
  exercises: [
    {
      id: 'EX-001',
      name: 'Dumbbell Row',
      category: 'Upper Body',
      targetMuscle: 'Lats & Rhomboids',
      defaultSets: 3,
      defaultReps: 12,
      restDurationSeconds: 45,
      weightGuidance: 'Moderate to Heavy (60-75 lbs)',
      difficulty: 'Intermediate',
      instructions: 'Keep your torso at 45 degrees, support on bench if needed. Pull elbow back toward hip pocket, pause for 1 second peak contraction, then lower under control for 3 seconds.',
      mediaUrl: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=80',
      status: 'Active'
    },
    {
      id: 'EX-002',
      name: 'Barbell Back Squat',
      category: 'Lower Body',
      targetMuscle: 'Quadriceps & Glutes',
      defaultSets: 4,
      defaultReps: 8,
      restDurationSeconds: 90,
      weightGuidance: 'Heavy (75-85% 1RM)',
      difficulty: 'Advanced',
      instructions: 'Set bar on upper traps. Drive knees outward, descend until hips break parallel with knees. Drive through mid-foot with tight abdominal pressure.',
      mediaUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&auto=format&fit=crop&q=80',
      status: 'Active'
    },
    {
      id: 'EX-003',
      name: 'Conventional Deadlift',
      category: 'Full Body',
      targetMuscle: 'Hamstrings, Glutes & Erector Spinae',
      defaultSets: 4,
      defaultReps: 5,
      restDurationSeconds: 120,
      weightGuidance: 'Heavy (80-90% 1RM)',
      difficulty: 'Advanced',
      instructions: 'Bar over mid-foot. Hinge at hips, grip bar outside shins. Pull slack out of the bar, brace lats, drive ground away with legs.',
      mediaUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80',
      status: 'Active'
    },
    {
      id: 'EX-004',
      name: 'Dumbbell Bench Press',
      category: 'Upper Body',
      targetMuscle: 'Pectorals & Triceps',
      defaultSets: 3,
      defaultReps: 10,
      restDurationSeconds: 60,
      weightGuidance: 'Moderate to Heavy',
      difficulty: 'Intermediate',
      instructions: 'Retract shoulder blades. Lower dumbbells at 45-degree elbow angle until deep chest stretch, then press to full lockout with controlled tempo.',
      mediaUrl: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&auto=format&fit=crop&q=80',
      status: 'Active'
    },
    {
      id: 'EX-005',
      name: 'Kettlebell Swings',
      category: 'Full Body',
      targetMuscle: 'Posterior Chain & Core',
      defaultSets: 4,
      defaultReps: 20,
      restDurationSeconds: 45,
      weightGuidance: '24kg - 32kg Kettlebell',
      difficulty: 'Intermediate',
      instructions: 'Explosive hip hinge. Do not squat the bell. Snap hips at apex, squeeze glutes and brace core at chest height.',
      mediaUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&auto=format&fit=crop&q=80',
      status: 'Active'
    },
    {
      id: 'EX-006',
      name: 'Sled Push (Heavy)',
      category: 'Conditioning',
      targetMuscle: 'Legs, Shoulders & Calves',
      defaultSets: 5,
      defaultReps: 1,
      restDurationSeconds: 60,
      weightGuidance: 'Bodyweight equivalent on turf',
      difficulty: 'Intermediate',
      instructions: 'Keep arms locked or high poles gripped. Lean 45 degrees, drive through balls of feet with relentless cadence for 25 meters.',
      mediaUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=80',
      status: 'Active'
    },
    {
      id: 'EX-007',
      name: 'Hanging Leg Raise',
      category: 'Core',
      targetMuscle: 'Rectus Abdominis & Hip Flexors',
      defaultSets: 3,
      defaultReps: 15,
      restDurationSeconds: 45,
      weightGuidance: 'Bodyweight / Ankle weights',
      difficulty: 'Intermediate',
      instructions: 'Dead hang from pull-up bar. Without swinging, curl pelvis upward bringing toes to bar height. Slow negative.',
      mediaUrl: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=500&auto=format&fit=crop&q=80',
      status: 'Active'
    }
  ],

  // 5. Workouts
  workouts: [
    {
      id: 'WO-001',
      name: 'Spartan Core Burn',
      description: 'A relentless circuit designed to forge an unbreakable core and elevate metabolic rate.',
      category: 'Full Body',
      difficulty: 'Intermediate',
      durationMinutes: 45,
      trainingObjective: 'Metabolic Conditioning & Core Fortification',
      exerciseIds: ['EX-007', 'EX-005', 'EX-001'],
      exercisesSequence: [
        { exerciseId: 'EX-007', name: 'Hanging Leg Raise', sets: 4, reps: 15, restSeconds: 30, weight: 'Bodyweight' },
        { exerciseId: 'EX-005', name: 'Kettlebell Swings', sets: 4, reps: 20, restSeconds: 45, weight: '28 kg' },
        { exerciseId: 'EX-001', name: 'Dumbbell Row', sets: 3, reps: 12, restSeconds: 45, weight: '65 lbs' }
      ],
      authorCoach: 'Ron Brezzell',
      isPublished: true,
      completionsCount: 384,
      status: 'Published'
    },
    {
      id: 'WO-002',
      name: 'Iron Back Protocol',
      description: 'High-volume pull dynamics focused on lat development, grip endurance, and upper posture integrity.',
      category: 'Upper Body',
      difficulty: 'Advanced',
      durationMinutes: 30,
      trainingObjective: 'Hypertrophy & Grip Strength',
      exerciseIds: ['EX-001', 'EX-003', 'EX-007'],
      exercisesSequence: [
        { exerciseId: 'EX-003', name: 'Conventional Deadlift', sets: 4, reps: 5, restSeconds: 120, weight: '315 lbs' },
        { exerciseId: 'EX-001', name: 'Dumbbell Row', sets: 4, reps: 10, restSeconds: 60, weight: '75 lbs' },
        { exerciseId: 'EX-007', name: 'Hanging Leg Raise', sets: 3, reps: 12, restSeconds: 45, weight: 'Bodyweight' }
      ],
      authorCoach: 'Ron Brezzell',
      isPublished: true,
      completionsCount: 512,
      status: 'Published'
    },
    {
      id: 'WO-003',
      name: 'Foundation Legs',
      description: 'Master the basic hinge and squat movements to build lasting structural integrity and lower limb power.',
      category: 'Lower Body',
      difficulty: 'Beginner',
      durationMinutes: 60,
      trainingObjective: 'Structural Hypertrophy',
      exerciseIds: ['EX-002', 'EX-003', 'EX-005'],
      exercisesSequence: [
        { exerciseId: 'EX-002', name: 'Barbell Back Squat', sets: 4, reps: 8, restSeconds: 90, weight: '185 lbs' },
        { exerciseId: 'EX-003', name: 'Conventional Deadlift', sets: 3, reps: 8, restSeconds: 90, weight: '225 lbs' },
        { exerciseId: 'EX-005', name: 'Kettlebell Swings', sets: 3, reps: 15, restSeconds: 60, weight: '20 kg' }
      ],
      authorCoach: 'Marcus Vance',
      isPublished: true,
      completionsCount: 620,
      status: 'Published'
    },
    {
      id: 'WO-004',
      name: 'Hybrid Iron & Metcon',
      description: 'Zone 4/5 tactical conditioning blending heavy sled pushes with rapid dumbbell work for peak output.',
      category: 'Conditioning',
      difficulty: 'Advanced',
      durationMinutes: 60,
      trainingObjective: 'Lactate Threshold & Power Output',
      exerciseIds: ['EX-006', 'EX-004', 'EX-005'],
      exercisesSequence: [
        { exerciseId: 'EX-006', name: 'Sled Push (Heavy)', sets: 5, reps: 1, restSeconds: 60, weight: '180 lbs' },
        { exerciseId: 'EX-004', name: 'Dumbbell Bench Press', sets: 4, reps: 10, restSeconds: 60, weight: '70 lbs' },
        { exerciseId: 'EX-005', name: 'Kettlebell Swings', sets: 4, reps: 25, restSeconds: 45, weight: '28 kg' }
      ],
      authorCoach: 'Marcus Vance',
      isPublished: true,
      completionsCount: 290,
      status: 'Published'
    }
  ],

  // 6. Workout Programs
  workoutPrograms: [
    {
      id: 'PROG-001',
      name: 'Spartan Lean & Strong Protocol',
      durationWeeks: 8,
      objective: 'Fat Loss & Muscle Density',
      difficulty: 'Intermediate',
      totalSessions: 32,
      description: 'Our flagship 8-week periodized protocol combining high-intensity metabolic resistance training with heavy compound strength days.',
      linkedWorkoutIds: ['WO-001', 'WO-002', 'WO-003', 'WO-004'],
      enrolledMembersCount: 215,
      status: 'Active'
    },
    {
      id: 'PROG-002',
      name: 'Bulking Protocol (Hypertrophy Lab)',
      durationWeeks: 12,
      objective: 'Maximum Muscle Mass & Strength PRs',
      difficulty: 'Advanced',
      totalSessions: 48,
      description: 'Progressive overload framework focusing on mechanical tension, volume waves, and high-calorie nutritional synergy.',
      linkedWorkoutIds: ['WO-002', 'WO-003', 'WO-004'],
      enrolledMembersCount: 140,
      status: 'Active'
    },
    {
      id: 'PROG-003',
      name: 'Vanguard Mobility & Durability Reset',
      durationWeeks: 4,
      objective: 'Joint Longevity & Posture Recovery',
      difficulty: 'Beginner',
      totalSessions: 16,
      description: 'Engineered by Dr. Elena Rostova to bulletproof knees, lower back, and rotator cuffs between heavy cycles.',
      linkedWorkoutIds: ['WO-001'],
      enrolledMembersCount: 96,
      status: 'Active'
    }
  ],

  // 7. Classes
  classes: [
    {
      id: 'CLS-001',
      name: 'Saturday Bootcamp',
      category: 'Bootcamp & Conditioning',
      date: '2026-09-26', // Tomorrow / Saturday
      dayOfWeek: 'Saturday',
      startTime: '08:00 AM',
      endTime: '09:00 AM',
      durationMinutes: 60,
      location: 'South Campus Turf',
      coachId: 'COACH-001',
      coachName: 'Coach Ron Brezzell',
      intensity: 'High Intensity',
      capacity: 12,
      bookedCount: 12,
      waitlistCount: 3,
      entryRate: '$15.00 Drop-in / Credit Pass',
      description: 'A high-energy, full-body conditioning session designed to push your limits. Combining strength, cardio, kettlebells, and heavy sled pushes in an outdoor turf environment.',
      status: 'Full'
    },
    {
      id: 'CLS-002',
      name: 'Personal Training (In Person)',
      category: '1-on-1 Protocol',
      date: '2026-09-28',
      dayOfWeek: 'Mon-Thu',
      startTime: '07:00 AM',
      endTime: '07:50 AM',
      durationMinutes: 50,
      location: 'Ron\'s Private Facility',
      coachId: 'COACH-001',
      coachName: 'Coach Ron Brezzell',
      intensity: 'Tiered Packs',
      capacity: 1,
      bookedCount: 1,
      waitlistCount: 0,
      entryRate: '$45 Single / $35 (5-Pk) / $30 (10+ Pk)',
      description: 'Private 1-on-1 biometric-tracked session focused on strict biomechanics and personal record breakthroughs.',
      status: 'Booked'
    },
    {
      id: 'CLS-003',
      name: 'Group Training (3+ Athletes)',
      category: 'Group Protocol',
      date: '2026-09-28',
      dayOfWeek: 'Mon-Thu',
      startTime: '05:30 PM',
      endTime: '06:30 PM',
      durationMinutes: 60,
      location: 'Downtown Studio',
      coachId: 'COACH-001',
      coachName: 'Coach Ron Brezzell',
      intensity: 'High Intensity',
      capacity: 10,
      bookedCount: 8,
      waitlistCount: 0,
      entryRate: '$30 / person',
      description: 'Kettlebell protocols, barbell complexes, and team conditioning designed for groups of 3 or more athletes.',
      status: 'Open'
    },
    {
      id: 'CLS-004',
      name: 'Hybrid Iron & Metcon',
      category: 'HIIT & Conditioning',
      date: '2026-09-27',
      dayOfWeek: 'Sunday',
      startTime: '07:00 AM',
      endTime: '08:00 AM',
      durationMinutes: 60,
      location: 'South Campus Turf (Lab 01)',
      coachId: 'COACH-002',
      coachName: 'Coach Marcus Vance',
      intensity: 'Zone 4/5',
      capacity: 15,
      bookedCount: 11,
      waitlistCount: 0,
      entryRate: '1 Class Credit / Drop-in',
      description: 'Hyrox preparation protocol blending lactate threshold running with heavy kettlebell and sled carries.',
      status: 'Open'
    },
    {
      id: 'CLS-005',
      name: 'Combat Conditioning & Boxing',
      category: 'Combat & Boxing',
      date: '2026-09-29',
      dayOfWeek: 'Tuesday',
      startTime: '06:00 PM',
      endTime: '07:00 PM',
      durationMinutes: 60,
      location: 'South Campus Turf',
      coachId: 'COACH-004',
      coachName: 'Coach Jordan Cole',
      intensity: 'High Intensity',
      capacity: 12,
      bookedCount: 9,
      waitlistCount: 0,
      entryRate: '1 Class Credit',
      description: 'Explosive pad work, rotational torque conditioning, and core stability under fatigue.',
      status: 'Open'
    },
    {
      id: 'CLS-006',
      name: 'Spartan Mobility & Joint Recovery',
      category: 'Mobility & Recovery',
      date: '2026-09-30',
      dayOfWeek: 'Wednesday',
      startTime: '06:30 PM',
      endTime: '07:15 PM',
      durationMinutes: 45,
      location: 'Downtown Studio',
      coachId: 'COACH-003',
      coachName: 'Dr. Elena Rostova',
      intensity: 'Low - Recovery',
      capacity: 14,
      bookedCount: 7,
      waitlistCount: 0,
      entryRate: '1 Class Credit / Free for Annual',
      description: 'Controlled articular rotations (CARs), fascia release, and breathing protocols to accelerate CNS recovery.',
      status: 'Open'
    }
  ],

  // 8. Bookings
  bookings: [
    {
      id: 'BK-1001',
      memberId: 'MEM-001',
      memberName: 'Alex Johnson',
      memberEmail: 'alex@spartan28.com',
      classId: 'CLS-001',
      className: 'Saturday Bootcamp',
      coachName: 'Ron Brezzell',
      location: 'South Campus Turf',
      bookingDate: '2026-09-26 08:00 AM',
      status: 'Confirmed',
      paymentStatus: 'Paid ($15.00 Drop-in)',
      createdAt: '2026-09-24 14:30',
      checkInStatus: 'Checked-In'
    },
    {
      id: 'BK-1002',
      memberId: 'MEM-002',
      memberName: 'Sarah Connor',
      memberEmail: 'sarah.c@spartan28.com',
      classId: 'CLS-004',
      className: 'Hybrid Iron & Metcon',
      coachName: 'Marcus Vance',
      location: 'Lab 01',
      bookingDate: '2026-09-27 07:00 AM',
      status: 'Confirmed',
      paymentStatus: 'Credit Used (1/10 Pack)',
      createdAt: '2026-09-25 09:12',
      checkInStatus: 'Pending'
    },
    {
      id: 'BK-1003',
      memberId: 'MEM-003',
      memberName: 'Marcus Reed',
      memberEmail: 'm.reed@spartan28.com',
      classId: 'CLS-003',
      className: 'Group Training (3+ Athletes)',
      coachName: 'Ron Brezzell',
      location: 'Downtown Studio',
      bookingDate: '2026-09-28 05:30 PM',
      status: 'Confirmed',
      paymentStatus: 'Annual Pass Included',
      createdAt: '2026-09-24 16:45',
      checkInStatus: 'Pending'
    },
    {
      id: 'BK-1004',
      memberId: 'MEM-006',
      memberName: 'Chloe Bennett',
      memberEmail: 'chloe.b@spartan28.com',
      classId: 'CLS-001',
      className: 'Saturday Bootcamp',
      coachName: 'Ron Brezzell',
      location: 'South Campus Turf',
      bookingDate: '2026-09-26 08:00 AM',
      status: 'Waitlisted (Position #1)',
      paymentStatus: 'Pre-Authorized',
      createdAt: '2026-09-25 11:20',
      checkInStatus: 'Waitlisted'
    }
  ],

  // 9. Attendance
  attendance: [
    {
      id: 'ATT-2001',
      classId: 'CLS-001',
      className: 'Saturday Bootcamp',
      memberId: 'MEM-001',
      memberName: 'Alex Johnson',
      scanId: 'SP28-9941',
      checkInTime: '2026-09-26 07:52 AM',
      turnstileLocation: 'South Campus Gate 01',
      status: 'Present',
      verifiedBy: 'Turnstile NFC Rapid Scan'
    },
    {
      id: 'ATT-2002',
      classId: 'CLS-001',
      className: 'Saturday Bootcamp',
      memberId: 'MEM-004',
      memberName: 'Elena Ramos',
      scanId: 'SP28-7712',
      checkInTime: '2026-09-26 07:58 AM',
      turnstileLocation: 'South Campus Gate 01',
      status: 'Present',
      verifiedBy: 'Coach Ron Brezzell'
    },
    {
      id: 'ATT-2003',
      classId: 'CLS-005',
      className: 'Combat Conditioning',
      memberId: 'MEM-005',
      memberName: 'David Miller',
      scanId: 'SP28-3320',
      checkInTime: '-',
      turnstileLocation: 'South Campus Turf',
      status: 'No-Show',
      verifiedBy: 'System Auto-Audit'
    }
  ],

  // 10. Nutrition Foods & Meals
  nutritionFoods: [
    {
      id: 'FOOD-001',
      name: 'Grilled Chicken Breast',
      servingSize: '1 serving (150g)',
      calories: 250,
      proteinG: 48,
      carbsG: 0,
      fatsG: 4,
      category: 'Proteins',
      status: 'Active'
    },
    {
      id: 'FOOD-002',
      name: 'Brown Rice (Cooked)',
      servingSize: '1 cup (195g)',
      calories: 215,
      proteinG: 5,
      carbsG: 45,
      fatsG: 2,
      category: 'Carbs',
      status: 'Active'
    },
    {
      id: 'FOOD-003',
      name: 'Steamed Broccoli',
      servingSize: '1 cup (91g)',
      calories: 35,
      proteinG: 3,
      carbsG: 6,
      fatsG: 0.5,
      category: 'Greens & Veggies',
      status: 'Active'
    },
    {
      id: 'FOOD-004',
      name: 'Avocado',
      servingSize: '0.5 medium (100g)',
      calories: 160,
      proteinG: 2,
      carbsG: 9,
      fatsG: 15,
      category: 'Healthy Fats',
      status: 'Active'
    },
    {
      id: 'FOOD-005',
      name: 'Extra Virgin Olive Oil',
      servingSize: '1 tbsp (14g)',
      calories: 119,
      proteinG: 0,
      carbsG: 0,
      fatsG: 14,
      category: 'Healthy Fats',
      status: 'Active'
    },
    {
      id: 'FOOD-006',
      name: 'Oatmeal & Whey Protein Shake',
      servingSize: '1 large bowl / shaker',
      calories: 450,
      proteinG: 42,
      carbsG: 52,
      fatsG: 7,
      category: 'Pre/Post Workout Meals',
      status: 'Active'
    }
  ],

  // 11. Nutrition Fuel Plans
  nutritionPlans: [
    {
      id: 'NUTR-001',
      name: 'Spartan Lean & Strong',
      category: 'Fat Loss',
      targetCaloriesMin: 1800,
      targetCaloriesMax: 2200,
      macroSplit: { proteinPercent: 40, carbsPercent: 30, fatPercent: 30 },
      description: 'High protein, moderate carb approach engineered to strip body fat while preserving lean muscular density.',
      recommendedMealIds: ['FOOD-001', 'FOOD-002', 'FOOD-003', 'FOOD-004'],
      author: 'Coach Ron Brezzell',
      status: 'Active'
    },
    {
      id: 'NUTR-002',
      name: 'Bulking Protocol',
      category: 'Muscle Gain',
      targetCaloriesMin: 3200,
      targetCaloriesMax: 4000,
      macroSplit: { proteinPercent: 30, carbsPercent: 50, fatPercent: 20 },
      description: 'High calorie, progressive carb nutritional framework designed for maximum mass generation and high-volume training support.',
      recommendedMealIds: ['FOOD-001', 'FOOD-002', 'FOOD-006'],
      author: 'Coach Ron Brezzell',
      status: 'Active'
    },
    {
      id: 'NUTR-003',
      name: 'Coach\'s Weekly Picks',
      category: 'Balanced',
      targetCaloriesMin: 2300,
      targetCaloriesMax: 2600,
      macroSplit: { proteinPercent: 33, carbsPercent: 33, fatPercent: 34 },
      description: 'A rotating selection of balanced, nutrient-dense whole foods curated for overall performance, sustained energy, and cognitive clarity.',
      recommendedMealIds: ['FOOD-001', 'FOOD-003', 'FOOD-004', 'FOOD-005'],
      author: 'Coach Ron Brezzell',
      status: 'Active'
    }
  ],

  // 12. CMS & App Content
  content: [
    {
      id: 'CNT-001',
      type: 'Coach Tip',
      title: 'Focus On Eccentric Tempo',
      author: 'Ron Brezzell',
      body: 'Focus on your eccentric movements today. Slow down the negative phase to maximize muscle time under tension. Form over speed.',
      placement: 'Mobile Home Hero Tip',
      publishedAt: '2026-09-25',
      status: 'Published'
    },
    {
      id: 'CNT-002',
      type: 'Announcement',
      title: 'Saturday Outdoor Turf Challenge at South Campus',
      author: 'Spartan HQ',
      body: 'Bring your lifting belts and turf shoes for the 8:00 AM bootcamp. Sled pushes and kettlebell complexes loaded for all athletes.',
      placement: 'App Banner',
      publishedAt: '2026-09-24',
      status: 'Published'
    },
    {
      id: 'CNT-003',
      type: 'Protocol Guide',
      title: 'Daily Hydration Telemetry Target: 3.5L',
      author: 'Dr. Elena Rostova',
      body: 'Optimal muscle recovery and cognitive focus require baseline hydration of 3.5L on heavy training days. Hydrate consistently before 6:00 PM.',
      placement: 'Hydration Widget Note',
      publishedAt: '2026-09-20',
      status: 'Published'
    }
  ],

  // 13. Notifications
  notifications: [
    {
      id: 'NOTIF-001',
      title: 'Upper Body Strength Protocol Ready',
      message: 'Coach Ron Brezzell assigned your 48-min Upper Body Strength session.',
      targetGroup: 'Active Members',
      sentTime: 'Today, 06:00 AM',
      status: 'Sent',
      deliveredCount: 418,
      type: 'Workout Alert'
    },
    {
      id: 'NOTIF-002',
      title: 'Class Reminder: Saturday Bootcamp',
      message: 'Your spot is confirmed for tomorrow 8:00 AM at South Campus Turf.',
      targetGroup: 'Booked Athletes (CLS-001)',
      sentTime: 'Today, 02:00 PM',
      status: 'Sent',
      deliveredCount: 12,
      type: 'Class Reminder'
    },
    {
      id: 'NOTIF-003',
      title: 'Monthly Subscription Renewal Notice',
      message: 'Your Group Training plan renews in 3 days. Thank you for your commitment.',
      targetGroup: 'Expiring in 72 Hours',
      sentTime: 'Yesterday, 09:00 AM',
      status: 'Sent',
      deliveredCount: 34,
      type: 'Billing'
    }
  ],

  // 14. Transactions Ledger
  transactions: [
    {
      id: 'TXN-84920',
      referenceId: '#SP-84920',
      memberId: 'MEM-001',
      memberName: 'Alex Johnson',
      memberEmail: 'alex@spartan28.com',
      item: 'Elite Protocol 10-Pack',
      amount: 199.00,
      currency: 'USD',
      paymentMethod: 'Apple Pay',
      cardLast4: '4921',
      date: '2026-09-25 10:14 AM',
      status: 'Paid in Full',
      category: 'Class Credits Pack'
    },
    {
      id: 'TXN-84921',
      referenceId: '#SP-84921',
      memberId: 'MEM-003',
      memberName: 'Marcus Reed',
      memberEmail: 'm.reed@spartan28.com',
      item: 'Annual Pass Subscription',
      amount: 99.00,
      currency: 'USD',
      paymentMethod: 'Visa (Spartan Black)',
      cardLast4: '4242',
      date: '2026-09-24 16:30 PM',
      status: 'Paid in Full',
      category: 'Subscription'
    },
    {
      id: 'TXN-84922',
      referenceId: '#SP-84922',
      memberId: 'MEM-004',
      memberName: 'Elena Ramos',
      memberEmail: 'elena.r@spartan28.com',
      item: 'Saturday Bootcamp Drop-in',
      amount: 15.00,
      currency: 'USD',
      paymentMethod: 'Credit Card',
      cardLast4: '1092',
      date: '2026-09-24 11:20 AM',
      status: 'Paid in Full',
      category: 'Single Drop-in'
    },
    {
      id: 'TXN-84923',
      referenceId: '#SP-84923',
      memberId: 'MEM-006',
      memberName: 'Chloe Bennett',
      memberEmail: 'chloe.b@spartan28.com',
      item: 'Group Training Monthly Renewal',
      amount: 149.00,
      currency: 'USD',
      paymentMethod: 'Apple Pay',
      cardLast4: '8812',
      date: '2026-09-23 08:00 AM',
      status: 'Paid in Full',
      category: 'Subscription'
    }
  ],

  // 15. Audit Logs
  auditLogs: [
    {
      id: 'AUD-901',
      user: 'Super Admin (Ron Brezzell)',
      role: 'Super Admin',
      action: 'Updated Membership Pricing',
      module: 'Memberships',
      recordId: 'PLAN-003',
      details: 'Adjusted Elite Protocol 10-Pack to $199 with 90-day validity window',
      timestamp: '2026-09-25 15:45:10',
      ipAddress: '192.168.1.104'
    },
    {
      id: 'AUD-902',
      user: 'Super Admin (Ron Brezzell)',
      role: 'Super Admin',
      action: 'Created Workout Protocol',
      module: 'Workouts',
      recordId: 'WO-004',
      details: 'Created Hybrid Iron & Metcon 60-min routine for South Campus Turf',
      timestamp: '2026-09-25 12:10:04',
      ipAddress: '192.168.1.104'
    },
    {
      id: 'AUD-903',
      user: 'Admin (Sarah Vance)',
      role: 'Admin',
      action: 'Promoted Waitlist Member',
      module: 'Bookings',
      recordId: 'BK-1004',
      details: 'Assigned spot in Saturday Bootcamp for Chloe Bennett',
      timestamp: '2026-09-25 11:25:33',
      ipAddress: '192.168.1.18'
    },
    {
      id: 'AUD-904',
      user: 'Coach (Marcus Vance)',
      role: 'Coach',
      action: 'Published Performance Fuel Plan',
      module: 'Nutrition',
      recordId: 'NUTR-002',
      details: 'Updated Bulking Protocol with high carb target recommendations',
      timestamp: '2026-09-24 17:02:11',
      ipAddress: '192.168.1.52'
    }
  ],

  // 16. Roles & Permissions Configuration
  roles: [
    {
      id: 'ROLE-001',
      name: 'Super Admin',
      description: 'Complete unrestricted command access across all financial, member, operational, and system settings.',
      usersCount: 2,
      permissions: {
        members_view: true,
        members_edit: true,
        members_delete: true,
        memberships_manage: true,
        fitness_workouts: true,
        fitness_classes: true,
        operations_bookings: true,
        operations_attendance: true,
        finance_transactions: true,
        reports_export: true,
        cms_manage: true,
        roles_permissions: true,
        audit_view: true,
        system_settings: true
      }
    },
    {
      id: 'ROLE-002',
      name: 'Admin',
      description: 'Operations manager with full authority over memberships, schedules, coaches, and daily bookings.',
      usersCount: 4,
      permissions: {
        members_view: true,
        members_edit: true,
        members_delete: false,
        memberships_manage: true,
        fitness_workouts: true,
        fitness_classes: true,
        operations_bookings: true,
        operations_attendance: true,
        finance_transactions: true,
        reports_export: true,
        cms_manage: true,
        roles_permissions: false,
        audit_view: true,
        system_settings: false
      }
    },
    {
      id: 'ROLE-003',
      name: 'Coach',
      description: 'Trainer access to assign workouts, review athlete telemetry, check attendance, and update nutrition plans.',
      usersCount: 8,
      permissions: {
        members_view: true,
        members_edit: false,
        members_delete: false,
        memberships_manage: false,
        fitness_workouts: true,
        fitness_classes: true,
        operations_bookings: true,
        operations_attendance: true,
        finance_transactions: false,
        reports_export: false,
        cms_manage: true,
        roles_permissions: false,
        audit_view: false,
        system_settings: false
      }
    },
    {
      id: 'ROLE-004',
      name: 'Content Manager',
      description: 'Editor for app tips, announcements, workout library descriptions, and promotional banners.',
      usersCount: 3,
      permissions: {
        members_view: false,
        members_edit: false,
        members_delete: false,
        memberships_manage: false,
        fitness_workouts: true,
        fitness_classes: false,
        operations_bookings: false,
        operations_attendance: false,
        finance_transactions: false,
        reports_export: false,
        cms_manage: true,
        roles_permissions: false,
        audit_view: false,
        system_settings: false
      }
    }
  ],

  // 17. Facility & System Settings
  settings: {
    facilityName: 'Spartan 28 Command HQ',
    primaryLocation: 'South Campus Turf // Ron\'s Facility // Downtown Studio',
    locations: [
      { id: 'LOC-1', name: 'South Campus Turf', address: '840 Spartan Way, South Campus', capacity: 30 },
      { id: 'LOC-2', name: 'Ron\'s Private Facility', address: '102 Elite Performance Blvd', capacity: 6 },
      { id: 'LOC-3', name: 'Downtown Studio', address: '450 Metro Core Ave, Ste 200', capacity: 20 }
    ],
    spartanFlexPolicy: {
      cancellationWindowHours: 12,
      guaranteeNotice: 'Spartan Flex Guarantee: Cancel any booked session up to 12 hours prior for full credit restoration.',
      allowWaitlistAutoPromote: true
    },
    turnstileCheckInWindowMinutes: 30,
    dailyStepVanguardThreshold: 10000,
    defaultHydrationTargetMl: 3500
  }
};
