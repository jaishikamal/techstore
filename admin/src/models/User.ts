import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  password: string;
  name: string;
  role?: 'admin' | 'user';
  status?: 'active' | 'inactive';
}

export interface UpdateUserInput {
  email?: string;
  password?: string;
  name?: string;
  role?: 'admin' | 'user';
  status?: 'active' | 'inactive';
}

export class UserModel {
  private static users: User[] = [
    {
      id: '1',
      email: 'admin@example.com',
      password: bcrypt.hashSync('admin123', 10),
      name: 'Admin User',
      role: 'admin',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  static async findByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null;
  }

  static async findById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null;
  }

  static async create(input: CreateUserInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(input.password, 10);
    const newUser: User = {
      id: String(this.users.length + 1),
      email: input.email,
      password: hashedPassword,
      name: input.name,
      role: input.role || 'user',
      status: input.status || 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.push(newUser);
    return newUser;
  }

  static async update(id: string, input: UpdateUserInput): Promise<User | null> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    const user = this.users[userIndex];
    const updatedUser: User = {
      ...user,
      ...input,
      password: input.password ? await bcrypt.hash(input.password, 10) : user.password,
      updatedAt: new Date(),
    };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  static async delete(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;
    this.users.splice(userIndex, 1);
    return true;
  }

  static async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
} 