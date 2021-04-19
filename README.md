# send-universal-notification-to-email

Command-line [UniversalNotification] to email forwarder.

[UniversalNotification]: https://github.com/UniversalNotification/spec

## Install

```sh
npm install -g send-universal-notification-to-email
# or
yarn global add send-universal-notification-to-email
```

### Install from source

```sh
yarn install
yarn build
yarn global add "file:$(pwd)"
```

## Usage

`send-universal-notification-to-email` parses the text stream line by line from stdin.

```sh
echo '{ "message": "Hello World" }' | send-universal-notification-to-email \
  --host 'smtp.example.com' \
  --port '465' \
  --secure \
  --username 'username' \
  --password 'password' \
  --sender 'sender@server.com' \
  --recipient 'recipient1@server.com' \
  --recipient 'recipient2@server.com'
```
