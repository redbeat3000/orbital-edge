import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const NASA_API_KEY = process.env.NASA_API_KEY;

router.get('/earth-imagery', async (req, res) => {
  const { lat, lon, date, dim } = req.query;

  try {
    const response = await fetch(
      `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&date=${date}&dim=${dim}&api_key=${NASA_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
