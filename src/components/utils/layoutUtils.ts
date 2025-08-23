export const getBadgeColor = (badge: string) => {
  switch (badge) {
    case 'Platinum': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
    case 'Gold': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
    case 'Silver': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    case 'Bronze': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
    default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
  }
};

export const getConfidenceColor = (confidence: number) => {
  if (confidence >= 90) return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20';
  if (confidence >= 80) return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
  if (confidence >= 70) return 'text-amber-600 bg-amber-100 dark:bg-amber-900/20';
  return 'text-red-600 bg-red-100 dark:bg-red-900/20';
};

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': case 'Easy': return 'badge-success';
    case 'Intermediate': case 'Medium': return 'badge-warning';
    case 'Advanced': case 'Hard': return 'badge-error';
    default: return 'badge-neutral';
  }
};

export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Savings': case 'Food & Dining': return 'badge-primary';
    case 'Investment': case 'Transportation': return 'badge-success';
    case 'Budgeting': case 'Shopping': return 'badge-warning';
    case 'Utilities': case 'Entertainment': return 'badge-neutral';
    case 'Income': return 'badge-success';
    case 'Healthcare': case 'Education': return 'badge-primary';
    default: return 'badge-neutral';
  }
};