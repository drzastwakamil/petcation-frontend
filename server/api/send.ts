import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const data = await resend.emails.send({
      from: 'petcation@resend.dev',
      to: ['drzastwakamil@gmail.com'],
      subject: 'Zgłoszenie hotelowe',
      html: `<strong>${body?.message}</strong>`,
    });

    return data;
  } catch (error) {
    return { error };
  }
});
