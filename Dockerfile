FROM node as build


WORKDIR /code

ADD package.json .
ADD package-lock.json .
ADD tsconfig.json .

RUN npm install

ADD . .


RUN npm run build

FROM nginx:alpine


COPY --from=build /code/build/ /usr/share/nginx/html
ADD nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 5000
