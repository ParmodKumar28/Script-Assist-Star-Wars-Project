"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Button,
  Box,
  Title,
  Text,
} from "@mantine/core";
import { useAuth } from "../Context/AuthContext";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);

    if (success) {
      navigate("/resources");
    } 
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto" mt={50}>
      <Title order={2} align="center" mb={30}>
        Login
      </Title>
      <form onSubmit={handleSubmit}>
        <TextInput
          required
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          mb={15}
        />
        <PasswordInput
          required
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          mb={30}
        />
        <Button type="submit" fullWidth mb={15}>
          Log in
        </Button>
        <Text align="center">
          Don't have an account?{" "}
          <Text component="a" href="/signup" color="blue">
            Sign up
          </Text>
        </Text>
      </form>
    </Box>
  );
};

export default LoginPage;
