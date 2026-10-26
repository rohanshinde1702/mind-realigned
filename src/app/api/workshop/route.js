import { NextResponse } from 'next/server';
import { sendEmailNotification } from '@/services/emailService';
import fs from 'fs';
import path from 'path';

// Helper to read env variables dynamically from process.env or .env.local
function getEnvValue(key) {
  if (process.env[key] && process.env[key].trim() !== '') {
    return process.env[key].trim();
  }
  try {
    const envLocalPath = path.join(process.cwd(), '.env.local');
    if (fs.existsSync(envLocalPath)) {
      const content = fs.readFileSync(envLocalPath, 'utf8');
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const idx = trimmed.indexOf('=');
          const k = trimmed.slice(0, idx).trim();
          const v = trimmed.slice(idx + 1).trim();
          if (k === key) {
            return v;
          }
        }
      }
    }
  } catch (err) {
    // Ignore read errors
  }
  return undefined;
}

// Local persistence helper for backup
function saveWorkshopLead(lead) {
  try {
    const dirPath = path.join(process.cwd(), '.data');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const filePath = path.join(dirPath, 'workshop_leads.json');
    let leads = [];
    if (fs.existsSync(filePath)) {
      try {
        leads = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        if (!Array.isArray(leads)) leads = [];
      } catch (e) {
        leads = [];
      }
    }
    leads.push(lead);
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), 'utf8');
  } catch (err) {
    console.warn('Failed to persist workshop lead locally:', err.message);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      topic = 'General',
      firstName = '',
      name = '',
      email = '',
      time = new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'medium',
      }),
    } = body;

    const trimmedName = (firstName || name || '').trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedTopic = (topic || body.topicOfInterest || 'General').trim();

    // Validation
    if (!trimmedName) {
      return NextResponse.json(
        { success: false, error: 'Name is required.' },
        { status: 400 }
      );
    }

    if (!trimmedEmail || !trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const payload = {
      time,
      name: trimmedName,
      email: trimmedEmail,
      topicOfInterest: trimmedTopic,
      // Compatibility aliases
      firstName: trimmedName,
      topic: trimmedTopic,
      selectedCourse: `Workshop: ${trimmedTopic}`,
    };


    // 1. Forward to Google Sheet Webhook
    const webhookUrl = (
      getEnvValue('GOOGLE_SHEET_WORKSHOP_WEBHOOK_URL') ||
      getEnvValue('GOOGLE_SHEET_WEBHOOK_URL')
    )?.trim();

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
          console.warn('Google Sheet workshop webhook returned non-200 status:', response.status);
        }
      } catch (webhookErr) {
        console.error('Failed to forward workshop lead to Google Sheet webhook:', webhookErr);
      }
    } else {
      console.warn(
        'GOOGLE_SHEET_WORKSHOP_WEBHOOK_URL / GOOGLE_SHEET_WEBHOOK_URL not configured. Stored locally:',
        payload
      );
    }

    // 2. Send email notification to owner via EmailJS if configured
    try {
      const targetRecipient = (getEnvValue('EMAILJS_TO_EMAIL') || 'support@mindrealigned.com').trim();
      await sendEmailNotification({
        origin: request.nextUrl?.origin || request.headers.get('origin'),
        templateId:
          getEnvValue('EMAILJS_WORKSHOP_TEMPLATE_ID') ||
          getEnvValue('EMAILJS_TEMPLATE_ID') ||
          getEnvValue('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID'),
        templateParams: {
          to_email: targetRecipient,
          toEmail: targetRecipient,

          name: trimmedName,
          firstName: trimmedName,
          first_name: trimmedName,
          user_name: trimmedName,
          email: trimmedEmail,
          user_email: trimmedEmail,
          reply_to: trimmedEmail,
          replyTo: trimmedEmail,
          topic: trimmedTopic,
          topic_of_interest: trimmedTopic,
          topicOfInterest: trimmedTopic,
          selected_course: `Workshop: ${trimmedTopic}`,
          selectedCourse: `Workshop: ${trimmedTopic}`,
          time,
          date: time,
          subject: `New Workshop Registration: ${trimmedName} (${trimmedTopic})`,
          message: `New Workshop Registration:\n\nTopic of Interest: ${trimmedTopic}\nName: ${trimmedName}\nEmail: ${trimmedEmail}\nTime: ${time}`,
        },
      });
    } catch (emailErr) {
      console.error('Failed to send EmailJS notification for workshop lead:', emailErr);
    }


    // 3. Local persistence backup
    saveWorkshopLead(payload);

    return NextResponse.json({
      success: true,
      message: 'You have been registered for workshop notifications.',
      data: payload,
    });
  } catch (error) {
    console.error('Workshop submission API error:', error);
    return NextResponse.json(
      { success: false, error: 'Unable to process workshop registration.' },
      { status: 500 }
    );
  }
}
