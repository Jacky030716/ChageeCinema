export const fetchSessionData = async () => {
    try {
        const response = await fetch("http://localhost/Chagee%20Cinema/backend/getSession.php", {
            method: "GET",
            credentials: "include" // Required for cookies
        });
        const data = await response.json();
        if (data.status === "success") {
            return { success: true, data };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        console.error("Error fetching session data:", error);
        return { success: false, message: "An error occurred while fetching session data." };
    }
};