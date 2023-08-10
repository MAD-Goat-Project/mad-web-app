import { IAssessment, IAssessmentType } from '../models/assessment.interface';

export function transformAssessmentType(type: IAssessmentType, index: number) {
  switch (type) {
    case IAssessmentType.INTRODUCTION:
      return 'Introduction';
    case IAssessmentType.CONCLUSION:
      return 'Conclusion';
    default:
      return `${index}º Assessment`;
  }
}

/**
 * Check if all assessments, except asssessments of the type conclusion, are completed.
 * @param assessments
 */
export function allAssessmentsCompleted(assessments: IAssessment[]) {
  return assessments
    .filter((assessment) => assessment.type !== IAssessmentType.CONCLUSION)
    .every((assessment) => assessment.status === 2);
}
