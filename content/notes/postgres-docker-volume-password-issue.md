---
title: "⚡ TIL: PostgreSQL Docker Volume Password Persistence Issue"
description: "Docker volumes persist data between restarts - changing env vars won't update existing database passwords"
publishedAt: "2024-12-19"
tags: ["til", "postgresql", "docker", "docker-compose", "quick-fix"]
category: "TIL"
readTime: 1
tldr: "Docker volumes persist data between container restarts, so changing POSTGRES_PASSWORD in .env won't work with existing volumes"
---

# ⚡ TIL: PostgreSQL Docker Volume Password Issue

## 💡 The Lesson
**Docker volumes persist data between container restarts.** When PostgreSQL initializes for the first time, it creates the database with the initial password and stores it in the mounted volume. Subsequent restarts use the existing data from the volume, ignoring new environment variables.

## 🔧 Quick Fix

**Nuclear option (starts fresh):**
```bash
# Stop containers and remove volumes
docker-compose down -v

# Start fresh with new password
docker-compose up
```

**Surgical option (keep data):**
```bash
# Connect to running PostgreSQL container
docker exec -it your_postgres_container psql -U postgres

# Change password from inside PostgreSQL
ALTER USER postgres PASSWORD 'new_password';
```

## 🎯 Key Takeaway
> Environment variables only affect the initial setup, not subsequent runs with existing data.

**Never forget:** Docker volumes are persistent storage, not configuration! 