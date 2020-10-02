https://d-fischer.github.io/branches/support/4.1/twitch/reference/classes/HelixUserAPI.html#getMe


Generate HTTPS

```
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
```

