import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      surname,
      mobile,
      customerType,
      address,
      message,
      listingTitle,
      listingType,
      listingId,
    } = body;

    // Validate required fields
    if (!name || !mobile || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email to admin
    const { data, error } = await resend.emails.send({
      from: 'West Berg Europe <noreply@westberg-eu.de>', // Change this to your verified domain
      to: ['ceo@westberg-eu.de'], // Your email
      replyTo: mobile.includes('@') ? mobile : undefined,
      subject: `New Inquiry: ${listingTitle || 'Contact Form'}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
              .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
              .field { margin-bottom: 20px; }
              .label { font-weight: bold; color: #1e3a8a; margin-bottom: 5px; }
              .value { background: white; padding: 12px; border-radius: 6px; border-left: 3px solid #3b82f6; }
              .footer { background: #374151; color: #9ca3af; padding: 20px; text-align: center; font-size: 12px; border-radius: 0 0 8px 8px; }
              .listing-info { background: #eff6ff; padding: 15px; border-radius: 6px; margin-bottom: 20px; border: 1px solid #bfdbfe; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1 style="margin: 0;">🚗 New Customer Inquiry</h1>
                <p style="margin: 10px 0 0 0;">West Berg Europe</p>
              </div>
              
              <div class="content">
                ${listingTitle ? `
                  <div class="listing-info">
                    <strong>📋 Listing Information:</strong><br/>
                    <strong>Title:</strong> ${listingTitle}<br/>
                    <strong>Type:</strong> ${listingType}<br/>
                    ${listingId ? `<strong>ID:</strong> ${listingId}` : ''}
                  </div>
                ` : ''}

                <h2 style="color: #1e3a8a; margin-top: 0;">Customer Details</h2>
                
                <div class="field">
                  <div class="label">👤 Name:</div>
                  <div class="value">${name} ${surname || ''}</div>
                </div>

                <div class="field">
                  <div class="label">📞 Mobile:</div>
                  <div class="value">${mobile}</div>
                </div>

                ${customerType ? `
                  <div class="field">
                    <div class="label">🏢 Customer Type:</div>
                    <div class="value">${customerType === 'individual' ? 'Private Person' : 'Business Customer'}</div>
                  </div>
                ` : ''}

                ${address ? `
                  <div class="field">
                    <div class="label">📍 Address:</div>
                    <div class="value">${address}</div>
                  </div>
                ` : ''}

                <div class="field">
                  <div class="label">💬 Message:</div>
                  <div class="value">${message.replace(/\n/g, '<br>')}</div>
                </div>
              </div>

              <div class="footer">
                <p>This email was sent from the West Berg Europe contact form.<br/>
                Please respond to the customer as soon as possible.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

