import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

export async function POST(request, context) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    const { params } = context;
    const { uuid } = await params;
    
    // IP와 User-Agent 정보 가져오기
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0] : '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || '';

    // box_id 조회
    const [box] = await sql`
      SELECT id FROM future_box 
      WHERE uuid = ${uuid}::uuid
    `;

    if (!box) {
      return NextResponse.json(
        { error: '존재하지 않는 FutureBox입니다.' },
        { status: 404 }
      );
    }

    // 로그 기록
    await sql`
      INSERT INTO future_box_open_logs (
        box_id, ip_address, user_agent
      )
      VALUES (
        ${box.id}, ${ipAddress}, ${userAgent}
      )
    `;

    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error logging box open:', error);
    return NextResponse.json(
      { error: '로그 기록 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 