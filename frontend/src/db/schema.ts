import { pgTable, unique, serial, varchar } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"




export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	firstName: varchar("first_name", { length: 100 }),
	secondName: varchar("second_name", { length: 100 }),
	email: varchar({ length: 255 }),
},
(table) => {
	return {
		usersEmailKey: unique("users_email_key").on(table.email),
	}
});
