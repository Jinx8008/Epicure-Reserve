import { supabase } from "../config/supabaseClient";
import emailjs from "@emailjs/browser";

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

    const { data: insertedReservation, error: insertError } = await supabase
      .from("Reservations")
      .insert([payload])
      .select()
      .single();

    if (insertError) throw insertError;

    // 🔥 Send Email Notification to Restaurant
    try {
      // Format date and time for better readability
      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const formattedTime = new Date(`${date}T${time}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });

      const emailParams = {
        customer_name: name,
        customer_email: email,
        reservation_date: formattedDate,
        reservation_time: formattedTime,
        guest_count: people,
        reservation_id: insertedReservation.id,
        submission_time: new Date().toLocaleString(),
        to_email: "epicurereserve@gmail.com"
      };

      await emailjs.send(
        "service_walecpd",        // Your EmailJS service ID
        "template_js5qtdn",       // Your new reservation notification template ID
        emailParams,
        "zEFgvzt9ZxWipYL_z"      // Your EmailJS public key
      );

      console.log("✅ Email notification sent successfully");
    } catch (emailError) {
      // Don't fail the reservation if email fails
      console.error("❌ Failed to send email notification:", emailError);
      // You could optionally show a warning to the user that email failed
    }

    return { success: true, message: "Reservation successful!" };
  } catch (error) {
    console.error("Reservation error:", error?.message || error);
    return {
      success: false,
      message: error?.message || "Failed to make reservation. Please try again.",
    };
  }
}