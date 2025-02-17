import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextInput,
  PasswordInput,
  Button,
  Box,
  Title,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useAuth } from "../Context/AuthContext";

const SignupPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      notifications.show({
        title: "Error",
        message: "Passwords do not match!",
        color: "red",
      });
      return;
    }

    const success = await signup(username, password);

    if (success) {
      navigate("/resources");
    }
  };

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto" mt={50}>
      <Title order={2} align="center" mb={30}>
        Sign Up
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
          mb={15}
        />
        <PasswordInput
          required
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          mb={30}
        />
        <Button type="submit" fullWidth mb={15}>
          Sign Up
        </Button>
        <Text align="center">
          Already have an account?{" "}
          <Text component="a" href="/login" color="blue">
            Log in
          </Text>
        </Text>
      </form>
    </Box>
  );
};

export default SignupPage;
