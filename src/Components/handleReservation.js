import { db } from "../config/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp
} from "firebase/firestore";

const MAX_TABLES_PER_SLOT = 10;

export async function bookReservation({ name, date, time, people }) {
  const reservationsRef = collection(db, "reservations");
  const q = query(
    reservationsRef,
    where("date", "==", date),
    where("time", "==", time)
  );
  const snapshot = await getDocs(q);
  if (snapshot.size >= MAX_TABLES_PER_SLOT) {
    return { success: false, message: "This time slot is fully booked." };
  }
    await addDoc(reservationsRef, {
    name,
    date,
    time,
    people,
    timestamp: Timestamp.now()
  });
    return { success: true, message: "Reservation successful!" };
}
