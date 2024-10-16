import mongoose, { Document, Schema } from 'mongoose';

type Auth = {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
}

export interface IUser extends Document {
    userName: string;
    email: string;
    password: string;
    role: 'regular' | 'admin' | 'superAdmin';
    authentication: Auth
}

const userSchema = new Schema<IUser>({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['regular', 'admin', 'superAdmin'], default: 'regular' },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
});

export const UserModel = mongoose.model<IUser>('User', userSchema);

// User Actions
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);

// Admin Only
export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserById = (id: string) => UserModel.findById(id);
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
