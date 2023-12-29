import { Resend } from 'resend';
import { config } from '@vue-email/compiler';

const vueEmail = config('./emails', {
  verbose: false,
  options: {
    baseUrl: 'https://vue-email-demo.vercel.app/',
  },
});
const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const template = await vueEmail.render('hotelAsksToJoin.vue', {
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
    return { error };
  }
});
