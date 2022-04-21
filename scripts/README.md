
# Install TLS on Istio to authenticate with IAM
```
cd scripts
./cert-generator.sh
./install-k8s-with-istio.zsh
cd ../deploy
tilt up
```

### Issues
the redirect is rejected because it won't accept the url of fe.alpha.kidsloop.net:8443

Presumably the port number is the issue.
