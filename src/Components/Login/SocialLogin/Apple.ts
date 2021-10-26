import { appleAuth } from '@invertase/react-native-apple-authentication';

export default async function () {
  const accessToken = await appleLogin();
  return accessToken;
}
const appleLogin = async () => {
  try {
    return new Promise((resolve, reject) => {
      appleAuth
        .performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        })
        .then((appleAuthRequestResponse) => {
          // Ensure Apple returned a user identityToken
          if (!appleAuthRequestResponse.identityToken) {
            const errorMsg = 'Apple Sign-In failed - no identify token returned';
            reject(errorMsg);
          }

          const { identityToken, fullName } = appleAuthRequestResponse;
          // console.log('Apple login Success identityToken : ', identityToken);
          const result = {
            identityToken,
            fullName,
          };
          resolve(result);
        });
    });
  } catch (e) {
    console.log(e);
  }
};
