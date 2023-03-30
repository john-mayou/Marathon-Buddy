CREATE TABLE "public.users" (
	"id" serial NOT NULL,
	"email" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"access_level" varchar(60) NOT NULL DEFAULT 'user',
	"email_verified" BOOLEAN NOT NULL DEFAULT 'FALSE',
	"strava_connected" BOOLEAN NOT NULL DEFAULT 'FALSE',
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.cohorts" (
	"id" serial NOT NULL,
	"name" varchar(60) NOT NULL,
	"start_date" DATE NOT NULL,
	"is_current" BOOLEAN NOT NULL DEFAULT 'FALSE',
	CONSTRAINT "cohorts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.users_cohorts" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL,
	"cohort_id" int NOT NULL,
	"subscription_id" varchar(255) NOT NULL,
	"daily_stake" int NOT NULL,
	"duration" int NOT NULL,
	CONSTRAINT "users_cohorts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.email_otps" (
	"id" serial NOT NULL,
	"email" varchar(255) NOT NULL,
	"code" varchar(255) NOT NULL,
	CONSTRAINT "email_otps_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.strava_tokens" (
	"id" serial NOT NULL,
	"user_id" int NOT NULL UNIQUE,
	"refresh_token" varchar(255) NOT NULL,
	"access_token" varchar(255) NOT NULL,
	CONSTRAINT "strava_tokens_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.training_planned" (
	"id" serial NOT NULL,
	"users_cohorts_id" int NOT NULL,
	"date" DATE NOT NULL,
	"miles_planned" int NOT NULL,
	CONSTRAINT "training_planned_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.training_actual" (
	"id" serial NOT NULL,
	"users_cohorts_id" int NOT NULL,
	"date" DATE NOT NULL,
	"miles_actual" int NOT NULL,
	CONSTRAINT "training_actual_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.charges" (
	"id" serial NOT NULL,
	"users_cohorts_id" int NOT NULL,
	"date" DATE NOT NULL,
	"amount" int NOT NULL,
	CONSTRAINT "charges_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);





ALTER TABLE "users_cohorts" ADD CONSTRAINT "users_cohorts_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "users_cohorts" ADD CONSTRAINT "users_cohorts_fk1" FOREIGN KEY ("cohort_id") REFERENCES "cohorts"("id");


ALTER TABLE "strava_tokens" ADD CONSTRAINT "strava_tokens_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "training_planned" ADD CONSTRAINT "training_planned_fk0" FOREIGN KEY ("users_cohorts_id") REFERENCES "users_cohorts"("id");

ALTER TABLE "training_actual" ADD CONSTRAINT "training_actual_fk0" FOREIGN KEY ("users_cohorts_id") REFERENCES "users_cohorts"("id");

ALTER TABLE "charges" ADD CONSTRAINT "charges_fk0" FOREIGN KEY ("users_cohorts_id") REFERENCES "users_cohorts"("id");








