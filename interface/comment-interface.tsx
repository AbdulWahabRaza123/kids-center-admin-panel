export interface CommentDetails {
  commentId: number;
  userId: number;
  userEmail: string;
  targetUserEmail: string;
  targetUserId: number;
  activityId: number;
  timestamp: string;
  description: string;
}
