import { getDistance, convertDistance } from 'geolib';
import { Linking, Platform, View } from 'react-native';
import { getVersion } from 'react-native-device-info';
import moment from 'moment';
import Config from '@/Config';
import 'moment/locale/ko';
import { Path, Svg } from 'react-native-svg';
import React, { useEffect } from 'react';

export const distanceCalc = (start: any, end: any) => {
  const distance = getDistance(start, end);

  let distanceView;
  if (distance > 1000) {
    distanceView = `${convertDistance(distance, 'km').toFixed(1).replace('.0', '')}km`;
  } else {
    distanceView = `${convertDistance(distance, 'm').toFixed(1).replace('.0', '')}m`;
  }

  return distanceView;
};

interface FormDateInfo {
  formDateType: formDateEnum.MMDD | formDateEnum.YYYYMMDD;
  time: any;
}
export enum formDateEnum {
  YYYYMMDD = 'yyyy.MM.dd',
  MMDD = 'MM.dd',
}

export const getFormatDate = (date: FormDateInfo) => {
  // const { time } = date;
  const time = new Date(date.time);

  switch (date.formDateType) {
    case formDateEnum.MMDD: {
      let month: string | number = time.getMonth() + 1;
      month = month >= 10 ? month : `0${month}`;
      let day: string | number = time.getDate();
      day = day >= 10 ? day : `0${day}`;
      return `${month}.${day}`;
    }

    case formDateEnum.YYYYMMDD: {
      const year = time.getFullYear();
      let month: string | number = time.getMonth() + 1;
      month = month >= 10 ? month : `0${month}`;
      let day: string | number = time.getDate();
      day = day >= 10 ? day : `0${day}`;
      let hour: string | number = time.getHours();
      hour = hour >= 10 ? hour : `0${hour}`;
      let min: string | number = time.getMinutes();
      min = min >= 10 ? min : `0${min}`;
      let sec: string | number = time.getSeconds();
      sec = sec >= 10 ? sec : `0${sec}`;
      return `${year}.${month}.${day}`;
    }

    default: {
      const year = time.getFullYear();
      let month: string | number = time.getMonth() + 1;
      month = month >= 10 ? month : `0${month}`;
      let day: string | number = time.getDate();
      day = day >= 10 ? day : `0${day}`;
      let hour: string | number = time.getHours();
      hour = hour >= 10 ? hour : `0${hour}`;
      let min: string | number = time.getMinutes();
      min = min >= 10 ? min : `0${min}`;
      let sec: string | number = time.getSeconds();
      sec = sec >= 10 ? sec : `0${sec}`;

      return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    }
  }
};

