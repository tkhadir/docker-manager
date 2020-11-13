# docker-manager

# how to enable docker api engine ?

 - vi /lib/systemd/system/docker.service
 - ExecStart=/usr/bin/dockerd -H=fd:// -H=tcp://0.0.0.0:5555
 - save the file
 - systemctl daemon-reload
 - sudo service docker restart

# demo
