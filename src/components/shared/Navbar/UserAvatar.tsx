import { Avatar } from "primereact/avatar";
import { IUser } from "~/shared/types/user";

interface UserAvatarProps {
  user: IUser;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  const label = user.firstName.charAt(0).toUpperCase() + user.lastName.charAt(0).toUpperCase();

  return <Avatar label={label} size="xlarge" />;
};

export default UserAvatar;
