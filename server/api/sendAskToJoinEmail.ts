/* eslint-disable no-irregular-whitespace */
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    const templateHTML = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html id="__vue-email" lang="en" dir="ltr">
       <head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <title>Petcation - formularz zgłoszeniowy</title>
          <meta content="Description" name="description">
          <meta content="light" name="color-scheme">
          <meta content="light" name="supported-color-schemes">
          <style data-id="__vue-email-style"> body { background-color: #fff !important; } </style>
       </head>
       <div id="__vue-email-preview" style="display: none; overflow: hidden; line-height: 1px; opacity: 0; max-height: 0; max-width: 0">
          Petcation formularz zgłoszeniowy 
          <div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
       </div>
       <body data-id="__vue-email-body" style="font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif;">
          <table align="center" width="100%" data-id="__vue-email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 37.5em">
             <tbody>
                <tr style="width: 100%">
                   <td>
                      <table align="center" width="100%" data-id="__vue-email-section" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border:1px solid rgb(0,0,0, 0.1);border-radius:3px;overflow:hidden;width:620;">
                         <tbody>
                            <tr>
                               <td>
                                  <table align="center" width="100%" data-id="__vue-email-container" role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width:37.5em;background:linear-gradient(90deg, rgba(255,255,255,1) 35%, rgba(255,198,198,1) 100%);">
                                     <tbody>
                                        <tr style="width: 100%">
                                           <td><img data-id="__vue-email-img" style="display:block;outline:none;border:none;text-decoration:none;margin:25px;" src="https://petcation.netlify.app/images/logo.svg"></td>
                                        </tr>
                                     </tbody>
                                  </table>
                                  <table align="center" width="100%" data-id="__vue-email-row" role="presentation" cellspacing="0" cellpadding="0" border="0" style="padding:20px 40px;padding-bottom:0;">
                                     <tbody style="width: 100%">
                                        <tr style="width: 100%">
                                           <td data-id="__vue-email-column" role="presentation">
                                              <h2 data-id="__vue-email-heading" style="padding-top:18px;font-size:26px;font-weight:bold;"> Otrzymaliśmy nowy formularz zgłoszeniowy! </h2>
                                              <p data-id="__vue-email-text" style="font-size:14px;line-height:24px;margin:16px 0;font-size:16px;word-wrap:break-word;"><b>Data wysłania: </b> December 30, 2023 at 12:40 AM</p>
                                              <p data-id="__vue-email-text" style="font-size:14px;line-height:24px;margin:16px 0;font-size:16px;word-wrap:break-word;margin-top:-5px;"><b>Email kontaktowy: </b> ${body.contactEmail}</p>
                                              <p data-id="__vue-email-text" style="font-size:14px;line-height:24px;margin:16px 0;font-size:16px;word-wrap:break-word;margin-top:-5px;"><b>Telefon kontaktowy: </b> ${body.phoneNumber}</p>
                                              <p data-id="__vue-email-text" style="font-size:14px;line-height:24px;margin:16px 0;font-size:16px;word-wrap:break-word;margin-top:-5px;"><b>Treść zgłoszenia: </b></p>
                                              <p data-id="__vue-email-text" style="font-size:14px;line-height:24px;margin:16px 0;font-size:16px;word-wrap:break-word;"> ${body.message}</p>
                                           </td>
                                        </tr>
                                     </tbody>
                                  </table>
                               </td>
                            </tr>
                         </tbody>
                      </table>
                   </td>
                </tr>
             </tbody>
          </table>
       </body>
    </html>`;
    const data = await resend.emails.send({
      from: 'petcation@resend.dev',
      to: ['drzastwakamil@gmail.com'],
      subject: 'Zgłoszenie hotelowe',
      html: templateHTML,
    });

    return data;
  } catch (error) {
    return { error };
  }
});