export const numberFormat = (number: any) => {
  if (number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return 0;
};

export const getTime = (second: number) => {
  let time, hour, minute;
  if (second > 60 * 60) {
    hour = Math.floor(second / (60 * 60));
    minute = second % 60;

    time = `${hour}시간 ${minute}분`;
  } else {
    minute = Math.floor(second / 60);
    time = `${minute}분`;
  }
  return time;
};

export const inputMobileNumber = (value: string) => {
  let result = '';
  if (value) {
    const tempNumber = value.replace(/[^0-9]/g, '');

    if (tempNumber.length < 4) {
      return tempNumber;
    }
    if (tempNumber.length < 7) {
      result += tempNumber.substr(0, 3);
      result += '-';
      result += tempNumber.substr(3);
    } else if (tempNumber.length < 11) {
      result += tempNumber.substr(0, 3);
      result += '-';
      result += tempNumber.substr(3, 3);
      result += '-';
      result += tempNumber.substr(6);
    } else {
      result += tempNumber.substr(0, 3);
      result += '-';
      result += tempNumber.substr(3, 4);
      result += '-';
      result += tempNumber.substr(7);
    }

    return result;
  }
  return result;
};
export const timeFormat = (time: any) => {
  let result = '';
  if (time) {
    const minute = Math.floor(time / 60);
    let second: any = time - minute * 60;

    if (second < 10) {
      second = `0${second}`;
    }

    result = `${minute}:${second}`;
  }

  return result;
};
export const scrollHandler = (event: any) => {
  let result;
  if (Platform.OS === 'ios' ? event.nativeEvent.contentOffset.y >= 285 : event.nativeEvent.contentOffset.y >= 301) {
    result = { headerStyleChange: true, shadowValue: 1 };
  } else if (
    Platform.OS === 'ios' ? event.nativeEvent.contentOffset.y >= 230 : event.nativeEvent.contentOffset.y >= 245
  ) {
    result = { headerStyleChange: true, shadowValue: 0.9 };
  } else if (
    Platform.OS === 'ios' ? event.nativeEvent.contentOffset.y >= 210 : event.nativeEvent.contentOffset.y >= 225
  ) {
    result = { headerStyleChange: true, shadowValue: 0.8 };
  } else if (
    Platform.OS === 'ios' ? event.nativeEvent.contentOffset.y >= 190 : event.nativeEvent.contentOffset.y >= 205
  ) {
    result = { headerStyleChange: true, shadowValue: 0.7 };
  } else if (
    Platform.OS === 'ios' ? event.nativeEvent.contentOffset.y >= 170 : event.nativeEvent.contentOffset.y >= 185
  ) {
    result = { headerStyleChange: true, shadowValue: 0.6 };
  } else if (
    Platform.OS === 'ios' ? event.nativeEvent.contentOffset.y >= 150 : event.nativeEvent.contentOffset.y >= 165
  ) {
    result = { headerStyleChange: true, shadowValue: 0.5 };
  } else if (
    Platform.OS === 'ios' ? event.nativeEvent.contentOffset.y >= 130 : event.nativeEvent.contentOffset.y >= 145
  ) {
    result = { headerStyleChange: true, shadowValue: 0.4 };
  } else if (
    Platform.OS === 'ios' ? event.nativeEvent.contentOffset.y >= 110 : event.nativeEvent.contentOffset.y >= 125
  ) {
    result = { headerStyleChange: true, shadowValue: 0.3 };
  } else if (
    Platform.OS === 'ios' ? event.nativeEvent.contentOffset.y >= 90 : event.nativeEvent.contentOffset.y >= 105
  ) {
    result = { headerStyleChange: true, shadowValue: 0.2 };
  } else if (
    Platform.OS === 'ios' ? event.nativeEvent.contentOffset.y >= 70 : event.nativeEvent.contentOffset.y >= 85
  ) {
    result = { headerStyleChange: true, shadowValue: 0.1 };
  } else {
    result = { headerStyleChange: false, shadowValue: 0 };
  }
  return result;
};

export const URLParser = (u: any) => {
  let path = '';
  let query = '';
  let hash = '';
  let params: any;
  if (u.indexOf('#') > 0) {
    hash = u.substr(u.indexOf('#') + 1);
    u = u.substr(0, u.indexOf('#'));
  }
  if (u.indexOf('?') > 0) {
    path = u.substr(0, u.indexOf('?'));
    query = u.substr(u.indexOf('?') + 1);
    params = query.split('&');
  } else path = u;
  return {
    getHost() {
      const hostexp = /\/\/([\w.-]*)/;
      const match = hostexp.exec(path);
      if (match != null && match.length > 1) return match[1];
      return '';
    },
    getPath() {
      const pathexp = /\/\/[\w.-]*(?:\/([^?]*))/;
      const match = pathexp.exec(path);
      if (match != null && match.length > 1) return match[1];
      return '';
    },
    getHash() {
      return hash;
    },
    getParams() {
      return params;
    },
    getQuery() {
      return query;
    },
    setHash(value: any) {
      if (query.length > 0) query = `?${query}`;
      if (value.length > 0) query = `${query}#${value}`;
      return path + query;
    },
    setParam(name: any, value: any) {
      if (!params) {
        params = [];
      }
      params.push(`${name}=${value}`);
      for (let i = 0; i < params.length; i++) {
        if (query.length > 0) query += '&';
        query += params[i];
      }
      if (query.length > 0) query = `?${query}`;
      if (hash.length > 0) query = `${query}#${hash}`;
      return path + query;
    },
    getParam(name: any) {
      if (params) {
        for (let i = 0; i < params.length; i++) {
          const pair = params[i].split('=');
          if (decodeURIComponent(pair[0]) === name) return decodeURIComponent(pair[1]);
        }
      }
      console.log('Query letiable %s not found', name);
    },
    hasParam(name: any) {
      if (params) {
        for (let i = 0; i < params.length; i++) {
          const pair = params[i].split('=');
          if (decodeURIComponent(pair[0]) === name) return true;
        }
      }
      console.log('Query letiable %s not found', name);
    },
    removeParam(name: any) {
      query = '';
      if (params) {
        const newparams = [];
        for (let i = 0; i < params.length; i++) {
          const pair = params[i].split('=');
          if (decodeURIComponent(pair[0]) !== name) newparams.push(params[i]);
        }
        params = newparams;
        for (let i = 0; i < params.length; i++) {
          if (query.length > 0) query += '&';
          query += params[i];
        }
      }
      if (query.length > 0) query = `?${query}`;
      if (hash.length > 0) query = `${query}#${hash}`;
      return path + query;
    },
  };
};
export const compareVersion = (a: string | null, b: string | null) => {
  if (a === b) {
    return 0;
  }

  const aComponents = a.split('.');
  const bComponents = b.split('.');

  const len = Math.min(aComponents.length, bComponents.length);

  // loop while the components are equal
  for (let i = 0; i < len; i++) {
    // A bigger than B
    if (parseInt(aComponents[i]) > parseInt(bComponents[i])) {
      return 1;
    }

    // B bigger than A
    if (parseInt(aComponents[i]) < parseInt(bComponents[i])) {
      return -1;
    }
  }

  // If one's a prefix of the other, the longer one is greater.
  if (aComponents.length > bComponents.length) {
    return 1;
  }

  if (aComponents.length < bComponents.length) {
    return -1;
  }

  // Otherwise they are the same.
  return 0;
};

export const onAppUpdate = (currentVersion: string) => {
  const appVersion = getVersion();
  if (compareVersion(appVersion, currentVersion) < 0) {
    if (Platform.OS === 'ios') {
      Linking.openURL(Config.MARKET_URL_IOS)
        .then((result) => {
          console.log('result', result);
        })
        .catch((e) => {
          console.log('error', e);
        });
    } else {
      Linking.openURL(Config.MARKET_URL_ANDROID)
        .then((result) => {
          console.log('result', result);
        })
        .catch((e) => {
          console.log('error', e);
        });
    }
  }
};
export const BetweenDates = (startDate: string, endDate: string) => {
  const currDate = moment(startDate);
  const lastDate = moment(endDate);
  const now = currDate;
  const dates = [];
  while (now.isSameOrBefore(endDate)) {
    dates.push(now.format('YYYY-MM-DD'));
    now.add(1, 'days');
  }
  return dates;
};

export const ShippingRBSShowCheck = (code: string) => {
  if (code) {
    return (
      code === 'SRSE_SDCM' ||
      code === 'CPCM_SDCC' ||
      code === 'QARQ_SDMG' ||
      code === 'PRCC' ||
      code === 'SRSP_SDAC' ||
      code === 'SRWT_SDMC' ||
      code === 'CPBW_SDCC' ||
      code === 'SRSH_SDCM' ||
      code === 'SRSH_SDMC' ||
      code === 'EXPK' ||
      code === 'SRCM_SDCM' ||
      code === 'PRCM_SDMC'
    );
  }
  return false;
};

export const renderEdge = (rotate: string, style: any) => {
  return (
    <View
      style={[
        {
          position: 'absolute',
          zIndex: 999,
          transform: [{ rotate }],
        },
        style,
      ]}
    >
      <Svg width={`${24}`} height={`${24}`} fill="white" strokeWidth={1} viewBox={`0 0 ${100} ${100}`}>
        <Path d={`M0 0L0 ${100}L${100} ${100}Q${0} ${100} 0 0 `} />
      </Svg>
    </View>
  );
};

export const renderFacilityIcon = (type: string) => {
  if (type === '주차') {
    return require('@/Assets/Images/Common/icAmenParking.png');
  }
  if (type === '스낵바') {
    return require('@/Assets/Images/Common/icAmenSnack.png');
  }
  if (type === '흡연실') {
    return require('@/Assets/Images/Common/icAmneSmoking.png');
  }
  if (type === '인터넷') {
    return require('@/Assets/Images/Common/icAmenWifi.png');
  }
  if (type === '프로샵') {
    return require('@/Assets/Images/Common/icAmenShopping.png');
  }
  if (type === '액션캠') {
    return require('@/Assets/Images/Common/icAmenCam.png');
  }
  if (type === '프라이빗') {
    return require('@/Assets/Images/Common/icAmenPrivate.png');
  }
  if (type === '유료정비') {
    return require('@/Assets/Images/Common/icAmenRepair.png');
  }
  if (type === '락커룸') {
    return require('@/Assets/Images/Common/icAmenLocker.png');
  }

  return '';
};

export const scrollCalendarHandler = (event: any, offsetY: number) => {
  let result;
  if (
    Platform.OS === 'ios' ? event.nativeEvent.contentOffset.y >= offsetY : event.nativeEvent.contentOffset.y >= offsetY
  ) {
    result = { isShow: true };
  } else {
    result = { isShow: false };
  }
  return result;
};

export function useDebouncedFunction(handler: Function, watchedValue: any, delay: number) {
  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      handler();
    }, delay);
    return () => {
      clearTimeout(timeoutHandler);
    };
  }, [watchedValue, delay]);
}
