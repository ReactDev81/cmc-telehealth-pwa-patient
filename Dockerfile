FROM node:20-alpine

WORKDIR /app

ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

COPY package*.json ./
RUN npm install

COPY . .

RUN printf "NEXT_PUBLIC_API_BASE_URL=%s\n" "$NEXT_PUBLIC_API_BASE_URL" > .env.production
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
