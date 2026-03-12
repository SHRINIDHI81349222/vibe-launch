"use client"; // This tells Next.js this page is interactive
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // Importing our "Bridge"

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleJoinWaitlist = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    setLoading(true);
    setMessage("");

    // 1. Send data to the 'waitlist' table we created in Supabase
    const { error } = await supabase
      .from("waitlist")
      .insert([{ email: email }]);

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Success! You're on the list. 🚀");
      setEmail(""); // Clear the input
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4">
      {/* The Hero Section */}
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
        VibeLaunch AI
      </h1>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        The ultimate tool for creators. Join the waitlist to get early access.
      </p>

      {/* The Form */}
      <form onSubmit={handleJoinWaitlist} className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
        <input
          type="email"
          placeholder="Enter your email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-900 border border-gray-800 p-3 rounded-lg flex-grow outline-none focus:border-blue-500 transition-all"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg font-bold transition-all disabled:opacity-50"
        >
          {loading ? "Joining..." : "Join Now"}
        </button>
      </form>

      {/* Success/Error Message */}
      {message && <p className="mt-4 text-sm text-blue-400 font-medium">{message}</p>}
    </main>
  );
}