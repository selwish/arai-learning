import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { styled, css } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { TextField, List, ListItem, ListItemText, Fade, IconButton, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { searchTasks } from '../../services/taskService';

const SearchModal = ({ open, onClose }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const navigate = useNavigate(); // React Routerのナビゲーションフック

  // モーダルが閉じられるときに状態をリセット
  const handleModalClose = () => {
    setSearchKeyword(''); // 検索キーワードをクリア
    setFilteredTasks([]); // 検索結果をクリア
    onClose(); // 親コンポーネントのクローズ処理を実行
  };

  // 検索処理
  const handleSearch = async (event) => {
    const keyword = event.target.value.trim();
    setSearchKeyword(keyword);

    if (keyword.length > 0) {
      const tasks = await searchTasks(keyword); // API 呼び出し
      setFilteredTasks(tasks); // 検索結果をセット
    } else {
      setFilteredTasks([]); // 入力が空なら結果をクリア
    }
  };

  // 検索結果押下時に詳細ページへ遷移
  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`); // 遷移先を正しいパスに設定
    onClose(); // モーダルを閉じる
  };

  return (
    <StyledModal
      open={open}
      onClose={handleModalClose}
      aria-labelledby="search-modal-title"
      aria-describedby="search-modal-description"
      closeAfterTransition
      slots={{ backdrop: StyledBackdrop }}
      disableAutoFocus
    >
      <Fade in={open}>
        <ModalContent>
          {/* クローズボタン */}
          <IconButton
            onClick={handleModalClose}
            sx={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              color: '#999',
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* 検索ボックス */}
          <TextField
            label="タスク名を検索"
            variant="outlined"
            value={searchKeyword}
            onChange={handleSearch} // 入力時に検索処理を実行
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          {filteredTasks.length > 0 ? (<p style={{ color: '#333', fontWeight: 'bold', textAlign: 'center' }}>
            検索結果
          </p>) : (<p></p>)}
          {/* 検索結果 */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: filteredTasks.length > 0 ? '8px' : '0px',
              border: filteredTasks.length > 0 ? '1px solid #ddd' : 'none',
              borderRadius: '8px',
              display: filteredTasks.length === 0 ? 'flex' : 'block',
              alignItems: filteredTasks.length === 0 ? 'center' : 'initial',
              justifyContent: filteredTasks.length === 0 ? 'center' : 'initial',
              // border: 'none'
            }}
          >
            <List>
              {/* 検索結果があるとき */}
              {filteredTasks.length > 0 ? (
                <>
                  {/* 検索結果のタスクリスト */}
                  {filteredTasks.map((task) => (
                    <ListItem key={task.id} button onClick={() => handleTaskClick(task.id)}>
                      <ListItemText primary={task.title} />
                    </ListItem>
                  ))}
                </>
              ) : (
                // 検索結果がないとき
                <p style={{ color: '#999', textAlign: 'center' }}>該当するタスクがありません</p>
              )}
            </List>

          </div>
        </ModalContent>
      </Fade>
    </StyledModal>
  );
};

// モーダルのスタイリング
const StyledModal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled('div')`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    width: 50%;
    height: 60%;
    background-color: ${theme.palette.mode === 'dark' ? '#333' : '#fff'};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    padding: 24px;
    padding-top: 60px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    position: relative;
  `
);

// PropTypesの指定
SearchModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SearchModal;
