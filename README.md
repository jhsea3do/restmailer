# restmailer

```shell
$ sh bin/start
$ curl -X POST -H 'content-Type: application/json' \
-d '{ "subject": "test adfsdfsdf", "text": "OK adffdsfdsfs", "to": "a1@gmail.com, a2@gmail.com" }' \
http://localhost:3000/api/mailto
```
