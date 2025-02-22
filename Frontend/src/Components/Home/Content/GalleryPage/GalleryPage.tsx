import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./GalleryPage.module.scss";
import api from "../../../../ApiConfig/ApiConfig";
import Notifications from "../../../Notifications/Notifications";

interface Image {
  id: number;
  name: string;
  userId: number;
  userName: string;
  path: string;
  folderId: number | null;
}

interface User {
  id: number;
  name: string;
}

export function GalleryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userIdLocal = localStorage.getItem("userId");
  const [images, setImages] = useState<Image[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const removeCheckboxesGallery =
    location.state?.removeCheckboxesGallery || false;
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

  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search")?.toLowerCase() || "";
  const filterOption = searchParams.get("filter") || "name";

  const filteredGallery = images.filter((image) => {
    if (filterOption === "name") {
      return image.name.toLowerCase().includes(searchTerm);
    } else if (filterOption === "user") {
      const user = users.find((user) => user.id === image.userId);
      return user ? user.name.toLowerCase().includes(searchTerm) : false;
    } else if (filterOption === "id") {
      return image.id.toString().includes(searchTerm);
    } else if (filterOption === "album") {
      return image.folderId?.toString().includes(searchTerm) ?? false;
    }

    return false;
  });

  useEffect(() => {
    if (!removeCheckboxesGallery) {
      setCheckedItems([]);
    }
  }, [removeCheckboxesGallery]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await api.get("/images");
      setImages(response.data);

      const usersResponse = await api.get("/users");
      setUsers(usersResponse.data);
    } finally {
      setLoading(false);
    }
  };

  const handleImageAdd = async () => {
    await fileInputRef.current?.click();

    if (!fileInputRef.current || !fileInputRef.current.files?.length) return;

    try {
      const file = fileInputRef.current.files[0];
      const formData = new FormData();
      formData.append("file", file);

      await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage("Image added successfully!");
      setMessageType("success");
      fetchImages();
      notificationDelay();
    } catch (error) {
      setMessage("Error adding image(s)! " + error);
      setMessageType("error");
      notificationDelay();
    }
  };

  const handleRemoveItemClick = (id: number) => {
    if (!removeCheckboxesGallery) {
      return;
    }

    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.includes(id)
        ? prevCheckedItems.filter((item) => item !== id)
        : [...prevCheckedItems, id]
    );
  };

  const removeImage = async () => {
    try {
      for (const id of checkedItems) {
        await api.delete(`/image/${id}`);
        navigate("/gallery", { state: { removeCheckboxesGallery: false } });
        fetchImages();
      }

      setMessage("Image(s) removed successfully!");
      setMessageType("success");
      notificationDelay();
    } catch (error) {
      setMessage("Error removing image(s): " + error);
      setMessageType("error");
      notificationDelay();
    }
  };

  if (location.state?.triggerAddGallery) {
    handleImageAdd();
    location.state.triggerAddGallery = false;
  }

  return (
    <div className={styles.galleryPage}>
      <Notifications messageType={messageType} message={message} />

      {loading ? (
        <h1>Loading images...</h1>
      ) : (
        <>
          {removeCheckboxesGallery ? (
            <button
              className={styles.removeBtn}
              onClick={removeImage}
              disabled={checkedItems.length === 0}
            >
              Remove
            </button>
          ) : (
            true
          )}

          <ul>
            {filteredGallery.map((image) => (
              <li
                key={image.id}
                onClick={
                  removeCheckboxesGallery &&
                  image.userId === Number(userIdLocal)
                    ? () => handleRemoveItemClick(image.id)
                    : undefined
                }
              >
                {removeCheckboxesGallery &&
                image.userId === Number(userIdLocal) ? (
                  <input
                    className={styles.checkboxes}
                    type="checkbox"
                    checked={checkedItems.includes(image.id)}
                    readOnly
                  />
                ) : (
                  true
                )}
                <img src={image.path} alt={image.name} />
                <p>{image.name}</p>
              </li>
            ))}
          </ul>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageAdd}
            style={{ display: "none" }}
          />
        </>
      )}
    </div>
  );
}
