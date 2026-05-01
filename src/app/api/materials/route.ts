import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const userRole = request.headers.get('x-user-role');
    const userId = request.headers.get('x-user-id');

    let materials;

    if (userRole === 'ADMIN') {
      materials = await prisma.material.findMany({
        include: {
          class: { select: { className: true } },
          uploader: { select: { username: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
    } else if (userRole === 'COACH') {
      materials = await prisma.material.findMany({
        where: { uploadedBy: userId! },
        include: {
          class: { select: { className: true } },
          uploader: { select: { username: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      // Students see materials for classes they are enrolled in
      materials = await prisma.material.findMany({
        where: {
          OR: [
            { classId: null }, // Global materials
            { class: { enrollments: { some: { studentId: userId! } } } }
          ]
        },
        include: {
          class: { select: { className: true } },
          uploader: { select: { username: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
    }

    return NextResponse.json(materials);
  } catch (error) {
    console.error('Fetch materials error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const userId = request.headers.get('x-user-id');
    const { title, fileUrl, classId } = await request.json();

    const newMaterial = await prisma.material.create({
      data: {
        title,
        fileUrl,
        classId: classId || null,
        uploadedBy: userId!,
      },
    });

    return NextResponse.json(newMaterial, { status: 201 });
  } catch (error) {
    console.error('Create material error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
