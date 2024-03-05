FROM pierrezemb/gostatic
FROM node:18.18.2
COPY . /srv/http/
CMD ["-port","8080","-https-promote", "-enable-logging"]

COPY . .