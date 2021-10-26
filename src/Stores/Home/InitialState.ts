export const INITIAL_STATE = {
  loginCheckYN: 'N',
  homeList: [],
  isHomeLoaded: false,
};

export interface HomeState {
  home: {
    loginCheckYN: string | null;
    homeList: any | null;
    isHomeLoaded: boolean | false;
  };
}
