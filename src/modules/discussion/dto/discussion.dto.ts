export class CreateDiscussionDTO {
  userId: string;
  courseId: number;
  rate: number;
  comment: string;
}

export class FindDiscussionsDTO {
  courseId: number;
  startIndex: number; // Starting index from where to fetch discussions
}