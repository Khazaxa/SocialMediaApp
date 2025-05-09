import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { Comment } from '@/types';
import { findUserById } from '@/mocks/users';
import { colors } from '@/constants/colors';
import { formatTimeAgo } from '@/utils/dateUtils';

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem = ({ comment }: CommentItemProps) => {
  const user = findUserById(comment.userId);
  
  if (!user) return null;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user.profilePicture }}
        style={styles.avatar}
        contentFit="cover"
      />
      <View style={styles.commentContent}>
        <View style={styles.commentBubble}>
          <Text style={styles.userName}>{user.name} {user.surname}</Text>
          <Text style={styles.commentText}>{comment.text}</Text>
        </View>
        <Text style={styles.timeAgo}>{formatTimeAgo(comment.createdAt)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentBubble: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 12,
  },
  userName: {
    fontWeight: '600',
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
    color: colors.text,
  },
  timeAgo: {
    fontSize: 12,
    color: colors.textLight,
    marginTop: 4,
    marginLeft: 8,
  },
});