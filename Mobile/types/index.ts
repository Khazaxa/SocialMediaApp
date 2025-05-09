export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  profilePicture: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
}

export interface Post {
  id: string;
  userId: string;
  text: string;
  images: string[];
  likes: string[];
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  text: string;
  createdAt: string;
}