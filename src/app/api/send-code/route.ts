import { NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(request: Request) {
  try {
    const { phoneNumber, code } = await request.json();
    
    // Log das variáveis de ambiente (sem mostrar valores completos)
    console.log('Verificando configurações:', {
      hasSid: !!process.env.TWILIO_ACCOUNT_SID,
      hasToken: !!process.env.TWILIO_AUTH_TOKEN,
      hasWhatsapp: !!process.env.TWILIO_WHATSAPP_NUMBER,
      receivedPhone: phoneNumber,
      receivedCode: code
    });

    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    // Garante que estamos usando o número do sandbox do Twilio
    const sandboxNumber = '+14155238886';
    const formattedToNumber = `whatsapp:${phoneNumber}`;
    const formattedFromNumber = `whatsapp:${sandboxNumber}`;

    console.log('Tentando enviar mensagem:', {
      to: formattedToNumber,
      from: formattedFromNumber
    });

    const message = await client.messages.create({
      body: `Seu código de verificação é: ${code}`,
      from: formattedFromNumber,
      to: formattedToNumber
    });

    console.log('Resposta do Twilio:', {
      sid: message.sid,
      status: message.status,
      errorCode: message.errorCode,
      errorMessage: message.errorMessage
    });

    return NextResponse.json({ 
      success: true, 
      messageId: message.sid,
      status: message.status 
    });

  } catch (error: any) {
    console.error('Detalhes do erro:', {
      name: error.name,
      message: error.message,
      code: error.code,
      status: error.status,
      moreInfo: error.moreInfo
    });

    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        code: error.code,
        details: {
          status: error.status,
          moreInfo: error.moreInfo
        }
      },
      { status: 500 }
    );
  }
} 