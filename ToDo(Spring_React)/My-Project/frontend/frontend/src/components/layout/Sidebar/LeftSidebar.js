// うまくいかなかったから未使用

import React from 'react';
import { Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountMenu from '../../common/AccountMenu'; // メニューコンポーネントをインポート

const LeftSidebar = () => {
  return (
    <Box
      sx={{
        width: '56px', // Mini variant と同じ幅
        height: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }}
    >
      {/* アイコン付きメニュー */}
      <AccountMenu />
    </Box>
  );
};

export default LeftSidebar;
