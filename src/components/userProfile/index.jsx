import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

function UserProfile() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    let url = "https://randomuser.me/api/0.8/?results=1";
    setLoading(true);
    try {
      const response = await axios.get(url);
      setUser(response.data.results[0].user);
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoading(false);
      console.log("Запросы завершены");
    }
  }

  return (
    <div className={styles.container}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.cardContsiner}>
          <div className={styles.imageContainer}>
            <img src={user.picture.medium} alt="" />
          </div>
          <h1>
            {user.name.first} {user.name.last}
          </h1>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </div>
      )}
      <button className={styles.btn} onClick={fetchUser}>
        Load new User
      </button>
    </div>
  );
}
export default UserProfile;
