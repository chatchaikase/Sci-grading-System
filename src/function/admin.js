"use server";
import axios from "axios";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

const path = process.env.LocalhostDOTNET;

export const getAllUser = async () => {
  try {
    const user = await axios.get(`${path}/api/User/GetAllUser`, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });

    if (!user) {
      throw new Error("Cannot fetch data");
    }
    return user.data;
  } catch (error) {
    throw new Error("Error to fetch data");
  }
};

export const checkUserInDB = async (id) => {
  try {
    const userId = id;
    const UserInDB = await axios.get(`${path}/api/User/GetUser/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });

    if (UserInDB == null) {
      return { message: "ไม่พบผู้ใช้งานนี้ในระบบ" };
    }

    return UserInDB.data;
  } catch (error) {
    console.log(error);
    return { error: "พบข้อผิดพลาดบางอย่าง" };
  }
};

export const addUser = async (previousState, formData) => {
  try {
    const {
      username,
      email,
      firstname,
      lastname,
      password,
      passwordRepeat,
      isAdmin,
    } = Object.fromEntries(formData);
    const Admin = parseInt(isAdmin);

    if (
      username == "" ||
      email == "" ||
      firstname == "" ||
      lastname == "" ||
      password == ""
    ) {
      return { error: "กรุณากรอกข้อมูลให้ครบถ้วน" };
    } else if (password !== passwordRepeat) {
      return { error: "รหัสผ่านไม่ถูกต้อง" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await axios.post(
      `${path}/api/User/AddUser`,
      {
        username,
        firstname,
        lastname,
        email,
        password: hashedPassword,
        isAdmin: Admin,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );

    revalidatePath("/admin");
    return newUser.data;
  } catch (error) {
    console.error("Error adding user:", error);
    return { error: error.response?.data?.error || "พบข้อผิดพลาดบางอย่าง" };
  }
};

export const editUser = async (previousState, formData) => {
  try {
    const {
      userId,
      newUsername,
      newEmail,
      newFirstname,
      newLastname,
      newPassword,
      newIsAdmin,
      checkPassword,
    } = Object.fromEntries(formData);
    const isAdmin = parseInt(newIsAdmin);

    if (checkPassword && newPassword === "") {
      return { error: "กรุณากรอกรหัสผ่าน" };
    }

    let hashedPassword = null;
    if (!checkPassword) {
      hashedPassword = " ";
    }

    if (newPassword) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(newPassword, salt);
    }

    const checkUser = await checkUserInDB(userId);

    if (checkUser != null) {
      const updateUser = await axios.post(
        `${path}/api/User/UpdateUser`,
        {
          userId: userId,
          username: newUsername,
          firstname: newFirstname,
          lastname: newLastname,
          email: newEmail,
          password: hashedPassword,
          isAdmin: isAdmin,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
        }
      );
      revalidatePath("/admin");
      return updateUser.data;
    }
  } catch (error) {
    console.error("Error editing user:", error);
    return { error: error.response?.data?.error || "พบข้อผิดพลาดบางอย่าง" };
  }
};

export const deleteUser = async (userId) => {
  try {
    const deleteUser = await axios.post(
      `${path}/api/User/DeleteUser/${userId}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
    revalidatePath("/admin");
    return deleteUser.status;
  } catch (error) {
    console.error("Error deleting user:", error);
    return { error: error.response?.data?.error || "พบข้อผิดพลาดบางอย่าง" };
  }
};
