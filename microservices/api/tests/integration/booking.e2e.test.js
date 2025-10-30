'use strict';
const axios = require('axios');

const BASE_URL = process.env.API_URL || 'http://localhost:5000/api/bookings';
const WAIT = (ms) => new Promise((r) => setTimeout(r, ms));

describe('🧩 E2E Booking Flow (API + Kafka + Booking Service + DB)', () => {
  let bookingId = null;
  let testTime = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // через 1 час

  test('POST /api/bookings → создаёт бронь (stage = CREATED)', async () => {
    const payload = {
      restaurant: 'Creative Paradise Cafe',
      number_of_guests: 2,
      time: testTime,
    };

    const response = await axios.post(BASE_URL, payload);
    expect(response.status).toBe(201);
    expect(response.data.booking.stage).toBe('CREATED');

    bookingId = response.data.booking.id;
    console.log(`🆕 Создана бронь ID=${bookingId}, stage=CREATED`);
  });

  test('GET /api/bookings/:id → статус обновляется до CONFIRMED или REJECTED', async () => {
    expect(bookingId).not.toBeNull();

    let finalStage = null;
    for (let i = 0; i < 10; i++) {
      const res = await axios.get(`${BASE_URL}/${bookingId}`);
      const stage = res.data.stage;
      console.log(`⏳ Попытка ${i + 1}: stage=${stage}`);
      if (stage === 'CONFIRMED' || stage === 'REJECTED') {
        finalStage = stage;
        break;
      }
      await WAIT(2000); // 2 секунды между попытками
    }

    expect(['CONFIRMED', 'REJECTED']).toContain(finalStage);
    console.log(`✅ Бронь ID=${bookingId} → ${finalStage}`);
  });

  test('POST дубликата (тот же ресторан и время) → новая бронь REJECTED', async () => {
    const payload = {
      restaurant: 'Creative Paradise Cafe',
      number_of_guests: 3,
      time: testTime,
    };

    const res = await axios.post(BASE_URL, payload);
    const duplicateId = res.data.booking.id;
    console.log(`🆕 Попробовали дубликат ID=${duplicateId}, ждем статус...`);

    let finalStage = null;
    for (let i = 0; i < 10; i++) {
      const r = await axios.get(`${BASE_URL}/${duplicateId}`);
      const stage = r.data.stage;
      console.log(`⏳ Дубликат попытка ${i + 1}: stage=${stage}`);
      if (stage === 'CONFIRMED' || stage === 'REJECTED') {
        finalStage = stage;
        break;
      }
      await WAIT(2000);
    }

    expect(finalStage).toBe('REJECTED');
    console.log(`🚫 Дубликат ID=${duplicateId} → ${finalStage}`);
  });
});
