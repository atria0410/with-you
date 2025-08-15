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
COMMENT ON COLUMN "chat_logs"."email" IS 'メールアドレス';
COMMENT ON COLUMN "chat_logs"."sender" IS '発信者';
COMMENT ON COLUMN "chat_logs"."message" IS 'メッセージ';
COMMENT ON COLUMN "chat_logs"."created_at" IS '作成日時';
COMMENT ON COLUMN "chat_logs"."updated_at" IS '更新日時';

-- auth_codes comments
COMMENT ON TABLE "auth_codes" IS '認証コード';
COMMENT ON COLUMN "auth_codes"."email" IS 'メールアドレス';
COMMENT ON COLUMN "auth_codes"."password" IS 'パスワード';
COMMENT ON COLUMN "auth_codes"."code" IS '認証コード';
COMMENT ON COLUMN "auth_codes"."expires_at" IS '有効期限';
COMMENT ON COLUMN "auth_codes"."created_at" IS '作成日時';
COMMENT ON COLUMN "auth_codes"."updated_at" IS '更新日時';
