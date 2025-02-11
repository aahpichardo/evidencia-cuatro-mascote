import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const usersFilePath = path.join(__dirname, '../models/users.json');

const readUsersFromFile = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
};

export const checkUserInDatabase = async (correo) => {
  const users = readUsersFromFile();
  return users.find(user => user.correo === correo);
};

export const isEmailUnique = async (correo) => {
  const users = readUsersFromFile();
  return !users.some(user => user.correo === correo);
};

export const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export const addUserToDatabase = async (user) => {
  const users = readUsersFromFile();
  users.push(user);
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};