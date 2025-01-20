import { neon } from '@neondatabase/serverless';

let cachedGifticonTypes = [];

export const loadGifticonTypes = async () => {
  if (cachedGifticonTypes.length === 0) {
    const sql = neon(process.env.DATABASE_URL);
    const gifticonTypes = await sql`SELECT * FROM future_gifticon_type`;
    cachedGifticonTypes = gifticonTypes;
  }
  return cachedGifticonTypes;
};

export const FUTURE_GIFTICON_TYPES = () => cachedGifticonTypes; 