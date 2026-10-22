import { NextResponse } from 'next/server';
import { sendEmailNotification } from '@/services/emailService';
import fs from 'fs';
import path from 'path';

// Helper to read env variables dynamically
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
  } catch (err) {}
  return undefined;
}

// Helper to get cached subscribers
function getSubscribers() {
  try {
    const filePath = path.join(process.cwd(), '.data', 'subscribers.json');
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      const list = JSON.parse(data);
      if (Array.isArray(list)) {
        return new Set(list.map((e) => (e || '').toLowerCase()));
      }
    }
  } catch (err) {
    // Ignore read errors
  }
  return new Set();
}

// Helper to persist subscriber
function saveSubscriber(email) {
  try {
    const dirPath = path.join(process.cwd(), '.data');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const filePath = path.join(dirPath, 'subscribers.json');
    const set = getSubscribers();
    set.add(email.toLowerCase());
    fs.writeFileSync(filePath, JSON.stringify([...set], null, 2), 'utf8');
  } catch (err) {
    console.warn('Failed to persist subscriber locally:', err.message);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      email = '',
      time = new Date().toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'medium',
      }),
      type = 'newsletter',
      source = 'substack',
    } = body;

    // Validate email format
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !normalizedEmail.includes('@') || !normalizedEmail.includes('.')) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    // 1. Enforce unique subscriber per email
    const existingSubscribers = getSubscribers();
    if (existingSubscribers.has(normalizedEmail)) {
      return NextResponse.json(
        {
          success: false,
          error: 'You are already subscribed with this email address.',
        },
        { status: 409 }
      );
    }

    const payload = {
      type,
      source,
      email: normalizedEmail,
      time,
    };

    // 2. Forward to Google Sheet Webhook
    const webhookUrl = (
      process.env.GOOGLE_SHEET_NEWSLETTER_WEBHOOK_URL ||
      process.env.GOOGLE_SHEET_WEBHOOK_URL
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

        if (response.ok) {
          try {
            const result = await response.json();
            if (result.status === 'duplicate') {
              saveSubscriber(normalizedEmail);
              return NextResponse.json(
                {
                  success: false,
                  error: 'You are already subscribed with this email address.',
                },
                { status: 409 }
              );
            }
          } catch (jsonErr) {
            // Text or non-JSON response from Google Apps Script
          }
        } else {
          console.warn('Google Sheet newsletter webhook returned non-200 status:', response.status);
        }
      } catch (webhookErr) {
        console.error('Failed to forward newsletter subscriber to Google Sheet webhook:', webhookErr);
      }
    } else {
      console.warn(
        'GOOGLE_SHEET_NEWSLETTER_WEBHOOK_URL / GOOGLE_SHEET_WEBHOOK_URL not configured. Subscribed locally:',
        payload
      );
    }

    // 3. Send email notification to owner via EmailJS if configured
    try {
      await sendEmailNotification({
        origin: request.nextUrl?.origin || request.headers.get('origin'),
        templateId:
          getEnvValue('EMAILJS_NEWSLETTER_TEMPLATE_ID') ||
          getEnvValue('EMAILJS_TEMPLATE_ID') ||
          getEnvValue('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID'),
        templateParams: {
          selected_course: 'Substack Newsletter Subscription',
          selectedCourse: 'Substack Newsletter Subscription',
          course: 'Substack Newsletter Subscription',
          first_name: 'Substack Subscriber',
          firstName: 'Substack Subscriber',
          name: 'Substack Subscriber',
          phone_number: 'N/A (Newsletter)',
          phoneNumber: 'N/A (Newsletter)',
          phone: 'N/A (Newsletter)',
          email: normalizedEmail,
          user_email: normalizedEmail,
          reply_to: normalizedEmail,
          time,
          date: time,
          source: 'Ashika’s Substack by email',
          subject: `New Substack Subscriber: ${normalizedEmail}`,
          message: `New Substack Newsletter Subscription:\n\nEmail: ${normalizedEmail}\nTime: ${time}\nSource: Ashika’s Substack by email`,
        },
      });
    } catch (emailErr) {
      console.error('Failed to send EmailJS notification for newsletter:', emailErr);
    }

    // 4. Save subscriber in local store to prevent future duplicates
    saveSubscriber(normalizedEmail);

    return NextResponse.json({
      success: true,
      message: 'Subscribed successfully.',
      data: payload,
    });
  } catch (error) {
    console.error('Newsletter submission API error:', error);
    return NextResponse.json(
      { success: false, error: 'Unable to process subscription.' },
      { status: 500 }
    );
  }
}
