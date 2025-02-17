"use client";

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import {
    Table,
    TextInput,
    Title,
    Button,
    Group,
    Flex,
    Loader,
    Text,
    Paper,
    Select,
    Container,
    ScrollArea,
} from "@mantine/core";
import { IconSearch, IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { useAuth } from "../Context/AuthContext";
import { fetchPeople } from "../api";

const ResourceListPage: React.FC = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("asc");
    const { isAuthenticated } = useAuth();
    const { data, isLoading, error, refetch } = useQuery(["people", page], () => fetchPeople(page), {
        enabled: isAuthenticated, // Only fetch when authenticated
    });
    const { logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            refetch(); // Re-fetch after login
        }
    }, [isAuthenticated, refetch]);

    if (isLoading) {
        return (
            <Flex justify="center" align="center" style={{ height: "100vh" }}>
                <Loader size="lg" />
            </Flex>
        );
    }

    if (error) {
        return (
            <Flex justify="center" align="center" style={{ height: "100vh" }}>
                <Text color="red">An error occurred: {(error as Error).message}</Text>
            </Flex>
        );
    }

    const handleLogout = async () => {
        const success = logout();
        if (success) {
            navigate("/login");
        }
    }

    const filteredData = data?.results
        .filter((person) => person.name.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            const valueA = a[sortBy];
            const valueB = b[sortBy];
            return sortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        });

    return (
        <Container size="lg" sx={{ minHeight: "100vh", paddingBottom: "80px" }}>
            {/* Title & Logout */}
            <Flex justify="space-between" align="center" mt={10} mb={20}>
                <Title order={1} sx={{ fontSize: "2rem", fontWeight: 700, color: "#2C3E50" }}>
                    🌌 Star Wars Characters
                </Title>
                <Button onClick={handleLogout} color="red">
                    Logout
                </Button>
            </Flex>

            {/* Search & Sorting */}
            <Paper
                shadow="lg"
                p="lg"
                radius="lg"
                sx={{
                    backdropFilter: "blur(10px)",
                    background: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                }}
            >
                <Flex gap="md" justify="space-between" align="center" wrap="wrap">
                    <TextInput
                        placeholder="Search characters..."
                        value={search}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                        icon={<IconSearch size={18} />}
                        sx={{
                            flexGrow: 1,
                            backdropFilter: "blur(5px)",
                            background: "rgba(255, 255, 255, 0.2)",
                            borderRadius: "8px",
                        }}
                    />

                    <Select
                        value={sortBy}
                        onChange={(value) => setSortBy(value!)}
                        data={[
                            { value: "name", label: "Name" },
                            { value: "height", label: "Height" },
                            { value: "mass", label: "Mass" },
                            { value: "birth_year", label: "Birth Year" },
                        ]}
                        label="Sort by"
                        withinPortal={true}
                        sx={{
                            width: "200px",
                            backdropFilter: "blur(5px)",
                            background: "rgba(238, 216, 216, 0.2)",
                            borderRadius: "8px",
                            zIndex: 1000,
                        }}
                    />



                    <Group>
                        <Button
                            onClick={() => setSortOrder("asc")}
                            leftIcon={<IconSortAscending size={16} />}
                            variant={sortOrder === "asc" ? "filled" : "outline"}
                        >
                            Asc
                        </Button>
                        <Button
                            onClick={() => setSortOrder("desc")}
                            leftIcon={<IconSortDescending size={16} />}
                            variant={sortOrder === "desc" ? "filled" : "outline"}
                        >
                            Desc
                        </Button>
                    </Group>
                </Flex>
            </Paper>

            {/* Table with Glassmorphism */}
            <Paper shadow="xl" radius="lg" mt={20}>
                <ScrollArea>
                    <Table
                        highlightOnHover
                        striped
                        withBorder
                        withColumnBorders
                        sx={{
                            borderRadius: "16px",
                            overflow: "hidden",
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                            background: "rgba(255, 255, 255, 0.2)",
                            backdropFilter: "blur(12px)",
                        }}
                    >
                        <thead>
                            <tr style={{ backgroundColor: "#2C3E50", color: "#fff" }}>
                                <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
                                <th style={{ padding: "12px", textAlign: "center" }}>Height</th>
                                <th style={{ padding: "12px", textAlign: "center" }}>Mass</th>
                                <th style={{ padding: "12px", textAlign: "center" }}>Birth Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData?.map((person) => (
                                <tr
                                    key={person.name}
                                    style={{
                                        transition: "background 0.3s ease-in-out, transform 0.2s",
                                        cursor: "pointer",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = "#E9ECEF";
                                        e.currentTarget.style.transform = "scale(1.02)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = "transparent";
                                        e.currentTarget.style.transform = "scale(1)";
                                    }}
                                >
                                    <td style={{ padding: "12px" }}>
                                        <Link
                                            to={`/resource/${person.url.split("/").slice(-2, -1)[0]}`}
                                            style={{ textDecoration: "none", color: "#007bff", fontWeight: "bold" }}
                                        >
                                            {person.name}
                                        </Link>
                                    </td>
                                    <td style={{ padding: "12px", textAlign: "center" }}>{person.height}</td>
                                    <td style={{ padding: "12px", textAlign: "center" }}>{person.mass}</td>
                                    <td style={{ padding: "12px", textAlign: "center" }}>{person.birth_year}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </ScrollArea>
            </Paper>

            {/* Floating Pagination Controls */}
            <Flex justify="center" mt={20}>
                <Group
                    sx={{
                        position: "fixed",
                        bottom: "20px",
                        backdropFilter: "blur(10px)",
                        background: "rgba(255, 255, 255, 0.3)",
                        padding: "10px 20px",
                        borderRadius: "16px",
                        border: "1px solid rgba(255, 255, 255, 0.3)",
                        boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.1)",
                    }}
                >
                    <Button disabled={!data.previous} onClick={() => setPage((prev) => prev - 1)} variant="outline">
                        Previous
                    </Button>
                    <Button disabled={!data.next} onClick={() => setPage((prev) => prev + 1)} variant="outline">
                        Next
                    </Button>
                </Group>
            </Flex>
        </Container>
    );
};

export default ResourceListPage;
