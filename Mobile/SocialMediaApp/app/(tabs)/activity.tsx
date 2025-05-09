import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Link } from 'expo-router';
import { colors } from '@/constants/colors';

const activities = [
  {
    id: '1',
    type: 'like',
    userId: '2',
    userName: 'Jane Smith',
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    postId: '1',
    postPreview: 'Just finished building my first React Native app!',
    timestamp: '2023-06-15T10:30:00Z',
  },
  {
    id: '2',
    type: 'comment',
    userId: '3',
    userName: 'Alex Johnson',
    userImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde',
    postId: '1',
    postPreview: 'Just finished building my first React Native app!',
    commentText: 'That sounds awesome! Would love to see it.',
    timestamp: '2023-06-15T11:15:00Z',
  },
  {
    id: '3',
    type: 'follow',
    userId: '4',
    userName: 'Sarah Williams',
    userImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    timestamp: '2023-06-14T09:45:00Z',
  },
  {
    id: '4',
    type: 'like',
    userId: '5',
    userName: 'Michael Brown',
    userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    postId: '6',
    postPreview: 'Learning TypeScript has been a game-changer for my development workflow.',
    timestamp: '2023-06-13T14:20:00Z',
  },
  {
    id: '5',
    type: 'comment',
    userId: '2',
    userName: 'Jane Smith',
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    postId: '11',
    postPreview: 'Attended a React conference this weekend.',
    commentText: 'Which conference was it? Any standout talks?',
    timestamp: '2023-06-12T16:30:00Z',
  },
];

export default function ActivityScreen() {
  const renderActivityItem = ({ item }: { item: typeof activities[0] }) => {
    const getActivityIcon = () => {
      switch (item.type) {
        case 'like':
          return <AntDesign name="heart" size={16} color={colors.notification} />;
        case 'comment':
          return <AntDesign name="message1" size={16} color={colors.primary} />;
        case 'follow':
          return <AntDesign name="adduser" size={16} color={colors.secondary} />;
        default:
          return null;
      }
    };
    
    const getActivityText = () => {
      switch (item.type) {
        case 'like':
          return (
            <Text style={styles.activityText}>
              <Text style={styles.userName}>{item.userName}</Text> liked your post
            </Text>
          );
        case 'comment':
          return (
            <Text style={styles.activityText}>
              <Text style={styles.userName}>{item.userName}</Text> commented on your post
            </Text>
          );
        case 'follow':
          return (
            <Text style={styles.activityText}>
              <Text style={styles.userName}>{item.userName}</Text> started following you
            </Text>
          );
        default:
          return null;
      }
    };
    
    return (
      <View style={styles.activityItem}>
        <View style={styles.activityIconContainer}>
          {getActivityIcon()}
        </View>
        
        <Link href={`/profile/${item.userId}`} asChild>
          <TouchableOpacity style={styles.userImageContainer}>
            <Image
              source={{ uri: item.userImage }}
              style={styles.userImage}
              contentFit="cover"
            />
          </TouchableOpacity>
        </Link>
        
        <View style={styles.activityContent}>
          {getActivityText()}
          
          {item.type !== 'follow' && (
            <Link href={`/post/${item.postId}`} asChild>
              <TouchableOpacity>
                <Text style={styles.postPreview} numberOfLines={1}>
                  {item.postPreview}
                </Text>
              </TouchableOpacity>
            </Link>
          )}
          
          {item.type === 'comment' && (
            <Text style={styles.commentText} numberOfLines={1}>
              {item.commentText}
            </Text>
          )}
          
          <Text style={styles.timestamp}>
            {formatTimeAgo(item.timestamp)}
          </Text>
        </View>
      </View>
    );
  };
  
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    }
    
    return date.toLocaleDateString();
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Activity</Text>
      </View>
      
      <FlatList
        data={activities}
        keyExtractor={(item) => item.id}
        renderItem={renderActivityItem}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  listContent: {
    padding: 16,
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  activityIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  userImageContainer: {
    marginRight: 12,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  userName: {
    fontWeight: '600',
  },
  postPreview: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: colors.text,
    backgroundColor: colors.card,
    padding: 8,
    borderRadius: 8,
    marginBottom: 4,
  },
  timestamp: {
    fontSize: 12,
    color: colors.textLight,
  },
});