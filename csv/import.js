import { parse } from "csv-parse";
import fs from "node:fs";
import { generator } from "./generator.js";

const fileCsv = new URL("data.csv", import.meta.url);
await generator(fileCsv);

(async () => {
  const parser = fs.createReadStream(fileCsv).pipe(parse({ from_line: 2 }));
  for await (const record of parser) {
    const obj = { title: record[0], description: record[1] };
    try {
      await fetch("http://localhost:3333/tasks", {
        method: "POST",
        body: JSON.stringify(obj),
      });
    } catch (error) {
      console.error(error);
    }
  }
})();
