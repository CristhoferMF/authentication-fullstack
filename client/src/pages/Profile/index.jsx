import { PageContainer } from "../../components/common/PageComponents";
import NavBar from "../../components/Navbar";
import {
  Title,
  SubTitle,
  ProfileCardWrapper,
  ProfileCard,
  ProfileItem,
  ProfileItemLabel,
  ProfileItemValue,
  EmptyValue,
  EditButton,
  ColumnOne,
  ColumnTwo,
  ProfileItemTitle,
  ProfileItemDesc,
} from "./ProfilePageComponents";
import useProfile from "../../hooks/useProfile";

function Profile() {
  const { profile, error, loading } = useProfile();

  if (error) {
    return (
      <>
        <NavBar />
        <PageContainer>
          <Title>Profile Error</Title>
          <SubTitle>{error}</SubTitle>
        </PageContainer>
      </>
    );
  }

  const profileItems = profile
    ? [
        { key: "name", label: "NAME", value: profile.name },
        { key: "bio", label: "BIO", value: profile.bio },
        { key: "phone", label: "PHONE", value: profile.phone },
        { key: "email", label: "EMAIL", value: profile.email },
        { key: "password", label: "PASSWORD", value: "**********" },
      ]
    : [];

  return (
    <>
      <NavBar />
      <PageContainer>
        <Title>Personal Info</Title>
        <SubTitle>Basic info, like your name and photo</SubTitle>
        {loading && <h2 style={{ textAlign: "center" }}>Loading...</h2>}
        {profile && (
          <ProfileCardWrapper>
            <ProfileCard>
              <ProfileItem justify="space-between">
                <ColumnOne>
                  <ProfileItemTitle>Profile</ProfileItemTitle>
                  <ProfileItemDesc>
                    Some info may be visible to other people
                  </ProfileItemDesc>
                </ColumnOne>
                <ColumnTwo>
                  <EditButton to="/profile/edit">Edit</EditButton>
                </ColumnTwo>
              </ProfileItem>
              <ProfileItem>
                <ProfileItemLabel>PHOTO</ProfileItemLabel>
                <ProfileItemValue>
                  <img
                    referrerPolicy="no-referrer"
                    src={profile.photo}
                    alt="profile"
                  />
                </ProfileItemValue>
              </ProfileItem>
              {profileItems.map(({ key, label, value }) => (
                <ProfileItem key={key}>
                  <ProfileItemLabel>{label}</ProfileItemLabel>
                  <ProfileItemValue>
                    {value || <EmptyValue>...Empty value</EmptyValue>}
                  </ProfileItemValue>
                </ProfileItem>
              ))}
            </ProfileCard>
          </ProfileCardWrapper>
        )}
      </PageContainer>
    </>
  );
}

export default Profile;
