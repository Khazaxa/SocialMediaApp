import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, useWindowDimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { StatusBar } from 'expo-status-bar';
import { Grid, LogOut, Settings } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/colors';
import { Button } from '@/components/Button';
import { useAuthStore } from '@/store/authStore';
import { findPostsByUserId } from '@/mocks/posts';
import { Post } from '@/types';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const { width } = useWindowDimensions();
  
  const userPosts = user ? findPostsByUserId(user.id) : [];
  const imageSize = (width - 48) / 3;
  
  const handleLogout = () => {
    logout();
    router.replace('/login');
  };
  
  if (!user) {
    return null;
  }

  const renderPostItem = ({ item }: { item: Post }) => {
    return (
      <TouchableOpacity 
        style={[styles.postThumbnail, { width: imageSize, height: imageSize }]}
        onPress={() => router.push(`/post/${item.id}`)}
      >
        {item.images.length > 0 ? (
          <Image
            source={{ uri: item.images[0] }}
            style={styles.thumbnailImage}
            contentFit="cover"
          />
        ) : (
          <View style={styles.textPostThumbnail}>
            <Text style={styles.textPostPreview} numberOfLines={3}>
              {item.text}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => router.push('/settings')}
          >
            <Settings size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleLogout}>
            <LogOut size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.profileInfo}>
        <Image
          source={{ uri: user.profilePicture }}
          style={styles.profileImage}
          contentFit="cover"
        />
        
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.bioSection}>
        <Text style={styles.userName}>{user.name} {user.surname}</Text>
        {user.bio ? (
          <Text style={styles.bio}>{user.bio}</Text>
        ) : (
          <Text style={styles.noBio}>No bio yet</Text>
        )}
        
        <TouchableOpacity 
          style={styles.editButtonWrapper}
          onPress={() => router.push('/edit-profile')}
        >
          <Button
            title="Edit Profile"
            variant="outline"
            onPress={() => router.push('/edit-profile')}
            style={styles.editButton}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.postsSection}>
        <View style={styles.postsHeader}>
          <Text style={styles.postsTitle}>Posts</Text>
          <Grid size={20} color={colors.text} />
        </View>
        
        {Platform.OS === 'web' ? (
          <View style={styles.webPostsGrid}>
            {userPosts.length > 0 ? (
              userPosts.map(post => (
                <TouchableOpacity 
                  key={post.id}
                  style={[styles.postThumbnail, { width: imageSize, height: imageSize }]}
                  onPress={() => router.push(`/post/${post.id}`)}
                >
                  {post.images.length > 0 ? (
                    <Image
                      source={{ uri: post.images[0] }}
                      style={styles.thumbnailImage}
                      contentFit="cover"
                    />
                  ) : (
                    <View style={styles.textPostThumbnail}>
                      <Text style={styles.textPostPreview} numberOfLines={3}>
                        {post.text}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyPosts}>
                <Text style={styles.emptyPostsText}>No posts yet</Text>
              </View>
            )}
          </View>
        ) : (
          <FlatList
            data={userPosts}
            keyExtractor={(item) => item.id}
            numColumns={3}
            renderItem={renderPostItem}
            contentContainerStyle={styles.postsGrid}
            ListEmptyComponent={
              <View style={styles.emptyPosts}>
                <Text style={styles.emptyPostsText}>No posts yet</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textLight,
  },
  bioSection: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 16,
  },
  noBio: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 16,
    fontStyle: 'italic',
  },
  editButtonWrapper: {
    width: '100%',
  },
  editButton: {
    height: 36,
  },
  postsSection: {
    flex: 1,
  },
  postsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  postsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginRight: 8,
  },
  postsGrid: {
    padding: 16,
  },
  webPostsGrid: {
    padding: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  postThumbnail: {
    margin: 4,
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  textPostThumbnail: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.card,
    padding: 8,
    justifyContent: 'center',
  },
  textPostPreview: {
    fontSize: 12,
    color: colors.text,
  },
  emptyPosts: {
    padding: 24,
    alignItems: 'center',
  },
  emptyPostsText: {
    fontSize: 16,
    color: colors.textLight,
  },
});