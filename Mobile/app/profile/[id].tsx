import { Button } from "@/components/Button";
import { colors } from "@/constants/colors";
import { findPostsByUserId } from "@/mocks/posts";
import { findUserById } from "@/mocks/users";
import { useAuthStore } from "@/store/authStore";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import Feather from '@expo/vector-icons/Feather';
import React from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

import { Post } from "@/types";

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { width } = useWindowDimensions();
  const { user: currentUser } = useAuthStore();
  const router = useRouter();

  const user = findUserById(id);
  const userPosts = user ? findPostsByUserId(user.id) : [];
  const imageSize = (width - 48) / 3;

  const isCurrentUser = currentUser?.id === id;

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not found</Text>
      </View>
    );
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
    <View style={styles.container}>
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
        <Text style={styles.userName}>
          {user.name} {user.surname}
        </Text>
        {user.bio ? (
          <Text style={styles.bio}>{user.bio}</Text>
        ) : (
          <Text style={styles.noBio}>No bio yet</Text>
        )}

        {isCurrentUser ? (
          <TouchableOpacity
            style={styles.actionButtonWrapper}
            onPress={() => router.push("/edit-profile")}
          >
            <Button
              title="Edit Profile"
              variant="outline"
              onPress={() => router.push("/edit-profile")}
              style={styles.actionButton}
            />
          </TouchableOpacity>
        ) : (
          <Button
            title="Follow"
            onPress={() => {}}
            style={styles.actionButton}
          />
        )}
      </View>

      <View style={styles.postsSection}>
        <View style={styles.postsHeader}>
          <Text style={styles.postsTitle}>Posts</Text>
          <Feather name="grid" size={20} color={colors.text} />
        </View>

        {Platform.OS === "web" ? (
          <View style={styles.webPostsGrid}>
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <TouchableOpacity
                  key={post.id}
                  style={[
                    styles.postThumbnail,
                    { width: imageSize, height: imageSize },
                  ]}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  profileInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  stats: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
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
    fontWeight: "bold",
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
    fontStyle: "italic",
  },
  actionButtonWrapper: {
    width: "100%",
  },
  actionButton: {
    height: 36,
  },
  postsSection: {
    flex: 1,
  },
  postsHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  postsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginRight: 8,
  },
  postsGrid: {
    padding: 16,
  },
  webPostsGrid: {
    padding: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  postThumbnail: {
    margin: 4,
    borderRadius: 8,
    overflow: "hidden",
  },
  thumbnailImage: {
    width: "100%",
    height: "100%",
  },
  textPostThumbnail: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.card,
    padding: 8,
    justifyContent: "center",
  },
  textPostPreview: {
    fontSize: 12,
    color: colors.text,
  },
  emptyPosts: {
    padding: 24,
    alignItems: "center",
  },
  emptyPostsText: {
    fontSize: 16,
    color: colors.textLight,
  },
  errorText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: "center",
    marginTop: 24,
  },
});
