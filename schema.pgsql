-- 택배
CREATE TABLE future_box (
  id SERIAL PRIMARY KEY,
  uuid UUID NOT NULL UNIQUE,
  receiver VARCHAR(100) NOT NULL,
  sender VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 미래의 영화 티켓
CREATE TABLE future_movie_ticket (
  id SERIAL PRIMARY KEY,
  box_id INTEGER REFERENCES future_box(id),
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 쪽지
CREATE TABLE future_note (
  id SERIAL PRIMARY KEY,
  box_id INTEGER REFERENCES future_box(id),
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 미래의 로또 번호
CREATE TABLE future_lotto (
  id SERIAL PRIMARY KEY,
  box_id INTEGER REFERENCES future_box(id), 
  numbers INTEGER[] NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 미래의 발명품
CREATE TABLE future_invention (
  id SERIAL PRIMARY KEY,
  box_id INTEGER REFERENCES future_box(id), 
  name VARCHAR(100) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 홀로그램
CREATE TABLE future_hologram (
  id SERIAL PRIMARY KEY,
  box_id INTEGER REFERENCES future_box(id), 
  message TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 거울
CREATE TABLE future_face_mirror (
  id SERIAL PRIMARY KEY,
  box_id INTEGER REFERENCES future_box(id), 
  year INTEGER,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 미래의 기프티콘
CREATE TABLE future_gifticon (
  id SERIAL PRIMARY KEY,
  box_id INTEGER REFERENCES future_box(id), 
  message TEXT,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);