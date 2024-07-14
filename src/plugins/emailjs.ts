// import { SMTPClient } from 'emailjs';
//
// const client = new SMTPClient({
//     user: 'thaotp2109@gmail.com',
//     password: 'eztbwtufxegjxqys',
//     host: 'thaotp2109@gmail.com',
//     ssl: true,
// });
//
// export interface SendMailProps  {
//     to: string
//     text:string,
//     subject: string,
//     html: string
// }
//
// export async function sendMail( {to, subject, html,text}: SendMailProps){
//     try{
//         const response = await client.sendAsync({
//             text: text,
//             from: import.meta.env.VITE_APP_AUTH_EMAIL,
//             to: to,
//             subject: subject,
//             attachments:[
//                 {
//                     data:html
//                 }
//             ]
//         });
//         console.log(response);
//     }catch (err) {
//         console.error(err);
//     }
//
// }
