import { useParams } from "react-router-dom";
import { useSingleAdminQuery } from "../../../redux/features/Admin/Admin.api";

const AdminDetails = () => {
  const { adminId } = useParams();
  const { data, isLoading } = useSingleAdminQuery(adminId);

  if (isLoading) {
    return <h4>Loading....</h4>;
  }

  const { designation, fullName, profileImg } = data.data;
  console.log(data);
  return (
    <div>
      <div>
        <img width={300} src={profileImg} alt="profile" />
        <h1>{fullName}</h1>
        <h2>Designation:{designation}</h2>
      </div>
    </div>
  );
};

export default AdminDetails;
