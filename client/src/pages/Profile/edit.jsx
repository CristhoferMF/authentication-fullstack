import { PageContainer } from "../../components/common/PageComponents";
import NavBar from "../../components/Navbar";
import ProfileForm from "../../components/ProfileForm";

export default function ProfileEditPage() {
  return (
    <>
      <NavBar />
      <PageContainer>
        <ProfileForm />
      </PageContainer>
    </>
  );
}
