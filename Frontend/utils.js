async function fetchState(id) {
  try {
    const res = await fetch(
      `${API_URL}?action=getData&id=${id}&sheetname=${encodeURIComponent("Policy Information")}`
    );
    const json = await res.json();

    if (json.status === "success") {
      const data = json.data;
      return data["Rating State"] || "";
    } else {
      console.error("[fetchState] API error:", json.message);
      return "";
    }
  } catch (err) {
    console.error("[fetchState] Fetch error:", err);
    return "";
  }
}