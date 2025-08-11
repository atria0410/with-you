-- Prisma Database Comments Generator v1.3.0

-- users comments
COMMENT ON TABLE "users" IS 'ユーザー';
COMMENT ON COLUMN "users"."id" IS 'ID';
COMMENT ON COLUMN "users"."name" IS 'ユーザー名';
COMMENT ON COLUMN "users"."email" IS 'メールアドレス';
COMMENT ON COLUMN "users"."password" IS 'パスワード';
COMMENT ON COLUMN "users"."created_at" IS '作成日時';
COMMENT ON COLUMN "users"."updated_at" IS '更新日時';

-- chat_logs comments
COMMENT ON TABLE "chat_logs" IS 'チャットログ';
COMMENT ON COLUMN "chat_logs"."id" IS 'ID';
COMMENT ON COLUMN "chat_logs"."userId" IS 'ユーザーID';
COMMENT ON COLUMN "chat_logs"."sender" IS '発信者';
COMMENT ON COLUMN "chat_logs"."message" IS 'メッセージ';
COMMENT ON COLUMN "chat_logs"."created_at" IS '作成日時';
COMMENT ON COLUMN "chat_logs"."updated_at" IS '更新日時';
