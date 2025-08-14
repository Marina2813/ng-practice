export interface PostDto {
    postId: string;
    title: string;
    content: string;
    createdDate: string;  
    userId: number;
    username: string;
    category: string;
    likeCount?: number;
    commentCount?: number;
}
