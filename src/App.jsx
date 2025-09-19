import React, { useEffect, useState } from "react";
import { Row, Col, Spin } from "antd";
import UserCard from "./components/UserCard";
import EditModal from "./components/EditModal";

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const handleLike = (id) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, liked: !u.liked } : u)));
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleSave = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Row gutter={[16, 16]}>
        {users.map((user) => (
          <Col key={user.id} xs={24} sm={12} md={8} lg={6}>
            <UserCard
              user={user}
              onDelete={() => handleDelete(user.id)}
              onLike={() => handleLike(user.id)}
              onEdit={() => handleEdit(user)}
            />
          </Col>
        ))}
      </Row>

      {selectedUser && (
        <EditModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default App;
