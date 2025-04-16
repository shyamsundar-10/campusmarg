import axios from "axios";

// Make sure your base URL matches your backend setup
const API_BASE_URL = "http://10.46.215.194:8000";

export const markStudentPresent = async (sic: string) => {
  const today = new Date().toISOString().split("T")[0]; // 'YYYY-MM-DD'

  try {
    const response = await axios.post(`${API_BASE_URL}/attendance/`, {
      sic,
      status: "present",
      date: today,
    });

    return response.data;
    console.log(response.data)
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error("Attendance already marked for today.");
    } else {
      throw new Error("Failed to mark attendance. Please try again.");
    }
  }
};
