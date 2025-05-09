import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";
import { Post } from "@/types";
import { findUserById } from "@/mocks/users";
import { colors } from "@/constants/colors";
import { formatTimeAgo } from "@/utils/dateUtils";

interface PostItemProps {
  post: Post;
  onLike: (postId: string) => void;
  currentUserId: string;
}

export const PostItem = ({ post, onLike, currentUserId }: PostItemProps) => {
  const user = findUserById(post.userId);
  const isLiked = post.likes.includes(currentUserId);

  if (!user) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Link href={`/profile/${user.id}`} asChild>
          <Pressable style={styles.userInfo}>
            <Image
              source={{ uri: user.profilePicture }}
              style={styles.avatar}
              contentFit="cover"
            />
            <View>
              <Text style={styles.userName}>
                {user.name} {user.surname}
              </Text>
              <Text style={styles.timeAgo}>
                {formatTimeAgo(post.createdAt)}
              </Text>
            </View>
          </Pressable>
        </Link>
        <TouchableOpacity>
          <Feather name="more-horizontal" size={20} color={colors.textLight} />
        </TouchableOpacity>
      </View>

      <Link href={`/post/${post.id}`} asChild>
        <Pressable>
          <Text style={styles.postText}>{post.text}</Text>

          {post.images.length > 0 && (
            <View style={styles.imageContainer}>
              {post.images.length === 1 ? (
                <Image
                  source={{ uri: post.images[0] }}
                  style={styles.singleImage}
                  contentFit="cover"
                />
              ) : (
                <View style={styles.multipleImagesContainer}>
                  {post.images.map((image, index) => (
                    <Image
                      key={index}
                      source={{ uri: image }}
                      style={[
                        styles.multipleImage,
                        index === 0 &&
                          post.images.length === 2 && {
                            width: "49%",
                            height: 300,
                          },
                        index === 1 &&
                          post.images.length === 2 && {
                            width: "49%",
                            height: 300,
                          },
                      ]}
                      contentFit="cover"
                    />
                  ))}
                </View>
              )}
            </View>
          )}
        </Pressable>
      </Link>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onLike(post.id)}
        >
          <AntDesign
            name="heart"
            size={20}
            color={isLiked ? colors.notification : colors.textLight}
          />
          <Text style={styles.actionText}>{post.likes.length}</Text>
        </TouchableOpacity>

        <Link href={`/post/${post.id}`} asChild>
          <TouchableOpacity style={styles.actionButton}>
            <AntDesign name="message1" size={20} color={colors.textLight} />
            <Text style={styles.actionText}>{post.comments.length}</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontWeight: "600",
    fontSize: 15,
    color: colors.text,
  },
  timeAgo: {
    fontSize: 13,
    color: colors.textLight,
    marginTop: 2,
  },
  postText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
    marginBottom: 12,
  },
  imageContainer: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  singleImage: {
    width: "100%",
    height: 300,
    borderRadius: 12,
  },
  multipleImagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  multipleImage: {
    width: "49%",
    height: 150,
    borderRadius: 12,
  },
  actions: {
    flexDirection: "row",
    marginTop: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  actionText: {
    marginLeft: 6,
    fontSize: 14,
    color: colors.textLight,
  },
});
