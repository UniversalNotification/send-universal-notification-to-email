#!/usr/bin/env node
import { program } from 'commander'
import { sendMail, verifyConfig, ISMTPConfig } from './email'
import * as readline from 'readline'
import { parseUniversalNotification } from 'universal-notification'
import { assert } from '@blackglory/errors'

program
  .name('send-universal-notification-to-email')
  .version(require('../package.json').version)
  .description(require('../package.json').description)
  .option('--host <host>', 'SMTP host')
  .option('--port <port>', 'SMTP port')
  .option('--secure', 'SMTP secure')
  .option('--username <username>', 'SMTP username')
  .option('--password <password>', 'SMTP password')
  .option(
    '--sender <sender>'
  , `plain 'sender@server.com' or formatted '"Sender Name" sender@server.com'`
  )
  .option('--recipient <recipient>', `plain 'recipient@server.com'`, collect, [])
  .action(async () => {
    const opts = program.opts()
    const host: string = opts.host
    assert(/^\d+$/.test(opts.port), 'The parameter port must be a integer.')
    const port: number = Number.parseInt(opts.port, 10)
    const secure: boolean = opts.secure
    const username: string = opts.username
    const password: string = opts.password
    const sender: string = opts.sender
    const recipients: string[] = opts.recipient
    assert(
      recipients.length > 0
    , 'In order to send emails, there must be at least one recipient.'
    )
    const config: ISMTPConfig = { host, port, secure, username, password }
    assert(
      await verifyConfig(config)
    , 'SMTP configuration verification failed.'
    )

    const stdin = readline.createInterface({ input: process.stdin })
    for await (const line of stdin) {
      const notification = parseUniversalNotification(line)
      if (notification) {
        await sendMail(
          notification
        , config
        , sender
        , recipients
        )
      } else {
        console.error(`"${line}" is not a valid UniversalNotification object.`)
      }
    }
  })
  .parse()

function collect(value: string, previous: string[]) {
  return previous.concat([value])
}
