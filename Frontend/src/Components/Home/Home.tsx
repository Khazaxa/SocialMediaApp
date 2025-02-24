import { useState } from "react";
import styles from "./Home.module.scss";
import NavBar from "./NavBar/NavBar";
import Content from "./Content/Content";
import FilterBar from "./FilterBar/FilterBar";
import TopBar from "./TopBar/TopBar";

interface HomeProps {
  setIsLogged: (isLogged: boolean) => void;
}

export function Home({ setIsLogged }: HomeProps) {
  const [isNavBarActive, setIsNavBarActive] = useState<boolean>(false);

  return (
    <div id={styles.mainWindow}>
      <NavBar setIsLogged={setIsLogged} setIsNavBarActive={setIsNavBarActive} />
      <div id={styles.content}>
        <TopBar />
        <FilterBar />
        <Content isNavBarActive={isNavBarActive} />
      </div>
    </div>
  );
}

export default Home;
