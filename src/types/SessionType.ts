type User = {
  email: string;
  name: string;
  id: string;
};

type SessionType = {
  expires: string;
  user: User;
};

export default SessionType;
