import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

export default async function () {
  const accessToken = await googleLogin();
  return accessToken;
}
const googleLogin = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const currentUser = await GoogleSignin.getCurrentUser();
    if (currentUser !== null) {
      await GoogleSignin.signOut();
    } else {
      const userInfo = await GoogleSignin.signIn();
      return userInfo.idToken;
    }

    // this.setState({ userInfo });
    // return new Promise((resolve, reject) => {
    //   GoogleSignin.getCurrentUser().then(async (result) => {
    //     if (result !== null) {
    //       await GoogleSignin.signOut();
    //     } else {
    //       await GoogleSignin.signIn()
    //         .then((data) => {
    //           console.log('Success Google login');
    //           resolve(data.idToken);
    //         })
    //         .catch((error) => {
    //           console.error('Error Google login 1 : ', error);
    //           reject(error);
    //         });
    //     }
    //   });
    // });
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
      console.log('Error Google login 1 : ', error);
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
      console.log('Error Google login 2 : ', error);
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
      console.log('Error Google login 3 : ', error);
    } else {
      // some other error happened
      console.log('Error Google login 4 : ', error);
    }
  }

  return null;
};
