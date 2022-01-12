import { refreshToken } from "@/api/authentication";
import { client } from "@/utils/azureB2C";

export const conditionalLogoutFromB2C = async () => {
  const isAuthenticated = await refreshToken();

  if (isAuthenticated) {
      window.location.href = `/selectprofile`;
  } else {
    try {
      const accounts = await client.getAllAccounts()

      if (accounts.length) {
          await client.logoutRedirect();
      }
    } catch (error) {
        console.error(error);
    }
  }  
}