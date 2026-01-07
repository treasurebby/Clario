import type { Answer } from '../types/assessment.types';
import type { Course, CourseRecommendation } from '../types/course.types';
import type { Stream } from '../types/user.types';
import { COURSES } from '../utils/constants';

export interface IRecommendationService {
  calculateMatchPercentage(answers: Answer[], course: Course): number;
  getRankedRecommendations(answers: Answer[], stream: Stream): CourseRecommendation[];
}

export class RecommendationService implements IRecommendationService {
  calculateMatchPercentage(answers: Answer[], course: Course): number {
    if (answers.length === 0) return 0;

    let totalScore = 0;
    let maxPossibleScore = 0;

    answers.forEach((answer) => {
      const option = answer.selectedOption;
      maxPossibleScore += 5;

      const traitMatches = option.traits.filter((trait) =>
        course.id.includes(trait) || trait === course.id
      ).length;

      if (traitMatches > 0) {
        totalScore += option.value * (traitMatches + 1);
      } else {
        totalScore += option.value * 0.3;
      }
    });

    const rawPercentage = (totalScore / (maxPossibleScore * 1.5)) * 100;
    return Math.min(Math.round(rawPercentage), 100);
  }

  getRankedRecommendations(answers: Answer[], stream: Stream): CourseRecommendation[] {
    const streamCourses = COURSES[stream] || [];

    const recommendations: CourseRecommendation[] = streamCourses.map((course) => {
      const matchPercentage = this.calculateMatchPercentage(answers, course);
      const reasons = this.generateReasons(answers, course);
      const keyTraits = this.extractKeyTraits(answers, course);

      return {
        course,
        matchPercentage,
        reasons,
        keyTraits,
      };
    });

    return recommendations.sort((a, b) => b.matchPercentage - a.matchPercentage);
  }

  private generateReasons(answers: Answer[], course: Course): string[] {
    const reasons: string[] = [];
    const traitCounts: Record<string, number> = {};

    answers.forEach((answer) => {
      answer.selectedOption.traits.forEach((trait) => {
        if (course.id.includes(trait) || trait === course.id) {
          traitCounts[trait] = (traitCounts[trait] || 0) + 1;
        }
      });
    });

    const sortedTraits = Object.entries(traitCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    const reasonMap: Record<string, string> = {
      'computer-science': 'You show strong interest in technology and programming',
      'medicine': 'You demonstrate compassion and interest in healthcare',
      'engineering': 'Your practical and innovative mindset aligns well',
      'pharmacy': 'Your scientific curiosity and attention to detail shine through',
      'law': 'Your analytical and argumentative skills are evident',
      'mass-communication': 'Your creative and communicative nature stands out',
      'accounting': 'Your numerical aptitude and attention to detail are clear',
      'marketing': 'Your creativity and people skills are prominent',
      'business-administration': 'Your leadership and strategic thinking abilities show',
      'economics': 'Your analytical mind and interest in data are apparent',
    };

    sortedTraits.forEach(([trait]) => {
      if (reasonMap[trait]) {
        reasons.push(reasonMap[trait]);
      }
    });

    if (reasons.length === 0) {
      reasons.push('Your responses show potential alignment with this field');
    }

    return reasons.slice(0, 3);
  }

  private extractKeyTraits(answers: Answer[], course: Course): string[] {
    const traits: string[] = [];
    const seenTraits = new Set<string>();

    answers.forEach((answer) => {
      if (answer.selectedOption.value >= 4) {
        answer.selectedOption.traits.forEach((trait) => {
          if (course.traits.some((ct) => ct.toLowerCase().includes(trait.toLowerCase())) &&
              !seenTraits.has(trait)) {
            traits.push(trait);
            seenTraits.add(trait);
          }
        });
      }
    });

    return traits.slice(0, 4);
  }
}
