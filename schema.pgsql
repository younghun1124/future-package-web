-- 택배
CREATE TABLE future_box (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  uuid UUID NOT NULL UNIQUE,
  receiver VARCHAR(100) NOT NULL,
  sender VARCHAR(100) NOT NULL,
  is_opened BOOLEAN DEFAULT FALSE,
  future_gifticon_type INT,
  future_value_meter_included BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 쪽지
CREATE TABLE future_note (
  id SERIAL PRIMARY KEY,
  box_id INTEGER REFERENCES future_box(id),
  message TEXT,
  encrypted_message TEXT
);


-- 홀로그램
CREATE TABLE future_hologram (
  id SERIAL PRIMARY KEY,
  box_id INTEGER REFERENCES future_box(id), 
  image_url TEXT NOT NULL,
);

-- 거울
CREATE TABLE future_face_mirror (
  id SERIAL PRIMARY KEY,
  box_id INTEGER REFERENCES future_box(id), 
  year INTEGER,
  image_url TEXT NOT NULL,
);

-- 기프티콘
CREATE TABLE future_gifticon_types (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255) NOT NULL,
  image_url VARCHAR(255) NOT NULL,
  detail_image_url VARCHAR(255) NOT NULL
);

-- 타로
CREATE TABLE future_tarot (
  id SERIAL PRIMARY KEY,
  box_id INTEGER REFERENCES future_box(id),
  indexes INTEGER[] NOT NULL,
  description TEXT NOT NULL
);

-- 향수
CREATE TABLE future_perfume (
  id SERIAL PRIMARY KEY,
  box_id INTEGER REFERENCES future_box(id),
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  keywords VARCHAR(100)[] NOT NULL,
  shape_type INTEGER NOT NULL,
  color INTEGER NOT NULL,
  outline_type INTEGER NOT NULL
);

-- 로깅
CREATE TABLE future_box_open_logs (
  id SERIAL PRIMARY KEY,
  box_id INTEGER REFERENCES future_box(id),
  ip_address VARCHAR(45) NOT NULL,
  user_agent TEXT,
  opened_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE public.access_log (
    id SERIAL NOT NULL,
    access_type VARCHAR(20) NOT NULL,
    content_id BIGINT NOT NULL,
    ip_address VARCHAR(50) NOT NULL,
    user_agent VARCHAR(500),
    access_time TIMESTAMP NOT NULL,
    CONSTRAINT access_log_pkey PRIMARY KEY (id)
);

CREATE TABLE public.future_box_logs (
    id SERIAL NOT NULL,
    box_id INTEGER,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT future_box_logs_pkey PRIMARY KEY (id),
    CONSTRAINT future_box_logs_box_id_fkey
        FOREIGN KEY (box_id)
        REFERENCES public.future_box (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE public.login_log (
    id SERIAL NOT NULL,
    username VARCHAR(50) NOT NULL,
    ip_address VARCHAR(50) NOT NULL,
    user_agent VARCHAR(500),
    login_status VARCHAR(20) NOT NULL,
    attempt_time TIMESTAMP NOT NULL,
    CONSTRAINT login_log_pkey PRIMARY KEY (id)
);