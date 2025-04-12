'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import { useApi } from '@/hooks/useApi';
import { usersApi } from '@/services/api';
import useFormValidation from '@/hooks/useFormValidation';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface FormData {
  name: string;
  email: string;
  role: string;
  status: string;
}

export default function UsersPage() {
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    role: 'user',
    status: 'active',
  });

  const { data: users, loading, execute: fetchUsers } = useApi<User[]>(usersApi.getUsers);
  const { execute: createUser } = useApi(usersApi.createUser);
  const { execute: updateUser } = useApi(usersApi.updateUser);
  const { execute: deleteUser } = useApi(usersApi.deleteUser);

  const { values, errors, touched, handleChange, handleBlur, validateForm, resetForm } =
    useFormValidation<FormData>(formData, {
      name: [(value: string) => !value ? 'Name is required' : undefined],
      email: [
        (value: string) => !value ? 'Email is required' : undefined,
        (value: string) => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
          ? 'Invalid email address'
          : undefined,
      ],
      role: [(value: string) => !value ? 'Role is required' : undefined],
      status: [(value: string) => !value ? 'Status is required' : undefined],
    });

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleOpen = (user?: User) => {
    if (user) {
      setSelectedUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      setSelectedUser(null);
      setFormData({
        name: '',
        email: '',
        role: 'user',
        status: 'active',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        if (selectedUser) {
          await updateUser(selectedUser.id, values);
        } else {
          await createUser(values);
        }
        fetchUsers();
        handleClose();
      } catch (error) {
        console.error('Error saving user:', error);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Users Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add User
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {selectedUser ? 'Edit User' : 'Add New User'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={values.name}
              onChange={(e) => handleChange('name')(e.target.value)}
              onBlur={handleBlur('name')}
              error={touched.name && !!errors.name}
              helperText={touched.name && errors.name}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={(e) => handleChange('email')(e.target.value)}
              onBlur={handleBlur('email')}
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              select
              label="Role"
              name="role"
              value={values.role}
              onChange={(e) => handleChange('role')(e.target.value)}
              onBlur={handleBlur('role')}
              error={touched.role && !!errors.role}
              helperText={touched.role && errors.role}
              margin="normal"
              required
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </TextField>
            <TextField
              fullWidth
              select
              label="Status"
              name="status"
              value={values.status}
              onChange={(e) => handleChange('status')(e.target.value)}
              onBlur={handleBlur('status')}
              error={touched.status && !!errors.status}
              helperText={touched.status && errors.status}
              margin="normal"
              required
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedUser ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
} 