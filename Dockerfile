FROM node:18.14.2

RUN mkdir -p /app
WORKDIR /app
ADD . /app/

RUN set http_proxy=
RUN set https_proxy=
RUN yarn config delete proxy
RUN npm config rm https-proxy
RUN npm config rm proxy
RUN yarn cache clean
RUN yarn install --network-timeout 6000000 --immutable --immutable-cache --check-cache
RUN yarn build

ENV HOST 0.0.0.0
ENV NODE_ENV=prod
EXPOSE 3601

CMD [ "yarn", "start:prod"]