# 📚 READ ME

## 📌 프로젝트 개요

👉🏼 **[ERD]**
👉🏼 **[ERD]**
👉🏼 **[ERD]**

### 🔧 개발 기간

### 📁 Directory Structure: 폴더 구조

```bash
.
├── .env
├── .gitignore
├── .prettierrc
├── middlewares
│   ├── errorhandler.Middleware.js
│   └── jwt-validate.Middleware.js
│   └── auth.Middleware.js
└── repositories
│   ├── resumes.repository.js
│   └── users.repository.js
└── services
│   ├── resumes.service.js
│   └── users.service.js
└── controllers
│   ├── resumes.controller.js
│   └── users.controller.js
└── routers
│   ├── resumes.router.js
│   └── users.router.js
└── uils
│   └── prisma
│       └── index.js
└── prisma
│   └── schema.prisma
└── redis
│   ├── client.js
│   └── keys.js
├── tests
│   ├── data
│   │   ├── all-resumes.data.json
│   │   ├── new-resume.data.json
│   │   ├── all-users.data.json
│   │   └── new-user.data.json
│   ├── integration
│   └── unit
│       ├── repositories
│       │   └── resumes.repository.uint.spec.js
│       ├── services
│       │   └── resumes.service.uint.spec.js
│       └── controllers
│           └── resumes.controller.uint.spec.js
├── app.js
├── swagger-output.json
├── swagger.js
├── package-lock.json
└── package.json

```
