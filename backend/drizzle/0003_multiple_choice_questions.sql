CREATE TABLE "multiple_choice_questions" (
	"id" integer PRIMARY KEY NOT NULL,
	"category" "question_category" NOT NULL,
	"prompt" text NOT NULL,
	"options" text[] NOT NULL,
	"answer" text NOT NULL
);
