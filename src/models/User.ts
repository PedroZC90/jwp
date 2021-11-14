import { Document, Model, model, Schema } from "mongoose";

export interface IUserRegistration {
    name?: string,
    email?: string,
    password?: string,
    password_confirm?: string
}

//  1. create a interface representing a decumento in mongodb.
export interface IUserCredentials {
    email?: string,
    password?: string
}

export interface IUser extends IUserCredentials, Document {
    name: string;
    admin: boolean
}

//  2. create a schema corresponding to the document interface.
const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: false, default: false }
});

//  3. create a model.
const User: Model<IUser> = model("User", UserSchema, "users");

export default User;
