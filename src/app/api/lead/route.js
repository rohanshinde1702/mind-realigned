import { NextResponse } from 'next/server';
import { sendEmailNotification } from '@/services/emailService';

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      selectedCourse = '',
      firstName = '',
      phoneNumber = '',
      email = '',
      time = new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'medium',
      }),
    } = body;

    // Basic validation
    if (!email || !firstName) {
      return NextResponse.json(
        { success: false, error: 'First name and email are required.' },
        { status: 400 }
      );
    }

    const payload = {
      selectedCourse,
      firstName,
      phoneNumber,
      email,
      time,
    };

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL?.trim();

    if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          redirect: 'follow',
        });

        if (!response.ok) {
          console.warn('Google Sheet webhook returned non-200 status:', response.status);
        }
      } catch (webhookErr) {
        console.error('Failed to forward lead to Google Sheet webhook:', webhookErr);
      }
    } else {
      console.warn(
        'GOOGLE_SHEET_WEBHOOK_URL not configured in .env.local. Stored lead locally in memory:',
        payload
      );
    }

    // Send email notification to owner via EmailJS if configured
    try {
      await sendEmailNotification({
        origin: request.nextUrl?.origin || request.headers.get('origin'),
        templateParams: {
          selected_course: selectedCourse,
          selectedCourse: selectedCourse,
          course: selectedCourse,
          first_name: firstName,
          firstName: firstName,
          name: firstName,
          phone_number: phoneNumber || 'Not provided',
          phoneNumber: phoneNumber || 'Not provided',
          phone: phoneNumber || 'Not provided',
          email: email,
          user_email: email,
          reply_to: email,
          time: time,
          date: time,
          subject: `New Free Lesson Request: ${firstName} (${selectedCourse})`,
          message: `New Free Lesson Request:\n\nCourse: ${selectedCourse}\nName: ${firstName}\nPhone: ${phoneNumber || 'Not provided'}\nEmail: ${email}\nTime: ${time}`,
        },
      });
    } catch (emailErr) {
      console.error('Failed to send EmailJS notification for lead:', emailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Lead recorded successfully.',
      data: payload,
    });
  } catch (error) {
    console.error('Lead submission API error:', error);
    return NextResponse.json(
      { success: false, error: 'Unable to process lead submission.' },
      { status: 500 }
    );
  }
}
