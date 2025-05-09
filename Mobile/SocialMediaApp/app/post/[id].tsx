import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { colors } from '@/constants/colors';
import { CommentItem } from '@/components/CommentItem';
import { findPostById } from '@/mocks/posts';
import { findUserById } from '@/mocks/users';
import { useAuthStore } from '@/store/authStore';
import { usePostsStore } from '@/store/postsStore';
import { formatTimeAgo } from '@/utils/dateUtils';

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [commentText, setCommentText] = useState('');
  
  const { user } = useAuthStore();
  const { likePost, addComment } = usePostsStore();
  
  const post = findPostById(id);
  const postUser = post ? findUserById(post.userId) : null;
  
  if (!post || !postUser || !user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Post not found</Text>
      </View>
    );
  }
  
  const isLiked = post.likes.includes(user.id);
  
  const handleLike = () => {
    likePost(post.id, user.id);
  };
  
  const handleAddComment = () => {
    if (!commentText.trim()) return;
    
    addComment(post.id, user.id, commentText);
    setCommentText('');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: postUser.profilePicture }}
              style={styles.avatar}
              contentFit="cover"
            />
            <View>
              <Text style={styles.userName}>{postUser.name} {postUser.surname}</Text>
              <Text style={styles.timeAgo}>{formatTimeAgo(post.createdAt)}</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.postText}>{post.text}</Text>
        
        {post.images.length > 0 && (
          <View style={styles.imagesContainer}>
            {post.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.image}
                contentFit="cover"
              />
            ))}
          </View>
        )}
        
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <AntDesign name="heart"
              size={24} 
              color={isLiked ? colors.notification : colors.textLight} 
            />
            <Text style={styles.actionText}>{post.likes.length} likes</Text>
          </TouchableOpacity>
          
          <View style={styles.actionButton}>
            <AntDesign name="message1" size={24} color={colors.textLight} />
            <Text style={styles.actionText}>{post.comments.length} comments</Text>
          </View>
        </View>
        
        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Comments</Text>
          
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))
          ) : (
            <Text style={styles.noCommentsText}>No comments yet. Be the first to comment!</Text>
          )}
        </View>
      </ScrollView>
      
      <View style={styles.commentInputContainer}>
        <Image
          source={{ uri: user.profilePicture }}
          style={styles.commentAvatar}
          contentFit="cover"
        />
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          value={commentText}
          onChangeText={setCommentText}
          multiline
        />
        <TouchableOpacity 
          style={[
            styles.sendButton, 
            !commentText.trim() && styles.sendButtonDisabled
          ]} 
          onPress={handleAddComment}
          disabled={!commentText.trim()}
        >
          <Feather name="send" size={20} color={commentText.trim() ? colors.primary : colors.textLight} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontWeight: '600',
    fontSize: 16,
    color: colors.text,
  },
  timeAgo: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 2,
  },
  postText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
    padding: 16,
  },
  imagesContainer: {
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  actionText: {
    marginLeft: 8,
    fontSize: 14,
    color: colors.textLight,
  },
  commentsSection: {
    padding: 16,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  noCommentsText: {
    fontSize: 14,
    color: colors.textLight,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 16,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentInput: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
  },
  sendButton: {
    marginLeft: 12,
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  errorText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    marginTop: 24,
  },
});