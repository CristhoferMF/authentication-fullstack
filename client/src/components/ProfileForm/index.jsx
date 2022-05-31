import { useForm } from "react-hook-form";
import useProfile from "../../hooks/useProfile";
import { TextInput } from "./TextInput";
import Button from "../common/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { KeyboardArrowLeft } from "@material-ui/icons";
import {
  BackButton,
  FormContainer,
  FormWrapper,
  FormLegend,
  FormDescription,
  TextArea,
  ErrorMessage,
} from "./ProfileFormComponents";
import { profileSchema } from "./profileSchema";
import { updateProfile } from "../../services/api";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useAlert } from "react-alert";

function ProfileForm({ userId }) {
  const {
    auth: {
      token: {
        access: { token },
      },
    },
  } = useContext(AuthContext);
  const { profile, loading, error } = useProfile();
  const [errorUpdate, setErrorUpdate] = useState(null);
  const alert = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
  });
  const onSubmit = async (formData) => {
    setErrorUpdate(null);
    try {
      await updateProfile(token, formData);
      alert.success("Profile updated successfully");
    } catch (err) {
      alert.error("Something went wrong");
      setErrorUpdate(err.response.data.message);
    }
  };

  if (error) return <p>An {error}</p>;
  if (!profile || loading) return <></>;

  return (
    <>
      <BackButton to={"/profile"}>
        <KeyboardArrowLeft fontSize="large" /> Back
      </BackButton>
      <FormContainer>
        <FormWrapper>
          <FormLegend>Change Info</FormLegend>
          <FormDescription>
            Changes will be reflected to every services
          </FormDescription>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              label="Name"
              placeholder="Enter your name..."
              defaultValue={profile.name}
              {...register("name")}
              error={errors.name?.message}
            />
            <TextInput
              label="Bio"
              renderInput={(props, ref) => (
                <TextArea
                  {...props}
                  defaultValue={profile.bio}
                  {...register("bio")}
                ></TextArea>
              )}
              placeholder="Enter your bio..."
              error={errors.bio?.message}
            />
            <TextInput
              label="Email"
              typee="email"
              placeholder="Enter your email..."
              defaultValue={profile.email}
              {...register("email")}
              error={errors.email?.message}
            />
            <TextInput
              label="Phone"
              placeholder="Enter your phone..."
              defaultValue={profile.phone}
              {...register("phone")}
              error={errors.phone?.message}
            />
            <TextInput
              label="Password"
              placeholder="Enter your new password..."
              type="password"
              {...register("password")}
              error={errors.password?.message}
            />
            {errorUpdate && (
              <ErrorMessage>There was an error: {errorUpdate}</ErrorMessage>
            )}
            <Button primary title="Save" />
          </form>
        </FormWrapper>
      </FormContainer>
    </>
  );
}

export default ProfileForm;
