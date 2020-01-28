enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR
  // pode definir o valor
  // ADMIN = 100
  // READ_ONLY = 'READ ONLY
}

const person: {
  name: string;
  age: number;
  hobbies: string[];
  // tuple => array com tamanho e tipos pré-definidos
  // role: [number, string];
  role: Role;
} = {
  name: "paulo",
  age: 39,
  hobbies: ["ride a bike", "surfing"],
  // role: [2, "admin"]
  role: Role.ADMIN
};

if (person.role === Role.ADMIN) {
  console.log("is on ADMIN");
}
