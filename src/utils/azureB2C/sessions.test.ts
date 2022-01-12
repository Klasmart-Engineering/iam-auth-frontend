import { conditionalLogoutFromB2C } from "./sessions";
import { client } from "@/utils/azureB2C";
import { AccountInfo } from "@azure/msal-browser";
import * as refreshTokenModule from "@/api/authentication/refreshToken";

jest.mock('@/utils/azureB2C');

describe('conditionalLogoutFromB2C', () => {
    let mockRefreshToken: jest.SpyInstance<Promise<boolean>>;
    let mockGetAllAccounts: jest.SpyInstance<Array<AccountInfo>>;

    beforeEach(() => {
        mockRefreshToken = jest.spyOn(refreshTokenModule, `refreshToken`);
        mockGetAllAccounts = jest.spyOn(client, `getAllAccounts`);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('If the user has an active session do not call B2C logout', async () => {
        mockRefreshToken.mockResolvedValue(true);
        
        await conditionalLogoutFromB2C();

        expect(client.logoutRedirect).not.toBeCalled();
    })

    test('If the user does not have an active session, log them out from B2C', async () => {
        mockRefreshToken.mockResolvedValue(false);
        mockGetAllAccounts.mockReturnValue([{
            environment: '',
            homeAccountId: '',
            localAccountId: '',
            tenantId: '',
            username: '',
            idTokenClaims: {},
            name: ''
        }]);
        
        await conditionalLogoutFromB2C();

        expect(mockGetAllAccounts).toBeCalled();
        expect(client.logoutRedirect).toBeCalled();
    })

    test('If B2C logout throw an error, log it in the console', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(jest.fn());

        const mockLogoutRedirect = jest.spyOn(client, `logoutRedirect`).mockRejectedValue('Something went wrong.')
        
        mockRefreshToken.mockResolvedValue(false)
        
        await conditionalLogoutFromB2C()

        expect(mockLogoutRedirect).toBeCalled()
        expect(consoleSpy).toBeCalledWith('Something went wrong.')
    })
});