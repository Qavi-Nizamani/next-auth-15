import { connectDB } from "@/lib/mongodb";
import User, { saltAndHashPassword } from "@/models/User.model";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    await connectDB();

    const userFound = await User.findOne({ email });

    if (userFound) {
      return {
        error: "Email already exists!",
      };
    }

    const hashedPassword = saltAndHashPassword(password);

    const user = new User({
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    return Response.json(savedUser, {
      status: 200,
    });
  } catch (e) {
    console.log(e);
  }
}
