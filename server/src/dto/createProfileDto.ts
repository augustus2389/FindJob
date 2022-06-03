import { Sex } from 'src/constant/enum';

export class CreateProfileDTO {
  name: string;
  birthday: string;
  phone: string;
  email: string;
  imgUrl: string;
  degree: string;
  experience: string;
  skill: string;
  hobby: string;
  target: string;
  gender: Sex;
}
