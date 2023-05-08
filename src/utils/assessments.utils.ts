import { IAssessmentType } from '../models/assessment.interface';

export function transformAssessmentType(type: IAssessmentType) {
  switch (type) {
    case IAssessmentType.INTRODUCTION:
      return 'Introduction';
    case IAssessmentType.CONCLUSION:
      return 'Conclusion';
    default:
      return 'Assessment';
  }
}
