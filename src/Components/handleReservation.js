import { supabase } from "../config/supabaseClient";

const MAX_TABLES_PER_SLOT = 10;

export async function bookReservation({ name, email, date, time, people }) {
  try {
    // Get the current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return { success: false, message: "Please log in to make a reservation." };
    }

    // Check if this slot is full
    const { data: existingReservations, error: fetchError } = await supabase
      .from("Reservations") // case-sensitive: capital R if your table is "Reservations"
      .select("id")
      .eq("date", date)
      .eq("time", time);

    if (fetchError) throw fetchError;

    if ((existingReservations?.length || 0) >= MAX_TABLES_PER_SLOT) {
      return { success: false, message: "This time slot is fully booked." };
    }

    // Insert reservation (NOTE: using "guest" column)
    const payload = {
      name,
      email,
      date,
      time,
      guest: Number(people),   // <-- your DB column is "guest" (singular)
      user_id: user.id,
      created_at: new Date().toISOString(),
    };

    const { error: insertError } = await supabase.from("Reservations").insert([payload]);
    if (insertError) throw insertError;

    return { success: true, message: "Reservation successful!" };
  } catch (error) {
    console.error("Reservation error:", error?.message || error);
    return {
      success: false,
      message: error?.message || "Failed to make reservation. Please try again.",
    };
  }
}
