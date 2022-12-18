import { v4 as uuidv4 } from "uuid";

export const posts = [
  {
    id: uuidv4(),
    createdAt: "2022-12-15",
    userId: "me",
    modifiedAt: null,
    text: "React vs Angular: Which JS Framework to Pick for Front-end Developmeergergergergreeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeent? What do you think",
    category: "Any category",
    title: "Any title",
    comments: [
      {
        id: uuidv4(),
        userId: "user_1",
        text: "any comment text",
        createdAt: "2022-12-15"
      },
      {
        id: uuidv4(),
        userId: "user_2",
        text: "any comment text 2",
        createdAt: "2022-12-16"
      }
    ]
  }
];

export const users = [
  {
    id: "me",
    name: "test_name",
    surname: "test_surname"
  },
  {
    id: "user_1",
    neme: "test_name_1",
    surname: "test_surname_1"
  },
  {
    id: "user_2",
    neme: "test_name_2",
    surname: "test_surname_2"
  }
];
