import { connectDB } from "@/lib/mongodb";
import User, { saltAndHashPassword } from "@/models/User.model";

export const registerUser = async (email: string, password: string) => {
  try {
    await connectDB();

    const userFound = await User.findOne({ email });

    if (userFound) {
      return {
        success: false,
        error: "Email already exists!",
      };
    }

    const hashedPassword = saltAndHashPassword(password);

    const user = new User({
      email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    // Return a plain object instead of the MongoDB document
    return {
      success: true,
      user: {
        id: savedUser._id.toString(),
        email: savedUser.email,
      },
    };
  } catch (e) {
    console.error("Registration error:", e);
    return {
      success: false,
      error: e.message || "An error occurred during registration",
    };
  }
};
