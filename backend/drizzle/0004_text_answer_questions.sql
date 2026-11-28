CREATE TABLE "text_answer_questions" (
	"id" integer PRIMARY KEY NOT NULL,
	"category" "question_category" NOT NULL,
	"prompt" text NOT NULL,
	"answer" text NOT NULL
);
