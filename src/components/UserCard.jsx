import React from "react";
import { Card, Space } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  EditOutlined,
  DeleteOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";

const { Meta } = Card;

const UserCard = ({ user, onDelete, onEdit, onLike }) => {
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`;

  return (
    <Card
      hoverable
      cover={
        <img
          alt={user.name}
          src={avatarUrl}
          style={{
            height: 160,
            objectFit: "contain",
            background: "#f5f5f5",
          }}
        />
      }
      actions={[
        user.liked ? (
          <HeartFilled
            key="like"
            style={{ color: "red", fontSize: "20px" }}
            onClick={onLike}
          />
        ) : (
          <HeartOutlined
            key="like"
            style={{ color: "red", fontSize: "20px" }}
            onClick={onLike}
          />
        ),

        // Edit with hover blue
        <span key="edit" className="action-icon edit" onClick={onEdit}>
          <EditOutlined style={{ fontSize: "20px" }} />
        </span>,

        // Delete with hover red
        <span key="delete" className="action-icon delete" onClick={onDelete}>
          <DeleteOutlined style={{ fontSize: "20px" }} />
        </span>,
      ]}
    >
      <Meta
        title={user.name}
        description={
          <Space direction="vertical" size={4}>
            <Space>
              <MailOutlined />
              <span>{user.email}</span>
            </Space>
            <Space>
              <PhoneOutlined style={{ transform: "rotate(90deg)" }} />
              <span>{user.phone}</span>
            </Space>
            <Space>
              <GlobalOutlined />
              <span>{user.company?.name}</span>
            </Space>
          </Space>
        }
      />
    </Card>
  );
};

export default UserCard;
