# 기본 이미지
FROM node:21-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 프로젝트 파일 복사
COPY package*.json ./

# 종속성 설치
RUN npm install

# 프로젝트 파일 복사 (package.json 제외)
COPY . .

# 빌드 명령 실행 (Next.js 14+ App Router 기준)
RUN npm run build

# 포트 설정 (기본값 3000)
EXPOSE 3000

# 컨테이너 시작 명령
CMD ["npm", "run", "start"]