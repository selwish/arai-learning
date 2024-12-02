-- CREATE TABLE task_type (
--   id int(2) NOT NULL,
--   type varchar(20) NOT NULL,
--   comment varchar(50) DEFAULT NULL,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE task (
--   id int(5) NOT NULL AUTO_INCREMENT,
--   user_id int(5) NOT NULL,
--   type_id int(2) NOT NULL,
--   title varchar(50) NOT NULL,
--   detail text,
--   deadline datetime NOT NULL,
--   PRIMARY KEY (id)
-- ) ;

-- CREATE TABLE user (
--   id int(11) NOT NULL AUTO_INCREMENT,
--   username varchar(50) NOT NULL,
--   email varchar(70) NOT NULL,
--   password varchar(60) NOT NULL,
--   enabled tinyint(1) NOT NULL,
--   authority varchar(50) NOT NULL,
--   tempkey varchar(255) DEFAULT NULL,
--   PRIMARY KEY (id)
-- );

CREATE TABLE task_type (
  id int(2) NOT NULL,
  type varchar(20) NOT NULL,
  comment varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
);

-- ユーザ情報
CREATE TABLE Users (
  user_id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL,
  password varchar(60) NOT NULL,
  enabled tinyint(1) NOT NULL,
  authority varchar(50) NOT NULL,
  tempkey varchar(255) DEFAULT NULL,
  PRIMARY KEY (user_id)
);

-- リストテーブル
CREATE TABLE Lists (
    list_id INTEGER PRIMARY KEY AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL, --リスト名
    icon VARCHAR(10),  -- 絵文字やアイコン
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- タスク情報
CREATE TABLE Task (
  task_id INTEGER IDENTITY PRIMARY KEY,
  user_id INTEGER NOT NULL,
  list_id INTEGER NOT NULL,  -- この列を追加
  type_id INTEGER,           --元々あったtask_typeテーブルの参照用項目
  title VARCHAR(100) NOT NULL,
  description TEXT, --詳細
  due_date DATETIME NOT NULL, --期日
  priority INTEGER CHECK (priority BETWEEN 1 AND 4), --優先度
  is_pinned BOOLEAN DEFAULT 0, --ピン留め用フラグ
  is_completed BOOLEAN DEFAULT 0, --完了フラグ
  is_delete BOOLEAN DEFAULT 0, --削除フラグ
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 作成日時
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 更新日時

  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (list_id) REFERENCES Lists(list_id)  -- Listsテーブルを参照
);

-- タグテーブル
CREATE TABLE Tags (
    tag_id INTEGER IDENTITY PRIMARY KEY ,
    user_id INTEGER NOT NULL,
    name VARCHAR(50) NOT NULL, --タグ名
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- タスクとタグの中間テーブル
CREATE TABLE TaskTags (
    task_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,

    PRIMARY KEY (task_id, tag_id),
    FOREIGN KEY (task_id) REFERENCES Task(task_id),
    FOREIGN KEY (tag_id) REFERENCES Tags(tag_id)
);
