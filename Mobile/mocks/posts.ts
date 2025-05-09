import { Post } from '@/types';

export const posts: Post[] = [
  {
    id: '1',
    userId: '1',
    text: "Just finished building my first React Native app! It's amazing how quickly you can create cross-platform mobile applications.",
    images: [],
    likes: ['2', '3', '4'],
    comments: [
      {
        id: '1',
        postId: '1',
        userId: '2',
        text: 'Congratulations! What kind of app did you build?',
        createdAt: '2023-06-15T10:32:00Z'
      },
      {
        id: '2',
        postId: '1',
        userId: '3',
        text: 'That sounds awesome! Would love to see it.',
        createdAt: '2023-06-15T11:15:00Z'
      }
    ],
    createdAt: '2023-06-15T09:30:00Z'
  },
  {
    id: '2',
    userId: '2',
    text: 'Exploring the beautiful beaches of Bali! The sunset here is absolutely breathtaking.',
    images: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2'
    ],
    likes: ['1', '3', '5'],
    comments: [
      {
        id: '3',
        postId: '2',
        userId: '1',
        text: 'Wow! The views are stunning. Enjoy your trip!',
        createdAt: '2023-06-14T16:45:00Z'
      }
    ],
    createdAt: '2023-06-14T15:20:00Z'
  },
  {
    id: '3',
    userId: '3',
    text: 'Just redesigned my portfolio website. Minimalist design with a focus on user experience.',
    images: [
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d'
    ],
    likes: ['1', '2', '4'],
    comments: [],
    createdAt: '2023-06-13T11:10:00Z'
  },
  {
    id: '4',
    userId: '4',
    text: 'Made this delicious homemade pasta today! The secret is in the fresh ingredients.',
    images: [
      'https://images.unsplash.com/photo-1551183053-bf91a1d81141',
      'https://images.unsplash.com/photo-1556761223-4c4282c73f77'
    ],
    likes: ['2', '3', '5'],
    comments: [
      {
        id: '4',
        postId: '4',
        userId: '5',
        text: 'Looks delicious! Would you mind sharing the recipe?',
        createdAt: '2023-06-12T19:30:00Z'
      },
      {
        id: '5',
        postId: '4',
        userId: '2',
        text: 'I need to try this! 😋',
        createdAt: '2023-06-12T20:15:00Z'
      }
    ],
    createdAt: '2023-06-12T18:45:00Z'
  },
  {
    id: '5',
    userId: '5',
    text: 'Just launched my new startup! After months of hard work, it feels great to finally share it with the world.',
    images: [],
    likes: ['1', '2', '3', '4'],
    comments: [
      {
        id: '6',
        postId: '5',
        userId: '1',
        text: 'Congratulations! What does your startup do?',
        createdAt: '2023-06-11T14:20:00Z'
      }
    ],
    createdAt: '2023-06-11T13:00:00Z'
  },
  {
    id: '6',
    userId: '1',
    text: 'Learning TypeScript has been a game-changer for my development workflow. Type safety is worth the initial learning curve!',
    images: [],
    likes: ['3', '5'],
    comments: [],
    createdAt: '2023-06-10T10:15:00Z'
  },
  {
    id: '7',
    userId: '2',
    text: 'Hiked to the top of Mount Rainier today. The view from the summit is absolutely worth the climb!',
    images: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b',
      'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5'
    ],
    likes: ['1', '4', '5'],
    comments: [
      {
        id: '7',
        postId: '7',
        userId: '3',
        text: 'Amazing! How long did the hike take?',
        createdAt: '2023-06-09T16:30:00Z'
      }
    ],
    createdAt: '2023-06-09T15:45:00Z'
  },
  {
    id: '8',
    userId: '3',
    text: 'Just finished reading "Atomic Habits" by James Clear. Highly recommend it for anyone looking to build better habits!',
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f'
    ],
    likes: ['1', '2', '5'],
    comments: [
      {
        id: '8',
        postId: '8',
        userId: '5',
        text: "I've been meaning to read that! What was your biggest takeaway?",
        createdAt: '2023-06-08T12:10:00Z'
      }
    ],
    createdAt: '2023-06-08T11:30:00Z'
  },
  {
    id: '9',
    userId: '4',
    text: 'Attended a cooking workshop today. Learned how to make authentic Thai curry from scratch!',
    images: [
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd'
    ],
    likes: ['2', '3'],
    comments: [],
    createdAt: '2023-06-07T19:20:00Z'
  },
  {
    id: '10',
    userId: '5',
    text: 'Just closed our Series A funding round! Excited for the next chapter of our startup journey.',
    images: [],
    likes: ['1', '2', '3', '4'],
    comments: [
      {
        id: '9',
        postId: '10',
        userId: '1',
        text: 'Congratulations! That is a huge milestone.',
        createdAt: '2023-06-06T15:10:00Z'
      },
      {
        id: '10',
        postId: '10',
        userId: '2',
        text: 'Amazing news! Looking forward to seeing your growth.',
        createdAt: '2023-06-06T15:45:00Z'
      }
    ],
    createdAt: '2023-06-06T14:30:00Z'
  },
  {
    id: '11',
    userId: '1',
    text: 'Attended a React conference this weekend. So many great talks and met amazing developers!',
    images: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87'
    ],
    likes: ['2', '3'],
    comments: [
      {
        id: '11',
        postId: '11',
        userId: '3',
        text: 'Which conference was it? Any standout talks?',
        createdAt: '2023-06-05T10:15:00Z'
      }
    ],
    createdAt: '2023-06-05T09:30:00Z'
  },
  {
    id: '12',
    userId: '2',
    text: 'Morning coffee with a view. Starting the day right!',
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085'
    ],
    likes: ['4', '5'],
    comments: [],
    createdAt: '2023-06-04T08:15:00Z'
  },
  {
    id: '13',
    userId: '3',
    text: 'Just completed a 30-day UI challenge! Designed something new every day for a month.',
    images: [
      'https://images.unsplash.com/photo-1545235617-9465d2a55698',
      'https://images.unsplash.com/photo-1559028012-481c04fa702d'
    ],
    likes: ['1', '2', '4'],
    comments: [
      {
        id: '12',
        postId: '13',
        userId: '1',
        text: 'These look amazing! Great work.',
        createdAt: '2023-06-03T14:45:00Z'
      }
    ],
    createdAt: '2023-06-03T13:20:00Z'
  },
  {
    id: '14',
    userId: '4',
    text: 'Farmers market haul! Fresh produce for the week ahead.',
    images: [
      'https://images.unsplash.com/photo-1488459716781-31db52582fe9'
    ],
    likes: ['2', '5'],
    comments: [],
    createdAt: '2023-06-02T11:10:00Z'
  },
  {
    id: '15',
    userId: '5',
    text: 'Gave a talk on entrepreneurship at my alma mater today. Always inspiring to connect with the next generation of founders!',
    images: [],
    likes: ['1', '3', '4'],
    comments: [
      {
        id: '13',
        postId: '15',
        userId: '3',
        text: 'What was the main advice you shared with them?',
        createdAt: '2023-06-01T17:30:00Z'
      }
    ],
    createdAt: '2023-06-01T16:45:00Z'
  },
  {
    id: '16',
    userId: '1',
    text: 'Just deployed my first serverless application. The future is definitely cloud-native!',
    images: [],
    likes: ['3', '5'],
    comments: [],
    createdAt: '2023-05-31T13:20:00Z'
  },
  {
    id: '17',
    userId: '2',
    text: 'Sunset sailing in the Mediterranean. Life is good!',
    images: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401'
    ],
    likes: ['1', '3', '4', '5'],
    comments: [
      {
        id: '14',
        postId: '17',
        userId: '4',
        text: 'This looks absolutely magical!',
        createdAt: '2023-05-30T19:15:00Z'
      }
    ],
    createdAt: '2023-05-30T18:30:00Z'
  },
  {
    id: '18',
    userId: '3',
    text: 'Redesigned our company website. Clean, modern, and focused on user experience.',
    images: [
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d'
    ],
    likes: ['1', '5'],
    comments: [],
    createdAt: '2023-05-29T10:45:00Z'
  },
  {
    id: '19',
    userId: '4',
    text: 'Homemade sourdough bread! Finally perfected my recipe after months of practice.',
    images: [
      'https://images.unsplash.com/photo-1585478259715-1c093a7b70d3'
    ],
    likes: ['2', '3', '5'],
    comments: [
      {
        id: '15',
        postId: '19',
        userId: '2',
        text: 'That looks delicious! Would love to try your recipe.',
        createdAt: '2023-05-28T14:10:00Z'
      }
    ],
    createdAt: '2023-05-28T13:15:00Z'
  },
  {
    id: '20',
    userId: '5',
    text: 'Just hit 10,000 users on our platform! Thank you to everyone who has supported us on this journey.',
    images: [],
    likes: ['1', '2', '3', '4'],
    comments: [
      {
        id: '16',
        postId: '20',
        userId: '1',
        text: 'Congratulations on this milestone!',
        createdAt: '2023-05-27T16:30:00Z'
      },
      {
        id: '17',
        postId: '20',
        userId: '3',
        text: 'Well deserved! Your product is amazing.',
        createdAt: '2023-05-27T17:15:00Z'
      }
    ],
    createdAt: '2023-05-27T15:45:00Z'
  }
];

export const findPostById = (id: string): Post | undefined => {
  return posts.find(post => post.id === id);
};

export const findPostsByUserId = (userId: string): Post[] => {
  return posts.filter(post => post.userId === userId);
};