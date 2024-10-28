"use server";

import { LoginFormSchema } from "@/lib/definitions";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/util";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/session";
import { cookies } from "next/headers";
import { encrypt, decrypt } from "@/lib/session";

export async function login(state, formData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    console.log("invalid fields");
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;
  try {
    const user = await getUser(email);
    if (!user) {
      return { errors: "invaliduser" };
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      await createSession({
        email: user.email,
      });
    } else {
      return { errors: "invaliduser" };
    }
  } catch (error) {
    return { errors: "servererror" };
  }

  redirect("/");
}
