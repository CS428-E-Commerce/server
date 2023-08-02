export class CreateDiscussionDTO {
  userId: string;
  courseId: number;
  rate: number;
  comment: string;
}

export class FindDiscussionsDTO {
  courseId: number;
  offset: number;
  limit: number;
}