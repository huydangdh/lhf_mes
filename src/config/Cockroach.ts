import { Client } from "pg";
const DB_URL =
  "postgresql://lhf_168:qhhomI16tSRm5CkvUYMvGQ@huydang-2023-4007.8nk.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full";

const client = new Client(DB_URL);

async function DoTestConnectToCockroach() {
  await client.connect();
  try {
    const results = await client.query("SELECT NOW()");
    console.log(results);
  } catch (err) {
    console.error("error executing query:", err);
  } finally {
    client.end();
  }
}

export default DoTestConnectToCockroach;
