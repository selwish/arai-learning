import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Divider, IconButton, Box } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';

import AccountMenu from '../../common/AccountMenu';
import SearchModal from './SearchModal'; // モーダルコンポーネントをインポート

const drawerWidth = 240;

const Sidebar = ({ open, toggleSidebar }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          width: open ? drawerWidth : 56,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : 56,
            boxSizing: 'border-box',
            transition: 'width 0.3s ease',
            backgroundColor: 'rgba(249, 249, 249, 1)',
          },
        }}
      >
        {/* ヘッダー部分 */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '8px',
          }}
        >
          <IconButton onClick={toggleSidebar}>
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
        </Box>

        {/* ユーザ情報 */}
        <Box
          sx={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: '8px',
          }}
        >
          <AccountMenu />
        </Box>

        {/* 検索 */}
        <ListItem button onClick={handleModalOpen}>
          <SearchIcon sx={{ marginRight: open ? '8px' : '0px', color: '#787878' }} />
          {open && <ListItemText sx={{ color: '#787878' }} primary="検索" />}
        </ListItem>

        {/* サイドバーのリスト */}
        {/* <List>
          <ListItem button>
            <CalendarMonthIcon sx={{ marginRight: open ? '8px' : '0px' }} />
            {open && <ListItemText primary="今日" />}
          </ListItem>
          <ListItem button>
            <EventRepeatIcon sx={{ marginRight: open ? '8px' : '0px' }} />
            {open && <ListItemText primary="次の7日間" />}
          </ListItem>
          <Divider variant="middle" />
          <ListItem button>
            <CheckBoxIcon sx={{ marginRight: open ? '8px' : '0px' }} />
            {open && <ListItemText primary="完了" />}
          </ListItem>
          <ListItem button>
            <DeleteOutlineIcon sx={{ marginRight: open ? '8px' : '0px' }} />
            {open && <ListItemText primary="ゴミ箱" />}
          </ListItem>
        </List> */}
      </Drawer>

      {/* モーダル */}
      <SearchModal open={isModalOpen} onClose={handleModalClose} />
    </>
  );
};

export default Sidebar;
