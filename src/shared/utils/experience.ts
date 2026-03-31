export const EXPERIENCE_JOIN_DATE = '2021-06-23';

const getCompletedMonths = (start: Date, end: Date): number => {
  let totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (end.getDate() < start.getDate()) {
    totalMonths -= 1;
  }

  return Math.max(totalMonths, 0);
};

export const getRoundedExperienceValue = (
  joinDateString: string,
  referenceDate: Date = new Date()
): string => {
  const joinDate = new Date(joinDateString);

  if (Number.isNaN(joinDate.getTime())) {
    return '0';
  }

  const totalMonths = getCompletedMonths(joinDate, referenceDate);
  const years = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  if (remainingMonths === 0) {
    return `${years}`;
  }

  if (remainingMonths >= 6) {
    return `${years + 1}`;
  }

  return `${years}+`;
};

export const getRoundedExperienceLabel = (
  joinDateString: string,
  referenceDate: Date = new Date()
): string => `${getRoundedExperienceValue(joinDateString, referenceDate)} years`;
