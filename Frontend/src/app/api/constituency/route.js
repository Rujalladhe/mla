import pool from '@/lib/db';

export async function POST(request) {
  try {
    const { constituency_no, constituency_name } = await request.json();

    const result = await pool.query(
      'INSERT INTO Constituency (constituency_no, constituency_name) VALUES ($1, $2) RETURNING *',
      [constituency_no, constituency_name]
    );

    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to insert' }), {
      status: 500,
    });
  }
}
