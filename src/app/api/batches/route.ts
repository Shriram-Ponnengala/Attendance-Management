import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const userRole = request.headers.get('x-user-role');
    const userId = request.headers.get('x-user-id');

    let classes;

    if (userRole === 'ADMIN') {
      classes = await prisma.class.findMany({
        include: {
          coach: { select: { username: true } },
          enrollments: { include: { student: { select: { id: true, username: true } } } },
        },
        orderBy: { createdAt: 'desc' },
      });
    } else if (userRole === 'COACH') {
      classes = await prisma.class.findMany({
        where: { coachId: userId! },
        include: {
          coach: { select: { username: true } },
          enrollments: { include: { student: { select: { id: true, username: true } } } },
        },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      // Students see classes they are enrolled in
      classes = await prisma.class.findMany({
        where: { enrollments: { some: { studentId: userId! } } },
        include: {
          coach: { select: { username: true } },
          enrollments: { include: { student: { select: { id: true, username: true } } } },
        },
      });
    }

    // Map to frontend "Batch" structure
    const batches = classes.map((c: any) => ({
      id: c.id,
      name: c.className,
      program: c.program,
      coach: c.coach.username,
      coachId: c.coachId,
      type: c.type,
      days: c.days,
      startTime: c.startTime,
      endTime: c.endTime,
      status: c.status,
      students: c.enrollments.map((e: any) => e.student.id),
      studentDetails: c.enrollments.map((e: any) => ({
        id: e.student.id,
        name: e.student.username
      })),
      createdAt: c.createdAt,
    }));

    return NextResponse.json(batches);
  } catch (error) {
    console.error('Fetch batches error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userRole = request.headers.get('x-user-role');
    if (userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();
    const { name, program, coachId, type, days, startTime, endTime } = body;

    const newClass = await prisma.class.create({
      data: {
        className: name,
        program,
        coachId,
        type,
        days,
        startTime,
        endTime,
      },
      include: {
        coach: { select: { username: true } },
      },
    });

    return NextResponse.json({
      ...newClass,
      name: newClass.className,
      coach: newClass.coach.username,
      students: [],
    }, { status: 201 });
  } catch (error) {
    console.error('Create batch error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
