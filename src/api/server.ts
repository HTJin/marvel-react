const token = process.env.REACT_APP_USER_TOKEN;
const fireToken = localStorage.getItem("user_token");

export const serverCalls = {
  get: async () => {
    const response = await fetch(
      `https://marvel-flask.glitch.me/api/characters/${fireToken}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data from server");
    }
    return await response.json();
  },
  create: async (data: any = {}) => {
    const response = await fetch(
      `https://marvel-flask.glitch.me/api/characters/${fireToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to create new data on server");
    }
    return await response.json();
  },
  update: async (id: string, data: any = {}) => {
    const response = await fetch(
      `https://marvel-flask.glitch.me/api/characters/${id}/edit`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error data: ", errorData);
      throw new Error("Failed to update data on server");
    }
    return response;
  },
  delete: async (id: string) => {
    const response = await fetch(
      `https://marvel-flask.glitch.me/api/characters/${id}/remove`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to delete character with id ${id}`);
    }
  },
};
