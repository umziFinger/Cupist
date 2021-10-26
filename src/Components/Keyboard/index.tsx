import * as React from 'react';
import { Animated, Keyboard, KeyboardEvent, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import CommonActions from '@/Stores/Common/Actions';

interface Props {
  children: React.ReactNode;
  noSpaceHeight?: number | 0;
}
interface ContextProps {
  height: any;
  setHeight: any;
}
export const KeyboardSpacerContext = React.createContext<ContextProps | null>(null);
export function useKeyboardSpacer() {
  const keyboard = React.useContext(KeyboardSpacerContext);
  if (keyboard === null) {
    throw new Error('`<KeyboardSpacerProvider>`를 사용하여 height값을 제공하세요!');
  }
  return keyboard;
}

export const KeyboardSpacerProvider = ({ children, noSpaceHeight = 0 }: Props) => {
  // @ts-ignore
  const [height, setHeight] = React.useState<Props>(noSpaceHeight);
  return <KeyboardSpacerContext.Provider value={{ height, setHeight }}>{children}</KeyboardSpacerContext.Provider>;
};

export const KeyboardSpacer = ({ safety = true, excludeHeight = false }) => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const KeyboardHeight = React.useRef(new Animated.Value(0)).current;
  const safe = useSafeAreaInsets();

  const { height } = useKeyboardSpacer();

  const dispatch = useDispatch();
  React.useEffect(() => {
    const createLayoutAnimation = () => ({
      duration: 250,
      create: {
        type: Platform.OS === 'android' ? LayoutAnimation.Types.easeInEaseOut : LayoutAnimation.Types.keyboard,
        property: Platform.OS === 'android' ? LayoutAnimation.Properties.opacity : LayoutAnimation.Properties.scaleXY,
      },
      update: {
        type: Platform.OS === 'android' ? LayoutAnimation.Types.easeInEaseOut : LayoutAnimation.Types.keyboard,
        property: Platform.OS === 'android' ? LayoutAnimation.Properties.opacity : LayoutAnimation.Properties.scaleXY,
      },
      delete: {
        type: Platform.OS === 'android' ? LayoutAnimation.Types.easeInEaseOut : LayoutAnimation.Types.keyboard,
        property: Platform.OS === 'android' ? LayoutAnimation.Properties.opacity : LayoutAnimation.Properties.scaleXY,
      },
    });
    const updateKeyboardSpace = (e: KeyboardEvent) => {
      if (!e.endCoordinates) {
        return;
      }
      LayoutAnimation.configureNext(createLayoutAnimation());
      KeyboardHeight.setValue(e.endCoordinates.height - (safety ? safe.bottom : 0) - (excludeHeight ? height : 0));
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'isOpenKeyboard',
          data: true,
        }),
      );
    };

    const resetKeyboardSpace = (e: KeyboardEvent) => {
      if (!e.endCoordinates) {
        return;
      }

      LayoutAnimation.configureNext(createLayoutAnimation());
      KeyboardHeight.setValue(0);
      dispatch(
        CommonActions.fetchCommonReducer({
          type: 'isOpenKeyboard',
          data: false,
        }),
      );
    };

    const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

    const listeners = [
      Keyboard.addListener(updateListener, updateKeyboardSpace),
      Keyboard.addListener(resetListener, resetKeyboardSpace),
    ];

    return () => {
      listeners.forEach((l) => {
        l.remove();
      });
    };
  }, [KeyboardHeight, excludeHeight, height, safe.bottom, safety]);

  return <Animated.View style={{ height: KeyboardHeight, backgroundColor: 'transparent' }} />;
};

export default {
  KeyboardSpacerContext,
  useKeyboardSpacer,
  KeyboardSpacerProvider,
  KeyboardSpacer,
};
