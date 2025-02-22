import { useState, useEffect, useCallback } from "react";
import styles from "./UserSettingsPage.module.scss";
import api from "../../../../ApiConfig/ApiConfig";
import { useNavigate, useLocation } from "react-router-dom";
import Notifications from "../../../Notifications/Notifications";
interface User {
  name: string;
  age: number;
  email: string;
  avatarId: number;
}

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  author: Image;
}

interface Image {
  id: number;
  name: string;
  userId: number;
  path: string;
}

export function UserSettingsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const userIdLocal = localStorage.getItem("userId");
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [images, setImages] = useState<Image[]>([]);
  const [userImages, setUserImages] = useState<Image[]>([]);

  const [editUser, setEditUser] = useState<boolean>(false);
  const [editUserName, setEditUserName] = useState<string>("");
  const [editUserAge, setEditUserAge] = useState<number | null>(null);
  const [editUserAvatar, setEditUserAvatar] = useState<number | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | "warning" | null
  >(null);

  const notificationDelay = () => {
    setTimeout(() => {
      setMessage("");
      setMessageType(null);
    }, 3000);
  };

  const fetchUser = useCallback(async () => {
    const response = await api.get(`/userById/${userIdLocal}`);
    setUser(response.data);

    setEditUserName(response.data.name);
    setEditUserAge(response.data.age);
  }, [userIdLocal]);

  const fetchPosts = useCallback(async () => {
    const response = await api.get("/posts");
    setPosts(
      response.data.filter(
        (post: Post) => post.authorId === Number(userIdLocal)
      )
    );
  }, [userIdLocal]);

  const fetchImages = useCallback(async () => {
    const response = await api.get("/images");
    setImages(response.data);
    setUserImages(
      response.data.filter(
        (image: Image) => image.userId === Number(userIdLocal)
      )
    );
  }, [userIdLocal]);

  useEffect(() => {
    fetchUser();
    fetchPosts();
    fetchImages();
  }, [fetchUser, fetchPosts, fetchImages]);

  useEffect(() => {
    if (editUser) {
      if (user) {
        setEditUserName(user.name);
        setEditUserAge(user.age);
        setEditUserAvatar(user.avatarId);
      }
    }
  }, [editUser, user]);

  const handleShowForm = () => {
    navigate("/settings", {
      state: { showAddForm: location.state?.showAddForm !== true },
    });
    setEditUser(!editUser);
  };

  const handleEditUser = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      await api.put("/user", {
        name: editUserName,
        age: editUserAge,
        avatarId: editUserAvatar,
      });
      setEditUserName("");
      setEditUserAge(null);
      setEditUserAvatar(null);

      navigate("/settings", {
        state: { showUserEditForm: false },
      });
      setEditUser(false);
      fetchUser();

      setMessage("User edited successfully!");
      setMessageType("success");
      notificationDelay();
    } catch (error) {
      setMessage("Error edit user: " + error);
      setMessageType("error");
      notificationDelay();
    }
  };

  const getImagePathById = (avatarId: number) => {
    const image = images.find((i) => i.id === avatarId);
    return image ? image.path : "";
  };

  return (
    <div className={styles.settingsPage}>
      <Notifications messageType={messageType} message={message} />

      <div id={styles.formContainer}>
        <form
          onSubmit={handleEditUser}
          className={
            location.state?.showAddForm === true
              ? styles.showForm
              : styles.hideForm
          }
        >
          <button
            className={styles.closeFormBtn}
            type="button"
            onClick={handleShowForm}
          >
            X
          </button>

          <div className={styles.editUserAvatar}>
            {editUserAvatar === null ? (
              <>avatar</>
            ) : (
              <img src={getImagePathById(editUserAvatar)} />
            )}
          </div>

          <select
            value={editUserAvatar === null ? 0 : editUserAvatar}
            onChange={(e) => {
              const imageId =
                Number(e.target.value) === 0 ? null : Number(e.target.value);
              setEditUserAvatar(imageId);
            }}
          >
            <option value={0}>default</option>
            {images.map((image) => (
              <option key={image.id} value={image.id}>
                {image.name}
              </option>
            ))}
          </select>

          <input
            className={styles.editUserNameInput}
            type="text"
            value={editUserName}
            placeholder="Name"
            onChange={(e) => setEditUserName(e.target.value)}
            required
          />
          <input
            className={styles.editUserAgeInput}
            type="text"
            value={editUserAge ? editUserAge : ""}
            placeholder="Age"
            onChange={(e) => setEditUserAge(Number(e.target.value))}
          />
          <button className={styles.submitFormBtn} type="submit">
            Save
          </button>
        </form>
      </div>

      <div className={styles.settingsContainer}>
        <div className={styles.userCard}>
          {user && (
            <div className={styles.userContainer}>
              <div className={styles.userImage}>
                <div className={styles.userAvatar}>
                  {user.avatarId === null ? (
                    <>avatar</>
                  ) : (
                    <img src={getImagePathById(user.avatarId)} />
                  )}
                </div>
              </div>
              <div className={styles.userInfo}>
                <div className={styles.userName}>
                  <strong>{user.name ? user.name : "--"}</strong>
                </div>
                <div className={styles.userEmail}>
                  <strong>{user.email}</strong>
                </div>
                <div className={styles.userAge}>
                  <strong>{user.age ? user.age : "--"}</strong>
                </div>
                <button
                  onClick={() => handleShowForm()}
                  className={styles.userEdit}
                >
                  Edit profile
                </button>
              </div>
            </div>
          )}
        </div>

        <div className={styles.userContent}>
          {posts.length > 0 && (
            <div className={styles.userMedia}>
              <strong>User posts:</strong>
              <div className={styles.scrollContainer}>
                {posts.map((post) => (
                  <div className={styles.media} key={post.id}>
                    <span>{post.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {userImages.length > 0 && (
            <div className={styles.userMedia}>
              <strong>User images:</strong>
              <div className={styles.scrollContainer}>
                {userImages.map((image) => (
                  <div className={styles.media} key={image.id}>
                    <div className={styles.imageContainer}>
                      {image.name}
                      <div className={styles.imageMedia}>
                        <img src={image.path} alt={image.name} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
