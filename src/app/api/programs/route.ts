import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const programs = await prisma.program.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(programs);
  } catch (error) {
    console.error('Fetch programs error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userRole = request.headers.get('x-user-role');
    if (userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { name, code, order, topics } = await request.json();
    
    const newProgram = await prisma.program.create({
      data: { 
        name, 
        code, 
        order: order || 0,
        topics: topics || []
      },
    });
    
    return NextResponse.json(newProgram, { status: 201 });
  } catch (error) {
    console.error('Create program error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
