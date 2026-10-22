/**
 * EmailJS service for sending notification emails.
 * Supports both:
 * 1. Server-side dispatch (recommended, via EmailJS REST API without exposing keys or facing adblocker issues)
 * 2. Client-side dispatch via @emailjs/browser
 */

import fs from 'fs';
import path from 'path';

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
    // Ignore fs read errors in non-fs environments
  }
  return undefined;
}

/**
 * Server-side / API route EmailJS dispatch
 */
export async function sendEmailNotification({
  serviceId,
  templateId,
  publicKey,
  privateKey,
  origin,
  templateParams = {},
}) {
  const sId = (serviceId || getEnvValue('EMAILJS_SERVICE_ID') || getEnvValue('NEXT_PUBLIC_EMAILJS_SERVICE_ID'))?.trim();
  const tId = (templateId || getEnvValue('EMAILJS_TEMPLATE_ID') || getEnvValue('NEXT_PUBLIC_EMAILJS_TEMPLATE_ID'))?.trim();
  const pKey = (publicKey || getEnvValue('EMAILJS_PUBLIC_KEY') || getEnvValue('NEXT_PUBLIC_EMAILJS_PUBLIC_KEY'))?.trim();
  const privKey = (privateKey || getEnvValue('EMAILJS_PRIVATE_KEY'))?.trim();
  const toEmail = (getEnvValue('EMAILJS_TO_EMAIL') || getEnvValue('NEXT_PUBLIC_EMAILJS_TO_EMAIL'))?.trim();

  if (!sId || !tId || !pKey) {
    console.warn(
      'EmailJS credentials not fully configured (missing serviceId, templateId, or publicKey). Skipping email dispatch.'
    );
    return { skipped: true, reason: 'Credentials not configured' };
  }

  // Ensure to_email is populated if configured
  const finalParams = {
    ...templateParams,
  };
  if (toEmail) {
    finalParams.to_email = toEmail;
    finalParams.toEmail = toEmail;
  }

  const payload = {
    service_id: sId,
    template_id: tId,
    user_id: pKey,
    template_params: finalParams,
  };

  if (privKey) {
    payload.accessToken = privKey;
  }

  const reqOrigin =
    origin ||
    (typeof window !== 'undefined' && window.location?.origin) ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://mindrealigned.com';

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': reqOrigin,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('EmailJS REST API error:', response.status, errorText);
    throw new Error(`EmailJS error (${response.status}): ${errorText}`);
  }

  console.log('✓ EmailJS notification sent successfully to:', toEmail || 'configured recipient in EmailJS template');
  return { success: true };
}

/**
 * Client-side EmailJS dispatch using @emailjs/browser
 */
export async function sendEmailWithEmailJSBrowser({
  serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
  templateParams = {},
}) {
  const sId = serviceId?.trim();
  const tId = templateId?.trim();
  const pKey = publicKey?.trim();

  if (!sId || !tId || !pKey) {
    console.warn('Client EmailJS credentials not set. Skipping.');
    return { skipped: true };
  }

  const emailjs = (await import('@emailjs/browser')).default;
  return emailjs.send(sId, tId, templateParams, pKey);
}
