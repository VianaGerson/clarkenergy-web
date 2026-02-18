FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN yarn install --ignore-cache

COPY . .

# 5173 é a porta padrão do Vite
EXPOSE 5173

CMD ["yarn", "run", "dev", "--host"]