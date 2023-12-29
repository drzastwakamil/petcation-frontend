import { Resend } from 'resend';
import { useCompiler } from '#vue-email';

const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    console.log('thats the body', body);
    const template = await useCompiler('hotelAsksToJoin.vue', {
      props: {
        date: body.date,
        contactEmail: body.contactEmail,
        phoneNumber: body.phoneNumber,
        message: body.message || '<p style="color: red"> Nie znaleziono wiadomości <p>',
      },
    });
    const data = await resend.emails.send({
      from: 'petcation@resend.dev',
      to: ['drzastwakamil@gmail.com'],
      subject: 'Zgłoszenie hotelowe',
      html: template.html,
    });

    return data;
  } catch (error) {
    console.log('🚨 error', error);
    return { error };
  }
});
