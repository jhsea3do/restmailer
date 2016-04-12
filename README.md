# restmailer

```shell

$ printf '
{
  "from": "xxx@xxx.com",
  "host": "smtp.xxx.com",
  "port": 25,
  "secure": false,
  "auth": {
    "user": "xxx@xxx.com",
    "pass": "xxxxxx"
  } 
}
' > conf.json.1
$ sh bin/start

$ curl -X POST -H 'content-Type: application/json' \
-d '{ "subject": "test adfsdfsdf", "text": "OK adffdsfdsfs", "to": "a1@gmail.com, a2@gmail.com" }' \
http://localhost:3000/api/mailto

```
