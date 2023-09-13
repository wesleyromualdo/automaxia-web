FROM node:18.17.1 AS build

WORKDIR /app
COPY tsconfig.json ./
COPY package*.json ./
RUN npm install
COPY . /app/

RUN npm install -g @angular/cli

RUN npm run build

### STAGE 2: Build ###
FROM nginx:1.21.6-alpine

RUN rm -rf /usr/share/nginx/html/*

COPY ./default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY --from=build  app/dist/* .

RUN ls -la

RUN chgrp -R 0 /usr/share/nginx && \
  chmod -R g=u /usr/share/nginx && \
  chgrp -R 0 /var/cache/nginx && \
  chmod -R g=u /var/cache/nginx && \
  chgrp -R 0 /var/run && \
  chmod -R g=u /var/run && \
  chmod -R 775 /usr/share/nginx/html

USER 1001

EXPOSE 8080

CMD /bin/sh -c "nginx -g 'daemon off;'"