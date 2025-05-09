import { User } from '@/types';

export const users: User[] = [
  {
    id: '1',
    name: 'John',
    surname: 'Doe',
    email: 'john@example.com',
    password: 'password123',
    profilePicture: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    bio: 'Software developer passionate about React Native',
    followers: 245,
    following: 123,
    posts: 42
  },
  {
    id: '2',
    name: 'Jane',
    surname: 'Smith',
    email: 'jane@example.com',
    password: 'password123',
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    bio: 'Travel enthusiast | Photographer',
    followers: 1024,
    following: 356,
    posts: 87
  },
  {
    id: '3',
    name: 'Alex',
    surname: 'Johnson',
    email: 'alex@example.com',
    password: 'password123',
    profilePicture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    bio: 'UX Designer | Coffee lover',
    followers: 532,
    following: 245,
    posts: 63
  },
  {
    id: '4',
    name: 'Sarah',
    surname: 'Williams',
    email: 'sarah@example.com',
    password: 'password123',
    profilePicture: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    bio: 'Digital marketer | Foodie',
    followers: 789,
    following: 421,
    posts: 54
  },
  {
    id: '5',
    name: 'Michael',
    surname: 'Brown',
    email: 'michael@example.com',
    password: 'password123',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    bio: 'Entrepreneur | Tech enthusiast',
    followers: 1532,
    following: 324,
    posts: 98
  }
];

export const findUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};