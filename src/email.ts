import { UniversalNotification } from 'universal-notification'
import * as mailer from 'nodemailer'
import { convertUniversalNotificationToHTML }
  from './convert-universal-notification-to-html'

export interface ISMTPConfig {
  host: string
  port: number
  secure: boolean
  username: string
  password: string
}

export async function sendMail(
  notification: UniversalNotification
, config: ISMTPConfig
, sender: string
, receivers: string[]
): Promise<void> {
  const transporter = createTransport(config)
  await transporter.sendMail({
    from: sender
  , to: receivers
  , subject: notification.title
  , html: convertUniversalNotificationToHTML(notification)
  })
}

export async function verifyConfig(config: ISMTPConfig): Promise<boolean> {
  const transporter = createTransport(config)
  return await transporter.verify()
}

function createTransport(config: ISMTPConfig) {
  const transporter = mailer.createTransport({
    host: config.host
  , port: config.port
  , secure: config.secure
  , auth: {
      user: config.username
    , pass: config.password
    }
  })

  return transporter
}
