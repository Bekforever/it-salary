'use client'
import React, { useState } from 'react';
import { Drawer, List, Avatar, Text, Grid, ScrollArea } from '@mantine/core';

const chats = [
  { id: 1, name: 'Дамир Утегенов', message: 'Рахмет үлкен', avatar: '👨‍🦳' },
  { id: 2, name: 'Oyliq', message: 'Указанный номер телефона...', avatar: '🎧' },
  { id: 3, name: 'Поло', message: 'Якш😂', avatar: '😎' },
  { id: 4, name: 'Ажана', message: 'Аа салайма', avatar: '🅰️' },
  { id: 5, name: 'Saved Messages', message: 'bybit', avatar: '🔖' },
  { id: 6, name: 'КБ', message: 'Батыр Дуйсенбаев: 📹 Video', avatar: '🅱️' },
  { id: 7, name: 'IGunner', message: 'Дурыс', avatar: '💣' },
];

export default function ChatApp() {
  const [openedChat, setOpenedChat] = useState<null | number>(null);

  return (
    <Grid>
      {/* Список чатов */}
      <Grid.Col span={4}>
        <ScrollArea style={{ height: '100vh' }}>
          <List spacing="sm" style={{ padding: 20 }}>
            {chats.map((chat) => (
              <List.Item
                key={chat.id}
                onClick={() => setOpenedChat(chat.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  backgroundColor: openedChat === chat.id ? '#f0f0f0' : undefined,
                }}
              >
                <Avatar size={40}>{chat.avatar}</Avatar>
                <div style={{ marginLeft: 15 }}>
                  <Text fw={500}>{chat.name}</Text>
                  <Text size="sm" color="dimmed">
                    {chat.message}
                  </Text>
                </div>
              </List.Item>
            ))}
          </List>
        </ScrollArea>
      </Grid.Col>

      {/* Чат */}
      <Grid.Col span={8}>
        {openedChat !== null ? (
          <Drawer
            opened={openedChat !== null}
            onClose={() => setOpenedChat(null)}
            position="right"
            size="50%"
            padding="md"
            withCloseButton
          >
            <Text size="lg" fw={700}>
              {chats.find((chat) => chat.id === openedChat)?.name}
            </Text>
            <Text color="dimmed" mt="sm">
              Chat with this user will go here...
            </Text>
          </Drawer>
        ) : (
          <Text mt="xl">
            Выберите чат, чтобы начать разговор
          </Text>
        )}
      </Grid.Col>
    </Grid>
  );
}
