import { d as defineEventHandler, r as readBody } from './nitro/netlify.mjs';
import { Resend } from 'resend';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:url';
import 'ipx';

const resend = new Resend(process.env.RESEND_API_KEY);
const send = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const data = await resend.emails.send({
      from: "petcation@resend.dev",
      to: ["drzastwakamil@gmail.com"],
      subject: "Zg\u0142oszenie hotelowe",
      html: `<strong>${body == null ? void 0 : body.message}</strong>`
    });
    return data;
  } catch (error) {
    return { error };
  }
});

export { send as default };
//# sourceMappingURL=send.mjs.map
