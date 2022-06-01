import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { profile as getUserProfile } from "../services/api";

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const {
    auth: { tokens },
    logout,
  } = useContext(AuthContext);

  useEffect(() => {
    async function getProfile() {
      try {
        setLoading(true);
        const { token } = tokens.access;
        const response = await getUserProfile(token);
        console.log(response);
        setProfile(response.data);
        setError(null);
        setLoading(false);
      } catch ({ response: { status, data } }) {
        if (status === 401) {
          return logout();
        }
        setLoading(false);
        setError((data.message ?? "Something went wrong").toUpperCase());
      }
    }
    getProfile();
  }, [tokens]);

  return { profile, loading, error };
};

export default useProfile;
