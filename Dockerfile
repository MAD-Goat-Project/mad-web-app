
FROM node:16-alpine
WORKDIR /app
COPY . .

RUN yarn ci
RUN yarn run build

EXPOSE 3000
CMD [ "npx", "serve", "dist" ]
