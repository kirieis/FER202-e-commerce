# Workspace Rules & Guidelines

## 1. Quy định về Git & Commit GitHub
- **TUYỆT ĐỐI KHÔNG TỰ ĐỘNG COMMIT**: AI / Assistant không được tự ý chạy các lệnh `git commit` hoặc `git push`.
- **Quyền Commit**: Chỉ có người dùng (User) mới được thực hiện commit và push lên GitHub.
- **Nhiệm vụ của AI**:
  - Khi cần commit code hoặc hoàn tất một tính năng, AI chỉ được phép gợi ý nội dung commit message (theo chuẩn Conventional Commits) và cú pháp câu lệnh `git commit` tương ứng.
  - Trình bày rõ ràng để người dùng tự copy, kiểm tra và tự thực thi commit.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
