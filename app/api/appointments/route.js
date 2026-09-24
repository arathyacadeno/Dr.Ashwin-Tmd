import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { fullName, phone, primarySymptom, preferredDate, timeSlot, notes } = body;

    // Server-side validation
    if (!fullName || !fullName.trim()) {
      return NextResponse.json(
        { success: false, error: 'Full name is required' },
        { status: 400 }
      );
    }

    if (!phone || !phone.trim() || phone.replace(/\D/g, '').length < 8) {
      return NextResponse.json(
        { success: false, error: 'Valid phone number is required' },
        { status: 400 }
      );
    }

    const appointmentRecord = {
      id: `TMD-${Date.now().toString().slice(-4)}`,
      fullName: fullName.trim(),
      phone: phone.trim(),
      primarySymptom: primarySymptom || 'Jaw Clicking & Pain',
      preferredDate: preferredDate || new Date().toISOString().split('T')[0],
      timeSlot: timeSlot || '10:30 AM',
      notes: notes ? notes.trim() : '',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
    };

    // Log the validated appointment data (Ready for Prisma + PostgreSQL integration)
    console.log('==============================================');
    console.log('[API /api/appointments] New Appointment Received:');
    console.log(JSON.stringify(appointmentRecord, null, 2));
    console.log('==============================================');

    return NextResponse.json(
      {
        success: true,
        message: 'Appointment request received successfully',
        data: appointmentRecord,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[API /api/appointments] Error processing appointment:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
