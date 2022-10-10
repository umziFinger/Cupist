export const INITIAL_STATE: HomeState['home'] = {
  isHomeLoaded: false,

  introductionList: null,
  introductionAdditionalList: null,
  introductionCustomList: null,
  introductionAdditionalPage: 1,
  profile: {} as ProfileType,
  meta: {} as MetaType,
};

export interface HomeState {
  home: {
    isHomeLoaded: boolean | false;

    introductionList: any;
    introductionAdditionalList: any;
    introductionCustomList: any;
    introductionAdditionalPage: number;
    profile: ProfileType;
    meta: MetaType;
  };
}

interface ProfileType {
  birthday: string;
  body_type: string;
  company: string;
  education: any;
  gender: string;
  height: number;
  id: number;
  introduction: string;
  job: string;
  location: string;
  name: string;
  pictures: Array<string>;
  school: any;
}

interface MetaType {
  body_types: [
    {
      key: 'body_type_00';
      name: '마른';
    },
    {
      key: 'body_type_01';
      name: '보통';
    },
    {
      key: 'body_type_02';
      name: '근육';
    },
    {
      key: 'body_type_03';
      name: '통통';
    },
  ];
  educations: [
    {
      key: 'education_00';
      name: '고등학교';
    },
    {
      key: 'education_01';
      name: '전문대';
    },
    {
      key: 'education_02';
      name: '대학교';
    },
    {
      key: 'education_03';
      name: '석사';
    },
    {
      key: 'education_04';
      name: '박사';
    },
    {
      key: 'education_05';
      name: '기타';
    },
  ];
  genders: [
    {
      key: 'M';
      name: '남성';
    },
    {
      key: 'F';
      name: '여성';
    },
  ];
  height_range: {
    max: 220;
    min: 120;
  };
}
