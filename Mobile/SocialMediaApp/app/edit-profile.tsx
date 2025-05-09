import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Camera } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { colors } from '@/constants/colors';
import { useAuthStore } from '@/store/authStore';

export default function EditProfileScreen() {
  const { user } = useAuthStore();
  const router = useRouter();
  
  const [name, setName] = useState(user?.name || '');
  const [surname, setSurname] = useState(user?.surname || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0].uri);
    }
  };
  
  const handleSave = () => {
    if (!name.trim() || !surname.trim()) {
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      router.back();
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Edit Profile</Text>
        </View>
        
        <View style={styles.profileImageSection}>
          <Image
            source={{ uri: profilePicture }}
            style={styles.profileImage}
            contentFit="cover"
          />
          <TouchableOpacity style={styles.changePhotoButton} onPress={pickImage}>
            <Camera size={20} color={colors.primary} />
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.form}>
          <Input
            label="Name"
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
          
          <Input
            label="Surname"
            placeholder="Enter your surname"
            value={surname}
            onChangeText={setSurname}
            autoCapitalize="words"
          />
          
          <Input
            label="Bio"
            placeholder="Tell us about yourself"
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={4}
          />
          
          <Button
            title="Save Changes"
            onPress={handleSave}
            loading={isSubmitting}
            disabled={!name.trim() || !surname.trim()}
            fullWidth
            style={styles.saveButton}
          />
          
          <Button
            title="Cancel"
            variant="outline"
            onPress={() => router.back()}
            fullWidth
            style={styles.cancelButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  profileImageSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changePhotoText: {
    marginLeft: 8,
    color: colors.primary,
    fontWeight: '500',
  },
  form: {
    marginBottom: 24,
  },
  saveButton: {
    marginTop: 16,
    marginBottom: 12,
  },
  cancelButton: {
    marginBottom: 24,
  },
});