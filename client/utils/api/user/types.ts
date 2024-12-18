export interface IUser {
  id:         string;
  email:      string;
  password:   string;
  role:       string;
  city:       string;
  experience: string;
  position:   string;
  salary:     string;
  createdAt:  Date;
  updatedAt:  Date;
}

export interface IUserCreateBody {
  email:      string;
  password:   string;
  role:       string;
  city:       string;
  experience: string;
  position:   string;
  salary:     string;
}
