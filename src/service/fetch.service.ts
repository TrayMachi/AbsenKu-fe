import { auth } from "../../firebase";

class FetchService {
  private baseUrl: string = process.env.BACKEND_URL as string;
  private static instance: FetchService;

  public static getInstance() {
    if (!FetchService.instance) {
      FetchService.instance = new FetchService();
    }
    return FetchService.instance;
  }

  async getDocuments(userId: string, role: string | null, present: string | null): Promise<any> {
    const roleUrl = role !== null ? `&role=${role}` : ""
    const presentUrl = present !== null ? `&present=${present}` : ""
    const url = `${this.baseUrl}?userId=${userId}${roleUrl}${presentUrl}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching resource ${userId}:`, error);
      throw error;
    }
  }

  async getDocumentByRole(userId: any, role: string): Promise<any> {
    const url = `${this.baseUrl}?userId=${userId}&role=${role}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching resource ${userId} with role ${role}:`, error);
      throw error;
    }
  }

  async createResource(payload: any): Promise<any> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...payload, userId: auth.currentUser?.email}),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error creating resource:`, error);
      throw error;
    }
  }

  async updateStatus(id: string, payload: any): Promise<any> {
    const url = `${this.baseUrl}/${id}`;
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error(`Error updating resource with id ${id}:`, error);
      throw error;
    }
  }

  async deleteResource(id: string): Promise<void> {
    const url = `${this.baseUrl}/${id}`;
    try {
      await fetch(url, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(`Error deleting resource with id ${id}:`, error);
      throw error;
    }
  }
}

export default FetchService;