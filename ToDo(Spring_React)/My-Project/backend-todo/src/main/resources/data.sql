-- task_type テーブルにデータを挿入
INSERT INTO task_type (id, type, comment) VALUES
(1, '仕事', '仕事関連のタスク'),
(2, '個人', '個人のタスク'),
(3, '勉強', '勉強関連のタスク');

-- Users テーブルにデータを挿入
INSERT INTO Users (username, password, enabled, authority) VALUES
('アリス', 'password123', 1, 'USER'),
('ボブ', 'password456', 1, 'USER'),
('チャーリー', 'password789', 1, 'ADMIN');

-- Lists テーブルにデータを挿入
INSERT INTO Lists (user_id, name, icon) VALUES
(1, '仕事のタスク', '💼'),
(1, '個人のタスク', '🏠'),
(2, '買い物リスト', '🛒'),
(3, '管理者タスク', '⚙️');

-- Task テーブルにデータを挿入
INSERT INTO Task (user_id, list_id, type_id, title, description, due_date, priority) VALUES
(1, 1, 1, '報告書を仕上げる', '月次報告書を完成させる', '2024-11-30 18:00:00', 1),
(1, 2, 2, '食料品を買う', '今週の食料品を買う', '2024-11-27 10:00:00', 3),
(2, 3, 1, 'クライアントミーティング', 'オフィスでのクライアントミーティングに出席', '2024-11-25 14:00:00', 2),
(3, 4, 3, '試験勉強', '来週の試験に備えて勉強する', '2024-12-05 09:00:00', 4);

-- Tags テーブルにデータを挿入
INSERT INTO Tags (user_id, name) VALUES
(1, '緊急'),
(1, '重要'),
(2, '買い物'),
(3, '勉強');

-- TaskTags テーブルにデータを挿入
INSERT INTO TaskTags (task_id, tag_id) VALUES
(1, 1),  -- 報告書を仕上げる - 緊急
(1, 2),  -- 報告書を仕上げる - 重要
(2, 3),  -- 食料品を買う - 買い物
(3, 4);  -- 試験勉強 - 勉強
