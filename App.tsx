import React from 'react';
import 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import MainStack from './navigation/MainStack';

const App: React.FC<React.PropsWithChildren> = () => {
  return (
    <BottomSheetModalProvider>
      <MainStack />
    </BottomSheetModalProvider>
  );
}

export default App;
