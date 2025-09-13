import PocketBase from "pocketbase";

const PB_URL = process.env.PB_URL || "http://127.0.0.1:8090";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@gmail.com";
const ADMIN_PASS  = process.env.ADMIN_PASS  || "Admin";

const pb = new PocketBase(PB_URL);

async function seed() {
  try {
    await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASS);

    const sample = [
      { first_name: "Alice", last_name: "Perera", email: "alice@example.com", phone: "0771234567", address: "Colombo, Sri Lanka", date_of_birth: "1990-05-10" },
      { first_name: "Bimal", last_name: "Kumar", email: "bimal@example.com", phone: "0772345678", address: "Kandy, Sri Lanka", date_of_birth: "1985-11-21" },
      { first_name: "Chathu", last_name: "Fernando", email: "chathu@example.com", phone: "0773456789", address: "Galle, Sri Lanka", date_of_birth: "1993-02-14" }
    ];

    for (const g of sample) {
      try {
        await pb.collection("guests").create(g);
        console.log("Created:", g.email);
      } catch (err) {
        console.warn("Skipped or failed creating", g.email, err?.message || err);
      }
    }
    console.log("Seeding done.");
  } catch (err) {
    console.error("Error seeding:", err);
  }
}

seed();