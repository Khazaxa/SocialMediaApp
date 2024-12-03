import { NavItem } from "./NavItem/NavItem";
import styles from "./NavLinks.module.scss";

export function NavLinks({
  setIsHomePage,
  setIsUsersPage,
  setIsGalleryPage,
  setIsFoldersPage,
  setIsPostsPage,
}: {
  setIsHomePage: (isHomePage: boolean) => void;
  setIsUsersPage: (isUsersPage: boolean) => void;
  setIsGalleryPage: (isGalleryPage: boolean) => void;
  setIsFoldersPage: (isFoldersPage: boolean) => void;
  setIsPostsPage: (isPostsPage: boolean) => void;
}) {
  const resetPages = () => {
    setIsHomePage(false);
    setIsUsersPage(false);
    setIsGalleryPage(false);
    setIsFoldersPage(false);
    setIsPostsPage(false);
  };

  return (
    <div id={styles.navLinks}>
      <NavItem
        onClick={() => {
          resetPages();
          setIsHomePage(true);
        }}
      >
        Home
      </NavItem>
      <NavItem
        onClick={() => {
          resetPages();
          setIsUsersPage(true);
        }}
      >
        Users
      </NavItem>
      <NavItem
        onClick={() => {
          resetPages();
          setIsGalleryPage(true);
        }}
      >
        Gallery
      </NavItem>
      <NavItem
        onClick={() => {
          resetPages();
          setIsFoldersPage(true);
        }}
      >
        Folders
      </NavItem>
      <NavItem
        onClick={() => {
          resetPages();
          setIsPostsPage(true);
        }}
      >
        Posts
      </NavItem>
    </div>
  );
}
