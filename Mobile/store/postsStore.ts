import { create } from 'zustand';
import { Post } from '@/types';
import { posts as mockPosts } from '@/mocks/posts';

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
  likePost: (postId: string, userId: string) => void;
  addComment: (postId: string, userId: string, text: string) => void;
}

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: mockPosts,
  isLoading: false,
  error: null,
  
  likePost: (postId, userId) => {
    const { posts } = get();
    
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes(userId);
        
        if (isLiked) {
          // Unlike the post
          return {
            ...post,
            likes: post.likes.filter(id => id !== userId)
          };
        } else {
          // Like the post
          return {
            ...post,
            likes: [...post.likes, userId]
          };
        }
      }
      return post;
    });
    
    set({ posts: updatedPosts });
  },
  
  addComment: (postId, userId, text) => {
    const { posts } = get();
    
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const newComment = {
          id: `comment-${Date.now()}`,
          postId,
          userId,
          text,
          createdAt: new Date().toISOString()
        };
        
        return {
          ...post,
          comments: [...post.comments, newComment]
        };
      }
      return post;
    });
    
    set({ posts: updatedPosts });
  }
}));