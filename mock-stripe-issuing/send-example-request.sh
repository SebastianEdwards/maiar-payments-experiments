echo "Must respond in less than 2 seconds:":
time curl -X POST -H "Content-Type: application/json" -d @./example-request.json http://localhost:5100/authorize
