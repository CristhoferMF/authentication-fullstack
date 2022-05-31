import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { profile as getUserProfile } from "../services/api";

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        const response = await getUserProfile(auth.token.access.token);
        setProfile(response.data);
        setError(null);
        setLoading(false);
      } catch (err) {
        setError(
          (err.response.data.message ?? "Something went wrong").toUpperCase()
        );
        setLoading(false);
      }
    }
    getProfile();
  }, [auth]);

  return { profile, loading, error };
};

export default useProfile;
