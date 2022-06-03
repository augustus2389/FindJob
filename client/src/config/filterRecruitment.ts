import { Recruitment } from "../api/type/recruitment";

/* eslint-disable @typescript-eslint/no-unused-expressions */
export const filterRecruitment =
  (recruitments: Recruitment[] | null) =>
  (address: number) =>
  (type: number) =>
  (rank: number) =>
  (salary: number) =>
  (workingForm: number) =>
  (workExperience: number) =>
  (title: string) => {
    //   if -1 return old users
    if (recruitments) {
      return recruitments
        .filter((item) => (address === -1 ? true : item.address === address))
        .filter((item) => (type === -1 ? true : item.type === type))
        .filter((item) => (rank === -1 ? true : item.rank === rank))
        .filter((item) => (salary === -1 ? true : item.salary === salary))
        .filter((item) =>
          workingForm === -1 ? true : item.workingForm === workingForm
        )
        .filter((item) =>
          workExperience === -1 ? true : item.workExperience === workExperience
        )
        .filter((item) =>
          title === ""
            ? true
            : item.title.toLowerCase().includes(title.toLowerCase())
        );
    }
  };
