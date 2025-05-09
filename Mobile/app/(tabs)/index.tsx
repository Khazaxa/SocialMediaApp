import React, { useState } from 'react';
import { FlatList, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { PostItem } from '@/components/PostItem';
import { colors } from '@/constants/colors';
import { usePostsStore } from '@/store/postsStore';
import { useAuthStore } from '@/store/authStore';

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { posts, likePost } = usePostsStore();
  const { user } = useAuthStore();
  
  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  
  const handleLike = (postId: string) => {
    if (user) {
      likePost(postId, user.id);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar style="dark" />
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PostItem 
            post={item} 
            onLike={handleLike} 
            currentUserId={user?.id || ''}
          />
        )}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});