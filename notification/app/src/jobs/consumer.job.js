import { config } from "../config/env.config.js";
import getTemplate from "../utils/getTemplate.js";

export default async (fastify) =>
{
    await fastify.channel.assertQueue(config.queue);

    fastify.channel.consume( config.queue, async (msg) => {
        if (msg) {
            const emailData = JSON.parse(msg.content.toString());

            try {
                console.log('===================== Email Arrived =====================');
                console.log(emailData);
                console.log('===================== Email Arrived =====================');

                emailData.body = await getTemplate(emailData.type, emailData.body);
                await fastify.mailer.sendMail({
                    to: emailData.to,
                    subject: emailData.subject,
                    html: emailData.body
                })
                fastify.channel.ack(msg);
            } catch (error) {
                console.error("Error processing email:", error);
            }
        }
    })
}
