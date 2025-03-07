ALTER TABLE "transactions" ALTER COLUMN "amount" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "transactions" ADD COLUMN "phone_number" varchar(50) NOT NULL;