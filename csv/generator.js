import fs from "node:fs/promises";

const generator = async (fileCsv) => {
  await fs.writeFile(
    fileCsv,
    [
      "title,description\n",
      "task 01,Descrição da Task 01\n",
      "task 02,Descrição da Task 02\n",
      "task 03,Descrição da Task 03\n",
      "task 04,Descrição da Task 04\n",
      "task 05,Descrição da Task 05\n",
    ].join(""),
    "utf8"
  );
};

export { generator };