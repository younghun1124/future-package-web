-- 택배
CREATE TABLE future_box (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  uuid UUID NOT NULL UNIQUE,
  receiver VARCHAR(100) NOT NULL,
  sender VARCHAR(100) NOT NULL,
  is_opened BOOLEAN DEFAULT FALSE,
  future_movie_type INT,
  future_gifticon_type INT,
  future_invention_type INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 쪽지
CREATE TABLE future_note (
  id SERIAL PRIMARY KEY,
  box_id INTEGER REFERENCES future_box(id),
  message TEXT NOT NULL,
);

-- 미래의 로또 번호
CREATE TABLE future_lotto (
  id SERIAL PRIMARY KEY,
  box_id INTEGER REFERENCES future_box(id), 
  numbers INTEGER[] NOT NULL,
);

-- 홀로그램
CREATE TABLE future_hologram (
  id SERIAL PRIMARY KEY,
  box_id INTEGER REFERENCES future_box(id), 
  message TEXT,
  image_url TEXT NOT NULL,
);

-- 거울
CREATE TABLE future_face_mirror (
  id SERIAL PRIMARY KEY,
  box_id INTEGER REFERENCES future_box(id), 
  year INTEGER,
  image_url TEXT NOT NULL,
);